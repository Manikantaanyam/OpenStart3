import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import IssueTicker from "@/components/issue-ticker";
import { getHomeData } from "@/lib/data";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenStart",
  description:
    "OpenStart helps beginners discover open source projects and beginner-friendly issues like good first issue, docs, and bugs etc.,",
  keywords: [
    "open source",
    "good first issue",
    "beginner friendly",
    "github issues",
    "open source for beginners",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { issueData } = await getHomeData();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#050505]`}
      >
        <Navbar />
        <IssueTicker initialIssues={issueData} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
