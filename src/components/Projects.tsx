"use client";

import { motion } from "framer-motion";
import { ShoppingBag, HeartPulse, Gamepad2, LineChart, Code, Eye } from "lucide-react";

const projects = [
  {
    number: "01",
    category: "E-Commerce",
    title: "Amazon Clone",
    description:
      "A responsive e-commerce interface inspired by Amazon, built to practice modern frontend development, state management, and component-based architecture.",
    tags: ["React.js", "Tailwind CSS", "JavaScript"],
    icon: ShoppingBag,
    github: "https://github.com",
    demo: "#",
  },
  {
    number: "02",
    category: "Healthcare",
    title: "Hospital Management System",
    description:
      "A healthcare management application designed to simplify access to healthcare services through an intuitive, accessible patient interface and workflow.",
    tags: ["React.js", "Tailwind CSS", "React Router", "Vite"],
    icon: HeartPulse,
    github: "https://github.com",
    demo: "#",
  },
  {
    number: "03",
    category: "Interactive Game",
    title: "Rock Paper Scissors",
    description:
      "An interactive game built to practice core JavaScript logic, state machines, sound effects, event handling, and dynamic responsive user interfaces.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    icon: Gamepad2,
    github: "https://github.com",
    demo: "#",
  },
  {
    number: "04",
    category: "Data Science",
    title: "Machine Learning Projects",
    description:
      "Exploring data-driven problem-solving through dataset preprocessing, exploratory data analysis, feature engineering, and predictive modeling.",
    tags: ["Python", "Pandas", "NumPy", "Scikit-learn"],
    icon: LineChart,
    github: "https://github.com",
    demo: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative pt-4 sm:pt-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
        <span className="font-mono text-[#ffb5a0] text-xs uppercase tracking-widest">Portfolio</span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f8fafc]">
            Turning ideas into working applications.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94a3b8] mt-1.5 max-w-xl">
            Selected works demonstrating architecture, responsive design, and intelligent logic.
          </p>
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
        {projects.map((proj, idx) => {
          const Icon = proj.icon;
          return (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card-glass rounded-2xl p-5 sm:p-7 flex flex-col justify-between group transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-mono text-[#ff5722] text-[11px] sm:text-xs uppercase tracking-widest">
                    {proj.number} / {proj.category}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[#292a2d] flex items-center justify-center text-[#94a3b8] group-hover:text-[#ff5722] transition-colors">
                    <Icon className="w-4 h-4" />
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc] mb-2 sm:mb-3 group-hover:text-[#ffb5a0] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94a3b8] mb-5 sm:mb-6 leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-[#292a2d] text-[11px] sm:text-xs font-mono text-[#f8fafc]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 sm:gap-3 pt-4 border-t border-white/[0.06]">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#292a2d]/80 hover:bg-[#343538] text-[#f8fafc] text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={proj.demo}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/30 hover:bg-[#ff5722] text-[#f8fafc] hover:text-white text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Live Demo</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
