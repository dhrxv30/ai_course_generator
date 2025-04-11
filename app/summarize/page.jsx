"use client";
import React, { useState } from "react";
import axios from "axios";
import AnimatedText from "@/app/_components/AnimatedText";
import FlowchartViewer from "@/app/_components/FlowchartViewer";

const SummarizePage = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [flowchart, setFlowchart] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setSummary(""); // Reset
    setFlowchart("");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setSummary("");
      setFlowchart("");

      const response = await axios.post("http://127.0.0.1:5000/generate-summary", formData);
      setSummary(response.data.summary);
      setFlowchart(response.data.flowchart);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 text-white relative">
      <div className="animated-bg" />

      <div className="max-w-5xl mx-auto w-full z-10 relative">
        <h1 className="text-4xl font-bold text-center mb-10">Summarize Your PDF</h1>

        {/* Upload Box */}
        <div className="flex flex-col items-center justify-center mt-4">
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer w-full max-w-md rounded-xl border-2 border-dashed border-gray-600 px-8 py-10 text-center bg-black/30 hover:border-primary hover:bg-primary/10 backdrop-blur-sm transition"
          >
            <div className="text-gray-300 text-sm">
              {file ? (
                <span className="text-green-400 font-semibold">{file.name}</span>
              ) : (
                <>
                  <span className="block text-lg font-medium text-white mb-2">
                    Click or Drag to Upload PDF
                  </span>
                  <span className="text-gray-400">
                    Choose a PDF to generate summary and flowchart
                  </span>
                </>
              )}
            </div>
          </label>
          <input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Upload Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-md shadow-md hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Summary"}
          </button>
        </div>

        {/* Summary */}
        {summary && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Summary</h2>
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-lg p-6 shadow-md border border-white/10 backdrop-blur-sm">
              <AnimatedText text={summary} speed={4} />
            </div>
          </div>
        )}

        {/* Flowchart */}
        {flowchart && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Flowchart</h2>
            <div className="bg-white rounded-lg p-4 shadow-lg text-black min-h-[300px] overflow-auto">
              {flowchart.startsWith("graph TD;") ? (
                <FlowchartViewer code={flowchart} />
              ) : (
                <p className="text-gray-600 italic">No flowchart for this PDF.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummarizePage;
