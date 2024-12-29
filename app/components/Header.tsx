import React from "react";

function Header() {
  return (
    <header className="p-4">
      <div className="mx-10 sm:mx-auto max-w-6xl px-4 py-3 flex items-center justify-between border border-zinc-600 rounded-2xl">
        <div>
          <a href="#home">
            <span className="text-xl text-white font-bold ml-2">
              Mohd Hafiz{" "}
              <span className="text-slate-400 font-bold hidden sm:inline">
                Zabba
              </span>
            </span>
          </a>
        </div>

        <div className="hidden sm:flex flex-row space-x-4 text-white">
          <a href="#home">Home</a>
          <a>About</a>
          <a>Experience</a>
          <a>Skills</a>
        </div>

        <div className="flex space-x-4 items-center">
          <button className="hidden md:inline-block text-white bg-blue-700 hover:bg-blue-500 px-4 py-2 rounded-lg">
            <a href="https://www.linkedin.com/in/mhz96/" target="_blank">
              LinkedIn
            </a>
          </button>
          <button className="border text-white border-slate-900 hover:bg-slate-700 px-4 py-2 rounded-lg">
            <a href="https://github.com/nzmksk" target="_blank">
              GitHub
            </a>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
