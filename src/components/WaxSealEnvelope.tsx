/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

interface WaxSealEnvelopeProps {
  recipientName: string;
  senderName: string;
  onOpen: () => void;
}

export default function WaxSealEnvelope({ recipientName, senderName, onOpen }: WaxSealEnvelopeProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpenAttempted, setIsOpenAttempted] = useState(false);

  const handleOpen = () => {
    setIsOpenAttempted(true);
    
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative bg-radial from-[#FAF7F2] via-stone-50 to-[#E8E1D9]/30">
      {/* Decorative dreamy floating elements in background */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#A68F7E]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#5A5A40]/10 rounded-full blur-3xl animate-pulse delay-700" />
      
      <div className="max-w-xl w-full flex flex-col items-center">
        {/* Subtle greeting overlay */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-[#A68F7E] uppercase block mb-2">A Digital Gift For Someone Special</span>
          <h2 className="font-serif italic font-medium text-3xl tracking-tight text-[#2D2926]">
            Celebrating My Chakkara
          </h2>
        </motion.div>

        {/* Envelope Container */}
        <motion.div
          id="wax-envelope"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full relative cursor-pointer"
          onClick={handleOpen}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Envelope Body with soft paper shadow texture */}
          <motion.div 
            animate={isOpenAttempted ? { y: 200, opacity: 0, scale: 0.9 } : {}}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`w-full aspect-[4/3] rounded-2xl relative shadow-[0_25px_60px_-15px_rgba(166,143,126,0.15)] bg-[#FAF7F2] border border-[#E8E1D9] overflow-hidden flex flex-col items-center justify-center p-8 transition-all duration-500 ${isHovered ? 'shadow-[0_30px_70px_-5px_rgba(166,143,126,0.22)] border-[#A68F7E]' : ''}`}
          >
            {/* Geometric Lines simulating paper folds */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
            
            {/* Fold line visual - Triangles represent flaps */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#A68F7E]/30 fill-none stroke-1" viewBox="0 0 500 375">
              <path d="M 0 0 L 250 160 L 500 0" />
              <path d="M 0 375 L 190 190" />
              <path d="M 500 375 L 310 190" />
            </svg>

            {/* Inner Letter Peek */}
            <motion.div 
              animate={isHovered ? { y: -8 } : { y: 0 }}
              className="w-[85%] h-24 bg-white rounded-t-lg shadow-inner absolute top-6 border border-[#E8E1D9]/40 flex flex-col items-center pt-4 px-6 pointer-events-none"
            >
              <div className="w-12 h-1 bg-[#FAF7F2] rounded mb-2" />
              <div className="w-full h-1 bg-[#E8E1D9]/20 rounded mb-1" />
              <div className="w-2/3 h-1 bg-[#E8E1D9]/20 rounded" />
            </motion.div>

            {/* Content center front */}
            <div className="z-10 text-center flex flex-col items-center mt-6">
              <Heart className="w-8 h-8 text-[#5A5A40] mb-2 fill-[#FAF7F2] animate-heartbeat" />
              <p className="font-serif italic text-2xl text-[#2D2926] tracking-wide">
                Dear {recipientName || "Chakkara"}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#A68F7E] mt-4">
                Handcrafted with love by {senderName || "Your Special Person"}
              </p>
            </div>

            {/* Wax Seal Wax Stamp & Ribbon */}
            <div className="absolute bottom-1/2 translate-y-12 flex items-center justify-center z-20">
              {/* Vertical ribbons */}
              <div className="absolute w-8 h-32 bg-gradient-to-b from-[#A68F7E]/80 to-[#5A5A40]/80 -top-16 shadow-md rounded-t-sm" />
              <div className="absolute w-32 h-8 bg-gradient-to-r from-[#A68F7E]/80 to-[#5A5A40]/80 -left-16 shadow-md rounded-l-sm" />

              {/* The seal stamp */}
              <motion.div
                animate={isHovered ? { scale: 1.08, rotate: [0, -5, 5, 0] } : { scale: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#A68F7E] via-[#5A5A40] to-stone-700 shadow-[0_5px_15px_-3px_rgba(90,90,64,0.4)] border-2 border-white/60 flex items-center justify-center cursor-pointer relative"
              >
                {/* Wax seal outer edge ring */}
                <div className="absolute inset-1 rounded-full border border-white/35 font-serif font-black flex items-center justify-center select-none text-[#FAF7F2] text-lg">
                  ❦
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Letter Slide Out animation when clicked */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isOpenAttempted ? { y: 0, opacity: 1, scale: 1.05 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-white shadow-2xl rounded-2xl p-8 border border-[#E8E1D9]/40 flex flex-col justify-center items-center pointer-events-none z-30"
          >
            <Sparkles className="w-8 h-8 text-[#A68F7E] animate-spin-slow mb-4" />
            <h3 className="font-serif italic text-3xl text-[#2D2926]">Unveiling Love...</h3>
          </motion.div>
        </motion.div>

        {/* Floating Instruction */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mt-8 pointer-events-none text-center"
        >
          {isOpenAttempted ? "Unfolding your gift..." : "✦ Click the wax seal to open ✦"}
        </motion.p>
      </div>
    </div>
  );
}
