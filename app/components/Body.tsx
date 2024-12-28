"use client";

import Lottie from "lottie-web";
import { AnimationItem } from "lottie-web";
import React, { useEffect, useRef } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

function Body() {
  const [text, count] = useTypewriter({
    words: [
      "self-taught developer",
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
    <section className="pt-4">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-8">
          <div className="w-full flex flex-col items-start md:w-2/4 mt-0 md:mt-4 justify-center">
            <h1 className="text-white text-3xl lg:text-5xl font-semibold">
              My name is Hafiz and I&apos;m{" "}
              <span className="text-slate-400">
                {text}
                <Cursor />
              </span>
            </h1>
            <h1 className="text-3xl lg:text-5xl font-semibold"></h1>
            <div className="py-4">
              <button
                className="bg-blue-400 text-white px-4 py-1 rounded mr-4 hover:bg-blue-600"
                onClick={() => downloadResume()}
              >
                Download Resume
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400"
                onClick={() => openContactForm()}
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="md:w-1/2 z-auto md:mt-0">
            <div className="container" ref={container}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function downloadResume() {
  alert("Resume download is not implemented yet.");
}

function openContactForm() {
  alert("Contact form is not implemented yet.");
}

export default Body;
