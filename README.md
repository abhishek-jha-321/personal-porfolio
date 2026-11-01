# Abhishek Jha — AI & Full-Stack Developer Portfolio

An elite, high-performance developer portfolio and client lead-capture console built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Lenis Smooth Scroll**, **Framer Motion**, and **MongoDB**.

Faithfully translated from the **Google Stitch** *"Obsidian Ember"* design system into production-ready full-stack code.

---

## ✨ Features

### 🎨 Frontend & Design System
- **Obsidian Ember Aesthetic**: Deep obsidian canvas (`#0a0b0e`), glowing incandescent ember radial auras (`#ff5722`), and frosted glassmorphic cards (`card-glass`) with hairline border highlights.
- **Lenis Smooth Scrolling**: Butter-smooth inertia scrolling and anchor jumps across all sections.
- **Fluid Micro-Interactions**: Scroll-triggered reveals, rotating orbital portrait halo ring, and tactile button presses powered by **Framer Motion**.
- **100% Responsive Design**: Pixel-perfect layout across Mobile (320px–640px), Tablet (640px–1024px), and Desktop (1024px+).

### 📑 Portfolio Sections
- **Hero**: Live availability status badge (*"Available for Projects"*), flame gradient typography, toolchain chips, and academic & open-source milestone counters.
- **About Me**: High-contrast monochrome studio portrait with rotating amber halo ring and background story at BVCOE (GGSIPU), Delhi.
- **Technical Arsenal (Skills)**: 4-category Bento Grid (Frontend, Backend, AI & Data Science, Tools & Workflow).
- **Featured Projects**: Amazon Clone, Hospital Management System, Rock Paper Scissors, and Machine Learning Projects with GitHub & Demo links.
- **Journey & Milestones (Experience)**: Glowing timeline featuring GirlScript Summer of Code (GSSoC '26) and Smart India Hackathon.
- **Education**: B.Tech in Electronics and AIML at Bharati Vidyapeeth's College of Engineering with curriculum pillars.
- **Active Horizons (Currently Learning)**: 4-phase roadmap (Machine Learning, Deep Learning, Generative AI, Agentic AI).

### 📬 Lead Capture & Contact System
- **Interactive Connect Form**:
  - Full Name (required)
  - Email Address (validated)
  - **Mobile / WhatsApp Phone Number (required)**
  - Preferred Contact Mode (Call / WhatsApp / Email)
  - Purpose / Topic dropdown
  - Inquiry Message details
- **Real-Time Client Feedback**: Submitting animations, error validation alerts, and instant success confirmation cards without page reloads.

### 🛡️ Private Admin Dashboard (`/admin`)
- **Passcode Protected**: Secure session cookie authentication via `/admin/login` (default passcode: `admin123` or your custom `ADMIN_SECRET`).
- **Live Statistics**: Total Inquiries, Pending/Unread Messages, and Captured Mobile Numbers.
- **Direct 1-Click Communication**:
  - 📞 **Direct Call Button**: Opens dialer (`tel:+...`) immediately.
  - 💬 **WhatsApp Button**: Opens a WhatsApp conversation directly with the visitor's mobile number (`https://wa.me/...`).
  - ✉️ **Email Button**: Pre-fills a formatted reply email.
- **Inquiry Management**: Search by name/phone/email, filter by status (All, Unread, Read, Replied), mark as read/replied, and delete.
- **CSV Export**: 1-click download of all captured inquiries and mobile numbers into a spreadsheet.

### 🗄️ Hybrid Database Engine
- **MongoDB Atlas Integration**: Production persistence using Mongoose (`src/models/Message.ts`).
- **Zero-Config Local Fallback**: Works immediately out of the box even before configuring MongoDB, saving inquiries locally during development.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Frontend Library** | [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & Custom Glassmorphism CSS |
| **Smooth Scrolling** | [Lenis](https://lenis.darkroom.engineering/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Database & ODM** | [MongoDB Atlas](https://www.mongodb.com/atlas) & [Mongoose](https://mongoosejs.com/) |

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/abhishek-jha-321/personal-porfolio.git
cd personal-porfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory (refer to `.env.local.example`):
```env
# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority

# Secret Passcode for Admin Dashboard (/admin)
ADMIN_SECRET=admin123
```

> **Note**: If `MONGODB_URI` is left blank, the app runs in local fallback mode so you can test submissions and the dashboard right away!

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- **Main Website**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin) *(Passcode: `admin123`)*

---

## 📁 Project Structure

```
personal-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (Google Fonts, Lenis SmoothScroll)
│   │   ├── page.tsx               # Main portfolio landing page
│   │   ├── globals.css            # Obsidian Ember color tokens & glass utilities
│   │   ├── admin/
│   │   │   ├── page.tsx           # Private Admin Lead Console (Calls, WhatsApp, Stats)
│   │   │   └── login/page.tsx     # Passcode authentication page
│   │   └── api/
│   │       ├── contact/route.ts   # Form submission API (validates & saves inquiry)
│   │       └── admin/
│   │           ├── auth/route.ts  # Admin passcode verification & cookies
│   │           └── messages/route.ts # CRUD operations for inquiries
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive header with mobile drawer
│   │   ├── Hero.tsx               # Hero banner with animations & toolchain
│   │   ├── About.tsx              # About card with glowing halo portrait
│   │   ├── Skills.tsx             # 4-category Bento grid
│   │   ├── Projects.tsx           # 2x2 featured projects grid
│   │   ├── Experience.tsx         # Illuminated timeline with ember nodes
│   │   ├── Education.tsx          # B.Tech degree & curriculum pillars
│   │   ├── CurrentlyLearning.tsx  # 4 active learning phases
│   │   ├── ContactSection.tsx     # Connect & meeting inquiry form
│   │   ├── Footer.tsx             # Footer with back-to-top & quick links
│   │   └── SmoothScroll.tsx       # Lenis smooth scroll provider
│   ├── lib/
│   │   ├── mongodb.ts             # Cached Mongoose connection helper
│   │   └── messagesRepo.ts        # Hybrid persistence (MongoDB + Local Fallback)
│   └── models/
│       └── Message.ts             # Mongoose Schema for inquiries
├── .env.local.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚢 Production Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Under **Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection URI.
   - `ADMIN_SECRET`: Your private admin passcode.
4. Click **Deploy**.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
