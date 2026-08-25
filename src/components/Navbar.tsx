import React, { useEffect, useState, useRef } from 'react';
import { sfx } from '../utils/sfx';
import { useLiquidGlass } from '../hooks/useLiquidGlass';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);

  // Apply liquid glass refraction to the Dynamic Island pill
  useLiquidGlass(navRef, true, {
    scale: -112,
    chroma: 6,
    border: 0.07,
    mapBlur: 12,
    blur: 6,
    saturate: 1.5,
    radius: 999,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (id: string) => {
    sfx.playTick('click');
    setActiveSection(id);
    setIsOpen(false);
    onNavClick(id);
  };

  return (
    <>
      {/* Dynamic Island Floating Header Capsule */}
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-4xl pointer-events-none">
        <nav
          ref={navRef}
          className={`pointer-events-auto mx-auto rounded-full lg-panel border border-white/15 bg-[#09090b]/85 backdrop-blur-2xl shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(255,119,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
            isScrolled
              ? 'py-2 px-3.5 sm:px-5 scale-[0.98] shadow-[0_20px_45px_rgba(0,0,0,0.95)]'
              : 'py-2.5 sm:py-3 px-4 sm:px-6 scale-100'
          }`}
        >
          {/* Left: Dynamic Island Logo & Live Indicator */}
          <div
            onClick={() => handleLinkClick('hero')}
            onMouseEnter={() => sfx.playTick('hover')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group"
            data-cursor="Home"
            data-magnetic
          >
            <div className="relative flex items-center justify-center">
              <img
                src="/Pixelcraft Discomorphism wb.webp"
                alt="PixelCraft Main Logo"
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain filter drop-shadow-[0_0_8px_rgba(255,119,0,0.5)] transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-12"
              />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[14px] sm:text-[16px] font-heading font-semibold tracking-tight text-white leading-none">
                PixelCraft<span className="text-[9px] align-super">®</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono text-white/50 tracking-wider uppercase mt-0.5 hidden xs:inline-block">
                Studio
              </span>
            </div>
          </div>

          {/* Center: Dynamic Island Navigation Pills (Desktop) */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/10 text-[13px] font-heading font-medium">
            {[
              { id: 'works', label: 'Works' },
              { id: 'latest', label: 'Latest' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Capabilities' },
              { id: 'timeline', label: 'Journey' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                onMouseEnter={() => sfx.playTick('hover')}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-white text-black font-semibold shadow-md scale-105'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                data-cursor={item.label}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: Dynamic Island Contact CTA & Status */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLinkClick('contact')}
              onMouseEnter={() => sfx.playTick('hover')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-heading font-semibold uppercase tracking-wider bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-white/20 active:scale-95"
              data-cursor="Contact"
              data-magnetic
            >
              <span>Get in touch</span>
            </button>

            {/* Mobile Hamburger Island Switcher */}
            <button
              onClick={() => {
                sfx.playTick('click');
                toggleMenu();
              }}
              onMouseEnter={() => sfx.playTick('hover')}
              className="md:hidden flex flex-col justify-center items-center gap-[4px] w-9 h-9 rounded-full bg-white/10 border border-white/15 focus:outline-none cursor-pointer"
              aria-label="Toggle Dynamic Island Menu"
            >
              <span
                className={`w-4 h-[2px] bg-white transition-all duration-300 ease-out origin-center ${
                  isOpen ? 'rotate-[45deg] translate-y-[6px]' : ''
                }`}
              />
              <span
                className={`w-4 h-[2px] bg-white transition-all duration-300 ease-out ${
                  isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                }`}
              />
              <span
                className={`w-4 h-[2px] bg-white transition-all duration-300 ease-out origin-center ${
                  isOpen ? 'rotate-[-45deg] -translate-y-[6px]' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Dynamic Island Expanded Overlay */}
      <div
        className={`fixed inset-0 bg-[#050508]/96 backdrop-blur-2xl z-[90] flex flex-col justify-center px-8 sm:px-12 gap-8 md:hidden transition-all duration-500 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-5 select-none max-w-sm mx-auto w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#ff7700] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/50">
              Navigation Menu
            </span>
          </div>

          {[
            { id: 'works', label: 'Works' },
            { id: 'latest', label: 'Latest' },
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Capabilities' },
            { id: 'timeline', label: 'Journey' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              onMouseEnter={() => sfx.playTick('hover')}
              className="text-[28px] sm:text-[32px] font-heading font-medium text-white hover:text-[#ff7700] transition-colors text-left flex items-center justify-between border-b border-white/5 pb-2"
            >
              <span>{item.label}</span>
              <span className="text-[14px] font-mono text-white/30">→</span>
            </button>
          ))}

          <button
            onClick={() => handleLinkClick('contact')}
            onMouseEnter={() => sfx.playTick('hover')}
            className="mt-4 px-6 py-3.5 rounded-full text-[14px] font-heading font-bold uppercase tracking-wider bg-white text-black text-center shadow-lg active:scale-95 transition-transform"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </>
  );
};

