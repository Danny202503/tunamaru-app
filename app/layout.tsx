import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Cinzel, Noto_Serif_JP } from 'next/font/google';
import './globals.css';
import { TUNAMARU_STORE } from '@/lib/constants';
import Link from 'next/link';
import { Phone, MapPin } from 'lucide-react';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-serif',
});

const notoJp = Noto_Serif_JP({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-jp',
});

export const metadata: Metadata = {
  title: 'TUNAMARU - Official Digital Ordering & In-House Delivery',
  description: 'Authentic Japanese Fusion & Toyosu Market Direct Sashimi in Manila',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark scroll-smooth">
      <body
        className={`${jakarta.variable} ${cinzel.variable} ${notoJp.variable} font-sans bg-[#0C0A09] text-stone-200 antialiased min-h-screen flex flex-col selection:bg-[#F2BE42] selection:text-black`}
      >
        {/* 글로벌 공통 헤더 */}
        <header className="sticky top-0 z-40 bg-[#0C0A09]/90 backdrop-blur-md border-b border-[#28231E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link className="flex items-center gap-3.5 group" href="/">
              <div className="w-11 h-11 rounded-full border border-[#E5A93C]/40 p-0.5 bg-black/80 flex items-center justify-center font-serif text-[#F2BE42] font-black text-sm group-hover:scale-105 transition-transform">
                綱
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif font-extrabold tracking-[0.2em] text-[#F7F4EF] uppercase">
                  TUNAMARU
                </span>
                <span className="text-[10px] text-[#F2BE42] font-medium tracking-wider">
                  {TUNAMARU_STORE.jpName}
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-3">
              <Link className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-300 hover:text-white bg-[#161311] hover:bg-stone-800 rounded-full border border-stone-800 transition" href="/order/JF-20261030-99482">
                <span>Track Order</span>
              </Link>
              <Link className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-stone-950 bg-[#F2BE42] hover:bg-[#e0ad32] rounded-full shadow-lg transition active:scale-95" href="/checkout">
                <span>Cart / Checkout</span>
              </Link>
            </nav>
          </div>
        </header>

        {/* 메인 뷰포트 본문 */}
        <main className="flex-1">{children}</main>

        {/* 글로벌 공통 푸터 */}
        <footer className="border-t border-[#272320] bg-[#080706] py-10 text-stone-400 text-xs mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-stone-100 text-sm tracking-wider">
                  {TUNAMARU_STORE.name}
                </span>
                <span className="text-[#E5A93C] text-xs">({TUNAMARU_STORE.jpName})</span>
              </div>
              <p className="text-[11px] text-stone-500">{TUNAMARU_STORE.slogan}</p>
              <p className="flex items-center gap-1.5 text-[11px] text-stone-400">
                <MapPin className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                {TUNAMARU_STORE.address}
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-3">
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${TUNAMARU_STORE.phoneIntl}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181512] border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-bold hover:bg-[#E5A93C] hover:text-stone-950 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{TUNAMARU_STORE.phone}</span>
                </a>
                <a
                  href={TUNAMARU_STORE.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#161311] border border-stone-800 text-stone-300 hover:text-white transition text-xs"
                >
                  {/* 크기 강제 고정 방어 속성이 포함된 페이스북 SVG */}
                  <svg 
                    className="w-3.5 h-3.5 text-blue-400 shrink-0" 
                    width="14" 
                    height="14" 
                    style={{ width: '14px', height: '14px', minWidth: '14px' }} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Official Facebook</span>
                </a>
              </div>
              <p className="text-[10px] text-stone-600">
                © 2026 Tunamaru Dining Experience. All rights reserved. Powered by Tara Pay.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}