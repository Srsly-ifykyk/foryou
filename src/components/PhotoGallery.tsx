/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, Heart, MapPin, X, Sparkles } from 'lucide-react';

interface GalleryPhoto {
  id: string;
  category: 'travel' | 'cafe' | 'stardust' | 'cozy';
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

const PHOTOS: GalleryPhoto[] = [
  // Sun-kissed Escapes
  {
    id: 'photo-1',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'photo-2',
    imageUrl: 'https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'photo-3',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=800'
  },

  // Café Conversations
  {
    id: 'photo-4',
    imageUrl: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'photo-5',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800'
  },

  // Stardust Nights
  {
    id: 'photo-6',
    imageUrl: 'https://images.unsplash.com/photo-1517404215738-15263e9f9178?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'photo-7',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=800'
  },

  // Cozy Winter Memories
  {
    id: 'photo-8',
    imageUrl: 'https://images.unsplash.com/photo-1481988535861-271139e0646c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'photo-9',
   imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800'
  }
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [heartCount, setHeartCount] = useState<Record<string, number>>({});
  const [heartSparks, setHeartSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  const filteredPhotos = PHOTOS;

  const triggerHeartBurst = (photoId: string, e: React.MouseEvent) => {
    // Increment specific heart count
    setHeartCount(prev => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + 1
    }));

    // Spawn 5 flying heart sparks for celebration feel
    const rect = e.currentTarget.getBoundingClientRect();
    const sparks = Array.from({ length: 6 }).map(() => ({
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY
    }));
    setHeartSparks(prev => [...prev, ...sparks]);

    // Cleanup sparks
    setTimeout(() => {
      setHeartSparks(prev => prev.filter(sp => !sparks.find(s => s.id === sp.id)));
    }, 1200);
  };

  return (
    <div className="py-12 px-2 flex flex-col items-center">
      <div className="text-center mb-10">
        <h3 className="font-serif italic text-3.5xl md:text-5xl text-[#2D2926] font-medium tracking-tight">
          Photo Gallery
        </h3>
      </div>

      {/* Grid Display */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl px-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo) => (
            <motion.div
              layout
              key={photo.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedPhoto(photo)}
              className="group bg-white p-4 pb-6 border border-[#E8E1D9] rounded-xs shadow-[0_10px_30px_rgba(166,143,126,0.08)] cursor-pointer hover:shadow-[0_20px_45px_rgba(166,143,126,0.18)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-full aspect-[4/3] overflow-hidden rounded-xs bg-stone-50 border border-stone-100 relative">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to picsum is Unsplash goes stale
                    e.currentTarget.src = `https://picsum.photos/seed/${photo.id}/600/450`;
                  }}
                />
                <div className="absolute inset-0 bg-[#2D2926]/5 group-hover:bg-transparent transition-colors duration-300" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-900/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Click outside target */}
            <div className="absolute inset-0" onClick={() => setSelectedPhoto(null)} />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-xl bg-black border border-[#E8E1D9]/40 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col pointer-events-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/60 backdrop-blur-xs text-white flex items-center justify-center hover:bg-stone-950 active:scale-95 transition-all outline-none"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              {/* Photo Box */}
              <div className="w-full aspect-[4/3] bg-black relative">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain select-none"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/${selectedPhoto.id}/800/600`;
                  }}
                />
              </div>

              {/* Heart floating burst particles layer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                <AnimatePresence>
                  {heartSparks.map(spark => (
                    <motion.div
                      key={spark.id}
                      initial={{ 
                        opacity: 1, 
                        x: spark.x - window.innerWidth / 2 + 100, 
                        y: spark.y - window.innerHeight / 2 - 50,
                        scale: 0.6 
                      }}
                      animate={{ 
                        opacity: 0, 
                        y: spark.y - window.innerHeight / 2 - 250, 
                        x: spark.x - window.innerWidth / 2 + 100 + (Math.random() * 120 - 60),
                        scale: 1.4,
                        rotate: Math.random() * 60 - 30
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.1, ease: 'easeOut' }}
                      className="absolute text-red-500 fill-red-500 text-3xl"
                    >
                      ❤️
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Lovable Pulse Button floating on bottom corner */}
              <button
                onClick={(e) => triggerHeartBurst(selectedPhoto.id, e)}
                className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 px-4 py-2 bg-black/60 border border-white/20 text-white rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer group outline-none"
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500 group-hover:rotate-12 transition-transform" />
                <span className="font-mono text-xs font-bold">
                  Tap for Love ❤️
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
