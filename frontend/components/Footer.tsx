import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#012213] text-white py-6 text-center text-sm border-t border-emerald-900">
      <p className="text-emerald-300">
        © {new Date().getFullYear()} শাহ কৃষি তথ্য পাঠাগার ও জাদুঘর। সর্বস্বত্ব সংরক্ষিত।
      </p>
    </footer>
  );
}