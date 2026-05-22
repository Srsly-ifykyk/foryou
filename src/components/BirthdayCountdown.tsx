/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Sparkles, Gift, PartyPopper } from 'lucide-react';

interface BirthdayCountdownProps {
  recipientName: string;
  birthDate: string; // "YYYY-MM-DD" e.g., "2007-05-23"
  textPrimary: string;
  textSecondary: string;
  accent: string;
}

export default function BirthdayCountdown({
  recipientName,
  birthDate,
  textPrimary,
  textSecondary,
  accent
}: BirthdayCountdownProps) {
  // Calculate next birthday occurrence in 2026 (or subsequent years if past)
  const getNextBirthday = () => {
    const today = new Date();
    const birth = new Date(birthDate);
    
    // Set target to this year's birthday
    const target = new Date(today.getFullYear(), birth.getMonth(), birth.getDate(), 0, 0, 0);
    
    // If her birthday already passed this year, set target to next year
    if (today.getTime() > target.getTime() + 24 * 60 * 60 * 1000) {
      target.setFullYear(today.getFullYear() + 1);
    }
    return target;
  };

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const nextBirthday = getNextBirthday();
    return nextBirthday.getFullYear() - birth.getFullYear();
  };

  const [targetDate, setTargetDate] = useState(getNextBirthday());
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: false });
  const [age, setAge] = useState(calculateAge());

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      
      const isToday = now.getMonth() === new Date(birthDate).getMonth() && 
                      now.getDate() === new Date(birthDate).getDate();

      if (diff <= 0 || isToday) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 2, isBirthday: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate, birthDate]);

  return (
    <div className="py-10 px-4 flex flex-col items-center">
      <div className="text-center mb-8">
        <h3 className={`font-serif italic text-3xl md:text-5xl ${textPrimary} font-medium tracking-tight`}>
          {timeLeft.isBirthday ? `It's Kanna's Special Day! 🌸` : `Counting Every Second Until Your Birthday`}
        </h3>
        <p className="font-sans text-stone-500 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
          {timeLeft.isBirthday 
            ? `May your 19th birthday filled with absolute wonder, warmth, and laughter. You deserve the entire universe and more!`
            : `Every day feels like a celebration with you, but tomorrow we officially celebrate the day the world was blessed with your warmth.`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {timeLeft.isBirthday ? (
          <motion.div
            key="birthday-celebration"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="w-full max-w-xl bg-[#5A5A40]/10 border border-[#5A5A40]/25 rounded-2xl p-8 text-center flex flex-col items-center relative overflow-hidden"
          >
            {/* Visual sparkle decorations */}
            <div className="absolute top-4 left-4 text-amber-500 animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="absolute bottom-4 right-4 text-amber-500 animate-pulse delay-500">
              <Sparkles className="w-5 h-5" />
            </div>

            <div className="w-16 h-16 rounded-full bg-[#5A5A40] flex items-center justify-center text-[#FAF7F2] mb-4 shadow-md animate-bounce">
              <PartyPopper className="w-8 h-8" />
            </div>

            <h4 className="font-serif italic text-2xl md:text-3xl text-[#2D2926] font-bold">
              Happy 19th Birthday, {recipientName}!
            </h4>
            <p className="font-sans text-stone-600 text-sm mt-2 max-w-md">
              Kanna, you officially turn {age} years old today, May 23rd! May this year bring you as much light and happiness as you bring to everyone daily.
            </p>

            <div className="mt-6 flex gap-2">
              <div className="h-2 w-2 rounded-full bg-[#A68F7E] animate-ping" />
              <div className="h-2 w-2 rounded-full bg-[#5A5A40] animate-ping delay-150" />
              <div className="h-2 w-2 rounded-full bg-[#D1C2B4] animate-ping delay-300" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="countdown-active"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl flex flex-col items-center"
          >
            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-3 md:gap-5 w-full">
              {[
                { val: timeLeft.days, label: "Days", sub: "to go" },
                { val: timeLeft.hours, label: "Hours", sub: "left" },
                { val: timeLeft.minutes, label: "Minutes", sub: "remaining" },
                { val: timeLeft.seconds, label: "Seconds", sub: "tick" }
              ].map((cell, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FAF7F2] border border-[#E8E1D9] hover:border-[#A68F7E]/50 transition-colors p-3 md:p-6 rounded-xl flex flex-col items-center shadow-xs"
                >
                  <span className="font-serif text-3xl md:text-5xl font-black text-[#2D2926] tracking-tight block md:mb-1 tabular-nums">
                    {String(cell.val).padStart(2, '0')}
                  </span>
                  <span className="font-sans text-[10px] md:text-xs font-bold text-[#A68F7E] uppercase tracking-widest block">
                    {cell.label}
                  </span>
                  <span className="font-mono text-[8px] text-stone-400 uppercase tracking-wider block mt-0.5">
                    {cell.sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtext description */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]"></div>
              <span className="font-serif italic text-stone-600 text-sm">
                "Kanna turns {age} on May 23rd, 2026. Ready to make a wish?"
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
