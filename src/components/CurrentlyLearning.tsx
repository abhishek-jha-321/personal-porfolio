"use client";

import { motion } from "framer-motion";

const learningPhases = [
  {
    phase: "PHASE 01",
    title: "Machine Learning",
    description: "Understanding algorithms, supervised/unsupervised training, and predictive analysis.",
    gradient: "from-[#ff5722] to-[#ec6a06]",
  },
  {
    phase: "PHASE 02",
    title: "Deep Learning",
    description: "Exploring artificial neural networks, backpropagation, and intelligent computer vision.",
    gradient: "from-[#ec6a06] to-[#d97722]",
  },
  {
    phase: "PHASE 03",
    title: "Generative AI",
    description: "Learning to build applications powered by LLMs, retrieval augmented generation, and embeddings.",
    gradient: "from-[#ffb5a0] to-[#ff5722]",
  },
  {
    phase: "PHASE 04",
    title: "Agentic AI",
    description: "Exploring autonomous workflows, multi-agent systems, tool calling, and background task solvers.",
    gradient: "from-[#d97722] to-[#ff5722]",
  },
];

export default function CurrentlyLearning() {
  return (
    <section id="learning" className="relative pt-4 sm:pt-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
        <span className="font-mono text-[#ffb5a0] text-xs uppercase tracking-widest">
          Active Horizons
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f8fafc] mb-6 sm:mb-10">
        Exploring what&apos;s next in technology.
      </h2>

      {/* 4-Card Node Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {learningPhases.map((node, i) => (
          <motion.div
            key={node.title}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card-glass rounded-2xl p-5 sm:p-6 relative overflow-hidden group"
          >
            {/* Gradient Top Border Accent */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${node.gradient}`}
            ></div>

            <div className="flex items-center justify-between mb-3 sm:mb-4 mt-1 sm:mt-2">
              <span className="font-mono text-[#94a3b8] text-[10px] sm:text-[11px]">{node.phase}</span>
              <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse"></span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#f8fafc] mb-1.5 sm:mb-2">{node.title}</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">{node.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
