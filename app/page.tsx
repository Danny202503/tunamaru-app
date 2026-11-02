'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building, 
  MapPin, 
  Phone, 
  Radio, 
  ShoppingBag, 
  X, 
  Send, 
  Download, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Check, 
  Clock, 
  ExternalLink,
  ChevronRight,
  Ticket,
  Lock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  QrCode,
  Car,
  Store,
  RefreshCw,
  Star,
  Receipt,
  Camera,
  Layers,
  Thermometer,
  Bell
} from 'lucide-react';
import { TUNAMARU_STORE } from '@/lib/constants';

const FULL_MENU_DATABASE = [
  { id: 'volcano-roll', name: 'VOLCANO ROLL 볼케이노 롤', category: 'roll', price: 480, tag: '👑 롤 인기 1위', desc: '구운 해산물과 매콤 달콤한 특제 용암 소스가 화려하게 얹힌 시그니처 롤', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80' },
  { id: 'aburi-salmon', name: 'ABURI SALMON ROLL 아부리 살몬 롤', category: 'roll', price: 375, tag: '인기 베스트', desc: '직화 토치 연어, 카니, 오이 롤, 특제 스파이시 마요 글레이즈 & 날치알', img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=500&q=80' },
  { id: 'salmon-sashimi', name: 'SALMON SASHIMI 생연어 사시미', category: 'sashimi', price: 430, tag: '도요스 직송', desc: '두툼한 프리미엄 생연어, 시소 잎, 수제 제빙 베딩 극저온 패키징', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80' },
  { id: 'day-of-sashimi', name: 'DAY OF SASHIMI 오늘의 모둠 사시미', category: 'sashimi', price: 3900, tag: '👑 시그니처', desc: '참다랑어 오도로, 메카도로, 연어, 광어 등 당일 최고급 부위 모둠 (3~4인)', img: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=500&q=80' },
  { id: 'otoro-premium', name: 'OTORO PREMIUM (S) 참다랑어 프리미엄', category: 'sashimi', price: 2800, tag: '최고급 참치', desc: '도쿄 직송 최상급 참다랑어 오도로의 마블링과 깊은 풍미', img: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=500&q=80' },
  { id: 'mini-sashimi', name: 'MINI SASHIMI 미니 사시미', category: 'sashimi', price: 500, tag: '인기 혼술', desc: '혼자서도 부담없이 즐기는 츠나마루 당일 특선 미니 모둠 사시미', img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=500&q=80' },
  { id: 'day-of-sushi', name: 'DAY OF SUSHI (10PCS) 모둠 초밥', category: 'sushi', price: 420, tag: '추천 초밥', desc: '참치, 연어, 새우, 타마고 등 셰프 엄선 10피스 모둠 스시', img: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=500&q=80' },
  { id: 'premium-sushi', name: 'PREMIUM SUSHI (10PCS) 특선 초밥', category: 'sushi', price: 520, tag: '명품 스시', desc: '참다랑어 주도로, 성게알(우니), 장어, 전복 등 호화 10종', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=500&q=80' },
  { id: 'hutomaki', name: 'HUTOMAKI 대왕 후토마끼', category: 'roll', price: 780, tag: '장인 수제', desc: '참치, 연어, 타마고, 새우튀김, 아보카도를 가득 말아낸 정통 대왕마끼', img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=500&q=80' },
  { id: 'gyu-don', name: 'GYU DON 소고기 덮밥', category: 'don', price: 450, tag: '인기 식사', desc: '특제 타레 소스에 부드럽게 조려낸 소고기와 양파가 듬뿍 올라간 규동', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=500&q=80' },
];

export default function MasterPrototypePage() {
  const [activeScreen, setActiveScreen] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(true); // 기본 오픈으로 스티치 화면 1 구조 구현
  const [cartItems, setCartItems] = useState([
    { id: 'salmon-sashimi', name: 'Salmon Sashimi (생연어 사시미)', price: 430, qty: 1, option: '시소 잎 3장 추가, 생와사비 별도' },
    { id: 'aburi-salmon', name: 'Aburi Salmon Roll (아부리 살몬 롤)', price: 375, qty: 1, option: '직화 토치 • 스파이시 마요 글레이즈' },
  ]);

  const [fulfillmentMode, setFulfillmentMode] = useState<'delivery' | 'pickup'>('delivery');
  const [recipientName, setRecipientName] = useState<string>('Danny Jang');
  const [recipientPhone, setRecipientPhone] = useState<string>('0917 123 4567');
  const [buildingName, setBuildingName] = useState<string>('Makati Diamond Residences');
  const [unitFloor, setUnitFloor] = useState<string>('Tower 1, Unit 18-B');
  const [streetAddress, setStreetAddress] = useState<string>('118 Legazpi St, Legazpi Village, Makati City');
  const [dropoffProtocol, setDropoffProtocol] = useState<'lobby' | 'meet' | 'unit'>('lobby');
  const [paymentMethod, setPaymentMethod] = useState<'ewallet' | 'bnpl' | 'qrph' | 'cards'>('ewallet');

  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isNearArrivalModalOpen, setIsNearArrivalModalOpen] = useState<boolean>(false);
  const [chatTab, setChatTab] = useState<'chef' | 'courier'>('chef');
  const [chatInput, setChatInput] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [toastMsg, setToastMsg] = useState<{ text: string; icon: string } | null>(null);

  const [chatMessages, setChatMessages] = useState([
    { sender: 'Tunamaru Head Chef (Takeshi)', time: '19:15', text: '고객님, 주문하신 연어 사시미와 아부리 롤 신선하게 극저온 패킹 완료되었습니다.', isUser: false },
    { sender: '나 (Danny Jang)', time: '19:16', text: '감사합니다! 엘리베이터 카드키 인증이 필요하니 도착하시면 로비에서 연락 부탁드립니다.', isUser: true },
    { sender: '라이더 Danilo Reyes', time: '19:18', text: '네 고객님! 마카티 다이아몬드 레지던스 로비 데스크 안내 확인했습니다. 안전하게 이동 중입니다.', isUser: false },
  ]);

  const showToast = (text: string, icon = '🔔') => {
    setToastMsg({ text, icon });
    setTimeout(() => setToastMsg(null), 3000);
  };

  const triggerHaptic = (pattern = [100, 50, 100]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        console.debug(e);
      }
    }
  };

  const playChime = () => {
    if (!isAudioEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn(e);
    }
  };

  const totalItemCount = cartItems.reduce((acc, cur) => acc + cur.qty, 0);
  const subtotal = cartItems.reduce((acc, cur) => acc + cur.price * cur.qty, 0);
  const deliveryFee = fulfillmentMode === 'delivery' ? 50 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - 100);

  const filteredDishes = selectedCategory === 'all' 
    ? FULL_MENU_DATABASE 
    : FULL_MENU_DATABASE.filter(d => d.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-200 selection:bg-[#E5A93C] selection:text-black flex flex-col font-sans">
      
      {/* ========================================================
          GLOBAL: 스티치 5대 화면 프리뷰 내비게이터 바 (고정 상단)
          ======================================================== */}
      <nav className="sticky top-0 z-50 bg-[#161311]/95 border-b border-[#E5A93C]/40 px-4 py-2.5 shadow-2xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-pulse" />
            <span className="text-xs font-serif font-black tracking-widest text-[#E5A93C] uppercase">
              STITCH 5-STAGE SCREEN SUITE:
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            {[
              { id: 1, label: '1. 메뉴&카트 드로어', sub: 'Image 1' },
              { id: 2, label: '2. 체크아웃 폼', sub: 'Image 3' },
              { id: 3, label: '3. 결제 승인전표', sub: 'Image 4·5' },
              { id: 4, label: '4. 실시간 관제 레이더', sub: 'Image 2' },
              { id: 5, label: '5. 배송완료 리포트', sub: 'Image 6' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveScreen(tab.id as any);
                  playChime();
                  showToast(`${tab.label} 화면으로 전환되었습니다.`, '⚡');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeScreen === tab.id
                    ? 'bg-[#E5A93C] text-stone-950 shadow-[0_0_15px_rgba(229,169,60,0.5)] scale-105'
                    : 'bg-[#0C0A09] text-stone-400 hover:text-white border border-stone-800'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 text-xs text-stone-400">
            <button
              onClick={() => {
                setIsAudioEnabled(!isAudioEnabled);
                showToast(isAudioEnabled ? '사운드 꺼짐' : '사운드 켜짐', isAudioEnabled ? '🔇' : '🔊');
              }}
              className="p-1.5 rounded-lg bg-[#0C0A09] border border-stone-800 text-stone-300 hover:text-[#E5A93C] transition"
              title="오디오 토글"
            >
              {isAudioEnabled ? <Volume2 className="w-4 h-4 text-[#E5A93C]" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="font-mono text-[11px] text-[#E5A93C] font-semibold">TUNA-PRO 2026</span>
          </div>
        </div>
      </nav>

      {/* 토스트 배너 */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-[100] px-4 py-2.5 rounded-xl bg-[#1D1916] border border-[#E5A93C] text-[#E5A93C] text-xs font-bold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top-2">
          <span>{toastMsg.icon}</span>
          <span>{toastMsg.text}</span>
        </div>
      )}

      {/* ========================================================
          화면 1: 메뉴 쇼케이스 & 고정 장바구니 2열 뷰 (Image 1 스티치 1:1)
          ======================================================== */}
      {activeScreen === 1 && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 좌측 8열: 메뉴 카탈로그 */}
            <div className="lg:col-span-8 space-y-6">
              <div className="border-b border-stone-800 pb-5">
                <span className="text-xs uppercase tracking-widest text-[#E5A93C] font-semibold">
                  綱割烹 • OFFICIAL DIGITAL ORDERING
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">온라인 주문 Order Online</h1>
                <p className="text-xs sm:text-sm text-stone-400 mt-1">
                  도쿄 도요스 시장 직송 최고급 참치와 신선 사시미, 장인의 시그니처 롤을 안전하게 직배송합니다.
                </p>
              </div>

              {/* 카테고리 필터 */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['전체 All', 'Sashimi 刺身', 'Sushi 寿司', 'Roll 롤', 'Don 덮밥'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat.toLowerCase().includes('all') ? 'all' : cat.toLowerCase().split(' ')[0])}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition ${
                      selectedCategory === (cat.toLowerCase().includes('all') ? 'all' : cat.toLowerCase().split(' ')[0])
                        ? 'bg-[#E5A93C] text-stone-950 shadow-md'
                        : 'bg-[#141210] text-stone-400 border border-stone-800 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* 메뉴 2열/3열 그리드 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredDishes.map((dish) => (
                  <div key={dish.id} className="bg-[#141210] border border-stone-800 rounded-2xl overflow-hidden shadow-lg group hover:border-[#E5A93C]/50 transition flex flex-col justify-between">
                    <div>
                      <div className="relative h-44 overflow-hidden bg-stone-900">
                        <img src={dish.img} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#E5A93C] text-stone-950 text-[10px] font-black uppercase shadow">
                          {dish.tag}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-serif font-bold text-white text-sm group-hover:text-[#E5A93C] transition">{dish.name}</h3>
                        <p className="text-xs text-stone-400 mt-1 line-clamp-2">{dish.desc}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4 pt-2 border-t border-stone-800/80 flex items-center justify-between">
                      <span className="text-base font-mono font-black text-[#E5A93C]">₱{dish.price}.00</span>
                      <button
                        onClick={() => {
                          setCartItems([...cartItems, { id: dish.id, name: dish.name, price: dish.price, qty: 1, option: '기본 손질 및 포장' }]);
                          showToast(`${dish.name}이 장바구니에 추가되었습니다.`, '🍣');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#1C1814] hover:bg-[#E5A93C] text-stone-300 hover:text-stone-950 border border-stone-700 text-xs font-bold transition"
                      >
                        + 담기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 우측 4열: 스티치 Image 1 원본 장바구니 패널 (고정 배치) */}
            <div className="lg:col-span-4 bg-[#141210] border border-stone-800 rounded-2xl p-5 shadow-2xl lg:sticky lg:top-24 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <h3 className="font-serif font-bold text-[#E5A93C] text-base flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" /> 장바구니 CART ({totalItemCount})
                </h3>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  콜드체인 무료 보냉
                </span>
              </div>

              {/* 3개 이상 무료 음료 배너 */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#1E1914] to-[#161310] border border-[#E5A93C]/40 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#E5A93C] flex items-center gap-1">🎁 3개 이상 주문 무료 음료</span>
                  <span className="text-[10px] font-mono text-emerald-400">달성완료</span>
                </div>
                <p className="text-[11px] text-stone-300">콜라 / 스프라이트 / 생수 중 택 1 무료 증정</p>
              </div>

              {/* 담긴 품목 목록 */}
              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 text-xs">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#0C0A09] border border-stone-800 rounded-xl space-y-1">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-white truncate max-w-[200px]">{item.name}</span>
                      <span className="font-mono text-[#E5A93C] font-bold">₱{item.price}.00</span>
                    </div>
                    <p className="text-[10px] text-stone-500">{item.option}</p>
                  </div>
                ))}
              </div>

              {/* 주방 셰프 요청사항 */}
              <div className="p-3 rounded-xl bg-[#0C0A09] border border-stone-800 text-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">주방 셰프 요청사항</span>
                <input 
                  type="text" 
                  defaultValue="간장 따로 포장 요청, 생강절임 넉넉히 부탁드립니다." 
                  className="w-full bg-transparent border-0 p-0 text-stone-300 text-xs focus:ring-0"
                />
              </div>

              {/* 금액 합계 및 체크아웃 CTA */}
              <div className="pt-2 border-t border-stone-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400"><span>주문 금액 (Subtotal)</span><span className="font-mono text-white">₱{subtotal}.00</span></div>
                <div className="flex justify-between text-emerald-400"><span>Tara Pay 웰컴 할인</span><span className="font-mono font-bold">-₱100.00</span></div>
                <div className="flex justify-between text-stone-400"><span>배달료 (Makati Diamond)</span><span className="font-mono text-white">₱50.00</span></div>
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-800">
                  <span className="font-bold text-white text-sm">총 결제 금액 (Total)</span>
                  <span className="font-mono text-2xl font-black text-[#E5A93C]">₱{grandTotal}.00</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveScreen(2);
                  showToast('체크아웃 화면으로 이동합니다.', '📋');
                }}
                className="w-full py-4 rounded-xl bg-[#E5A93C] hover:bg-[#ffc665] text-stone-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition"
              >
                <span>주문서 작성 및 체크아웃 (₱{grandTotal}.00) →</span>
              </button>
            </div>

          </div>
        </main>
      )}

      {/* ========================================================
          화면 2: 다이렉트 체크아웃 & 마닐라 콘도 폼 (Image 3 스티치 1:1)
          ======================================================== */}
      {activeScreen === 2 && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 좌측 8열: 물류 상세 및 Tara Pay 스위트 */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#141210] p-6 rounded-2xl border border-stone-800 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#E5A93C]/20 text-[#E5A93C] px-2.5 py-0.5 rounded-full">
                  Step 2 of 2 • CHECKOUT & FULFILLMENT
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">주문서 작성 & 배송 확인</h2>
                <p className="text-xs text-stone-400">마카티 및 BGC 콘도미니엄 전용 콜드체인 안심 직배송 서비스</p>

                <div className="grid grid-cols-2 gap-2 p-1 bg-[#0C0A09] rounded-xl border border-stone-800 mt-4">
                  <button
                    onClick={() => setFulfillmentMode('delivery')}
                    className={`py-3 rounded-lg text-xs font-bold transition ${fulfillmentMode === 'delivery' ? 'bg-[#181512] text-white shadow' : 'text-stone-400'}`}
                  >
                    자체 콜드체인 안심 배송 (+₱50)
                  </button>
                  <button
                    onClick={() => setFulfillmentMode('pickup')}
                    className={`py-3 rounded-lg text-xs font-bold transition ${fulfillmentMode === 'pickup' ? 'bg-[#181512] text-white shadow' : 'text-stone-400'}`}
                  >
                    말라테 본점 직접 픽업 (무료)
                  </button>
                </div>
              </div>

              {/* 콘도 주소 폼 */}
              <div className="bg-[#141210] p-6 rounded-2xl border border-stone-800 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">수령인 정보 & 콘도 배송 상세</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-stone-400 block mb-1">수령인 성함 (영문/한글)</label>
                    <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} className="w-full bg-[#0C0A09] border border-stone-800 rounded-xl p-2.5 text-white" />
                  </div>
                  <div>
                    <label className="text-stone-400 block mb-1">필리핀 연락처 (+63)</label>
                    <input type="tel" value={recipientPhone} onChange={(e) => setRecipientPhone(e.target.value)} className="w-full bg-[#0C0A09] border border-stone-800 rounded-xl p-2.5 text-white font-mono" />
                  </div>
                </div>

                <div>
                  <label className="text-stone-400 block mb-1 text-xs">콘도미니엄 빌딩명</label>
                  <input type="text" value={buildingName} onChange={(e) => setBuildingName(e.target.value)} className="w-full bg-[#0C0A09] border border-stone-800 rounded-xl p-2.5 text-xs text-white" />
                  <div className="flex gap-1.5 mt-2 flex-wrap text-[11px]">
                    <span className="text-stone-500">빠른 선택:</span>
                    {['Makati Diamond', 'Two Serendra BGC', 'Proscenium Rockwell'].map((c) => (
                      <button key={c} onClick={() => setBuildingName(c)} className="px-2.5 py-1 rounded-full bg-[#181512] border border-stone-800 text-stone-300 hover:text-[#E5A93C]">
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-stone-400 block mb-1">동 / 타워 / 호수</label>
                    <input type="text" value={unitFloor} onChange={(e) => setUnitFloor(e.target.value)} className="w-full bg-[#0C0A09] border border-stone-800 rounded-xl p-2.5 text-white" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-stone-400 block mb-1">상세 도로명 주소</label>
                    <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className="w-full bg-[#0C0A09] border border-stone-800 rounded-xl p-2.5 text-white" />
                  </div>
                </div>

                {/* 3단 수령 프로토콜 */}
                <div className="pt-2">
                  <label className="text-stone-400 block mb-2 text-xs">배송 수령 프로토콜</label>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {[
                      { id: 'lobby', title: '로비 컨시어지 보관', tag: '신속' },
                      { id: 'meet', title: '게이트 대면 픽업', tag: '일반' },
                      { id: 'unit', title: '호실 문 앞 직배송', tag: '패스' },
                    ].map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setDropoffProtocol(p.id as any)}
                        className={`p-3 rounded-xl border cursor-pointer transition ${dropoffProtocol === p.id ? 'border-[#E5A93C] bg-[#1A1612]' : 'border-stone-800 bg-[#0C0A09]'}`}
                      >
                        <span className="text-[10px] text-stone-500 block">{p.tag}</span>
                        <span className="font-bold text-white block mt-0.5">{p.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tara Pay 통합 결제 모듈 */}
              <div className="bg-[#141210] p-6 rounded-2xl border border-stone-800 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">TARA PAY UNIFIED GATEWAY</h3>
                  <span className="text-[10px] text-[#E5A93C] font-mono">BSP Reg. OPS #OPS-2024</span>
                </div>
                <div className="space-y-2">
                  {[
                    { id: 'ewallet', name: 'e-Wallets & Linked Accounts', desc: 'GCash, Maya, ShopeePay 즉시 바이오메트릭 승인' },
                    { id: 'bnpl', name: 'Tara Pay Later / Installment', desc: '0% 무이자 월별 분할 납부 (사전 승인 ₱15,000)' },
                    { id: 'qrph', name: 'InstaPay QRPh National & Online Banking', desc: 'BDO, BPI, UnionBank 실시간 국가 표준 QR 스캔' },
                    { id: 'cards', name: 'Credit / Debit Cards (3D Secure 2.2)', desc: 'Visa, Mastercard, JCB 토큰화 보안 결제' },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex justify-between items-center ${paymentMethod === m.id ? 'border-[#E5A93C] bg-[#1A1612]' : 'border-stone-800 bg-[#0C0A09]'}`}
                    >
                      <div>
                        <p className="text-xs font-bold text-white">{m.name}</p>
                        <p className="text-[10px] text-stone-400">{m.desc}</p>
                      </div>
                      {paymentMethod === m.id && <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 우측 4열: 주문 요약 및 결제 CTA */}
            <div className="lg:col-span-4 bg-[#141210] p-6 rounded-2xl border border-stone-800 space-y-4 lg:sticky lg:top-24">
              <h3 className="font-serif font-bold text-white text-base">ORDER SUMMARY</h3>
              <div className="space-y-2 text-xs text-stone-400 border-b border-stone-800 pb-3">
                <div className="flex justify-between"><span>Salmon Sashimi (1x)</span><span className="font-mono text-white">₱430.00</span></div>
                <div className="flex justify-between"><span>Aburi Salmon Roll (1x)</span><span className="font-mono text-white">₱375.00</span></div>
                <div className="flex justify-between text-emerald-400"><span>Tara Pay 쿠폰 할인</span><span className="font-mono font-bold">-₱100.00</span></div>
                <div className="flex justify-between"><span>콜드체인 배달비</span><span className="font-mono text-white">₱50.00</span></div>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-stone-400">최종 승인 금액</span>
                <span className="text-2xl font-mono font-black text-[#E5A93C]">₱{grandTotal}.00</span>
              </div>
              <button
                onClick={() => {
                  setActiveScreen(3);
                  playChime();
                  showToast('Tara Pay 결제가 정상 승인되었습니다.', '💳');
                }}
                className="w-full py-4 rounded-xl bg-[#E5A93C] hover:bg-[#ffc665] text-stone-950 font-black text-sm shadow-lg transition"
              >
                Place Order & Pay ₱{grandTotal}.00
              </button>
            </div>

          </div>
        </main>
      )}

      {/* ========================================================
          화면 3: 결제 승인 정산 영수증 & 주방 전표 (Image 4·5 스티치 1:1)
          ======================================================== */}
      {activeScreen === 3 && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 좌측 7열: 결제 검증 영수증 및 조리 전표 */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-[#141210] border border-[#E5A93C]/60 rounded-3xl p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl border border-emerald-500/40">
                      ✓
                    </div>
                    <div>
                      <h2 className="text-lg font-serif font-bold text-white">결제 검증 및 정산 완료 (SETTLED)</h2>
                      <p className="text-xs text-stone-400 font-mono">TXN: #TP-20261030-99482-PH • 즉시 정산됨</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-400 block">최종 정산 승인액</span>
                    <span className="text-2xl font-mono font-black text-[#E5A93C]">₱755.00 PHP</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-[#0C0A09] border border-stone-800 rounded-xl">
                    <span className="text-stone-500 block text-[10px]">결제 수단</span>
                    <strong className="text-blue-400 font-bold">GCash 생체인증 간편결제</strong>
                    <span className="block text-emerald-400 text-[10px] mt-0.5">● 즉시 승인 완료</span>
                  </div>
                  <div className="p-3 bg-[#0C0A09] border border-stone-800 rounded-xl">
                    <span className="text-stone-500 block text-[10px]">보안 인증</span>
                    <strong className="text-stone-200 font-bold">EMV 3-D Secure 2.2</strong>
                    <span className="block text-stone-400 text-[10px] mt-0.5">PCI-DSS 레벨1 보안</span>
                  </div>
                </div>

                {/* 주문 품목 명세 */}
                <div className="p-4 rounded-xl bg-[#0C0A09] border border-stone-800 space-y-3 text-xs">
                  <div className="flex justify-between items-center text-stone-400 uppercase font-bold text-[10px] pb-2 border-b border-stone-800">
                    <span>주문 내역 및 주방 전표 (TICKET #TK-048)</span>
                    <span className="text-[#E5A93C]">말라테 본점 키친 직송</span>
                  </div>
                  <div className="flex justify-between text-white font-medium"><span>1x Salmon Sashimi (생연어 사시미)</span><span className="font-mono">₱430.00</span></div>
                  <div className="flex justify-between text-white font-medium"><span>1x Aburi Salmon Roll (아부리 살몬 롤)</span><span className="font-mono">₱375.00</span></div>
                  <div className="flex justify-between text-emerald-400 font-bold"><span>🎁 [프로모션 증정] 코카콜라 330ml 캔</span><span className="font-mono">FREE (₱0.00)</span></div>
                </div>

                <button
                  onClick={() => {
                    setActiveScreen(4);
                    playChime();
                    showToast('실시간 라이브 텔레메트리 관제를 가동합니다.', '🛰️');
                  }}
                  className="w-full py-4 rounded-xl bg-[#E5A93C] hover:bg-[#ffc665] text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <span>실시간 콜드체인 배송 추적하기 (Live Radar) →</span>
                </button>
              </div>
            </div>

            {/* 우측 5열: 배달 1:1 다이렉트 톡 프리뷰 */}
            <div className="lg:col-span-5 bg-[#141210] border border-stone-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-stone-800">
                <h3 className="font-serif font-bold text-white text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  실시간 배달 안심 1:1 다이렉트 톡
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono">1분 내 회신</span>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
                    <span className="text-[10px] text-stone-500 mb-0.5">{msg.sender} • {msg.time}</span>
                    <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${msg.isUser ? 'bg-[#E5A93C] text-stone-950 font-bold' : 'bg-[#181512] border border-stone-800 text-stone-200'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      )}

      {/* ========================================================
          화면 4: 실시간 배송 관제 레이더 2열 대시보드 (Image 2 스티치 1:1)
          ======================================================== */}
      {activeScreen === 4 && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* 좌측 8열: 텔레메트리 레이더 맵 + 라이더 정보 + 1:1 톡 */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* 레이더 지도 뷰 */}
              <div className="bg-[#141210] border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-[#110E0C]">
                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase font-serif text-white">
                      LIVE TRANSIT & GOOGLE MAPS TELEMETRY
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">Route: Malate Flagship → Makati Diamond Residences (4.8km)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsNearArrivalModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-bold"
                    >
                      ⚡ 3분 전 알림
                    </button>
                    <button
                      onClick={() => setActiveScreen(5)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-400 text-stone-950 text-xs font-bold"
                    >
                      Stage 5 전환 →
                    </button>
                  </div>
                </div>

                <div className="relative h-96 w-full bg-[#0A0908] overflow-hidden select-none">
                  <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')` }} />
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
                    <path d="M 160 295 Q 310 240, 480 170 T 800 100" fill="none" stroke="#E5A93C" strokeWidth="3" strokeDasharray="8,5" className="animate-pulse" />
                  </svg>

                  <div className="absolute left-[16%] bottom-[26%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#141210] border-2 border-[#E5A93C] flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-ping" />
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded bg-black/90 text-[10px] text-white font-bold">Malate 본점</span>
                  </div>

                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#E5A93C] text-stone-950 flex items-center justify-center font-bold text-lg shadow-2xl animate-bounce">
                      🏍️
                    </div>
                    <span className="mt-1 px-2.5 py-0.5 rounded-full bg-black/90 border border-[#E5A93C] text-[10px] font-mono text-[#E5A93C]">
                      Danilo Reyes (EV-04 • 28.5 km/h)
                    </span>
                  </div>

                  <div className="absolute right-[20%] top-[25%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded bg-black/90 text-[10px] text-emerald-400 font-bold">Makati Diamond</span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#141210] border-t border-stone-800 grid grid-cols-4 gap-2 text-center text-xs">
                  <div><span className="text-stone-500 text-[10px] block">IoT Cold-Chain</span><span className="font-mono font-bold text-cyan-400">3.4°C 유지</span></div>
                  <div><span className="text-stone-500 text-[10px] block">전담 라이더</span><span className="font-medium text-white truncate block">Danilo Reyes</span></div>
                  <div><span className="text-stone-500 text-[10px] block">남은 거리</span><span className="font-mono text-[#E5A93C] font-bold">4.8 km (18분)</span></div>
                  <div><span className="text-stone-500 text-[10px] block">GPS 정밀도</span><span className="font-mono text-emerald-400">± 1.2m</span></div>
                </div>
              </div>

              {/* 1:1 다이렉트 톡 폼 */}
              <div className="bg-[#141210] border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-stone-800">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" /> 라이더 & 매장 직통 소통 채널
                  </span>
                  <div className="flex gap-1 bg-[#0C0A09] p-1 rounded-full border border-stone-800">
                    <button onClick={() => setChatTab('chef')} className={`px-3 py-1 rounded-full text-xs font-bold ${chatTab === 'chef' ? 'bg-[#E5A93C] text-stone-950' : 'text-stone-400'}`}>매장 주방</button>
                    <button onClick={() => setChatTab('courier')} className={`px-3 py-1 rounded-full text-xs font-bold ${chatTab === 'courier' ? 'bg-[#E5A93C] text-stone-950' : 'text-stone-400'}`}>배달 라이더</button>
                  </div>
                </div>

                <div className="space-y-3 max-h-48 overflow-y-auto pr-1 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
                      <span className="text-[10px] text-stone-500 mb-0.5">{msg.sender} • {msg.time}</span>
                      <div className={`p-3 rounded-2xl max-w-[85%] ${msg.isUser ? 'bg-[#E5A93C] text-stone-950 font-bold' : 'bg-[#181512] border border-stone-800 text-stone-200'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-stone-800">
                  <input
                    type="text"
                    placeholder="메시지 입력..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-[#0C0A09] border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white"
                  />
                  <button
                    onClick={() => {
                      if (!chatInput.trim()) return;
                      setChatMessages([...chatMessages, { sender: '나 (Danny Jang)', time: '방금 전', text: chatInput, isUser: true }]);
                      setChatInput('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#E5A93C] text-stone-950 font-bold text-xs"
                  >
                    전송
                  </button>
                </div>
              </div>
            </div>

            {/* 우측 4열: 스티치 Image 2 원본 주문 명세서 패널 (상시 고정) */}
            <div className="lg:col-span-4 bg-[#141210] border border-stone-800 rounded-2xl p-6 shadow-2xl lg:sticky lg:top-24 space-y-4">
              <div className="flex justify-between items-start border-b border-stone-800 pb-3">
                <div>
                  <h3 className="font-serif font-bold text-[#E5A93C] text-sm">주문 명세서 (ITEMIZED BILL)</h3>
                  <p className="text-[11px] text-stone-500">2026.10.30 • 오후 7:18</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  결제 완료
                </span>
              </div>

              <div className="space-y-2.5 text-xs border-b border-stone-800 pb-3">
                <div className="flex justify-between"><span>1x Salmon Sashimi</span><span className="font-mono text-white">₱430.00</span></div>
                <div className="flex justify-between"><span>1x Aburi Salmon Roll</span><span className="font-mono text-white">₱375.00</span></div>
                <div className="flex justify-between text-emerald-400"><span>🎁 콜라 330ml 캔</span><span className="font-mono">FREE (₱0.00)</span></div>
                <div className="flex justify-between text-emerald-400"><span>Tara Pay 할인권</span><span className="font-mono font-bold">-₱100.00</span></div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-xs text-stone-400">최종 결제 금액</span>
                <span className="text-2xl font-mono font-black text-[#E5A93C]">₱755.00 PHP</span>
              </div>

              <button
                onClick={() => {
                  setActiveScreen(5);
                  showToast('Stage 5 배송 완료 화면으로 전환합니다.', '🎉');
                }}
                className="w-full py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-stone-950 font-black text-xs shadow-lg transition"
              >
                배송 완료 확인 & 영수증 보기 →
              </button>
            </div>

          </div>
        </main>
      )}

      {/* ========================================================
          화면 5: Stage 5 안심 배송 완료 & 크라이오 리포트 (Image 6 스티치 1:1)
          ======================================================== */}
      {activeScreen === 5 && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 animate-in fade-in duration-300 space-y-7">
          <section className="bg-[#1D1B19] border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold inline-block mb-2">
                  ✓ 배송 완료 (Delivery Completed)
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  오마카세 배송이 신선하고 안전하게 완료되었습니다
                </h1>
                <p className="text-xs text-stone-400 mt-1">
                  마카티 다이아몬드 레지던스 타워 1 로비 컨시어지 데스크에 크라이오 보냉 상태로 안심 인계되었습니다.
                </p>
              </div>

              <button
                onClick={() => {
                  setActiveScreen(1);
                  showToast('동일 메뉴가 장바구니에 담겼습니다.', '🍣');
                }}
                className="px-5 py-3 rounded-xl bg-[#E5A93C] text-stone-950 font-black text-xs sm:text-sm shadow transition hover:bg-[#ffc665]"
              >
                🍣 동일 메뉴 1초 재주문
              </button>
            </div>

            {/* 실물 인증 사진 & 온도 감사 리포트 2열 그리드 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
              
              {/* 좌측 7열: 로비 실물 인계 인증 사진 */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-stone-800 relative bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80" 
                  alt="Drop-off Proof" 
                  className="w-full h-80 sm:h-96 object-cover opacity-85" 
                />
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-black/90 border border-stone-800 text-xs flex justify-between items-center backdrop-blur-md">
                  <div>
                    <p className="font-bold text-white">Makati Diamond Residences Tower 1 Concierge Desk</p>
                    <span className="text-[10px] text-stone-400">골드 씰 크라이오 박스 무결성 검수 완료 • Mr. Santos 인계</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                    19:48 PHT 인계 완료
                  </span>
                </div>
              </div>

              {/* 우측 5열: IoT 보냉 온도 추이 그래프 + 별점 위젯 */}
              <div className="lg:col-span-5 bg-[#141210] border border-stone-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E5A93C] block mb-1">
                    도요스 콜드체인 실시간 감사 리포트
                  </span>
                  <p className="text-xs text-stone-400 leading-relaxed">
                    말라테 본점 출고부터 마카티 로비 인계까지 전 구간 3°C 이하를 완벽히 유지했습니다.
                  </p>
                  
                  {/* 온도 꺾은선 그래프 */}
                  <div className="mt-4 p-4 rounded-xl bg-[#0C0A09] border border-stone-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-stone-500">도착 시점 심부 온도</span>
                      <span className="font-mono text-emerald-400 font-bold">2.8°C (정상 적합)</span>
                    </div>
                    <svg className="w-full h-20 text-[#E5A93C]" viewBox="0 0 300 80" fill="none">
                      <line x1="0" y1="20" x2="300" y2="20" stroke="#ffb4ab" strokeDasharray="4 4" strokeWidth="1" />
                      <path d="M0,50 Q150,45 300,35" stroke="currentColor" strokeWidth="2.5" />
                      <circle cx="300" cy="35" r="4" fill="currentColor" />
                    </svg>
                    <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                      <span>본점 출고 (2.4°C)</span>
                      <span>로비 인계 (2.8°C)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#1C1814] border border-stone-800 text-center space-y-2.5">
                  <span className="text-xs font-bold text-white block">식음 경험 만족도 평가 (+150P 지급)</span>
                  <div className="flex justify-center gap-2 text-2xl text-[#E5A93C]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} onClick={() => setRating(s)} className="hover:scale-110 transition">
                        ★
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      playChime();
                      showToast('⭐️ 5.0 만점 평가 및 VIP 150P가 적립되었습니다!', '🎉');
                    }}
                    className="w-full py-3 rounded-xl bg-[#E5A93C] text-stone-950 font-black text-xs shadow-md"
                  >
                    평가 제출하고 150P 적립받기
                  </button>
                </div>
              </div>

            </div>
          </section>
        </main>
      )}

      {/* ========================================================
          MODAL: 라이더 도착 3분 전 안내 팝업
          ======================================================== */}
      {isNearArrivalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#151311] border-2 border-[#E5A93C] rounded-3xl shadow-2xl p-6 sm:p-7 space-y-4 animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E5A93C]/20 text-[#E5A93C] border border-[#E5A93C]/40">
                  NEAR DESTINATION
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-1">라이더 도착 3분 전 안내</h3>
              </div>
              <button onClick={() => setIsNearArrivalModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              전담 라이더 <strong className="text-[#E5A93C]">Danilo Reyes</strong> 님이 마카티 다이아몬드 레지던스 반경 300m 이내에 진입했습니다. 요청하신 로비 컨시어지(Mr. Santos) 비대면 인계를 준비합니다.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  showToast('라이더에게 전화 요청이 전달되었습니다.', '📞');
                  setIsNearArrivalModalOpen(false);
                }}
                className="py-3 rounded-xl bg-[#1C1814] border border-[#E5A93C] text-xs font-bold text-[#E5A93C]"
              >
                📞 도착 즉시 전화 요청
              </button>
              <button
                onClick={() => {
                  showToast('로비 비대면 보관 요청이 라이더에게 전송되었습니다.', '📦');
                  setIsNearArrivalModalOpen(false);
                }}
                className="py-3 rounded-xl bg-[#1C1814] border border-stone-700 text-xs font-bold text-stone-300"
              >
                📦 로비에 맡겨주세요
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 글로벌 푸터 */}
      <footer className="border-t border-stone-800 bg-[#080706] py-10 text-stone-400 text-xs mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <p className="font-serif font-bold text-white text-sm tracking-wider">TUNAMARU JAPANESE RESTAURANT (綱丸 本格江戸前寿司)</p>
            <p className="text-[11px] text-stone-500">Roxas Blvd, corner Pedro Gil St, Malate, Manila, 1004 Metro Manila</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:09150990442" className="px-3.5 py-1.5 rounded-full bg-[#161311] border border-stone-800 text-[#E5A93C] font-mono font-bold">
              0915 099 0442
            </a>
            <span className="text-[11px] text-stone-600">© 2026 Tunamaru Dining. Powered by Tara Pay.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}