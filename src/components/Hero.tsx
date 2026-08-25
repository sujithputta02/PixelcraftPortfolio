import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { sfx } from '../utils/sfx';
import { ProgressiveImage } from './ProgressiveImage';
import { LiquidGlassCard } from './LiquidGlassCard';

interface HeroProps {
  onNavClick: (sectionId: string) => void;
}

interface CarouselItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

const CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 'dune-3',
    title: 'Dune: Part Three',
    category: 'Theatrical Key Art',
    image: '/Poster/Dune Part Three V-2.webp',
  },
  {
    id: 'spiderman-bnd',
    title: 'Spider-Man: Brand New Day',
    category: 'Marvel Studio Concept',
    image: '/Poster/Spiderman BND v-2.webp',
  },
  {
    id: 'doctor-doom',
    title: 'Doctor Doom: Raga of Revenge',
    category: 'Character Key Art',
    image: '/Poster/Doctor Doom Poster.webp',
  },
  {
    id: 'interstellar',
    title: 'Interstellar: Event Horizon',
    category: 'Cinematic Poster',
    image: '/Poster/Interstellar Post.webp',
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer: Trinity',
    category: 'Minimalist Key Art',
    image: '/Poster/Oppenheimer Poster.webp',
  },
  {
    id: 'spider-noir',
    title: 'Spider-Man Noir',
    category: 'Comic Editorial Art',
    image: '/Poster/spider noir poster.webp',
  },
  {
    id: 'the-odyssey',
    title: 'The Odyssey: Epic Voyage',
    category: 'AI Pipeline Work',
    image: '/Poster/The odyssey Post.webp',
  },
];

export const Hero: React.FC<HeroProps> = ({ onNavClick }) => {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [, setTick] = useState<number>(0);

  const scrollPosRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);
  const touchLastXRef = useRef<number | null>(null);

  // Parallax scroll & window resize listeners
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Continuous loop animation ticker
  useEffect(() => {
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = Math.min(time - lastTime, 32);
      lastTime = time;

      if (!isHovered) {
        scrollPosRef.current += delta * 0.07;
      }

      setTick(performance.now());
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered]);

  // Touch drag swipe handlers for mobile & tablet screens
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchLastXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchLastXRef.current !== null) {
      const currentX = e.touches[0].clientX;
      const deltaX = touchLastXRef.current - currentX;
      scrollPosRef.current += deltaX * 1.6;
      touchLastXRef.current = currentX;
    }
  };

  const handleTouchEnd = () => {
    touchLastXRef.current = null;
    setIsHovered(false);
  };

  const handleBtnClick = (action: 'works' | 'contact') => {
    sfx.playTick('click');
    onNavClick(action);
  };

  const handleCardClick = (image: string) => {
    sfx.playTick('click');
    setActiveImage(image);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLightbox = () => {
    sfx.playTick('click');
    setActiveImage(null);
    document.body.style.overflow = '';
  };

  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const progress = Math.max(0, Math.min(1, scrollY / (viewportHeight * 0.8)));
  const fadeOutOpacity = Math.max(0, 1 - progress);
  const isMobile = windowWidth < 640;

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden select-none bg-transparent pt-24 sm:pt-32 pb-28 sm:pb-36 always-dark"
    >
      {/* Studio Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.4) 1.5px, transparent 1.5px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Atmospheric Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-[#ff7700]/15 via-purple-600/10 to-blue-600/15 blur-[140px] rounded-full pointer-events-none z-0 animate-pulse" />

      <div
        className="w-full flex flex-col items-center text-center relative z-10 transition-all duration-100 ease-out"
        style={{
          opacity: fadeOutOpacity,
          transform: `translate3d(0, ${-progress * 80}px, 0)`,
        }}
      >
        {/* Top Studio Brand Header */}
        <div className="flex flex-col items-center mb-2 sm:mb-3 select-none z-20 cursor-pointer" onClick={() => onNavClick('hero')}>
          <img
            src="/Pixelcraft Discomorphism wb.webp"
            alt="PixelCraft Logo"
            className="w-9 h-9 sm:w-11 sm:h-11 object-contain mb-2 filter drop-shadow-[0_0_12px_rgba(255,119,0,0.5)] transition-transform duration-500 hover:scale-110 hover:rotate-12"
          />
          <div className="text-[22px] sm:text-[28px] font-heading font-medium tracking-tight text-white flex items-center justify-center">
            PixelCraft<span className="text-[11px] align-super">®</span>
            <span className="font-cursive text-[26px] sm:text-[32px] text-white/90 ml-2.5">by Sujith</span>
          </div>
        </div>

        {/* Edge-to-Edge 100vw 3D Perspective Image Grid Container with Touch Support */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="hero-gallery w-screen relative left-1/2 -translate-x-1/2 h-[320px] sm:h-[440px] md:h-[480px] my-1 sm:my-2 overflow-hidden flex items-center justify-center z-10 touch-pan-x"
          style={{ perspective: isMobile ? 900 : 1100 }}
        >
          <div
            className="w-full h-full relative flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {(() => {
              // Responsive card dimensions optimized for small aspect ratio devices
              let cardWidth = 205;
              let cardGap = 28;

              if (isMobile) {
                cardWidth = 145;
                cardGap = 16;
              } else if (windowWidth < 1024) {
                cardWidth = 165;
                cardGap = 22;
              }

              const unitWidth = cardWidth + cardGap;
              // Duplicate posters 4x to guarantee a dense, unbroken infinite marquee loop across wide screens
              const loopItems = [
                ...CAROUSEL_ITEMS,
                ...CAROUSEL_ITEMS,
                ...CAROUSEL_ITEMS,
                ...CAROUSEL_ITEMS,
              ];
              const totalWidth = loopItems.length * unitWidth;
              const screenHalf = Math.max(260, windowWidth * (isMobile ? 0.42 : 0.48));

              return loopItems.map((item, index) => {
                const initialX = index * unitWidth;
                let relX = (initialX - scrollPosRef.current) % totalWidth;
                if (relX < -totalWidth / 2) relX += totalWidth;
                if (relX > totalWidth / 2) relX -= totalWidth;

                const normX = Math.max(-1.35, Math.min(1.35, relX / screenHalf));

                if (Math.abs(relX) > screenHalf * 1.35) return null;

                // Continuous, smooth 3D perspective transformation tailored for mobile vs desktop
                const clampedNormX = Math.max(-1.3, Math.min(1.3, relX / screenHalf));

                // Trigonometric rotateY curve: smooth continuous rotation from +48deg on left to -48deg on right
                const maxAngle = isMobile ? 38 : 48;
                const rotateY = -Math.sin((clampedNormX / 1.3) * (Math.PI / 2)) * maxAngle;

                // Dynamic Z-depth: center card pops forward for high mobile clarity
                const zBoost = isMobile ? 55 : 45;
                const translateZ = (1 - Math.pow(Math.abs(clampedNormX / 1.3), 1.6)) * zBoost;

                // Dynamic scale: central cards are expanded on mobile for extra visual focus
                const centerScaleBoost = isMobile ? 0.08 : 0.05;
                const scale = (isMobile ? 1.08 : 1.04) - Math.abs(clampedNormX) * centerScaleBoost;

                // Subtle dynamic tilt matching editorial reference design
                const rotateZ = -clampedNormX * (isMobile ? 2.5 : 3.2);

                // Smooth opacity fade out at extreme viewport edges
                const opacity = Math.max(0.35, 1 - Math.pow(Math.max(0, Math.abs(clampedNormX) - 0.75), 2) * 2.2);

                const transformOrigin = 'center center';

                return (
                  <div
                    key={`${item.id}-${index}`}
                    onClick={() => handleCardClick(item.image)}
                    onMouseEnter={() => sfx.playTick('hover')}
                    className="absolute rounded-2xl overflow-hidden cursor-pointer shadow-[0_25px_50px_rgba(0,0,0,0.85)] border border-white/15 group transition-transform duration-100 ease-out will-change-transform"
                    style={{
                      width: `${cardWidth}px`,
                      height: `${cardWidth * 1.4}px`,
                      transform: `translate3d(${relX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                      transformOrigin,
                      opacity,
                      zIndex: Math.round((1 - Math.abs(normX)) * 100),
                    }}
                    data-cursor="Inspect"
                  >
                    <LiquidGlassCard
                      className="w-full h-full rounded-2xl lg-panel p-2 relative border border-white/20 overflow-hidden transition-all duration-300 group-hover:border-[#ff7700] group-hover:shadow-[0_0_30px_rgba(255,119,0,0.4)]"
                      options={{ radius: 18 }}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden relative bg-black/40">
                        <ProgressiveImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                        <div className="absolute bottom-2.5 left-2.5 right-2.5 text-left">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-[#ff7700] block line-clamp-1">
                            {item.category}
                          </span>
                          <h3 className="text-[12px] font-heading font-semibold text-white tracking-tight leading-tight line-clamp-1">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                    </LiquidGlassCard>
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Sub-headline Text & Description */}
        <div className="max-w-2xl mx-auto mt-2 sm:mt-3 mb-6 sm:mb-8 px-4">
          <p className="text-[15px] sm:text-[19px] font-body font-light text-white/80 leading-relaxed tracking-tight">
            Bring your vision to life with PixelCraft’s bespoke cinematic key art, brand storytelling, and interactive digital experiences. Experience flawless craft and artistic precision across every frame.
          </p>
        </div>

        {/* Hero CTA Button Row */}
        <div className="flex items-center gap-4 flex-wrap justify-center mb-6 sm:mb-10">
          <button
            onClick={() => handleBtnClick('works')}
            onMouseEnter={() => sfx.playTick('hover')}
            className="px-8 py-3.5 rounded-full text-[12px] sm:text-[13px] font-heading font-bold uppercase tracking-[0.16em] bg-white text-black hover:bg-white/90 shadow-xl shadow-white/10 active:scale-95 transition-all cursor-pointer"
            data-cursor="View Works"
            data-magnetic
          >
            View Projects
          </button>

          <LiquidGlassCard
            onClick={() => handleBtnClick('contact')}
            onMouseEnter={() => sfx.playTick('hover')}
            className="px-8 py-3.5 rounded-full text-[12px] sm:text-[13px] font-heading font-bold uppercase tracking-[0.16em] lg-panel border border-white/20 text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
            options={{ radius: 99 }}
            data-cursor="Contact"
            data-magnetic
          >
            Get In Touch
          </LiquidGlassCard>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer transition-opacity duration-300 hidden sm:flex z-10"
        style={{ opacity: Math.max(0, 1 - progress * 4) }}
        onClick={() => onNavClick('about')}
        onMouseEnter={() => sfx.playTick('hover')}
      >
        <span className="text-[9px] uppercase tracking-[0.2em] font-heading text-white/50">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-7 bg-gradient-to-b from-white/70 via-white/20 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-[bounce_2.5s_infinite]" />
        </div>
      </div>

      {/* Fullscreen Details Lightbox Modal */}
      {activeImage &&
        createPortal(
          <div
            onClick={handleCloseLightbox}
            className="fixed inset-0 bg-black/98 z-[100000] flex items-center justify-center p-4 cursor-zoom-out animate-fade-in always-dark"
          >
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

            <div className="max-w-4xl max-h-[85vh] relative flex items-center justify-center">
              <ProgressiveImage
                src={activeImage}
                alt="Poster Detail View"
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_20px_60px_rgba(255,119,0,0.25)]"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};

