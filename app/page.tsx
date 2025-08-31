import Body from "@/app/components/Home/Body";
import Experience from "@/app/components/Experience/Experience";
import Header from "@/app/components/Home/Header";
import Projects from "@/app/components/Projects/Projects";
import SectionContainer from "@/app/components/SectionContainer";

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
      <SectionContainer className="bg-slate-600" id="projects">
        <Projects />
      </SectionContainer> 
    </main>
  );
}
