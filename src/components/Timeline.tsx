import React, { useEffect, useRef, useState } from 'react';
import { useRive } from '@rive-app/react-canvas';
import { sfx } from '../utils/sfx';
import { LiquidGlassCard } from './LiquidGlassCard';


interface TimelineItem {
  year: string;
  title: string;
  desc: string;
  x: number; // Horizontal coordinate offset along the film track (pixels)
  position: 'above' | 'below';
  scene: string;
}

const timelineData: TimelineItem[] = [
  {
    year: 'Jan 7th, 2026',
    title: 'Started PixelCraft',
    desc: 'Founded PixelCraft by Sujith, a spec design lab focused on cinematic art prints, creative design layouts, and speculative branding exercises.',
    x: 250,
    position: 'above',
    scene: 'SCENE_01'
  },
  {
    year: 'Early 2026',
    title: 'Built Cinematic Poster Collection',
    desc: 'Crafted over 20+ premium high-contrast digital illustrations including Marvel, Batman, Ferrari, Oppenheimer, and sci-fi universes. Shared across curators and accumulated wide followings.',
    x: 650,
    position: 'below',
    scene: 'SCENE_02'
  },
  {
    year: 'Mid 2026',
    title: 'Expanded into Branding & Storytelling',
    desc: 'Integrated modern neo-grotesque UI design layouts (like Tastico branding systems) with fine art composites, raising commercial agency aesthetics to physical museum standards.',
    x: 1050,
    position: 'above',
    scene: 'SCENE_03'
  },
  {
    year: 'Present',
    title: 'Freelance Designer | Collaborations',
    desc: 'Open to visual storytelling campaigns, custom theatrical poster layouts, creative direction consulting, and bespoke branding requests for clients worldwide.',
    x: 1450,
    position: 'below',
    scene: 'SCENE_04'
  }
];

const ReelRiveAnimation: React.FC = () => {
  const { RiveComponent } = useRive({
    src: '/little_machine.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  });
  return RiveComponent ? <RiveComponent className="w-full h-full object-cover" /> : null;
};

// ─── Desktop Horizontal Film Strip ───────────────────────────────────────────

const DesktopTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const lastActiveIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;
      const current = -rect.top;
      const percent = Math.max(0, Math.min(1, current / totalHeight));
      setScrollProgress(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const trackWidth = 1700;
  const milestone1X = 250;
  const milestone4X = 1450;

  const currentCenterX = milestone1X + scrollProgress * (milestone4X - milestone1X);
  const trackTranslation = (viewportWidth / 2) - currentCenterX;

  useEffect(() => {
    let closestIndex = 0;
    let minDistance = Math.abs(timelineData[0].x - currentCenterX);

    for (let i = 1; i < timelineData.length; i++) {
      const dist = Math.abs(timelineData[i].x - currentCenterX);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    if (minDistance < 35) {
      if (lastActiveIndexRef.current !== closestIndex) {
        sfx.playTick('click');
        lastActiveIndexRef.current = closestIndex;
      }
    } else if (minDistance > 75) {
      if (lastActiveIndexRef.current === closestIndex) {
        lastActiveIndexRef.current = null;
      }
    }
  }, [currentCenterX]);

  const sprocketStyle: React.CSSProperties = {
    backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 6px, rgba(255, 255, 255, 0.1) 6px, rgba(255, 255, 255, 0.1) 14px)',
    backgroundSize: '20px 8px',
    height: '8px',
    width: '100%',
    position: 'absolute'
  };

  return (
    <section
      ref={containerRef}
      id="timeline"
      className="hidden lg:block relative w-full h-[250vh] bg-transparent select-none"
    >
      {/* Sticky Inner viewport Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden z-10">
        
        {/* Floating gradient lights */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#ff7700]/3 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#0088ff]/3 blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="absolute top-16 md:top-24 text-center select-none z-20 reveal">
          <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 block mb-2">
            07 — CHRONOLOGY
          </span>
          <h2 className="text-[32px] sm:text-[44px] md:text-[52px] font-heading font-light tracking-[-0.03em] text-white leading-tight">
            Journey &amp; Milestones
          </h2>
        </div>

        {/* Film Strip track wrapper */}
        <div className="relative w-full h-[620px] flex items-center justify-center overflow-hidden z-10">
          
          {/* Translating Film Strip container */}
          <div 
            className="absolute h-40 flex items-center transition-transform duration-[100ms] ease-out"
            style={{ 
              width: `${trackWidth}px`,
              transform: `translate3d(${trackTranslation}px, 0, 0)` 
            }}
          >
            {/* Top sprocket holes line */}
            <div style={{ ...sprocketStyle, top: '4px' }} />

            {/* Bottom sprocket holes line */}
            <div style={{ ...sprocketStyle, bottom: '4px' }} />

            {/* Inactive background track strip */}
            <div className="absolute left-0 right-0 h-[2px] z-0 bg-white/10" />

            {/* Active glow track strip */}
            <div 
              className="absolute left-0 h-[2px] bg-gradient-to-r from-[#ff7700] via-[#0088ff] to-[#ff7700] shadow-[0_0_12px_rgba(255,119,0,0.6)] transition-all duration-[80ms] ease-out z-5"
              style={{ width: `${currentCenterX}px` }}
            />

            {/* Milestone node units */}
            {timelineData.map((node, index) => {
              const distance = Math.abs(node.x - currentCenterX);
              const isActive = distance < 65;
              const isEven = node.position === 'above';

              return (
                <div 
                  key={index}
                  className="absolute flex flex-col items-center z-10"
                  style={{ left: `${node.x}px` }}
                >
                  {/* Vertical connector line */}
                  <div 
                    className={`w-[1px] border-l border-dashed transition-colors duration-500 ${
                      isActive ? 'border-[#ff7700]/50' : 'border-white/15'
                    }`}
                    style={{
                      height: '76px',
                      position: 'absolute',
                      bottom: isEven ? '20px' : 'auto',
                      top: !isEven ? '20px' : 'auto',
                    }}
                  />

                  {/* Node trigger point */}
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-[400ms] ease-out cursor-pointer z-10 ${
                      isActive 
                        ? 'bg-white border-[#ff7700] scale-110 shadow-[0_0_15px_rgba(255,119,0,0.8)]' 
                        : 'bg-[#050505] border-white/20 scale-100'
                    }`}
                    onClick={() => sfx.playTick('click')}
                  >
                    <div 
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        isActive ? 'bg-[#ff7700]' : 'bg-white/20'
                      }`} 
                    />
                  </div>

                  {/* Glassmorphic Film Cell Card */}
                  <LiquidGlassCard
                    className={`absolute w-[280px] p-5 rounded-2xl transition-all duration-[600ms] lg-panel text-left z-20 ${
                      isActive 
                        ? 'opacity-100 scale-100 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_20px_rgba(255,119,0,0.08)] text-white'
                        : 'opacity-30 scale-95 text-white/50'
                    }`}
                    options={{ radius: 36 }}
                    style={{
                      bottom: isEven ? '96px' : 'auto',
                      top: !isEven ? '96px' : 'auto',
                      transformOrigin: isEven ? 'bottom center' : 'top center'
                    }}
                  >
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-[10px] font-mono tracking-widest text-white/45">
                        {node.scene}
                      </span>
                      <span className={`text-[12px] font-heading font-bold tracking-wider uppercase transition-colors duration-300 ${
                        isActive ? 'text-[#ff7700]' : 'text-white/40'
                      }`}>
                        {node.year}
                      </span>
                    </div>

                    <h3 className="text-[16px] font-heading font-semibold tracking-tight mb-2 text-white">
                      {node.title}
                    </h3>
                    
                    <p className="text-[12px] font-body opacity-75 leading-relaxed select-text">
                      {node.desc}
                    </p>
                  </LiquidGlassCard>
                </div>
              );
            })}
          </div>

          {/* Stationary Cinema Projector Reel */}
          <LiquidGlassCard className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full lg-panel flex items-center justify-center z-30 pointer-events-none select-none">
            <div className="absolute inset-0 rounded-full bg-[#ff7700]/8 blur-[20px] pointer-events-none animate-pulse z-0" />
            
            <div 
              className="absolute inset-0 transition-transform duration-[100ms] ease-out z-10"
              style={{ transform: `rotate(${scrollProgress * 1440}deg)` }}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-white/25">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3" />
                <circle cx="50" cy="50" r="13" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="4" fill="currentColor" />
                <circle cx="50" cy="24" r="8.5" fill="#050505" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="75" cy="42" r="8.5" fill="#050505" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="65" cy="71" r="8.5" fill="#050505" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="35" cy="71" r="8.5" fill="#050505" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="25" cy="42" r="8.5" fill="#050505" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>

            <div className="absolute w-[44px] h-[44px] rounded-full overflow-hidden z-20 scale-[1.05]">
              <ReelRiveAnimation />
            </div>
          </LiquidGlassCard>

        </div>

        {/* Scroll tracker progress label */}
        <div className="absolute bottom-8 text-center font-mono text-[9.5px] tracking-[0.3em] uppercase z-20 text-white/35">
          <span>SCROLL DOWN TO REEL // {(scrollProgress * 100).toFixed(0)}% CURATED</span>
        </div>

      </div>
    </section>
  );
};

// ─── Mobile/Tablet Vertical Timeline ─────────────────────────────────────────

const MobileTimeline: React.FC = () => {
  return (
    <section
      id="timeline-mobile"
      className="lg:hidden relative w-full bg-transparent select-none py-20 px-4 sm:px-8"
    >
      {/* Floating gradient lights */}
      <div className="absolute top-1/4 left-0 w-64 h-64 rounded-full bg-[#ff7700]/4 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-[#0088ff]/4 blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center mb-14 reveal">
        <span className="text-[11px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 block mb-3">
          07 — CHRONOLOGY
        </span>
        <h2 className="text-[30px] sm:text-[40px] font-heading font-light tracking-[-0.03em] text-white leading-tight">
          Journey &amp; Milestones
        </h2>
      </div>

      {/* Vertical Timeline */}
      <div className="relative max-w-lg mx-auto">
        {/* Central vertical connector line */}
        <div className="absolute left-4 sm:left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#ff7700]/60 via-white/10 to-[#0088ff]/40" />

        {/* Rive reel at top of the connector line */}
        <div className="absolute left-4 sm:left-5 -top-2 -translate-x-1/2 w-10 h-10 rounded-full border border-white/20 bg-black/55 shadow-[0_0_25px_rgba(255,119,0,0.22)] flex items-center justify-center z-10">
          <div className="w-full h-full rounded-full overflow-hidden">
            <ReelRiveAnimation />
          </div>
        </div>

        {/* Milestone cards */}
        <div className="flex flex-col gap-10 pt-14">
          {timelineData.map((node, index) => (
            <div key={index} className="relative pl-10 sm:pl-14 reveal" style={{ transitionDelay: `${index * 120}ms` }}>
              {/* Node dot on the left connector */}
              <div className="absolute left-[6px] sm:left-[13px] top-6 w-5 h-5 rounded-full border-2 border-[#ff7700] bg-[#050505] shadow-[0_0_12px_rgba(255,119,0,0.65)] flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-[#ff7700]" />
              </div>

              {/* Card */}
              <LiquidGlassCard 
                className="lg-panel p-4 sm:p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_15px_rgba(255,119,0,0.05)]"
                options={{ radius: 36 }}
              >
                {/* Header row */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-mono tracking-widest text-white/35">
                    {node.scene}
                  </span>
                  <span className="text-[11px] font-heading font-bold tracking-wider uppercase text-[#ff7700]">
                    {node.year}
                  </span>
                </div>

                <h3 className="text-[16px] sm:text-[18px] font-heading font-semibold tracking-tight text-white mb-2">
                  {node.title}
                </h3>

                <p className="text-[13px] font-body text-white/60 leading-relaxed select-text">
                  {node.desc}
                </p>
              </LiquidGlassCard>
            </div>
          ))}
        </div>

        {/* End cap dot */}
        <div className="absolute left-5 bottom-0 -translate-x-1/2 w-3 h-3 rounded-full bg-[#0088ff]/60 shadow-[0_0_10px_rgba(0,136,255,0.5)]" />
      </div>

      {/* Bottom progress label */}
      <div className="text-center mt-12 font-mono text-[9px] tracking-[0.3em] uppercase text-white/25">
        <span>04 MILESTONES // FULLY CURATED</span>
      </div>
    </section>
  );
};

// ─── Unified Export ───────────────────────────────────────────────────────────

export const Timeline: React.FC = () => {
  return (
    <>
      <DesktopTimeline />
      <MobileTimeline />
    </>
  );
};
