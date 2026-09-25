import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "কৃষি লাইব্রেরি - শাহ কৃষি তথ্য পাঠাগার ও জাদুঘর",
  description: "Shah Krishi Information Library & Museum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-gray-800 antialiased`}>
        {/* layout.tsx থেকে ডুপ্লিকেট Navbar বাদ দেওয়া হলো */}
        <main>{children}</main>
      </body>
    </html>
  );
}