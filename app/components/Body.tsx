"use client";

import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

function Body() {
  const [text, count] = useTypewriter({
    words: [
      "software developer.",
      "back-end developer.",
      "web developer.",
      "part-time private tutor.",
      "part-time cleaner.",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section className="py-8">
      <div className="px-4 mx-auto">
        <div className="flex flex-col-reverse justify-between md:flex-row md:space-x-8">
          <div className="w-full flex flex-col items-start md:w-2/4 mt-0 md:mt-20">
            <h1 className="text-white text-3xl lg:text-5xl font-semibold">
              My name is Hafiz and I&apos;m a
            </h1>
            <h1 className="text-3xl lg:text-5xl font-semibold">
              <span className="text-slate-400">{text}</span>
              <Cursor />
            </h1>
            <p className="text-white text-xl md:text-2xl mb-3 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div>
              <button className="bg-blue-400 text-white px-4 py-1 rounded mr-4 hover:bg-blue-600">
                Learn More
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-1 rounded hover:bg-gray-400">
                Contact Me
              </button>
            </div>
            <p className="text-blue-500 text-small font-normal mt-2">
              Coding | Learnings | Lifestyle
            </p>
            <h1 className="text-slate-400 text-xl">
              1 Year of Experience | 5 Projects Completed
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Body;
