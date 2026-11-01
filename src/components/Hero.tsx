"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const toolchain = [
  "React",
  "Python",
  "Node.js",
  "PyTorch",
  "Tailwind CSS",
  "Next.js",
  "MongoDB",
  "Git",
  "SQL",
];

export default function Hero() {
  return (
    <section id="hero" className="relative pt-6 sm:pt-12 md:pt-16 text-center flex flex-col items-center">
      {/* Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full border border-white/[0.08] bg-[#1b1b1f]/80 backdrop-blur-md shadow-sm mb-5 sm:mb-6 transition-all hover:border-[#ff5722]/50 max-w-full"
      >
        <span className="w-2 h-2 rounded-full bg-[#ff5722] shadow-[0_0_8px_#ff5722] animate-pulse shrink-0"></span>
        <span className="font-mono text-[#e3e2e6] text-[11px] sm:text-xs tracking-wide truncate">
          Hello, I&apos;m Abhishek Jha · Available for Projects
        </span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#f8fafc] max-w-4xl tracking-tight leading-[1.18] sm:leading-tight px-2"
      >
        Building ideas into{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5722] via-[#ec6a06] to-[#ffb5a0] drop-shadow-[0_0_24px_rgba(255,87,34,0.35)]">
          intelligent digital experiences.
        </span>
      </motion.h1>

      {/* Subheader Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 sm:mt-5 flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 font-mono text-[#ffb5a0] tracking-wider sm:tracking-widest text-[10px] sm:text-xs px-2"
      >
        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#292a2d]/60 border border-white/[0.06]">
          AI DEVELOPER
        </span>
        <span className="text-[#94a3b8]">·</span>
        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#292a2d]/60 border border-white/[0.06]">
          FULL-STACK DEVELOPER
        </span>
        <span className="text-[#94a3b8]">·</span>
        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-[#292a2d]/60 border border-white/[0.06]">
          B.TECH STUDENT
        </span>
      </motion.div>

      {/* Supporting Body Text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#94a3b8] max-w-2xl leading-relaxed px-3"
      >
        I&apos;m a developer passionate about building modern web applications and exploring the
        possibilities of artificial intelligence.
      </motion.p>

      {/* Dual CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-7 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4"
      >
        <a
          href="#projects"
          className="btn-ember text-white font-semibold text-sm sm:text-[15px] px-7 sm:px-8 py-3.5 rounded-full flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <span>Explore My Work</span>
          <ArrowRight className="w-4 h-4" />
        </a>
        <a
          href="#contact"
          className="btn-glass px-7 sm:px-8 py-3.5 rounded-full text-[#f8fafc] text-sm sm:text-[15px] font-medium w-full sm:w-auto text-center"
        >
          <span>Let&apos;s Connect</span>
        </a>
      </motion.div>

      {/* Core Toolchain Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 sm:mt-14 w-full max-w-3xl pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col items-center px-2"
      >
        <span className="font-mono text-[#94a3b8] text-[10px] sm:text-[11px] uppercase tracking-widest mb-3 sm:mb-4">
          Core Toolchain &amp; Frameworks
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {toolchain.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1b1b1f] border border-white/[0.06] hover:border-[#ff5722]/50 hover:bg-[#ff5722]/10 transition-colors"
            >
              <span className="text-[11px] sm:text-xs font-mono text-[#e3e2e6]">{tech}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Feature Highlight Milestone Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full mt-8 sm:mt-12 card-glass rounded-2xl p-5 sm:p-7 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-4 items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff5722]/5 via-transparent to-[#ff5722]/5 pointer-events-none"></div>

        <div className="text-center md:text-left">
          <p className="font-mono text-[#ffb5a0] text-[11px] sm:text-xs uppercase tracking-widest">
            Academic Milestone
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc] mt-1">2nd Year B.Tech</h3>
          <p className="text-xs text-[#94a3b8]">BVCOE, New Delhi</p>
        </div>

        <div className="text-center border-y md:border-y-0 md:border-x border-white/[0.08] py-4 md:py-0">
          <p className="font-mono text-[#ffb5a0] text-[11px] sm:text-xs uppercase tracking-widest">
            Shipped Software
          </p>
          <h3 className="text-3xl sm:text-4xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-br from-white via-[#ffb5a0] to-[#ff5722] mt-1">
            10+
          </h3>
          <p className="text-xs text-[#94a3b8]">Projects Built</p>
        </div>

        <div className="text-center md:text-right">
          <p className="font-mono text-[#ffb5a0] text-[11px] sm:text-xs uppercase tracking-widest">
            Community Impact
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-[#f8fafc] mt-1">Open-Source</h3>
          <p className="text-xs text-[#94a3b8]">Active Contributor (GSSoC &apos;26)</p>
        </div>
      </motion.div>
    </section>
  );
}
