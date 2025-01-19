import Body from "@/app/components/Body";
import Experience from "./components/Experience";
import Header from "@/app/components/Header";
import SectionContainer from "./components/SectionContainer";

export default function Home() {
  return (
    <main
      className="h-screen overflow-y-scroll bg-gradient-to-b from-slate-800 to-slate-600"
      id="home"
    >
      <SectionContainer>
        <Header />
        <Body />
      </SectionContainer>
      <SectionContainer
        className="bg-slate-800 flex flex-col justify-center text-white"
        id="experience"
      >
        <Experience />
      </SectionContainer>
    </main>
  );
}
