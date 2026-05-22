/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Quote, PenTool } from 'lucide-react';

interface BirthdayMessageProps {
  recipientName: string;
  senderName: string;
}

export default function BirthdayMessage({ recipientName, senderName }: BirthdayMessageProps) {
  return (
    <div className="py-12 px-4 flex flex-col items-center relative overflow-hidden">
      {/* Editorial Decorative Background Symbols */}
      <div className="absolute top-10 left-10 text-[#5A5A40]/10 font-serif text-8xl pointer-events-none select-none">
        “
      </div>
      <div className="absolute bottom-10 right-10 text-[#5A5A40]/10 font-serif text-8xl pointer-events-none select-none">
        ”
      </div>

      <div className="text-center mb-10">
        <span className="font-mono text-xs tracking-[0.25em] text-[#A68F7E] uppercase block mb-1">
          Chapter III / Handwritten Letter
        </span>
        <h3 className="font-serif italic text-3.5xl md:text-5xl text-[#2D2926] font-medium tracking-tight">
          A Message from My Heart to Yours
        </h3>
      </div>

      {/* Styled Letter Stationery Board */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white border border-[#E8E1D9] rounded-2xl shadow-[0_20px_50px_rgba(166,143,126,0.12)] p-8 md:p-14 relative overflow-hidden"
      >
        {/* Editorial Top Border Accent */}
        <div className="absolute top-0 inset-x-0 h-[6px] bg-[#5A5A40]" />
        
        {/* Notebook Lines Decorative Style Background */}
        <div className="absolute left-[30px] md:left-[50px] top-0 bottom-0 w-[1px] bg-red-100 opacity-60" />

        <div className="pl-6 md:pl-10 relative z-10">
          {/* Letter Timestamp Header */}
          <div className="flex justify-between items-baseline mb-10 pb-4 border-b border-[#F0EBE5]">
            <div className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-[#A68F7E]" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#A68F7E] font-bold">
                May 23rd, 2026
              </span>
            </div>
          </div>

          {/* Salutation */}
          <h4 className="font-serif italic text-2xl text-[#2D2926] font-bold mb-6">
            To my beautiful Kanna,
          </h4>

          {/* Body Paragraphs */}
          <div className="space-y-6 font-serif text-[15px] md:text-[16px] leading-relaxed text-stone-850 whitespace-pre-wrap select-text antialiased">
            <p className="font-bold">
              Happy 19th Birthday, my love.
            </p>
            <p>
              I don’t even know how to start this without smiling because it’s always you that does that to me. Long distance is supposed to feel heavy, but with you it somehow feels like I’m just waiting for the next moment you show up on my screen. Like my whole day is just time passing until I get you again in some form voice message, call, text, anything
            </p>
            <p>
              I love the small things more than I ever thought I would. Your “edaaa” when you’re annoyed, your random “what are you doing” texts, the way you pretend you don’t miss me but still somehow always stay a little longer on call. I love how we can be absolute idiots together and still end up talking like we’re the only two people who exist
            </p>
            <p>
              I miss you in the stupidest ways too. Like I’ll hear something funny and instantly want to send it to you. Or I’ll see something random and think you’d laugh at it before I even process it myself. Even silence feels different now because I got used to filling it with you
            </p>
            <p>
              And yeah, I won’t act innocent about it, I love the way you are too. The cute jealousy, the way you get soft when you’re sleepy, the way your voice drops when you’re tired and suddenly I forget what I was even saying. I love how you act all tough but melt so easily when I give you attention. It’s honestly unfair how easily you pull me in without even trying
            </p>
            <p>
              I’m not even going to pretend I’m not addicted to you. Your calls are my favorite place, your voice is my favorite sound, and your attention is my favorite feeling. Even when we fight or tease each other, I still end up smiling because it’s you
            </p>
            <p>
              Sometimes I just sit there thinking about how crazy it is that someone so far away can feel this close. And then I realize it’s not really distance that matters, it’s you. You made your way into everything I do
            </p>
            <p>
              I want all of it with you. The late night calls where neither of us wants to hang up, the random selfies, the stupid fights, the making up, the future plans we joke about but secretly mean. I want the real version of you too not just the screen version
            </p>
            <p>
              And one day when I finally get to see you for real, I already know I’m going to hold on a little longer than I’m supposed to, just because I can
            </p>
            <p className="italic font-bold text-[#5A5A40]">
              Until then, just know you’re my favorite person in the loudest, softest, most annoying, most beautiful way possible. And I’m not planning on changing that anytime soon
            </p>
          </div>

          {/* Valediction */}
          <div className="mt-12 pt-6 border-t border-[#F0EBE5] flex justify-between items-end">
            <div className="flex items-center gap-1.5 text-[#5A5A40]/40">
              <Heart className="w-5 h-5 fill-current animate-pulse text-[#5A5A40]/30" />
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
            <div className="text-right">
              <p className="font-sans text-[9px] text-[#A68F7E] uppercase tracking-[0.2em] font-extrabold">
                Handwritten with Love
              </p>
              <p className="font-serif italic text-2xl font-black text-[#5A5A40] mt-1">
                Your Ice Cream
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
