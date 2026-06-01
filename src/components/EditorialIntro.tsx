import React, { useState, useRef } from 'react';

export const EditorialIntro: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable interactive tilt on small devices/touch screens to avoid visual rendering/flickering issues in Safari
    if (window.innerWidth < 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the card
    const y = e.clientY - rect.top;  // y position within the card
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = (yc - y) / 10; // 3D tilt angles
    const rotateY = (x - xc) / 10;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: '0 30px 70px rgba(0, 0, 0, 0.95), 0 0 45px rgba(255, 0, 127, 0.22), 0 0 25px rgba(0, 255, 255, 0.18)'
    });
    setSpotlightPos({ x, y });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: ''
    });
    setIsHovered(false);
  };

  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 px-5 sm:px-8 md:px-16 bg-[#0E0E0E] z-10 select-none overflow-hidden border-y border-white/5"
    >
      
      {/* Absolute Ambient Background Lights */}
      <div className="absolute top-1/4 left-0 w-80 h-80 rounded-full bg-white/[0.015] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-white/[0.015] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
        
        {/* Typographic Story Column */}
        <div className="flex-1 flex flex-col items-start text-left max-w-3xl">
          
          {/* Section Header Accent */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45">
              01 — PROFILE
            </span>
            <div className="w-8 h-[1px] bg-white/20" />
            <h2 className="text-[15px] sm:text-[17px] font-heading font-normal tracking-[0.1em] uppercase text-white/80">
              Who Is Sujith?
            </h2>
          </div>

          {/* Manifesto Paragraph Blocks */}
          <div className="flex flex-col gap-6 sm:gap-8 mb-12 sm:mb-16">
            <p className="text-[20px] sm:text-[24px] md:text-[28px] font-body font-light text-white/90 leading-relaxed tracking-tight">
              "I’m <strong className="font-semibold text-white">Sujith Putta</strong>, a visual designer focused on{' '}
              <span className="hover:text-[#ff007f] hover:drop-shadow-[0_0_12px_rgba(255,0,127,0.65)] transition-all duration-300 cursor-pointer font-medium decoration-dotted underline decoration-[#ff007f]/45 underline-offset-4">
                cinematic poster design
              </span>
              ,{' '}
              <span className="hover:text-[#00ffff] hover:drop-shadow-[0_0_12px_rgba(0,255,255,0.65)] transition-all duration-300 cursor-pointer font-medium decoration-dotted underline decoration-[#00ffff]/45 underline-offset-4">
                digital storytelling
              </span>
              , and{' '}
              <span className="hover:text-[#8a2be2] hover:drop-shadow-[0_0_12px_rgba(138,43,226,0.65)] transition-all duration-300 cursor-pointer font-medium decoration-dotted underline decoration-[#8a2be2]/45 underline-offset-4">
                creative branding
              </span>
              ."
            </p>
            <p className="text-[17px] sm:text-[19px] font-body font-normal text-white/55 leading-relaxed">
              "My work combines emotion, atmosphere, and design strategy to transform ideas into memorable visual experiences."
            </p>
            <p className="text-[16px] sm:text-[18px] font-body font-normal text-white/45 leading-relaxed">
              "From superhero universes and sci-fi concepts to brand campaigns and creative identities, every project is built with intention and crafted frame by frame."
            </p>
          </div>

          {/* The Absolute Differentiator Callout */}
          <div className="border-l-2 border-white/20 pl-6 sm:pl-8 py-2 flex flex-col gap-1.5 select-none">
            <span className="text-[15px] sm:text-[17px] font-heading font-semibold uppercase tracking-[0.15em] text-white/35">
              The Absolute Differentiator
            </span>
            <h3 className="text-[26px] sm:text-[34px] md:text-[42px] font-heading font-normal tracking-tight text-white/50 leading-tight">
              "I don't just create graphics."
            </h3>
            <h4 className="text-[28px] sm:text-[38px] md:text-[46px] font-heading font-bold tracking-tight text-white leading-tight">
              "I create visual narratives."
            </h4>
          </div>

        </div>

        {/* Cinematic Exhibit Portrait Column */}
        <div className="w-full lg:w-[380px] flex flex-col items-center lg:items-end justify-center select-none pt-4 lg:pt-0">
          
          <div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={tiltStyle}
            className="w-full max-w-[340px] disco-card border-disco-chrome rounded-2xl p-4 sm:p-5 transition-all duration-500 group relative overflow-hidden"
            data-cursor="Artist"
            data-magnetic
          >
            {/* Mirror Tile grid overlay inside card */}
            <div className="disco-tile-grid opacity-30 pointer-events-none" />
            
            {/* Twinkling sparkles inside card */}
            <div className="disco-sparkle top-4 left-6 sparkle-slow pointer-events-none" />
            <div className="disco-sparkle bottom-6 right-8 sparkle-fast pointer-events-none" />

            {/* Dynamic Interactive Specular Spotlight Overlay */}
            {isHovered && (
              <div
                className="absolute pointer-events-none z-20 transition-opacity duration-300 opacity-100"
                style={{
                  top: spotlightPos.y - 120,
                  left: spotlightPos.x - 120,
                  width: 240,
                  height: 240,
                  background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 70%)',
                  borderRadius: '50%'
                }}
              />
            )}

            {/* Specular Ambient Glow Highlight */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.03] rounded-full blur-xl pointer-events-none group-hover:bg-white/[0.06] transition-colors duration-500 z-10" />
            
            {/* Image Container with high contrast masking */}
            <div className="w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/5 mb-4 sm:mb-5 relative">
              <img
                src="/images/Sujithprofile.png"
                alt="Sujith Putta Profile"
                className="w-full h-full object-cover grayscale opacity-85 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            </div>

            {/* Technical Metadata info blocks */}
            <div className="w-full flex justify-between items-end">
              <div className="text-left">
                <span className="text-[10px] font-heading font-medium tracking-[0.15em] uppercase text-white/40 block mb-1">
                  CREATIVE LEADER
                </span>
                <span className="text-[16px] font-heading font-semibold text-white tracking-tight leading-none block">
                  Sujith Putta
                </span>
              </div>
              
              <div className="text-right flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                <span className="text-[9px] font-heading font-medium tracking-[0.1em] uppercase text-white/70">
                  AVAILABLE
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
