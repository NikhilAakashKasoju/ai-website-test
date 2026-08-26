import Navbar from "@/components/agentic-ai/Navbar";
import Hero from "@/components/agentic-ai/Hero";
import StatsBar from "@/components/agentic-ai/StatsBar";
import Curriculum from "@/components/agentic-ai/Curriculum";
import Projects from "@/components/agentic-ai/Projects";
import Skills from "@/components/agentic-ai/Skills";
import Instructors from "@/components/agentic-ai/Instructors";
import Register from "@/components/agentic-ai/Register";
import Footer from "@/components/agentic-ai/Footer";
import BackgroundFX from "@/components/agentic-ai/BackgroundFX";

export default function AgenticAIPage() {
  return (
    <main className="relative">
      <BackgroundFX />
      <Navbar />
      <Hero />
      <StatsBar />
      <Curriculum />
      <Projects />
      <Skills />
      <Instructors />
      <Register />
      <Footer />
    </main>
  );
}
