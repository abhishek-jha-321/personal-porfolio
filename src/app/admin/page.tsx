"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Shield,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Trash2,
  CheckCircle,
  RefreshCw,
  LogOut,
  Search,
  ExternalLink,
  Download,
  AlertCircle,
  Database,
  ArrowLeft,
} from "lucide-react";

interface MessageItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  contactPreference?: "call" | "whatsapp" | "email";
  status: "unread" | "read" | "replied";
  createdAt: string;
  source?: string;
}

export default function AdminDashboardPage() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read" | "replied">("all");
  const [search, setSearch] = useState("");
  const [dbSource, setDbSource] = useState<string>("detecting...");
  const router = useRouter();

  // Dynamically compute stats from messages so counts always stay 100% in sync
  const stats = useMemo(() => {
    const total = messages.length;
    const unread = messages.filter((m) => m.status === "unread").length;
    const totalPhoneNumbers = messages.filter(
      (m) => Boolean(m.phone && m.phone.trim().length > 0)
    ).length;
    return { total, unread, totalPhoneNumbers };
  }, [messages]);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/messages");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch messages.");
      }
      setMessages(data.messages || []);
      if (data.messages && data.messages.length > 0) {
        setDbSource(data.messages[0].source === "mongodb" ? "MongoDB Atlas" : "Local Storage (Active)");
      } else {
        setDbSource("Ready");
      }
    } catch (err: any) {
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleStatusChange = async (id: string, newStatus: "unread" | "read" | "replied") => {
    try {
      const res = await fetch("/api/admin/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m))
        );
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        // Removing from messages automatically updates total, unread, and totalPhoneNumbers
        setMessages((prev) => prev.filter((m) => m._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const handleExportCSV = () => {
    if (messages.length === 0) return;
    const headers = ["Name", "Email", "Phone Number", "Contact Mode", "Subject", "Message", "Status", "Date"];
    const rows = messages.map((m) => [
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${m.phone.replace(/"/g, '""')}"`,
      `"${m.contactPreference || "call"}"`,
      `"${(m.subject || "").replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      `"${m.status}"`,
      `"${new Date(m.createdAt).toLocaleString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `portfolio_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesFilter = filter === "all" || m.status === filter;
      const q = search.toLowerCase();
      const matchesSearch =
        !search ||
        m.name.toLowerCase().includes(q) ||
        m.phone.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [messages, filter, search]);

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-[#f8fafc] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#121316]/90 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 py-3.5 sm:py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              href="/"
              className="p-1.5 sm:p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
              title="Return to website"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#ff5722]/15 border border-[#ff5722]/30 flex items-center justify-center text-[#ff5722]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-bold text-[#f8fafc]">Inquiry Console</h1>
              <p className="text-[10px] sm:text-[11px] font-mono text-[#94a3b8]">Abhishek Jha · Portfolio</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={fetchMessages}
              className="p-1.5 sm:p-2 rounded-xl bg-[#1b1b1f] border border-white/[0.08] text-[#94a3b8] hover:text-[#ff5722] transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={handleLogout}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#1b1b1f] border border-white/[0.08] text-[11px] sm:text-xs font-medium text-[#94a3b8] hover:text-red-400 hover:border-red-500/30 flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6 sm:space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Total Leads */}
          <div className="card-glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-mono text-[#94a3b8] uppercase tracking-wider">
                Total Inquiries
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#ff5722]/10 text-[#ff5722] flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#f8fafc] mt-2">{stats.total}</div>
            <p className="text-[10px] sm:text-[11px] text-[#94a3b8] mt-1">From portfolio contact form</p>
          </div>

          {/* Card 2: Unread Messages */}
          <div className="card-glass rounded-2xl p-4 sm:p-5 border-[#ff5722]/30">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-mono text-[#ffb5a0] uppercase tracking-wider">
                Pending Action
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5722] animate-pulse"></span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#ff5722] mt-2">{stats.unread}</div>
            <p className="text-[10px] sm:text-[11px] text-[#94a3b8] mt-1">Unread messages waiting</p>
          </div>

          {/* Card 3: Phone Numbers */}
          <div className="card-glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-mono text-[#94a3b8] uppercase tracking-wider">
                Mobile Numbers
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#ec6a06]/10 text-[#ec6a06] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-[#f8fafc] mt-2">
              {stats.totalPhoneNumbers}
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#94a3b8] mt-1">Ready for Call or WhatsApp</p>
          </div>

          {/* Card 4: Database State */}
          <div className="card-glass rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-mono text-[#94a3b8] uppercase tracking-wider">Storage</span>
              <Database className="w-4 h-4 text-[#ffb5a0]" />
            </div>
            <div className="text-sm sm:text-base font-bold text-[#f8fafc] mt-2 sm:mt-3 truncate">{dbSource}</div>
            <p className="text-[10px] sm:text-[11px] text-[#94a3b8] mt-1">MongoDB connection ready</p>
          </div>
        </div>

        {/* Controls: Search, Filter Tabs & Export */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 pt-1">
          {/* Status Filters */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#1b1b1f] border border-white/[0.08] text-xs font-mono overflow-x-auto">
            {(["all", "unread", "read", "replied"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg capitalize text-xs transition-colors whitespace-nowrap ${
                  filter === tab
                    ? "bg-[#ff5722] text-white font-bold shadow-sm"
                    : "text-[#94a3b8] hover:text-[#f8fafc]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-[#94a3b8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search name, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 sm:pl-9 pr-3 py-1.5 rounded-xl bg-[#1b1b1f] border border-white/[0.08] text-xs text-[#f8fafc] placeholder-[#475569] focus:outline-none focus:border-[#ff5722]"
              />
            </div>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCSV}
              disabled={messages.length === 0}
              className="px-3 py-1.5 rounded-xl bg-[#292a2d] hover:bg-[#343538] text-xs font-medium text-[#f8fafc] flex items-center gap-1.5 border border-white/[0.08] transition-colors disabled:opacity-40 shrink-0"
              title="Download inquiries as CSV spreadsheet"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Messages Feed */}
        {error && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-xs text-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {filteredMessages.length === 0 ? (
          <div className="card-glass rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-white/[0.04] flex items-center justify-center text-[#94a3b8] mb-3">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-[#f8fafc]">No messages found</h3>
            <p className="text-xs text-[#94a3b8] max-w-sm mt-1">
              {search
                ? `No inquiries matching "${search}".`
                : "When visitors fill out the contact form on your portfolio, their messages and contact numbers will appear here."}
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 sm:space-y-4">
            {filteredMessages.map((msg) => {
              const cleanPhone = msg.phone.replace(/[^0-9]/g, "");
              const waUrl = `https://wa.me/${cleanPhone}`;
              const telUrl = `tel:${msg.phone}`;

              return (
                <div
                  key={msg._id}
                  className={`card-glass rounded-2xl p-4 sm:p-6 transition-all border ${
                    msg.status === "unread" ? "border-[#ff5722]/50 bg-[#121316]/90" : "border-white/[0.07]"
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    {/* Left: Sender details */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <h3 className="text-sm sm:text-base font-bold text-[#f8fafc]">{msg.name}</h3>
                        <span
                          className={`text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                            msg.status === "unread"
                              ? "bg-[#ff5722]/20 text-[#ffb5a0] border border-[#ff5722]/40 font-bold"
                              : msg.status === "replied"
                              ? "bg-green-500/20 text-green-300 border border-green-500/30"
                              : "bg-white/[0.05] text-[#94a3b8]"
                          }`}
                        >
                          {msg.status}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-[#94a3b8] px-2 py-0.5 rounded-md bg-[#1b1b1f]">
                          Prefers: {msg.contactPreference || "call"}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[#94a3b8]">
                        <span className="flex items-center gap-1.5 text-[#ff5722] font-semibold font-mono">
                          <Phone className="w-3.5 h-3.5 shrink-0" />
                          <span>{msg.phone}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[200px]">{msg.email}</span>
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px]">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>

                    {/* Right: Quick Action Buttons (Call / WhatsApp / Email) */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-white/[0.06]">
                      {/* Direct Phone Call */}
                      <a
                        href={telUrl}
                        className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-blue-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>

                      {/* Direct WhatsApp */}
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-green-500/15 hover:bg-green-500/25 border border-green-500/30 text-green-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      {/* Email Reply */}
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || "Your message to Abhishek")}`}
                        className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-medium text-[#f8fafc] flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email</span>
                      </a>

                      {/* Toggle status */}
                      {msg.status === "unread" ? (
                        <button
                          onClick={() => handleStatusChange(msg._id, "read")}
                          className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-[#94a3b8] hover:text-green-400"
                          title="Mark as Read"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(msg._id, "replied")}
                          className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-300 hover:bg-green-500/20 text-[11px]"
                          title="Mark as Replied"
                        >
                          Mark Replied
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-red-500/20 text-[#94a3b8] hover:text-red-400 transition-colors"
                        title="Delete message"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="mt-3.5 sm:mt-4 pt-3.5 sm:pt-4 border-t border-white/[0.06] text-xs sm:text-sm text-[#e3e2e6] space-y-1">
                    {msg.subject && (
                      <div className="font-semibold text-[#f8fafc]">
                        Topic: {msg.subject}
                      </div>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed text-[#94a3b8]">
                      {msg.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
