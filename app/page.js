"use client";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import About from "./_components/About";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";
export default function Home() {
  return (
  <div>
    <Header />
    <Hero />
    <About />
    <Contact />
    <Footer />
  </div>
  );
}
