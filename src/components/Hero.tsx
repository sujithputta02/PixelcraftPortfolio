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
}

export const Hero: React.FC<HeroProps> = ({ onNavClick }) => {
  const message = "I craft premium atmospheric key art, bold visual identities, and cinematic stories that leave a lasting frame.";
  const { displayed, done } = useTypewriter(message, 34, 700);
  const [showPills, setShowPills] = useState(false);
  const [copied, setCopied] = useState(false);
  const [introFocus, setIntroFocus] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Clock updates every second
  useEffect(() => {
    const updateClock = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setCurrentTime(formatter.format(new Date()));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Stagger action pills fade-in 400ms after load and set cinematic lens focus trigger
  useEffect(() => {
    setIntroFocus(true);
    const timer = setTimeout(() => {
      setShowPills(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

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
      className="relative w-full min-h-screen flex flex-col justify-between pt-24 pb-12 px-5 sm:px-8 md:px-16 overflow-hidden z-10 select-none"
    >
      
      {/* Middle Block: Clean left-aligned content container letting the background video reveal on the right */}
      <div className="flex-1 flex flex-col justify-center items-start max-w-2xl relative z-10 pt-6 sm:pt-12">
        
        {/* 1. Cinematic Lens Focus Intro & Live Time Panel */}
        <div className="flex flex-col gap-2.5 mb-5 sm:mb-6">
          <div className="flex items-center gap-2 text-[10.5px] font-heading font-semibold tracking-[0.22em] text-white/35">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            <span>LOC: BANGALORE, IN // GMT+5:30 // {currentTime || '17:21:00'}</span>
          </div>
          
          <div className={`select-none transition-all duration-[2000ms] ease-out ${
            introFocus ? 'filter blur-none opacity-90 scale-100' : 'filter blur-[15px] opacity-0 scale-95'
          }`}>
            <p className="text-[20px] sm:text-[26px] font-heading font-semibold text-white leading-tight">
              PixelCraft
              <span className="font-cursive text-[24px] sm:text-[32px] text-white/80 ml-2 normal-case">by Sujith</span>
              <br />
              <span className="text-[12px] sm:text-[13px] font-heading font-semibold tracking-[0.2em] uppercase text-white/45 block mt-2">
                Graphic Designer
              </span>
            </p>
          </div>
        </div>

        {/* 2. Typewriter Text Block */}
        <div className="mb-5 sm:mb-6 min-h-[64px] sm:min-h-[72px]">
          <p className="text-[18px] sm:text-[25px] font-body font-normal text-white/95 leading-snug">
            {displayed}
            {!done && (
              <span className="inline-block w-[2.2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" />
            )}
          </p>
        </div>

        {/* 3. Staggered Action Pills */}
        <div
          className={`flex flex-wrap gap-y-1.5 transition-all duration-1000 ease-out ${
            showPills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Action Pills */}
          <button
            onClick={() => handlePillClick('pitch')}
            onMouseEnter={() => sfx.playTick('hover')}
            className="inline-flex items-center justify-center bg-white text-black border border-white/10 rounded-full text-[13px] sm:text-[15px] px-4.5 sm:px-5.5 py-1.5 mx-1 mb-2 hover:bg-black hover:text-white hover:border-white/30 cursor-pointer duration-300 font-body select-none"
            data-cursor="Submit idea"
            data-magnetic
          >
            Pitch me an idea
          </button>
          
          <button
            onClick={() => handlePillClick('hire')}
            onMouseEnter={() => sfx.playTick('hover')}
            className="inline-flex items-center justify-center bg-white text-black border border-white/10 rounded-full text-[13px] sm:text-[15px] px-4.5 sm:px-5.5 py-1.5 mx-1 mb-2 hover:bg-black hover:text-white hover:border-white/30 cursor-pointer duration-300 font-body select-none"
            data-cursor="Collaborate"
            data-magnetic
          >
            Let's collaborate
          </button>
          
          <button
            onClick={() => handlePillClick('hire')}
            onMouseEnter={() => sfx.playTick('hover')}
            className="inline-flex items-center justify-center bg-white text-black border border-white/10 rounded-full text-[13px] sm:text-[15px] px-4.5 sm:px-5.5 py-1.5 mx-1 mb-2 hover:bg-black hover:text-white hover:border-white/30 cursor-pointer duration-300 font-body select-none"
            data-cursor="Contact"
            data-magnetic
          >
            Send a quick hello
          </button>
          
          <button
            onClick={() => handlePillClick('about')}
            onMouseEnter={() => sfx.playTick('hover')}
            className="inline-flex items-center justify-center bg-white text-black border border-white/10 rounded-full text-[13px] sm:text-[15px] px-4.5 sm:px-5.5 py-1.5 mx-1 mb-2 hover:bg-black hover:text-white hover:border-white/30 cursor-pointer duration-300 font-body select-none"
            data-cursor="Philosophy"
            data-magnetic
          >
            See how I operate
          </button>

          {/* Email Copy Pill */}
          <div className="relative inline-block mb-2 mx-1 select-none">
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => sfx.playTick('hover')}
              className="inline-flex items-center gap-2 sm:gap-2.5 bg-transparent text-white border border-white/30 hover:border-white rounded-full text-[13px] sm:text-[15px] px-4.5 sm:px-5.5 py-1.5 hover:bg-white hover:text-black cursor-pointer duration-300 font-body transition-colors"
              data-cursor="Copy email"
              data-magnetic
            >
              <span className="underline underline-offset-3">Reach me: sujithputta02@gmail.com</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3 h-3 flex-shrink-0"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            {/* Elegant Copy Success Popover */}
            {copied && (
              <span className="absolute -top-9 left-1/2 -translate-x-1/2 bg-white text-black text-[11px] font-heading font-semibold uppercase tracking-wider py-1.5 px-3 rounded shadow-lg border border-black/10 z-[1000] animate-bounce pointer-events-none">
                Copied!
              </span>
            )}
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
          <p className="text-[14px] sm:text-[16px] font-body font-normal text-white/60 leading-relaxed">
            "Crafting cinematic visuals, bold identities, and digital experiences that leave a lasting frame."
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
