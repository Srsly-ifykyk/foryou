/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Stars, Sparkles, MessageCircleHeart } from 'lucide-react';

interface LoveJarProps {
  reasons?: string[];
  textPrimary: string;
  textSecondary: string;
}

const HUNDRED_REASONS = [
  "I love how even your “hmmm” messages somehow have emotions in them.",
  "You’ve made me stare at my phone smiling for no reason way too many times.",
  "I love when we accidentally say the same thing at the same time.",
  "Somehow even your silence feels like company to me.",
  "I love how we can switch from teasing each other to being soft in seconds.",
  "You’ve turned waiting for calls into the best part of my day.",
  "No matter how far away you are, you still feel like my person.",
  "I love how a single text from you can completely change the mood of my entire day.",
  "I love how your voice instantly calms me down even on terrible days.",
  "You’ve made “online” feel more real than people physically around me.",
  "You somehow made me emotionally attached to your typing indicator.",
  "I love how we can be cringe together without embarrassment.",
  "I miss you in the smallest moments too.",
  "You somehow make waiting for love feel worth it.",
  "Your laugh during laggy calls is still my favorite sound.",
  "You’ve made me care about “battery percentage” because of our calls.",
  "I love when you act extra soft after pretending to be mean.",
  "Your existence alone has improved my screen time and ruined my sleep schedule.",
  "Every time you get shy, my heart melts a little.",
  "You’ve turned simple phone calls into memories I’ll keep forever.",
  "I love hearing your reactions before you even say words.",
  "Somehow your attention feels better than actual gifts.",
  "You make me feel less alone no matter how far away you are.",
  "I love when we both get sleepy but refuse to end the call.",
  "You saying “stay” for two more minutes always works on me.",
  "I can literally picture your expressions while texting now.",
  "You make me laugh at my phone like a complete idiot.",
  "I love how naturally you became part of my everyday life.",
  "You’ve made me romantic in ways I never expected.",
  "Every “I’m proud of you” from you stays in my head all day.",
  "I love when you randomly become super affectionate out of nowhere.",
  "You somehow make even arguments feel full of love.",
  "I miss your presence even though I’ve never fully had it beside me yet.",
  "I love how our conversations never really feel forced.",
  "Your sleepy face on video call deserves its own fan club.",
  "You’ve made me excited for things that haven’t even happened yet.",
  "I love how you remember tiny details about me.",
  "You make me feel chosen every single day.",
  "Every time you get excited to tell me something, I fall harder.",
  "You somehow made distance feel like proof instead of a problem.",
  "You’ve become the best part of my routine.",
  "I love hearing you talk even when I barely understand what you’re saying half asleep.",
  "You make me want to experience life with you, not just talk about it.",
  "I love when we both get quiet but still don’t want to leave the call.",
  "You somehow turned waiting into another form of loving.",
  "Every plan with you feels exciting even if it’s years away.",
  "I love how safe your presence feels, even through a screen.",
  "You’ve made my heart recognize your notifications before my brain does.",
  "One day we’re going to look back at all this distance and laugh while sitting next to each other.",
  "Every “edaaa” from you instantly fixes my mood.",
  "I keep checking my phone hoping it’s your notification.",
  "Our late-night calls feel better than actual sleep.",
  "You made long distance feel less “long” somehow.",
  "I smile like an idiot whenever your name pops up.",
  "I love how we can flirt and bully each other in the same conversation.",
  "Even your “poda” sounds cute to me.",
  "I replay your voice notes way more than I should.",
  "You make me wish teleportation was real.",
  "Falling asleep on call with you feels weirdly intimate.",
  "You somehow turned my phone into my favorite place.",
  "Every random selfie you send becomes my new favorite picture.",
  "I count time based on when I’ll talk to you next.",
  "You make distance feel temporary.",
  "The way you get possessive sometimes is lowkey adorable.",
  "Your “goodnight” texts hit harder than coffee.",
  "You’re the first person I want to tell everything to.",
  "Your face after waking up >>> literally anything else.",
  "You made me addicted to checking my phone.",
  "Every call ending feels like emotional damage.",
  "I love when you randomly become extra clingy.",
  "You saying “miss me?” knowing the answer is yes.",
  "My gallery is slowly becoming your fan page.",
  "You make even silence on call feel comforting.",
  "Your jealousy is honestly cute sometimes.",
  "I could listen to you talk about absolutely nothing for hours.",
  "You’ve made my standards unrealistically high.",
  "I love how we can go from wholesome to dangerously flirty in seconds.",
  "Your sleepy “love you” sounds different.",
  "I secretly love when you demand attention.",
  "Even your tiny mood swings are cute to me.",
  "You somehow made a screen feel emotionally warm.",
  "The way you wait for my texts makes me feel wanted.",
  "I love when we accidentally stay on call till sunrise.",
  "You make “distance” feel like a small problem.",
  "You’re the only person who can distract me from everything.",
  "I love imagining our first proper hug.",
  "You somehow make waiting feel romantic.",
  "Your voice has become part of my routine.",
  "I love when you randomly get soft with me.",
  "You make me feel loved even from miles away.",
  "Your tiny “hmm” replies still have personality somehow.",
  "You make me want a future instead of just vibes.",
  "Every call with you feels too short.",
  "You’ve turned missing someone into a full-time job.",
  "I love when we accidentally match each other’s energy perfectly.",
  "You feel close to me even when you’re far away.",
  "You made me realize love can exist through a screen.",
  "I love how we make ordinary chats feel special.",
  "You’re my favorite notification, favorite call, favorite person.",
  "One day I’m finally going to hug you for all the missed moments at once."
];

export default function LoveJar({ textPrimary, textSecondary }: LoveJarProps) {
  const [activeReason, setActiveReason] = useState<string | null>(null);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [pulledCount, setPulledCount] = useState<number>(0);
  const [pulseJar, setPulseJar] = useState(false);

  const pullNote = () => {
    setPulseJar(true);
    
    // Choose a random note index
    let nextIndex = 0;
    if (HUNDRED_REASONS.length > 1) {
      do {
        nextIndex = Math.floor(Math.random() * HUNDRED_REASONS.length);
      } while (nextIndex === openedIndex);
    }

    setTimeout(() => {
      setOpenedIndex(nextIndex);
      setActiveReason(HUNDRED_REASONS[nextIndex]);
      setPulledCount(prev => prev + 1);
      setPulseJar(false);
    }, 450);
  };

  return (
    <div className="py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-8">
        <h3 className={`font-serif italic text-3.5xl md:text-5xl ${textPrimary} font-medium tracking-tight`}>
          A Hundered reasons to chose u
        </h3>
        <p className="font-sans text-stone-550 text-sm mt-3 max-w-md mx-auto leading-relaxed">
          Tap the jar to pull a random secret handwritten message.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-items-center">
        {/* Left Side: The Interactive SVG Glass Jar */}
        <div className="relative flex flex-col items-center">
          <div className="absolute bottom-6 w-36 h-8 bg-amber-200/20 rounded-full blur-xl animate-pulse" />
          
          <motion.div
            id="love-jar-body"
            onClick={pullNote}
            animate={pulseJar ? { scale: [1, 0.93, 1.05, 1], rotate: [0, -3, 3, 0] } : { scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-52 h-72 cursor-pointer relative group flex items-center justify-center p-2"
          >
            {/* The SVG Jar itself */}
            <svg 
              className="w-full h-full drop-shadow-[0_15px_30px_rgba(166,143,126,0.15)] filter"
              viewBox="0 0 200 280" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Lid/Cork Top */}
              <path d="M70 20 C70 12, 130 12, 130 20 L125 35 L75 35 Z" fill="url(#corkGrad)" stroke="#B68E56" strokeWidth="2" />
              <rect x="68" y="30" width="64" height="8" rx="3" fill="#D2A367" stroke="#9A692D" strokeWidth="1.5" />
              
              {/* Jar Neck */}
              <path d="M75 38 L125 38 L135 60 L165 90 L165 240 C165 258, 145 270, 100 270 C55 270, 35 258, 35 240 L35 90 L65 60 Z" 
                fill="url(#glassGrad)" 
                stroke="#E2E8F0" 
                strokeWidth="2.5" 
                opacity="0.9"
              />
              
              {/* Liquid gold/rose mist at bottom containing stars */}
              <ellipse cx="100" cy="225" rx="55" ry="32" fill="url(#mistGrad)" opacity="0.65" />

              {/* Glass Reflections Highlights */}
              <path d="M48 95 C48 95, 42 150, 42 220 C42 240, 52 255, 65 257" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
              <path d="M152 95 C152 95, 156 140, 156 190" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

              {/* Floating Star Elements Inside Jar */}
              <g className="animate-pulse">
                <circle cx="70" cy="180" r="3.5" fill="#EF4444" />
                <circle cx="130" cy="195" r="4.5" fill="#EC4899" />
                <circle cx="105" cy="140" r="2.5" fill="#F59E0B" />
                <circle cx="95" cy="210" r="3.5" fill="#3B82F6" />
                <circle cx="80" cy="115" r="4" fill="#10B981" />
                <circle cx="120" cy="120" r="3" fill="#8B5CF6" />
                <circle cx="135" cy="155" r="3.5" fill="#EC4899" />
              </g>

              {/* Jar Label Hanging tag */}
              <rect x="70" y="85" width="60" height="42" rx="4" fill="url(#labelGrad)" stroke="#FFAEAE" strokeWidth="1.5" />
              <line x1="100" y1="36" x2="100" y2="85" stroke="#F43F5E" strokeWidth="1" strokeDasharray="2 2" />
              
              {/* Gradient Definitions */}
              <defs>
                <linearGradient id="corkGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#DFC39D" />
                  <stop offset="100%" stopColor="#A88152" />
                </linearGradient>
                <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#EDF2F7" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.95" />
                </linearGradient>
                <radialGradient id="mistGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FB7185" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="labelGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF1F2" />
                  <stop offset="100%" stopColor="#FFE4E6" />
                </linearGradient>
              </defs>
            </svg>

            {/* Glowing Label text */}
            <div className="absolute top-[102px] flex flex-col items-center pointer-events-none">
              <span className="font-mono text-[8px] tracking-[0.2em] text-[#A68F7E]">PURE</span>
              <span className="font-serif italic text-xs font-bold text-[#5A5A40]">LOVE</span>
              <Heart className="w-2.5 h-2.5 text-[#5A5A40] fill-[#5A5A40] mt-1" />
            </div>

            {/* Glowing Star Halo around jar */}
            <div className="absolute w-52 h-52 rounded-full border border-stone-200/10 pointer-events-none flex items-center justify-center animate-spin-slow opacity-60">
              <Sparkles className="w-4 h-4 text-[#A68F7E] absolute top-4 left-4" />
              <Sparkles className="w-3.5 h-3.5 text-stone-300 absolute bottom-6 right-6" />
            </div>
          </motion.div>

          <button
            onClick={pullNote}
            className="mt-6 px-7 py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white rounded-full font-sans text-xs tracking-widest uppercase font-extrabold shadow-md hover:shadow-lg flex items-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <Stars className="w-4 h-4 animate-pulse" /> Pull a Love Note 💌
          </button>
        </div>

        {/* Right Side: Display Card for Active Note */}
        <div className="w-full max-w-sm flex items-center justify-center">
          <AnimatePresence mode="wait">
            {activeReason ? (
              <motion.div
                key={activeReason}
                initial={{ opacity: 0, x: 30, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, y: -10, scale: 0.95 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full min-h-[260px] p-8 rounded-2xl bg-gradient-to-br from-[#FFE4E6] via-[#FFF5F5] to-[#FEF3C7] border border-rose-250 shadow-md flex flex-col justify-between relative group"
              >
                {/* Floating floral watermark background inside note */}
                <div className="absolute bottom-4 right-4 text-rose-300 pointer-events-none opacity-20">
                  <Heart className="w-24 h-24 stroke-[1.5] fill-rose-200" />
                </div>

                <div className="z-10">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white font-mono text-[9px] uppercase tracking-widest font-bold shadow-xs">
                      <MessageCircleHeart className="w-3 h-3 text-white" />
                      REASON #{openedIndex !== null ? openedIndex + 1 : "?"}
                    </div>
                  </div>

                  <p className="font-serif italic text-lg leading-relaxed text-stone-900 drop-shadow-2xs">
                    "{activeReason}"
                  </p>
                </div>

                <div className="mt-8 border-t border-rose-200/50 pt-4 flex justify-between items-center z-10">
                  <span className="font-mono text-[9px] text-rose-605 uppercase tracking-widest font-extrabold">Handmade For Kanna</span>
                  <Heart className="w-4 h-4 text-rose-600 fill-rose-500" />
                </div>
              </motion.div>
            ) : (
              /* Instructions Placeholder when no note is pulled yet */
              <div className="w-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-rose-205 rounded-2xl min-h-[260px] bg-gradient-to-b from-[#FFF5F5] to-white shadow-inner">
                <Stars className="w-8 h-8 text-rose-300 animate-pulse mb-3" />
                <h4 className="font-serif italic text-rose-700 text-lg font-bold">Your jar is full of messages</h4>
                <p className="font-sans text-xs text-rose-500 mt-1 max-w-[200px]">
                  Click on the jar or the button to discover a reason why you are completely beloved!
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
