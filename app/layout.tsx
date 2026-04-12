import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LTO Quiz Reviewer",
  description: "Philippines LTO driver's license exam reviewer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="app-bg min-h-screen">{children}</body>
    </html>
  );
}
