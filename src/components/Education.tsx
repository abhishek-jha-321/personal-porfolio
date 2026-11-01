"use client";

import { motion } from "framer-motion";
import { BookOpen, Cpu, Network, Bot } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="relative pt-4 sm:pt-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
        <span className="font-mono text-[#ffb5a0] text-xs uppercase tracking-widest">
          Academic Rigor
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f8fafc] mb-6 sm:mb-8">
        Building a strong technical foundation.
      </h2>

      {/* Editorial Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="card-glass rounded-2xl p-5 sm:p-8 md:p-12 relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/30 text-[#ff5722] font-mono text-[11px] sm:text-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Currently pursuing second year</span>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f8fafc]">
              Bachelors of Technology in Electronics and AIML
            </h3>
            <p className="text-base sm:text-lg font-semibold text-[#ff5722]">
              Bharati Vidyapeeth&apos;s College of Engineering, Delhi
            </p>
            <p className="text-xs sm:text-sm md:text-base text-[#94a3b8] leading-relaxed pt-1 sm:pt-2">
              My academic background in electrical and electronics engineering complements my
              interest in software development, intelligent systems, microcontrollers, and emerging
              technologies.
            </p>
          </div>

          {/* Academic Badges Cluster */}
          <div className="flex flex-col gap-2.5 sm:gap-3 w-full lg:w-auto lg:min-w-[260px]">
            <span className="font-mono text-[#94a3b8] text-[11px] sm:text-xs uppercase tracking-wider mb-0.5">
              Key Curriculum Pillars
            </span>

            <div className="p-3 sm:p-3.5 rounded-xl bg-[#292a2d]/60 border border-white/[0.06] flex items-center gap-3">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5722] shrink-0" />
              <span className="text-xs sm:text-sm text-[#f8fafc] font-medium">
                Hardware &amp; IoT Foundations
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-[#292a2d]/60 border border-white/[0.06] flex items-center gap-3">
              <Network className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5722] shrink-0" />
              <span className="text-xs sm:text-sm text-[#f8fafc] font-medium">
                Algorithms &amp; Data Structures
              </span>
            </div>

            <div className="p-3 sm:p-3.5 rounded-xl bg-[#292a2d]/60 border border-white/[0.06] flex items-center gap-3">
              <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-[#ff5722] shrink-0" />
              <span className="text-xs sm:text-sm text-[#f8fafc] font-medium">
                Applied AI Systems
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
