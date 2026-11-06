/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChannelSettings, FunTag, Genre, Member, Notice, Video } from '../types';

export const CHANNEL_SETTINGS: ChannelSettings = {
  channelName: '애매한 삼십대',
  channelName_en: 'Amber 30s',
  youtubeUrl: 'https://www.youtube.com/@%EC%95%A0%EB%A7%A4%ED%95%9C%EC%82%BC%EC%8B%AD%EB%8C%80',
  subscribeUrl: 'https://www.youtube.com/@%EC%95%A0%EB%A7%A4%ED%95%9C%EC%82%BC%EC%8B%AD%EB%8C%80?sub_confirmation=1',
  contactEmail: 'yemong.studio@gmail.com',
  heroHeadline_ko: '퇴근 후 모인 30대, 승리보다 핑계가 빠르다.',
  heroHeadline_en: 'After-work thirty-somethings: excuses come faster than victory.',
  heroLabel_ko: '7명이 함께하는 목소리 중심 게임 채널',
  heroLabel_en: 'A voice-driven gaming channel by seven friends',
  heroSub_ko: '억울한 남탓과 끊이지 않는 티키타카, 7명의 유쾌한 순정만화풍 게임 플레이를 만나보세요.',
  heroSub_en: 'Endless banter, hilarious excuses, and unexpected teamwork from seven friends inside gaming.'
};

export const MEMBERS: Member[] = [
  {
    id: 'yemong',
    slug: 'yemong',
    name: '예몽',
    name_en: 'Yemong',
    colorName: '라벤더 & 퍼플 (Lavender)',
    colorHex: '#A855F7',
    bgColor: '#2E1A47',
    position: '눈물의 순정 여주 & 하이텐션',
    position_en: 'Tearful Heroine & High Energy',
    intro: '화려한 라벤더 드레스와 반짝이는 눈물이 매력적인 순정만화 여주인공. 퍼즐과 퀴즈에 특화되어 있으며 텐션이 오르면 혼잣말과 노래로 오디오를 빈틈없이 채운다.',
    intro_en: 'A classic romantic manga heroine with sparkling tears and a lavender rococo dress. Knack for puzzles and quizzes, filling every silence with songs and mutterings.',
    mascotImage: '/characters/yemong.jpg',
    abilities: [
      { name: '퍼즐·퀴즈', name_en: 'Puzzle & Quiz', value: 4, basis: '퍼즐·퀴즈에 특화된 브레인' },
      { name: '텐션 & 오디오', name_en: 'Energy & Audio', value: 5, basis: '텐션 오를 때 멈추지 않는 노래' },
      { name: '감수성 (눈물)', name_en: 'Tears & Emotion', value: 5, basis: '툭하면 터지는 폭풍 눈물' }
    ],
    displayOrder: 1
  },
  {
    id: 'ttugi',
    slug: 'ttugi',
    name: '뚜기',
    name_en: 'Ttugi',
    colorName: '민트 & 피치 (Mint & Peach)',
    colorHex: '#2DD4BF',
    bgColor: '#133534',
    position: '별빛 눈망울의 리액션 요정',
    position_en: 'Starry-Eyed Reaction Fairy',
    intro: '커다란 초록 리본과 밤하늘 별을 담은 큰 눈망울을 지닌 순정파 플레이어. 매 순간 게임 속 상황에 따라 스펙터클하고 다채로운 리액션을 쏟아낸다.',
    intro_en: 'A sweet character with giant starry eyes and an oversized green ribbon. Her dramatic reactions morph with every unexpected turn.',
    mascotImage: '/characters/ttugi.jpg',
    abilities: [
      { name: '리액션 폭', name_en: 'Reaction Range', value: 5, basis: '상황에 따라 폭발하는 감정 표현' },
      { name: '눈망울 공격', name_en: 'Starry Eyes', value: 5, basis: '보는 순간 납득하게 되는 반짝이는 눈' }
    ],
    displayOrder: 2
  },
  {
    id: 'bowang',
    slug: 'bowang',
    name: '보왕',
    name_en: 'Bowang',
    colorName: '로얄 블루 & 골드 (Royal Blue)',
    colorHex: '#3B82F6',
    bgColor: '#172554',
    position: '은발의 냉철한 뇌섹 브레인',
    position_en: 'Silver-Haired Royal Brain',
    intro: '화려한 로얄 블루 근위대 군복과 은빛 장발을 휘날리는 냉철한 브레인. 나긋나긋한 귀족적 말투 속에 새침하고 엉뚱한 매력을 품고 있다.',
    intro_en: 'A silver-haired prince in royal blue regalia. Beneath his prim, aristocratic cadence lies a sharp, sassy, and eccentric game mastermind.',
    mascotImage: '/characters/bowang.jpg',
    abilities: [
      { name: '두뇌 & 전략', name_en: 'Brains & Tactics', value: 5, basis: '냉철한 판단과 새침한 브레인' },
      { name: '새침함', name_en: 'Sassiness', value: 4, basis: '나긋나긋한 속 뼈 때리는 새침함' },
      { name: '엉뚱함', name_en: 'Quirkiness', value: 3, basis: '가끔 터져나오는 귀족적 엉뚱함' }
    ],
    displayOrder: 3
  },
  {
    id: 'jakku',
    slug: 'jakku',
    name: '자꾸',
    name_en: 'Jakku',
    colorName: '골든 블론드 & 네이비 (Gold)',
    colorHex: '#EAB308',
    bgColor: '#372B10',
    position: '태양의 황금 사자 레어템',
    position_en: 'Golden Sun Lion Noble',
    intro: '눈부신 금빛 사자 갈기 같은 머릿결과 구릿빛 피부의 당당한 황태자. 자주 등장하지 않지만 등장할 때마다 묵직한 한마디로 강렬한 존재감을 각인시키는 귀한 캐릭터.',
    intro_en: 'A radiant golden-haired nobleman with tanned skin and a majestic aura. Rare to appear, but delivers unforgettable one-liners whenever he arrives.',
    mascotImage: '/characters/jakku.jpg',
    abilities: [
      { name: '희귀도', name_en: 'Rarity', value: 5, basis: '자주 등장하지 않는 귀한 레어템' },
      { name: '한마디 임팩트', name_en: 'One-liner Impact', value: 5, basis: '묵직하게 꽂히는 명대사' }
    ],
    displayOrder: 4
  },
  {
    id: 'parkka',
    slug: 'parkka',
    name: '파르카',
    name_en: 'Parkka',
    colorName: '다크 틸 & 차콜 (Dark Teal)',
    colorHex: '#14B8A6',
    bgColor: '#162C2A',
    position: '고독한 무결점 하드캐리',
    position_en: 'Flawless Hard-Carry Ace',
    intro: '날카로운 턱선과 흩날리는 은회색 웨이브 머릿결의 카리스마 에이스. 어떤 공포게임이나 절체절명의 위기 속에서도 흔들림 없는 냉철한 실력파.',
    intro_en: 'A brooding, silver-haired ace with intense eyeliner. Unshakable calm under horror and unmatched carry skills in every crisis.',
    mascotImage: '/characters/parkka.jpg',
    abilities: [
      { name: '게임 실력', name_en: 'Game Skill', value: 5, basis: '어떤 게임도 통달한 고인물' },
      { name: '하드캐리', name_en: 'Hard Carry', value: 5, basis: '팀원들 다 쓰러져도 혼자 캐리' },
      { name: '공포 속 침착함', name_en: 'Calm Under Horror', value: 5, basis: '귀신 앞에서도 흐트러짐 없는 눈빛' }
    ],
    displayOrder: 5
  },
  {
    id: 'sanchez',
    slug: 'sanchez',
    name: '산체스',
    name_en: 'Sanchez',
    colorName: '에메랄드 틸 & 구릿빛 (Teal)',
    colorHex: '#0D9488',
    bgColor: '#1E2D2A',
    position: '불운의 억울함 요정 & 검객',
    position_en: 'Fairy of Grievance & Swashbuckler',
    intro: '야성미 넘치는 흑발과 구릿빛 피부의 호쾌한 검객 비주얼을 자랑하지만, 실상은 늘 팀원들의 집중 몰이와 놀림을 온몸으로 받아내는 채널 공인 억울함 요정.',
    intro_en: 'A dashing, tanned swashbuckler with open-collar charm who inevitably ends up as the team’s collective scapegoat and comedic victim.',
    mascotImage: '/characters/sanchez.jpg',
    abilities: [
      { name: '억울함 지수', name_en: 'Grievance Level', value: 5, basis: '숨만 쉬어도 억울한 상황 발생' },
      { name: '놀림 유발력', name_en: 'Teasing Magnet', value: 5, basis: '팀원들이 못 참고 몰아가는 마성의 타겟' }
    ],
    displayOrder: 6
  },
  {
    id: 'romanov',
    slug: 'romanov',
    name: '로마노프',
    name_en: 'Romanov',
    colorName: '다크 크림슨 & 버건디 (Burgundy)',
    colorHex: '#E11D48',
    bgColor: '#38131E',
    position: '팩폭 귀족 & 기절킹 (체력 1)',
    position_en: 'Blunt Truths & Faint King (HP: 1)',
    intro: '고풍스러운 버건디 벨벳 코트를 입고 날카로운 팩폭과 추임새를 날리는 귀족. 하지만 체력이 단 1에 불과해 바람만 스쳐도 바닥에 눕는 채널 공인 최고 존엄 \'기절킹\'.',
    intro_en: 'An aristocratic gentleman in deep velvet crimson with razorsharp critiques. However, boasting a staggering 1 HP, he faints at the slightest disturbance — the true Faint King.',
    mascotImage: '/characters/romanov.jpg',
    abilities: [
      { name: '체력 (기절킹)', name_en: 'Stamina (Faint King)', value: 1, basis: '체력 1! 툭 치면 기절하는 극악의 유리몸' },
      { name: '팩폭 타격감', name_en: 'Blunt Truths', value: 5, basis: '가차 없는 게임 평가와 날카로운 사운드' },
      { name: '기절 사운드 효과', name_en: 'Fainting Sound FX', value: 5, basis: '기절할 때 울려 퍼지는 찰진 추임새' }
    ],
    displayOrder: 7
  }
];

export const GENRES: Genre[] = [
  { id: 'horror-game', label_ko: '공포게임', label_en: 'Horror Game' },
  { id: 'coop-party', label_ko: '협동·파티', label_en: 'Co-op & Party' },
  { id: 'puzzle-trivia', label_ko: '퍼즐·퀴즈', label_en: 'Puzzle & Quiz' },
  { id: 'survival', label_ko: '생존·어드벤처', label_en: 'Survival' },
  { id: 'action-fps', label_ko: '액션·FPS', label_en: 'Action & FPS' }
];

export const FUN_TAGS: FunTag[] = [
  { id: 'tikitaka', label_ko: '티키타카', label_en: 'Banter' },
  { id: 'scream', label_ko: '비명', label_en: 'Screams' },
  { id: 'horror-game', label_ko: '공포게임', label_en: 'Horror' },
  { id: 'teasing', label_ko: '놀림', label_en: 'Teasing' },
  { id: 'rescue', label_ko: '구원', label_en: 'Rescue' },
  { id: 'hardcarry', label_ko: '하드캐리', label_en: 'Hard Carry' },
  { id: 'hilarious', label_ko: '배꼽주의', label_en: 'Hilarious' }
];

export const VIDEOS: Video[] = [
  {
    id: 'K06n5hRzXdY',
    youtubeUrl: 'https://www.youtube.com/watch?v=K06n5hRzXdY',
    title: '배꼽 빠지는 티키타카',
    gameName: 'Lethal Company',
    genreId: 'coop-party',
    genreNameKo: '협동·파티',
    genreNameEn: 'Co-op & Party',
    memberIds: ['yemong', 'parkka', 'sanchez', 'romanov'],
    funTags: ['tikitaka', 'hilarious', 'teasing'],
    publishedAt: '2026-03-24',
    videoType: 'longform',
    isFeatured: true,
    isHomeFeatured: true,
    startHereOrder: 1,
    thumbnailUrl: 'https://i.ytimg.com/vi/K06n5hRzXdY/hqdefault.jpg'
  },
  {
    id: '9TGtkR0Y2Nc',
    youtubeUrl: 'https://www.youtube.com/watch?v=9TGtkR0Y2Nc',
    title: '공포게임 비명 혜자 모음',
    gameName: 'Phasmophobia',
    genreId: 'horror-game',
    genreNameKo: '공포게임',
    genreNameEn: 'Horror Game',
    memberIds: ['yemong', 'ttugi', 'sanchez', 'parkka'],
    funTags: ['scream', 'horror-game', 'teasing'],
    publishedAt: '2026-03-18',
    videoType: 'longform',
    isFeatured: true,
    isHomeFeatured: false,
    startHereOrder: 2,
    thumbnailUrl: 'https://i.ytimg.com/vi/9TGtkR0Y2Nc/hqdefault.jpg'
  },
  {
    id: '_NFEC6ysfck',
    youtubeUrl: 'https://www.youtube.com/watch?v=_NFEC6ysfck',
    title: '산체스 탈탈 털리는 날',
    gameName: 'Pico Park',
    genreId: 'coop-party',
    genreNameKo: '협동·파티',
    genreNameEn: 'Co-op & Party',
    memberIds: ['sanchez', 'bowang', 'jakku', 'romanov'],
    funTags: ['teasing', 'tikitaka'],
    publishedAt: '2026-03-10',
    videoType: 'longform',
    isFeatured: true,
    isHomeFeatured: false,
    startHereOrder: 3,
    thumbnailUrl: 'https://i.ytimg.com/vi/_NFEC6ysfck/hqdefault.jpg'
  },
  {
    id: 'bpp-dYeXhIg',
    youtubeUrl: 'https://www.youtube.com/watch?v=bpp-dYeXhIg',
    title: "waves를 '와베스'라 읽는 예몽이와 그를 구하는 파르카",
    gameName: 'Content Warning',
    genreId: 'coop-party',
    genreNameKo: '협동·파티',
    genreNameEn: 'Co-op & Party',
    memberIds: ['yemong', 'parkka', 'ttugi'],
    funTags: ['rescue', 'hardcarry', 'tikitaka'],
    publishedAt: '2026-03-02',
    videoType: 'longform',
    isFeatured: false,
    isHomeFeatured: false,
    thumbnailUrl: 'https://i.ytimg.com/vi/bpp-dYeXhIg/hqdefault.jpg'
  },
  {
    id: 'short-01',
    youtubeUrl: 'https://www.youtube.com/@%EC%95%A0%EB%A7%A4%ED%95%9C%EC%82%BC%EC%8B%AD%EB%8C%80/shorts',
    title: '[Shorts] 1초 만에 밝혀진 거짓말과 산체스의 절규',
    gameName: 'Among Us',
    genreId: 'coop-party',
    genreNameKo: '협동·파티',
    genreNameEn: 'Co-op & Party',
    memberIds: ['sanchez', 'yemong', 'romanov'],
    funTags: ['tikitaka', 'hilarious'],
    publishedAt: '2026-03-27',
    videoType: 'shorts',
    isFeatured: true,
    isHomeFeatured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'short-02',
    youtubeUrl: 'https://www.youtube.com/@%EC%95%A0%EB%A7%A4%ED%95%9C%EC%82%BC%EC%8B%AD%EB%8C%80/shorts',
    title: '[Shorts] 파르카의 0.1초 반응속도 슈퍼세이브',
    gameName: 'Repo Man',
    genreId: 'action-fps',
    genreNameKo: '액션·FPS',
    genreNameEn: 'Action & FPS',
    memberIds: ['parkka', 'ttugi'],
    funTags: ['hardcarry', 'rescue'],
    publishedAt: '2026-03-22',
    videoType: 'shorts',
    isFeatured: false,
    isHomeFeatured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'short-03',
    youtubeUrl: 'https://www.youtube.com/@%EC%95%A0%EB%A7%A4%ED%95%9C%EC%82%BC%EC%8B%AD%EB%8C%80/shorts',
    title: '[Shorts] 침착함 0% 뚜기의 돌고래 비명 사운드',
    gameName: 'The Mortuary Assistant',
    genreId: 'horror-game',
    genreNameKo: '공포게임',
    genreNameEn: 'Horror Game',
    memberIds: ['ttugi', 'bowang'],
    funTags: ['scream', 'horror-game'],
    publishedAt: '2026-03-15',
    videoType: 'shorts',
    isFeatured: false,
    isHomeFeatured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'yt-party-01',
    youtubeUrl: 'https://www.youtube.com/@%EC%95%A0%EB%A7%A4%ED%95%9C%EC%82%BC%EC%8B%AD%EB%8C%80',
    title: '우정 파괴의 날: 7명이 함께하는 대환장 파티',
    gameName: 'Party Animals',
    genreId: 'coop-party',
    genreNameKo: '협동·파티',
    genreNameEn: 'Co-op & Party',
    memberIds: ['yemong', 'ttugi', 'bowang', 'jakku', 'parkka', 'sanchez', 'romanov'],
    funTags: ['tikitaka', 'hilarious', 'teasing'],
    publishedAt: '2026-02-28',
    videoType: 'longform',
    isFeatured: false,
    isHomeFeatured: false,
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
  }
];

export const NOTICES: Notice[] = [
  {
    id: 'notice-01',
    title: '애매한 삼십대 공식 웹사이트가 오픈되었습니다!',
    content: `안녕하세요! '애매한 삼십대' 채널을 찾아주셔서 진심으로 감사드립니다.\n\n퇴근 후 모여 게임하는 30대 친구들의 유쾌한 플레이와 티키타카를 더 쉽고 즐겁게 찾아보실 수 있도록 공식 아카이브 웹사이트를 마련했습니다.\n\n멤버별 개성과 순정만화풍 비주얼, 게임별·멤버별 영상 탐색, 채널의 소식을 한눈에 확인하실 수 있습니다. 영상에 대한 다양한 의견과 소통은 공식 유튜브 영상의 댓글을 통해 자유롭게 남겨주세요!\n\n앞으로도 유쾌한 웃음과 핑계 가득한 게임 플레이로 찾아뵙겠습니다. 감사합니다!`,
    publishedAt: '2026-11-06',
    category: '공지',
    category_en: 'Notice',
    isPinned: true,
    linkUrl: 'https://www.youtube.com/@%EC%95%A0%EB%A7%A4%ED%95%9C%EC%82%BC%EC%8B%AD%EB%8C%80'
  },
  {
    id: 'notice-02',
    title: '영상 검색 및 멤버별 필터 기능 안내',
    content: `VIDEOS 페이지에서는 일반 영상 및 Shorts 분류, 게임 장르별 필터, 그리고 각 멤버별 출연 영상 필터를 지원합니다.\n\n특정 멤버의 케미가 보고 싶으시거나 공포게임 비명 모음, 티키타카 재미 태그를 선택하시면 해당 순간들만 쏙쏙 골라보실 수 있습니다.\n\n마음에 드는 영상은 유튜브 원본 영상 링크로 연결되어 바로 시청하실 수 있습니다.`,
    publishedAt: '2026-11-04',
    category: '안내',
    category_en: 'Guide',
    isPinned: false
  },
  {
    id: 'notice-03',
    title: '채널 문의 및 협업 안내',
    content: `애매한 삼십대 채널에 제보하고 싶은 게임이나 합방·협업 제안은 COMMUNITY 페이지의 문의 메일 버튼을 통해 전달해주실 수 있습니다.\n\n• 일반 문의: yemong.studio@gmail.com\n• 협업 및 광고 문의: [협업 문의] 제목 머리말 표기\n• 게임 추천 및 제보: [제보·제안] 제목 머리말 표기\n\n보내주신 소중한 의견은 팀원 모두가 함께 검토하고 있습니다. 많은 관심과 사랑 부탁드립니다!`,
    publishedAt: '2026-10-28',
    category: '안내',
    category_en: 'Guide',
    isPinned: false
  }
];
