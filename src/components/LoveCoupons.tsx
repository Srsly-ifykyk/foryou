/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, CheckCircle2, Copy, Sparkles, Heart } from 'lucide-react';
import { Coupon } from '../types';
import { MusicBox } from '../utils/acoustic';

interface LoveCouponsProps {
  coupons: Coupon[];
  onRedeem: (couponId: string) => void;
  textPrimary: string;
}

export default function LoveCoupons({ coupons, onRedeem, textPrimary }: LoveCouponsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleRedeem = (id: string) => {
    onRedeem(id);
    MusicBox.celebrateSwell();
  };

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="py-12 px-4 flex flex-col items-center">
      <div className="text-center mb-10">
        <span className="font-mono text-xs tracking-[0.25em] text-rose-500 uppercase block mb-1">Chapter III</span>
        <h3 className={`font-serif italic text-3xl md:text-4xl ${textPrimary} font-medium`}>
          Your Personal Treasury of Love
        </h3>
        <p className="font-sans text-stone-500 text-sm mt-2 max-w-sm mx-auto">
          Presenting four bespoke, non-expiring love coupons. Redeem them whenever you need a lazy morning or a warm hug.
        </p>
      </div>

      {/* Grid of Coupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {coupons.map((coupon) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative overflow-hidden h-52 bg-white ${coupon.redeemed ? 'border-dashed border-stone-200/80 shadow-inner' : 'border-rose-100/60 shadow-[0_12px_30px_rgba(251,113,133,0.05)]'}`}
          >
            {/* Visual cutouts representing classic raw tickets */}
            <div className="absolute top-[40%] -left-3 w-5 h-5 bg-radial from-transparent to-stone-50 border border-stone-100 rounded-full" />
            <div className="absolute top-[40%] -right-3 w-5 h-5 bg-radial from-transparent to-stone-50 border border-stone-100 rounded-full" />

            {/* Decorative Golden Stars if active */}
            {!coupon.redeemed && (
              <div className="absolute top-2 right-2 text-rose-300">
                <Heart className="w-3.5 h-3.5 fill-rose-50" />
              </div>
            )}

            <div>
              {/* Header */}
              <div className="flex items-center gap-3">
                <span className="text-3xl filter drop-shadow]" role="img" aria-label="emoji">
                  {coupon.emoji}
                </span>
                <div>
                  <h4 className="font-serif italic text-lg leading-tight text-stone-850 font-medium pr-1">
                    {coupon.title}
                  </h4>
                  <span className="font-mono text-[8px] text-rose-400 font-bold uppercase tracking-widest mt-1 block">
                    No-Expiration Guarantee
                  </span>
                </div>
              </div>

              {/* Sub-text */}
              <p className="font-sans text-xs text-stone-500 mt-4 leading-relaxed line-clamp-2">
                {coupon.description}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-4 border-t border-dotted border-stone-100 pt-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-stone-400">
                <span>CODE:</span>
                <span className="font-bold text-stone-750 bg-stone-50 px-1.5 py-0.5 rounded border border-stone-100">
                  {coupon.code}
                </span>
                <button
                  onClick={() => copyCode(coupon.code, coupon.id)}
                  className="p-1 hover:text-rose-500 transition-colors"
                  title="Copy Coupon Code"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>

              {coupon.redeemed ? (
                /* REDEEMED badge */
                <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-sans text-[10px] font-bold uppercase tracking-wider border border-emerald-100">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Redeemed 💖
                </div>
              ) : (
                /* REDEEM action */
                <button
                  onClick={() => handleRedeem(coupon.id)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white rounded-full font-sans text-[10px] tracking-wider uppercase font-bold shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 transition-all cursor-pointer"
                >
                  Claim Token
                </button>
              )}
            </div>

            {/* Redeposit visual copy trigger overlay indicator */}
            {copiedId === coupon.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-x-0 bottom-12 mx-auto w-fit px-3 py-1 bg-stone-900 border border-stone-850/80 rounded-full text-white text-[9px] font-mono tracking-widest uppercase shadow-md flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-300" /> Code Copied!
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
