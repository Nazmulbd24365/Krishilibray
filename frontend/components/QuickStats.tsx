'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function QuickStats() {
  const [stats, setStats] = useState({
    total_books: 0,
    digital_ebooks: 0,
    rare_artifacts: 0,
    active_members: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const { data } = await supabase.from('library_stats').select('*').single();
      if (data) setStats(data);
    }
    loadStats();
  }, []);

  return (
    <section className="my-10 bg-gradient-to-r from-emerald-900 to-green-800 text-white rounded-2xl p-8 shadow-xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-4 bg-white/10 backdrop-blur rounded-xl">
          <h3 className="text-3xl font-extrabold text-amber-400">{stats.total_books}+</h3>
          <p className="text-xs md:text-sm mt-1 opacity-90">মুদ্রিত বই ও জার্নাল</p>
        </div>
        <div className="p-4 bg-white/10 backdrop-blur rounded-xl">
          <h3 className="text-3xl font-extrabold text-amber-400">{stats.digital_ebooks}+</h3>
          <p className="text-xs md:text-sm mt-1 opacity-90">ডিজিটাল ই-বুক</p>
        </div>
        <div className="p-4 bg-white/10 backdrop-blur rounded-xl">
          <h3 className="text-3xl font-extrabold text-amber-400">{stats.rare_artifacts}+</h3>
          <p className="text-xs md:text-sm mt-1 opacity-90">মিউজিয়াম স্মারক</p>
        </div>
        <div className="p-4 bg-white/10 backdrop-blur rounded-xl">
          <h3 className="text-3xl font-extrabold text-amber-400">{stats.active_members}+</h3>
          <p className="text-xs md:text-sm mt-1 opacity-90">সক্রিয় পাঠক ও গবেষক</p>
        </div>
      </div>
    </section>
  );
}