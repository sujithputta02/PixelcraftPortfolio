import React, { useEffect, useState } from 'react';
import { sfx } from '../utils/sfx';

// Custom Typewriter Hook
const useTypewriter = (text: string, speed = 38, startDelay = 600) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer: any;

    const startTyping = () => {
      timer = setInterval(() => {
        index++;
        setDisplayed(text.substring(0, index));
        if (index >= text.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, speed);
    };

    const delayTimer = setTimeout(startTyping, startDelay);

    return () => {
      clearTimeout(delayTimer);
      clearInterval(timer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
};

interface HeroProps {
  onNavClick: (sectionId: string) => void;
  theme?: 'light' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({ onNavClick, theme = 'dark' }) => {
  const message = "I craft premium atmospheric key art, bold visual identities, and cinematic stories that leave a lasting frame.";
  const { displayed, done } = useTypewriter(message, 34, 700);
  const [showPills, setShowPills] = useState(false);
  const [copied, setCopied] = useState(false);
  const [introFocus, setIntroFocus] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [showSignature, setShowSignature] = useState(false);

  // Stagger reveal animations on load
  useEffect(() => {
    setIntroFocus(true);
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    const sigTimer = setTimeout(() => {
      setShowSignature(true);
    }, 1000); // Trigger signature flow after headings land
    return () => {
      clearTimeout(timer);
      clearTimeout(sigTimer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovering(true);
  };

  const handleCopyEmail = () => {
    sfx.playTick('click');
    navigator.clipboard.writeText("sujithputta02@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePillClick = (action: string) => {
    sfx.playTick('click');
    if (action === 'projects') {
      onNavClick('works');
    } else if (action === 'hire' || action === 'pitch') {
      onNavClick('contact');
    } else if (action === 'about') {
      onNavClick('about');
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 px-5 sm:px-8 md:px-16 overflow-hidden z-10 select-none"
    >
      {/* Elegant designer draft sheet dot grid */}
      <div className={`absolute inset-0 pointer-events-none select-none z-0 transition-opacity duration-500 ${
        theme === 'light' ? 'opacity-[0.05]' : 'opacity-[0.03]'
      }`} 
           style={{ 
             backgroundImage: theme === 'light' ? 'radial-gradient(rgba(0, 0, 0, 0.2) 1.5px, transparent 1.5px)' : 'radial-gradient(rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)', 
             backgroundSize: '24px 24px' 
           }} />

      {/* Interactive Atmospheric Lens Light Glow */}
      <div 
        className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-700 ease-out ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: theme === 'light'
            ? `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 0, 127, 0.035), rgba(0, 255, 255, 0.02), transparent 70%)`
            : `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 0, 127, 0.08), rgba(0, 255, 255, 0.05), transparent 75%)`
        }}
      />

      {/* Middle Block: Clean asymmetric layout with large typography and an interactive poster preview */}
      <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10 pt-6 sm:pt-12">
        
        {/* Left Side: Large Display Typography & Typewriter Narrative */}
        <div className="lg:col-span-7 flex flex-col justify-center items-start text-left relative">
          {/* Cinematic tag */}
          <div className="flex flex-col gap-1.5 mb-5 select-none w-full">
            <span className="text-[10px] font-heading font-bold tracking-[0.28em] text-[#ff007f] uppercase animate-pulse">
              [ VISUAL BRANDING & CINEMATIC KEY ART ]
            </span>
            
            <div className={`select-none transition-all duration-[2000ms] ease-out relative ${
              introFocus ? 'filter blur-none opacity-100 scale-100' : 'filter blur-[12px] opacity-0 scale-95'
            }`}>
              <h1 className="font-heading uppercase select-none leading-[0.82] flex flex-col items-start pt-4 relative">
                <span className={`text-[13vw] sm:text-[9.5vw] md:text-[8vw] font-extrabold tracking-tighter ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  PIXELCRAFT
                </span>
                <span 
                  className="text-[11.5vw] sm:text-[8.2vw] md:text-[6.8vw] font-light tracking-[0.05em]"
                  style={{ WebkitTextStroke: theme === 'light' ? '1.2px rgba(0, 0, 0, 0.65)' : '1.2px rgba(255, 255, 255, 0.65)', color: 'transparent' }}
                >
                  EXHIBITION
                </span>

                {/* Cursive Signature Overlay in a stylish glassmorphic capsule */}
                <div 
                  className={`absolute top-[43%] left-[28%] sm:left-[33%] md:left-[38%] z-30 transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    showSignature 
                      ? 'opacity-100 translate-y-0 rotate-[-4deg] scale-100' 
                      : 'opacity-0 translate-y-6 rotate-[-12deg] scale-90'
                  }`}
                >
                  <div 
                    onMouseEnter={() => sfx.playTick('hover')}
                    onClick={() => sfx.playTick('click')}
                    className={`px-5 py-2 sm:px-7 sm:py-3 rounded-full flex items-center justify-center gap-3 backdrop-blur-xl border transition-all duration-300 shadow-2xl cursor-pointer ${
                      theme === 'light'
                        ? 'bg-white/75 border-[#ff007f]/20 shadow-[#ff007f]/5 hover:bg-white/90 hover:border-[#ff007f]/45 hover:shadow-[0_10px_25px_rgba(255,0,127,0.15)] hover:scale-105'
                        : 'bg-black/60 border-white/10 shadow-black/80 hover:bg-black/75 hover:border-[#ff007f]/50 hover:shadow-[0_10px_30px_rgba(255,0,127,0.25)] hover:scale-105'
                    }`}
                  >
                    {/* Glowing Accent Pulse Dot */}
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      theme === 'light' ? 'bg-[#ff007f]' : 'bg-[#00ffff] shadow-[0_0_8px_#00ffff]'
                    }`} />
                    
                    <span className={`font-cursive text-[6.5vw] sm:text-[5vw] md:text-[3.8vw] leading-none tracking-normal normal-case select-none ${
                      theme === 'light' 
                        ? 'text-[#ff007f] drop-shadow-[0_2px_4px_rgba(255,0,127,0.25)]' 
                        : 'text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.35)]'
                    }`}>
                      Sujith
                    </span>
                  </div>
                </div>
              </h1>
            </div>
          </div>

          {/* Typewriter Text Narrative Block */}
          <div className="mb-6 sm:mb-8 min-h-[64px] sm:min-h-[72px] max-w-xl">
            <p className={`text-[17px] sm:text-[23px] font-body font-light leading-snug select-text ${
              theme === 'light' ? 'text-black/75' : 'text-white/85'
            }`}>
              {displayed}
              {!done && (
                <span className={`inline-block w-[2.2px] h-[1.1em] align-middle ml-[2px] animate-blink ${
                  theme === 'light' ? 'bg-black' : 'bg-white'
                }`} />
              )}
            </p>
          </div>

          {/* Direct copy-to-copy email signature link */}
          <div className="relative inline-block mb-2 select-none">
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => sfx.playTick('hover')}
              className={`inline-flex items-center gap-2.5 bg-transparent rounded-full text-[13.5px] px-0.5 py-1.5 duration-300 font-mono transition-colors cursor-pointer ${
                theme === 'light' ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
              }`}
              data-cursor="Copy email"
            >
              <span className="underline underline-offset-4">Direct Contact: sujithputta02@gmail.com</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            {/* Elegant Copy Success Popover */}
            {copied && (
              <span className={`absolute -top-8.5 left-1/2 -translate-x-1/2 text-[9.5px] font-heading font-semibold uppercase tracking-wider py-1 px-3 rounded shadow-lg border z-[1000] animate-bounce pointer-events-none ${
                theme === 'light' ? 'bg-black text-white border-white/10' : 'bg-white text-black border-black/10'
              }`}>
                Copied!
              </span>
            )}
          </div>
        </div>
        
        {/* Right Side: Curator Featured Showcase Poster Card with 3D Tilt */}
        <div 
          className={`lg:col-span-5 flex justify-center lg:justify-end w-full tilt-viewport transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showPills ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-98'
          }`}
        >
          <style>{`
            .tilt-viewport {
              perspective: 1200px;
            }
            .tilt-card {
              transform-style: preserve-3d;
              transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.8s ease;
            }
            .tilt-card:hover {
              transform: rotateY(-8deg) rotateX(6deg) translateZ(10px);
            }
            .tilt-child {
              transform: translateZ(20px);
            }
          `}</style>

          {/* Framed glass poster print */}
          <div 
            onClick={() => handlePillClick('projects')}
            className={`w-full max-w-[270px] sm:max-w-[310px] aspect-[3/4.2] rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative group cursor-pointer tilt-card ${
              theme === 'light' ? 'bg-[#FFFFFF] border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]' : 'bg-[#0A0A0A] border border-white/10 shadow-[0_25px_55px_rgba(0,0,0,0.95)] hover:shadow-[0_30px_65px_rgba(255,0,127,0.12)]'
            }`}
            data-cursor="Exhibition"
          >
            {/* Specular glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/8 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />
            
            {/* Shimmer star sparkles */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-30">
              <div className="disco-sparkle top-6 left-8 sparkle-slow" />
              <div className="disco-sparkle bottom-20 right-8 sparkle-fast" />
            </div>

            {/* Display Spiderman BND V-2 (Latest artwork) */}
            <img
              src="/Poster/Spiderman BND v-2.webp"
              alt="Featured Work"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-103"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none z-10" />

            {/* Pulsing LATEST EXHIBIT label */}
            <div className={`absolute top-4 left-4 z-20 backdrop-blur-md border rounded-full px-3 py-1 text-[8px] font-mono tracking-widest uppercase font-semibold flex items-center gap-1.5 ${
              theme === 'light' ? 'bg-white/80 border-black/10 text-[#ff007f]' : 'bg-black/60 border-white/10 text-[#00ffff]'
            }`}>
              <span className="w-1.5 h-1.5 bg-[#ff007f] rounded-full animate-pulse" />
              LATEST EXHIBIT
            </div>

            {/* Caption bottom details */}
            <div className={`absolute bottom-0 left-0 right-0 p-4.5 z-20 flex justify-between items-end backdrop-blur-sm border-t tilt-child ${
              theme === 'light' ? 'bg-white/90 border-black/5' : 'bg-black/40 border-white/5'
            }`}>
              <div className="text-left">
                <span className={`text-[8px] font-mono tracking-widest uppercase block mb-1 ${
                  theme === 'light' ? 'text-black/50' : 'text-white/50'
                }`}>CINEMATIC KEY ART</span>
                <h3 className={`text-[12px] font-heading font-semibold tracking-tight uppercase leading-none ${
                  theme === 'light' ? 'text-black' : 'text-white'
                }`}>
                  Spider-Man: Brand New Day
                </h3>
              </div>
              
              <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
                theme === 'light' ? 'border border-black/15 bg-black/5 group-hover:bg-black group-hover:text-white' : 'border border-white/20 bg-white/5 group-hover:bg-white group-hover:text-black'
              }`}>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={theme === 'light' ? 'text-black group-hover:text-white' : 'text-white group-hover:text-black'}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bento Headline & Subtitles Panel */}
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10 mt-10 border-t border-white/5 pt-8">

        {/* Massive Identity Anchor and stack */}
        <div className="flex-1 flex flex-col items-start">

          <div className="flex items-center gap-4 sm:gap-6">
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-heading font-extrabold tracking-[-0.04em] uppercase leading-none select-none text-platinum-chrome filter drop-shadow-[0_0_15px_rgba(255,255,255,0.08)]">
              SUJITH
            </h1>

            {/* Specular Native Discomorphic Logo */}
            <img
              src="/Pixelcraft Discomorphism wb.png"
              alt="PixelCraft Discomorphic Logo"
              onClick={() => {
                sfx.playTick('click');
              }}
              onMouseEnter={() => sfx.playTick('hover')}
              className="w-12 h-12 sm:w-16 sm:h-16 object-contain filter drop-shadow-[0_0_10px_rgba(255,0,127,0.45)] drop-shadow-[0_0_4px_rgba(0,255,255,0.35)] transition-transform duration-700 ease-[var(--ease-luxury)] hover:scale-115 hover:rotate-[15deg] cursor-pointer select-none"
              loading="lazy"
              data-cursor="Discomorphism"
              data-magnetic
            />
          </div>

          <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] sm:text-[13px] md:text-[14px] font-heading font-medium tracking-[0.12em] uppercase text-white/55 mt-3">
            <span>Graphic Designer</span>
            <span className="text-white/20">•</span>
            <span>Visual Storyteller</span>
            <span className="text-white/20">•</span>
            <span>Creative Explorer</span>
          </div>
        </div>

        {/* Narrative positioning tagline & Action keys */}
        <div className="max-w-md flex flex-col gap-4">
          <p className="text-[14px] sm:text-[16px] font-body font-normal text-white/60 leading-relaxed italic">
            "Visual narrative is the intersection of emotion and geometry. Every frame is a window to a larger story."
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => handlePillClick('projects')}
              onMouseEnter={() => sfx.playTick('hover')}
              className="text-[13px] sm:text-[15px] font-heading font-medium uppercase tracking-[0.12em] text-white bg-white/10 hover:bg-white hover:text-black border border-white/20 hover:border-white rounded-full px-5 py-2 duration-300 select-none cursor-pointer"
              data-cursor="Gallery"
              data-magnetic
            >
              View Projects
            </button>
            <button
              onClick={() => handlePillClick('projects')}
              onMouseEnter={() => sfx.playTick('hover')}
              className="text-[13px] sm:text-[15px] font-heading font-medium uppercase tracking-[0.12em] text-white/70 hover:text-white border border-transparent hover:border-white/20 rounded-full px-5 py-2 duration-300 select-none cursor-pointer"
              data-cursor="Exhibition"
              data-magnetic
            >
              Explore Gallery
            </button>
          </div>
        </div>

      </div>

      {/* Animated Minimal Line Scroll Indicator */}
      <div
        onClick={() => {
          sfx.playTick('click');
          onNavClick('about');
        }}
        onMouseEnter={() => sfx.playTick('hover')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-40 hover:opacity-100 transition-opacity duration-300 hidden sm:flex z-20"
        data-cursor="Scroll"
        data-magnetic
      >
        <span className="text-[9px] uppercase tracking-[0.18em] font-heading text-white/65">
          Explore
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white via-white/50 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-[bounce_2s_infinite]" />
        </div>
      </div>

    </section>
  );
};
