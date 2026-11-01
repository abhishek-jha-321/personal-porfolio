import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import CurrentlyLearning from "@/components/CurrentlyLearning";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0b0e] text-[#f8fafc] overflow-x-hidden selection:bg-[#ff5722] selection:text-white">
      {/* Atmospheric Background Ambient Orbs - Scaled responsibly */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 sm:-top-40 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] md:w-[900px] h-[350px] sm:h-[450px] md:h-[600px] bg-[#ff5722]/10 rounded-full blur-[100px] sm:blur-[140px]"></div>
        <div className="absolute top-[40%] -right-32 sm:-right-40 w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-[#ec6a06]/5 rounded-full blur-[120px] sm:blur-[160px]"></div>
        <div className="absolute top-[75%] -left-28 sm:-left-32 w-[280px] sm:w-[400px] md:w-[550px] h-[280px] sm:h-[400px] md:h-[550px] bg-[#ff5722]/5 rounded-full blur-[100px] sm:blur-[140px]"></div>
      </div>

      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 space-y-16 sm:space-y-24 md:space-y-32 pt-4 sm:pt-8 pb-16 sm:pb-20">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <CurrentlyLearning />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
