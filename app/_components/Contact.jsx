"use client";
import React from "react";

const Contact = () => {
  const [result, setResult] = React.useState("");

  const submit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", "335dfb36-4a68-4db8-b011-61a5058477a3");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Submitted!");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section id="contact" className="py-20 bg-transparent text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-primary mb-10">
          Get in Touch
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Contact Info */}
          <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4">Say Hi!</h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center">
                <img src="/mail.jpg" alt="Mail" className="w-5 h-5 mr-2" />
                admin@gmail.com
              </li>
              <li className="flex items-center">
                <img src="/call.jpg" alt="Phone" className="w-5 h-5 mr-2" />
                +1 123-456-7890
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-1/2">
            <form onSubmit={submit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-md bg-[#1f1f1f] border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-md bg-[#1f1f1f] border border-gray-600 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                required
                className="w-full p-3 rounded-md bg-[#1f1f1f] border border-gray-600 placeholder-gray-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="flex items-center px-6 py-2 bg-primary text-white font-medium rounded-md shadow-md hover:bg-primary/90 transition-all transform hover:scale-105 text-sm"
              >
                Send
                <img src="/white-arrow.png" alt="Arrow" className="w-4 h-4 ml-2" />
              </button>
              <span className="block text-xs text-gray-400">{result}</span>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
