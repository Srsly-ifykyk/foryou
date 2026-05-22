/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X, Plus, Trash2, Save, Sparkles, Heart, Check, HelpCircle, Eye } from 'lucide-react';
import { BirthdayGiftConfig, THEMES } from '../types';

interface CustomizerDrawerProps {
  config: BirthdayGiftConfig;
  onUpdate: (newConfig: BirthdayGiftConfig) => void;
}

type TabType = 'general' | 'reasons' | 'memories' | 'coupons' | 'letter';

export default function CustomizerDrawer({ config, onUpdate }: CustomizerDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [tempConfig, setTempConfig] = useState<BirthdayGiftConfig>({ ...config });
  const [newReason, setNewReason] = useState("");
  const [savedFeedback, setSavedFeedback] = useState(false);

  const handleFieldChange = (key: keyof BirthdayGiftConfig, value: any) => {
    const updated = { ...tempConfig, [key]: value };
    setTempConfig(updated);
    onUpdate(updated); // Live preview updates
  };

  const handleNestedFieldChange = (field: 'memories' | 'coupons', index: number, key: string, value: any) => {
    const arr = [...(tempConfig[field] as any[])];
    arr[index] = { ...arr[index], [key]: value };
    const updated = { ...tempConfig, [field]: arr };
    setTempConfig(updated);
    onUpdate(updated);
  };

  const handleAddReason = () => {
    if (!newReason.trim()) return;
    const reasons = [...tempConfig.reasons, newReason.trim()];
    setNewReason("");
    handleFieldChange('reasons', reasons);
  };

  const handleRemoveReason = (index: number) => {
    const reasons = tempConfig.reasons.filter((_, i) => i !== index);
    handleFieldChange('reasons', reasons);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('amore_birthday_config', JSON.stringify(tempConfig));
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
    }, 2800);
  };

  const resetToDefault = () => {
    if (window.confirm("Are you sure you want to reset everything back to the beautiful romance defaults? All custom edits will be cleared.")) {
      localStorage.removeItem('amore_birthday_config');
      window.location.reload();
    }
  };

  return (
    <>
      {/* Floating Gear Button to open customizer panel */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 pointer-events-auto">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-stone-900 border border-stone-850 hover:bg-stone-800 text-amber-400 shadow-xl flex items-center justify-center cursor-pointer transition-all-colors z-50 group"
          title="Personalize Kanna's Gift"
        >
          <Settings className="w-5 h-5 animate-spin-slow group-hover:text-rose-400" />
        </motion.button>
        <span className="bg-stone-900 text-stone-100 font-sans text-[10px] tracking-wide uppercase px-2.5 py-1 rounded-md border border-stone-800 shadow-md pointer-events-none opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity">
          Personalize Gift
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Lock */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-stone-950 z-50"
            />

            {/* Sliding Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 23, stiffness: 140 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-stone-50 text-stone-800 shadow-[0_0_50px_rgba(0,0,0,0.35)] z-50 flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-stone-200 bg-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-white">
                    <Heart className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <h4 className="font-serif italic font-bold text-stone-900 text-lg">Bespoke Creator Room</h4>
                    <p className="font-mono text-[9px] uppercase tracking-widest text-stone-400">Personalize Her Experience Live</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-stone-100 text-stone-400 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Tabs Scrollbar */}
              <div className="flex items-center overflow-x-auto border-b border-stone-200 bg-white/70 px-4 py-1 gap-1">
                {(['general', 'reasons', 'memories', 'coupons', 'letter'] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-2 text-[10px] uppercase font-mono tracking-widest border-b-2 font-bold whitespace-nowrap transition-all duration-200 ${activeTab === tab ? 'border-rose-500 text-rose-600 font-semibold' : 'border-transparent text-stone-500 hover:text-stone-700'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Drawer Body Area (Scrollable contents based on tab) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Save Feedback Toast inline of customizer */}
                {savedFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs leading-relaxed font-sans flex items-center gap-2"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Edits persisted to client local storage. Refresh to keep custom changes!</span>
                  </motion.div>
                )}

                {/* GENERAL SETUP TAB */}
                {activeTab === 'general' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-stone-500 mb-1.5 font-bold">Her Name (Recipient)</label>
                      <input
                        type="text"
                        value={tempConfig.recipientName}
                        onChange={(e) => handleFieldChange('recipientName', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white font-serif italic text-stone-850"
                        placeholder="e.g., My Kanna"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-stone-500 mb-1.5 font-bold">Your Name (Sender)</label>
                      <input
                        type="text"
                        value={tempConfig.senderName}
                        onChange={(e) => handleFieldChange('senderName', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white font-sans text-stone-850"
                        placeholder="e.g., Your Favorite Human"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-stone-500 mb-1.5 font-bold">Anniversary Date (For Live Counter)</label>
                      <input
                        type="date"
                        value={tempConfig.anniversaryDate}
                        onChange={(e) => handleFieldChange('anniversaryDate', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white font-mono text-stone-800"
                      />
                      <span className="font-sans text-[10px] text-stone-450 block mt-1 leading-relaxed">
                        Computes the exact years, days, hours, and minutes of your romance inside the counter.
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-stone-500 mb-1.5 font-bold">Girlfriend's Birthday (For Countdown)</label>
                      <input
                        type="date"
                        value={tempConfig.birthDate || "2007-05-23"}
                        onChange={(e) => handleFieldChange('birthDate', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-200 bg-white font-mono text-stone-800"
                      />
                      <span className="font-sans text-[10px] text-stone-450 block mt-1 leading-relaxed">
                        Sets the target date for the prominent celebratory birthday countdown timer!
                      </span>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-stone-500 mb-1.5 font-bold">Aura Theme Mood</label>
                      <div className="grid grid-cols-2 gap-2">
                        {THEMES.map((theme) => (
                          <button
                            key={theme.id}
                            onClick={() => handleFieldChange('colorTheme', theme.id)}
                            className={`p-3 rounded-xl border text-left font-sans text-xs flex flex-col justify-between h-20 transition-all ${tempConfig.colorTheme === theme.id ? 'border-stone-900 bg-stone-900 text-white shadow-md' : 'border-stone-200 bg-white text-stone-650 hover:bg-stone-100'}`}
                          >
                            <span className="font-semibold">{theme.name}</span>
                            <div className="flex gap-1.5 mt-2">
                              <span className="w-3 h-3 rounded-full bg-rose-400" />
                              <span className="w-3 h-3 rounded-full bg-amber-400" />
                              <span className="w-3 h-3 rounded-full bg-stone-150" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* HEART REASONS TAB */}
                {activeTab === 'reasons' && (
                  <div className="space-y-4">
                    <p className="font-sans text-xs text-stone-500 italic">
                      Add custom reasons why she is cherished. These will display sequentially inside the floating Love Jar.
                    </p>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newReason}
                        onChange={(e) => setNewReason(e.target.value)}
                        placeholder="Add a reason of your own..."
                        className="flex-grow px-3 py-2 rounded-lg border border-stone-200 bg-white text-xs"
                      />
                      <button
                        onClick={handleAddReason}
                        className="px-3.5 bg-rose-500 text-white rounded-lg flex items-center justify-center font-bold font-sans text-xs hover:bg-rose-600 active:scale-95 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {tempConfig.reasons.map((reason, idx) => (
                        <div key={idx} className="p-3 bg-white border border-stone-200/60 rounded-xl flex items-start gap-2.5 shadow-xs">
                          <span className="font-mono text-[9px] text-stone-400 mt-1 font-bold">#{idx + 1}</span>
                          <span className="font-sans text-xs text-stone-700 flex-grow leading-relaxed italic">"{reason}"</span>
                          <button
                            onClick={() => handleRemoveReason(idx)}
                            className="text-stone-300 hover:text-rose-500 p-1 rounded-md transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* MEMORIES TAB */}
                {activeTab === 'memories' && (
                  <div className="space-y-6">
                    {tempConfig.memories.map((memory, index) => (
                      <div key={memory.id} className="p-4 border border-stone-200 bg-white rounded-xl space-y-3 shadow-xs">
                        <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                          <span className="font-mono text-[9px] text-rose-500 font-bold uppercase tracking-widest">Memory Card #{index + 1}</span>
                          <span className="font-mono text-[9px] text-stone-400">{memory.id}</span>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-widest font-mono text-stone-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={memory.title}
                            onChange={(e) => handleNestedFieldChange('memories', index, 'title', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-stone-50 border border-stone-200 font-serif text-xs text-stone-850"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-widest font-mono text-stone-400 mb-1">Date String</label>
                          <input
                            type="text"
                            value={memory.date}
                            onChange={(e) => handleNestedFieldChange('memories', index, 'date', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-stone-50 border border-stone-200 font-mono text-xs text-stone-800"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-widest font-mono text-stone-400 mb-1">Description</label>
                          <textarea
                            value={memory.description}
                            onChange={(e) => handleNestedFieldChange('memories', index, 'description', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-stone-50 border border-stone-200 font-sans text-xs text-stone-700 h-16 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-widest font-mono text-stone-400 mb-1">Polaroid Photo URL</label>
                          <input
                            type="text"
                            value={memory.imageUrl}
                            onChange={(e) => handleNestedFieldChange('memories', index, 'imageUrl', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-stone-50 border border-stone-200 font-mono text-xs text-stone-600"
                            placeholder="https://..."
                          />
                          <span className="font-sans text-[8px] text-stone-400 mt-1 block">
                            ProTip: You can paste any image URL from unsplash or imgur!
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* COUPONS SETUP */}
                {activeTab === 'coupons' && (
                  <div className="space-y-6">
                    {tempConfig.coupons.map((coupon, index) => (
                      <div key={coupon.id} className="p-4 border border-stone-200 bg-white rounded-xl space-y-3 shadow-xs">
                        <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                          <span className="font-mono text-[9px] text-rose-500 font-bold uppercase tracking-widest">Gift Token #{index + 1}</span>
                          <span className={`font-mono text-[9px] uppercase px-1.5 py-0.5 rounded ${coupon.redeemed ? 'bg-stone-100 text-stone-400' : 'bg-rose-50 text-rose-500'}`}>
                            {coupon.redeemed ? 'Redeemed' : 'Active'}
                          </span>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1">
                            <label className="block text-[9px] uppercase tracking-widest font-mono text-stone-400 mb-1">Emoji</label>
                            <input
                              type="text"
                              value={coupon.emoji}
                              onChange={(e) => handleNestedFieldChange('coupons', index, 'emoji', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded bg-stone-50 border border-stone-200 text-center text-sm"
                            />
                          </div>
                          <div className="col-span-3">
                            <label className="block text-[9px] uppercase tracking-widest font-mono text-stone-400 mb-1">Title</label>
                            <input
                              type="text"
                              value={coupon.title}
                              onChange={(e) => handleNestedFieldChange('coupons', index, 'title', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded bg-stone-50 border border-stone-200 font-serif italic text-xs text-stone-850"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[9px] uppercase tracking-widest font-mono text-stone-400 mb-1">Description</label>
                          <textarea
                            value={coupon.description}
                            onChange={(e) => handleNestedFieldChange('coupons', index, 'description', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded bg-stone-50 border border-stone-200 font-sans text-xs text-stone-700 h-16 resize-none"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[9px] uppercase tracking-widest font-mono text-stone-400 mb-1">Coupon Code</label>
                            <input
                              type="text"
                              value={coupon.code}
                              onChange={(e) => handleNestedFieldChange('coupons', index, 'code', e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded bg-stone-50 border border-stone-200 font-mono text-xs text-stone-800"
                            />
                          </div>
                          <div className="flex items-end pb-0.5">
                            <button
                              type="button"
                              onClick={() => handleNestedFieldChange('coupons', index, 'redeemed', !coupon.redeemed)}
                              className={`w-full py-1.5 rounded font-sans text-[10px] tracking-wider uppercase font-bold text-center border cursor-pointer ${coupon.redeemed ? 'bg-white border-stone-250 text-stone-605' : 'bg-rose-50 border-rose-200 text-rose-600'}`}
                            >
                              Toggle Redeem
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* LOVE LETTER TAB */}
                {activeTab === 'letter' && (
                  <div className="space-y-4">
                    <p className="font-sans text-xs text-stone-500 italic">
                      This represents your beautiful secret letter which will reveal itself instantly when she successfully blows out the virtual birthday candle on the cupcakes!
                    </p>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-mono text-stone-500 mb-1 font-bold">Personal Love Letter Content</label>
                      <textarea
                        value={tempConfig.loveLetter}
                        onChange={(e) => handleFieldChange('loveLetter', e.target.value)}
                        className="w-full h-80 p-3 rounded-lg border border-stone-200 bg-white font-sans text-xs text-stone-750 font-normal leading-relaxed"
                        placeholder="My Dearest, write your complete romantic letter here..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-stone-200 bg-white flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={saveToLocalStorage}
                    className="flex-grow py-3 bg-stone-900 border border-stone-850 hover:bg-stone-800 text-amber-400 font-sans text-xs tracking-wider uppercase font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg cursor-pointer max-w-none hover:shadow-xl active:scale-98 transition-all"
                  >
                    <Save className="w-4 h-4 text-amber-400" />
                    <span>Secure & Save Customizer 💖</span>
                  </button>
                </div>
                
                <button
                  onClick={resetToDefault}
                  className="py-2 text-[10px] uppercase font-mono tracking-widest font-bold text-stone-400 hover:text-rose-500 transition-colors text-center"
                >
                  Reset back to Sweet default
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
