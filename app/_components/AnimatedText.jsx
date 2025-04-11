"use client";
import { useEffect, useState } from "react";

const AnimatedText = ({ text, speed = 5, onDone }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!text) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        if (onDone) onDone();
      }
    }, speed); // speed in ms per character

    return () => clearInterval(interval);
  }, [text, speed, onDone]);

  return (
    <p className="mt-2 text-gray-300 whitespace-pre-line leading-relaxed font-normal">
      {displayedText}
      <span className="animate-pulse text-white">|</span>
    </p>
  );
};

export default AnimatedText;
