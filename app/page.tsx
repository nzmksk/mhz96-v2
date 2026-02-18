"use client";

import { useState } from "react";
import Body from "@/app/components/Home/Body";
import Experience from "@/app/components/Experience/Experience";
import Header from "@/app/components/Header";
import Projects from "@/app/components/Projects/Projects";
import SectionContainer from "@/app/components/SectionContainer";
import Snackbar from "@/app/components/Snackbar";

export default function Home() {
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");

  const showSnackbar = (message: string, type: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarType(type);
  };

  return (
    <main
      className="h-screen overflow-y-scroll scroll-smooth bg-gradient-to-b from-slate-800 to-slate-600"
      id="scroll-container"
    >
      <Header />
      <SectionContainer className="pt-24 flex flex-col" id="home">
        <Body showSnackbar={showSnackbar} />
      </SectionContainer>
      <SectionContainer
        className="bg-slate-800 flex flex-col justify-center text-white"
        id="experience"
      >
        <Experience />
      </SectionContainer>
      <SectionContainer className="bg-slate-600 flex justify-center items-center" id="projects">
        <Projects />
      </SectionContainer>

      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          type={snackbarType}
          onClose={() => setSnackbarMessage("")}
        />
      )}
    </main>
  );
}
