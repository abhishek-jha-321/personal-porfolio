"use client";

import { ArrowUp, Shield } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0d0e11] text-[#94a3b8] border-t border-white/[0.08] mt-16 sm:mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Footer Copyright Text */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <span className="text-sm sm:text-base font-bold text-[#f8fafc]">Abhishek Jha</span>
          <span className="hidden sm:inline text-white/20">·</span>
          <p className="text-[11px] sm:text-xs text-[#94a3b8]">
            © 2026 Abhishek Jha. Crafted with intelligence &amp; precision.
          </p>
        </div>

        {/* Links Array */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff5722] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ff5722] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:workaholic.jha@gmail.com"
            className="hover:text-[#ff5722] transition-colors"
          >
            Email
          </a>
          <Link
            href="/admin"
            className="text-[#ffb5a0] hover:text-[#ff5722] flex items-center gap-1 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Back-to-Top Button */}
        <div>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1f1f23] border border-white/[0.08] hover:border-[#ff5722] text-[#f8fafc] hover:text-[#ff5722] flex items-center justify-center transition-colors shadow-sm"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
