'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building, 
  MapPin, 
  Phone, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Sparkles, 
  Ticket, 
  QrCode, 
  Car,
  Store
} from 'lucide-react';
import { TUNAMARU_STORE } from '@/lib/constants';

export default function CheckoutPage() {
  const router = useRouter();

  const [fulfillmentMode, setFulfillmentMode] = useState<'delivery' | 'pickup'>('delivery');
  const [recipientName, setRecipientName] = useState<string>('Danny Jang');
  const [recipientPhone, setRecipientPhone] = useState<string>('0917 123 4567');
  const [buildingName, setBuildingName] = useState<string>('Makati Diamond Residences');
  const [unitFloor, setUnitFloor] = useState<string>('Tower 1, Unit 18-B');
  const [streetAddress, setStreetAddress] = useState<string>('118 Legazpi St, Legazpi Village, Makati City');
  const [dropoffProtocol, setDropoffProtocol] = useState<'lobby' | 'meet' | 'unit'>('lobby');
  const [riderNote, setRiderNote] = useState<string>('Notify front lobby desk for resident unit 18-B; intercom authorized.');

  const [paymentMethod, setPaymentMethod] = useState<'ewallet' | 'bnpl' | 'qrph' | 'cards' | 'cod'>('ewallet');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const subtotalPrice = 805;
  const deliveryFee = fulfillmentMode === 'delivery' ? 50 : 0;
  const deliveryWaivedDiscount = fulfillmentMode === 'delivery' ? 50 : 0;
  const firstOrderDiscount = 50;
  const grandTotal = Math.max(0, subtotalPrice + deliveryFee - deliveryWaivedDiscount - firstOrderDiscount);

  const selectCondoChip = (name: string, street: string) => {
    setBuildingName(name);
    setStreetAddress(street);
  };

  const handleCheckoutSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/order/JF-20261030-99482');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-stone-200">
      
      {/* 1. 최상단 컨시어지 알림 바 */}
      <div className="w-full bg-[#110E0C] text-stone-400 text-xs px-4 sm:px-6 py-2.5 rounded-xl mb-6 shadow-sm flex flex-wrap items-center justify-between gap-3 border border-[#28231E]/60">
        <div className="flex items-center gap-3">
          <Link href="/" className="inline-flex items-center gap-1.5 text-stone-100 hover:text-[#E5A93C] transition font-medium">
            <ArrowLeft className="w-4 h-4 text-[#E5A93C]" />
            <span>메뉴 / 장바구니로 돌아가기</span>
          </Link>
          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-stone-700" />
          <span className="hidden sm:inline-flex items-center gap-1.5 text-stone-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            도요스 시장 당일 직송 식자재 실시간 콜드체인 배송 중
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181512] text-stone-200 border border-stone-800">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span className="font-medium tracking-wide">BSP Reg. OPS & DTI Verified</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-stone-500">
            <Phone className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Hotline: <strong className="text-stone-300 font-mono">{TUNAMARU_STORE.phone}</strong></span>
          </div>
        </div>
      </div>

      {/* 2. 2-Column Responsive Checkout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        
        {/* LEFT COLUMN: 물류, 마닐라 콘도 주소 & Tara Pay 결제 수단 (8 Cols) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          
          <div className="bg-[#141210] p-6 sm:p-7 rounded-2xl shadow-xl relative overflow-hidden border border-[#28231E]/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-[#E5A93C]/15 text-[#E5A93C] border border-[#E5A93C]/30">
                  Step 2 of 2
                </span>
                <span className="text-xs text-stone-500 tracking-wide">츠나마루 • 마닐라 특급 컨시어지</span>
              </div>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <Sparkles className="w-3.5 h-3.5" /> Cold-Chain Active (&lt;4°C)
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">주문서 작성 & 배송 확인</h1>
            <p className="text-xs sm:text-sm text-stone-400 mt-1 max-w-xl">
              마카티 레가스피, 살세도, 락웰, BGC 콘도미니엄 및 레지던스 전용 안심 콜드체인 직배송 서비스.
            </p>

            {/* 수령 방식 토글 */}
            <div className="mt-6 p-1.5 bg-[#0C0A09] rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-1.5 border border-stone-800">
              <button
                type="button"
                onClick={() => setFulfillmentMode('delivery')}
                className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg font-medium text-xs sm:text-sm transition ${
                  fulfillmentMode === 'delivery'
                    ? 'bg-[#181512] text-white border border-stone-700 shadow-md font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Car className="w-4 h-4 text-[#E5A93C]" />
                <div className="text-left">
                  <div className="font-bold text-xs tracking-wide">자체 콜드체인 안심 배송</div>
                  <div className="text-[10px] text-stone-400">+₱50 정액 특급 (마카티 / BGC 전 지역)</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFulfillmentMode('pickup')}
                className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg font-medium text-xs sm:text-sm transition ${
                  fulfillmentMode === 'pickup'
                    ? 'bg-[#181512] text-white border border-stone-700 shadow-md font-bold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4 text-[#E5A93C]" />
                <div className="text-left flex-1">
                  <div className="flex items-center gap-1.5">
                    <div className="font-bold text-xs tracking-wide">말라테 본점 직접 픽업</div>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold border border-emerald-500/30">무료 • ₱50 절약</span>
                  </div>
                  <div className="text-[10px] text-stone-500">Roxas Blvd cor Pedro Gil (15-25분 소요)</div>
                </div>
              </button>
            </div>
          </div>

          {fulfillmentMode === 'delivery' ? (
            <div className="bg-[#141210] p-6 sm:p-7 rounded-2xl shadow-xl flex flex-col gap-6 border border-[#28231E]/60">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#E5A93C]/10 text-[#E5A93C] flex items-center justify-center border border-[#E5A93C]/20">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">수령인 정보 & 콘도 배송 상세</h3>
                    <p className="text-[11px] text-stone-500">마카티 및 BGC 콘도 로비 보안 데스크 신속 통과 맞춤 프로토콜</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#E5A93C] bg-[#E5A93C]/10 px-2 py-0.5 rounded-full font-mono border border-[#E5A93C]/25">
                  Metro Manila Direct
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    수령인 성함 (영문 또는 한글) *
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full bg-[#0C0A09] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:ring-1 focus:ring-[#E5A93C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    필리핀 연락처 (+63) *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-xs text-stone-500 font-mono">+63</span>
                    <input
                      type="tel"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="w-full bg-[#0C0A09] text-white text-xs sm:text-sm pl-12 pr-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:ring-1 focus:ring-[#E5A93C] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  콘도미니엄 / 빌딩명 *
                </label>
                <input
                  type="text"
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  className="w-full bg-[#0C0A09] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:ring-1 focus:ring-[#E5A93C] mb-2"
                />
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] uppercase text-stone-500 mr-1">빠른 선택:</span>
                  <button
                    type="button"
                    onClick={() => selectCondoChip('Makati Diamond Residences', '118 Legazpi St, Legazpi Village, Makati City')}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#1F1B17] hover:bg-[#E5A93C]/20 hover:text-[#E5A93C] text-stone-300 border border-stone-800 transition"
                  >
                    Makati Diamond
                  </button>
                  <button
                    type="button"
                    onClick={() => selectCondoChip('Two Serendra BGC', '11th Ave cor McKinley Pkwy, Bonifacio Global City, Taguig')}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#1F1B17] hover:bg-[#E5A93C]/20 hover:text-[#E5A93C] text-stone-300 border border-stone-800 transition"
                  >
                    Two Serendra BGC
                  </button>
                  <button
                    type="button"
                    onClick={() => selectCondoChip('Proscenium at Rockwell', 'Estrella cor J.P. Rizal, Poblacion, Makati')}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#1F1B17] hover:bg-[#E5A93C]/20 hover:text-[#E5A93C] text-stone-300 border border-stone-800 transition"
                  >
                    Proscenium Rockwell
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    동 / 타워 / 호수 *
                  </label>
                  <input
                    type="text"
                    value={unitFloor}
                    onChange={(e) => setUnitFloor(e.target.value)}
                    className="w-full bg-[#0C0A09] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:ring-1 focus:ring-[#E5A93C]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                    상세 도로명 주소
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full bg-[#0C0A09] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:ring-1 focus:ring-[#E5A93C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                  배송 수령 프로토콜
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'lobby', title: '로비 컨시어지 보관', tag: '가장 신속', desc: '1층 로비 데스크에 보관 위탁' },
                    { id: 'meet', title: '게이트 / 입구 직접 픽업', tag: '일반', desc: '정문 게이트에서 라이더 대면 수령' },
                    { id: 'unit', title: '호실 문 앞 직배송', tag: '엘리베이터 패스', desc: '호실 문 앞까지 직접 전달' },
                  ].map((proto) => (
                    <div
                      key={proto.id}
                      onClick={() => setDropoffProtocol(proto.id as any)}
                      className={`flex flex-col p-3 rounded-xl cursor-pointer transition border ${
                        dropoffProtocol === proto.id
                          ? 'bg-[#1F1A14] border-[#E5A93C] shadow-sm'
                          : 'bg-[#0C0A09] border-stone-800 text-stone-400'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-stone-400">{proto.tag}</span>
                        {dropoffProtocol === proto.id && <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C]" />}
                      </div>
                      <span className="text-xs font-bold text-white">{proto.title}</span>
                      <span className="text-[10px] text-stone-500 mt-0.5">{proto.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400 mb-1.5">
                  라이더 전달사항 & 로비 출입 메모
                </label>
                <input
                  type="text"
                  value={riderNote}
                  onChange={(e) => setRiderNote(e.target.value)}
                  className="w-full bg-[#0C0A09] text-white text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-800 focus:outline-none focus:ring-1 focus:ring-[#E5A93C]"
                />
              </div>
            </div>
          ) : (
            <div className="bg-[#141210] p-6 rounded-2xl shadow-xl border border-stone-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Store className="w-4 h-4 text-[#E5A93C]" />
                매장 픽업 위치 안내 (말라테 본점)
              </h3>
              <p className="text-xs text-stone-300 font-bold">{TUNAMARU_STORE.name}</p>
              <p className="text-xs text-stone-400">{TUNAMARU_STORE.address}</p>
              <p className="text-xs text-emerald-400 font-mono">조리 예상 소요시간: 15~20분</p>
            </div>
          )}

          {/* Tara Pay 통합 결제 모듈 */}
          <div className="bg-[#141210] p-6 sm:p-7 rounded-2xl shadow-xl flex flex-col gap-5 border border-[#28231E]/60">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E5A93C] via-[#F2BE42] to-[#F59E0B] text-stone-950 font-black text-xs flex items-center justify-center shadow-lg">
                  TP
                </div>
                <div>
                  <h3 className="text-base font-serif font-bold text-white">Tara Pay 통합 간편 결제</h3>
                  <p className="text-[11px] text-stone-500">Philippine National QRPh & Instant Clearance Network</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#E5A93C] flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> BSP Reg. OPS
              </span>
            </div>

            <div className="space-y-3">
              {[
                { id: 'ewallet', name: 'e-Wallets (GCash, Maya, ShopeePay)', desc: '1-Click 바이오메트릭 간편 결제' },
                { id: 'bnpl', name: 'Tara Pay Later (0% 할부)', desc: '사전 승인 한도 내 익월 청구 분할 납부' },
                { id: 'qrph', name: 'InstaPay QRPh National', desc: 'BDO, BPI, UnionBank 실시간 스캔' },
                { id: 'cards', name: 'Credit / Debit Cards', desc: 'Visa, Mastercard, JCB (3D Secure 2.2)' },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-4 rounded-xl border cursor-pointer transition ${
                    paymentMethod === m.id
                      ? 'border-[#E5A93C] bg-[#1A1612]'
                      : 'border-stone-800 bg-[#0C0A09]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{m.name}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{m.desc}</p>
                    </div>
                    {paymentMethod === m.id && <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 주문 요약 및 결제 버튼 (4 Cols Sticky) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 flex flex-col gap-5">
          <div className="bg-[#141210] p-6 sm:p-7 rounded-2xl shadow-2xl flex flex-col gap-5 border border-[#28231E]/60">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-base font-serif font-bold text-white">주문 내역 요약</h3>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#E5A93C]/10 text-[#E5A93C]">
                선택 2개
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-start bg-[#0C0A09] p-3 rounded-xl border border-stone-800 text-xs">
                <div>
                  <p className="font-bold text-white">Salmon Sashimi</p>
                  <p className="text-[10px] text-stone-500">• Extra wasabi [Free] • Shiso Leaves [+₱30]</p>
                </div>
                <span className="font-mono font-bold text-white">₱430.00</span>
              </div>

              <div className="flex justify-between items-start bg-[#0C0A09] p-3 rounded-xl border border-stone-800 text-xs">
                <div>
                  <p className="font-bold text-white">Aburi Salmon Roll</p>
                  <p className="text-[10px] text-stone-500">• 8pcs Torched • Spicy Mayo Dip</p>
                </div>
                <span className="font-mono font-bold text-white">₱375.00</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-[#1E1914] to-[#161310] border border-[#E5A93C]/40 flex flex-col gap-2 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Ticket className="w-3.5 h-3.5 text-[#E5A93C]" /> Tara Pay 프로모션 할인 혜택
              </span>
              <div className="flex justify-between text-[11px] text-stone-300">
                <span>배송비 면제 쿠폰</span>
                <span className="font-mono font-bold text-emerald-400">-₱50.00</span>
              </div>
              <div className="flex justify-between text-[11px] text-stone-300">
                <span>웰컴 다이닝 할인권</span>
                <span className="font-mono font-bold text-[#E5A93C]">-₱50.00</span>
              </div>
            </div>

            <div className="space-y-2 text-xs pt-1 border-t border-stone-800">
              <div className="flex justify-between text-stone-400">
                <span>주문 소계</span>
                <span className="font-mono text-white">₱{subtotalPrice}.00</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>콜드체인 배송비</span>
                <span className="font-mono text-stone-500 line-through">₱50.00</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>프로모션 할인</span>
                <span className="font-mono font-bold">-₱100.00</span>
              </div>
              <div className="mt-3 bg-[#0C0A09] p-4 rounded-xl flex items-center justify-between border border-[#E5A93C]/30 shadow-inner">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">최종 결제 금액</span>
                  <span className="text-[10px] text-emerald-400 font-medium">총 ₱100.00 할인 적용</span>
                </div>
                <span className="text-2xl sm:text-3xl font-mono font-black text-[#E5A93C]">
                  ₱{grandTotal}.00
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckoutSubmit}
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#E5A93C] via-[#F2BE42] to-[#F59E0B] hover:brightness-110 active:scale-[0.98] text-stone-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition"
            >
              <Lock className="w-4 h-4" />
              <span>{isSubmitting ? 'Tara Pay 세션 연결 중...' : `Pay ₱${grandTotal}.00 with Tara Pay`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}