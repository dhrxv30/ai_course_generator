import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

const FlowchartViewer = ({ code }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Reset and re-render mermaid diagram
    if (chartRef.current) {
      try {
        chartRef.current.removeAttribute("data-processed");
        chartRef.current.innerHTML = code;

        mermaid.initialize({ startOnLoad: false });
        mermaid.init(undefined, chartRef.current);
      } catch (err) {
        console.error("Mermaid rendering failed:", err);
        chartRef.current.innerHTML =
          "<p class='text-red-500'>Invalid Mermaid syntax</p>";
      }
    }
  }, [code]);

  return (
    <div className="bg-[#1f1f1f] p-6 rounded-lg shadow text-white overflow-auto">
      <h2 className="text-2xl font-bold text-purple-400 mb-3">AI-Generated Flowchart</h2>
      <div className="mermaid" ref={chartRef}></div>
    </div>
  );
};

export default FlowchartViewer;
