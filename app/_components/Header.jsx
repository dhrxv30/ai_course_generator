"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Header = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full bg-transparent text-white backdrop-blur-sm"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Amigo Logo"
            width={170}  // Slightly larger logo for better visibility
            height={60}
            className="object-contain cursor-pointer hover:scale-105 transition-transform"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-lg sm:text-xl">
          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-indigo-300 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-indigo-300 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-indigo-300 transition-colors"
          >
            Contact
          </button>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
