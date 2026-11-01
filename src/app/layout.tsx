import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abhishek Jha | AI & Full-Stack Developer",
  description:
    "Portfolio of Abhishek Jha — AI & Full-Stack Developer building modern web applications and exploring intelligent digital experiences.",
  keywords: [
    "Abhishek Jha",
    "Portfolio",
    "Full-Stack Developer",
    "AI Developer",
    "Next.js",
    "React",
    "Machine Learning",
  ],
  authors: [{ name: "Abhishek Jha" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${plusJakarta.variable} ${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="bg-canvas text-text-primary antialiased min-h-screen selection:bg-ember-primary selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
