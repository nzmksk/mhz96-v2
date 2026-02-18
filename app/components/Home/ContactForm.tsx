"use client";

import React, { useEffect, useRef, useState } from "react";

interface ContactFormProps {
  onClose: () => void;
}

function ContactForm({ onClose }: ContactFormProps) {
  const modalRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const closeContactForm = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    // Wait for fade-out animation to complete before calling onClose
    setTimeout(() => onClose(), 300);
  };

  return (
    <section
      className={`fixed inset-0 backdrop-blur-sm flex justify-center items-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeContactForm}
      ref={modalRef}
    >
      <div className={`bg-white shadow-lg rounded-lg flex flex-col max-w-lg p-8 transition-all duration-300 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}>
        <h2 className="text-lg font-bold mb-4">Contact Me</h2>

        <form
          action="https://formsubmit.co/26e981ca81afea7298ca5e83e93dac4c"
          method="POST"
          target="_blank"
        >
          <div className="mb-4">
            <label htmlFor="Name">
              Name<span className="text-red-700">*</span>
            </label>
            <input
              className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
              id="name"
              name="Name"
              placeholder="Your name"
              type="text"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Email">
              Email<span className="text-red-700">*</span>
            </label>
            <input
              className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
              id="email"
              name="Email"
              placeholder="Your email address"
              type="email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Phone Number">Phone Number</label>
            <input
              className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
              id="phone-no"
              name="Phone Number"
              placeholder="Your phone number (optional)"
              type="tel"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Message">
              Message<span className="text-red-700">*</span>
            </label>
            <textarea
              className="w-full border border-solid border-slate-400 rounded-lg shadow-lg p-2"
              id="message"
              name="Message"
              placeholder="I would like to discuss..."
              rows={5}
              required
            ></textarea>
          </div>

          <div className="flex flex-row justify-between text-slate-100">
            <button
              className="bg-blue-500 hover:bg-blue-700 py-3 mr-4 w-1/2 rounded-lg hover:shadow-lg"
              type="submit"
            >
              Send
            </button>

            <button
              className="bg-slate-700 hover:bg-slate-900 py-3 w-1/2 rounded-lg hover:shadow-lg"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ContactForm;
