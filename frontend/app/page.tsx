"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type Language = "bn" | "en";

interface WeatherData {
  cityBn: string;
  cityEn: string;
  temp: number;
  conditionBn: string;
  conditionEn: string;
}

// विभागों का मौसम डेटा
const DIVISION_WEATHER: WeatherData[] = [
  { cityBn: "ঢাকা", cityEn: "Dhaka", temp: 28, conditionBn: "ঘোলাটে রোদ", conditionEn: "Hazy Sun" },
  { cityBn: "রাজশাহী", cityEn: "Rajshahi", temp: 30, conditionBn: "রৌদ্রোজ্জ্বল", conditionEn: "Sunny" },
  { cityBn: "চট্টগ্রাম", cityEn: "Chittagong", temp: 29, conditionBn: "আংশিক মেঘলা", conditionEn: "Partly Cloudy" },
  { cityBn: "ময়মনসিংহ", cityEn: "Mymensingh", temp: 28, conditionBn: "আংশিক মেঘলা", conditionEn: "Partly Cloudy" },
  { cityBn: "খুলনা", cityEn: "Khulna", temp: 28, conditionBn: "মেঘলা", conditionEn: "Cloudy" },
  { cityBn: "বরিশাল", cityEn: "Barisal", temp: 27, conditionBn: "হালকা বৃষ্টি", conditionEn: "Light Rain" },
  { cityBn: "সিলেট", cityEn: "Sylhet", temp: 26, conditionBn: "বৃষ্টি", conditionEn: "Rain" },
  { cityBn: "রংপুর", cityEn: "Rangpur", temp: 29, conditionBn: "রৌদ্রোজ্জ্বল", conditionEn: "Sunny" },
];

const NOTICES = [
  {
    bn: "📢 কৃষি লাইব্রেরির নতুন অনলাইন পোর্টাল চালুর ঘোষণা।",
    en: "📢 Announcement of the launch of Krishi Library's new online portal.",
  },
  {
    bn: "🌾 আগামী সপ্তাহে শাহ কৃষি জাদুঘরে নতুন প্রত্নতাত্ত্বিক প্রদর্শনী শুরু হবে।",
    en: "🌾 A new archaeological exhibition starts at Shah Krishi Museum next week.",
  },
  {
    bn: "📚 দুর্লভ কৃষি বিষয়ক বইয়ের ই-বুক ক্যাটালগ আপডেট করা হয়েছে।",
    en: "📚 The e-book catalog of rare agricultural books has been updated.",
  },
];

const HERO_SLIDES = [
  {
    id: 1,
    imageUrl: "https://zlqhpgchrxfapxyqyrli.supabase.co/storage/v1/object/sign/Slider%20Images/1628936969.jpg?token=eyJraWQiOiJjZDUzODVkMC00YzI5LTRjZTctYjA5OS00YmNiZmZhM2NmMWIiLCJhbGciOiJIUzUxMiJ9.eyJ1cmwiOiJTbGlkZXIgSW1hZ2VzLzE2Mjg5MzY5NjkuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MDMxODMxNiwiZXhwIjoxODIxODU0MzE2fQ.csD2ACYjCUfUXZaY0Zp7z7zEAnWUt4fY78ae60fV_K4p9SmDLkSk6NO4LCYdbri0KPVjaDE2gDs_tFP_1KNuwQ",
    badgeBn: "স্বাগতম জ্ঞানভাণ্ডারে",
    badgeEn: "Welcome to Knowledge Hub",
    titleBn: "কৃষি লাইব্রেরিতে আপনাকে স্বাগতম",
    titleEn: "Welcome to Krishi Library",
    subtitleBn: "সংগ্রহে থাকা শত শত কৃষি বিষয়ক গবেষণা ও দুর্লভ বই থেকে তথ্য খুঁজুন।",
    subtitleEn: "Search information from hundreds of agricultural research and rare books.",
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1600",
    badgeBn: "ঐতিহ্যি",
    badgeEn: "Heritage & Culture",
    titleBn: "শাহ কৃষি তথ্য পাঠাগার ও জাদুঘর",
    titleEn: "Shah Krishi Information Library & Museum",
    subtitleBn: "কৃষি ঐতিহ্যের সুরক্ষা এবং সমৃদ্ধ জ্ঞানভাণ্ডারের বিশ্বস্ত ঠিকানা।",
    subtitleEn: "Preserving agricultural heritage and trusted destination of enriched knowledge.",
  },
];

const ABOUT_IMAGES = [
  "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800",
  "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800",
  "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800"
];

const TESTIMONIALS = [
  {
    id: 1,
    nameBn: "ড. মো: আব্দুর রশীদ",
    nameEn: "Dr. Md. Abdur Rashid",
    roleBn: "কৃষি বিজ্ঞানী, BARC",
    roleEn: "Agricultural Scientist, BARC",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    commentBn: "শাহ কৃষি পাঠাগার প্রান্তিক কৃষকদের তথ্য ও আধুনিক কৃষির মাঝে একটি অসাধারণ মেলবন্ধন তৈরি করেছে। এটি সত্যিই প্রশংসনীয়।",
    commentEn: "Shah Krishi Library has built a bridge between marginal farmers and modern agricultural information. Highly commendable.",
  },
  {
    id: 2,
    nameBn: "অধ্যাপক ড. রফিকুল ইসলাম",
    nameEn: "Prof. Dr. Rafiqul Islam",
    roleBn: "বাংলাদেশ কৃষি বিশ্ববিদ্যালয়",
    roleEn: "Bangladesh Agricultural University",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    commentBn: "গবেষক ও শিক্ষার্থীদের জন্য এখানে থাকা দুর্লভ বই এবং ঐতিহ্যবাহী কৃষি যন্ত্রপাতির সংগ্রহ এক অমূল্য সম্পদ।",
    commentEn: "The collection of rare books and traditional farm equipment here is an invaluable resource for researchers and students.",
  }
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Language>("bn");
  const [weatherList, setWeatherList] = useState<WeatherData[]>(DIVISION_WEATHER);
  const [weatherIdx, setWeatherIdx] = useState(0);
  const [noticeIdx, setNoticeIdx] = useState(0);
  const [heroIdx, setHeroIdx] = useState(0);
  const [aboutImgIdx, setAboutImgIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  
  // Header background toggle on scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Counters
  const [counts, setCounts] = useState({ books: 0, ebook: 0, museum: 0, readers: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll listener for Header background & Back-to-Top Button
  useEffect(() => {
    const handleScroll = () => {
      // Header background scroll detection
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Back to top button visibility
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IP based Weather Fetch
  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        
        if (data && data.city) {
          const userLocWeather: WeatherData = {
            cityBn: `${data.city} (আপনার স্থান)`,
            cityEn: `${data.city} (Your Location)`,
            temp: 29,
            conditionBn: "আংশিক মেঘলা",
            conditionEn: "Partly Cloudy",
          };
          setWeatherList([userLocWeather, ...DIVISION_WEATHER]);
        }
      } catch (error) {
        console.warn("Weather location fetch failed:", error);
      }
    };

    fetchUserLocation();
  }, []);

  // 4 Sec Interval for Weather & Notice Slider
  useEffect(() => {
    const weatherTimer = setInterval(() => {
      setWeatherIdx((prev) => (prev + 1) % weatherList.length);
    }, 4000);

    const noticeTimer = setInterval(() => {
      setNoticeIdx((p) => (p + 1) % NOTICES.length);
    }, 4000);

    return () => {
      clearInterval(weatherTimer);
      clearInterval(noticeTimer);
    };
  }, [weatherList]);

  // Hero & Other Sliders
  useEffect(() => {
    const heroTimer = setInterval(() => setHeroIdx((p) => (p + 1) % HERO_SLIDES.length), 5000);
    const aboutTimer = setInterval(() => setAboutImgIdx((p) => (p + 1) % ABOUT_IMAGES.length), 3500);
    const testmTimer = setInterval(() => setTestimonialIdx((p) => (p + 1) % TESTIMONIALS.length), 4500);

    return () => {
      clearInterval(heroTimer);
      clearInterval(aboutTimer);
      clearInterval(testmTimer);
    };
  }, []);

  // Counter Animation
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const interval = 30;
    const steps = duration / interval;

    const target = { books: 2450, ebook: 850, museum: 320, readers: 15000 };
    const increment = {
      books: target.books / steps,
      ebook: target.ebook / steps,
      museum: target.museum / steps,
      readers: target.readers / steps,
    };

    const counterTimer = setInterval(() => {
      start++;
      setCounts({
        books: Math.min(Math.floor(increment.books * start), target.books),
        ebook: Math.min(Math.floor(increment.ebook * start), target.ebook),
        museum: Math.min(Math.floor(increment.museum * start), target.museum),
        readers: Math.min(Math.floor(increment.readers * start), target.readers),
      });

      if (start >= steps) clearInterval(counterTimer);
    }, interval);

    return () => clearInterval(counterTimer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeWeather = weatherList[weatherIdx] || weatherList[0];

  const formattedDate = mounted
    ? new Date().toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans relative">
      
      {/* ================= DYNAMIC HEADER (TRANSPARENT ON TOP, SOLID ON SCROLL) ================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-[#012213]/95 backdrop-blur-md shadow-xl border-b border-emerald-900/60"
            : "bg-transparent backdrop-blur-none shadow-none border-b border-transparent"
        }`}
      >
        
        {/* TOP BAR */}
        <div className="text-white py-2 px-4 border-b border-white/10 text-xs sm:text-sm">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
            
            {/* WEATHER */}
            <div className="flex items-center gap-2 min-w-[250px]">
              <span className="bg-emerald-800/80 text-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-600/60 backdrop-blur-sm">
                📍 {lang === "bn" ? "আবহাওয়া" : "Weather"}
              </span>
              <div className="flex items-center gap-1.5 font-medium transition-all duration-500">
                <span className="font-bold text-amber-300">
                  {lang === "bn" ? activeWeather.cityBn : activeWeather.cityEn}:
                </span>
                <span className="text-white font-semibold">{activeWeather.temp}°C</span>
                <span className="text-emerald-300 text-xs">
                  ({lang === "bn" ? activeWeather.conditionBn : activeWeather.conditionEn})
                </span>
              </div>
            </div>

            {/* NOTICE SLIDER 7s) */}
            <div className="flex-1 text-center overflow-hidden h-6 relative w-full max-w-lg">
              {NOTICES.map((notice, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center ${
                    idx === noticeIdx
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform -translate-y-4 pointer-events-none"
                  }`}
                >
                  <p className="text-amber-200 font-medium truncate px-2">
                    {lang === "bn" ? notice.bn : notice.en}
                  </p>
                </div>
              ))}
            </div>

            {/* DATE & SOCIAL */}
            <div className="flex items-center gap-3 text-emerald-300 text-xs min-w-[200px] justify-end">
              <span>🗓️ {formattedDate}</span>
              <div className="flex items-center gap-1.5 font-bold text-white border-l border-white/20 pl-3">
                <span className="hover:text-amber-400 cursor-pointer">FB</span>
                <span>•</span>
                <span className="hover:text-amber-400 cursor-pointer">YT</span>
              </div>
            </div>

          </div>
        </div>

        {/* MAIN NAV */}
        <div className="py-3 px-4 sm:px-6 text-white">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
            
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-xl border border-emerald-400 shadow-md">
                🌾
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white leading-none">
                  {lang === "bn" ? "কৃষি লাইব্রেরি" : "Krishi Library"}
                </h1>
                <p className="text-[11px] text-emerald-200 font-medium mt-0.5">
                  {lang === "bn"
                    ? "শাহ কৃষি তথ্য পাঠাগার ও জাদুঘর"
                    : "Shah Krishi Information Library & Museum"}
                </p>
              </div>
            </Link>

            <nav className="flex flex-wrap items-center gap-4 sm:gap-6 font-semibold text-sm">
              <Link href="/" className="hover:text-amber-300 transition text-amber-300 font-bold">
                {lang === "bn" ? "হোম" : "Home"}
              </Link>
              <Link href="/about" className="hover:text-amber-300 transition">
                {lang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
              </Link>
              <Link href="/library" className="hover:text-amber-300 transition">
                {lang === "bn" ? "লাইব্রেরি ক্যাটালগ" : "Library Catalog"}
              </Link>
              <Link href="/museum" className="hover:text-amber-300 transition">
                {lang === "bn" ? "কৃষি মিউজিয়াম" : "Krishi Museum"}
              </Link>
              <Link href="/publication" className="hover:text-amber-300 transition">
                {lang === "bn" ? "পাবলিকেশন" : "Publications"}
              </Link>
              <Link href="/achievements" className="hover:text-amber-300 transition">
                {lang === "bn" ? "অর্জনাদি" : "Achievements"}
              </Link>
              <Link href="/program" className="hover:text-amber-300 transition">
                {lang === "bn" ? "কর্মসূচি" : "Programs"}
              </Link>

              {/* LANGUAGE TOGGLE */}
              <button
                onClick={() => setLang(lang === "bn" ? "en" : "bn")}
                className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-1.5 rounded-full font-bold shadow-md transition transform hover:scale-105 border border-amber-400 ml-2"
              >
                🌐 {lang === "bn" ? "English" : "বাংলা"}
              </button>
            </nav>

          </div>
        </div>

      </header>

      {/* ================= HERO SLIDER ================= */}
      <section className="relative w-full h-[520px] sm:h-[600px] overflow-hidden bg-slate-950 pt-20">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === heroIdx ? "opacity-100 z-10 scale-105" : "opacity-0 z-0 scale-100"
            } transform transition-transform duration-[7000ms]`}
          >
            <img src={slide.imageUrl} alt="Banner" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#011c10] via-black/40 to-black/30" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pt-16 pb-8">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md mb-3 animate-pulse">
                {lang === "bn" ? slide.badgeBn : slide.badgeEn}
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-amber-300 drop-shadow-md tracking-tight leading-tight max-w-4xl">
                {lang === "bn" ? slide.titleBn : slide.titleEn}
              </h2>
              <p className="text-emerald-100 mt-3 text-sm sm:text-xl max-w-2xl font-light drop-shadow">
                {lang === "bn" ? slide.subtitleBn : slide.subtitleEn}
              </p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === heroIdx ? "bg-amber-400 w-8" : "bg-white/50 w-2 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ================= COUNTER CARDS ================= */}
      <section className="bg-slate-100 py-10 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition shrink-0">
                📚
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-950 tracking-tight">
                  {counts.books.toLocaleString()}+
                </div>
                <div className="text-xs font-bold text-gray-600 mt-0.5 uppercase tracking-wider">
                  {lang === "bn" ? "মুদ্রিত বই ও জার্নাল" : "Printed Books & Journals"}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-700 text-white rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition shrink-0">
                💻
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-950 tracking-tight">
                  {counts.ebook.toLocaleString()}+
                </div>
                <div className="text-xs font-bold text-gray-600 mt-0.5 uppercase tracking-wider">
                  {lang === "bn" ? "ডিজিটাল ই-বুক" : "Digital E-Books"}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-green-800 text-white rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition shrink-0">
                🏛️
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-950 tracking-tight">
                  {counts.museum.toLocaleString()}+
                </div>
                <div className="text-xs font-bold text-gray-600 mt-0.5 uppercase tracking-wider">
                  {lang === "bn" ? "মিউজিয়াম স্মারক" : "Museum Artifacts"}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex items-center gap-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-700 text-white rounded-xl flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition shrink-0">
                👥
              </div>
              <div>
                <div className="text-3xl font-black text-amber-600 tracking-tight">
                  {counts.readers.toLocaleString()}+
                </div>
                <div className="text-xs font-bold text-gray-600 mt-0.5 uppercase tracking-wider">
                  {lang === "bn" ? "সক্রিয় পাঠক ও গবেষক" : "Active Readers & Researchers"}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10 items-center">
          
          <div className="relative h-[320px] sm:h-[380px] rounded-xl overflow-hidden shadow-md">
            {ABOUT_IMAGES.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="About Us"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  idx === aboutImgIdx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {ABOUT_IMAGES.map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${i === aboutImgIdx ? "bg-amber-400 w-6" : "bg-white/70"} transition-all`}
                />
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              {lang === "bn" ? "আমাদের কথা" : "About Us"}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-3 mb-4">
              {lang === "bn" ? "আমাদের সম্পর্কে" : "About Our Initiative"}
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base text-justify">
              {lang === "bn"
                ? "আমি মো. জাহাঙ্গীর আলম শাহ্। একবারে নিভৃত পল্লিতে কৃষকের ঘরে জন্মগ্রহণ করি। জন্মের পর থেকেই কৃষি ও কৃষকের চাষ-বাস এবং প্রান্তিক চাষীদের জীবন ব্যবস্থার অতীব করুণ ও রুগ্নচিত্র দেখেছি খুব কাছ থেকে। শিশুকাল থেকেই কৃষির প্রতি অনুরাগী ছিলাম। পাশাপাশি কৃষি শিক্ষার ভাণ্ডারের অভাব আমার জীবনকে দারুণভাবে স্পর্শ করতো। মূলত সে কারণেই কৃষি কাঠামোর দ্রুত পরিবর্তনে কৃষক উপযোগী পাঠাগার ও জাদুঘর প্রতিষ্ঠা করি। ২০০৮ খ্রিস্টাব্দে কৃষিতথ্য পাঠাগার ও জাদুঘর কার্যক্রম শুরু করে এজাবতকাল নানা আয়োজনের মাধ্যমে কৃষি শিক্ষা এবং পরিবেশ উন্নয়নে ভূমিকা রেখে চলেছে।"
                : "I am Md. Jahangir Alam Shah. Born in a farmer's family in a remote village, I experienced the challenges of farming life closely. Since childhood, I possessed a deep passion for agriculture. To bridge the gap in agricultural knowledge, I established this library and museum in 2008, contributing continuously to agricultural education and environmental development."}
            </p>

            <Link href="/about">
              <button className="mt-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-lg transition shadow-md flex items-center gap-2">
                {lang === "bn" ? "বিস্তারিত জানতে ➔" : "Read More ➔"}
              </button>
            </Link>
          </div>

        </div>
      </section>

      {/* ================= ৩টি প্রফেশনাল কার্ড (লক্ষ্য, উদ্দেশ্য, গন্তব্য) ================= */}
      <section className="bg-gradient-to-b from-[#012213] via-[#02331d] to-[#011a0e] text-white py-20 px-4 relative overflow-hidden">
        
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-widest">
              {lang === "bn" ? "আমাদের মূল ভিত্তি" : "Our Core Pillars"}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-white mt-3">
              {lang === "bn" ? "লক্ষ্য, উদ্দেশ্য ও গন্তব্য" : "Mission, Vision & Goal"}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="group relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/50 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-amber-300 rounded-2xl flex items-center justify-center text-slate-950 font-black text-2xl mb-6 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                  🎯
                </div>
                <h4 className="text-2xl font-bold text-amber-300 mb-3 group-hover:text-amber-200 transition-colors">
                  {lang === "bn" ? "লক্ষ্য" : "Vision"}
                </h4>
                <p className="text-emerald-100/90 text-sm leading-relaxed">
                  {lang === "bn"
                    ? "SAIL-এর প্রধান লক্ষ্য হলো কৃষকদের কৃষি-বিষয়ক তথ্য ও শিক্ষামূলক সেবা একটি আধুনিক ও সর্বজনীন একক প্ল্যাটফর্মের আওতায় সফলভাবে পৌঁছে দেওয়া।"
                    : "SAIL's primary vision is to deliver modern agricultural information and educational services under a unified accessible platform."}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-400/80 font-semibold">
                <span>{lang === "bn" ? "স্বচ্ছতা ও সমৃদ্ধি" : "Transparency & Growth"}</span>
                <span>01</span>
              </div>
            </div>

            <div className="group relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/50 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-gradient-to-tr from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-slate-950 font-black text-2xl mb-6 shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  💡
                </div>
                <h4 className="text-2xl font-bold text-amber-300 mb-3 group-hover:text-amber-200 transition-colors">
                  {lang === "bn" ? "উদ্দেশ্য" : "Mission"}
                </h4>
                <p className="text-emerald-100/90 text-sm leading-relaxed">
                  {lang === "bn"
                    ? "'শাহ কৃষি তথ্য পাঠাগার' স্থানীয় ও জাতীয় পর্যায়ের কৃষকদের জন্য কৃষি বিষয়ক জ্ঞানভাণ্ডার এবং আধুনিক তথ্যের ক্ষেত্র হিসেবে নিজেকে গড়ে তুলতে নিবেদিত।"
                    : "Dedicated to serving local and national farmers as a premier knowledge center for agricultural information and modern practices."}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-emerald-400/80 font-semibold">
                <span>{lang === "bn" ? "জ্ঞান ও আধুনিকায়ন" : "Knowledge & Innovation"}</span>
                <span>02</span>
              </div>
            </div>

            <div className="group relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-amber-400/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/50 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 bg-gradient-to-tr from-amber-400 to-emerald-400 rounded-2xl flex items-center justify-center text-slate-950 font-black text-2xl mb-6 shadow-lg shadow-emerald-400/20 group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <h4 className="text-2xl font-bold text-amber-300 mb-3 group-hover:text-amber-200 transition-colors">
                  {lang === "bn" ? "গন্তব্য" : "Goal"}
                </h4>
                <p className="text-emerald-100/90 text-sm leading-relaxed">
                  {lang === "bn"
                    ? "কৃষকদের দক্ষতা বিকাশে মৌলিক ও কারিগরি তথ্য প্রদান করা, যাতে তারা আধুনিক কৃষির সাথে তাল মিলিয়ে নিজেদের আত্মনির্ভরশীল ও সক্ষম করতে পারেন।"
                    : "Equipping farmers with practical and technical knowledge to empower them towards self-reliance and modern farming mastery."}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-amber-400/80 font-semibold">
                <span>{lang === "bn" ? "স্থায়িত্ব ও স্বাবলম্বিতা" : "Sustainability"}</span>
                <span>03</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CHAIRMAN MESSAGE ================= */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-emerald-100 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mb-6">
            {lang === "bn" ? "প্রতিষ্ঠাতা চেয়ারম্যানের বার্তা" : "Founder Chairman's Message"}
          </h3>
          
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-justify mb-8">
            {lang === "bn"
              ? "দেশে কৃষি শিক্ষার ধারাবাহিক কোনো উন্নয়ন পরিলক্ষিত হচ্ছে না। মূলত কৃষকদের নিজস্ব অভিজ্ঞতার ওপর ভিত্তি করেই কৃষিসংক্রান্ত বিভিন্ন সমস্যার সমাধান খুঁজে নেওয়া হয়েছে। তাই কৃষি শিক্ষার বিভিন্ন দিককে সমৃদ্ধ করতে কৃষকদের অর্জিত জ্ঞানের সাথে আধুনিক কৃষি-তথ্য ও প্রযুক্তির সমন্বয় ঘটানো প্রয়োজন। কিন্তু আমাদের দেশে তথ্য ও জ্ঞানের সহজলভ্যতা সবার জন্য সমান নয়। কৃষকরা কৃষিবিজ্ঞান বা বিশেষজ্ঞদের সাথে বিষয়ভিত্তিক যোগাযোগের সুযোগ থেকে বঞ্চিত এবং তারা কৃষি বিষয়ক সুনির্দিষ্ট ও তথ্যবহুল বইয়ের জন্য আগ্রহী। এই বাস্তবতাই কৃষকদের জন্য একটি তথ্য-ভাণ্ডার বা লাইব্রেরি প্রতিষ্ঠার প্রয়োজনীয়তা সৃষ্টি করেছিল।"
              : "Continuous improvement in agricultural education has been limited. Farmers often rely solely on personal experience to solve agricultural issues. Integrating traditional wisdom with modern agricultural technology is crucial. Recognizing this need, we established this library to provide accessible knowledge to farmers."}
          </p>

          <div className="flex flex-col items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200"
              alt="Jahangir Alam Shah"
              className="w-24 h-24 rounded-full object-cover border-4 border-emerald-600 shadow-md mb-3"
            />
            <h5 className="font-bold text-emerald-900 text-lg">
              {lang === "bn" ? "জাহাঙ্গীর আলম শাহ" : "Jahangir Alam Shah"}
            </h5>
            <p className="text-xs font-semibold text-amber-700">
              {lang === "bn" ? "প্রতিষ্ঠাতা চেয়ারম্যান" : "Founder Chairman"}
            </p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-emerald-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mb-8">
            {lang === "bn" ? "দর্শনার্থীর বার্তা" : "Visitors' Testimonials"}
          </h3>

          <div className="relative bg-white p-8 rounded-2xl shadow-md border border-emerald-100 min-h-[200px] flex flex-col justify-center items-center">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={item.id}
                className={`transition-all duration-700 ${
                  idx === testimonialIdx ? "opacity-100 block" : "opacity-0 hidden"
                }`}
              >
                <p className="text-gray-700 italic text-base sm:text-lg mb-6">
                  "{lang === "bn" ? item.commentBn : item.commentEn}"
                </p>
                <div className="flex items-center gap-3 justify-center">
                  <img
                    src={item.image}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600"
                  />
                  <div className="text-left">
                    <h5 className="font-bold text-emerald-900 text-sm">
                      {lang === "bn" ? item.nameBn : item.nameEn}
                    </h5>
                    <p className="text-xs text-gray-500">
                      {lang === "bn" ? item.roleBn : item.roleEn}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#012213] text-white py-6 text-center text-sm border-t border-emerald-900">
        <p className="text-emerald-300">
          © {new Date().getFullYear()}{" "}
          {lang === "bn"
            ? "শাহ কৃষি তথ্য পাঠাগার ও জাদুঘর। সর্বস্বত্ব সংরক্ষিত।"
            : "Shah Krishi Information Library & Museum. All rights reserved."}
        </p>
      </footer>

      {/* ================= TOP SCROLL BUTTON ================= */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-amber-500 hover:bg-amber-600 text-emerald-950 p-3.5 rounded-full shadow-2xl transition-all transform hover:scale-110 font-bold border-2 border-amber-300"
          title="Top"
        >
          ⬆️
        </button>
      )}

    </div>
  );
}
