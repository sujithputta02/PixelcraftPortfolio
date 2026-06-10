import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { sfx } from '../utils/sfx';
import { ProgressiveImage } from './ProgressiveImage';

interface NewArrivalsProps {
  onNavClick?: (sectionId: string) => void;
}

interface ArrivalItem {
  id: string;
  title: string;
  image: string;
  category: string;
}

const arrivalsData: ArrivalItem[] = [
  {
    id: 'obsession',
    title: 'OBSESSION',
    image: '/Poster/OBSESSION Poster.png',
    category: 'Cinematic Horror'
  },
  {
    id: 'dudeholic',
    title: 'DUDEHOLIC',
    image: '/Poster/Dudeholic Poster.png',
    category: 'Music Editorial'
  },
  {
    id: 'dune-part-three',
    title: 'Dune: Part Three',
    image: '/Poster/Dune Part-3 Lisan al-gaib post.png',
    category: 'Theatrical Key Art'
  },
  {
    id: 'doctor-doom',
    title: 'Avengers: Doomsday',
    image: '/Poster/Doctor Doom Poster.png',
    category: 'Marvel Concept'
  },
  {
    id: 'raga-of-revenge',
    title: 'Raga of Revenge',
    image: '/Poster/Raga of Revenge-DC.png',
    category: 'Action Thriller'
  },
  {
    id: 'the-odyssey',
    title: 'The Odyssey',
    image: '/Poster/The odyssey Post.png',
    category: 'Mythological Concept'
  }
];

export const NewArrivals: React.FC<NewArrivalsProps> = ({ onNavClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Section mouse tracking for dynamic background glow (passionate red & cyber magenta)
  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    section.style.setProperty('--mouse-x', `${x}px`);
    section.style.setProperty('--mouse-y', `${y}px`);
    section.style.setProperty('--glow-opacity', '1');
  };

  const handleSectionMouseLeave = () => {
    const section = sectionRef.current;
    if (!section) return;
    section.style.setProperty('--glow-opacity', '0');
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) return;
    const progress = (slider.scrollLeft / maxScroll) * 100;
    setScrollProgress(progress);
  };

  const handleArrowScroll = (direction: 'left' | 'right') => {
    sfx.playTick('click');
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = slider.clientWidth > 768 ? 340 : 280; // card width + gap
    if (direction === 'left') {
      slider.scrollLeft -= cardWidth;
    } else {
      slider.scrollLeft += cardWidth;
    }
  };

  // Run initial progress check on mount
  useEffect(() => {
    handleScroll();
  }, []);

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

  return (
    <section
      id="latest"
      ref={sectionRef}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-16 bg-[#050505] z-10 select-none overflow-hidden border-b border-white/5 transition-all duration-300"
    >
      {/* Interactive Ambient Crimson Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out"
        style={{
          background: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(239, 68, 68, 0.07) 0%, rgba(255, 0, 127, 0.02) 45%, transparent 100%)`,
          opacity: 'var(--glow-opacity, 0)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid Layout to match reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, description, and slider controls */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-between self-stretch text-left">
            <div>
              {/* Uppercase inline colored Tagline */}
              <span className="text-[12px] font-heading font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
                LATEST <span className="text-[#ff007f]">ARRIVALS</span>
              </span>
              
              {/* Large Display Title */}
              <h2 className="text-[36px] sm:text-[48px] md:text-[54px] font-heading font-light tracking-[-0.03em] text-white leading-tight mb-6">
                Creative Exhibition Releases
              </h2>

              {/* Storytelling Narrative Description */}
              <p className="text-[14px] sm:text-[15px] font-body text-white/45 leading-relaxed pr-2 sm:pr-8 select-text">
                This poster is a study of the fraught and conflicted relationship between desire and destruction, expressed in a minimalist but symbolic visual style. Two characters are on opposite sides of a broken platform, separated by an insurmountable gap that represents emotional distance, isolation and the effects of unhealthy attachment.
              </p>
            </div>

            {/* Circular Slider Controllers (Left/Right Arrows) */}
            <div className="flex items-center gap-3.5 mt-8 sm:mt-12 lg:mt-24">
              <button
                onClick={() => handleArrowScroll('left')}
                onMouseEnter={() => sfx.playTick('hover')}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
                aria-label="Previous Slide"
                data-cursor="Prev"
                data-magnetic
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>

              <button
                onClick={() => handleArrowScroll('right')}
                onMouseEnter={() => sfx.playTick('hover')}
                className="w-12 h-12 rounded-full border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
                aria-label="Next Slide"
                data-cursor="Next"
                data-magnetic
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column: Horizontal slider row, bottom progress track, and 'View All' link pill */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-6 w-full overflow-hidden">
            
            {/* View All Pill Link row */}
            <div className="flex justify-end items-center mb-1 pr-1 sm:pr-4">
              <button
                onClick={() => {
                  sfx.playTick('click');
                  onNavClick?.('works');
                }}
                onMouseEnter={() => sfx.playTick('hover')}
                className="bg-[#ff007f] hover:bg-[#ff007f]/90 text-white rounded-full px-6 py-2.5 text-[11px] font-heading font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(255,0,127,0.35)] hover:scale-[1.03] select-none cursor-pointer"
                data-cursor="Showcase"
                data-magnetic
              >
                View All
              </button>
            </div>

            {/* Horizontal Carousel Snap Track */}
            <div
              ref={sliderRef}
              onScroll={handleScroll}
              className="w-full overflow-x-auto flex gap-6 pb-6 select-none scrollbar-none snap-x snap-mandatory relative z-10 cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              data-cursor="Drag view"
            >
               {arrivalsData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleCardClick(item.image)}
                  onMouseEnter={() => sfx.playTick('hover')}
                  className="w-[240px] sm:w-[280px] flex-shrink-0 snap-start flex flex-col group cursor-pointer"
                >
                  {/* Card Image Container with discomorphism styling */}
                  <div className="w-full aspect-[3/4.2] rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 border-disco-hover transition-all duration-500 relative shadow-lg">
                    
                    {/* Pulsing red arrival dot for the main item */}
                    {item.id === 'obsession' && (
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-red-500/30 rounded-full px-2.5 py-1">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full absolute" />
                        <span className="text-[8px] font-heading font-semibold tracking-wider uppercase text-white leading-none">
                          LATEST
                        </span>
                      </div>
                    )}

                    <ProgressiveImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-[1000ms] ease-out"
                      loading="lazy"
                    />

                    {/* Dark gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Clean Text Captions (directly below each card matching reference screenshot) */}
                  <div className="mt-3 text-left pl-1">
                    <span className="text-[15px] sm:text-[17px] font-heading font-semibold text-white tracking-tight leading-none block">
                      {item.title}
                    </span>
                    <span className="text-[10px] font-heading font-medium tracking-wider uppercase text-white/40 block mt-1.5">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Horizontal Line Progress Bar Tracker */}
            <div className="w-[180px] sm:w-[220px] mx-auto mt-4 h-[2px] bg-white/10 rounded-full relative overflow-hidden">
              <div 
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#ff007f] to-[#00ffff] rounded-full transition-all duration-[150ms] ease-out shadow-[0_0_8px_rgba(255,0,127,0.7)]"
                style={{ width: `${scrollProgress}%` }}
              />
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
