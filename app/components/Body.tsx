"use client";

import Lottie, { AnimationItem } from "lottie-web";
import { Download, Mail } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

import ContactForm from "@/app/components/ContactForm";

function Body() {
  const [showContactForm, setShowContactForm] = useState(false);
  const [text, count] = useTypewriter({
    words: [
      "software engineer.",
      "self-taught developer.",
      "software developer.",
      "back-end developer.",
      "web developer.",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const animationData = require("@/public/assets/projects.json");
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationInstance: AnimationItem | undefined;

    if (container.current) {
      animationInstance = Lottie.loadAnimation({
        container: container.current as HTMLDivElement,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }

    return () => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, [animationData]);

  return (
    <>
      <section>
        <div className="container px-4 mx-auto">
          <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-4">
            <div className="w-full flex flex-col items-start md:w-2/4 mt-0 md:mt-4 justify-center">
              <h1 className="text-white text-3xl lg:text-5xl font-semibold">
                My name is Hafiz and I&apos;m a {" "}
                <span className="text-slate-400">
                  {text}
                  <Cursor />
                </span>
              </h1>
              <div className="py-4 flex text-white w-full justify-between md:justify-start">
                <button
                  className="bg-blue-500 hover:bg-blue-700 p-3 rounded-lg hover:shadow-lg mr-4 w-1/2 flex justify-center items-center gap-2"
                  onClick={() => downloadResume()}
                  title="Last updated December 2024"
                >
                  <Download className="hidden lg:block"/>
                  Download Resume
                </button>

                <button
                  className="bg-slate-500 hover:bg-slate-900 p-3 rounded-lg hover:shadow-lg w-1/2 flex justify-center items-center gap-2"
                  onClick={() => setShowContactForm(true)}
                >
                  <Mail className="hidden lg:block"/>
                  Get in Touch
                </button>
              </div>
            </div>
            <div className="md:w-1/2 z-auto md:mt-0">
              <div className="container" ref={container}></div>
            </div>
          </div>
        </div>
      </section>
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </>
  );
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = "/assets/resume.pdf";
  link.download = "Mohd Hafiz Zabba - Software Engineer (Dec 2024).pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default Body;
