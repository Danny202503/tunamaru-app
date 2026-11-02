'use client';

import React from 'react';
import Link from 'next/link';

export default function OrderRedirectPage() {
  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-200 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#E5A93C]/20 text-[#E5A93C] flex items-center justify-center text-2xl font-bold mb-4">
        綱
      </div>
      <h1 className="text-xl font-serif font-bold text-white mb-2">5단계 라이브 관제 시스템</h1>
      <p className="text-xs text-stone-400 max-w-md mb-6 leading-relaxed">
        전체 5단계 라이브 프로토타입은 메인 홈 화면의 상단 쇼케이스 스위처에서 실시간으로 확인하실 수 있습니다.
      </p>
      <Link 
        href="/" 
        className="px-6 py-3 rounded-full bg-[#E5A93C] text-stone-950 font-bold text-xs shadow-lg hover:bg-[#ffc665] transition"
      >
        메인 5단계 통합 화면으로 이동하기 →
      </Link>
    </div>
  );
}