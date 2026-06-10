import React, { useState, useRef } from 'react';
import { ProgressiveImage } from './ProgressiveImage';
import { sfx } from '../utils/sfx';

export const About: React.FC = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelTilt, setPanelTilt] = useState<React.CSSProperties>({});
  const [isEmblemHovered, setIsEmblemHovered] = useState(false);

  const handlePanelMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable interactive tilt on small devices/touch screens to avoid visual rendering/flickering issues in Safari
    if (window.innerWidth < 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const card = panelRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = (yc - y) / 12; // subtle 3D tilt rotation
    const rotateY = (x - xc) / 12;
    
    setPanelTilt({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(255, 0, 127, 0.18)'
    });
  };

  const handlePanelLeave = () => {
    setPanelTilt({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: ''
    });
  };

  return (
    <section
      className="relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-16 bg-[#0E0E0E] z-10 select-none overflow-hidden border-b border-white/5"
    >
      
      {/* Structural Accent Lights */}
      <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-white/[0.012] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        
        {/* Left Column: Highly stylized Mission Callout */}
        <div className="lg:col-span-6 flex flex-col items-start text-left select-none">
          
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45">
              05 — MISSION
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
            <h2 className="text-[15px] sm:text-[17px] font-heading font-normal tracking-[0.1em] uppercase text-white/80">
              Strategic Vision
            </h2>
          </div>

          {/* Premium Discomorphism Logo Emblem Showcase - Rendered natively with a vibrant metallic neon drop-shadow */}
          <div 
            className="mb-8 relative select-none cursor-pointer" 
            data-cursor="Core Emblem" 
            data-magnetic
            onMouseEnter={() => {
              setIsEmblemHovered(true);
              sfx.playTick('hover');
            }}
            onMouseLeave={() => setIsEmblemHovered(false)}
            onClick={() => sfx.playTick('click')}
          >
            {/* Ambient neon backdrop glow */}
            <div className="absolute inset-0 rounded-full bg-[#ff007f]/10 blur-[30px] animate-[pulse_5s_infinite] pointer-events-none" />
            <ProgressiveImage
              src="/Pixelcraft Discomorphism wb.png"
              alt="PixelCraft Discomorphism Logo"
              className={`w-28 h-28 sm:w-36 sm:h-36 object-contain filter drop-shadow-[0_0_12px_rgba(255,0,127,0.45)] drop-shadow-[0_0_6px_rgba(0,255,255,0.35)] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isEmblemHovered ? 'scale-110 rotate-[24deg] filter drop-shadow-[0_0_20px_rgba(0,255,255,0.55)]' : 'scale-100 rotate-0'
              }`}
              loading="lazy"
            />
          </div>

          <div className="flex flex-col gap-1 pr-4 sm:pr-8 select-none">
            <span className="text-[20px] sm:text-[24px] font-heading font-light tracking-widest uppercase text-white/40 block">
              The goal is simple:
            </span>
            <h3 className="text-[34px] sm:text-[46px] md:text-[56px] font-heading font-extrabold tracking-[-0.03em] uppercase leading-none text-disco drop-shadow-[0_0_10px_rgba(255,0,127,0.25)]">
              Create visuals
            </h3>
            <h3 className="text-[34px] sm:text-[46px] md:text-[56px] font-heading font-extrabold tracking-[-0.03em] uppercase leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.05)]">
              people remember.
            </h3>
          </div>

        </div>

        {/* Right Column: Detailed Narrative block */}
        <div 
          ref={panelRef}
          onMouseMove={handlePanelMove}
          onMouseLeave={handlePanelLeave}
          style={panelTilt}
          className="lg:col-span-6 flex flex-col items-start text-left bg-white/[0.015] border border-white/5 p-6 sm:p-8 rounded-2xl backdrop-blur-md transition-all duration-500 relative overflow-hidden"
        >
          {/* Subtle discomorphism tile backdrop */}
          <div className="disco-tile-grid opacity-10 pointer-events-none" />
          
          <h4 className="text-[18px] sm:text-[21px] font-heading font-semibold text-white tracking-tight mb-4 relative z-10">
            Designing Stories Through Pixels
          </h4>
          
          <p className="text-[15px] sm:text-[17px] font-body font-normal text-[#A3A3A3] leading-relaxed mb-6 relative z-10">
            "PixelCraft by Sujith is a creative identity built around visual storytelling, cinematic design, and modern digital aesthetics. Inspired by films, music, pop culture, and immersive worlds, every project is an exploration of atmosphere, emotion, and identity."
          </p>

          <div className="w-full h-[1px] bg-white/10 my-4 relative z-10" />

          {/* Micro stats info blocks */}
          <div className="w-full flex justify-between gap-4 relative z-10">
            <div>
              <span className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/35 block mb-1">
                INSPIRATION DRIVERS
              </span>
              <span className="text-[13px] font-body text-white/85">
                Cinema, Music, Worlds
              </span>
            </div>
            <div>
              <span className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/35 block mb-1">
                DESIGN ETHOS
              </span>
              <span className="text-[13px] font-body text-white/85">
                Atmosphere & Identity
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
