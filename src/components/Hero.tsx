import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { sfx } from '../utils/sfx';
import { ProgressiveImage } from './ProgressiveImage';
import { LiquidGlassCard } from './LiquidGlassCard';

interface HeroProps {
  onNavClick: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavClick }) => {
  const [scrollY, setScrollY] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    setRect(e.currentTarget.getBoundingClientRect());
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = (yc - y) / 14; // subtle 3D tilt rotation
    const rotateY = (x - xc) / 14;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 119, 0, 0.15)'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: ''
    });
  };

  const handleBtnClick = (action: 'works' | 'contact') => {
    sfx.playTick('click');
    if (action === 'works') {
      onNavClick('works');
    } else {
      onNavClick('contact');
    }
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

  // Fade out typography elements by 1.2x height of screen scroll
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
  const progress = Math.max(0, Math.min(1, scrollY / (viewportHeight * 0.8)));
  const fadeOutOpacity = Math.max(0, 1 - progress);
  const textTranslateY = -progress * 120;

  return (
    <section 
      id="hero"
      className="relative w-full min-h-screen flex justify-center items-start lg:items-center px-5 sm:px-8 md:px-16 overflow-hidden select-none bg-transparent pt-32 sm:pt-36 lg:pt-16 pb-16 always-dark"
    >
      {/* Designer draft sheet dot grid */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 transition-opacity duration-500 opacity-[0.02]" 
           style={{ 
             backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)', 
             backgroundSize: '24px 24px' 
           }} />

      {/* Atmospheric backlight overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 bg-radial from-transparent via-[#050505]/40 to-[#050505] opacity-80"
      />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Column: Typography & CTA */}
        <div 
          className="lg:col-span-7 flex flex-col items-start text-left transition-all duration-[80ms] ease-out"
          style={{
            opacity: fadeOutOpacity,
            transform: `translate3d(0, ${textTranslateY}px, 0)`,
            pointerEvents: fadeOutOpacity > 0.05 ? 'auto' : 'none'
          }}
        >
          {/* Subtle Tagline Accent */}
          <LiquidGlassCard 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full lg-panel mb-6 animate-fade-in"
            options={{ radius: 15 }}
          >
            <span className="w-1.5 h-1.5 bg-[#ff7700] rounded-full animate-pulse" />
            <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.28em] text-white/80">
              PixelCraft Creative Studio
            </span>
          </LiquidGlassCard>

          {/* Premium Serif Typography Headline */}
          <h1 className="text-[clamp(2.2rem,8vw,4.75rem)] font-heading font-extrabold uppercase leading-[0.92] tracking-tighter text-white max-w-2xl mb-6">
            Crafting Digital <br />
            <span 
              className="font-light tracking-[0.06em]"
              style={{ WebkitTextStroke: '1.2px rgba(255, 255, 255, 0.75)', color: 'transparent' }}
            >
              Experiences
            </span> That Inspire
          </h1>

          {/* Premium Subheadline */}
          <p className="text-[15px] sm:text-[18px] font-body font-light tracking-wide max-w-xl leading-relaxed mb-10 text-white/70">
            Where Design, Engineering & AI Converge
          </p>

          {/* Interactive CTA Buttons Grid */}
          <div className="flex flex-wrap gap-4.5">
            <button
              onClick={() => handleBtnClick('works')}
              onMouseEnter={() => sfx.playTick('hover')}
              className="px-8 py-3.5 rounded-full text-[12px] sm:text-[13px] font-heading font-bold uppercase tracking-[0.16em] duration-300 transform active:scale-95 cursor-pointer shadow-lg bg-white text-black hover:bg-white/90 shadow-white/5"
              data-cursor="View Works"
              data-magnetic
            >
              View Projects
            </button>
            
            <LiquidGlassCard
              onClick={() => handleBtnClick('contact')}
              onMouseEnter={() => sfx.playTick('hover')}
              className="px-8 py-3.5 rounded-full text-[12px] sm:text-[13px] font-heading font-bold uppercase tracking-[0.16em] lg-panel transition-all duration-300 transform active:scale-95 cursor-pointer text-white hover:bg-white/5"
              options={{ radius: 21 }}
              data-cursor="Contact"
              data-magnetic
            >
              Get In Touch
            </LiquidGlassCard>
          </div>
        </div>

        {/* Right Column: Interactive 3D Mockup of Latest Release */}
        <div 
          className="lg:col-span-5 flex justify-center items-center relative select-none mt-12 lg:mt-0 reveal reveal-delay-300"
          style={{ perspective: 1000 }}
        >
          {/* Outer glowing back-glow reflecting Spiderman red/orange colors */}
          <div className="absolute w-[240px] sm:w-[280px] h-[340px] sm:h-[400px] rounded-2xl bg-[#ff7700]/8 blur-[50px] animate-pulse pointer-events-none z-0" />
          
          {/* Mockup Frame with custom 3D tilt */}
          <LiquidGlassCard
            onClick={() => handleCardClick('/Poster/Sing geetham Poster.webp')}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className="w-[240px] sm:w-[280px] aspect-[3/4.2] rounded-2xl lg-panel p-3.5 relative shadow-[0_30px_60px_rgba(0,0,0,0.95)] cursor-pointer group transition-all duration-300 z-10"
            options={{ radius: 36 }}
            data-cursor="Inspect"
            data-magnetic
          >
            {/* Mirror Tile grid overlay inside card */}
            <div className="disco-tile-grid opacity-15 pointer-events-none" />
            
            {/* Red Pulsing Latest Dot badge */}
            <LiquidGlassCard 
              className="absolute top-6 left-6 z-20 flex items-center gap-1.5 lg-panel border border-[#ff7700]/45 rounded-full px-2.5 py-1"
              options={{ radius: 9 }}
            >
              <span className="w-1.5 h-1.5 bg-[#ff7700] rounded-full animate-ping" />
              <span className="w-1.5 h-1.5 bg-[#ff7700] rounded-full absolute" />
              <span className="text-[8px] font-heading font-semibold tracking-wider uppercase text-white leading-none">
                LATEST RELEASE
              </span>
            </LiquidGlassCard>

            {/* Poster Image */}
            <div className="w-full h-full rounded-xl overflow-hidden relative">
              <ProgressiveImage
                src="/Poster/Sing geetham Poster.webp"
                alt="Latest Release - Sing Geetham"
                fetchPriority="high"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out"
              />
              {/* Cover shadow gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Release Metadata Overlay inside Image bottom */}
              <div className="absolute bottom-4 left-4 right-4 text-left transition-opacity duration-300 z-20">
                <span className="text-[14px] font-heading font-semibold text-white tracking-tight leading-none block">
                  Sing Geetham
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#ff7700] block mt-1.5">
                  FANTASY / DRAMA // 2026
                </span>
              </div>
            </div>
          </LiquidGlassCard>
        </div>

      </div>

      {/* Scroll indicator (Fades out when scrolling) */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer transition-opacity duration-300 hidden sm:flex z-10"
        style={{ opacity: Math.max(0, 1 - progress * 4) }}
        onClick={() => onNavClick('about')}
        onMouseEnter={() => sfx.playTick('hover')}
      >
        <span className="text-[9px] uppercase tracking-[0.2em] font-heading text-white/50">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/70 via-white/20 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/80 animate-[bounce_2.5s_infinite]" />
        </div>
      </div>

      {/* Fullscreen Details Lightbox Modal */}
      {activeImage && createPortal(
        <div
          onClick={handleCloseLightbox}
          className="fixed inset-0 bg-black/98 z-[100000] flex items-center justify-center p-4 cursor-zoom-out animate-fade-in always-dark"
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
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_20px_60px_rgba(255,119,0,0.15)]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};
