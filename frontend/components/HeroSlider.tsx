'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function HeroSlider() {
  const [slides, setSlides] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [stayTime, setStayTime] = useState(4000);

  useEffect(() => {
    async function loadSlider() {
      const { data: set } = await supabase.from('site_settings').select('slider_autoplay_speed').single();
      if (set?.slider_autoplay_speed) setStayTime(set.slider_autoplay_speed);

      const { data: slideData } = await supabase.from('sliders').select('*').eq('active', true).order('order_index');
      if (slideData && slideData.length > 0) setSlides(slideData);
    }
    loadSlider();
  }, []);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, stayTime);
    return () => clearInterval(timer);
  }, [isPaused, slides, stayTime]);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full h-[320px] md:h-[400px] overflow-hidden rounded-2xl shadow-lg my-6 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, index) => {
        const alignClass =
          slide.text_position === 'left'
            ? 'items-start text-left pl-12'
            : slide.text_position === 'right'
            ? 'items-end text-right pr-12'
            : 'items-center text-center';

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex flex-col justify-center p-6 text-white ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image_url}
              alt={slide.title || 'Slide'}
              className="absolute inset-0 w-full h-full object-cover -z-10 brightness-50"
            />
            <div className={`w-full max-w-4xl mx-auto flex flex-col ${alignClass}`}>
              <h1 className="text-2xl md:text-4xl font-bold mb-3 drop-shadow-md">
                {slide.title || 'কৃষি লাইব্রেরিতে আপনাকে স্বাগতম'}
              </h1>
              <p className="text-sm md:text-lg max-w-2xl opacity-90 mb-6 drop-shadow">
                {slide.subtitle || 'সংগ্রহে থাকা শত শত বই থেকে আপনার প্রয়োজনীয় বইটি খুব সহজেই খুঁজুন।'}
              </p>
            </div>
          </div>
        );
      })}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === current ? 'bg-amber-400 w-8' : 'bg-white/50 w-2.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
}