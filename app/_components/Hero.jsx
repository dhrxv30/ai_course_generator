"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-[calc(100vh-68px)] flex items-center justify-center bg-transparent"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Your Study Notes into Engaging Videos with
            <span className="text-primary"> Amigo</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Upload your PDFs and watch AI turn them into clear summaries, flowcharts, and educational videos — all in one place.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link href="/dashboard">
              <button className="px-6 py-3 bg-primary text-white font-medium rounded-md shadow-md hover:bg-primary/90 transition-all transform hover:scale-105">
                Start Learning Now
              </button>
            </Link>
            <Link href="/summarize">
              <button className="px-6 py-3 bg-white text-black font-medium rounded-md shadow-md hover:bg-gray-100 transition-all transform hover:scale-105">
                Upload PDF
              </button>
            </Link>
            <div className="mt-4 flex flex-col justify-center gap-4 sm:mt-6">
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
