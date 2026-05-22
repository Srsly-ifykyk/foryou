/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  ChevronDown, 
  PartyPopper,
  Undo
} from 'lucide-react';
import { BirthdayGiftConfig, DEFAULT_CONFIG, THEMES } from './types';
import WaxSealEnvelope from './components/WaxSealEnvelope';
import LoveJar from './components/LoveJar';
import BirthdayCake from './components/BirthdayCake';
import BirthdayCountdown from './components/BirthdayCountdown';
import PhotoGallery from './components/PhotoGallery';
import BirthdayMessage from './components/BirthdayMessage';

export default function App() {
  const [config, setConfig] = useState<BirthdayGiftConfig>(DEFAULT_CONFIG);
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [candleExtinguished, setCandleExtinguished] = useState(false);
  const [loveTicker, setLoveTicker] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeTheme, setActiveTheme] = useState(THEMES[0]);
  const [isBirthdayArrived, setIsBirthdayArrived] = useState(false);

  // Birthday Countdown Expiry Logic
  useEffect(() => {
    const checkCountdown = () => {
      const birthDateStr = config.birthDate || "2007-05-23";
      const now = new Date();
      const birth = new Date(birthDateStr);
      
      const target = new Date(now.getFullYear(), birth.getMonth(), birth.getDate(), 0, 0, 0);
      const diff = target.getTime() - now.getTime();
      const isToday = now.getMonth() === birth.getMonth() && now.getDate() === birth.getDate();
      
      if (diff <= 0 || isToday) {
        setIsBirthdayArrived(true);
      } else {
        setIsBirthdayArrived(false);
      }
    };

    checkCountdown();
    const interval = setInterval(checkCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.birthDate]);

  // Load configuration from local storage
  useEffect(() => {
    const saved = localStorage.getItem('amore_birthday_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
      } catch (err) {
        console.warn("Could not parse saved config:", err);
      }
    }
  }, []);

  // Sync theme configurations
  useEffect(() => {
    const theme = THEMES.find(t => t.id === config.colorTheme) || THEMES[0];
    setActiveTheme(theme);
  }, [config.colorTheme]);

  // Love Story Counter Loop
  useEffect(() => {
    const updateTicker = () => {
      const anniversary = new Date(config.anniversaryDate + "T00:00:00");
      const now = new Date();
      let diffMs = now.getTime() - anniversary.getTime();
      
      const isPast = diffMs >= 0;
      if (!isPast) {
        // If in future, just show zeros
        setLoveTicker({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const msInSecond = 1000;
      const msInMinute = msInSecond * 60;
      const msInHour = msInMinute * 60;
      const msInDay = msInHour * 24;
      const msInYear = msInDay * 365.25;

      const years = Math.floor(diffMs / msInYear);
      diffMs %= msInYear;

      const days = Math.floor(diffMs / msInDay);
      diffMs %= msInDay;

      const hours = Math.floor(diffMs / msInHour);
      diffMs %= msInHour;

      const minutes = Math.floor(diffMs / msInMinute);
      diffMs %= msInMinute;

      const seconds = Math.floor(diffMs / msInSecond);

      setLoveTicker({ years, days, hours, minutes, seconds });
    };

    updateTicker();
    const interval = setInterval(updateTicker, 1000);
    return () => clearInterval(interval);
  }, [config.anniversaryDate]);

  const handleUpdateConfig = (newConfig: BirthdayGiftConfig) => {
    setConfig(newConfig);
  };

  const handleRedeemCoupon = (couponId: string) => {
    const updatedCoupons = config.coupons.map(cop => {
      if (cop.id === couponId) {
        return { ...cop, redeemed: true, redeemedAt: new Date().toLocaleDateString() };
      }
      return cop;
    });
    const updated = { ...config, coupons: updatedCoupons };
    setConfig(updated);
    localStorage.setItem('amore_birthday_config', JSON.stringify(updated));
  };

  return (
    <div id="amore-root" className={`min-h-screen ${activeTheme.bg} transition-all duration-1000 select-none pb-24 ${activeTheme.id === 'editorial' ? 'border-[12px] md:border-[16px] border-white' : ''}`}>
      <AnimatePresence mode="wait">
        {!isBirthdayArrived ? (
          /* Beautiful Countdown Landing Screen */
          <motion.div
            key="countdown-landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center justify-center py-20 px-4 min-h-[90vh] relative overflow-hidden"
          >
            {/* Ambient glows */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-stone-100 rounded-full blur-3xl pointer-events-none opacity-40" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-stone-100 rounded-full blur-3xl pointer-events-none opacity-40" />

            {/* Dynamic header / teaser instruction */}
            <div className="text-center max-w-2xl mb-12 flex flex-col items-center relative z-10 select-none">
              <div className="flex items-center gap-2 mb-4 bg-white/40 px-3.5 py-1.5 rounded-full border border-stone-200/20 shadow-xs">
                <Heart className="w-4 h-4 text-stone-600 fill-stone-400 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-stone-500 font-extrabold">Kanna's Birthday Countdown</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-serif italic text-[#2D2926] font-bold tracking-tight leading-tight px-4">
                Something incredibly beautiful<br/>is waiting for you...
              </h2>
            </div>

            {/* Countdown card */}
            <div className="w-full max-w-2xl self-center p-4 bg-white rounded-3xl border border-stone-200 shadow-lg relative z-10 overflow-hidden">
              <BirthdayCountdown
                recipientName={config.recipientName}
                birthDate={config.birthDate || "2007-05-23"}
                textPrimary="text-[#2D2926]"
                textSecondary="text-stone-600"
                accent="bg-[#5A5A40]"
              />
            </div>
          </motion.div>
        ) : (
          /* Romantic Garden walkthrough - Main Website */
          <motion.div
            key="garden-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full"
          >
            {/* Vintage Editorial Headline Header when using high-contrast typography theme */}
            {activeTheme.id === 'editorial' && (
              <header className="max-w-5xl mx-auto px-6 pt-12 pb-6 border-b border-[#E8E1D9] flex flex-col items-center justify-center w-full mb-12">
                <div className="text-center flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-[#A68F7E] mb-1">Celebrating</span>
                  <h2 className="text-2xl font-serif italic tracking-tight text-[#5A5A40] font-bold">My Chakkara</h2>
                </div>
              </header>
            )}

            <main className="max-w-5xl mx-auto px-4 mt-8 space-y-16">
              {/* Cover Hero Board */}
              <section className="text-center py-10 flex flex-col items-center relative overflow-hidden">
                {activeTheme.id === 'editorial' && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
                    <span className="text-[320px] md:text-[400px] font-serif leading-none font-black">24</span>
                  </div>
                )}

                {activeTheme.id === 'editorial' && (
                  <div className="z-10 text-center mb-12">
                    <h1 className="text-[72px] sm:text-[100px] md:text-[140px] font-serif leading-[0.85] tracking-tighter mb-4 text-[#1A1A1A] font-extrabold">
                      Happy<br/>
                      <span className="italic font-light text-[#5A5A40]">Birthday</span>
                    </h1>
                    <div className="flex items-center justify-center gap-4 md:gap-8 mt-8">
                      <div className="w-16 md:w-24 h-[1px] bg-[#A68F7E]"></div>
                      <p className="text-sm md:text-lg font-serif italic text-[#5A5A40]">To my most favorite person in the world</p>
                      <div className="w-16 md:w-24 h-[1px] bg-[#A68F7E]"></div>
                    </div>
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className={`relative max-w-lg rounded-2xl overflow-hidden shadow-2xl border ${activeTheme.id === 'editorial' ? 'border-[#E8E1D9]' : 'border-white/60'} mb-8 aspect-[4/3] w-full z-10`}
                >
                  {/* Decorative generated cover or fallback artwork */}
                  <img
                    src="/src/assets/images/romantic_cover_1779446736252.png"
                    alt="To My Beloved Artwork"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none"
                    onError={(e) => {
                      // Safety photo fallback in case asset path conflicts
                      e.currentTarget.src = "https://picsum.photos/seed/romanticstars/800/600";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent flex items-end justify-center p-8">
                    <div className="text-center text-white">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-amber-300 block mb-1">To My Forever One</span>
                      <h2 className="font-serif italic text-2xl md:text-3xl text-white font-medium">
                        Happy Birthday, {config.recipientName.split(" ").slice(-1)[0] || "Darling"}!
                      </h2>
                    </div>
                  </div>
                </motion.div>
                
                <ChevronDown className="w-5 h-5 text-stone-400 animate-bounce mt-10" />
              </section>

              {/* Photo Gallery Section */}
              <section id="section-photo-gallery" className="w-full">
                <PhotoGallery />
              </section>

              {/* Reasons Jar */}
              <section id="section-reasons" className={`rounded-3xl border ${activeTheme.cardBg} overflow-hidden shadow-md px-4 py-8`}>
                <LoveJar
                  reasons={config.reasons}
                  textPrimary={activeTheme.textPrimary}
                  textSecondary={activeTheme.textSecondary}
                />
              </section>

              {/* Sincere Birthday Message Section */}
              <section id="section-birthday-message" className={`rounded-3xl border ${activeTheme.cardBg} overflow-hidden shadow-md px-4 py-8`}>
                <BirthdayMessage
                  recipientName={config.recipientName}
                  senderName={config.senderName}
                />
              </section>

              {/* Interactive Wish/Cake and letter reveal */}
              <section id="section-wishes" className={`rounded-3xl border ${activeTheme.cardBg} overflow-hidden shadow-md px-6 py-12 flex flex-col items-center relative`}>
                {!candleExtinguished ? (
                  <BirthdayCake
                    recipientName={config.recipientName}
                    onExtinguished={() => setCandleExtinguished(true)}
                  />
                ) : (
                  /* Center-aligned simplified Wish Unleashed card */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", damping: 18 }}
                    className="max-w-2xl w-full text-center flex flex-col items-center py-10"
                  >
                    <div className="flex gap-2 text-yellow-500 mb-6 scale-110">
                      <PartyPopper className="w-8 h-8 text-pink-500 animate-bounce" />
                      <Sparkles className="w-8 h-8 text-amber-500 animate-spin-slow" />
                      <PartyPopper className="w-8 h-8 text-pink-500 animate-bounce" />
                    </div>

                    <h3 className={`font-serif italic text-3xl md:text-5xl ${activeTheme.textPrimary} font-bold tracking-tight leading-relaxed px-4 select-text`}>
                      Your wish Unleashed, may al you dreas come true my love..
                    </h3>

                    {/* Relight secret button */}
                    <button
                      onClick={() => setCandleExtinguished(false)}
                      className="mt-10 text-stone-400 hover:text-rose-500 focus:outline-none transition-all flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-bold cursor-pointer"
                    >
                      <Undo className="w-3.5 h-3.5" />
                      Relight Candle
                    </button>
                  </motion.div>
                )}
              </section>

              {/* Simple Centered Birthday Footer */}
              <footer className="py-16 border-t border-[#E8E1D9] flex flex-col items-center justify-center text-center w-full mt-12 col-span-full">
                <span className="font-serif italic text-2xl md:text-3.5xl text-[#5A5A40] font-bold tracking-wide">
                  HAPPY BIRTHDAY CHAKKARE! ❤️
                </span>
              </footer>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
