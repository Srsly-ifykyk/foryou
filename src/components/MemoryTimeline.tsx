/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, ChevronLeft, ChevronRight, Heart, Sparkles, Upload } from 'lucide-react';
import { Memory } from '../types';

interface MemoryTimelineProps {
  memories: Memory[];
  textPrimary: string;
  textSecondary: string;
}

export default function MemoryTimeline({ memories, textPrimary, textSecondary }: MemoryTimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextMemory = () => {
    setActiveIndex((prev) => (prev + 1) % memories.length);
  };

  const prevMemory = () => {
    setActiveIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const activeMemory = memories[activeIndex] || memories[0];

  return (
    <div className="py-12 px-2 flex flex-col items-center">
      {/* Main Interactive Carousel/Card Board */}
      <div className="w-full max-w-2xl relative flex flex-col items-center">
        {/* Navigation Arrows */}
        <div className="absolute top-[40%] -translate-y-1/2 left-0 md:-left-12 z-20">
          <button
            onClick={prevMemory}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-stone-250/20 flex items-center justify-center text-stone-700 hover:text-rose-500 hover:bg-white active:scale-95 transition-all"
            aria-label="Previous Memory"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-[40%] -translate-y-1/2 right-0 md:-right-12 z-20">
          <button
            onClick={nextMemory}
            className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-stone-250/20 flex items-center justify-center text-stone-700 hover:text-rose-500 hover:bg-white active:scale-95 transition-all"
            aria-label="Next Memory"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Polaroid frame element */}
        <div className="w-full max-w-sm px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMemory?.id}
              initial={{ opacity: 0, rotate: -3, scale: 0.95 }}
              animate={{ opacity: 1, rotate: activeIndex % 2 === 0 ? 1 : -1, scale: 1 }}
              exit={{ opacity: 0, rotate: 3, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-4 pb-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-stone-100 relative group overflow-hidden"
            >
              {/* Gloss shine reflection overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none z-10 transition-transform duration-1000 group-hover:translate-x-full" />

              {/* Pin Accent */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow shadow-rose-950/20" />
                <div className="w-1 h-3 bg-stone-300 -mt-1 opacity-60" />
              </div>

              {/* Polaroid Photo Box */}
              <div className="w-full aspect-square bg-stone-50 rounded-xs overflow-hidden relative border border-stone-200/40 shadow-inner">
                {activeMemory?.imageUrl ? (
                  <img
                    src={activeMemory.imageUrl}
                    alt={activeMemory.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 bg-stone-100">
                    <Heart className="w-8 h-8 opacity-40 animate-pulse text-rose-300" />
                    <span className="font-mono text-[10px] mt-2 tracking-widest uppercase">Love Captured Here</span>
                  </div>
                )}
                
                {/* Visual lens flair/glimmer effect */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/10 blur-md group-hover:scale-150 transition-all duration-700" />
                
                {/* Floating Date Badge */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-rose-300" />
                  {activeMemory?.date}
                </div>
              </div>

              {/* Polaroid Signature/Caption Area */}
              <div className="pt-5 text-center px-2">
                <h4 className="font-serif italic text-xl text-stone-800 tracking-wide flex items-center justify-center gap-1.5">
                  {activeMemory?.title}
                  <Heart className="w-3.5 h-3.5 text-rose-450 fill-rose-100/50 inline" />
                </h4>
                <p className="font-sans text-xs text-stone-600 mt-2.5 leading-relaxed font-normal italic">
                  "{activeMemory?.description}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicators */}
        <div className="flex gap-2.5 mt-8 justify-center">
          {memories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-6 bg-rose-500 shadow-sm' : 'w-2.5 bg-stone-300/65 hover:bg-stone-400'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
