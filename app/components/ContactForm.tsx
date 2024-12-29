"use client";

import React, { useRef } from "react";

interface ContactFormProps {
  onClose: () => void;
}

function ContactForm({ onClose }: ContactFormProps) {
  const modalRef = useRef<HTMLElement>(null);

  const closeContactForm = (e: React.MouseEvent<HTMLElement>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <section
      ref={modalRef}
      onClick={closeContactForm}
      className="flex fixed inset-0 backdrop-blur-sm justify-center items-center"
      id="contact-form"
    >
      <div className="bg-white flex flex-col max-w-md p-4 rounded">
        <form
          action="https://formsubmit.co/26e981ca81afea7298ca5e83e93dac4c"
          method="POST"
          target="_blank"
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full border-black"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full border-black"
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            className="w-full border-black"
          ></textarea>
          <div className="flex justify-between">
            <button className="bg-blue-600 px-4 py-3 rounded">Send</button>
            <button
              className="bg-black px-4 py-3 rounded text-white"
              onClick={onClose}
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
