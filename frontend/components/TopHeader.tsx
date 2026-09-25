'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function TopHeader() {
  const [weather, setWeather] = useState('ঢাকা: ২৫°C');
  const [notices, setNotices] = useState<any[]>([]);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);
  const [socialLinks, setSocialLinks] = useState<any>({});
  const [scrollSpeed, setScrollSpeed] = useState(3000);

  const today = new Date().toLocaleDateString('bn-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((ipData) => {
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${ipData.latitude}&longitude=${ipData.longitude}&current_weather=true`
        )
          .then((res) => res.json())
          .then((wData) => {
            if (wData.current_weather) {
              setWeather(`${ipData.city || 'ঢাকা'}: ${wData.current_weather.temperature}°C`);
            }
          });
      })
      .catch(() => setWeather('ঢাকা: ২৭°C'));

    async function loadData() {
      const { data: siteData } = await supabase.from('site_settings').select('*').single();
      if (siteData) {
        setSocialLinks(siteData);
        if (siteData.news_scroll_speed) setScrollSpeed(siteData.news_scroll_speed * 1000);
      }

      const { data: noticeData } = await supabase.from('notices').select('*');
      if (noticeData) setNotices(noticeData);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (notices.length === 0) return;
    const interval = setInterval(() => {
      setCurrentNoticeIndex((prev) => (prev + 1) % notices.length);
    }, scrollSpeed);
    return () => clearInterval(interval);
  }, [notices, scrollSpeed]);

  return (
    <div className="bg-gray-900 text-gray-200 text-xs py-1.5 px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-2 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <span className="bg-emerald-700 text-white px-2 py-0.5 rounded text-[10px]">📍 আবহাওয়া</span>
        <span>{weather}</span>
      </div>

      <div className="h-5 overflow-hidden relative w-full md:w-1/2 text-center">
        {notices.map((notice, idx) => (
          <div
            key={notice.id || idx}
            className={`absolute w-full transition-all duration-500 ease-in-out ${
              idx === currentNoticeIndex
                ? 'top-0 opacity-100'
                : idx < currentNoticeIndex
                ? '-top-6 opacity-0'
                : 'top-6 opacity-0'
            }`}
          >
            <a href={notice.link || '#'} className="hover:text-amber-400 truncate block">
              📢 {notice.title}
            </a>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <span>📅 {today}</span>
        <div className="flex gap-2 font-bold">
          {socialLinks.social_facebook && (
            <a href={socialLinks.social_facebook} target="_blank" rel="noreferrer" className="hover:text-amber-400">FB</a>
          )}
          {socialLinks.social_youtube && (
            <a href={socialLinks.social_youtube} target="_blank" rel="noreferrer" className="hover:text-amber-400">YT</a>
          )}
        </div>
      </div>
    </div>
  );
}