'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function BookGrid() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBooks() {
      const { data } = await supabase.from('featured_books').select('*').eq('is_featured', true);
      if (data) setBooks(data);
    }
    fetchBooks();
  }, []);

  return (
    <section className="my-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">🌾 বিশেষ সংগৃহীত বইসমূহ</h2>
          <p className="text-sm text-gray-500">সর্বশেষ প্রকাশিত এবং জনপ্রিয় কৃষি বিষয়ক গ্রন্থাবলী</p>
        </div>
        <a href="/library" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">
          সবগুলো দেখুন &rarr;
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
            <img src={book.cover_url} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                {book.category}
              </span>
              <h3 className="font-bold text-gray-800 text-base mt-2 line-clamp-1">{book.title}</h3>
              <p className="text-xs text-gray-500 mt-1">লেখক: {book.author}</p>
              <button className="mt-4 w-full bg-emerald-800 text-white text-xs py-2 rounded-lg hover:bg-emerald-900 transition">
                বিস্তারিত বিবরণ
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}