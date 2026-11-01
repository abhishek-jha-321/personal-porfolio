"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X, Shield } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Learning", href: "#learning" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#121316]/95 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20"
          : "bg-[#121316]/80 backdrop-blur-sm border-b border-white/[0.04]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Identity */}
        <Link href="#hero" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ff5722] shadow-[0_0_12px_#ff5722] animate-pulse"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold text-[#f8fafc] tracking-tight group-hover:text-[#ffb5a0] transition-colors">
              Abhishek Jha
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest text-[#94a3b8] uppercase font-mono">
              AI &amp; Full-Stack Dev
            </span>
          </div>
        </Link>

        {/* Desktop & Wide Tablet Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-[13px] font-medium text-[#94a3b8]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-[#f8fafc] hover:text-[#ffb5a0] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Trailing Action Buttons */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-full text-[#94a3b8] hover:text-[#ff5722] hover:bg-white/[0.05] transition-colors"
            title="Admin Dashboard (View Messages & Numbers)"
          >
            <Shield className="w-4 h-4" />
          </Link>

          <a
            href="#contact"
            className="px-4 sm:px-5 py-2 rounded-full border border-[#ff5722]/40 bg-[#1b1b1f] hover:bg-[#ff5722]/10 text-[#f8fafc] text-xs font-semibold hover:border-[#ff5722] flex items-center gap-1.5 shadow-[0_0_14px_rgba(255,87,34,0.15)] transition-all duration-200 active:scale-95"
          >
            <span>Let&apos;s Connect</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ff5722]" />
          </a>
        </div>

        {/* Tablet & Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/admin"
            className="sm:hidden p-2 rounded-lg text-[#94a3b8] hover:text-[#ff5722]"
            title="Admin"
          >
            <Shield className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/[0.05] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121316]/98 backdrop-blur-xl border-b border-white/[0.08] px-5 sm:px-6 py-5 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-[#94a3b8]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/[0.05] hover:text-[#ff5722] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-[#94a3b8] hover:text-[#ff5722] flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-white/[0.05]"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </Link>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-ember px-4 py-2 rounded-full text-xs font-semibold text-white flex items-center gap-1"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
