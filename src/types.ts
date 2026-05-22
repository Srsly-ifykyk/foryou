/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Memory {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Coupon {
  id: string;
  title: string;
  description: string;
  emoji: string;
  code: string;
  redeemed: boolean;
  redeemedAt?: string;
}

export interface BirthdayGiftConfig {
  recipientName: string;
  senderName: string;
  anniversaryDate: string; // YYYY-MM-DD
  birthDate: string; // YYYY-MM-DD
  colorTheme: string; // e.g., "blush", "amber", "midnight", "rosewood"
  reasons: string[];
  memories: Memory[];
  coupons: Coupon[];
  loveLetter: string;
}

export const THEMES = [
  {
    id: "editorial",
    name: "Editorial Bold",
    bg: "bg-[#FAF7F2]",
    cardBg: "bg-white border-[#E8E1D9] shadow-[0_12px_40px_rgba(166,143,126,0.1)] border-t-[6px] border-t-[#5A5A40]",
    textPrimary: "text-[#2D2926] font-bold tracking-tight",
    textSecondary: "text-[#A68F7E] font-medium tracking-wide",
    accent: "bg-[#5A5A40] hover:bg-[#43432F] text-[#FAF7F2] shadow-sm tracking-[0.15em] font-bold uppercase",
    accentBorder: "border-[#E8E1D9]",
    accentText: "text-[#5A5A40]",
    accentLight: "bg-[#F0EBE5]",
    ring: "focus:ring-[#A68F7E]",
  },
  {
    id: "blush",
    name: "Rose Blush",
    bg: "bg-radial from-rose-50/50 via-slate-50 to-rose-100/30",
    cardBg: "backdrop-blur-xl bg-white/70 border-rose-100/50 shadow-rose-100/30",
    textPrimary: "text-rose-900",
    textSecondary: "text-rose-700/80",
    accent: "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200",
    accentBorder: "border-rose-200",
    accentText: "text-rose-500",
    accentLight: "bg-rose-50",
    ring: "focus:ring-rose-200",
  },
  {
    id: "amber",
    name: "Champagne Gold",
    bg: "bg-radial from-amber-50/50 via-slate-50 to-amber-100/20",
    cardBg: "backdrop-blur-xl bg-white/70 border-amber-100/40 shadow-amber-50",
    textPrimary: "text-amber-950",
    textSecondary: "text-amber-800/80",
    accent: "bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200",
    accentBorder: "border-amber-200",
    accentText: "text-amber-600",
    accentLight: "bg-amber-50/60",
    ring: "focus:ring-amber-200",
  },
  {
    id: "midnight",
    name: "Midnight Stellar",
    bg: "bg-radial from-slate-900 via-zinc-950 to-purple-950/40",
    cardBg: "backdrop-blur-xl bg-slate-900/80 border-slate-800/80 shadow-slate-950/40",
    textPrimary: "text-slate-100",
    textSecondary: "text-slate-400",
    accent: "bg-purple-500 hover:bg-purple-600 text-white shadow-purple-950/50",
    accentBorder: "border-purple-800",
    accentText: "text-purple-400",
    accentLight: "bg-purple-950/30",
    ring: "focus:ring-purple-900",
  },
  {
    id: "rosewood",
    name: "Crimson Velvet",
    bg: "bg-radial from-rose-950 via-neutral-950 to-stone-900",
    cardBg: "backdrop-blur-xl bg-neutral-900/80 border-rose-950/40 shadow-rose-950/50",
    textPrimary: "text-rose-100",
    textSecondary: "text-rose-300/80",
    accent: "bg-rose-700 hover:bg-rose-800 text-white shadow-rose-900/50",
    accentBorder: "border-rose-900/50",
    accentText: "text-rose-400",
    accentLight: "bg-rose-950/40",
    ring: "focus:ring-rose-800",
  }
];

export const DEFAULT_CONFIG: BirthdayGiftConfig = {
  recipientName: "Kanna",
  senderName: "Your Favorite Person",
  anniversaryDate: "2023-09-04",
  birthDate: "2007-05-21",
  colorTheme: "editorial",
  reasons: [
    "The cute tiny scrunch your nose makes when you smile or laugh.",
    "Your pure, incredibly kind heart that makes everyone around you feel warm and safe.",
    "The way you remember the small details about everything I tell you.",
    "How you can completely light up my darkest days just by existing.",
    "Your passion, drive, and the inspiring way you chase after your dreams.",
    "The beautiful, comfortable silence that we can share together card-to-card.",
    "Your silly dances in the kitchen when you think nobody is watching.",
    "The absolute warmth and security I feel whenever we hold hands.",
    "How proud you are of me and how you always encourage me to be myself.",
    "The sparkle in your eyes when we talk about our dreams for the future."
  ],
  memories: [
    {
      id: "mem-1",
      date: "Nov 20, 2023",
      title: "The First Hello",
      description: "That cold evening when we first met at the cozy bookstore café. You ordered a vanilla latte and spilled a little on your scarf, and my heart instantly skipped a beat of absolute adoration.",
      imageUrl: "https://picsum.photos/seed/cozycafe/800/600"
    },
    {
      id: "mem-2",
      date: "Feb 14, 2024",
      title: "Under the Soft Rain",
      description: "Our chaotic walk under a single, tiny, broken umbrella. Instead of complaining, we literally ran through the puddles laughing, soaking wet, and ate lukewarm pizza on the steps.",
      imageUrl: "https://picsum.photos/seed/rainywalk/800/600"
    },
    {
      id: "mem-3",
      date: "Aug 15, 2025",
      title: "Golden Hour Stargazing",
      description: "Laying on a warm plaid blanket on top of the hill, watching the sky change from orange cream to deep celestial velvet. We made three wishes, and they were all about each other.",
      imageUrl: "https://picsum.photos/seed/stargazing/800/600"
    }
  ],
  coupons: [
    {
      id: "coup-1",
      title: "Chef's Special Candlelit Dinner",
      description: "Valid for one complete, hand-prepared dinner by yours truly, complete with a customized menu, soft lighting, and your choice of music. Guaranteed service!",
      emoji: "🕯️",
      code: "AMORE-DINNER-YES",
      redeemed: false
    },
    {
      id: "coup-2",
      title: "Cloud Nine Head & Shoulder Massage",
      description: "A professional-level, completely relaxing 45-minute massage sequence using organic lavender oils. Perfect for after a long, exhausting day.",
      emoji: "💆‍♀️",
      code: "AMORE-MASSAGE-RELAX",
      redeemed: false
    },
    {
      id: "coup-3",
      title: "Unconditional 'You Are Right' Pass",
      description: "Instantly win any minor, playful argument without hesitation or debate. Can be flashed dramatically at a moment's notice. Use wisely!",
      emoji: "👑",
      code: "AMORE-WINNER-PASS",
      redeemed: false
    },
    {
      id: "coup-4",
      title: "Daylong Breakfast in Bed & Movie Marathon",
      description: "Includes warm blueberry pancakes, fresh orange juice, and a hands-free remote control of the TV. You are strictly forbidden from leaving the covers.",
      emoji: "🥞",
      code: "AMORE-LAZY-SUNDAY",
      redeemed: false
    }
  ],
  loveLetter: `My Dearest Kanna,

Today is the day the world became an infinitely brighter, kinder, and more beautiful place.

Looking back at our journey, every single day spent beside you feels like a quiet masterpiece. You have this magical way of turning ordinary moments into memories I will cherish for the rest of my life. Your laughter is my absolute favorite sound, and your happiness is my guiding light.

I hope your 19th birthday brings you even a fraction of the sheer joy and peace that you bring into my life every single day. I want to celebrate not just today, but every day that I am lucky enough to walk beside you.

Happy Birthday, my love. Today, tomorrow, and forever.

Yours always,
x`
};
