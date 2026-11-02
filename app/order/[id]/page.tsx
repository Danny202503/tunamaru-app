'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Radio, 
  ShoppingBag, 
  X, 
  Send, 
  Download, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { TUNAMARU_STORE } from '@/lib/constants';

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params?.id ? String(params.id) : 'JF-20261030-99482';

  // 시뮬레이션 단계 상태 (2, 4, 5)
  const [currentStage, setCurrentStage] = useState<number>(2);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [isSatelliteView, setIsSatelliteView] = useState<boolean>(false);

  // 모달 제어 상태
  const [isNearArrivalModalOpen, setIsNearArrivalModalOpen] = useState<boolean>(false);
  const [isDeliveryCompletedModalOpen, setIsDeliveryCompletedModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isReorderDrawerOpen, setIsReorderDrawerOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState<boolean>(false);

  // 선물 및 잔액 인터랙션 상태
  const [selectedGift, setSelectedGift] = useState<{ name: string; icon: string }>({
    name: '콜라 / Coke (330ml)',
    icon: '🥤',
  });
  const [walletBalance, setWalletBalance] = useState<number>(1695);
  const [chatTab, setChatTab] = useState<'chef' | 'courier'>('chef');
  const [chatInput, setChatInput] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<{ text: string; icon: string } | null>(null);

  // 1:1 채팅 메시지 스트림
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; time: string; text: string; isUser: boolean; isProof?: boolean }>>([
    {
      sender: 'Tunamaru Head Chef (Takeshi)',
      time: '19:15',
      text: "고객님, 주문하신 '연어 사시미'와 '아부리 연어 롤' 신선하게 극저온 패킹 완료되었습니다. 요청하신 초생강과 생와사비는 넉넉히 동봉해 드렸습니다.",
      isUser: false,
    },
    {
      sender: '나 (Danny Jang)',
      time: '19:16',
      text: '감사합니다! 엘리베이터 카드키 인증이 필요하니 도착하시면 로비에서 연락 부탁드립니다.',
      isUser: true,
    },
    {
      sender: '라이더 Danilo Reyes',
      time: '19:18',
      text: '네 고객님! 마카티 다이아몬드 레지던스 로비 데스크 안내 확인했습니다. 전용 극저온 보냉함(3.4°C 유지)으로 신속히 이동 중입니다.',
      isUser: false,
    },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiAnimRef = useRef<number | null>(null);

  const showToast = (text: string, icon = '🔔') => {
    setToastMsg({ text, icon });
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Web Audio API Synthesizer
  const playChime = (type: 'arrival' | 'fanfare' | 'click') => {
    if (!isAudioEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === 'arrival') {
        [880, 1320, 1760].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = idx === 2 ? 'triangle' : 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.001, now + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.12 + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 1.3);
        });
      } else if (type === 'fanfare') {
        const notes = [
          { f: 523.25, t: 0.0, d: 0.15 },
          { f: 523.25, t: 0.18, d: 0.15 },
          { f: 659.25, t: 0.36, d: 0.25 },
          { f: 783.99, t: 0.65, d: 0.25 },
          { f: 1046.5, t: 0.95, d: 0.7 },
        ];
        notes.forEach((n) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(n.f, now + n.t);
          gain.gain.setValueAtTime(0.001, now + n.t);
          gain.gain.linearRampToValueAtTime(0.18, now + n.t + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + n.t);
          osc.stop(now + n.t + n.d + 0.05);
        });
      } else {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(600, now);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {
      console.warn('Audio error:', e);
    }
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

  const startConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#E5A93C', '#F59E0B', '#FDE68A', '#10B981', '#FFFFFF'];
    const particles = Array.from({ length: 80 }).map(() => ({
      x: canvas.width * 0.5 + (Math.random() - 0.5) * 100,
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 14,
      vy: -(Math.random() * 12 + 6),
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35;
        p.life -= 0.01;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (alive > 0) {
        confettiAnimRef.current = requestAnimationFrame(render);
      }
    };
    render();
  };

  const handleStageChange = (stage: number) => {
    setCurrentStage(stage);
    if (stage === 5) {
      playChime('fanfare');
      triggerHaptic([120, 60, 200]);
      setIsDeliveryCompletedModalOpen(true);
      setTimeout(() => startConfetti(), 100);
      showToast('Stage 5: 고객 비대면 수령이 완료되었습니다!', '🎺');
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'Danilo Reyes (배달 완료)',
          time: '19:48',
          text: '📦 [배달 완료] 마카티 다이아몬드 레지던스 타워 1 로비 컨시어지(Mr. Santos)께 요청하신 대로 안전하게 전달 완료했습니다. 맛있게 드세요!',
          isUser: false,
          isProof: true,
        },
      ]);
    } else if (stage === 4) {
      playChime('click');
      triggerHaptic([80]);
      showToast('Stage 4: 전담 라이더 Danilo 신속 이동 중', '🏍️');
    } else {
      showToast('Stage 2: 셰프 조리 및 극저온 패킹 모드 복귀', '🍣');
    }
  };

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput.trim();
    setChatMessages((prev) => [
      ...prev,
      {
        sender: '나 (Danny Jang)',
        time: '방금 전',
        text: userText,
        isUser: true,
      },
    ]);
    setChatInput('');
    showToast('메시지가 전송되었습니다.', '💬');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: chatTab === 'chef' ? 'Tunamaru 주방 매니저' : '라이더 Danilo Reyes',
          time: '방금 전',
          text: '네 고객님, 전달해 주신 요청사항 정확히 확인하여 안전하게 조치하겠습니다.',
          isUser: false,
        },
      ]);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-7 text-stone-200">
      {toastMsg && (
        <div className="fixed top-24 right-4 sm:right-8 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#141210]/95 border border-[#E5A93C] text-white shadow-2xl animate-in slide-in-from-top-2">
          <span className="text-base">{toastMsg.icon}</span>
          <span className="text-xs sm:text-sm font-medium">{toastMsg.text}</span>
        </div>
      )}

      {/* 상단 관제 툴바 */}
      <section className="bg-[#1D1B19] border border-stone-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E5A93C]/15 text-[#E5A93C] border border-[#E5A93C]/30 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E5A93C]">LIVE DISPATCH PIPELINE</span>
              <span className="text-xs text-stone-600">|</span>
              <span className="text-xs font-mono text-stone-400">주문번호: #{orderId}</span>
            </div>
            <p className="text-sm font-semibold text-stone-200 mt-0.5">
              도요스 직송 오마카세 안심 콜드체인 실시간 관제 시스템
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setIsAudioEnabled(!isAudioEnabled);
              showToast(isAudioEnabled ? '음소거되었습니다.' : '소리가 켜졌습니다.', isAudioEnabled ? '🔇' : '🔊');
            }}
            className="p-2 rounded-lg bg-[#141210] border border-stone-800 text-stone-400 hover:text-[#E5A93C] transition"
            title="소리 온/오프"
          >
            {isAudioEnabled ? <Volume2 className="w-4 h-4 text-[#E5A93C]" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleStageChange(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
              currentStage === 2
                ? 'bg-[#E5A93C] text-stone-950 border-[#E5A93C] shadow-lg'
                : 'bg-[#15120F] text-stone-400 border-stone-800 hover:text-white'
            }`}
          >
            Stage 2: 조리 및 패킹
          </button>

          <button
            onClick={() => handleStageChange(4)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
              currentStage === 4
                ? 'bg-[#E5A93C] text-stone-950 border-[#E5A93C] shadow-lg'
                : 'bg-[#15120F] text-stone-400 border-stone-800 hover:text-white'
            }`}
          >
            Stage 4: 라이더 배송 중
          </button>

          <button
            onClick={() => handleStageChange(5)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
              currentStage === 5
                ? 'bg-emerald-400 text-stone-950 border-emerald-400 shadow-lg'
                : 'bg-[#15120F] text-stone-400 border-stone-800 hover:text-emerald-400'
            }`}
          >
            Stage 5: 배송 완료 전환
          </button>

          <button
            onClick={() => {
              playChime('arrival');
              triggerHaptic([100, 50, 100, 50, 200]);
              setIsNearArrivalModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-lg bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] text-xs font-bold hover:bg-[#E5A93C] hover:text-stone-950 transition"
          >
            ⚡ 도착 3분 전 알림
          </button>
        </div>
      </section>

      {/* 5단계 파이프라인 */}
      <section className="bg-[#1D1B19] border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-800 text-xs">
          <span className="font-bold uppercase tracking-wider text-stone-200">배송 라이프사이클 단계별 현황</span>
          <span className="text-[#E5A93C] font-mono font-semibold">
            {currentStage === 5 ? '총 30분 소요 (정시 인계 100% 충족)' : '예상 잔여 시간: 약 18~28분'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {[
            { stage: 1, title: '주문 접수 · 승인', time: '07:18 PM 완료', done: true },
            { stage: 2, title: '셰프 조리 & 손질', time: currentStage >= 2 ? '07:26 PM 완료' : '대기 중', active: currentStage === 2, done: currentStage > 2 },
            { stage: 3, title: '크라이오 안심 실링', time: currentStage >= 3 ? '07:28 PM 2.6°C 냉장' : '대기 중', active: currentStage === 3, done: currentStage > 3 },
            { stage: 4, title: '전담 라이더 배송', time: currentStage >= 4 ? 'Danilo 기사 주행 중' : '예정 07:34 PM', active: currentStage === 4, done: currentStage > 4 },
            { stage: 5, title: '고객 비대면 수령 완료', time: currentStage === 5 ? '19:48 PHT 로비 보관' : '목표 07:48 PM', active: currentStage === 5, done: currentStage === 5 },
          ].map((st) => (
            <div
              key={st.stage}
              className={`p-3.5 rounded-xl border flex flex-col justify-between transition ${
                st.active
                  ? 'border-[#E5A93C] bg-gradient-to-br from-[#1D1B19] to-[#25201A] shadow-[0_0_15px_rgba(229,169,60,0.25)] text-[#E5A93C]'
                  : st.done
                  ? 'border-emerald-500/40 bg-[#151311] text-emerald-400'
                  : 'border-stone-800 bg-[#151311] text-stone-500'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase">Stage 0{st.stage}</span>
                {st.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : st.active ? (
                  <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-ping" />
                ) : null}
              </div>
              <p className="text-sm font-bold text-white truncate">{st.title}</p>
              <span className="text-[11px] font-mono mt-2 opacity-80">{st.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 2컬럼 레이아웃 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* 좌측: 레이더 관제 맵 & 채팅 */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="bg-[#141210] border border-stone-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 sm:p-5 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-[#110E0C]">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold tracking-widest uppercase font-serif text-white">
                    LIVE TRANSIT & GOOGLE MAPS TELEMETRY
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    센서 정상 작동
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Route: Malate Flagship (Roxas Blvd) → Makati Diamond Residences
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSatelliteView(!isSatelliteView)}
                  className="px-2.5 py-1.5 rounded-lg bg-[#181512] border border-stone-800 text-stone-300 hover:text-[#E5A93C] text-xs transition"
                >
                  {isSatelliteView ? '🗺️ 기본 지도 뷰' : '🌐 위성 뷰'}
                </button>
                <a
                  href="https://maps.google.com/?q=Makati+Diamond+Residences"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#E5A93C] hover:bg-[#ffc665] text-stone-950 text-xs font-bold flex items-center gap-1 shadow transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Google Maps
                </a>
              </div>
            </div>

            <div className="relative h-80 sm:h-96 w-full bg-[#0A0908] overflow-hidden select-none">
              <div 
                className={`absolute inset-0 bg-cover bg-center transition-all duration-500 ${isSatelliteView ? 'opacity-70 filter contrast-125' : 'opacity-25'}`}
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A09] via-transparent to-[#0C0A09]/70 pointer-events-none" />

              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
                <path d="M 160 295 Q 310 240, 480 170 T 800 100" fill="none" stroke="#3D2F1B" strokeWidth="4" strokeLinecap="round" />
                <path d="M 160 295 Q 310 240, 480 170 T 800 100" fill="none" stroke="#E5A93C" strokeWidth="3" strokeDasharray="8,5" className="animate-pulse" />
              </svg>

              <div className="absolute left-[16%] bottom-[26%] -translate-x-1/2 translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#141210] border-2 border-[#E5A93C] flex items-center justify-center shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-ping" />
                </div>
                <div className="mt-1 px-2.5 py-1 rounded bg-black/90 border border-stone-800 text-[10px] font-mono text-center">
                  <span className="text-white font-bold block">Tunamaru Malate 본점</span>
                  <span className="text-[#E5A93C]">14.5739° N, 120.9835° E</span>
                </div>
              </div>

              <div 
                className="absolute z-30 flex flex-col items-center transition-all duration-700"
                style={{
                  left: currentStage === 2 ? '16%' : currentStage === 4 ? '52%' : '80%',
                  top: currentStage === 2 ? '74%' : currentStage === 4 ? '44%' : '25%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-10 h-10 rounded-full bg-[#E5A93C] text-stone-950 flex items-center justify-center font-bold shadow-2xl border-2 border-[#151311]">
                  🏍️
                </div>
                <div className="mt-1 px-2.5 py-0.5 rounded-full bg-black/90 border border-[#E5A93C] text-[10px] font-mono text-[#E5A93C] shadow whitespace-nowrap">
                  Danilo Reyes (EV-04 • 3.4°C 유지)
                </div>
              </div>

              <div className="absolute right-[20%] top-[25%] translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-xl">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="mt-1 px-2.5 py-1 rounded bg-black/90 border border-emerald-500/40 text-[10px] font-mono text-center">
                  <span className="text-emerald-400 font-bold block">Makati Diamond Tower 1</span>
                  <span className="text-stone-400">도착 완료 / 로비 보관</span>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 bg-[#0C0A09]/90 border border-stone-800 rounded px-2.5 py-1 text-[10px] font-mono text-stone-400">
                실시간 텔레메트리: 방금 전 (GPS 수신율 99.8% • 반경 4.8km 직배송)
              </div>
            </div>

            <div className="p-3.5 bg-[#141210] border-t border-stone-800 grid grid-cols-4 gap-2 text-center text-xs">
              <div><span className="text-stone-500 text-[10px] uppercase block">IoT Cold-Chain</span><span className="font-mono font-bold text-cyan-400">3.4°C 항온 유지</span></div>
              <div className="border-l border-stone-800 pl-2"><span className="text-stone-500 text-[10px] uppercase block">배송 전담 크루</span><span className="font-medium text-white truncate block">Danilo Reyes (EV)</span></div>
              <div className="border-l border-stone-800 pl-2"><span className="text-stone-500 text-[10px] uppercase block">남은 이동 거리</span><span className="font-mono text-[#E5A93C] font-bold">{currentStage === 5 ? '0.0 km (완료)' : '4.8 km (약 18분)'}</span></div>
              <div className="border-l border-stone-800 pl-2"><span className="text-stone-500 text-[10px] uppercase block">정밀 GPS 위치</span><span className="font-mono text-emerald-400">± 1.2m 고정</span></div>
            </div>
          </div>

          {/* 라이더 & 목적지 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#141210] border border-stone-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold uppercase tracking-wider text-stone-400">배정 라이더 정보</span>
                  <span className="text-emerald-400 font-mono">● Online</span>
                </div>
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-12 h-12 rounded-full bg-[#201B17] border border-[#E5A93C]/40 flex items-center justify-center text-[#E5A93C] font-bold font-serif text-sm">
                    DR
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-white text-base">다닐로 레예스 (Danilo Reyes)</h4>
                    <p className="text-xs text-stone-400">츠나마루 직영 전담 특송팀 #04 • ★ 4.98 (840건+)</p>
                  </div>
                </div>
                <div className="bg-[#0E0C0B] p-3 rounded-lg border border-stone-800 text-xs space-y-1 font-mono">
                  <div className="flex justify-between"><span className="text-stone-500">디스패치 허브:</span><span className="text-[#E5A93C]">Manila Bay Cold Hub #01 (Malate)</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">배송 차량:</span><span>Climate-Controlled EV Bike (NDL-8821)</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">냉장 보관함:</span><span className="text-cyan-400">Iso-Chill Dry Vault #2</span></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-stone-800 mt-4">
                <a href="tel:+639178821942" className="py-2.5 rounded-lg bg-[#E5A93C] text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition">
                  <Phone className="w-3.5 h-3.5" /> 라이더 직통 전화
                </a>
                <button 
                  onClick={() => {
                    setChatTab('courier');
                    document.getElementById('direct-chat-module')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="py-2.5 rounded-lg bg-[#1D1916] border border-stone-800 text-stone-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  💬 실시간 톡
                </button>
              </div>
            </div>

            <div className="bg-[#141210] border border-stone-800 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-2">배송지 상세 정보</span>
                <h4 className="font-serif font-bold text-white text-base">마카티 다이아몬드 레지던스</h4>
                <p className="text-xs text-stone-400 mt-1">타워 1, 18-B호, 레가스피 빌리지, 마카티 시티, 메트로 마닐라</p>
                <div className="p-3 bg-[#0E0C0B] rounded-lg border border-stone-800 text-xs mt-3 space-y-1">
                  <div className="flex justify-between"><span className="text-stone-500">수령 위치:</span><span className="text-white">Tower 1 로비 컨시어지</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">안심 인계 방식:</span><span className="text-[#E5A93C]">비대면 컨시어지 인계</span></div>
                  <div className="flex justify-between"><span className="text-stone-500">출입 인증:</span><span className="text-emerald-400 font-mono">도어맨 사전 승인 완료</span></div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs mt-4">
                <span className="text-stone-400">매장 직통 컨시어지:</span>
                <a href={`tel:${TUNAMARU_STORE.phoneIntl}`} className="text-[#E5A93C] font-mono font-bold hover:underline">
                  {TUNAMARU_STORE.phone}
                </a>
              </div>
            </div>
          </div>

          {/* 1:1 다이렉트 톡 */}
          <div className="bg-[#141210] border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4" id="direct-chat-module">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h3 className="font-serif text-sm font-bold text-white">Tunamaru VIP 컨시어지 톡 & 라이더 다이렉트 챗</h3>
              </div>

              <div className="flex items-center gap-1.5 bg-[#181512] p-1 rounded-full border border-stone-800">
                <button
                  type="button"
                  onClick={() => setChatTab('chef')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                    chatTab === 'chef' ? 'bg-[#E5A93C] text-stone-950 shadow' : 'text-stone-400'
                  }`}
                >
                  매장 주방 (Chef)
                </button>
                <button
                  type="button"
                  onClick={() => setChatTab('courier')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition ${
                    chatTab === 'courier' ? 'bg-[#E5A93C] text-stone-950 shadow' : 'text-stone-400'
                  }`}
                >
                  배달 라이더 (Danilo)
                </button>
              </div>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-stone-500 mb-1">{msg.sender} • {msg.time}</span>
                  <div
                    className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                      msg.isUser
                        ? 'bg-[#E5A93C] text-stone-950 font-medium'
                        : 'bg-[#181512] border border-stone-800 text-stone-200'
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.isProof && (
                      <div className="mt-2 rounded-lg overflow-hidden border border-emerald-500/40">
                        <img 
                          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80" 
                          alt="Delivery Proof" 
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-1.5 bg-black/80 text-[10px] font-mono text-emerald-400 text-center">
                          ✓ 로비 컨시어지 비대면 인계 사진 인증 완료
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none text-[11px]">
              <span className="text-stone-500 shrink-0">빠른 답장:</span>
              {[
                '문 앞에 두고 벨 눌러주세요',
                '로비 데스크에 맡겨주세요',
                '도착 시 전화 주세요',
              ].map((txt) => (
                <button
                  key={txt}
                  type="button"
                  onClick={() => setChatInput(txt)}
                  className="px-2.5 py-1 rounded-full bg-[#181512] hover:bg-stone-800 text-stone-300 border border-stone-800 shrink-0 transition"
                >
                  {txt}
                </button>
              ))}
            </div>

            <form onSubmit={handleSendChat} className="flex gap-2 pt-2 border-t border-stone-800">
              <input
                type="text"
                placeholder="메시지를 입력하세요 (예: 도착 전 미리 연락주세요)..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-[#100E0C] border border-stone-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#E5A93C]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#E5A93C] hover:bg-[#ffc665] text-stone-950 font-bold text-xs flex items-center gap-1 transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>전송</span>
              </button>
            </form>
          </div>
        </section>

        {/* 우측: 주문 명세서 & 재주문 버튼 */}
        <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
          <div className="bg-[#141210] border border-stone-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-stone-800 pb-3">
              <div>
                <h2 className="text-xs font-bold tracking-widest uppercase font-serif text-[#E5A93C]">
                  주문 명세서 (ITEMIZED BILL)
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">2026년 10월 30일 • 오후 7:18</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded uppercase font-bold">
                결제 완료
              </span>
            </div>

            <div className="space-y-3 border-b border-stone-800 pb-4 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-white">1x 연어 사시미 (Salmon Sashimi)</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">+ 생와사비 (무료) • + 시소 잎 3장 (+₱30)</p>
                </div>
                <span className="font-mono font-bold text-white">₱430.00</span>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-white">1x 아부리 연어 롤 (Aburi Salmon Roll)</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">+ 특제 스파이시 마요 딥 (+₱25)</p>
                </div>
                <span className="font-mono font-bold text-white">₱375.00</span>
              </div>

              <div className="flex justify-between items-center bg-[#E5A93C]/10 border border-[#E5A93C]/30 p-2 rounded-lg text-emerald-400">
                <span className="font-bold flex items-center gap-1">🎁 [프로모션 증정] {selectedGift.name}</span>
                <span className="font-mono font-bold">FREE (₱0.00)</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-400"><span>주문 상품 소계</span><span className="font-mono text-white">₱805.00</span></div>
              <div className="flex justify-between text-stone-400"><span>극저온 크라이오 단열 패킹</span><span className="font-mono text-emerald-400 font-semibold">FREE (₱0.00)</span></div>
              <div className="flex justify-between text-stone-400"><span>전담 항온 배송료 (Makati)</span><span className="font-mono text-white">₱50.00</span></div>
              <div className="flex justify-between text-emerald-400 font-bold"><span>Tara Pay 다이닝 할인권</span><span className="font-mono">-₱100.00</span></div>
              <div className="pt-2 border-t border-stone-800 flex justify-between items-baseline">
                <span className="font-serif font-bold text-sm text-white">최종 결제 금액</span>
                <span className="text-xl font-mono font-black text-[#E5A93C]">₱755.00 PHP</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#100E0C] border border-[#2F2923] flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Tara Pay 승인 완료
                </p>
                <p className="text-[10px] text-stone-500 font-mono mt-0.5">TXN: #TP-20261030-99482-PH</p>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono text-[10px] font-bold">
                즉시 정산됨
              </span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => setIsReorderDrawerOpen(true)}
                className="w-full py-3 rounded-xl bg-[#E5A93C] hover:bg-[#ffc665] text-stone-950 font-black text-xs sm:text-sm shadow-lg transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <span>🍣 동일 메뉴 1초 재주문 (Re-order)</span>
              </button>

              <button
                type="button"
                onClick={() => alert('BIR 정식 전자 세금 전표 #TP-99482 다운로드가 시작되었습니다.')}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>BIR 공식 전자영수증 다운로드</span>
              </button>

              <button
                type="button"
                onClick={() => setIsHistoryModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 text-xs font-semibold transition"
              >
                전체 주문 내역 (Order History) 보기
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* 도착 3분 전 안내 팝업 */}
      {isNearArrivalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#151311] border-2 border-[#E5A93C] rounded-2xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
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

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  showToast('라이더에게 전화 요청이 전달되었습니다.', '📞');
                  setIsNearArrivalModalOpen(false);
                }}
                className="py-2.5 rounded-xl bg-[#1C1814] border border-[#E5A93C] text-xs font-bold text-[#E5A93C]"
              >
                📞 도착 즉시 전화 요청
              </button>
              <button
                onClick={() => {
                  showToast('로비 비대면 보관 요청이 라이더에게 전송되었습니다.', '📦');
                  setIsNearArrivalModalOpen(false);
                }}
                className="py-2.5 rounded-xl bg-[#1C1814] border border-stone-700 text-xs font-bold text-stone-300"
              >
                📦 로비에 맡겨주세요
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5단계 완료 모달 */}
      {isDeliveryCompletedModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
          <div className="relative w-full max-w-lg bg-[#151311] border-2 border-emerald-400 rounded-2xl shadow-2xl p-6 text-center space-y-4 z-20 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-3xl mx-auto shadow-lg">
              🎺
            </div>
            <h3 className="text-xl font-serif font-bold text-white">미식의 정점, 고객님께 전달 완료!</h3>
            <p className="text-xs text-stone-300">
              마카티 다이아몬드 레지던스 컨시어지 안전 인계가 완벽히 완료되었습니다.
            </p>

            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-[#1A1714] to-emerald-950/20 border border-[#E5A93C]/40 text-left space-y-1">
              <span className="font-bold text-[#E5A93C] text-xs block">VIP 다이닝 감사 포인트 +150P 적립 완료</span>
              <p className="text-[11px] text-stone-400">최상의 선도를 지킨 오마카세 츠나마루를 찾아주셔서 감사드립니다.</p>
            </div>

            <button
              onClick={() => setIsDeliveryCompletedModalOpen(false)}
              className="w-full py-3 rounded-xl bg-[#E5A93C] hover:bg-[#ffc665] text-stone-950 font-bold text-xs shadow-lg transition"
            >
              ✓ 확인 및 맛있게 식사하기
            </button>
          </div>
        </div>
      )}

      {/* 재주문 드로어 */}
      {isReorderDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-[#1D1B19] border-l border-stone-800 h-full flex flex-col justify-between p-6 overflow-y-auto animate-in slide-in-from-right">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#E5A93C]" />
                  <h3 className="font-serif font-bold text-white text-base">장바구니 (Re-order Cart)</h3>
                </div>
                <button onClick={() => setIsReorderDrawerOpen(false)} className="text-stone-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-[#E5A93C]/15 border border-[#E5A93C] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-lg">🎁</span>
                  <div>
                    <span className="font-bold text-[#E5A93C] block">무료 음료 증정 프로모션</span>
                    <span className="text-[10px] text-stone-300">{selectedGift.name} 적용됨</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsGiftModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-[#E5A93C] text-stone-950 text-[10px] font-bold"
                >
                  음료 변경
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="p-3 bg-[#151311] border border-stone-800 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">Salmon Sashimi (1x)</p>
                    <span className="text-[#E5A93C] font-mono">₱430.00</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">Qty 1</span>
                </div>
                <div className="p-3 bg-[#151311] border border-stone-800 rounded-xl flex justify-between items-center">
                  <div>
                    <p className="font-bold text-white">Aburi Salmon Roll (1x)</p>
                    <span className="text-[#E5A93C] font-mono">₱375.00</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-400 font-mono">Qty 1</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-800 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-stone-400">총 결제 금액</span>
                <span className="text-xl font-mono font-bold text-[#E5A93C]">₱755.00 PHP</span>
              </div>
              <button
                onClick={() => {
                  setIsReorderDrawerOpen(false);
                  setIsPaymentModalOpen(true);
                }}
                className="w-full py-3.5 bg-[#E5A93C] hover:bg-[#ffc665] text-stone-950 font-bold rounded-xl text-xs transition"
              >
                Tara Pay로 즉시 결제하기 (₱755.00) →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 음료 선택 모달 */}
      {isGiftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="w-full max-w-sm bg-[#1D1B19] border border-[#E5A93C] rounded-2xl p-5 space-y-3">
            <h4 className="font-bold text-white text-sm">무료 증정 음료 선택</h4>
            <div className="space-y-2">
              {[
                { name: '콜라 / Coke (330ml)', icon: '🥤' },
                { name: '스프라이트 / Sprite (330ml)', icon: '🍋' },
                { name: '생수 / Mineral Water (330ml)', icon: '💧' },
              ].map((g) => (
                <button
                  key={g.name}
                  onClick={() => {
                    setSelectedGift(g);
                    setIsGiftModalOpen(false);
                    showToast(`증정 음료가 '${g.name}'(으)로 변경되었습니다.`, '🎁');
                  }}
                  className="w-full p-3 rounded-xl border border-stone-800 bg-[#151311] hover:border-[#E5A93C] flex items-center gap-3 text-xs text-white transition"
                >
                  <span className="text-xl">{g.icon}</span>
                  <span className="font-bold">{g.name}</span>
                  <span className="ml-auto font-mono text-emerald-400 font-bold">FREE (₱0)</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 결제 모달 */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#1D1B19] border border-[#E5A93C] rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-stone-800">
              <h4 className="font-serif font-bold text-white text-sm">Tara Pay 간편 결제 센터</h4>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#151311] border border-stone-800 space-y-2 text-xs">
              <div className="flex justify-between text-stone-400"><span>현재 보유 지갑 잔액</span><span className="font-mono text-white">₱2,450.00</span></div>
              <div className="flex justify-between text-rose-400"><span>주문 결제 차감액</span><span className="font-mono font-bold">-₱755.00</span></div>
              <div className="pt-2 border-t border-stone-800 flex justify-between text-sm font-bold text-[#E5A93C]">
                <span>결제 후 예상 잔액</span>
                <span className="font-mono">₱{walletBalance.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 bg-[#E5A93C]/10 border border-[#E5A93C]/40 rounded-xl text-xs text-[#E5A93C] flex items-center gap-2">
              <span>🪙</span>
              <span><strong>+22.65P</strong> (3% VIP 캐시백) 즉시 적립 예정</span>
            </div>

            <button
              onClick={() => {
                setIsPaymentModalOpen(false);
                playChime('arrival');
                showToast('Tara Wallet 결제 완료! ₱755.00 차감 및 +22.65P 적립 완료!', '🎉');
              }}
              className="w-full py-3.5 bg-[#E5A93C] hover:bg-[#ffc665] text-stone-950 font-bold text-xs rounded-xl shadow-lg transition"
            >
              ₱755.00 원클릭 승인하기
            </button>
          </div>
        </div>
      )}

      {/* 주문 내역 모달 */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#1D1B19] border border-stone-800 rounded-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-stone-800">
              <h3 className="font-serif font-bold text-white text-base">주문 내역 (Order History)</h3>
              <button onClick={() => setIsHistoryModalOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-[#151311] border border-emerald-500/40 space-y-2">
                <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                  <span className="text-emerald-400 font-bold">5단계: 배송 완료 (오늘)</span>
                  <span className="font-mono text-[#E5A93C] font-bold">₱755.00</span>
                </div>
                <p className="text-stone-300">• Salmon Sashimi x1 • Aburi Salmon Roll x1 • 무료 콜라 330ml x1</p>
                <p className="text-stone-500 font-mono">배송지: Makati Diamond Residences Tower 1 (Mr. Santos 인계)</p>
              </div>

              <div className="p-4 rounded-xl bg-[#151311] border border-stone-800 space-y-2 opacity-75">
                <div className="flex justify-between items-center border-b border-stone-800 pb-2">
                  <span className="text-stone-400">배송 완료 (10월 24일)</span>
                  <span className="font-mono text-stone-300 font-bold">₱1,120.00</span>
                </div>
                <p className="text-stone-400">• 특선 모둠 사시미 9종 (Tokusen Moriawase) x1</p>
              </div>
            </div>

            <button
              onClick={() => setIsHistoryModalOpen(false)}
              className="w-full py-2.5 bg-stone-900 border border-stone-800 text-stone-300 hover:text-white rounded-xl text-xs font-bold"
            >
              닫기
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
