import React, { useRef, useState, useEffect } from 'react';
import { sfx } from '../utils/sfx';

interface PhilosophyItem {
  quote: string;
  title: string;
  category: string;
}

const philosophyData: PhilosophyItem[] = [
  {
    quote: "A graphic is static; a story is dynamic. Every layout I craft is approached not merely as a combination of elements, but as a single cinematic frame captured mid-narrative.",
    title: "The Narrative Frame",
    category: "Aesthetic Core"
  },
  {
    quote: "Typography is not just for legibility; it is structural. Meticulous geometric alignment paired with elegant script scripts forms the architectural spine of modern branding.",
    title: "Typographic Architecture",
    category: "Visual Grid"
  },
  {
    quote: "Depth is generated not by packing structural blocks, but by manipulating ambient specular glows and micro-textures. We design atmospheric dark rooms, not utility grids.",
    title: "The Specular Glow",
    category: "Lighting & Texture"
  },
  {
    quote: "Speculative poster design is an exploration of cultural memory. Drawing inspiration from cinema, music, pop culture, and sci-fi universes allows us to create visual footprints people remember.",
    title: "Speculative Archives",
    category: "Inspiration Drive"
  }
];

const TestimonialCard: React.FC<{ item: PhilosophyItem }> = ({ item }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isHovered, setIsHovered] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = (yc - y) / 10; // 3D tilt rotation intensity
    const rotateY = (x - xc) / 10;

    if (!isHovered) {
      sfx.playTick('hover');
    }

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 0, 127, 0.18), 0 0 20px rgba(0, 255, 255, 0.12)'
    });
    setSpotlightPos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: ''
    });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className="w-[85vw] sm:w-[420px] flex-shrink-0 rounded-2xl p-8 sm:p-10 relative group text-left disco-card border-disco-chrome transition-all duration-500"
    >
      {/* Mirror Tile grid overlay inside card */}
      <div className="disco-tile-grid opacity-25 pointer-events-none" />
      
      {/* Twinkling sparkles on card hover */}
      <div className="disco-sparkle top-4 left-6 sparkle-slow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="disco-sparkle bottom-6 right-8 sparkle-fast pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Dynamic Interactive Specular Spotlight follower */}
      {isHovered && (
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-300 opacity-100"
          style={{
            top: spotlightPos.y - 100,
            left: spotlightPos.x - 100,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 70%)',
            borderRadius: '50%'
          }}
        />
      )}

      {/* Elegant Quotation Marks watermark */}
      <span className="absolute top-4 right-8 font-cursive text-[100px] leading-none text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500 pointer-events-none select-none z-10">
        ✳︎
      </span>

      {/* Manifesto content */}
      <p className="text-[15px] sm:text-[18px] font-body font-light text-white/85 leading-relaxed mb-8 italic relative z-10">
        "{item.quote}"
      </p>

      {/* Divider line */}
      <div className="w-12 h-[1px] bg-white/10 mb-4 relative z-10" />

      {/* Title / Category Stack */}
      <div className="relative z-10">
        <span className="text-[14px] font-heading font-semibold text-white block">
          {item.title}
        </span>
        <span className="text-[11px] font-heading font-medium tracking-wider uppercase text-disco block mt-0.5">
          {item.category}
        </span>
      </div>

    </div>
  );
};

export const Testimonials: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const slider = sliderRef.current;
    if (!slider) return;
    setIsDown(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown) return;
    e.preventDefault();
    const slider = sliderRef.current;
    if (!slider) return;
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll-speed
    slider.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) return;
    const progress = (slider.scrollLeft / maxScroll) * 100;
    setScrollProgress(progress);
  };

  // Run initial progress calculation
  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <section
      className="relative w-full py-24 md:py-32 bg-[#050505] z-10 select-none overflow-hidden"
    >
      
      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-white/[0.01] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 mb-16 sm:mb-20 text-left">
        <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 block mb-3">
          08 — VISION
        </span>
        <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-heading font-light tracking-[-0.03em] text-white leading-tight">
          Creative Philosophy
        </h2>
      </div>

      {/* Free-flowing touch/drag slider */}
      <div
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onScroll={handleScroll}
        className="w-full overflow-x-auto flex gap-6 sm:gap-8 px-5 sm:px-8 md:px-16 pb-8 select-none scrollbar-none cursor-grab active:cursor-grabbing scroll-smooth relative z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        data-cursor="Drag Slider"
      >
        {philosophyData.map((item, index) => (
          <TestimonialCard key={index} item={item} />
        ))}
      </div>

      {/* Luxury Dynamic Progress Track */}
      <div className="max-w-[140px] sm:max-w-[180px] mx-auto mt-10 h-[2px] bg-white/10 rounded-full relative overflow-hidden z-10">
        <div 
          className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#ff007f] to-[#00ffff] rounded-full transition-all duration-[100ms] ease-out shadow-[0_0_8px_rgba(255,0,127,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

    </section>
  );
};
