import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { sfx } from '../utils/sfx';
import { ProgressiveImage } from './ProgressiveImage';
import { LiquidGlassCard } from './LiquidGlassCard';

interface NewArrivalsProps {
  onNavClick?: (sectionId: string) => void;
}

interface ArrivalItem {
  id: string;
  title: string;
  image: string;
  category: string;
  desc: string;
}

const arrivalsData: ArrivalItem[] = [
  {
    id: 'dune-part-three-v2',
    title: 'Dune: Part Three | Minimalist Cinematic Poster',
    image: '/Poster/Dune Part Three V-2.webp',
    category: 'Theatrical Key Art',
    desc: 'A minimalist cinematic key art tribute for Dune: Part Three, capturing the vast silent horizons of Arrakis and Paul Atreides\' path.'
  },
  {
    id: 'sing-geetham',
    title: 'Sing Geetham',
    image: '/Poster/Sing geetham Poster.webp',
    category: 'Fantasy / Drama',
    desc: 'Set in the mythical region of Kuberapuram, a beautiful greenery village rich in gold mines. Due to greed, deforestation leads to a divine curse where everyone communicates solely through song, and eventually turns to gold by touching. Repentance and prayers to Lord Kubera lift the curse, bringing rain and restoring the greenery.'
  },
  {
    id: 'american-psycho',
    title: 'American Psycho',
    image: '/Poster/American Psycho Poster.webp',
    category: 'Psychological Thriller',
    desc: 'A striking graphic novel-style key art tribute to the psychological thriller "American Psycho". The design captures the dual nature of Patrick Bateman—the polished corporate mask juxtaposed with his chaotic inner descent, utilizing halftone textures and bold typography.'
  },
  {
    id: 'spiderman-bnd-v2',
    title: 'Spider-Man BND V-2',
    image: '/Poster/Spiderman BND v-2.webp',
    category: 'Cinematic IMAX',
    desc: 'An IMAX layout tribute celebrating the classic Spider-Man Brand New Day series, highlighting high-speed dynamics and comic halftone textures.'
  },
  {
    id: 'obsession',
    title: 'OBSESSION',
    image: '/Poster/OBSESSION Poster.webp',
    category: 'Cinematic Horror',
    desc: 'This poster is a study of the fraught and conflicted relationship between desire and destruction, expressed in a minimalist but symbolic visual style. Two characters are on opposite sides of a broken platform, separated by an insurmountable gap representing emotional distance.'
  },
  {
    id: 'dudeholic',
    title: 'DUDEHOLIC',
    image: '/Poster/Dudeholic Poster.webp',
    category: 'Music Editorial',
    desc: 'A premium editorial music spread visualizing sonic rhythms through experimental layout formats and bespoke graphic grids.'
  },
  {
    id: 'dune-part-three',
    title: 'Dune: Part Three',
    image: '/Poster/Dune Part-3 Lisan al-gaib post.webp',
    category: 'Theatrical Key Art',
    desc: 'A speculative key art tribute depicting Paul Atreides as the Lisan al-Gaib, utilizing golden desert dunes and stark atmospheric typography.'
  },
  {
    id: 'doctor-doom',
    title: 'Avengers: Doomsday',
    image: '/Poster/Doctor Doom Poster.webp',
    category: 'Marvel Concept',
    desc: 'An Avengers: Doomsday concept artwork highlighting Victor von Doom in his sovereign armor, layered with emerald energy spikes.'
  },
  {
    id: 'raga-of-revenge',
    title: 'Raga of Revenge',
    image: '/Poster/Raga of Revenge-DC.webp',
    category: 'Action Thriller',
    desc: 'An action thriller theatrical concept framing a high-octane cinematic face-off with low-key dramatic lighting.'
  },
  {
    id: 'the-odyssey',
    title: 'The Odyssey',
    image: '/Poster/The odyssey Post.webp',
    category: 'Mythological Concept',
    desc: 'A classic mythological concept poster outlining the epic journey of Odysseus across uncharted seas.'
  }
];

export const NewArrivals: React.FC<NewArrivalsProps> = ({ onNavClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string>('dune-part-three-v2');

  const [sectionRect, setSectionRect] = useState<DOMRect | null>(null);

  const handleSectionMouseEnter = () => {
    const section = sectionRef.current;
    if (!section) return;
    setSectionRect(section.getBoundingClientRect());
  };

  // Section mouse tracking for dynamic background glow (passionate red & cyber magenta)
  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const section = sectionRef.current;
    if (!section || !sectionRect) return;
    const x = e.clientX - sectionRect.left;
    const y = e.clientY - sectionRect.top;
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
      onMouseEnter={handleSectionMouseEnter}
      onMouseMove={handleSectionMouseMove}
      onMouseLeave={handleSectionMouseLeave}
      className="relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-16 bg-transparent z-10 select-none overflow-hidden border-b border-white/5 transition-all duration-300"
    >
      {/* Interactive Ambient Crimson Glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out"
        style={{
          background: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 119, 0, 0.07) 0%, rgba(0, 136, 255, 0.02) 45%, transparent 100%)`,
          opacity: 'var(--glow-opacity, 0)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid Layout to match reference layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, description, and slider controls */}
          <div className="col-span-1 lg:col-span-4 flex flex-col justify-between self-stretch text-left reveal lg:pl-8">
            <div>
              {/* Uppercase inline colored Tagline */}
              <span className="text-[12px] font-heading font-semibold tracking-[0.2em] uppercase text-white/55 block mb-3">
                LATEST <span className="text-[#ff7700]">ARRIVALS</span>
              </span>
              
              {/* Large Display Title */}
              <h2 className="text-[clamp(2rem,6vw,3.375rem)] font-heading font-light tracking-[-0.03em] text-white leading-tight mb-6">
                Creative Exhibition Releases
              </h2>

              {/* Storytelling Narrative Description */}
              <p className="text-[14px] sm:text-[15px] font-body text-white/45 leading-relaxed pr-2 sm:pr-8 select-text min-h-[100px]">
                {arrivalsData.find(item => item.id === activeId)?.desc || arrivalsData[0].desc}
              </p>
            </div>

            {/* Circular Slider Controllers (Left/Right Arrows) */}
            <div className="flex items-center gap-3.5 mt-8 sm:mt-12 lg:mt-24">
              <LiquidGlassCard
                onClick={() => handleArrowScroll('left')}
                onMouseEnter={() => sfx.playTick('hover')}
                className="w-12 h-12 rounded-full lg-panel text-white hover:text-black flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
                options={{ radius: 24 }}
                aria-label="Previous Slide"
                data-cursor="Prev"
                data-magnetic
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </LiquidGlassCard>

              <LiquidGlassCard
                onClick={() => handleArrowScroll('right')}
                onMouseEnter={() => sfx.playTick('hover')}
                className="w-12 h-12 rounded-full lg-panel text-white hover:text-black flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg active:scale-95"
                options={{ radius: 24 }}
                aria-label="Next Slide"
                data-cursor="Next"
                data-magnetic
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </LiquidGlassCard>
            </div>
          </div>

          {/* Right Column: Horizontal slider row, bottom progress track, and 'View All' link pill */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-6 w-full overflow-hidden reveal reveal-delay-200 lg:-mr-20 lg:translate-y-4">
            
            {/* View All Pill Link row */}
            <div className="flex justify-end items-center mb-1 pr-1 sm:pr-4">
              <button
                onClick={() => {
                  sfx.playTick('click');
                  onNavClick?.('works');
                }}
                onMouseEnter={() => sfx.playTick('hover')}
                className="bg-[#ff7700] hover:bg-[#ff7700]/90 text-white rounded-full px-6 py-2.5 text-[11px] font-heading font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_15px_rgba(255,119,0,0.35)] hover:scale-[1.03] select-none cursor-pointer"
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
              className="w-full overflow-x-auto flex gap-6 pt-6 pb-10 select-none scrollbar-none snap-x snap-mandatory relative z-10 cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              data-cursor="Drag view"
            >
               {arrivalsData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    handleCardClick(item.image);
                    setActiveId(item.id);
                  }}
                  onMouseEnter={() => {
                    sfx.playTick('hover');
                    setActiveId(item.id);
                  }}
                  className="w-[240px] sm:w-[280px] flex-shrink-0 snap-start flex flex-col group cursor-pointer"
                >
                  {/* Card Image Container with discomorphism styling */}
                  <div className="w-full aspect-[3/4.2] rounded-2xl overflow-hidden bg-[#0C0C0C] border border-white/5 border-disco-hover transition-all duration-500 relative shadow-lg">
                    
                    {/* Pulsing orange trending badge for Sing Geetham & Dune Part Three V-2 */}
                    {(item.id === 'sing-geetham' || item.id === 'dune-part-three-v2') && (
                      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-[#ff7700]/30 rounded-full px-2.5 py-1">
                        <span className="w-1.5 h-1.5 bg-[#ff7700] rounded-full animate-ping" />
                        <span className="w-1.5 h-1.5 bg-[#ff7700] rounded-full absolute" />
                        <span className="text-[8px] font-heading font-semibold tracking-wider uppercase text-white leading-none flex items-center gap-1">
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-[#ff7700]">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                            <polyline points="17 6 23 6 23 12" />
                          </svg>
                          {item.id === 'dune-part-three-v2' ? 'TRENDING LATEST' : 'TRENDING'}
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
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#ff7700] to-[#0088ff] rounded-full transition-all duration-[150ms] ease-out shadow-[0_0_8px_rgba(255,119,0,0.7)]"
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
          className="fixed inset-0 bg-black/98 z-[100000] flex items-center justify-center p-4 cursor-zoom-out animate-fade-in always-dark"
        >
          {/* Close button */}
          <LiquidGlassCard
            onClick={handleCloseLightbox}
            onMouseEnter={() => sfx.playTick('hover')}
            className="fixed top-6 right-6 lg-panel text-white hover:text-black rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 z-[100005] cursor-pointer"
            options={{ radius: 24 }}
            data-cursor="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </LiquidGlassCard>

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
