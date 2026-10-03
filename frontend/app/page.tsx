'use client';

import React, { useState } from 'react';
import { Lock, LogOut, FileText, Save, LayoutDashboard } from 'lucide-react';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const [tickerText, setTickerText] = useState('The e-book catalog of rare agricultural books has been updated.');
  const [books, setBooks] = useState(1250);
  const [artifacts, setArtifacts] = useState(850);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsLoggedIn(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 flex flex-col justify-center items-center font-sans">
      {!isLoggedIn ? (
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
          <div className="p-3 bg-amber-500/10 text-amber-400 rounded-full w-fit mx-auto mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold mb-2">Krishi Library Admin Login</h2>
          <p className="text-xs text-gray-400 mb-6">এডমিন প্যানেলে প্রবেশ করতে পাসওয়ার্ড দিন</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Password (admin123)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 text-sm focus:outline-none focus:border-amber-500"
            />
            {error && <p className="text-xs text-red-400">ভুল পাসওয়ার্ড!</p>}
            
            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-black font-bold text-sm rounded-xl transition"
            >
              Login to Control Panel
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl max-w-3xl w-full shadow-2xl">
          <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-bold text-amber-400">Admin Control Panel</h2>
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center space-x-1 text-xs text-red-400 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Logout</span>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-2">টপবার নোটিশ/স্ক্রলার আপডেট করুন:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tickerText}
                  onChange={(e) => setTickerText(e.target.value)}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-sm focus:outline-none"
                />
                <button className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center">
                  <Save className="h-4 w-4 mr-1" /> Save
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Library Books Count</label>
                <input
                  type="number"
                  value={books}
                  onChange={(e) => setBooks(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Museum Artifacts Count</label>
                <input
                  type="number"
                  value={artifacts}
                  onChange={(e) => setArtifacts(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}