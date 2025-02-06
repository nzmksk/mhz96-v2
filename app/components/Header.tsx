import React from "react";
import { Linkedin, Github, Twitter } from "lucide-react";

function Header() {
  const sections = ["Home", "Experience", "Projects"];

  return (
    <header className="p-4">
      <div className="mx-10 sm:mx-auto max-w-6xl px-4 py-3 flex items-center justify-between border border-zinc-600 rounded-2xl">
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

          <button className="hidden sm:inline border border-slate-900 text-white bg-sky-600 hover:bg-sky-400 px-4 py-2 rounded-lg hover:shadow-lg">
            <a href="https://x.com/mssngnnja" target="_blank">
              <Twitter className="inline" />
              <span className="hidden lg:inline lg:ml-2">Twitter</span>
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
