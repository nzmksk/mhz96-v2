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
          <a
            className="group transition-all duration-300 ease-in-out"
            href="#home"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-slate-400 to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Home
            </span>
          </a>

          <a className="group transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-slate-400 to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              About
            </span>
          </a>

          <a className="group transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-slate-400 to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Experience
            </span>
          </a>

          <a className="group transition-all duration-300 ease-in-out">
            <span className="bg-left-bottom bg-gradient-to-r from-slate-400 to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
              Skills
            </span>
          </a>
        </div>

        <div className="flex space-x-4 items-center">
          <button className="hidden md:inline-block text-white bg-blue-700 hover:bg-blue-500 px-4 py-2 rounded-lg hover:shadow-lg">
            <a href="https://www.linkedin.com/in/mhz96/" target="_blank">
              LinkedIn
            </a>
          </button>

          <button className="border text-white border-slate-900 hover:bg-slate-700 px-4 py-2 rounded-lg hover:shadow-lg">
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
