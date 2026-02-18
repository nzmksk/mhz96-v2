"use client";

import React, { useEffect, useRef, useState } from "react";
import { Linkedin, Github } from "lucide-react";

function Header() {
  const sections = ["Home", "Experience", "Projects"];
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // The scrollable container is <main>, not window
    const scrollContainer = document.getElementById("scroll-container");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const currentScrollPos = scrollContainer.scrollTop;

      // Check if at top of page (within 50px threshold)
      const atTop = currentScrollPos < 50;
      setIsAtTop(atTop);

      // Show header during scroll activity
      setIsVisible(true);

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Hide header after 2 seconds of no scrolling (unless at top)
      if (!atTop) {
        scrollTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 p-4 transition-transform duration-300 ${
      isVisible || isAtTop ? "translate-y-0" : "-translate-y-full"
    }`}>
      <div className={`mx-10 sm:mx-auto max-w-6xl px-4 py-3 flex items-center justify-between border border-zinc-600 rounded-2xl transition-all duration-300 ${
        !isAtTop ? "bg-slate-900/95 backdrop-blur-sm shadow-lg" : ""
      }`}>
        <div>
          <a href="#home">
            <span className="text-xl text-white font-bold ml-2">
              Mohd Hafiz{" "}
              <span className="text-slate-400 font-bold hidden md:inline">
                Zabba
              </span>
            </span>
          </a>
        </div>

        <div className="hidden sm:flex flex-row space-x-4 text-white">
          {sections.map((section) => {
            return (
              <a
                className="group transition-all duration-300 ease-in-out"
                href={`#${section.toLowerCase()}`}
                key={section}
              >
                <span className="bg-left-bottom bg-gradient-to-r from-slate-400 to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  {section}
                </span>
              </a>
            );
          })}
        </div>

        <div className="flex space-x-4 items-center">
          <button className="border border-slate-900 text-white bg-blue-700 hover:bg-blue-500 px-4 py-2 rounded-lg hover:shadow-lg">
            <a href="https://www.linkedin.com/in/mhz96/" target="_blank">
              <Linkedin className="inline" />
              <span className="hidden lg:inline lg:ml-2">LinkedIn</span>
            </a>
          </button>

          <button className="border text-white border-slate-900 hover:bg-slate-700 px-4 py-2 rounded-lg hover:shadow-lg">
            <a href="https://github.com/nzmksk" target="_blank">
              <Github className="inline" />
              <span className="hidden lg:inline lg:ml-2">GitHub</span>
            </a>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
