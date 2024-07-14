import React from "react";

function Header() {
  return (
    <header className="py-4">
      <div className="mx-10 sm:mx-auto max-w-6xl px-4 flex items-center justify-between border border-zinc-600 p-3 rounded-full">
        <div>
          <span className="text-xl text-white cursor-pointer font-bold ml-2">
            Mohd Hafiz <span className="text-slate-400 font-bold">Zabba</span>
          </span>
        </div>

        <div className="hidden sm:flex flex-row space-x-4">
          <p className="text-white cursor-pointer">Home</p>
          <p className="text-white cursor-pointer">About</p>
          <p className="text-white cursor-pointer">Experience</p>
          <p className="text-white cursor-pointer">Skills</p>
        </div>

        <div className="flex space-x-3 items-center">
          <button className="hidden md:inline-block text-white bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600">
            LinkedIn
          </button>
          <button className="border border-gray-500 cursor-pointer px-4 py-2 text-white rounded-full">
            GitHub
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
