import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

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
  { id: 'black-panther', title: 'Black Panther', image: '/Poster/All the Stars are Closer - Black Panther Poster.png', category: 'Wakanda Key Art', instagramUrl: 'https://www.instagram.com/p/DZRsAWJRIfI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' }
];

const defaultSpotlight: VaultItem = {
  id: 'king-steve',
  title: 'King Steve',
  image: '/Poster/Kingsteve poster.png',
  category: 'Character Design',
  instagramUrl: 'https://www.instagram.com/p/DUcXzeIkRF4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
};

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
  'black-panther': 245
};

interface StaticBackgroundGridProps {
  onCardClick: (image: string) => void;
  onHoverEnter: (item: VaultItem) => void;
  onHoverLeave: () => void;
}

const StaticBackgroundGrid = React.memo<StaticBackgroundGridProps>(({ onCardClick, onHoverEnter, onHoverLeave }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {backgroundCards.map((item) => (
        <div
          key={item.id}
          onClick={() => onCardClick(item.image)}
          onMouseEnter={() => onHoverEnter(item)}
          onMouseLeave={onHoverLeave}
          className="flex flex-col group cursor-pointer"
        >
          <div className="w-full aspect-[3/4.2] rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>
          <span className="text-[12px] font-heading font-semibold text-white/70 tracking-tight mt-2 block pl-1">
            {item.title}
          </span>
        </div>
      ))}
    </div>
  );
});

interface StaticBackgroundColumnsProps {
  onCardClick: (image: string) => void;
  onHoverEnter: (item: VaultItem) => void;
  onHoverLeave: () => void;
}

const StaticBackgroundColumns = React.memo<StaticBackgroundColumnsProps>(({ onCardClick, onHoverEnter, onHoverLeave }) => {
  return (
    <>
      {/* Column 1: normal */}
      <div className="flex flex-col gap-6 w-full opacity-35 hover:opacity-40 transition-opacity duration-700">
        {[backgroundCards[0], backgroundCards[5], backgroundCards[10]].map((item) => (
          <div
            key={item.id}
            onClick={() => onCardClick(item.image)}
            onMouseEnter={() => onHoverEnter(item)}
            onMouseLeave={onHoverLeave}
            className="rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 hover:border-white/15 cursor-pointer relative transition-all duration-500 hover:scale-[1.03] shadow-md group aspect-[3/4.2] w-full"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-4 left-4 z-20 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[12px] font-heading font-semibold text-white block">
                {item.title}
              </span>
              <span className="text-[9px] font-heading font-medium uppercase text-white/40 block mt-0.5">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Column 2: shifted up by -45px (hidden on tablet) */}
      <div className="hidden lg:flex flex-col gap-6 w-full -translate-y-[45px] opacity-35 hover:opacity-40 transition-opacity duration-700">
        {[backgroundCards[1], backgroundCards[6], backgroundCards[11]].map((item) => (
          <div
            key={item.id}
            onClick={() => onCardClick(item.image)}
            onMouseEnter={() => onHoverEnter(item)}
            onMouseLeave={onHoverLeave}
            className="rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 hover:border-white/15 cursor-pointer relative transition-all duration-500 hover:scale-[1.03] shadow-md group aspect-[3/4.2] w-full"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-4 left-4 z-20 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[12px] font-heading font-semibold text-white block">
                {item.title}
              </span>
              <span className="text-[9px] font-heading font-medium uppercase text-white/40 block mt-0.5">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Column 3: center column */}
      <div className="flex flex-col gap-6 w-full relative z-25">
        {/* Top card shifted way up -90px */}
        <div
          onClick={() => onCardClick(backgroundCards[2].image)}
          onMouseEnter={() => onHoverEnter(backgroundCards[2])}
          onMouseLeave={onHoverLeave}
          className="-translate-y-[90px] rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 hover:border-white/15 cursor-pointer relative transition-all duration-500 hover:scale-[1.03] shadow-md group aspect-[3/4.2] w-full opacity-35 hover:opacity-40 transition-opacity duration-700"
        >
          <img
            src={backgroundCards[2].image}
            alt={backgroundCards[2].title}
            className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-4 left-4 z-20 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-[12px] font-heading font-semibold text-white block">
              {backgroundCards[2].title}
            </span>
            <span className="text-[9px] font-heading font-medium uppercase text-white/40 block mt-0.5">
              {backgroundCards[2].category}
            </span>
          </div>
        </div>

        {/* Bottom card shifted way down +90px */}
        <div
          onClick={() => onCardClick(backgroundCards[12].image)}
          onMouseEnter={() => onHoverEnter(backgroundCards[12])}
          onMouseLeave={onHoverLeave}
          className="translate-y-[90px] rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 hover:border-white/15 cursor-pointer relative transition-all duration-500 hover:scale-[1.03] shadow-md group aspect-[3/4.2] w-full opacity-35 hover:opacity-40 transition-opacity duration-700"
        >
          <img
            src={backgroundCards[12].image}
            alt={backgroundCards[12].title}
            className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-4 left-4 z-20 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="text-[12px] font-heading font-semibold text-white block">
              {backgroundCards[12].title}
            </span>
            <span className="text-[9px] font-heading font-medium uppercase text-white/40 block mt-0.5">
              {backgroundCards[12].category}
            </span>
          </div>
        </div>
      </div>

      {/* Column 4: shifted up by -45px (hidden on tablet) */}
      <div className="hidden lg:flex flex-col gap-6 w-full -translate-y-[45px] opacity-35 hover:opacity-40 transition-opacity duration-700">
        {[backgroundCards[3], backgroundCards[7], backgroundCards[13]].map((item) => (
          <div
            key={item.id}
            onClick={() => onCardClick(item.image)}
            onMouseEnter={() => onHoverEnter(item)}
            onMouseLeave={onHoverLeave}
            className="rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 hover:border-white/15 cursor-pointer relative transition-all duration-500 hover:scale-[1.03] shadow-md group aspect-[3/4.2] w-full"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-4 left-4 z-20 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[12px] font-heading font-semibold text-white block">
                {item.title}
              </span>
              <span className="text-[9px] font-heading font-medium uppercase text-white/40 block mt-0.5">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Column 5: normal */}
      <div className="flex flex-col gap-6 w-full opacity-35 hover:opacity-40 transition-opacity duration-700">
        {[backgroundCards[4], backgroundCards[8], backgroundCards[14]].map((item) => (
          <div
            key={item.id}
            onClick={() => onCardClick(item.image)}
            onMouseEnter={() => onHoverEnter(item)}
            onMouseLeave={onHoverLeave}
            className="rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 hover:border-white/15 cursor-pointer relative transition-all duration-500 hover:scale-[1.03] shadow-md group aspect-[3/4.2] w-full"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-4 left-4 z-20 text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="text-[12px] font-heading font-semibold text-white block">
                {item.title}
              </span>
              <span className="text-[9px] font-heading font-medium uppercase text-white/40 block mt-0.5">
                {item.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

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
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<VaultItem | null>(null);

  const [currentSpotlight, setCurrentSpotlight] = useState<VaultItem>(defaultSpotlight);
  const [prevSpotlight, setPrevSpotlight] = useState<VaultItem | null>(null);
  const [fadeKey, setFadeKey] = useState(0);

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

  // Spotlight contents syncs dynamically with the hovered card
  useEffect(() => {
    if (hoveredCard && hoveredCard.id !== currentSpotlight.id) {
      setPrevSpotlight(currentSpotlight);
      setCurrentSpotlight(hoveredCard);
      setFadeKey(prev => prev + 1);
    }
  }, [hoveredCard, currentSpotlight]);

  const activeLikes = likesMap[currentSpotlight.id] ?? 0;
  const activeLiked = likedMap[currentSpotlight.id] ?? false;

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHeartPulsing(true);
    const cardId = currentSpotlight.id;
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
      window.open(currentSpotlight.instagramUrl || 'https://www.instagram.com/pixelcraft.exe', '_blank');
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
      const timer = setTimeout(() => setIsHeartPulsing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isHeartPulsing]);

  const handleCardClick = useCallback((image: string) => {
    setActiveImage(image);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setActiveImage(null);
    document.body.style.overflow = '';
  }, []);

  const handleHoverEnter = useCallback((item: VaultItem) => {
    setHoveredCard(item);
  }, []);

  const handleHoverLeave = useCallback(() => {
    setHoveredCard(null);
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
        @keyframes spotlight-fade {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-spotlight-fade {
          animation: spotlight-fade 650ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: opacity, transform;
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
            Hover over background thumbnails to sync and spotlight them in the center featured showcase layout.
          </p>
        </div>

        {/* Responsive Grid System Layout */}
        
        {/* Mobile Layout (Featured Card stacked on top, grid below) */}
        <div className="block md:hidden text-left">
          {/* Center spotlight card displaying the active item */}
          <div
            onClick={() => handleCardClick(currentSpotlight.image)}
            className="w-full max-w-[330px] aspect-[3/4.2] rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-4 shadow-[0_20px_45px_rgba(239,68,68,0.25)] relative overflow-hidden mx-auto mb-12 cursor-pointer group flex flex-col justify-between"
          >
            {/* Heart Button */}
            <button
              onClick={handleLikeClick}
              className="absolute top-5 right-5 z-35 bg-white text-black font-heading font-semibold text-[9px] uppercase tracking-wider rounded-full px-3 py-1.5 flex items-center gap-1 shadow-lg active:scale-95"
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill={activeLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2.5"
                className={`text-red-500 transition-transform ${isHeartPulsing ? 'animate-heart-pop' : ''}`}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{activeLikes}</span>
            </button>

            {/* Speech bubble badge */}
            <div className="absolute top-16 left-5 z-35 bg-orange-600 border border-orange-400/30 text-white font-heading font-semibold text-[9px] tracking-wider uppercase px-2.5 py-1 rounded-full rounded-bl-none shadow-md">
              @creator
            </div>

            {/* Poster image container */}
            <div className="w-full h-[82%] rounded-2xl overflow-hidden bg-black/20 border border-white/5 relative z-10">
              {prevSpotlight && (
                <img
                  src={prevSpotlight.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
                />
              )}
              <img
                key={fadeKey}
                src={currentSpotlight.image}
                alt={currentSpotlight.title}
                className="absolute inset-0 w-full h-full object-cover animate-spotlight-fade z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none z-20" />
            </div>

            {/* Bottom creator details */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center gap-3">
              <img
                src="/images/Sujithprofile.png"
                alt="Sujith Putta"
                className="w-8 h-8 rounded-full object-cover border border-white/20"
              />
              <div className="text-left leading-none">
                <span className="text-[12px] font-heading font-bold text-white block">
                  {currentSpotlight.id === 'king-steve' ? 'Sujith Putta' : currentSpotlight.title}
                </span>
                <span className="text-[9px] font-heading font-medium text-white/70 block mt-0.5">
                  {currentSpotlight.id === 'king-steve' ? 'from PixelCraft' : currentSpotlight.category}
                </span>
              </div>
            </div>
          </div>

          {/* Background grid list */}
          <StaticBackgroundGrid
            onCardClick={handleCardClick}
            onHoverEnter={handleHoverEnter}
            onHoverLeave={handleHoverLeave}
          />
        </div>

        {/* Tablet & Desktop View (Wavy columns with centered spotlight) */}
        <div className="hidden md:flex justify-between items-center w-full h-[760px] lg:h-[880px] gap-6 relative select-none mt-8 md:mt-12 lg:mt-16">
          <StaticBackgroundColumns
            onCardClick={handleCardClick}
            onHoverEnter={handleHoverEnter}
            onHoverLeave={handleHoverLeave}
          />
          
          {/* Spotlight Center Card (centered, overlapping adjacent columns) */}
          <div
            onClick={() => handleCardClick(currentSpotlight.image)}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-[290px] lg:w-[330px] aspect-[3/4.2] rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-red-700 p-5 shadow-[0_30px_70px_rgba(239,68,68,0.35)] overflow-hidden cursor-pointer group border border-orange-400/20 flex flex-col justify-between transition-all duration-500 ${
              hoveredCard
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-[0.95] pointer-events-none'
            }`}
          >
            {/* Heart Button */}
            <button
              onClick={handleLikeClick}
              className="absolute top-7 right-7 z-40 bg-white text-black font-heading font-semibold text-[10px] uppercase tracking-wider rounded-full px-3.5 py-2 flex items-center gap-1.5 shadow-lg hover:scale-105 active:scale-95 duration-200"
              data-cursor="Like"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill={activeLiked ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2.5"
                className={`text-red-500 transition-transform ${isHeartPulsing ? 'animate-heart-pop' : ''}`}
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>{activeLikes}</span>
            </button>

            {/* Speech bubble badge */}
            <div className="absolute top-20 left-7 z-40 bg-orange-600 border border-orange-400/35 text-white font-heading font-semibold text-[9.5px] tracking-wider uppercase px-3 py-1 rounded-full rounded-bl-none shadow-md select-none pointer-events-none">
              @creator
            </div>

            {/* Poster Inner Wrapper with Crossfading Preloaded Images */}
            <div className="w-full h-[83%] rounded-2xl overflow-hidden bg-black/20 border border-white/5 relative z-10">
              {prevSpotlight && (
                <img
                  src={prevSpotlight.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-100 z-0"
                />
              )}
              <img
                key={fadeKey}
                src={currentSpotlight.image}
                alt={currentSpotlight.title}
                className="absolute inset-0 w-full h-full object-cover animate-spotlight-fade z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-20" />
            </div>

            {/* Creator bottom tag */}
            <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center gap-3">
              <img
                src="/images/Sujithprofile.png"
                alt="Sujith Putta"
                className="w-9 h-9 rounded-full object-cover border border-white/20"
              />
              <div className="text-left leading-none">
                <span className="text-[13px] font-heading font-bold text-white tracking-tight block">
                  {currentSpotlight.id === 'king-steve' ? 'Sujith Putta' : currentSpotlight.title}
                </span>
                <span className="text-[10px] font-heading font-medium text-white/70 block mt-0.5">
                  {currentSpotlight.id === 'king-steve' ? 'from PixelCraft' : currentSpotlight.category}
                </span>
              </div>
            </div>
          </div>
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
            <img
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
