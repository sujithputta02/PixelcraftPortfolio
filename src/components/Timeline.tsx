import React, { useEffect, useRef, useState } from 'react';
import { sfx } from '../utils/sfx';

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

const timelineData: TimelineItem[] = [
  {
    year: 'Jan 7th, 2026',
    title: 'Started PixelCraft',
    desc: 'Founded PixelCraft by Sujith, a spec design lab focused on cinematic art prints, creative design layouts, and speculative branding exercises.'
  },
  {
    year: 'Early 2026',
    title: 'Built Cinematic Poster Collection',
    desc: 'Crafted over 20+ premium high-contrast digital illustrations including Marvel, Batman, Ferrari, Oppenheimer, and sci-fi universes. Shared across visual design curators and accumulated wide followings.'
  },
  {
    year: 'Mid 2026',
    title: 'Expanded into Branding & Storytelling',
    desc: 'Integrated modern neo-grotesque UI design layouts (like Tastico branding systems) with fine art composites, raising commercial agency aesthetics to physical museum standards.'
  },
  {
    year: 'Present',
    title: 'Freelance Designer | Open for Collaborations',
    desc: 'Open to visual storytelling campaigns, custom theatrical poster layouts, creative direction consulting, and bespoke branding requests for clients worldwide.'
  }
];

export const Timeline: React.FC = () => {
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const elements = containerRef.current.querySelectorAll('.timeline-node');
      const windowHeight = window.innerHeight;
      const triggerPoint = windowHeight * 0.75; // light up when 75% up viewport

      const newActive: number[] = [];
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerPoint) {
          newActive.push(index);
        }
      });
      setActiveIndices(newActive);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="timeline"
      className="relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-16 bg-[#0E0E0E] z-10 select-none overflow-hidden border-b border-white/5"
    >
      {/* Background Ambience */}
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-white/[0.01] blur-[110px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-20">
        <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 block mb-3">
          07 — CHRONOLOGY
        </span>
        <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-heading font-light tracking-[-0.03em] text-white leading-tight">
          Journey & Milestones
        </h2>
      </div>

      {/* Trajectory Container */}
      <div ref={containerRef} className="max-w-3xl mx-auto relative select-none">
        
        {/* Static Background Vertical Line */}
        <div className="absolute left-[21px] sm:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
        
        {/* Dynamic Highlight Progress Vertical Line */}
        <div 
          className="absolute left-[21px] sm:left-1/2 top-0 w-[1.5px] bg-gradient-to-b from-white via-white to-white/10 -translate-x-1/2 transition-all duration-[600ms] ease-out origin-top"
          style={{
            height: `${(activeIndices.length / timelineData.length) * 92}%`
          }}
        />

        {/* Milestone Node Blocks */}
        <div className="flex flex-col gap-16 select-none relative z-10">
          {timelineData.map((item, index) => {
            const isActive = activeIndices.includes(index);
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`timeline-node flex flex-col sm:flex-row items-start sm:items-center relative w-full ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Node Center Dot */}
                <div
                  className={`absolute left-[21px] sm:left-1/2 w-4 h-4 rounded-full border -translate-x-1/2 transition-all duration-[600ms] z-35 flex items-center justify-center ${
                    isActive
                      ? 'bg-white border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.8)]'
                      : 'bg-[#0E0E0E] border-white/20 scale-100'
                  }`}
                />

                {/* Left/Right Card bounds */}
                <div className={`w-full sm:w-[45%] pl-14 sm:pl-0 ${isEven ? 'sm:text-left sm:pr-8' : 'sm:text-right sm:pl-8'}`}>
                  
                  {/* Year Tag */}
                  <div
                    className={`inline-block text-[15px] sm:text-[18px] font-heading font-semibold tracking-wider uppercase mb-2 sm:mb-3 transition-colors duration-500 ${
                      isActive ? 'text-white' : 'text-white/30'
                    }`}
                  >
                    {item.year}
                  </div>

                  {/* Glassmorphic Description Card */}
                  <div
                    onMouseEnter={() => sfx.playTick('hover')}
                    className={`bg-white/[0.015] border p-6 rounded-2xl transition-all duration-[800ms] backdrop-blur-md ${
                      isActive
                        ? 'border-white/12 translate-y-0 opacity-100 bg-white/[0.025]'
                        : 'border-white/5 translate-y-6 opacity-40'
                    }`}
                  >
                    <h3 className="text-[17px] sm:text-[20px] font-heading font-semibold text-white tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] font-body text-[#A3A3A3] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                </div>

                {/* Empty buffer for spacing on wide views */}
                <div className="hidden sm:block w-[45%]" />

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};
