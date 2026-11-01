"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    title: "GirlScript Summer of Code — Contributor 2026",
    badge: "2026 · Current",
    isCurrent: true,
    description:
      "Contributing to open-source development and collaborating with developers to improve software projects, review PRs, and ship clean documentation and features.",
  },
  {
    title: "Smart India Hackathon — College-Level Qualifier",
    badge: "National Hackathon",
    isCurrent: false,
    description:
      "Collaborated with a cross-functional team to develop innovative solutions for real-world problem statements, navigating tight deadlines and rapid prototyping.",
  },
  {
    title: "Personal Development Challenge",
    badge: "Continuous Growth",
    isCurrent: false,
    description:
      "Following a consistent development journey through hands-on projects, experimentation, and continuous learning across frontend and backend systems.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative pt-4 sm:pt-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
        <span className="font-mono text-[#ffb5a0] text-xs uppercase tracking-widest">
          Journey &amp; Milestones
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f8fafc] mb-8 sm:mb-12">
        Learning, contributing, and building together.
      </h2>

      {/* Illuminated Timeline */}
      <div className="relative pl-5 sm:pl-8 md:pl-10 border-l border-white/[0.1] space-y-6 sm:space-y-10 ml-2 sm:ml-3">
        {experiences.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Ember Node */}
            <div
              className={`absolute -left-[27px] sm:-left-[39px] md:-left-[47px] top-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#0d0e11] border-2 flex items-center justify-center ${
                item.isCurrent
                  ? "border-[#ff5722] shadow-[0_0_12px_#ff5722]"
                  : "border-white/30 group-hover:border-[#ff5722]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                  item.isCurrent ? "bg-[#ff5722]" : "bg-[#94a3b8] group-hover:bg-[#ff5722]"
                }`}
              ></span>
            </div>

            {/* Timeline Card */}
            <div className="card-glass rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#f8fafc]">{item.title}</h3>
                <span
                  className={`font-mono text-[10px] sm:text-xs px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full w-fit ${
                    item.isCurrent
                      ? "text-[#ff5722] bg-[#ff5722]/10 border border-[#ff5722]/20"
                      : "text-[#94a3b8] bg-[#292a2d] border border-white/[0.06]"
                  }`}
                >
                  {item.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
