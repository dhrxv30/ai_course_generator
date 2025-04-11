from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import PyPDF2
import google.generativeai as genai
from dotenv import load_dotenv
import re
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use Gemini Pro model for better accuracy
model = genai.GenerativeModel("gemini-2.0-flash")

# Set up Flask app
app = Flask(__name__)
CORS(app)

# Create directory to save video scripts
os.makedirs("saved_scripts", exist_ok=True)

# --- Function to extract text from PDF ---
def extract_pdf_text(file):
    try:
        reader = PyPDF2.PdfReader(file)
        raw_text = " ".join(page.extract_text() or "" for page in reader.pages)
        # Clean up weird formatting
        cleaned_text = re.sub(r"\s+", " ", raw_text)
        cleaned_text = cleaned_text.encode("ascii", "ignore").decode("utf-8")  # Remove weird symbols
        return cleaned_text.strip()
    except Exception as e:
        print("❌ Error extracting text:", e)
        return ""

# --- Main Endpoint ---
@app.route("/generate-summary", methods=["POST"])
def generate_summary():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == "":
        return jsonify({"error": "Empty file"}), 400

    try:
        # ✅ Extract and clean text
        text = extract_pdf_text(file)
        if not text:
            return jsonify({"error": "Could not extract text from the PDF"}), 400

        print("📄 Extracted text (first 300 chars):", text[:300])

        # ✅ Prompt for clean summary
        summary_prompt = f"""
You are a helpful AI tutor. Summarize this content clearly and correctly.

Instructions:
- NO bullet points, markdown, or hashtags
- Use paragraphs only
- Correct grammar, spelling, and broken words
- Keep it simple, educational, and clean

Text:
{text}
"""
        summary = model.generate_content(summary_prompt).text.strip()

        # ✅ Prompt for video script
        script_prompt = f"""
Write an engaging, student-friendly video script from the following:

Instructions:
- Start with an intro
- Explain key points in friendly tone
- End with a conclusion
- Use plain text (no markdown or bullet points)
- Ensure correct spelling and grammar

Text:
{text}
"""
        script = model.generate_content(script_prompt).text.strip()

        # ✅ Save script with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        with open(f"saved_scripts/script_{timestamp}.txt", "w", encoding="utf-8") as f:
            f.write(script)

        # ✅ Prompt for Mermaid flowchart
        flowchart_prompt = f"""
Convert this educational content into a Mermaid.js flowchart.

Instructions:
- Use ONLY valid Mermaid syntax
- Must start with 'graph TD;'
- No markdown, explanations, or backticks

Text:
{text}
"""
        raw_chart = model.generate_content(flowchart_prompt).text.strip()
        cleaned_chart = re.sub(r"(```\s*mermaid|```)", "", raw_chart).strip()

        if cleaned_chart.startswith("graph TD;") and "->" in cleaned_chart:
            flowchart = cleaned_chart
        else:
            flowchart = "graph TD;\nA[Flowchart cannot be generated from this PDF]"

        # ✅ Return summary and flowchart to frontend
        return jsonify({
            "summary": summary,
            "flowchart": flowchart
        })

    except Exception as e:
        print("❌ Exception:", str(e))
        return jsonify({"error": str(e)}), 500

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
