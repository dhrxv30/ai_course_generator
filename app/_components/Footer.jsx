import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-6 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} <span className="text-primary font-semibold">Amigo</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
