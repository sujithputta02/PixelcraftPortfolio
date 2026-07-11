import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  { id: 'dune-part-three-v2', title: 'Dune: Part Three | Minimalist Cinematic Poster', image: '/Poster/Dune Part Three V-2.webp', category: 'Theatrical Key Art', instagramUrl: 'https://www.instagram.com/p/DaptEeQDwlZ/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'sing-geetham', title: 'Sing Geetham', image: '/Poster/Sing geetham Poster.webp', category: 'Fantasy / Drama', instagramUrl: 'https://www.instagram.com/p/Dah9Mb0POq8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'spider-noir', title: 'Spider-Man Noir', image: '/Poster/spider noir poster.webp', category: 'Atmospheric Key Art', instagramUrl: 'https://www.instagram.com/p/DVYbj2sEchE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'spidey-sense', title: 'Spidey Sense', image: '/Poster/spidey sense - spiderman Poster.webp', category: 'Comic Concept', instagramUrl: 'https://www.instagram.com/p/DZAPWjbvor8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'dear-el', title: 'Dear, El !', image: '/Poster/Dear, El ! - Written by Mike wheeler v-2.webp', category: 'Pop Culture Editorial', instagramUrl: 'https://www.instagram.com/p/DTaPo7MEfEi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'doctor-doom', title: 'Doctor Doom', image: '/Poster/Doctor Doom Poster.webp', category: 'Marvel Concept', instagramUrl: 'https://www.instagram.com/p/DX63e8kkZ_8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'dune-part-three', title: 'Dune: Part Three', image: '/Poster/Dune Part-3 Lisan al-gaib post.webp', category: 'Theatrical Key Art', instagramUrl: 'https://www.instagram.com/p/DWgj6dwkfcN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'interstellar', title: 'Interstellar', image: '/Poster/Interstellar Post.webp', category: 'Cosmic Theatrical', instagramUrl: 'https://www.instagram.com/p/DU0jt7pkbNN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'dudeholic', title: 'DUDEHOLIC', image: '/Poster/Dudeholic Poster.webp', category: 'Music Editorial', instagramUrl: 'https://www.instagram.com/p/DZAPWjbvor8/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'max-katebush', title: "Max's Kate Bush", image: '/Poster/Max X Katebush Poster.webp', category: 'Cinematic Character', instagramUrl: 'https://www.instagram.com/p/DU-jWwpEd2N/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'michael-jackson', title: 'Michael Jackson', image: '/Poster/Michael Poster.webp', category: 'Pop Culture Tribute', instagramUrl: 'https://www.instagram.com/p/DXHa2uUDwIg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'superman', title: 'Superman Key Art', image: "/Poster/James Gunn's Superman.webp", category: 'Cinematic Film Poster', instagramUrl: 'https://www.instagram.com/p/DWrG_l3kUZF/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'oppenheimer', title: 'Oppenheimer', image: '/Poster/Oppenheimer Poster.webp', category: 'Cinematic Concept', instagramUrl: 'https://www.instagram.com/p/DTSkf6ikes1/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'the-odyssey', title: 'The Odyssey', image: '/Poster/The odyssey Post.webp', category: 'Mythological Concept', instagramUrl: 'https://www.instagram.com/p/DYHpnNmEVni/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'raga-revenge', title: 'Raga of Revenge', image: '/Poster/Raga of Revenge-DC.webp', category: 'Action Thriller', instagramUrl: 'https://www.instagram.com/p/DYxAIF6POYM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'spiderman-bnd', title: 'Spider-Man BND', image: '/Poster/Spiderman BND Post.webp', category: 'Cinematic IMAX', instagramUrl: 'https://www.instagram.com/p/DWGSiHvkUC7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'black-panther', title: 'Black Panther', image: '/Poster/All the Stars are Closer - Black Panther Poster.webp', category: 'Wakanda Key Art', instagramUrl: 'https://www.instagram.com/p/DZRsAWJRIfI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'king-steve', title: 'King Steve', image: '/Poster/Kingsteve poster.webp', category: 'Pop Culture Character Design', instagramUrl: 'https://www.instagram.com/p/DUcXzeIkRF4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'obsession', title: 'OBSESSION (2026)', image: '/Poster/OBSESSION Poster.webp', category: 'Cinematic Horror Key Art', instagramUrl: 'https://www.instagram.com/p/DZRsAWJRIfI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'iphone-17-pro', title: 'iPhone 17 Pro Concept', image: '/Poster/IPhone 17 Pro Poster.webp', category: 'Product Key Art & Speculative CGI' },
  { id: 'hamza-returns', title: 'The Hamza Returns', image: '/Poster/The Hamza returns.webp', category: 'Cinematic Concept', instagramUrl: 'https://www.instagram.com/p/DWT4PbNkR_g/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
  { id: 'american-psycho', title: 'American Psycho', image: '/Poster/American Psycho Poster.webp', category: 'Psychological Thriller' },
  { id: 'spiderman-bnd-v2', title: 'Spider-Man BND V-2', image: '/Poster/Spiderman BND v-2.webp', category: 'Cinematic IMAX' },
  { id: 'tastico', title: 'Tastico', image: '/Poster/Tastico thumbnail.webp', category: 'Premium UI Showcase' }
];

interface MarqueeCardProps {
  item: VaultItem;
  onCardClick: (image: string, instagramUrl?: string) => void;
}

const MarqueeCard: React.FC<MarqueeCardProps> = ({ item, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(item.image, item.instagramUrl)}
      className="always-dark w-[140px] sm:w-[170px] md:w-[210px] lg:w-[240px] aspect-[3/4.2] rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 hover:border-white/10 cursor-pointer relative transition-all duration-500 hover:scale-105 hover:z-50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.95)] group shrink-0"
    >
      <ProgressiveImage
        src={item.image}
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
        
        {/* Sleek action badge instead of likes */}
        <div className="flex items-center justify-between mt-2 md:mt-3 pt-1.5 md:pt-2 border-t border-white/10">
          <span className="text-[8px] md:text-[9px] font-heading font-medium text-white/40 group-hover:text-[#ff7700] transition-colors duration-300 uppercase tracking-wider">
            View Project
          </span>
          <div className="w-4 h-4 md:w-5 md:h-5 rounded-full border border-white/15 bg-white/5 flex items-center justify-center group-hover:bg-[#ff7700] group-hover:border-[#ff7700] transition-all duration-300">
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
  onCardClick: (image: string, instagramUrl?: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const InfiniteMarqueeWall: React.FC<InfiniteMarqueeWallProps> = ({ onCardClick, containerRef }) => {
  const row1 = [
    backgroundCards[0],
    backgroundCards[1],
    backgroundCards[2],
    backgroundCards[3],
    backgroundCards[4],
    backgroundCards[5],
    backgroundCards[6],
    backgroundCards[7]
  ];
  const row2 = [
    backgroundCards[8],
    backgroundCards[9],
    backgroundCards[10],
    backgroundCards[11],
    backgroundCards[12],
    backgroundCards[13],
    backgroundCards[14]
  ];
  const row3 = [
    backgroundCards[15],
    backgroundCards[16],
    backgroundCards[17],
    backgroundCards[18],
    backgroundCards[19],
    backgroundCards[20],
    backgroundCards[21]
  ];

  return (
    <div 
      ref={containerRef}
      className="w-full flex flex-col gap-6 overflow-hidden relative py-8"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)'
      }}
    >
      {/* Row 1: Left */}
      <div 
        className="relative overflow-visible w-full flex gap-6 select-none py-2 group/row1 transition-transform duration-100 ease-out"
        style={{ transform: 'translate3d(calc(-1 * var(--scroll-offset, 0px)), 0, 0)' }}
      >
        <div className="flex gap-6 shrink-0 animate-marquee-l group-hover/row1:[animation-play-state:paused]">
          {row1.map((item) => (
            <MarqueeCard
              key={item.id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </div>
        <div className="flex gap-6 shrink-0 animate-marquee-l group-hover/row1:[animation-play-state:paused]" aria-hidden="true">
          {row1.map((item) => (
            <MarqueeCard
              key={`${item.id}-dup`}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </div>

      {/* Row 2: Right */}
      <div 
        className="relative overflow-visible w-full flex gap-6 select-none py-2 group/row2 transition-transform duration-100 ease-out"
        style={{ transform: 'translate3d(var(--scroll-offset, 0px), 0, 0)' }}
      >
        <div className="flex gap-6 shrink-0 animate-marquee-r group-hover/row2:[animation-play-state:paused]">
          {row2.map((item) => (
            <MarqueeCard
              key={item.id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </div>
        <div className="flex gap-6 shrink-0 animate-marquee-r group-hover/row2:[animation-play-state:paused]" aria-hidden="true">
          {row2.map((item) => (
            <MarqueeCard
              key={`${item.id}-dup`}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </div>

      {/* Row 3: Left */}
      <div 
        className="relative overflow-visible w-full flex gap-6 select-none py-2 group/row3 transition-transform duration-100 ease-out"
        style={{ transform: 'translate3d(calc(-1 * var(--scroll-offset, 0px)), 0, 0)' }}
      >
        <div className="flex gap-6 shrink-0 animate-marquee-l group-hover/row3:[animation-play-state:paused]">
          {row3.map((item) => (
            <MarqueeCard
              key={item.id}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </div>
        <div className="flex gap-6 shrink-0 animate-marquee-l group-hover/row3:[animation-play-state:paused]" aria-hidden="true">
          {row3.map((item) => (
            <MarqueeCard
              key={`${item.id}-dup`}
              item={item}
              onCardClick={onCardClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const CreativeVault: React.FC<CreativeVaultProps> = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeInsta, setActiveInsta] = useState<string | null>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll linked translation effect using CSS Variables
  useEffect(() => {
    const container = marqueeContainerRef.current;
    if (!container) return;

    let containerTop = 0;
    let containerHeight = 0;

    const updateDimensions = () => {
      let el: HTMLElement | null = container;
      let top = 0;
      while (el) {
        top += el.offsetTop;
        el = el.offsetParent as HTMLElement;
      }
      containerTop = top;
      containerHeight = container.offsetHeight;
    };

    updateDimensions();

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewHeight = window.innerHeight;
      
      const rectTop = containerTop - scrollY;
      const rectBottom = rectTop + containerHeight;

      // Only execute updates if container is inside or approaching the viewport
      if (rectTop < viewHeight && rectBottom > 0) {
        const progress = (viewHeight - rectTop) / (viewHeight + containerHeight);
        const maxOffset = 220; // Maximum scroll shift in pixels
        const currentOffset = progress * maxOffset;
        container.style.setProperty('--scroll-offset', `${currentOffset}px`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateDimensions);
    
    // Trigger initial loop sync
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const handleCardClick = useCallback((image: string, instagramUrl?: string) => {
    sfx.playTick('click');
    setActiveImage(image);
    setActiveInsta(instagramUrl || null);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleCloseLightbox = useCallback(() => {
    sfx.playTick('click');
    setActiveImage(null);
    setActiveInsta(null);
    document.body.style.overflow = '';
  }, []);

  return (
    <section
      id="vault"
      className="relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-16 bg-transparent z-10 select-none overflow-hidden border-b border-white/5"
    >
      <style>{`
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
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 sm:mb-20 md:mb-32 lg:mb-40 text-left reveal">
          <div>
            <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 block mb-3">
              04 — CINEMATIC ARCHIVES
            </span>
            <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-heading font-light tracking-[-0.03em] text-white leading-tight">
              Visual Exhibition Vault
            </h2>
          </div>
          <p className="max-w-xs text-[14px] sm:text-[16px] font-body text-white/45 leading-relaxed">
            Explore the infinite exhibition of conceptual movie posters, custom layouts, and theatrical art prints designed to feel like single cinematic frames.
          </p>
        </div>

        {/* Full View Screen-Edge Infinite Marquee Wall */}
        <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] select-none mt-8 md:mt-12 lg:mt-16 reveal reveal-delay-200">
          <InfiniteMarqueeWall
            onCardClick={handleCardClick}
            containerRef={marqueeContainerRef}
          />
        </div>

      </div>

      {/* Fullscreen Details Lightbox Modal */}
      {activeImage && createPortal(
        <div
          onClick={handleCloseLightbox}
          className="fixed inset-0 bg-black/98 z-[100000] flex flex-col items-center justify-center p-4 cursor-zoom-out animate-fade-in always-dark"
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

          {/* Lightbox Content Layout */}
          <div className="flex flex-col items-center gap-6 max-w-4xl max-h-[85vh]">
            <div className="relative flex items-center justify-center overflow-hidden rounded-lg shadow-[0_20px_60px_rgba(0,136,255,0.12)] border border-white/5">
              <ProgressiveImage
                src={activeImage}
                alt="Poster Detail View"
                className="max-w-full max-h-[72vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            
            {activeInsta && (
              <a
                href={activeInsta}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => sfx.playTick('hover')}
                className="flex items-center gap-2 bg-[#ff7700] hover:bg-[#ff7700]/95 text-white rounded-full px-6 py-2.5 text-[11px] font-heading font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(255,119,0,0.35)] cursor-pointer"
              >
                <span>View on Instagram</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="translate-y-[0.5px]">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
