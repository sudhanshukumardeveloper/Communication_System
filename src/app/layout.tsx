import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Communication Platform",
  description: "Scalable real-time communication platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-obsidian text-slate-100">{children}</body>
    </html>
  );
}
