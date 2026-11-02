'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// 스티치 원본 20여 종 메뉴 데이터베이스 및 이미지 완전 연동
interface DishItem {
  id: string;
  name: string;
  subName: string;
  category: string;
  price: number;
  tag?: string;
  tagColor?: string;
  desc: string;
  img: string;
  isPlaceholder?: boolean;
}

const STITCH_DISHES: DishItem[] = [
  {
    id: 'uni-don',
    name: 'UNI DON (S)',
    subName: '우니동(소)',
    category: 'new',
    price: 320,
    tag: '✨ NEW DISH',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '신선한 성게알과 감태, 날치알이 어우러진 최고급 미니 우니 덮밥',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMUEv9RqbDkEnwHkErGalIwRwOSiTXZ0j-cpKDIqVrLTnTx27x3PngXoPkglKYQ56jQT05ORC9LYTgZ8Xg3RZSs_NLlhtBoYF3L0pdqWhDSOdMXzZ6xIRCaNFEuHzHb60R-tCD9znzKSGMivQlvLgSgd-D_XtWV3RizI4kLTuzOPLC6RUbIg3HlfasH5y0bARv8CpG7E9d3RFjabihNyDcOr4MKNFyEvPFM-tnB8G9kR1t4miS7Hfvtw',
    isPlaceholder: true,
  },
  {
    id: 'gunkan-sushi',
    name: 'GUNKAN SUSHI (4PCS)',
    subName: '군함초밥',
    category: 'new',
    price: 400,
    tag: '✨ NEW',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '날치알, 다진 참치, 타코와사비 등 별미 토핑이 가득 올라간 군함 4종',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvmTTtsvkr6ti-D3ZM8VwRiEyNr5_dogwmPe6ZjCmPtV6h9SmqPbtO5bS-qYXjA9KEPK4ZHk_KxUaHQBY-v5MuApB-lHyRKN_SvJJvJIONOt4tNx6WyDEy_8QtfzFtgZ2YXryAhyksUvOF0FJWiYXb2R3MAq3Ylp4RotXWTnDiIF6Ua6PkolaNC5YYfIiYIy0uOkcI7jWVuEOM_7Y9qC5bzK6HL80-FSo1NDffjv3r',
  },
  {
    id: 'salmon-poke',
    name: 'SALMON POKE',
    subName: '살몬 포케',
    category: 'new',
    price: 350,
    tag: '인기 포케',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '신선한 노르웨이 생연어 큐브와 아보카도, 신선 채소, 특제 오리엔탈 드레싱',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCPlK-g48YEQT31nfLZd0s5samqlESelM9c2oGaxYb3H71i6sXjcdULlU12ArHFj7-6L5OPckjPoRHN9ch6isfq6UfVpqY_YQe9v0wgLGOM3aLgc5VN4Y-o-w3gX5Mr8xEX3wiXAWt_htTpY7_EE5z-vSjh832ptGcltPbkezgUPwo9ZmkaopOYL8pFPB2uYfcmoSXsRsIye5LQvUtW0vVFNXl2CkoUjCRKkXj9zV',
  },
  {
    id: 'spicy-salmon-poke',
    name: 'SPICY SALMON POKE',
    subName: '매콤 살몬 포케',
    category: 'new',
    price: 350,
    tag: '매콤 추천',
    tagColor: 'bg-[#C5221F] text-white',
    desc: '감칠맛 넘치는 특제 스파이시 소스에 버무린 생연어 포케 볼',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCPlK-g48YEQT31nfLZd0s5samqlESelM9c2oGaxYb3H71i6sXjcdULlU12ArHFj7-6L5OPckjPoRHN9ch6isfq6UfVpqY_YQe9v0wgLGOM3aLgc5VN4Y-o-w3gX5Mr8xEX3wiXAWt_htTpY7_EE5z-vSjh832ptGcltPbkezgUPwo9ZmkaopOYL8pFPB2uYfcmoSXsRsIye5LQvUtW0vVFNXl2CkoUjCRKkXj9zV',
  },
  {
    id: 'sweet-shrimp-sashimi',
    name: 'SWEET SHRIMP',
    subName: '딱새우회',
    category: 'sashimi',
    price: 1400,
    tag: '👑 스페셜',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '달큰하고 쫀득한 신선 딱새우를 먹기 편하게 당일 손질한 시그니처 사시미',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7UwSyWRlUIiyxRl-nPwZXPiJgNc2ZfcSEGM-YAr6Ql91ac_HIBiOGI8zS7G4382MeVIKqoB41r-i1WdEGMp6vWyedn9bgRlPTFt7JfHrwzAmk5OrsVwGEVBloRm97906sPzQJq1N5tPIq_wobaYXWqhxK2Mx0b4go6PN6nNHf95ZlWoF-dAl8FAfMNbO09Dv2-tm4VyFgT9BG4AGW3ml5AwVbw1TwDpXXw2QS8fqi',
  },
  {
    id: 'seafood-crispy-soup',
    name: 'SEAFOOD CRISPY RICE SOUP',
    subName: '해물 누룽지탕',
    category: 'noodle-soup',
    price: 800,
    tag: 'Tunamaru Cuisine',
    tagColor: 'bg-[#181412]/90 text-[#F2BE42] border border-[#F2BE42]/30',
    desc: '바삭한 찹쌀 누룽지와 푸짐한 해산물이 뜨거운 육수에 어우러진 일품 탕요리',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMUEv9RqbDkEnwHkErGalIwRwOSiTXZ0j-cpKDIqVrLTnTx27x3PngXoPkglKYQ56jQT05ORC9LYTgZ8Xg3RZSs_NLlhtBoYF3L0pdqWhDSOdMXzZ6xIRCaNFEuHzHb60R-tCD9znzKSGMivQlvLgSgd-D_XtWV3RizI4kLTuzOPLC6RUbIg3HlfasH5y0bARv8CpG7E9d3RFjabihNyDcOr4MKNFyEvPFM-tnB8G9kR1t4miS7Hfvtw',
    isPlaceholder: true,
  },
  {
    id: 'day-of-sashimi',
    name: 'DAY OF SASHIMI',
    subName: '오늘의 모둠 사시미',
    category: 'sashimi',
    price: 3900,
    tag: '👑 시그니처',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '참다랑어 오도로, 메카도로, 연어, 광어 등 당일 최고급 부위 모둠 (3~4인)',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7UwSyWRlUIiyxRl-nPwZXPiJgNc2ZfcSEGM-YAr6Ql91ac_HIBiOGI8zS7G4382MeVIKqoB41r-i1WdEGMp6vWyedn9bgRlPTFt7JfHrwzAmk5OrsVwGEVBloRm97906sPzQJq1N5tPIq_wobaYXWqhxK2Mx0b4go6PN6nNHf95ZlWoF-dAl8FAfMNbO09Dv2-tm4VyFgT9BG4AGW3ml5AwVbw1TwDpXXw2QS8fqi',
  },
  {
    id: 'otoro-premium-s',
    name: 'OTORO PREMIUM (S)',
    subName: '참다랑어 프리미엄(소)',
    category: 'sashimi',
    price: 2800,
    tag: '👑 최고급 참치',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '도쿄 직송 최상급 참다랑어 오도로의 마블링과 깊은 풍미 (대: ₱5,500 선택가능)',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoFUA9q9MoRcBbPqsrYGCrTRvgexnPhB4KCZrcs2j7ydIbxfd01PxEZc9T7TjOAIfhMUtyfTC-bmSgG4iXSO7tZwzTig6rL1DhVjeldR7HQFx43QWBKJwkplT0BayeMLa2FWs75wVplrRV3Q9s0qEo-1G01hz7egDGJACG4AlUOVsfAwIBVJQ80Gi_uQyQ9M3zcf6ivG9dPELQ8BgxVuIkKL97XUkkwEYVQKU_R4EF',
  },
  {
    id: 'mini-sashimi',
    name: 'MINI SASHIMI',
    subName: '미니 사시미',
    category: 'sashimi',
    price: 500,
    tag: '인기 혼술',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '혼자서도 부담없이 즐기는 츠나마루 당일 특선 미니 모둠 사시미',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7UwSyWRlUIiyxRl-nPwZXPiJgNc2ZfcSEGM-YAr6Ql91ac_HIBiOGI8zS7G4382MeVIKqoB41r-i1WdEGMp6vWyedn9bgRlPTFt7JfHrwzAmk5OrsVwGEVBloRm97906sPzQJq1N5tPIq_wobaYXWqhxK2Mx0b4go6PN6nNHf95ZlWoF-dAl8FAfMNbO09Dv2-tm4VyFgT9BG4AGW3ml5AwVbw1TwDpXXw2QS8fqi',
  },
  {
    id: 'salmon-sashimi',
    name: 'SALMON SASHIMI',
    subName: '연어 사시미',
    category: 'sashimi',
    price: 430,
    tag: '👑 베스트셀러',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '두툼하게 썬 노르웨이 생연어와 생와사비, 시소잎',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCPlK-g48YEQT31nfLZd0s5samqlESelM9c2oGaxYb3H71i6sXjcdULlU12ArHFj7-6L5OPckjPoRHN9ch6isfq6UfVpqY_YQe9v0wgLGOM3aLgc5VN4Y-o-w3gX5Mr8xEX3wiXAWt_htTpY7_EE5z-vSjh832ptGcltPbkezgUPwo9ZmkaopOYL8pFPB2uYfcmoSXsRsIye5LQvUtW0vVFNXl2CkoUjCRKkXj9zV',
  },
  {
    id: 'day-of-sushi',
    name: 'DAY OF SUSHI (10PCS)',
    subName: '오늘의 모둠 초밥',
    category: 'sushi',
    price: 420,
    tag: '👑 추천 초밥',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '참치, 연어, 새우, 타마고 등 셰프의 엄선 10피스 모둠 스시',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvmTTtsvkr6ti-D3ZM8VwRiEyNr5_dogwmPe6ZjCmPtV6h9SmqPbtO5bS-qYXjA9KEPK4ZHk_KxUaHQBY-v5MuApB-lHyRKN_SvJJvJIONOt4tNx6WyDEy_8QtfzFtgZ2YXryAhyksUvOF0FJWiYXb2R3MAq3Ylp4RotXWTnDiIF6Ua6PkolaNC5YYfIiYIy0uOkcI7jWVuEOM_7Y9qC5bzK6HL80-FSo1NDffjv3r',
  },
  {
    id: 'premium-sushi',
    name: 'PREMIUM SUSHI (10PCS)',
    subName: '프리미엄 모둠 초밥',
    category: 'sushi',
    price: 520,
    tag: '👑 프리미엄',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '참다랑어 주도로, 성게알(우니), 장어, 전복, 연어알 등 프리미엄 10종',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvmTTtsvkr6ti-D3ZM8VwRiEyNr5_dogwmPe6ZjCmPtV6h9SmqPbtO5bS-qYXjA9KEPK4ZHk_KxUaHQBY-v5MuApB-lHyRKN_SvJJvJIONOt4tNx6WyDEy_8QtfzFtgZ2YXryAhyksUvOF0FJWiYXb2R3MAq3Ylp4RotXWTnDiIF6Ua6PkolaNC5YYfIiYIy0uOkcI7jWVuEOM_7Y9qC5bzK6HL80-FSo1NDffjv3r',
  },
  {
    id: 'volcano-roll',
    name: 'VOLCANO ROLL',
    subName: '볼케이노 롤',
    category: 'roll',
    price: 480,
    tag: '👑 롤 인기 1위',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '구운 해산물과 매콤 달콤한 특제 용암 소스가 화려하게 얹힌 시그니처 롤',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc9swHaSwSOwMZStSfMPbHdZ_l5XQLDhKr5G5i3DzCD_AtiPejczsCRD2mTVVwbnn7gpCACBFdDhPc8pyl8PEkwU7PvQ4GOLT0Pc6ShRA_FQsat8HpYnWS7QE95P3zXpesMaXTFLcF4vK_Xu_jd7vFab9ZTw9o_tiTpJ5ZrgRJfFVt16lRrJrvJm23-pV2n32t7Ouik6ElG6YCCYe2akSkoGSwBB7ki82EIXqwJ0TA',
  },
  {
    id: 'hutomaki',
    name: 'HUTOMAKI',
    subName: '후토마끼',
    category: 'roll',
    price: 780,
    tag: '👑 대왕 롤',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '참치, 연어, 타마고, 새우튀김, 아보카도를 한가득 말아낸 일본 정통 대왕마끼',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc9swHaSwSOwMZStSfMPbHdZ_l5XQLDhKr5G5i3DzCD_AtiPejczsCRD2mTVVwbnn7gpCACBFdDhPc8pyl8PEkwU7PvQ4GOLT0Pc6ShRA_FQsat8HpYnWS7QE95P3zXpesMaXTFLcF4vK_Xu_jd7vFab9ZTw9o_tiTpJ5ZrgRJfFVt16lRrJrvJm23-pV2n32t7Ouik6ElG6YCCYe2akSkoGSwBB7ki82EIXqwJ0TA',
  },
  {
    id: 'gyu-don',
    name: 'GYU DON',
    subName: '소고기 덮밥',
    category: 'don',
    price: 450,
    tag: '👑 인기 덮밥',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '특제 타레 소스에 부드럽게 조려낸 소고기와 양파가 듬뿍 올라간 정통 규동',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMUEv9RqbDkEnwHkErGalIwRwOSiTXZ0j-cpKDIqVrLTnTx27x3PngXoPkglKYQ56jQT05ORC9LYTgZ8Xg3RZSs_NLlhtBoYF3L0pdqWhDSOdMXzZ6xIRCaNFEuHzHb60R-tCD9znzKSGMivQlvLgSgd-D_XtWV3RizI4kLTuzOPLC6RUbIg3HlfasH5y0bARv8CpG7E9d3RFjabihNyDcOr4MKNFyEvPFM-tnB8G9kR1t4miS7Hfvtw',
    isPlaceholder: true,
  },
  {
    id: 'katsu-don',
    name: 'KATSU DON',
    subName: '돈까스 덮밥',
    category: 'don',
    price: 420,
    tag: '👑 인기 가츠동',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '바삭하게 튀긴 수제 돈카츠 위에 특제 쯔유와 달걀을 부드럽게 얹은 가츠동',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMUEv9RqbDkEnwHkErGalIwRwOSiTXZ0j-cpKDIqVrLTnTx27x3PngXoPkglKYQ56jQT05ORC9LYTgZ8Xg3RZSs_NLlhtBoYF3L0pdqWhDSOdMXzZ6xIRCaNFEuHzHb60R-tCD9znzKSGMivQlvLgSgd-D_XtWV3RizI4kLTuzOPLC6RUbIg3HlfasH5y0bARv8CpG7E9d3RFjabihNyDcOr4MKNFyEvPFM-tnB8G9kR1t4miS7Hfvtw',
    isPlaceholder: true,
  },
  {
    id: 'nagasaki-ramen',
    name: 'NAGASAKI RAMEN',
    subName: '나가사끼 라멘',
    category: 'noodle-soup',
    price: 400,
    tag: '인기 국물',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '깊고 진한 사골육수에 불맛 입힌 푸짐한 해산물과 야채가 들어간 나가사끼 짬뽕',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMUEv9RqbDkEnwHkErGalIwRwOSiTXZ0j-cpKDIqVrLTnTx27x3PngXoPkglKYQ56jQT05ORC9LYTgZ8Xg3RZSs_NLlhtBoYF3L0pdqWhDSOdMXzZ6xIRCaNFEuHzHb60R-tCD9znzKSGMivQlvLgSgd-D_XtWV3RizI4kLTuzOPLC6RUbIg3HlfasH5y0bARv8CpG7E9d3RFjabihNyDcOr4MKNFyEvPFM-tnB8G9kR1t4miS7Hfvtw',
    isPlaceholder: true,
  },
  {
    id: 'mulhoe',
    name: 'MULHOE',
    subName: '물회',
    category: 'noodle-soup',
    price: 1800,
    tag: '👑 별미 추천',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '살얼음 동동 띄운 매콤새콤 특제 육수와 싱싱한 활어회가 듬뿍 들어간 시원한 물회',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7UwSyWRlUIiyxRl-nPwZXPiJgNc2ZfcSEGM-YAr6Ql91ac_HIBiOGI8zS7G4382MeVIKqoB41r-i1WdEGMp6vWyedn9bgRlPTFt7JfHrwzAmk5OrsVwGEVBloRm97906sPzQJq1N5tPIq_wobaYXWqhxK2Mx0b4go6PN6nNHf95ZlWoF-dAl8FAfMNbO09Dv2-tm4VyFgT9BG4AGW3ml5AwVbw1TwDpXXw2QS8fqi',
  },
  {
    id: 'grilled-mero',
    name: 'GRILLED MERO',
    subName: '메로 구이',
    category: 'grilled',
    price: 1600,
    tag: '👑 최고급 구이',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '기름지고 고소한 메로 살을 달콤 짭조름한 특제 타레 소스에 노릇하게 구워낸 최고급 구이',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMUEv9RqbDkEnwHkErGalIwRwOSiTXZ0j-cpKDIqVrLTnTx27x3PngXoPkglKYQ56jQT05ORC9LYTgZ8Xg3RZSs_NLlhtBoYF3L0pdqWhDSOdMXzZ6xIRCaNFEuHzHb60R-tCD9znzKSGMivQlvLgSgd-D_XtWV3RizI4kLTuzOPLC6RUbIg3HlfasH5y0bARv8CpG7E9d3RFjabihNyDcOr4MKNFyEvPFM-tnB8G9kR1t4miS7Hfvtw',
    isPlaceholder: true,
  },
  {
    id: 'hwayo-25',
    name: 'HWAYO 25',
    subName: '화요 25',
    category: 'drinks',
    price: 900,
    tag: '프리미엄 증류주',
    tagColor: 'bg-[#F2BE42] text-stone-950',
    desc: '깊고 깨끗한 풍미를 자랑하는 한국 전통 프리미엄 증류식 소주',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMUEv9RqbDkEnwHkErGalIwRwOSiTXZ0j-cpKDIqVrLTnTx27x3PngXoPkglKYQ56jQT05ORC9LYTgZ8Xg3RZSs_NLlhtBoYF3L0pdqWhDSOdMXzZ6xIRCaNFEuHzHb60R-tCD9znzKSGMivQlvLgSgd-D_XtWV3RizI4kLTuzOPLC6RUbIg3HlfasH5y0bARv8CpG7E9d3RFjabihNyDcOr4MKNFyEvPFM-tnB8G9kR1t4miS7Hfvtw',
    isPlaceholder: true,
  },
];

export default function StitchPureMasterPage() {
  // 스티치 핵심 상태 관리
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [orderMode, setOrderMode] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('Makati Diamond Residences, Legazpi Village');
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true); // 스티치 원본 화면처럼 드로어 상시 노출
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState<boolean>(false);
  const [isTaraPayModalOpen, setIsTaraPayModalOpen] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);

  // 스티치 원본 초기 장바구니 2종 (연어 사시미 + 아부리 연어 롤)
  const [cart, setCart] = useState([
    {
      id: 'dish-salmon-sashimi',
      name: '연어 사시미 (Salmon Sashimi)',
      unitPrice: 430,
      qty: 1,
      option: '생와사비 추가, 시소 잎 (3 pcs)',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdCPlK-g48YEQT31nfLZd0s5samqlESelM9c2oGaxYb3H71i6sXjcdULlU12ArHFj7-6L5OPckjPoRHN9ch6isfq6UfVpqY_YQe9v0wgLGOM3aLgc5VN4Y-o-w3gX5Mr8xEX3wiXAWt_htTpY7_EE5z-vSjh832ptGcltPbkezgUPwo9ZmkaopOYL8pFPB2uYfcmoSXsRsIye5LQvUtW0vVFNXl2CkoUjCRKkXj9zV',
    },
    {
      id: 'dish-aburi-salmon',
      name: '아부리 연어 롤 (Aburi Salmon Roll)',
      unitPrice: 375,
      qty: 1,
      option: '8pcs 직화 토치 연어, 스파이시 마요, 토비코',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc9swHaSwSOwMZStSfMPbHdZ_l5XQLDhKr5G5i3DzCD_AtiPejczsCRD2mTVVwbnn7gpCACBFdDhPc8pyl8PEkwU7PvQ4GOLT0Pc6ShRA_FQsat8HpYnWS7QE95P3zXpesMaXTFLcF4vK_Xu_jd7vFab9ZTw9o_tiTpJ5ZrgRJfFVt16lRrJrvJm23-pV2n32t7Ouik6ElG6YCCYe2akSkoGSwBB7ki82EIXqwJ0TA',
    },
  ]);

  const [toastText, setToastText] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastText(msg);
    setTimeout(() => setToastText(null), 2500);
  };

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const deliveryFee = totalCount > 0 && orderMode === 'delivery' ? 50 : 0;
  const couponDiscount = totalCount > 0 ? 100 : 0;
  const totalAmount = Math.max(0, subtotal + deliveryFee - couponDiscount);

  const adjustQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as typeof cart
    );
  };

  const filteredDishes = STITCH_DISHES.filter((d) => {
    const matchesCategory = selectedCategory === 'all' || d.category === selectedCategory;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.subName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-200 antialiased selection:bg-[#F2BE42] selection:text-black flex flex-col font-sans">
      
      {/* 토스트 알림창 */}
      {toastText && (
        <div className="fixed top-24 right-4 z-50 bg-[#161311] border border-[#F2BE42]/60 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-200">
          <span className="w-6 h-6 rounded-full bg-[#F2BE42] text-stone-950 flex items-center justify-center text-xs font-bold">
            ✓
          </span>
          <span className="text-xs font-medium">{toastText}</span>
        </div>
      )}

      {/* 스티치 원본 메인 헤더 */}
      <header className="sticky top-0 z-40 bg-[#0C0A09]/90 backdrop-blur-md border-b border-[#28231E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link className="flex items-center gap-3.5 group" href="/">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#F2BE42]/40 p-0.5 bg-black/75 shadow-inner group-hover:scale-105 transition-transform duration-300 flex-shrink-0 flex items-center justify-center">
              <span className="font-serif font-black text-[#F2BE42] text-sm">綱</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-serif tracking-[0.2em] font-extrabold text-[#F7F4EF] uppercase">
                Tunamaru
              </span>
              <span className="text-[10px] sm:text-[11px] font-serif tracking-wider text-[#F2BE42] font-medium">
                綱 TUNAMARU • Authentic Japanese Restaurant
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <div className="relative group">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-300 hover:text-white bg-[#161311] hover:bg-stone-800 rounded-full border border-stone-800 transition"
              >
                <span className="text-[#F2BE42] text-xs">🌐</span>
                <span>한국어 (KR)</span>
              </button>
            </div>

            <Link
              href="/order/JF-20261030-99482"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-stone-300 hover:text-white hover:bg-stone-800/80 rounded-full border border-stone-800 transition"
            >
              <span>주문 조회</span>
            </Link>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              type="button"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold text-stone-200 hover:text-white bg-[#161311] hover:bg-stone-800 border border-[#F2BE42]/40 hover:border-[#F2BE42] rounded-full transition shadow-sm"
            >
              <span>로그인 / 회원가입</span>
              <span className="hidden sm:inline-flex text-[10px] font-bold text-[#F2BE42] bg-[#F2BE42]/10 px-1.5 py-0.5 rounded-full border border-[#F2BE42]/30">
                +₱100 쿠폰
              </span>
            </button>

            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              type="button"
              className="relative flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-stone-900 bg-[#F2BE42] hover:bg-[#e0ad32] rounded-full shadow-[0_0_20px_rgba(242,190,66,0.35)] transition transform active:scale-95"
            >
              <span>장바구니</span>
              <span className="inline-flex items-center justify-center bg-stone-900 text-[#F2BE42] text-[10px] font-bold w-5 h-5 rounded-full border border-stone-900 ml-0.5">
                {totalCount}
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* 영웅 배너 및 검색창 */}
      <section className="relative pt-6 pb-2 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#28231E] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F2BE42] mb-1 font-semibold">
              <span>綱割烹</span>
              <span>•</span>
              <span>Official Digital Ordering</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              온라인 주문 <span className="text-xl sm:text-2xl md:text-3xl font-light text-stone-400 font-sans ml-1">Order Online</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#A0988F] mt-1 max-w-xl">
              도쿄 도요스 시장 직송 최고급 참치와 당일 손질한 신선한 사시미, 장인의 시그니처 롤과 이자카야 요리를 신속하게 배달 및 포장해 드립니다.
            </p>
          </div>

          <div className="w-full md:w-80 lg:w-96 relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="메뉴 또는 요리명 검색 (예: 연어, 참치, 롤)..."
              className="w-full bg-[#161311] border border-[#28231E] hover:border-[#F2BE42]/40 text-stone-100 placeholder-stone-500 text-sm rounded-full pl-5 pr-10 py-2.5 focus:outline-none focus:border-[#F2BE42] focus:ring-1 focus:ring-[#F2BE42] transition shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* 말라테 본점 디스패치 콜드체인 정보 바 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-1 w-full">
        <div className="bg-gradient-to-r from-[#171412] via-[#14110F] to-[#171412] border border-[#F2BE42]/30 rounded-xl px-4 sm:px-5 py-2.5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F2BE42]/15 text-[#F2BE42] border border-[#F2BE42]/40 flex items-center justify-center flex-shrink-0">
              🛡️
            </div>
            <div className="flex flex-wrap items-baseline gap-2 leading-snug">
              <span className="font-bold text-stone-100 tracking-wide">Tunamaru Flagship Kitchen (Malate, Manila)</span>
              <span className="text-[#F2BE42]/60 hidden sm:inline">•</span>
              <span className="text-stone-300 flex items-center gap-1.5">
                📍 신선 냉장 직배송 (콜드체인) 반경 6.0km 커버 (Manila, Pasay, Makati)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 self-end md:self-auto flex-shrink-0">
            <a
              href="tel:+639150990442"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2BE42]/10 hover:bg-[#F2BE42]/20 border border-[#F2BE42]/40 text-[#F2BE42] text-[11px] font-bold transition shadow-sm"
            >
              📞 Hotline: 0915 099 0442
            </a>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900 border border-stone-800 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Cold Chain Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* 배달 / 픽업 모드 스위처 바 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 w-full">
        <div className="bg-[#161311] border border-[#28231E]/90 rounded-2xl p-3.5 sm:p-4 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center bg-[#110E0C] p-1.5 rounded-full border border-stone-800 w-full sm:w-auto shadow-inner">
            <button
              onClick={() => {
                setOrderMode('delivery');
                showToast('배달 주문 모드로 변경되었습니다.');
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition ${
                orderMode === 'delivery'
                  ? 'bg-[#F2BE42] text-stone-950 shadow-[0_0_15px_rgba(242,190,66,0.35)]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              🛵 배달 Delivery
            </button>
            <button
              onClick={() => {
                setOrderMode('pickup');
                showToast('매장 픽업(포장) 모드로 변경되었습니다 (예상 15-20분).');
              }}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition ${
                orderMode === 'pickup'
                  ? 'bg-[#F2BE42] text-stone-950 shadow-[0_0_15px_rgba(242,190,66,0.35)]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              🛍️ 매장 픽업 Pickup
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 sm:gap-6 w-full md:w-auto text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F2BE42]/10 text-[#F2BE42] flex items-center justify-center border border-[#F2BE42]/30">
                📍
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#F2BE42]">
                  {orderMode === 'delivery' ? '배송 도착지 Destination' : '픽업 매장 Location'}
                </span>
                <span className="font-medium text-stone-200 max-w-[220px] sm:max-w-xs truncate">
                  {orderMode === 'delivery' ? deliveryAddress : 'Legazpi Village Kitchen (Main Branch)'}
                </span>
                <span className="text-[10px] font-mono text-[#F2BE42] mt-0.5">
                  {orderMode === 'delivery' ? '4.8 km • Direct In-House Delivery' : '준비 완료 시 SMS 알림 발송'}
                </span>
              </div>
            </div>

            <div className="h-6 w-px bg-stone-800 hidden sm:block"></div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-stone-900 text-stone-300 flex items-center justify-center border border-stone-800">
                ⏱️
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">예상 소요시간 ETA</span>
                <span className="font-medium font-mono text-[#F2BE42]">
                  {orderMode === 'delivery' ? '30-45 mins' : '15-20 mins'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                const updated = prompt('주소 또는 픽업 정보를 입력해주세요:', deliveryAddress);
                if (updated && updated.trim()) {
                  setDeliveryAddress(updated.trim());
                  showToast('위치/주소 정보가 업데이트되었습니다.');
                }
              }}
              type="button"
              className="px-3 py-1.5 rounded-lg border border-stone-800 hover:border-[#F2BE42]/50 text-stone-300 hover:text-white text-[11px] font-semibold bg-[#110E0C] transition shadow-sm"
            >
              변경 Edit
            </button>
          </div>
        </div>
      </section>

      {/* 스티치 원본 카테고리 필터 바 */}
      <section className="sticky top-20 z-30 bg-[#0C0A09]/95 backdrop-blur-sm py-4 border-b border-[#28231E] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto hide-scrollbar scroll-smooth py-1">
            {[
              { id: 'all', label: '전체 All' },
              { id: 'new', label: '✨ New Dishes 신메뉴' },
              { id: 'sashimi', label: 'Sashimi 사시미 刺身' },
              { id: 'sushi', label: 'Sushi 초밥 寿司' },
              { id: 'roll', label: 'Roll 롤' },
              { id: 'don', label: 'Don 덮밥 丼' },
              { id: 'noodle-soup', label: 'Noodle & Soup 면·탕 麺・スープ' },
              { id: 'grilled', label: 'Grilled 구이 焼き物' },
              { id: 'drinks', label: 'Drinks 주류·음료' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#F2BE42] text-stone-900 border border-[#F2BE42] font-semibold shadow-[0_0_15px_rgba(242,190,66,0.35)]'
                    : 'bg-[#171412] text-stone-300 border border-stone-800 hover:border-stone-600 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 메인 뷰포트 (20종 카드 그리드) */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full" id="menu-section">
        <div className="flex items-baseline justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-100 tracking-wide">전체 메뉴 ALL MENU</h2>
            <span className="text-sm font-serif text-[#F2BE42] bg-[#F2BE42]/10 px-2 py-0.5 rounded border border-[#F2BE42]/30">
              御品書き
            </span>
            <span className="text-xs text-stone-400 font-mono">({filteredDishes.length} dishes available)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredDishes.map((dish) => (
            <article
              key={dish.id}
              onClick={() => {
                setSelectedDish(dish);
                setIsCustomizeModalOpen(true);
              }}
              className="group bg-gradient-to-b from-[#1C1814] to-[#14110F] border border-[#28231E] hover:border-[#F2BE42]/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-stone-950 flex items-center justify-center">
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                      dish.isPlaceholder ? 'opacity-60' : 'opacity-90'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-transparent opacity-80" />
                  {dish.tag && (
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase rounded-md backdrop-blur-sm shadow z-10 ${
                        dish.tagColor || 'bg-[#F2BE42] text-stone-950'
                      }`}
                    >
                      {dish.tag}
                    </span>
                  )}
                  {dish.isPlaceholder && (
                    <div className="absolute inset-0 flex items-center justify-center p-3 pointer-events-none">
                      <div className="inline-flex flex-col items-center gap-0.5 px-3.5 py-1.5 rounded-full border border-[#F2BE42]/40 bg-black/85 backdrop-blur-md shadow-lg">
                        <span className="text-[11px] font-bold text-[#F2BE42] tracking-wider">곧 업데이트 예정</span>
                        <span className="text-[9px] text-stone-400 font-sans uppercase">PHOTO COMING SOON</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 pb-3">
                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#F2BE42] transition-colors leading-snug">
                    {dish.name} <span className="text-sm font-sans font-normal text-[#F2BE42] ml-1">{dish.subName}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 mt-2 line-clamp-2 leading-relaxed font-light">
                    {dish.desc}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 flex items-center justify-between border-t border-[#28231E]/60 mt-2">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">PRICE</span>
                  <span className="text-xl font-bold font-mono text-[#F2BE42] tracking-tight">₱{dish.price.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDish(dish);
                    setIsCustomizeModalOpen(true);
                  }}
                  className="w-10 h-10 rounded-full bg-[#1A1613] hover:bg-[#F2BE42] text-[#F2BE42] hover:text-stone-950 flex items-center justify-center border border-[#F2BE42]/30 hover:border-[#F2BE42] transition-all transform hover:scale-105 active:scale-95 shadow-md"
                >
                  +
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* 스티치 원본 장바구니 슬라이드오버 드로어 (`w-full max-w-[450px]`) */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <aside className="relative z-50 h-full w-full max-w-[450px] bg-[#151311] border-l border-[#3c3936] shadow-2xl flex flex-col justify-between text-stone-200 animate-in slide-in-from-right duration-300">
            
            {/* 상단 프로모션 헤더 */}
            <div className="p-5 border-b border-[#28231E] bg-[#191512] flex flex-col gap-2.5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F2BE42] animate-pulse"></span>
                    <h2 className="text-xl font-serif font-bold text-[#E5A93C] tracking-wide flex items-center gap-2">
                      장바구니 CART{' '}
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-[#F2BE42]/15 text-[#F2BE42] border border-[#F2BE42]/30">
                        {totalCount}
                      </span>
                    </h2>
                  </div>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    도쿄 도요스 직송 사시미 • 배송지: {deliveryAddress}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#110E0C] hover:bg-[#F2BE42] text-stone-400 hover:text-stone-950 flex items-center justify-center border border-stone-800 transition"
                >
                  ✕
                </button>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-[11px] font-medium">
                <span>❄️</span>
                <span className="truncate">3.4°C 안심 항온 콜드체인 무료 보냉 포장 적용</span>
              </div>

              {/* 3개 이상 무료 음료 증정 프로모션 게이지 */}
              <div className="mt-1 p-3 rounded-xl bg-gradient-to-r from-[#1E1915] via-[#221F1D] to-[#1A1613] border border-[#F2BE42]/40 shadow-sm flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#F2BE42]">🎁</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-white tracking-wide">3개 이상 주문 시 무료 음료 증정</span>
                      <span className="text-[10px] text-[#F2BE42]">생수 / 콜라 / 스프라이트 중 택 1 무료</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#F2BE42]/20 text-[#F2BE42] border border-[#F2BE42]/40">
                    {totalCount >= 3 ? '증정 조건 달성' : `${3 - totalCount}개 더 추가 시 적용`}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="w-full bg-[#110E0C] rounded-full h-1.5 overflow-hidden border border-stone-800">
                    <div
                      className="bg-gradient-to-r from-[#F2BE42] to-[#fabc4d] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (totalCount / 3) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 품목 리스트 */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 hide-scrollbar">
              {cart.map((item, idx) => (
                <article key={item.id} className="p-3.5 rounded-xl bg-[#191512] border border-stone-800 hover:border-[#F2BE42]/40 transition flex flex-col gap-2.5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-[#F2BE42]/30 flex-shrink-0 bg-stone-900">
                        <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-sm font-serif font-bold text-white">{item.name}</h4>
                        <span className="text-[11px] text-stone-400 mt-0.5 line-clamp-1">{item.option}</span>
                        <span className="text-xs font-mono font-bold text-[#F2BE42] mt-1">
                          ₱{(item.unitPrice * item.qty).toLocaleString()}.00
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => adjustQty(item.id, -item.qty)}
                      className="text-stone-500 hover:text-rose-400 text-xs p-1"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-stone-800/60 text-xs">
                    <span className="text-stone-500 font-mono">Item #0{idx + 1}</span>
                    <div className="flex items-center bg-[#110E0C] border border-stone-800 rounded-lg px-2 py-0.5">
                      <button
                        type="button"
                        onClick={() => adjustQty(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-mono font-bold text-xs text-white">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => adjustQty(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-stone-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <div className="p-3.5 rounded-xl bg-[#110E0C] border border-stone-800/80 space-y-2 text-xs">
                <span className="font-bold text-stone-300 block">📞 주방 셰프 & 라이더 요청사항</span>
                <textarea
                  rows={2}
                  defaultValue="간장 따로 포장 요청, 생강절임 넉넉히 부탁드립니다."
                  className="w-full bg-[#181412] border border-stone-700/80 rounded-lg p-2.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-[#F2BE42] resize-none"
                />
              </div>
            </div>

            {/* 결제 요약 및 Tara Pay CTA */}
            <div className="p-5 border-t border-[#28231E] bg-[#181412] space-y-3.5">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-400">
                  <span>주문 금액 (Subtotal)</span>
                  <span className="font-mono text-stone-200">₱{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>콜드체인 보냉 포장</span>
                  <span className="text-emerald-400 font-semibold">Free (₱0.00)</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>배달료 (Makati Diamond)</span>
                  <span className="font-mono text-stone-200">₱{deliveryFee}.00</span>
                </div>
                <div className="flex justify-between text-[#F2BE42]">
                  <span>Tara Pay 신규 할인 웰컴 쿠폰</span>
                  <span className="font-mono font-semibold">-₱100.00</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2.5 border-t border-stone-800">
                  <span>총 결제 금액 (Total)</span>
                  <span className="font-mono text-xl text-[#F2BE42]">₱{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsTaraPayModalOpen(true)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#F2BE42] via-[#fabc4d] to-[#F2BE42] text-stone-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(242,190,66,0.35)] transition transform active:scale-98"
              >
                <span>⚡ Tara Pay로 즉시 결제하기 (₱{totalAmount.toLocaleString()}) →</span>
              </button>

              <Link
                href="/checkout"
                className="w-full py-3 px-4 rounded-xl bg-[#161311] hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>주문서 작성 페이지(2단계)로 이동 →</span>
              </Link>
            </div>

          </aside>
        </div>
      )}

      {/* 스티치 원본 Tara Pay 모달 */}
      {isTaraPayModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#161311] border border-[#F2BE42]/60 rounded-2xl shadow-2xl p-6 space-y-4 text-stone-200 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-[#F2BE42] text-stone-950 font-black flex items-center justify-center">TP</span>
                <div>
                  <h3 className="font-serif font-bold text-white text-base">Tara Pay Direct Gateway</h3>
                  <p className="text-[10px] text-stone-400 font-mono">TXN: #TP-20261030-99482-PH</p>
                </div>
              </div>
              <button onClick={() => setIsTaraPayModalOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>

            <div className="p-4 rounded-xl bg-[#0C0A09] border border-stone-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-stone-400 block">최종 결제 승인액</span>
                <span className="text-xs text-stone-500">VAT 및 콜드체인 특송료 포함</span>
              </div>
              <span className="text-2xl font-mono font-black text-[#F2BE42]">₱{totalAmount.toLocaleString()}.00</span>
            </div>

            <div className="space-y-2 text-xs">
              <label className="p-3 rounded-xl border border-[#F2BE42] bg-[#1A1613] flex justify-between items-center cursor-pointer">
                <div>
                  <span className="font-bold text-white block">GCash 1-Tap Biometric Pay (추천)</span>
                  <span className="text-[10px] text-stone-400">필리핀 1위 모바일 지갑 즉시 연동 결제</span>
                </div>
                <span className="font-mono text-blue-400 font-bold">GCash</span>
              </label>
              <label className="p-3 rounded-xl border border-stone-800 bg-[#0C0A09] flex justify-between items-center cursor-pointer">
                <div>
                  <span className="font-bold text-white block">Tara Wallet 지갑 잔액</span>
                  <span className="text-[10px] text-stone-400">보유 잔액 ₱2,450.00 (3% 적립)</span>
                </div>
                <span className="font-mono text-[#F2BE42] font-bold">Tara Pay</span>
              </label>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsTaraPayModalOpen(false);
                showToast('Tara Pay 결제가 정상 승인되었습니다.');
              }}
              className="w-full py-3.5 rounded-xl bg-[#F2BE42] hover:bg-[#e0ad32] text-stone-950 font-black text-xs shadow-lg transition"
            >
              ₱{totalAmount.toLocaleString()}.00 승인 및 즉시 결제
            </button>
          </div>
        </div>
      )}

      {/* 스티치 원본 회원가입/SMS OTP 모달 */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#161311] border border-stone-800 rounded-2xl p-6 space-y-4 text-stone-200 animate-in zoom-in-95">
            <div className="flex justify-between items-center pb-3 border-b border-stone-800">
              <h3 className="font-serif font-bold text-white text-base">전화번호로 3초 간편 시작</h3>
              <button onClick={() => setIsAuthModalOpen(false)} className="text-stone-400 hover:text-white">✕</button>
            </div>
            <div className="bg-[#F2BE42]/10 border border-[#F2BE42]/30 p-2.5 rounded-xl text-xs text-[#F2BE42]">
              🎁 신규 웰컴 혜택: 첫 주문 즉시 ₱100 할인 쿠폰 및 결제액 3% 포인트 적립
            </div>
            <div>
              <label className="text-xs font-bold text-stone-400 block mb-1">휴대전화번호 (Mobile Number)</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  defaultValue="0917 123 4567"
                  className="flex-1 bg-[#110E0C] border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => showToast('SMS 인증번호 6자리가 발송되었습니다.')}
                  className="px-3 py-2 bg-[#F2BE42]/20 border border-[#F2BE42]/40 text-[#F2BE42] rounded-xl text-xs font-bold"
                >
                  인증요청
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsAuthModalOpen(false);
                showToast('로그인 및 ₱100 웰컴 쿠폰이 지급되었습니다.');
              }}
              className="w-full py-3 rounded-xl bg-[#F2BE42] text-stone-950 font-bold text-xs"
            >
              간편 로그인 / 가입 완료
            </button>
          </div>
        </div>
      )}

      {/* 스티치 원본 메뉴 커스터마이징 모달 */}
      {isCustomizeModalOpen && selectedDish && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#171412] border border-[#28231E] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            <button
              onClick={() => setIsCustomizeModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              ✕
            </button>
            <div className="h-52 bg-stone-900 relative">
              <img src={selectedDish.img} alt={selectedDish.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171412] via-transparent to-transparent opacity-90"></div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">{selectedDish.name}</h3>
                <p className="text-lg font-mono font-bold text-[#F2BE42] mt-1">₱{selectedDish.price.toLocaleString()}</p>
                <p className="text-xs text-stone-400 mt-2">{selectedDish.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCart([
                    ...cart,
                    {
                      id: `custom-${Date.now()}`,
                      name: selectedDish.name,
                      unitPrice: selectedDish.price,
                      qty: 1,
                      option: '기본 손질 포장',
                      img: selectedDish.img,
                    },
                  ]);
                  setIsCustomizeModalOpen(false);
                  setIsDrawerOpen(true);
                  showToast(`${selectedDish.name}이 장바구니에 추가되었습니다.`);
                }}
                className="w-full py-3 rounded-xl bg-[#F2BE42] text-stone-950 font-bold text-xs shadow-lg"
              >
                Add to cart • ₱{selectedDish.price.toLocaleString()}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 스티치 원본 푸터 */}
      <footer className="mt-auto border-t border-[#272320] bg-[#080706] py-12 text-stone-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-[#272320]">
            <div className="space-y-1">
              <p className="text-stone-100 font-serif font-bold tracking-widest text-sm sm:text-base">
                TUNAMARU JAPANESE RESTAURANT (綱丸 本格江戸前寿司)
              </p>
              <p className="text-stone-300">Roxas Blvd, corner Pedro Gil St, Malate, Manila, 1004 Metro Manila</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:+639150990442"
                className="px-4 py-2 rounded-full bg-[#161311] border border-[#F2BE42]/40 text-[#F2BE42] font-mono font-bold"
              >
                연락처: 0915 099 0442
              </a>
              <a
                href="https://www.facebook.com/61567185765803/posts/122159390036572858/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#161311] border border-blue-500/40 text-blue-400"
              >
                Official Facebook Page
              </a>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
            <p>極上のマグロと本格江戸前寿司の饗宴 • Manila Bayview Experience</p>
            <p>© 2026 Tunamaru Dining Experience. All rights reserved. Powered by Tara Pay.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}