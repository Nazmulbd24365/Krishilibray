import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, BookOpen, Landmark, Sprout, ArrowRight, Sun, Moon, 
  ChevronLeft, ChevronRight, ChevronDown, Globe, X, UserCheck,
  CloudSun, LayoutDashboard, FileText, Package, Settings, Plus,
  Trash2, Edit3, Eye, CheckCircle, RefreshCw, LogOut, Download,
  Sliders, Image as ImageIcon, ExternalLink, ShieldCheck, Database
} from 'lucide-react';

const INITIAL_NEWS = [
  { id: '1', textBn: 'শাহ্ কৃষি লাইব্রেরিতে যুক্ত হলো নতুন ৫০০টি বিরল ডিজিটাল ই-বুক।', textEn: '500 rare digital e-books added to Shah Agriculture Library.', active: true },
  { id: '2', textBn: 'আগামী সপ্তাহে অনুষ্ঠিত হতে যাচ্ছে জাতীয় কৃষি জাদুঘর প্রদর্শনী ২০২৬।', textEn: 'National Agri Museum Exhibition 2026 to be held next week.', active: true },
  { id: '3', textBn: 'নতুন ডিজিটাল আর্কাইভ সংস্করণে যুক্ত হলো ঐতিহ্যবাহী কৃষি যন্ত্রপাতির ক্যাটালগ।', textEn: 'Catalog of traditional farming tools added in new archive version.', active: true },
  { id: '4', textBn: 'জৈব কৃষি ও আধুনিক বীজ সংরক্ষণ বিষয়ক ই-লার্নিং মডিউল উন্মুক্ত।', textEn: 'E-learning module on organic farming & seed preservation launched.', active: true },
];

const INITIAL_BOOKS = [
  { id: 'b1', titleBn: 'আবহমান বাংলার ঐতিহ্যবাহী কৃষি সরঞ্জাম', titleEn: 'Traditional Farming Tools of Bengal', category: 'ইতিহাস ও ঐতিহ্য', author: 'অধ্যাপক ড. শাহজাহান আলী', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop' },
  { id: 'b2', titleBn: 'জৈব কৃষি ও মাটি ব্যবস্থাপনা প্রযুক্তি', titleEn: 'Organic Agriculture & Soil Management', category: 'কৃষি প্রযুক্তি', author: 'ড. আব্দুর রহিম', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', cover: 'https://images.unsplash.com/photo-1592417817098-8f3d6928e469?q=80&w=600&auto=format&fit=crop' },
  { id: 'b3', titleBn: 'বাংলাদেশে ধান চাষের বিবর্তন ও বীজ বিজ্ঞান', titleEn: 'Evolution of Paddy Farming in Bangladesh', category: 'বীজ বিজ্ঞান', author: 'ড. ফাতিমা বেগম', pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', cover: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600&auto=format&fit=crop' },
];

const INITIAL_ARTIFACTS = [
  { id: 'a1', titleBn: 'ঐতিহ্যবাহী কাঠের লাঙল ও জোয়াল', titleEn: 'Traditional Wooden Plough & Yoke', era: '১৯ শতক (১50 বছর প্রাচীন)', origin: 'পাবনা, বাংলাদেশ', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop', desc: 'গ্রাম বাংলার হাজার বছরের পলি মাটিতে বীজ বোনার মূল হাতিয়ার হিসেবে এই বিশেষ বাবলা কাঠের তৈরি লাঙল ব্যবহৃত হতো।' },
  { id: 'a2', titleBn: 'সংগ্রামী কৃষকের বাঁশের তৈরি মাথাল', titleEn: 'Bamboo Farmer Hat (Mathal)', era: '২০ শতক', origin: 'রাজশাহী, বাংলাদেশ', image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=800&auto=format&fit=crop', desc: 'কঠিন রোদ ও বৃষ্টি থেকে মাথা রক্ষা করতে হাতে বোনা বাঁশের তৈরি ঐতিহ্যবাহী টুপি।' },
  { id: 'a3', titleBn: 'সরিষা ও তিল মাড়াইয়ের কাঠের ঘানি', titleEn: 'Traditional Wooden Oil Press', era: '১৮ শতক', origin: 'বগুড়া, বাংলাদেশ', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop', desc: 'গরু দিয়ে ঘুরিয়ে প্রাকৃতিক উপায়ে খাঁটি তেল নিষ্কাশন করার বিশালাকার কাঠের তৈরি ঘানি।' },
];

const INITIAL_SLIDES = [
  { id: 1, titleBn: 'কৃষি জ্ঞান ও আবহমান বাংলার ইতিহাসের ডিজিটাল সংরক্ষণাগার', titleEn: 'Digital Archive of Agricultural Knowledge & Heritage', imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, titleBn: 'ঐতিহ্যবাহী বিলুপ্তপ্রায় কৃষি যন্ত্রপাতি ও গ্রামীণ নিদর্শন', titleEn: 'Traditional Endangered Agricultural Artifacts & Heritage', imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, titleBn: 'জ্ঞানার্জনের অনন্য মাধ্যম ও সমৃদ্ধ ডিজিটাল লাইব্রেরি ক্যাটালগ', titleEn: 'Unique Educational Platform & E-Book Library Catalog', imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?q=80&w=1600&auto=format&fit=crop' },
];

export default function App() {
  const [activeView, setActiveView] = useState('frontend'); // 'frontend' or 'admin'
  const [adminTab, setAdminTab] = useState('overview'); // 'overview', 'news', 'books', 'artifacts', 'settings'
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState('bn'); // 'bn' or 'en'

  // Dynamic CMS Data States (persisted to localStorage)
  const [newsList, setNewsList] = useState(() => {
    const saved = localStorage.getItem('shah_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [booksList, setBooksList] = useState(() => {
    const saved = localStorage.getItem('shah_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [artifactsList, setArtifactsList] = useState(() => {
    const saved = localStorage.getItem('shah_artifacts');
    return saved ? JSON.parse(saved) : INITIAL_ARTIFACTS;
  });

  const [slides, setSlides] = useState(() => {
    const saved = localStorage.getItem('shah_slides');
    return saved ? JSON.parse(saved) : INITIAL_SLIDES;
  });

  const [counters, setCounters] = useState(() => {
    const saved = localStorage.getItem('shah_counters');
    return saved ? JSON.parse(saved) : { ebooks: 1500, museum: 1000, categories: 50 };
  });

  // Local Storage Synchronizer
  useEffect(() => {
    localStorage.setItem('shah_news', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('shah_books', JSON.stringify(booksList));
  }, [booksList]);

  useEffect(() => {
    localStorage.setItem('shah_artifacts', JSON.stringify(artifactsList));
  }, [artifactsList]);

  useEffect(() => {
    localStorage.setItem('shah_slides', JSON.stringify(slides));
  }, [slides]);

  useEffect(() => {
    localStorage.setItem('shah_counters', JSON.stringify(counters));
  }, [counters]);

  // Weather States
  const [weatherList, setWeatherList] = useState([]);
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Header & Search
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchTimeoutRef = useRef(null);

  // Ticker state
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animationType, setAnimationType] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);

  // Modals / Preview States
  const [selectedBookPdf, setSelectedBookPdf] = useState(null);
  const [selectedArtifact, setSelectedArtifact] = useState(null);

  // Admin Modals
  const [newsModal, setNewsModal] = useState({ open: false, item: null });
  const [bookModal, setBookModal] = useState({ open: false, item: null });
  const [artifactModal, setArtifactModal] = useState({ open: false, item: null });

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
          console.log('IP Location fallback');
        }

        const divisions = [
          { nameBn: userCity, nameEn: userCity, lat: userLat, lon: userLon },
          { nameBn: 'ঢাকা', nameEn: 'Dhaka', lat: 23.8103, lon: 90.4125 },
          { nameBn: 'চট্টগ্রাম', nameEn: 'Chittagong', lat: 22.3569, lon: 91.7832 },
          { nameBn: 'রাজশাহী', nameEn: 'Rajshahi', lat: 24.3636, lon: 88.6241 },
          { nameBn: 'খুলনা', nameEn: 'Khulna', lat: 22.8456, lon: 89.5403 },
          { nameBn: 'বরিশাল', nameEn: 'Barisal', lat: 22.7010, lon: 90.3535 },
          { nameBn: 'সিলেট', nameEn: 'Sylhet', lat: 24.8949, lon: 91.8687 },
          { nameBn: 'রংপুর', nameEn: 'Rangpur', lat: 25.7439, lon: 89.2752 },
        ];

        const fetchedData = [];
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
          } catch (err) {
            console.error('Division weather error:', err);
          }
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

  // Active News ticker logic
  const activeNews = newsList.filter((n) => n.active);

  useEffect(() => {
    if (activeNews.length === 0) return;
    const newsTimer = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % activeNews.length);
    }, 5000);
    return () => clearInterval(newsTimer);
  }, [activeNews.length]);

  // Header Scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Slider rotation
  useEffect(() => {
    setShowSubtitle(false);
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1500);

    let slideTimer;
    if (!isHovered && slides.length > 0) {
      slideTimer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setAnimationType((prev) => (prev + 1) % 3);
      }, 6000);
    }

    return () => {
      clearTimeout(subtitleTimer);
      if (slideTimer) clearTimeout(slideTimer);
    };
  }, [currentSlide, isHovered, slides.length]);

  const subtitleAnimations = [
    'animate-in fade-in slide-in-from-bottom-6 duration-700',
    'animate-in fade-in slide-in-from-left-8 duration-700',
    'animate-in fade-in zoom-in-75 duration-700',
  ];

  const handleSaveNews = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: newsModal.item ? newsModal.item.id : Date.now().toString(),
      textBn: formData.get('textBn'),
      textEn: formData.get('textEn'),
      active: formData.get('active') === 'on',
    };

    if (newsModal.item) {
      setNewsList(newsList.map((n) => (n.id === newItem.id ? newItem : n)));
    } else {
      setNewsList([newItem, ...newsList]);
    }
    setNewsModal({ open: false, item: null });
  };

  const handleDeleteNews = (id) => {
    setNewsList(newsList.filter((n) => n.id !== id));
  };

  const handleSaveBook = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: bookModal.item ? bookModal.item.id : Date.now().toString(),
      titleBn: formData.get('titleBn'),
      titleEn: formData.get('titleEn'),
      category: formData.get('category'),
      author: formData.get('author'),
      pdfUrl: formData.get('pdfUrl'),
      cover: formData.get('cover') || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop',
    };

    if (bookModal.item) {
      setBooksList(booksList.map((b) => (b.id === newItem.id ? newItem : b)));
    } else {
      setBooksList([newItem, ...booksList]);
    }
    setBookModal({ open: false, item: null });
  };

  const handleDeleteBook = (id) => {
    setBooksList(booksList.filter((b) => b.id !== id));
  };

  const handleSaveArtifact = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newItem = {
      id: artifactModal.item ? artifactModal.item.id : Date.now().toString(),
      titleBn: formData.get('titleBn'),
      titleEn: formData.get('titleEn'),
      era: formData.get('era'),
      origin: formData.get('origin'),
      image: formData.get('image') || 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop',
      desc: formData.get('desc'),
    };

    if (artifactModal.item) {
      setArtifactsList(artifactsList.map((a) => (a.id === newItem.id ? newItem : a)));
    } else {
      setArtifactsList([newItem, ...artifactsList]);
    }
    setArtifactModal({ open: false, item: null });
  };

  const handleDeleteArtifact = (id) => {
    setArtifactsList(artifactsList.filter((a) => a.id !== id));
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-[#F8F9FA] text-gray-800'} min-h-screen font-sans transition-colors duration-300 overflow-x-hidden`}>
      
      {/* GLOBAL SYSTEM BAR FOR TAB SWITCHING (PUBLIC FRONTEND vs ADMIN CMS) */}
      <div className="bg-gray-900 text-gray-200 text-xs py-1.5 px-4 border-b border-gray-800 flex justify-between items-center z-[100] relative">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <ShieldCheck className="h-4 w-4" />
            <span>শাহ্ কৃষি পাঠাগার ও জাদুঘর পোর্টাল</span>
          </span>
          <span className="hidden sm:inline-block text-gray-500">|</span>
          <span className="hidden sm:inline-block text-gray-400">
            {activeView === 'frontend' ? 'লাইব ওয়েবসাইট মোড' : 'ব্যাকএন্ড সিএমএস মোড (CMS Control Panel)'}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveView('frontend')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center space-x-1 ${
              activeView === 'frontend'
                ? 'bg-[#006A4E] text-white shadow'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{lang === 'bn' ? 'ওয়েবসাইট ফ্রন্টএন্ড' : 'Public Frontend'}</span>
          </button>

          <button
            onClick={() => setActiveView('admin')}
            className={`px-3 py-1 rounded-md text-xs font-bold transition flex items-center space-x-1 ${
              activeView === 'admin'
                ? 'bg-[#F42A41] text-white shadow'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>{lang === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Panel (CMS)'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PUBLIC FRONTEND VIEW SECTION                                          */}
      {/* ========================================================================= */}
      {activeView === 'frontend' && (
        <div className="relative">
          
          {/* Sticky Navigation Header */}
          <div className={`fixed top-8 left-0 w-full z-50 transition-all duration-300 shadow-md ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
            
            {/* Topbar: Weather & Date (Solid White Background) */}
            <div className="bg-white text-gray-900 text-xs font-extrabold py-2 px-4 sm:px-8 border-b border-gray-200">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2 text-[#006A4E]">
                  <CloudSun className="h-4 w-4 text-[#006A4E]" />
                  {weatherLoading ? (
                    <span>আবহাওয়া লোড হচ্ছে...</span>
                  ) : (
                    <span className="transition-all duration-500 font-bold">
                      {weatherList[currentWeatherIndex]?.city}: {weatherList[currentWeatherIndex]?.temp}°C
                    </span>
                  )}
                </div>

                <div className="text-gray-800 font-bold">
                  <span>
                    {lang === 'bn' ? 'শনিবার, ৩ অক্টোবর, ২০২৬' : 'Saturday, October 3, 2026'}
                  </span>
                </div>
              </div>
            </div>

            {/* Red-Green Main Brand Navigation Header */}
            <header className="bg-[#006A4E] text-white border-b-2 border-[#F42A41]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between relative">
                
                <a href="#home" className="flex items-center space-x-2.5 group">
                  <div className="p-1.5 rounded-lg bg-[#F42A41] text-white shadow-md group-hover:scale-105 transition duration-300">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <span className="text-base font-extrabold tracking-wide text-white group-hover:text-yellow-300 transition duration-300">
                    {lang === 'bn' ? 'শাহ্ কৃষি পাঠাগার ও জাদুঘর' : 'Shah Agriculture Library & Museum'}
                  </span>
                </a>

                {!searchOpen && (
                  <div className="hidden lg:flex space-x-8 text-sm font-bold items-center text-white">
                    <a href="#home" className="hover:text-yellow-300 transition duration-200">
                      {lang === 'bn' ? 'হোম' : 'Home'}
                    </a>

                    <div className="relative group py-3">
                      <a href="#ebooks" className="flex items-center space-x-1 hover:text-yellow-300 transition duration-200">
                        <span>{lang === 'bn' ? 'ই-লাইব্রেরি' : 'E-Library'}</span>
                        <ChevronDown className="h-3.5 w-3.5 group-hover:rotate-180 transition duration-300" />
                      </a>
                    </div>

                    <div className="relative group py-3">
                      <a href="#museum" className="flex items-center space-x-1 hover:text-yellow-300 transition duration-200">
                        <span>{lang === 'bn' ? 'ডিজিটাল জাদুঘর' : 'Digital Museum'}</span>
                        <ChevronDown className="h-3.5 w-3.5 group-hover:rotate-180 transition duration-300" />
                      </a>
                    </div>

                    <a href="#about" className="hover:text-yellow-300 transition duration-200">
                      {lang === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
                    </a>
                  </div>
                )}

                {/* Search Bar */}
                {searchOpen ? (
                  <div className="flex-1 max-w-md mx-4 relative">
                    <input
                      type="text"
                      autoFocus
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder={lang === 'bn' ? 'বই বা নিদর্শন খুঁজুন...' : 'Search books or artifacts...'}
                      className="w-full pl-4 pr-10 py-1.5 rounded-full text-black bg-white border border-yellow-400 focus:outline-none text-xs"
                    />
                    <button 
                      onClick={() => setSearchOpen(false)}
                      className="absolute right-2.5 top-2 text-gray-600 hover:text-black transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setSearchOpen(true)}
                    className="p-2 rounded-full hover:bg-white/10 text-white transition duration-200"
                    title="Search"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                )}

                {/* Quick Toolbar */}
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
                    className="flex items-center space-x-1 text-xs font-bold bg-[#F42A41] hover:bg-red-700 text-white px-3 py-1 rounded-full shadow transition"
                  >
                    <Globe className="h-3 w-3" />
                    <span>{lang === 'bn' ? 'EN' : 'বাংলা'}</span>
                  </button>

                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white transition duration-200"
                  >
                    {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </button>

                  <button 
                    onClick={() => setActiveView('admin')}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition duration-200"
                    title="Control Panel / Admin"
                  >
                    <UserCheck className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </header>
          </div>

          {/* Main Front Content */}
          <div className="pt-28">

            {/* Seamless, Completely Box-Free & Border-Free Running News Ticker */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 my-2">
              <div className="h-6 flex items-center">
                <div className="relative h-5 overflow-hidden flex-1">
                  {activeNews.length > 0 ? (
                    activeNews.map((news, index) => (
                      <div
                        key={news.id}
                        className={`absolute left-0 w-full text-xs sm:text-sm font-semibold transition-all duration-500 ease-in-out flex items-center ${
                          darkMode ? 'text-gray-200' : 'text-gray-800'
                        } ${
                          index === currentNewsIndex
                            ? 'top-0 opacity-100 translate-y-0 z-10'
                            : 'top-full opacity-0 translate-y-1 z-0'
                        }`}
                      >
                        <span className="truncate">{lang === 'bn' ? news.textBn : news.textEn}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-gray-400">কোনো নোটিশ প্রকাশ করা হয়নি।</div>
                  )}
                </div>
              </div>
            </div>

            {/* Hero Image Slider */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6" id="home">
              <section 
                className="relative h-[320px] sm:h-[400px] rounded-2xl overflow-hidden bg-gray-900 shadow-xl cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {slides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <div 
                      className="relative h-full w-full bg-cover bg-center flex items-center px-6 sm:px-12 transition-transform duration-700"
                      style={{ backgroundImage: `url(${slide.imageUrl})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>

                      <div className="relative z-10 max-w-2xl text-left">
                        <h2 className="text-xl sm:text-2xl font-extrabold text-[#FFD700] border-l-4 border-[#F42A41] pl-3 mb-3 tracking-wide drop-shadow-md">
                          {lang === 'bn' ? 'শাহ্ কৃষি পাঠাগার ও জাদুঘর' : 'Shah Agriculture Library & Museum'}
                        </h2>

                        <div className="h-16 sm:h-20">
                          {showSubtitle && (
                            <div className={subtitleAnimations[animationType]}>
                              <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed drop-shadow-lg">
                                {lang === 'bn' ? slide.titleBn : slide.titleEn}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 flex space-x-3">
                          <a href="#ebooks" className="bg-[#006A4E] hover:bg-[#00523C] text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{lang === 'bn' ? 'ই-বুক সমূহ পড়ুন' : 'Read E-Books'}</span>
                          </a>
                          <a href="#museum" className="bg-[#F42A41] hover:bg-red-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-2">
                            <Landmark className="h-4 w-4" />
                            <span>{lang === 'bn' ? 'জাদুঘর পরিদর্শণ' : 'Visit Museum'}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button 
                  onClick={() => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </section>
            </div>

            {/* Live Library Stats Counters */}
            <section className={`mt-8 py-6 border-y ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-700/50 transition">
                    <BookOpen className="h-6 w-6 mx-auto text-[#006A4E] dark:text-[#FFD700] mb-1" />
                    <div className="text-2xl sm:text-3xl font-black text-[#006A4E] dark:text-[#FFD700]">
                      {counters.ebooks.toLocaleString()}+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {lang === 'bn' ? 'ই-বুক ও ডিজিটাল সাময়িকী' : 'E-Books & Journals'}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg hover:bg-red-50 dark:hover:bg-gray-700/50 transition border-x border-gray-200 dark:border-gray-700">
                    <Landmark className="h-6 w-6 mx-auto text-[#F42A41] mb-1" />
                    <div className="text-2xl sm:text-3xl font-black text-[#F42A41]">
                      {counters.museum.toLocaleString()}+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {lang === 'bn' ? 'ঐতিহ্যবাহী জাদুঘর উপাদান' : 'Museum Artifacts'}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg hover:bg-amber-50 dark:hover:bg-gray-700/50 transition">
                    <Sprout className="h-6 w-6 mx-auto text-amber-600 mb-1" />
                    <div className="text-2xl sm:text-3xl font-black text-amber-600">
                      {counters.categories.toLocaleString()}+
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {lang === 'bn' ? 'বিষয়ভিত্তিক গবেষণা বিভাগ' : 'Research Categories'}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* E-Books Showcase Gallery */}
            <section className="max-w-7xl mx-auto py-12 px-4" id="ebooks">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-[#006A4E] dark:text-emerald-400 flex items-center space-x-2">
                    <BookOpen className="h-6 w-6" />
                    <span>{lang === 'bn' ? 'ডিজিটাল ই-বুক ও পাবলিকেশন' : 'E-Books & Digital Library'}</span>
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {lang === 'bn' ? 'কৃষি প্রযুক্তি, বীজ বিজ্ঞান ও ঐতিহ্যের ওপর ডিজিটাল বইসমূহ বিনামূল্যে পড়ুন' : 'Read rare agriculture research and guides online'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {booksList.map((book) => (
                  <div 
                    key={book.id} 
                    className={`rounded-xl border overflow-hidden shadow-sm hover:shadow-md transition group ${
                      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={book.cover} 
                        alt={book.titleBn} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <span className="absolute top-3 right-3 bg-[#006A4E] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                        {book.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-base mb-1 line-clamp-1">
                        {lang === 'bn' ? book.titleBn : book.titleEn}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                        {lang === 'bn' ? `লেখক: ${book.author}` : `Author: ${book.author}`}
                      </p>
                      <button 
                        onClick={() => setSelectedBookPdf(book)}
                        className="w-full bg-[#006A4E] hover:bg-[#00523C] text-white py-2 rounded-lg text-xs font-bold transition flex items-center justify-center space-x-2"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span>{lang === 'bn' ? 'বইটি অনলাইন পড়ুন' : 'Read Online PDF'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Digital Museum Artifacts Showcase */}
            <section className={`py-12 border-t ${darkMode ? 'bg-gray-800/30 border-gray-800' : 'bg-emerald-50/50 border-gray-200'}`} id="museum">
              <div className="max-w-7xl mx-auto px-4">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-[#F42A41] flex items-center space-x-2">
                    <Landmark className="h-6 w-6" />
                    <span>{lang === 'bn' ? 'ডিজিটাল কৃষি জাদুঘর' : 'Digital Agriculture Museum'}</span>
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {lang === 'bn' ? 'বিলুপ্তপ্রায় প্রাচীন কৃষি সরঞ্জাম ও আবহমান বাংলার গ্রামীণ ইতিহাস' : 'Explore rare agricultural heritage artifacts and history'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {artifactsList.map((item) => (
                    <div 
                      key={item.id} 
                      className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition ${
                        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="h-52 overflow-hidden relative">
                        <img 
                          src={item.image} 
                          alt={item.titleBn} 
                          className="w-full h-full object-cover hover:scale-105 transition duration-500" 
                        />
                        <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] px-2.5 py-1 rounded-md backdrop-blur-sm">
                          {item.era}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2">
                          {lang === 'bn' ? item.titleBn : item.titleEn}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed">
                          {item.desc}
                        </p>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
                          <span className="text-gray-400">{item.origin}</span>
                          <button 
                            onClick={() => setSelectedArtifact(item)}
                            className="text-[#F42A41] font-bold hover:underline flex items-center space-x-1"
                          >
                            <span>{lang === 'bn' ? 'বিস্তারিত দেখুন' : 'View Details'}</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#004D36] text-gray-200 py-8 text-center text-sm border-t-2 border-[#F42A41]">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-center space-x-6 mb-4 text-xs">
                  <a href="#home" className="hover:underline">হোম</a>
                  <a href="#ebooks" className="hover:underline">ই-লাইব্রেরি</a>
                  <a href="#museum" className="hover:underline">জাদুঘর</a>
                  <button onClick={() => setActiveView('admin')} className="text-yellow-300 hover:underline">অ্যাডমিন প্যানেল</button>
                </div>
                <p>© ২০২৬ {lang === 'bn' ? 'শাহ্ কৃষি পাঠাগার ও জাদুঘর। সর্বস্বত্ব সংরক্ষিত।' : 'Shah Agriculture Library & Museum. All rights reserved.'}</p>
              </div>
            </footer>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. BACKEND ADMIN DASHBOARD & CMS CONTROL PANEL                            */}
      {/* ========================================================================= */}
      {activeView === 'admin' && (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
          
          {/* Admin Header Bar */}
          <div className="bg-[#006A4E] text-white px-6 py-4 shadow-md flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-[#F42A41] p-2 rounded-lg">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none">
                  {lang === 'bn' ? 'শাহ্ কৃষি কন্ট্রোল প্যানেল (CMS Panel)' : 'Shah Agri Admin CMS Panel'}
                </h1>
                <p className="text-xs text-emerald-200 mt-1">
                  {lang === 'bn' ? 'লাইভ কনটেন্ট ম্যানেজমেন্ট সিস্টেম' : 'Live Website Content Management System'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setActiveView('frontend')}
                className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5"
              >
                <Eye className="h-4 w-4" />
                <span>{lang === 'bn' ? 'লাইভ সাইট দেখুন' : 'Preview Live Site'}</span>
              </button>

              <button
                onClick={() => setActiveView('frontend')}
                className="bg-[#F42A41] hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>{lang === 'bn' ? 'প্রস্থান' : 'Exit Admin'}</span>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row">
            
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 space-y-1">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                মেগারু মেনু / Control Tabs
              </div>

              <button
                onClick={() => setAdminTab('overview')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  adminTab === 'overview'
                    ? 'bg-[#006A4E] text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>{lang === 'bn' ? 'ওভারভিউ ড্যাশবোর্ড' : 'Overview Dashboard'}</span>
              </button>

              <button
                onClick={() => setAdminTab('news')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  adminTab === 'news'
                    ? 'bg-[#006A4E] text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>{lang === 'bn' ? 'সংবাদ স্ক্রলার (News Ticker)' : 'News Ticker Manager'}</span>
              </button>

              <button
                onClick={() => setAdminTab('books')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  adminTab === 'books'
                    ? 'bg-[#006A4E] text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>{lang === 'bn' ? 'ই-বুক ম্যানেজমেন্ট' : 'E-Books & Journals'}</span>
              </button>

              <button
                onClick={() => setAdminTab('artifacts')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  adminTab === 'artifacts'
                    ? 'bg-[#006A4E] text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Landmark className="h-4 w-4" />
                <span>{lang === 'bn' ? 'জাদুঘর নিদর্শন ক্যাটালগ' : 'Museum Artifacts'}</span>
              </button>

              <button
                onClick={() => setAdminTab('settings')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                  adminTab === 'settings'
                    ? 'bg-[#006A4E] text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Sliders className="h-4 w-4" />
                <span>{lang === 'bn' ? 'ব্যানার ও কাউন্টার সেটিংস' : 'Counter & Slider Settings'}</span>
              </button>
            </aside>

            {/* Main CMS Tab Workspace */}
            <main className="flex-1 p-6">
              
              {/* TAB 1: OVERVIEW */}
              {adminTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-gray-500">মোট প্রকাশিত সংবাদ</span>
                        <FileText className="h-5 w-5 text-[#006A4E]" />
                      </div>
                      <div className="text-3xl font-black">{newsList.length}</div>
                      <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                        {newsList.filter(n => n.active).length} টি টি্কারে অ্যাক্টিভ রয়েছে
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-gray-500">সংরক্ষিত ই-বুক</span>
                        <BookOpen className="h-5 w-5 text-[#F42A41]" />
                      </div>
                      <div className="text-3xl font-black">{booksList.length}</div>
                      <div className="text-[11px] text-gray-400 mt-1">অনলাইনে পড়ার উপযোগী</div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-gray-500">জাদুঘর আইটেম</span>
                        <Landmark className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="text-3xl font-black">{artifactsList.length}</div>
                      <div className="text-[11px] text-amber-600 font-semibold mt-1">ডিজিটাল আর্কাভে ক্যাটালগড</div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-base mb-4 flex items-center space-x-2">
                      <Database className="h-5 w-5 text-[#006A4E]" />
                      <span>সিস্টেম স্ট্যাটাস ও পরামর্শ</span>
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      এখানে যেসকল পরিবর্তন করা হবে তা সরাসরি ওয়েবসাইট ফ্রন্টএন্ডে প্রতিফলিত হবে। নতুন ডাটা ব্রাউজারের লোকাল স্টোরেজে (Local Storage) সংরক্ষিত হচ্ছে।
                    </p>
                    <button
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                      }}
                      className="bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-200 transition"
                    >
                      ডিফল্ট ডেমো ডাটায় রিকভার / রিসেট করুন
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: NEWS TICKER MANAGER */}
              {adminTab === 'news' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold">সংবাদ ও নোটিশ স্ক্রলার লিস্ট</h2>
                      <p className="text-xs text-gray-500">টপবারে চলমান সংবাদ যুক্ত বা এডিট করুন</p>
                    </div>
                    <button
                      onClick={() => setNewsModal({ open: true, item: null })}
                      className="bg-[#006A4E] hover:bg-[#00523C] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>নতুন স্ক্রলিং সংবাদ যোগ করুন</span>
                    </button>
                  </div>

                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-gray-500">
                        <tr>
                          <th className="p-4">বাংলা বিবরণ</th>
                          <th className="p-4">ইংরেজি বিবরণ</th>
                          <th className="p-4">স্ট্যাটাস</th>
                          <th className="p-4 text-right">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {newsList.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                            <td className="p-4 font-semibold">{item.textBn}</td>
                            <td className="p-4 text-gray-500">{item.textEn}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                item.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-600'
                              }`}>
                                {item.active ? 'অ্যাক্টিভ' : 'বন্ধ'}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => setNewsModal({ open: true, item })}
                                className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                              >
                                <Edit3 className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteNews(item.id)}
                                className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: E-BOOKS MANAGER */}
              {adminTab === 'books' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold">ই-বুক ও সাময়িকী কালেকশন</h2>
                      <p className="text-xs text-gray-500">নতুন বই বা পিডিএফ ক্যাটালগ যুক্ত করুন</p>
                    </div>
                    <button
                      onClick={() => setBookModal({ open: true, item: null })}
                      className="bg-[#006A4E] hover:bg-[#00523C] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>নতুন বই যোগ করুন</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {booksList.map((book) => (
                      <div key={book.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex space-x-3">
                        <img src={book.cover} alt={book.titleBn} className="w-16 h-20 object-cover rounded-lg" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs truncate">{book.titleBn}</h4>
                          <p className="text-[11px] text-gray-400 mt-0.5">{book.author}</p>
                          <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">
                            {book.category}
                          </span>
                          <div className="flex space-x-2 mt-3">
                            <button
                              onClick={() => setBookModal({ open: true, item: book })}
                              className="text-xs text-blue-600 font-bold hover:underline"
                            >
                              এডিট
                            </button>
                            <button
                              onClick={() => handleDeleteBook(book.id)}
                              className="text-xs text-red-600 font-bold hover:underline"
                            >
                              মুছে ফেলুন
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: MUSEUM ARTIFACTS MANAGER */}
              {adminTab === 'artifacts' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-bold">জাদুঘর ঐতিহ্যবাহী সরঞ্জাম</h2>
                      <p className="text-xs text-gray-500">প্রাচীন কৃষি নিদর্শনের তথ্য পরিচালনা করুন</p>
                    </div>
                    <button
                      onClick={() => setArtifactModal({ open: true, item: null })}
                      className="bg-[#F42A41] hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-2"
                    >
                      <Plus className="h-4 w-4" />
                      <span>নতুন নিদর্শন যুক্ত করুন</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {artifactsList.map((art) => (
                      <div key={art.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex space-x-4">
                        <img src={art.image} alt={art.titleBn} className="w-24 h-24 object-cover rounded-xl" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm truncate">{art.titleBn}</h4>
                          <p className="text-xs text-amber-600 font-semibold mt-0.5">{art.era} • {art.origin}</p>
                          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{art.desc}</p>
                          <div className="flex space-x-3 mt-3">
                            <button
                              onClick={() => setArtifactModal({ open: true, item: art })}
                              className="text-xs text-blue-600 font-bold hover:underline"
                            >
                              এডিট
                            </button>
                            <button
                              onClick={() => handleDeleteArtifact(art.id)}
                              className="text-xs text-red-600 font-bold hover:underline"
                            >
                              ডিলিট
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: COUNTERS & SLIDER SETTINGS */}
              {adminTab === 'settings' && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
                    <h3 className="font-bold text-base mb-4">লাইব্রেরি ও জাদুঘর পরিসংখ্যান কাউন্টার</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">ই-বুক সংখ্যা</label>
                        <input
                          type="number"
                          value={counters.ebooks}
                          onChange={(e) => setCounters({ ...counters, ebooks: parseInt(e.target.value) || 0 })}
                          className="w-full p-2.5 rounded-xl border text-sm font-bold bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">জাদুঘর নিদর্শন সংখ্যা</label>
                        <input
                          type="number"
                          value={counters.museum}
                          onChange={(e) => setCounters({ ...counters, museum: parseInt(e.target.value) || 0 })}
                          className="w-full p-2.5 rounded-xl border text-sm font-bold bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">ক্যাটাগরি সংখ্যা</label>
                        <input
                          type="number"
                          value={counters.categories}
                          onChange={(e) => setCounters({ ...counters, categories: parseInt(e.target.value) || 0 })}
                          className="w-full p-2.5 rounded-xl border text-sm font-bold bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </main>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS & DIALOGS                                                         */}
      {/* ========================================================================= */}

      {/* PDF Reader Modal */}
      {selectedBookPdf && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-4xl h-[85vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 dark:bg-gray-800">
              <div>
                <h3 className="font-bold text-sm">{selectedBookPdf.titleBn}</h3>
                <p className="text-xs text-gray-500">{selectedBookPdf.author}</p>
              </div>
              <button onClick={() => setSelectedBookPdf(null)} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-950 flex items-center justify-center">
              <iframe src={selectedBookPdf.pdfUrl} className="w-full h-full border-none" title="PDF Viewer" />
            </div>
          </div>
        </div>
      )}

      {/* Artifact Detail Modal */}
      {selectedArtifact && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl p-6 relative">
            <button onClick={() => setSelectedArtifact(null)} className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 dark:bg-gray-800">
              <X className="h-5 w-5" />
            </button>
            <img src={selectedArtifact.image} alt={selectedArtifact.titleBn} className="w-full h-56 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-lg mb-1">{selectedArtifact.titleBn}</h3>
            <p className="text-xs text-amber-600 font-bold mb-3">{selectedArtifact.era} | {selectedArtifact.origin}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{selectedArtifact.desc}</p>
          </div>
        </div>
      )}

      {/* Admin News Modal */}
      {newsModal.open && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <form onSubmit={handleSaveNews} className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="font-bold text-base">{newsModal.item ? 'সংবাদ এডিট করুন' : 'নতুন সংবাদ যোগ করুন'}</h3>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">বাংলা হেডলাইন</label>
              <input name="textBn" defaultValue={newsModal.item?.textBn || ''} required className="w-full p-2 rounded-xl border text-xs" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">ইংরেজি হেডলাইন</label>
              <input name="textEn" defaultValue={newsModal.item?.textEn || ''} required className="w-full p-2 rounded-xl border text-xs" />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" name="active" defaultChecked={newsModal.item ? newsModal.item.active : true} id="act" />
              <label htmlFor="act" className="text-xs font-bold">টিকারের জন্য অ্যাক্টিভ রাখুন</label>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
              <button type="button" onClick={() => setNewsModal({ open: false, item: null })} className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100">বাতিল</button>
              <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-[#006A4E] text-white">সংরক্ষণ করুন</button>
            </div>
          </form>
        </div>
      )}

      {/* Admin Book Modal */}
      {bookModal.open && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <form onSubmit={handleSaveBook} className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 space-y-3 shadow-2xl">
            <h3 className="font-bold text-base">{bookModal.item ? 'বই সংশোধন করুন' : 'নতুন বই যুক্ত করুন'}</h3>
            <input name="titleBn" placeholder="বাংলা শিরোনাম" defaultValue={bookModal.item?.titleBn || ''} required className="w-full p-2 rounded-xl border text-xs" />
            <input name="titleEn" placeholder="English Title" defaultValue={bookModal.item?.titleEn || ''} required className="w-full p-2 rounded-xl border text-xs" />
            <input name="author" placeholder="লেখকের নাম" defaultValue={bookModal.item?.author || ''} required className="w-full p-2 rounded-xl border text-xs" />
            <input name="category" placeholder="ক্যাটাগরি" defaultValue={bookModal.item?.category || ''} required className="w-full p-2 rounded-xl border text-xs" />
            <input name="pdfUrl" placeholder="PDF লিঙ্ক / URL" defaultValue={bookModal.item?.pdfUrl || ''} required className="w-full p-2 rounded-xl border text-xs" />
            <input name="cover" placeholder="কভার ছবির URL" defaultValue={bookModal.item?.cover || ''} className="w-full p-2 rounded-xl border text-xs" />
            <div className="flex justify-end space-x-2 pt-2">
              <button type="button" onClick={() => setBookModal({ open: false, item: null })} className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100">বাতিল</button>
              <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-[#006A4E] text-white">সংরক্ষণ</button>
            </div>
          </form>
        </div>
      )}

      {/* Admin Artifact Modal */}
      {artifactModal.open && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
          <form onSubmit={handleSaveArtifact} className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6 space-y-3 shadow-2xl">
            <h3 className="font-bold text-base">{artifactModal.item ? 'নিদর্শন এডিট করুন' : 'নতুন জাদুঘর উপাদান যোগ করুন'}</h3>
            <input name="titleBn" placeholder="নাম (বাংলা)" defaultValue={artifactModal.item?.titleBn || ''} required className="w-full p-2 rounded-xl border text-xs" />
            <input name="titleEn" placeholder="Name (English)" defaultValue={artifactModal.item?.titleEn || ''} required className="w-full p-2 rounded-xl border text-xs" />
            <input name="era" placeholder="সময়কাল (যেমন: ১৯ শতক)" defaultValue={artifactModal.item?.era || ''} required className="w-full p-2 rounded-xl border text-xs" />
            <input name="origin" placeholder="সংগ্রহের স্থান" defaultValue={artifactModal.item?.origin || ''} required className="w-full p-2 rounded-xl border text-xs" />
            <input name="image" placeholder="ছবির URL" defaultValue={artifactModal.item?.image || ''} className="w-full p-2 rounded-xl border text-xs" />
            <textarea name="desc" placeholder="সংক্ষিপ্ত বিবরণ" defaultValue={artifactModal.item?.desc || ''} required className="w-full p-2 rounded-xl border text-xs h-20" />
            <div className="flex justify-end space-x-2 pt-2">
              <button type="button" onClick={() => setArtifactModal({ open: false, item: null })} className="px-4 py-2 rounded-xl text-xs font-bold bg-gray-100">বাতিল</button>
              <button type="submit" className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F42A41] text-white">সংরক্ষণ</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}