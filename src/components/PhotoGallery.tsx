/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Calendar, Heart, MapPin, X, Sparkles } from 'lucide-react';

// Import newly uploaded 16 pictures from assets
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.png';
import img3 from '../assets/images/3.png';
import img4 from '../assets/images/4.jpeg';
import img5 from '../assets/images/5.png';
import img6 from '../assets/images/6.jpg';
import img7 from '../assets/images/7.png';
import img8 from '../assets/images/8.png';
import img9 from '../assets/images/9.png';
import img11 from '../assets/images/11.png';
import img12 from '../assets/images/12.png';
import img13 from '../assets/images/13.png';
import img14 from '../assets/images/14.png';
import img15 from '../assets/images/15.png';
import img16 from '../assets/images/16.png';

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
  {
    id: 'photo-1',
    category: 'travel',
    title: 'Our Brightest Smile',
    date: 'April 14, 2025',
    location: 'Our Happy Place',
    description: 'Your smile lights up my whole world. This picture captures exactly how beautiful and radiant you are when we are together.',
    imageUrl: img1
  },
  {
    id: 'photo-2',
    category: 'cozy',
    title: 'Sweet Hand-in-Hand',
    date: 'May 10, 2025',
    location: 'Under the Golden Sun',
    description: 'Holding your hand is my favorite thing to do in this universe. I never want to let go of this warm, secure feeling.',
    imageUrl: img2
  },
  {
    id: 'photo-3',
    category: 'cafe',
    title: 'Lazy Afternoon Coffee',
    date: 'June 5, 2025',
    location: 'Quiet Little Corner',
    description: 'Just sitting across from you, sharing giggles over a cup of tea. Every conversation with you is a memory I treasure forever.',
    imageUrl: img3
  },
  {
    id: 'photo-4',
    category: 'stardust',
    title: 'Gazing at the Stars',
    date: 'July 19, 2025',
    location: 'Our Midnight Secret',
    description: 'Even the brightest stars in the night sky cannot compare to the magical glimmer in your beautiful eyes.',
    imageUrl: img4
  },
  {
    id: 'photo-5',
    category: 'cozy',
    title: 'Warm Hugs & Soft Sweaters',
    date: 'August 30, 2025',
    location: 'Our Sunny Balcony',
    description: 'Wrapped around your warmth, the entire world outside just fades away. You are my safe haven, my sweet home.',
    imageUrl: img5
  },
  {
    id: 'photo-6',
    category: 'travel',
    title: 'Chasing Sunsets Together',
    date: 'September 22, 2025',
    location: 'Golden Horizon',
    description: 'Watching the sky paint itself in gold and violet. I want to chase every single sunset with you next to me.',
    imageUrl: img6
  },
  {
    id: 'photo-7',
    category: 'stardust',
    title: 'The Sparkle in Your Eyes',
    date: 'October 15, 2025',
    location: 'City Lights Overlook',
    description: 'Looking at you is like looking at a galaxy. Every laugh and soft whisper is a melody written in my heart.',
    imageUrl: img7
  },
  {
    id: 'photo-8',
    category: 'cafe',
    title: 'Warm Brew & Sweet Smiles',
    date: 'November 8, 2025',
    location: 'Vintage Espresso Bar',
    description: 'The café was freezing, but your presence warmed me up instantly. You make every ordinary day so extraordinary.',
    imageUrl: img8
  },
  {
    id: 'photo-9',
    category: 'travel',
    title: 'Our Beautiful Roadtrip',
    date: 'December 12, 2025',
    location: 'Chuncheon Lakeshore',
    description: 'Music playing low, wind in your hair, and your sweet laughter filling the space between us. Pure bliss.',
    imageUrl: img9
  },
  {
    id: 'photo-11',
    category: 'cozy',
    title: 'Soft Winter Mornings',
    date: 'January 14, 2026',
    location: 'Snow Covered Lounge',
    description: 'Nestled deep in blankets, reading books and sharing sweet, warm cocoa. There is nowhere else I would rather be.',
    imageUrl: img11
  },
  {
    id: 'photo-12',
    category: 'travel',
    title: 'Walking Under Spring Blossoms',
    date: 'February 28, 2026',
    location: 'Blooming Garden Walk',
    description: 'As petals flutter in the breeze, they seem to greet you. You look like a painting in this beautiful spring light.',
    imageUrl: img12
  },
  {
    id: 'photo-13',
    category: 'cafe',
    title: 'Desserts & Giggles',
    date: 'March 18, 2026',
    location: 'Le Petit Dessert Lounge',
    description: 'You insisted on ordering every single strawberry dessert, and ended up with cream on your nose. Absolute cutest sight.',
    imageUrl: img13
  },
  {
    id: 'photo-14',
    category: 'stardust',
    title: 'Our Candlelit Dinner',
    date: 'April 5, 2026',
    location: 'Rustic Lantern Garden',
    description: 'The soft orange glow reflecting off your cheeks. I am so lucky to be the one who gets to make you laugh like this.',
    imageUrl: img14
  },
  {
    id: 'photo-15',
    category: 'cozy',
    title: 'Wrapped in Love',
    date: 'April 29, 2026',
    location: 'Cozy Fireside',
    description: 'Snugged together while the rain patters softly against the window. Your embrace is the safest place on earth.',
    imageUrl: img15
  },
  {
    id: 'photo-16',
    category: 'travel',
    title: 'Our Endless Journey',
    date: 'May 15, 2026',
    location: 'Golden Vista Point',
    description: 'Our story has so many chapters yet to write, so many miles yet to walk. I love you more day by day, my darling.',
    imageUrl: img16
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
