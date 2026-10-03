'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, BookOpen, Landmark, Sprout, ArrowRight, Sun, Moon, 
  ChevronLeft, ChevronRight, ChevronDown, Globe, X, UserCheck,
  CloudSun, LayoutDashboard, Plus, Trash2, Edit, Save, FileText, CheckCircle
} from 'lucide-react';

export default function Home() {
  const [view, setView] = useState<'public' | 'admin'>('public');
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<'bn' | 'en'>('bn');

  // Weather States
  const [weatherList, setWeatherList] = useState<{ city: string; temp: number }[]>([]);
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Header Scroll & Search
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic Data States (LocalStorage / CMS persistence)
  const [newsList, setNewsList] = useState([
    { id: 1, textBn: 'শাহ্ কৃষি লাইব্রেরিতে যুক্ত হলো নতুন ৫০০টি বিরল ডিজিটাল ই-বুক।', textEn: '500 rare digital e-books added to Shah Agriculture Library.' },
    { id: 2, textBn: 'আগামী সপ্তাহে অনুষ্ঠিত হতে যাচ্ছে জাতীয় কৃষি জাদুঘর প্রদর্শনী ২০২৬।', textEn: 'National Agri Museum Exhibition 2026 to be held next week.' },
    { id: 3, textBn: 'নতুন ডিজিটাল আর্কাইভ সংস্করণে যুক্ত হলো ঐতিহ্যবাহী কৃষি যন্ত্রপাতির ক্যাটালগ।', textEn: 'Catalog of traditional farming tools added in new archive version.' },
    { id: 4, textBn: 'জৈব কৃষি ও আধুনিক বীজ সংরক্ষণ বিষয়ক ই-লার্নিং মডিউল উন্মুক্ত।', textEn: 'E-learning module on organic farming & seed preservation launched.' },
  ]);

  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Stats Counters
  const [stats, setStats] = useState({
    ebooks: 1500,
    artifacts: 1000,
    categories: 50
  });

  // Slide Images
  const [slides, setSlides] = useState([
    {
      id: 1,
      titleBn: 'কৃষি জ্ঞান ও আবহমান বাংলার ইতিহাসের ডিজিটাল সংরক্ষণাগার',
      titleEn: 'Digital Archive of Agricultural Knowledge & Heritage',
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop',
    },
    {
      id: 2,
      titleBn: 'ঐতিহ্যবাহী বিলুপ্তপ্রায় কৃষি যন্ত্রপাতি ও গ্রামীণ নিদর্শন',
      titleEn: 'Traditional Endangered Agricultural Artifacts & Heritage',
      imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1600&auto=format&fit=crop',
    },
    {
      id: 3,
      titleBn: 'জ্ঞানার্জনের অনন্য মাধ্যম ও সমৃদ্ধ ডিজিটাল লাইব্রেরি ক্যাটালগ',
      titleEn: 'Unique Educational Platform & E-Book Library Catalog',
      imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1600&auto=format&fit=crop',
    },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Admin New Ticker Form State
  const [newNoticeBn, setNewNoticeBn] = useState('');
  const [newNoticeEn, setNewNoticeEn] = useState('');

  // Fetch Weather
  useEffect(() => {
    async function fetchAllWeather() {
      try {
        setWeatherLoading(true);
        let userCity = lang === 'bn' ? 'ঢাকা (আপনার স্থান)' : 'Dhaka (Your Location)';
        let userLat = 23.8103;
        let userLon = 90.4125;

        try {
          const ipRes = await fetch('https://ipapi.co/json/');
          if (ipRes.ok) {
            const ipData = await ipRes.json();
            if (ipData.latitude && ipData.longitude) {
              userLat = ipData.latitude;
              userLon = ipData.longitude;
              userCity = ipData.city || userCity;
            }
          }
        } catch (e) {
          console.log('IP Location fetch fallback.');
        }

        const divisions = [
          { nameBn: userCity, nameEn: userCity, lat: userLat, lon: userLon },
          { nameBn: 'ঢাকা', nameEn: 'Dhaka', lat: 23.8103, lon: 90.4125 },
          { nameBn: 'চট্টগ্রাম', nameEn: 'Chittagong', lat: 22.3569, lon: 91.7832 },
          { nameBn: 'রাজশাহী', nameEn: 'Rajshahi', lat: 24.3636, lon: 88.6241 },
          { nameBn: 'খুলনা', nameEn: 'Khulna', lat: 22.8456, lon: 89.5403 },
        ];

        const fetchedData: { city: string; temp: number }[] = [];
        for (const div of divisions) {
          try {
            const res = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${div.lat}&longitude=${div.lon}&current_weather=true`
            );
            if (res.ok) {
              const data = await res.json();
              if (data.current_weather) {
                fetchedData.push({
                  city: lang === 'bn' ? div.nameBn : div.nameEn,
                  temp: Math.round(data.current_weather.temperature),
                });
              }
            }
          } catch (err) {}
        }

        if (fetchedData.length > 0) {
          setWeatherList(fetchedData);
        } else {
          setWeatherList([{ city: lang === 'bn' ? 'ঢাকা' : 'Dhaka', temp: 28 }]);
        }
      } catch (err) {
        setWeatherList([{ city: lang === 'bn' ? 'ঢাকা' : 'Dhaka', temp: 28 }]);
      } finally {
        setWeatherLoading(false);
      }
    }

    fetchAllWeather();
  }, [lang]);

  // Weather Rotation
  useEffect(() => {
    if (weatherList.length > 0) {
      const timer = setInterval(() => {
        setCurrentWeatherIndex((prev) => (prev + 1) % weatherList.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [weatherList]);

  // News Ticker Timer
  useEffect(() => {
    if (newsList.length > 0) {
      const newsTimer = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % newsList.length);
      }, 5000);
      return () => clearInterval(newsTimer);
    }
  }, [newsList.length]);

  // Add Notice in Admin
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeBn) return;
    const item = {
      id: Date.now(),
      textBn: newNoticeBn,
      textEn: newNoticeEn || newNoticeBn,
    };
    setNewsList([...newsList, item]);
    setNewNoticeBn('');
    setNewNoticeEn('');
  };

  // Delete Notice
  const handleDeleteNotice = (id: number) => {
    setNewsList(newsList.filter(item => item.id !== id));
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-[#F8F9FA] text-gray-800'} min-h-screen font-sans transition-colors duration-300`}>
      
      {/* Top Floating Control Bar */}
      <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-md">
        
        {/* White Solid Topbar */}
        <div className="bg-white text-gray-900 text-xs font-extrabold py-2 px-4 sm:px-8 border-b border-gray-200">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            
            <div className="flex items-center space-x-2 text-[#006A4E]">
              <CloudSun className="h-4 w-4 text-[#006A4E]" />
              {weatherLoading ? (
                <span>আবহাওয়া লোড হচ্ছে...</span>
              ) : (
                <span className="font-bold">
                  {weatherList[currentWeatherIndex]?.city}: {weatherList[currentWeatherIndex]?.temp}°C
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-800 font-bold hidden sm:inline">
                {lang === 'bn' ? 'সোমবার, ২১ সেপ্টেম্বর, ২০২৬' : 'Monday, September 21, 2026'}
              </span>

              {/* View Toggle (Frontend vs Admin Backend) */}
              <button
                onClick={() => setView(view === 'public' ? 'admin' : 'public')}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#006A4E] text-white hover:bg-emerald-800 transition"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>{view === 'public' ? (lang === 'bn' ? 'এডমিন ব্যাকএন্ড' : 'Admin Backend') : (lang === 'bn' ? 'মূল ওয়েবসাইট' : 'Public Site')}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Navigation Header */}
        <header className="bg-[#006A4E] text-white border-b-2 border-[#F42A41]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
            
            <a href="https://krishilibrary.com" target="_blank" rel="noreferrer" className="flex items-center space-x-2.5">
              <div className="p-1.5 rounded-lg bg-[#F42A41] text-white shadow-md">
                <Sprout className="h-5 w-5" />
              </div>
              <span className="text-base font-extrabold tracking-wide text-white">
                {lang === 'bn' ? 'শাহ্ কৃষি লাইব্রেরি' : 'Shah Krishilibrary'}
              </span>
            </a>

            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                className="flex items-center space-x-1 text-xs font-bold bg-[#F42A41] hover:bg-red-700 text-white px-3 py-1 rounded-full transition"
              >
                <Globe className="h-3 w-3" />
                <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
              </button>

              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 rounded-full hover:bg-white/10 text-white transition"
              >
                {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>

          </div>
        </header>

      </div>

      {/* Main Content Area */}
      <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* PUBLIC FRONTEND VIEW */}
        {view === 'public' && (
          <div>
            {/* Box-Free Ticker */}
            <div className="my-3 h-6 overflow-hidden relative text-xs font-semibold">
              {newsList.map((news, index) => (
                <div
                  key={news.id}
                  className={`absolute left-0 w-full transition-all duration-500 ${
                    index === currentNewsIndex ? 'top-0 opacity-100' : 'top-full opacity-0'
                  }`}
                >
                  <span className="text-[#006A4E] dark:text-emerald-400 font-bold mr-2">📌 নোটিশ:</span>
                  <span>{lang === 'bn' ? news.textBn : news.textEn}</span>
                </div>
              ))}
            </div>

            {/* Slider */}
            <div className="relative h-[300px] sm:h-[380px] rounded-2xl overflow-hidden bg-gray-900 shadow-xl mb-8">
              <div 
                className="h-full w-full bg-cover bg-center flex items-center px-8 transition-all duration-700"
                style={{ backgroundImage: `url(${slides[currentSlide].imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 max-w-xl text-white">
                  <h2 className="text-2xl font-black text-[#FFD700] mb-2 border-l-4 border-[#F42A41] pl-3">
                    {lang === 'bn' ? 'শাহ্ কৃষি পাঠাগার ও জাদুঘর' : 'Shah Agri Library & Museum'}
                  </h2>
                  <p className="text-lg font-bold">
                    {lang === 'bn' ? slides[currentSlide].titleBn : slides[currentSlide].titleEn}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <BookOpen className="h-8 w-8 text-[#006A4E] mb-3" />
                <h3 className="text-xl font-bold mb-2">{lang === 'bn' ? 'ডিজিটাল ই-লাইব্রেরি' : 'Digital E-Library'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {lang === 'bn' ? 'কৃষি বিষয়ক ই-বুক, সাময়িকী এবং গবেষণাপত্র ডিজিটাল আকারে পড়ুন।' : 'Read digital agricultural books and journals online.'}
                </p>
                <div className="text-xs font-bold text-[#006A4E]">মোট বই: {stats.ebooks}+</div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <Landmark className="h-8 w-8 text-[#F42A41] mb-3" />
                <h3 className="text-xl font-bold mb-2">{lang === 'bn' ? 'কৃষি জাদুঘর' : 'Agricultural Museum'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {lang === 'bn' ? 'বাংলার হাজার বছরের প্রাচীন বিলুপ্তপ্রায় কৃষি যন্ত্রপাতির সংগ্রহ।' : 'Explore ancient endangered farming tools and heritage.'}
                </p>
                <div className="text-xs font-bold text-[#F42A41]">মোট নিদর্শন: {stats.artifacts}+</div>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN BACKEND PANEL VIEW */}
        {view === 'admin' && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div>
                <h2 className="text-2xl font-black text-[#006A4E] dark:text-emerald-400">
                  {lang === 'bn' ? 'ওয়েবসাইট ব্যাকএন্ড কন্ট্রোল প্যানেল' : 'Website Admin Control Panel'}
                </h2>
                <p className="text-xs text-gray-500">এখানে পরিবর্তন করলে তা সরাসরি ফ্রন্ট পেজে আপডেট হবে।</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">● Live Sync</span>
            </div>

            {/* Manage News Ticker */}
            <div className="mb-8">
              <h3 className="text-base font-bold mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-[#F42A41]" />
                {lang === 'bn' ? 'নোটিশ ও নিউজ স্ক্রলার এডিট করুন' : 'Manage News Ticker'}
              </h3>

              <form onSubmit={handleAddNotice} className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="text"
                  placeholder="নতুন নোটিশ লিখুন (বাংলা)"
                  value={newNoticeBn}
                  onChange={(e) => setNewNoticeBn(e.target.value)}
                  className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#006A4E] text-white text-sm font-bold rounded-lg hover:bg-emerald-800 transition flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-1" /> যোগ করুন
                </button>
              </form>

              <div className="space-y-2">
                {newsList.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border text-xs">
                    <span>{item.textBn}</span>
                    <button
                      onClick={() => handleDeleteNotice(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Manage Stats */}
            <div>
              <h3 className="text-base font-bold mb-3">সংখ্যা ও পরিসংখ্যান আপডেট</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold block mb-1">ই-বুক সংখ্যা:</label>
                  <input
                    type="number"
                    value={stats.ebooks}
                    onChange={(e) => setStats({ ...stats, ebooks: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">জাদুঘর নিদর্শন:</label>
                  <input
                    type="number"
                    value={stats.artifacts}
                    onChange={(e) => setStats({ ...stats, artifacts: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">ক্যাটাগরি:</label>
                  <input
                    type="number"
                    value={stats.categories}
                    onChange={(e) => setStats({ ...stats, categories: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}