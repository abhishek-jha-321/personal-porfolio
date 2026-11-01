"use client";

import { motion } from "framer-motion";
import { Layout, Server, Sparkles, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    subtitle: "Client Side",
    description:
      "Designing responsive, fast, and accessible digital surfaces with component driven architecture.",
    icon: Layout,
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS", "Next.js"],
  },
  {
    title: "Backend Development",
    subtitle: "Server Side",
    description:
      "Building RESTful microservices, API integrations, authentication, and robust database layers.",
    icon: Server,
    skills: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "SQL"],
  },
  {
    title: "AI & Data Science",
    subtitle: "Intelligent Systems",
    description:
      "Harnessing mathematical rigor, exploratory data analysis, and predictive models.",
    icon: Sparkles,
    skills: ["Python", "NumPy", "Pandas", "Matplotlib", "Machine Learning", "Scikit-learn"],
  },
  {
    title: "Tools & Workflow",
    subtitle: "Ecosystem",
    description:
      "Modern version control, lightning-fast bundlers, and developer workflow automation.",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "Vite", "Postman", "Linux"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative pt-4 sm:pt-8">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722]"></span>
        <span className="font-mono text-[#ffb5a0] text-xs uppercase tracking-widest">
          Technical Arsenal
        </span>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-10 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#f8fafc]">
            Technologies I work with.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#94a3b8] mt-1.5 max-w-xl">
            A focused toolkit bridging modern frontend, scalable backends, and data-driven
            intelligence.
          </p>
        </div>
      </div>

      {/* 4 Category Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {skillCategories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass rounded-2xl p-5 sm:p-7 relative transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#ff5722]/10 border border-[#ff5722]/20 flex items-center justify-center text-[#ff5722] group-hover:bg-[#ff5722] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] text-[#94a3b8] uppercase tracking-wider">
                  {cat.subtitle}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc] mb-1.5 sm:mb-2">{cat.title}</h3>
              <p className="text-xs sm:text-sm text-[#94a3b8] mb-5 sm:mb-6 leading-relaxed">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 sm:px-3 py-1 rounded-lg bg-[#292a2d]/60 border border-white/[0.06] text-[11px] sm:text-xs font-mono text-[#f8fafc] hover:border-[#ff5722]/50 hover:text-[#ffb5a0] transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
