"use client";
import React from "react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-transparent text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-primary animate-fade-in-up">
          Why Amigo Rocks Your Study Game
        </h2>
        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Say goodbye to dull textbooks and hello to Amigo — the AI-powered sidekick that turns your PDFs into video adventures! Imagine your notes coming to life with cool avatars, snappy scripts, and visuals that stick.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-6 bg-gradient-to-br from-indigo-800/30 to-purple-700/20 backdrop-blur-md rounded-lg shadow-xl hover:scale-[1.03] transition-all">
            <img
              src="/ai.png"
              alt="AI Magic"
              className="h-20 w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-indigo-300">AI Magic</h3>
            <p className="text-sm text-gray-400 mt-2">
              Our AI digs into your PDFs and crafts short, fun scripts.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-gradient-to-br from-indigo-800/30 to-purple-700/20 backdrop-blur-md rounded-lg shadow-xl hover:scale-[1.03] transition-all">
            <img
              src="/tutor.png"
              alt="Video Vibes"
              className="h-20 w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-indigo-300">Video Vibes</h3>
            <p className="text-sm text-gray-400 mt-2">
              Lively avatars bring your lessons to life in minutes.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-gradient-to-br from-indigo-800/30 to-purple-700/20 backdrop-blur-md rounded-lg shadow-xl hover:scale-[1.03] transition-all">
            <img
              src="/learning.png"
              alt="Learn Easy"
              className="h-20 w-20 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-indigo-300">Learn Easy</h3>
            <p className="text-sm text-gray-400 mt-2">
              Boost retention with lessons that actually stick!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
