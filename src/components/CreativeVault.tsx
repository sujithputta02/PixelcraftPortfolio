import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ProgressiveImage } from './ProgressiveImage';
import { sfx } from '../utils/sfx';

interface CreativeVaultProps {
  onNavClick?: (sectionId: string) => void;
}

interface VaultItem {
  id: string;
  title: string;
  image: string;
  category: string;
  instagramUrl?: string;
}

const backgroundCards: VaultItem[] = [
  { id: 'spider-noir', title: 'Spider-Man Noir', image: '/Poster/spider noir poster.png', category: 'Atmospheric Key Art', instagramUrl: 'https://www.instagram.com/p/DVYbj2sEchE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'spidey-sense', title: 'Spidey Sense', image: '/Poster/spidey sense - spiderman Poster.png', category: 'Comic Concept', instagramUrl: 'https://www.instagram.com/p/DZAPWjbvor8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'dear-el', title: 'Dear, El !', image: '/Poster/Dear, El ! - Written by Mike wheeler v-2.png', category: 'Pop Culture Editorial', instagramUrl: 'https://www.instagram.com/p/DTaPo7MEfEi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'doctor-doom', title: 'Doctor Doom', image: '/Poster/Doctor Doom Poster.png', category: 'Marvel Concept', instagramUrl: 'https://www.instagram.com/p/DX63e8kkZ_8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'dune-part-three', title: 'Dune: Part Three', image: '/Poster/Dune Part-3 Lisan al-gaib post.png', category: 'Theatrical Key Art', instagramUrl: 'https://www.instagram.com/p/DWgj6dwkfcN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'interstellar', title: 'Interstellar', image: '/Poster/Interstellar Post.png', category: 'Cosmic Theatrical', instagramUrl: 'https://www.instagram.com/p/DU0jt7pkbNN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'dudeholic', title: 'DUDEHOLIC', image: '/Poster/Dudeholic Poster.png', category: 'Music Editorial', instagramUrl: 'https://www.instagram.com/p/DZAPWjbvor8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'max-katebush', title: "Max's Kate Bush", image: '/Poster/Max X Katebush Poster.png', category: 'Cinematic Character', instagramUrl: 'https://www.instagram.com/p/DU-jWwpEd2N/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'michael-jackson', title: 'Michael Jackson', image: '/Poster/Michael Poster.png', category: 'Pop Culture Tribute', instagramUrl: 'https://www.instagram.com/p/DXHa2uUDwIg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'superman', title: 'Superman Key Art', image: "/Poster/James Gunn's Superman.png", category: 'Cinematic Film Poster', instagramUrl: 'https://www.instagram.com/p/DWrG_l3kUZF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'oppenheimer', title: 'Oppenheimer', image: '/Poster/Oppenheimer Poster.jpg', category: 'Cinematic Concept', instagramUrl: 'https://www.instagram.com/p/DTSkf6ikes1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'the-odyssey', title: 'The Odyssey', image: '/Poster/The odyssey Post.png', category: 'Mythological Concept', instagramUrl: 'https://www.instagram.com/p/DYHpnNmEVni/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'raga-revenge', title: 'Raga of Revenge', image: '/Poster/Raga of Revenge-DC.png', category: 'Action Thriller', instagramUrl: 'https://www.instagram.com/p/DYxAIF6POYM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'spiderman-bnd', title: 'Spider-Man BND', image: '/Poster/Spiderman BND Post.png', category: 'Cinematic IMAX', instagramUrl: 'https://www.instagram.com/p/DWGSiHvkUC7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'black-panther', title: 'Black Panther', image: '/Poster/All the Stars are Closer - Black Panther Poster.png', category: 'Wakanda Key Art', instagramUrl: 'https://www.instagram.com/p/DZRsAWJRIfI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'king-steve', title: 'King Steve', image: '/Poster/Kingsteve poster.png', category: 'Pop Culture Character Design', instagramUrl: 'https://www.instagram.com/p/DUcXzeIkRF4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'obsession', title: 'OBSESSION (2026)', image: '/Poster/OBSESSION Poster.png', category: 'Cinematic Horror Key Art', instagramUrl: 'https://www.instagram.com/p/DZRsAWJRIfI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'iphone-17-pro', title: 'iPhone 17 Pro Concept', image: '/Poster/IPhone 17 Pro Poster.png', category: 'Product Key Art & Speculative CGI' },
  { id: 'hamza-returns', title: 'The Hamza Returns', image: '/Poster/The Hamza returns.jpg', category: 'Cinematic Concept', instagramUrl: 'https://www.instagram.com/p/DWT4PbNkR_g/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
];

const initialLikesData: Record<string, number> = {
  'king-steve': 142,
  'spider-noir': 98,
  'spidey-sense': 124,
  'dear-el': 210,
  'doctor-doom': 165,
  'dune-part-three': 304,
  'interstellar': 188,
  'dudeholic': 76,
  'max-katebush': 143,
  'michael-jackson': 275,
  'superman': 220,
  'oppenheimer': 195,
  'the-odyssey': 112,
  'raga-revenge': 89,
  'spiderman-bnd': 156,
  'black-panther': 245,
  'obsession': 288,
  'iphone-17-pro': 132,
  'hamza-returns': 115
};

interface MarqueeCardProps {
  item: VaultItem;
  onCardClick: (image: string) => void;
  handleLike: (cardId: string, instagramUrl?: string) => void;
  isLiked: boolean;
  likesCount: number;
  isHeartPulsing: boolean;
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({
  item,
  onCardClick,
  handleLike,
  isLiked,
  likesCount,
  isHeartPulsing,
}) => {
  return (
    <div
      onClick={() => onCardClick(item.image)}
      className="w-[140px] sm:w-[170px] md:w-[210px] lg:w-[240px] aspect-[3/4.2] rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 hover:border-white/10 cursor-pointer relative transition-all duration-500 hover:scale-105 hover:z-50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.95)] group shrink-0"
    >
      <ProgressiveImage
        src={item.image.replace(/\.(png|jpg|jpeg)$/i, '.webp')}
        alt={item.title}
        className="w-full h-full object-cover grayscale-0 opacity-100 md:grayscale md:opacity-70 md:group-hover:grayscale-0 md:group-hover:opacity-100 transition-all duration-700"
        loading="lazy"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      
      {/* Floating Info Badge Overlay */}
      <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 z-20 flex flex-col text-left opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto">
        <span className="text-[8px] md:text-[9px] font-heading font-semibold uppercase text-white/50 tracking-wider">
          {item.category}
        </span>
        <h4 className="text-[10px] md:text-[12px] font-heading font-bold text-white tracking-tight uppercase leading-tight mt-0.5">
          {item.title}
        </h4>
        
        {/* Inline Likes Controller */}
        <div className="flex items-center justify-between mt-2 md:mt-3 pt-1.5 md:pt-2 border-t border-white/10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleLike(item.id, item.instagramUrl);
            }}
            className="flex items-center gap-1 md:gap-1.5 text-white bg-white/10 hover:bg-white hover:text-black border border-white/5 rounded-full px-2 md:px-2.5 py-0.5 md:py-1 transition-all duration-200 select-none cursor-pointer"
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2.5"
              className={`text-red-500 transition-transform ${isHeartPulsing ? 'animate-heart-pop' : ''}`}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-[8px] md:text-[9px] font-heading font-semibold">{likesCount}</span>
          </button>
          
          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-white/15 bg-white/5 flex items-center justify-center">
            <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InfiniteMarqueeWallProps {
  onCardClick: (image: string) => void;
  handleLike: (cardId: string, instagramUrl?: string) => void;
  likedMap: Record<string, boolean>;
  likesMap: Record<string, number>;
  isHeartPulsing: boolean;
  activeHeartId: string | null;
}

const InfiniteMarqueeWall: React.FC<InfiniteMarqueeWallProps> = ({
  onCardClick,
  handleLike,
  likedMap,
  likesMap,
  isHeartPulsing,
  activeHeartId,
}) => {
  const row1 = [
    backgroundCards[0],
    backgroundCards[1],
    backgroundCards[2],
    backgroundCards[3],
    backgroundCards[4],
    backgroundCards[5],
    backgroundCards[6]
  ];
  const row2 = [
    backgroundCards[7],
    backgroundCards[8],
    backgroundCards[9],
    backgroundCards[10],
    backgroundCards[11],
    backgroundCards[12]
  ];
  const row3 = [
    backgroundCards[13],
    backgroundCards[14],
    backgroundCards[15],
    backgroundCards[16],
    backgroundCards[17],
    backgroundCards[18]
  ];

  return (
    <div className="w-full flex flex-col gap-6 overflow-hidden relative py-8">
      {/* Row 1: Left */}
      <div className="relative overflow-visible w-full flex gap-6 select-none py-2 group/row1">
        <div className="flex gap-6 shrink-0 animate-marquee-l group-hover/row1:[animation-play-state:paused]">
          {row1.map((item) => (
            <MarqueeCard
              key={item.id}
              item={item}
              onCardClick={onCardClick}
              handleLike={handleLike}
              isLiked={likedMap[item.id] ?? false}
              likesCount={likesMap[item.id] ?? 0}
              isHeartPulsing={isHeartPulsing && activeHeartId === item.id}
            />
          ))}
        </div>
        <div className="flex gap-6 shrink-0 animate-marquee-l group-hover/row1:[animation-play-state:paused]" aria-hidden="true">
          {row1.map((item) => (
            <MarqueeCard
              key={`${item.id}-dup`}
              item={item}
              onCardClick={onCardClick}
              handleLike={handleLike}
              isLiked={likedMap[item.id] ?? false}
              likesCount={likesMap[item.id] ?? 0}
              isHeartPulsing={isHeartPulsing && activeHeartId === item.id}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Right */}
      <div className="relative overflow-visible w-full flex gap-6 select-none py-2 group/row2">
        <div className="flex gap-6 shrink-0 animate-marquee-r group-hover/row2:[animation-play-state:paused]">
          {row2.map((item) => (
            <MarqueeCard
              key={item.id}
              item={item}
              onCardClick={onCardClick}
              handleLike={handleLike}
              isLiked={likedMap[item.id] ?? false}
              likesCount={likesMap[item.id] ?? 0}
              isHeartPulsing={isHeartPulsing && activeHeartId === item.id}
            />
          ))}
        </div>
        <div className="flex gap-6 shrink-0 animate-marquee-r group-hover/row2:[animation-play-state:paused]" aria-hidden="true">
          {row2.map((item) => (
            <MarqueeCard
              key={`${item.id}-dup`}
              item={item}
              onCardClick={onCardClick}
              handleLike={handleLike}
              isLiked={likedMap[item.id] ?? false}
              likesCount={likesMap[item.id] ?? 0}
              isHeartPulsing={isHeartPulsing && activeHeartId === item.id}
            />
          ))}
        </div>
      </div>

      {/* Row 3: Left */}
      <div className="relative overflow-visible w-full flex gap-6 select-none py-2 group/row3">
        <div className="flex gap-6 shrink-0 animate-marquee-l group-hover/row3:[animation-play-state:paused]">
          {row3.map((item) => (
            <MarqueeCard
              key={item.id}
              item={item}
              onCardClick={onCardClick}
              handleLike={handleLike}
              isLiked={likedMap[item.id] ?? false}
              likesCount={likesMap[item.id] ?? 0}
              isHeartPulsing={isHeartPulsing && activeHeartId === item.id}
            />
          ))}
        </div>
        <div className="flex gap-6 shrink-0 animate-marquee-l group-hover/row3:[animation-play-state:paused]" aria-hidden="true">
          {row3.map((item) => (
            <MarqueeCard
              key={`${item.id}-dup`}
              item={item}
              onCardClick={onCardClick}
              handleLike={handleLike}
              isLiked={likedMap[item.id] ?? false}
              likesCount={likesMap[item.id] ?? 0}
              isHeartPulsing={isHeartPulsing && activeHeartId === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const CreativeVault: React.FC<CreativeVaultProps> = () => {
  const [likesMap, setLikesMap] = useState<Record<string, number>>(initialLikesData);

  const [likedMap, setLikedMap] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('pixelcraft_liked_status');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {};
  });

  const [isHeartPulsing, setIsHeartPulsing] = useState(false);
  const [activeHeartId, setActiveHeartId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  // Fetch likes from SQLite database on mount
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/likes');
        if (response.ok) {
          const data = await response.json();
          setLikesMap(data);
        }
      } catch (err) {
        console.error('Failed to fetch likes from local SQLite database:', err);
      }
    };
    fetchLikes();
  }, []);

  // Sync personal liked status locally to localStorage
  useEffect(() => {
    localStorage.setItem('pixelcraft_liked_status', JSON.stringify(likedMap));
  }, [likedMap]);

  const handleCardLike = async (cardId: string, instagramUrl?: string) => {
    sfx.playTick('click');
    setActiveHeartId(cardId);
    setIsHeartPulsing(true);
    const isCurrentlyLiked = likedMap[cardId] ?? false;
    const nextLikedState = !isCurrentlyLiked;

    // 1. Optimistic UI update: Toggle like status instantly
    setLikedMap(prev => ({
      ...prev,
      [cardId]: nextLikedState
    }));

    // 2. Optimistic UI update: Increment/decrement local counts map instantly
    setLikesMap(prev => ({
      ...prev,
      [cardId]: nextLikedState ? (prev[cardId] ?? 0) + 1 : Math.max(0, (prev[cardId] ?? 0) - 1)
    }));

    // 3. If liking, open the real Instagram post in a new tab so they can add a real like there
    if (nextLikedState) {
      window.open(instagramUrl || 'https://www.instagram.com/pixelcraft.exe', '_blank');
    }

    // 4. Dispatch POST request in background to update the SQLite database
    try {
      const response = await fetch(`http://localhost:5001/api/likes/${cardId}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ liked: nextLikedState })
      });
      if (response.ok) {
        const { count } = await response.json();
        // Sync count with database server count
        setLikesMap(prev => ({
          ...prev,
          [cardId]: count
        }));
      }
    } catch (err) {
      console.error('Failed to sync like click with database server:', err);
      // Rollback on server network failure
      setLikedMap(prev => ({
        ...prev,
        [cardId]: isCurrentlyLiked
      }));
      setLikesMap(prev => ({
        ...prev,
        [cardId]: isCurrentlyLiked ? (likesMap[cardId] ?? 0) : Math.max(0, (likesMap[cardId] ?? 0))
      }));
    }
  };

  useEffect(() => {
    if (isHeartPulsing) {
      const timer = setTimeout(() => {
        setIsHeartPulsing(false);
        setActiveHeartId(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isHeartPulsing]);

  const handleCardClick = useCallback((image: string) => {
    sfx.playTick('click');
    setActiveImage(image);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseLightbox = useCallback(() => {
    sfx.playTick('click');
    setActiveImage(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <section
      id="vault"
      className="relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-16 bg-[#0E0E0E] z-10 select-none overflow-hidden border-b border-white/5"
    >
      <style>{`
        @keyframes heart-pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
        .animate-heart-pop {
          animation: heart-pop 0.3s ease-out;
        }
        @keyframes marquee-l {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% - 24px)); }
        }
        @keyframes marquee-r {
          0% { transform: translateX(calc(-100% - 24px)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-l {
          animation: marquee-l 32s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }
        .animate-marquee-r {
          animation: marquee-r 32s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }
        .group\/row1:hover .animate-marquee-l,
        .group\/row2:hover .animate-marquee-r,
        .group\/row3:hover .animate-marquee-l {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.006] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 sm:mb-20 md:mb-32 lg:mb-40 text-left">
          <div>
            <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 block mb-3">
              04 — CREATIVE VAULT
            </span>
            <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-heading font-light tracking-[-0.03em] text-white leading-tight">
              Artistic Wall Curation
            </h2>
          </div>
          <p className="max-w-xs text-[14px] sm:text-[16px] font-body text-white/45 leading-relaxed">
            Interact with the digital marquee rows to pause, like items, or tap to view posters in high-definition full screen.
          </p>
        </div>

        {/* Responsive Digital Art Exhibition Infinite Marquee */}
        <div className="w-full relative select-none mt-8 md:mt-12 lg:mt-16">
          <InfiniteMarqueeWall
            onCardClick={handleCardClick}
            handleLike={handleCardLike}
            likedMap={likedMap}
            likesMap={likesMap}
            isHeartPulsing={isHeartPulsing}
            activeHeartId={activeHeartId}
          />
        </div>

      </div>

      {/* Fullscreen Details Lightbox Modal */}
      {activeImage && createPortal(
        <div
          onClick={handleCloseLightbox}
          className="fixed inset-0 bg-black/98 z-[100000] flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          {/* Close button */}
          <button
            onClick={handleCloseLightbox}
            onMouseEnter={() => sfx.playTick('hover')}
            className="fixed top-6 right-6 bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 z-[100005] cursor-pointer"
            data-cursor="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Lightbox Image */}
          <div className="max-w-4xl max-h-[85vh] relative flex items-center justify-center">
            <ProgressiveImage
              src={activeImage}
              alt="Poster Detail View"
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_20px_60px_rgba(255,0,127,0.15)]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
