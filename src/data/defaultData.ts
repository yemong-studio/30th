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
  heroSub_ko: '억울한 남탓과 끊이지 않는 티키타카, 7명의 유쾌한 게임 플레이를 만나보세요.',
  heroSub_en: 'Endless banter, hilarious excuses, and unexpected teamwork from seven friends inside gaming.'
};

export const MEMBERS: Member[] = [
  {
    id: 'yemong',
    slug: 'yemong',
    name: '예몽',
    name_en: 'Yemong',
    colorName: '민트 (Mint)',
    colorHex: '#2CB199',
    bgColor: '#E6F8F5',
    position: '하이텐션 방랑자',
    position_en: 'High-Energy Wanderer',
    intro: '퍼즐·퀴즈에 특화된 면이 있는 하이텐션 방랑자. 집중하면 과묵해지고, 텐션이 오르면 혼잣말과 노래로 오디오를 채운다.',
    intro_en: 'A high-energy wanderer with a knack for puzzles and quizzes. Quiet when focused, but when the energy peaks, the audio fills up with muttering and singing.',
    mascotImage: '/mascots/yemong.png',
    abilities: [
      { name: '퍼즐·퀴즈', name_en: 'Puzzle & Quiz', value: 4, basis: '퍼즐·퀴즈에 특화된 면' },
      { name: '텐션', name_en: 'Energy', value: 5, basis: '하이텐션 방랑자' },
      { name: '혼잣말·노래', name_en: 'Self-talk & Singing', value: 4, basis: '텐션 오를 때 오디오 풀 가동' }
    ],
    displayOrder: 1
  },
  {
    id: 'ttugi',
    slug: 'ttugi',
    name: '뚜기',
    name_en: 'Ttugi',
    colorName: '연두 (Light Green)',
    colorHex: '#48BB78',
    bgColor: '#F0FFF4',
    position: '리액션 플레이어',
    position_en: 'Reaction Player',
    intro: '상황에 따라 다양한 반응을 보여주는 플레이어.',
    intro_en: 'A player whose reactions change with every situation.',
    mascotImage: '/mascots/ttugi.png',
    abilities: [
      { name: '리액션 폭', name_en: 'Reaction Range', value: 4, basis: '상황에 따라 다양한 반응' }
    ],
    displayOrder: 2
  },
  {
    id: 'bowang',
    slug: 'bowang',
    name: '보왕',
    name_en: 'Bowang',
    colorName: '골드 & 로얄블루 (Gold)',
    colorHex: '#D97706',
    bgColor: '#FEF9C3',
    position: '새침한 브레인',
    position_en: 'Sassy Brain',
    intro: '나긋나긋한 말투 속에 새침하고 엉뚱한 매력을 지닌 새침한 브레인.',
    intro_en: 'A prim brain whose soft-spoken voice hides a sassy, quirky charm.',
    mascotImage: '/mascots/bowang.png',
    abilities: [
      { name: '두뇌', name_en: 'Brains', value: 5, basis: '새침한 브레인' },
      { name: '새침함', name_en: 'Sassiness', value: 4, basis: '나긋나긋한 속 새침한 매력' },
      { name: '엉뚱함', name_en: 'Quirkiness', value: 3, basis: '엉뚱한 매력' }
    ],
    displayOrder: 3
  },
  {
    id: 'jakku',
    slug: 'jakku',
    name: '자꾸',
    name_en: 'Jakku',
    colorName: '국방색 (Khaki)',
    colorHex: '#657850',
    bgColor: '#F1F5EB',
    position: '귀한 레어템',
    position_en: 'Rare Item Character',
    intro: '자주 등장하지 않지만, 한마디를 던질 때마다 강한 인상을 남기는 귀한 레어템.',
    intro_en: 'A rare-item character who doesn\'t show up often but leaves a mark with every line.',
    mascotImage: '/mascots/jakku.png',
    abilities: [
      { name: '희귀도', name_en: 'Rarity', value: 5, basis: '자주 등장하지 않는 귀한 레어템' },
      { name: '한마디 임팩트', name_en: 'One-liner Impact', value: 4, basis: '한마디마다 강한 인상' }
    ],
    displayOrder: 4
  },
  {
    id: 'parkka',
    slug: 'parkka',
    name: '파르카',
    name_en: 'Parkka',
    colorName: '검정 (Black)',
    colorHex: '#1F2937',
    bgColor: '#F3F4F6', // Crisp light neutral to make black wolf mascot pop cleanly
    position: '무결점 하드캐리',
    position_en: 'Flawless Hard-Carry',
    intro: '게임 실력이 뛰어나고 공포게임에서도 침착한 무결점 하드캐리 고인물.',
    intro_en: 'A flawless hard-carry veteran: top-tier at games and calm even in horror titles.',
    mascotImage: '/mascots/parkka.png',
    abilities: [
      { name: '게임 실력', name_en: 'Game Skill', value: 5, basis: '게임 실력이 뛰어남' },
      { name: '하드캐리', name_en: 'Hard Carry', value: 5, basis: '무결점 하드캐리 고인물' },
      { name: '공포 속 침착함', name_en: 'Calm Under Horror', value: 4, basis: '공포게임에서도 침착한 플레이' }
    ],
    displayOrder: 5
  },
  {
    id: 'sanchez',
    slug: 'sanchez',
    name: '산체스',
    name_en: 'Sanchez',
    colorName: '보라 (Purple)',
    colorHex: '#8B5CF6',
    bgColor: '#F5F3FF',
    position: '억울함 요정',
    position_en: 'Grievance Fairy',
    intro: '팀원들의 몰이를 받으며 억울해하는, 공인된 놀림감이자 억울함 요정.',
    intro_en: 'The officially recognized target of the team\'s teasing, and the fairy of grievance.',
    mascotImage: '/mascots/sanchez.png',
    abilities: [
      { name: '억울함', name_en: 'Grievance', value: 5, basis: '억울함 요정' },
      { name: '놀림 지수', name_en: 'Teasing Level', value: 5, basis: '공인된 놀림감, 몰이를 받음' }
    ],
    displayOrder: 6
  },
  {
    id: 'romanov',
    slug: 'romanov',
    name: '로마노프',
    name_en: 'Romanov',
    colorName: '흰색 (White & Crimson)',
    colorHex: '#DC2626',
    bgColor: '#E2EEF5', // Soft sky blue backdrop so white/crimson mascot is visually distinct
    position: '팩폭 & 사운드 효과',
    position_en: 'Blunt Truths & Sound Effects',
    intro: '적절한 추임새와 날카로운 게임 평가로 팩폭과 사운드 효과를 담당한다.',
    intro_en: 'In charge of blunt truths and sound effects, with well-timed ad-libs and sharp game verdicts.',
    mascotImage: '/mascots/romanov.png',
    abilities: [
      { name: '팩폭', name_en: 'Blunt Truths', value: 5, basis: '날카로운 게임 평가와 팩폭' },
      { name: '추임새', name_en: 'Ad-libs', value: 4, basis: '적절한 추임새와 사운드 효과' }
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
    isHomeFeatured: true, // Home Featured Hero Video!
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
    content: `안녕하세요! '애매한 삼십대' 채널을 찾아주셔서 진심으로 감사드립니다.\n\n퇴근 후 모여 게임하는 30대 친구들의 유쾌한 플레이와 티키타카를 더 쉽고 즐겁게 찾아보실 수 있도록 공식 아카이브 웹사이트를 마련했습니다.\n\n멤버별 개성과 마스코트, 게임별·멤버별 영상 탐색, 채널의 소식을 한눈에 확인하실 수 있습니다. 영상에 대한 다양한 의견과 소통은 공식 유튜브 영상의 댓글을 통해 자유롭게 남겨주세요!\n\n앞으로도 유쾌한 웃음과 핑계 가득한 게임 플레이로 찾아뵙겠습니다. 감사합니다!`,
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
