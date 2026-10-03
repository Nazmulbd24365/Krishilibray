'use client';

import React, { useState, useEffect } from 'react';
import { 
  Globe, Sun, Moon, Lock, LogOut, LayoutDashboard, 
  Plus, Trash2, Edit, Save, FileText, CheckCircle2, CloudSun,
  BookOpen, Landmark, Sparkles
} from 'lucide-react';

export default function Home() {
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // States
  const [lang, setLang] = useState<'bn' | 'en'>('en');
  const [darkMode, setDarkMode] = useState(true);

  // Dynamic Ticker Data
  const [tickerText, setTickerText] = useState(
    'The e-book catalog of rare agricultural books has been updated.'
  );

  // Stats Data
  const [stats, setStats] = useState({
    books: 1250,
    artifacts: 850,
    publications: 320
  });

  // Admin Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === 'admin123') { // পাসওয়ার্ড হিসেবে admin123 সেট করা হয়েছে
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Top Utility Bar */}
      <div className="w-full bg-black/40 backdrop-blur-md border-b border-white/10 text-xs py-1.5 px-4 sm:px-8 text-white fixed top-0 z-50 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-emerald-400">
            <CloudSun className="h-3.5 w-3.5" />
            <span>Chittagong: 29°C (Partly Cloudy)</span>
          </div>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="hidden md:inline text-yellow-300 font-medium">
            📢 {tickerText}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hidden lg:inline text-gray-400">Saturday, October 3, 2026</span>
          
          {/* Admin Switcher */}
          <button
            onClick={() => setView(view === 'public' ? 'admin' : 'public')}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 text-black transition"
          >
            <LayoutDashboard className="h-3 w-3" />
            <span>{view === 'public' ? 'Admin' : 'Public Site'}</span>
          </button>

          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-2 py-0.5 rounded text-[11px] transition"
          >
            {lang === 'bn' ? 'English' : 'বাংলা'}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="pt-8">

        {/* PUBLIC FRONTEND VIEW */}
        {view === 'public' && (
          <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-16 pb-12 bg-gradient-to-b from-black/80 via-black/60 to-black/90">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600')] bg-cover bg-center -z-10 opacity-40"></div>

            <span className="px-3 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold rounded-full mb-4 inline-block tracking-widest uppercase">
              Heritage & Culture
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-400 max-w-4xl leading-tight mb-4 drop-shadow-md">
              Shah Krishi Information Library & Museum
            </h1>

            <p className="text-sm sm:text-base text-gray-200 max-w-2xl mb-8 font-light">
              Preserving agricultural heritage and trusted destination of enriched knowledge.
            </p>

            {/* Quick Live Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl w-full bg-black/50 border border-white/10 backdrop-blur-md p-4 rounded-2xl">
              <div>
                <div className="text-xl sm:text-2xl font-black text-amber-400">{stats.books}+</div>
                <div className="text-xs text-gray-400">Library Books</div>
              </div>
              <div className="border-x border-white/10">
                <div className="text-xl sm:text-2xl font-black text-emerald-400">{stats.artifacts}+</div>
                <div className="text-xs text-gray-400">Museum Items</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-yellow-400">{stats.publications}+</div>
                <div className="text-xs text-gray-400">Publications</div>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN BACKEND CONTROL VIEW */}
        {view === 'admin' && (
          <div className="max-w-4xl mx-auto my-12 px-4">
            {!isLoggedIn ? (
              /* Admin Login Form */
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md mx-auto shadow-2xl text-center">
                <div className="p-3 bg-amber-500/10 text-amber-400 rounded-full w-fit mx-auto mb-4">
                  <Lock className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold mb-1">Admin Dashboard Login</h2>
                <p className="text-xs text-gray-400 mb-6">এডমিন প্যানেলে প্রবেশ করতে পাসওয়ার্ড দিন</p>

                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="password"
                    placeholder="পাসওয়ার্ড লিখুন (Default: admin123)"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:border-amber-500"
                  />
                  {loginError && <p className="text-xs text-red-400">ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।</p>}
                  
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold text-sm rounded-xl transition"
                  >
                    Login to Control Panel
                  </button>
                </form>
              </div>
            ) : (
              /* Admin CMS Panel */
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-amber-400">Website CMS & Control Panel</h2>
                    <p className="text-xs text-gray-400">লাইভ ওয়েবসাইটের বিষয়বস্তু পরিবর্তন করুন</p>
                  </div>
                  <button
                    onClick={() => setIsLoggedIn(false)}
                    className="flex items-center space-x-1 text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Logout</span>
                  </button>
                </div>

                {/* 1. Update Ticker Notice */}
                <div className="mb-8">
                  <label className="block text-xs font-bold text-gray-300 mb-2">
                    টপবার নোটিশ/স্ক্রলার আপডেট করুন:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tickerText}
                      onChange={(e) => setTickerText(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm focus:outline-none"
                    />
                    <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center">
                      <Save className="h-4 w-4 mr-1" /> Save
                    </button>
                  </div>
                </div>

                {/* 2. Update Statistics */}
                <div>
                  <h3 className="text-sm font-bold text-gray-300 mb-3">পরিসংখ্যান ডেটা আপডেট:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Library Books</label>
                      <input
                        type="number"
                        value={stats.books}
                        onChange={(e) => setStats({ ...stats, books: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Museum Items</label>
                      <input
                        type="number"
                        value={stats.artifacts}
                        onChange={(e) => setStats({ ...stats, artifacts: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Publications</label>
                      <input
                        type="number"
                        value={stats.publications}
                        onChange={(e) => setStats({ ...stats, publications: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}