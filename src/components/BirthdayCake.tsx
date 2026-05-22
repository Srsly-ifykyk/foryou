/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';

interface BirthdayCakeProps {
  recipientName: string;
  onExtinguished: () => void;
}

export default function BirthdayCake({ recipientName, onExtinguished }: BirthdayCakeProps) {
  const [isLit, setIsLit] = useState(true);
  const [showBlowHint, setShowBlowHint] = useState(true);

  const handleBlowoutClick = () => {
    if (!isLit) return;
    setIsLit(false);
    onExtinguished();
  };

  return (
    <div className="py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-8">
        <span className="font-mono text-xs tracking-[0.25em] text-rose-500 uppercase block mb-1">Make a Wish</span>
        <h3 className="font-serif italic text-3xl md:text-4xl text-[#2D2926] font-medium tracking-tight">
          Make Your Special Birthday Wish
        </h3>
        <p className="font-sans text-stone-500 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
          Close your eyes, think of something beautiful you want for our future, and tap or click the candle to blow it out!
        </p>
      </div>

      <div className="flex flex-col items-center relative gap-8 max-w-md w-full">
        {/* Floating Stars */}
        {isLit && (
          <div className="absolute top-10 flex gap-12 pointer-events-none opacity-45">
            <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 3 }} className="text-yellow-400">
              <Star className="w-5 h-5 fill-yellow-100" />
            </motion.div>
            <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} className="text-rose-400">
              <Star className="w-4 h-4 fill-rose-100" />
            </motion.div>
          </div>
        )}

        {/* SVG Cake Display */}
        <div className="relative w-64 h-80 flex items-center justify-center">
          {/* Candle Heat Shimmer Halo */}
          <AnimatePresence>
            {isLit && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.8, 1.1, 0.8] }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="absolute top-[48px] w-16 h-16 rounded-full bg-yellow-400/40 blur-lg pointer-events-none"
              />
            )}
          </AnimatePresence>

          <svg className="w-full h-full" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Plates */}
            <ellipse cx="100" cy="210" rx="75" ry="15" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
            <ellipse cx="100" cy="206" rx="70" ry="12" fill="#F8FAFC" />

            {/* Bottom Tier (Cake Base) */}
            <path d="M40 145 C40 145, 40 195, 40 195 C40 206, 160 206, 160 195 L160 145 Z" fill="#FBCFE8" />
            <ellipse cx="100" cy="145" rx="60" ry="10" fill="#F472B6" />
            <ellipse cx="100" cy="195" rx="60" ry="10" fill="#ED4793" opacity="0.15" />

            {/* Drip Details */}
            <path d="M40 145 C50 156, 70 155, 80 145 C90 158, 110 155, 120 145 C130 158, 145 155, 160 145" stroke="#F472B6" strokeWidth="6" strokeLinecap="round" />

            {/* Happy Birthday Text Wrapped */}
            <ellipse cx="100" cy="175" rx="42" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* Candle Stand */}
            <rect x="96" y="105" width="8" height="35" rx="2" fill="url(#candleGrad)" stroke="#E2E8F0" strokeWidth="1" />
            {/* Candle Stripes */}
            <path d="M96 112 L104 116 M96 122 L104 126 M96 132 L104 136" stroke="#EF4444" strokeWidth="2.5" />
            <rect x="99" y="102" width="2" height="4" fill="#64748B" />

            {/* Floating Candles Sparks */}
            <AnimatePresence>
              {isLit ? (
                /* Interactive Flame Group */
                <g 
                  id="cake-flame"
                  onClick={handleBlowoutClick}
                  className="cursor-pointer group"
                >
                  {/* Invisible oversized pick target */}
                  <ellipse cx="100" cy="90" rx="16" ry="18" fill="transparent" />
                  
                  {/* Glowing Flame Vector */}
                  <motion.path 
                    animate={{
                      scaleY: [1, 1.15, 0.95, 1.08, 1],
                      scaleX: [1, 0.9, 1.1, 0.95, 1],
                      skewX: [0, 4, -4, 2, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      ease: "easeInOut"
                    }}
                    style={{ transformOrigin: "100px 102px" }}
                    d="M100 102 C95 102, 92 93, 100 78 C108 93, 105 102, 100 102 Z" 
                    fill="url(#flameGrad)" 
                  />
                </g>
              ) : (
                /* Gray smoke curling upward */
                <motion.g
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: [0.6, 0.2, 0], y: [-15, -45, -60], x: [0, 10, -5] }}
                  transition={{ duration: 1.8 }}
                >
                  <path d="M100 100 C102 90, 95 80, 100 70 C105 60, 95 50, 100 40" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Gradients Definitions */}
            <defs>
              <linearGradient id="candleGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#F1F5F9" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <linearGradient id="flameGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FEF08A" />
              </linearGradient>
            </defs>
          </svg>

          {/* Banner message overlay wrapped on cake */}
          <div className="absolute top-[164px] pointer-events-none text-center">
            <span className="font-serif italic font-bold text-xs text-white drop-shadow-sm select-none tracking-widest block uppercase px-4">
              {recipientName ? recipientName.split(" ").slice(-1)[0] : "SWEETIE"}
            </span>
            <span className="font-mono text-[7px] text-pink-100 uppercase tracking-widest block mt-0.5">
              Happy birthday
            </span>
          </div>

          {/* Flame Helper Callout Trigger */}
          {isLit && showBlowHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-1 px-3 py-1.5 bg-yellow-400 text-stone-900 font-sans text-[10px] tracking-wide uppercase font-bold rounded-lg shadow-md border border-yellow-200 border-b-2 border-b-yellow-500 flex items-center gap-1 cursor-pointer pointer-events-auto"
              onClick={handleBlowoutClick}
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow text-orange-600" />
              <span>Tap to Blow Cake Candle! 🎂</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
