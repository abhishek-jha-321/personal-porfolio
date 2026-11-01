"use client";

import { motion } from "framer-motion";
import { GraduationCap, Terminal, Brain } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="relative pt-4 sm:pt-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
        <span className="font-mono text-[#ffb5a0] text-xs uppercase tracking-widest">About Me</span>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f8fafc] max-w-xl mb-6 sm:mb-10">
        Curious mind. Creative builder. Future-focused developer.
      </h2>

      {/* Main Glass Dossier Card */}
      <div className="card-glass rounded-2xl p-5 sm:p-8 md:p-12 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Visual Frame with Radiant Amber Halo Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative py-4"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 flex items-center justify-center">
              {/* Radiant Amber Aura Backdrop */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#ff5722] via-[#ec6a06] to-[#ffb5a0] opacity-80 shadow-[0_0_50px_rgba(255,87,34,0.45)]"></div>

              {/* Orbital Thin Border Ring */}
              <div
                className="absolute -inset-2 sm:-inset-3 rounded-full border border-[#ffb5a0]/40 border-dashed animate-spin"
                style={{ animationDuration: "35s" }}
              ></div>

              {/* Monochrome Portrait */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-white/20 bg-[#0d0e11] flex items-end justify-center">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8nUDjl-F7FdjY0vgWBg4AkNB6TSeY1uL79LlXXfmHNxduwqR-AY1qxN-EFVDiYyBVceGsrLokVgLarwykViyAPqhfPac-LK5wPxf674XtSsSpSRmuKBwMk2pJimrDUOB13pBwZNwjmVyf2dFZEGse1f5OTS2HCiwoiHC7LMMPn0AMnHT5tugxBx11tJlRo6U9TdLTi6c3J7NFQhHDB8j7UOx5G6-s_ILu6IAXU_ib"
                  alt="Abhishek Jha"
                  width={256}
                  height={256}
                  unoptimized
                  className="w-full h-full object-cover filter grayscale contrast-125 hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 right-2 sm:right-4 px-3 py-1 rounded-full bg-[#0d0e11]/95 border border-[#ff5722]/50 text-[#f8fafc] font-mono text-[10px] sm:text-[11px] shadow-lg flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse"></span>
                <span>Delhi, India</span>
              </div>
            </div>
          </motion.div>

          {/* Narrative Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-[15px] text-[#94a3b8] leading-relaxed">
              <p>
                I&apos;m a second-year <strong className="text-[#f8fafc]">B.Tech</strong> student at{" "}
                <strong className="text-[#ff5722] font-semibold">
                  Bharati Vidyapeeth&apos;s College of Engineering (GGSIPU), Delhi
                </strong>
                , with a strong interest in software development and artificial intelligence.
              </p>
              <p>
                My journey into development started with building websites and exploring how
                technology can solve everyday problems. Since then, I&apos;ve expanded my skills
                into full-stack development and started exploring machine learning and AI-powered
                applications.
              </p>
              <p>
                I enjoy learning by building, experimenting with new technologies, and collaborating
                with others to create practical solutions.
              </p>
            </div>

            {/* Quick Highlight Chips */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap gap-2 sm:gap-3">
              <div className="px-3 sm:px-4 py-2 rounded-xl bg-[#292a2d]/40 border border-white/[0.06] text-[11px] sm:text-xs text-[#f8fafc] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#ff5722] shrink-0" />
                <span>B.Tech in EEE / AI-ML @ BVCOE</span>
              </div>
              <div className="px-3 sm:px-4 py-2 rounded-xl bg-[#292a2d]/40 border border-white/[0.06] text-[11px] sm:text-xs text-[#f8fafc] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#ff5722] shrink-0" />
                <span>Open Source Enthusiast</span>
              </div>
              <div className="px-3 sm:px-4 py-2 rounded-xl bg-[#292a2d]/40 border border-white/[0.06] text-[11px] sm:text-xs text-[#f8fafc] flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#ff5722] shrink-0" />
                <span>Problem Solver</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
