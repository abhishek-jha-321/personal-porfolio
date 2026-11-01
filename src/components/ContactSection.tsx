"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Phone, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Project / Opportunity Inquiry",
    contactPreference: "call" as "call" | "whatsapp" | "email",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus({
        type: "success",
        message: data.message || "Your message and phone number were saved successfully!",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "Project / Opportunity Inquiry",
        contactPreference: "call",
        message: "",
      });
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err.message || "Unable to send your message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative pt-4 sm:pt-6">
      <div className="card-glass rounded-3xl p-5 sm:p-8 md:p-14 relative overflow-hidden border border-[#ff5722]/20 shadow-[0_0_50px_rgba(255,87,34,0.08)]">
        {/* Radial flame glow inside container */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#ff5722]/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff5722]/10 border border-[#ff5722]/30 text-[#ff5722] font-mono text-[11px] sm:text-xs mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ff5722]"></span>
            <span>Get In Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f8fafc] leading-tight mb-3 sm:mb-4">
            Have an idea worth building?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#94a3b8] mb-6 sm:mb-8 leading-relaxed">
            I&apos;m open to internship opportunities, open-source collaborations, hackathons, and
            interesting projects. Leave your details below and I&apos;ll get back to you!
          </p>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {/* Email */}
          <a
            href="mailto:workaholic.jha@gmail.com"
            className="p-3.5 sm:p-4 rounded-xl bg-[#292a2d]/40 border border-white/[0.06] hover:border-[#ff5722]/40 transition-colors flex items-center gap-3 group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0d0e11] flex items-center justify-center text-[#ff5722] group-hover:bg-[#ff5722] group-hover:text-white transition-colors shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="font-mono text-[10px] sm:text-[11px] text-[#94a3b8] block">EMAIL</span>
              <span className="text-xs text-[#f8fafc] truncate block font-medium">
                workaholic.jha@gmail.com
              </span>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 sm:p-4 rounded-xl bg-[#292a2d]/40 border border-white/[0.06] hover:border-[#ff5722]/40 transition-colors flex items-center gap-3 group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0d0e11] flex items-center justify-center text-[#ff5722] group-hover:bg-[#ff5722] group-hover:text-white transition-colors shrink-0">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </div>
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#94a3b8] block">LINKEDIN</span>
              <span className="text-xs text-[#f8fafc] block font-medium">Abhishek Jha</span>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 sm:p-4 rounded-xl bg-[#292a2d]/40 border border-white/[0.06] hover:border-[#ff5722]/40 transition-colors flex items-center gap-3 group sm:col-span-2 lg:col-span-1"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#0d0e11] flex items-center justify-center text-[#ff5722] group-hover:bg-[#ff5722] group-hover:text-white transition-colors shrink-0">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </div>
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] text-[#94a3b8] block">GITHUB</span>
              <span className="text-xs text-[#f8fafc] block font-medium">github.com/abhishek</span>
            </div>
          </a>
        </div>

        {/* Interactive Contact & Meeting Form */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.08]">
          <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc] mb-1.5 sm:mb-2">
            Connect or Schedule a Meeting
          </h3>
          <p className="text-xs sm:text-sm text-[#94a3b8] mb-5 sm:mb-6">
            Fill in your contact information and message. Your number and message will be delivered
            directly to my private dashboard.
          </p>

          {/* Status Banners */}
          {status.type === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-[#ff5722]/15 border border-[#ff5722]/40 text-[#f8fafc] flex items-start gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-[#ff5722] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs sm:text-sm">Message Delivered!</h4>
                <p className="text-xs text-[#e3e2e6] mt-0.5">{status.message}</p>
              </div>
            </motion.div>
          )}

          {status.type === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-[#f8fafc] flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs sm:text-sm">Could not send message</h4>
                <p className="text-xs text-[#e3e2e6] mt-0.5">{status.message}</p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-[#e3e2e6] mb-1.5 uppercase tracking-wider">
                  Full Name <span className="text-[#ff5722]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#0e0f14] border border-white/[0.1] text-[#f8fafc] placeholder-[#475569] text-xs sm:text-sm focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-[#e3e2e6] mb-1.5 uppercase tracking-wider">
                  Email Address <span className="text-[#ff5722]">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#0e0f14] border border-white/[0.1] text-[#f8fafc] placeholder-[#475569] text-xs sm:text-sm focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {/* Phone / Mobile Number */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-[#e3e2e6] mb-1.5 uppercase tracking-wider flex items-center justify-between">
                  <span>
                    Mobile / Phone Number <span className="text-[#ff5722]">*</span>
                  </span>
                  <span className="text-[10px] text-[#94a3b8] lowercase font-sans">
                    (with country code)
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#94a3b8]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-3.5 sm:pr-4 py-2.5 sm:py-3 rounded-xl bg-[#0e0f14] border border-white/[0.1] text-[#f8fafc] placeholder-[#475569] text-xs sm:text-sm focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors"
                  />
                </div>
              </div>

              {/* Preferred Mode of Connection */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono text-[#e3e2e6] mb-1.5 uppercase tracking-wider">
                  Preferred Contact Mode
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["call", "whatsapp", "email"] as const).map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setFormData({ ...formData, contactPreference: mode })}
                      className={`py-2.5 sm:py-3 px-1.5 sm:px-2 rounded-xl text-[10px] sm:text-xs font-mono uppercase tracking-wider text-center transition-all border ${
                        formData.contactPreference === mode
                          ? "bg-[#ff5722]/20 border-[#ff5722] text-[#ffb5a0] font-bold"
                          : "bg-[#0e0f14] border-white/[0.1] text-[#94a3b8] hover:border-white/[0.2]"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Subject / Purpose */}
            <div>
              <label className="block text-[11px] sm:text-xs font-mono text-[#e3e2e6] mb-1.5 uppercase tracking-wider">
                Purpose / Topic
              </label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#0e0f14] border border-white/[0.1] text-[#f8fafc] text-xs sm:text-sm focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors"
              >
                <option value="Project / Opportunity Inquiry">Project / Opportunity Inquiry</option>
                <option value="Internship / Hiring Opportunity">
                  Internship / Hiring Opportunity
                </option>
                <option value="Hackathon / Team Collaboration">
                  Hackathon / Team Collaboration
                </option>
                <option value="Technical Discussion / Mentorship">
                  Technical Discussion / Mentorship
                </option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-[11px] sm:text-xs font-mono text-[#e3e2e6] mb-1.5 uppercase tracking-wider">
                Your Message <span className="text-[#ff5722]">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Hi Abhishek, I loved your work and would like to discuss..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#0e0f14] border border-white/[0.1] text-[#f8fafc] placeholder-[#475569] text-xs sm:text-sm focus:outline-none focus:border-[#ff5722] focus:ring-1 focus:ring-[#ff5722] transition-colors resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-ember text-white font-semibold text-xs sm:text-sm px-7 sm:px-8 py-3.5 rounded-full inline-flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message &amp; Contact Info</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
