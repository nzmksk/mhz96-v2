import Body from "@/app/components/Body";
import Header from "@/app/components/Header";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll bg-gradient-to-b from-slate-800 to-slate-600">
      <Header />
      <Body />
    </main>
  );
}
