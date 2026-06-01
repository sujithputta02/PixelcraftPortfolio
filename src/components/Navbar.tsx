import React, { useEffect, useState } from 'react';

interface NavbarProps {
  onNavClick: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavClick(id);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out border-b ${
          isScrolled
            ? 'py-3 sm:py-3.5 px-5 sm:px-8 bg-black/65 backdrop-blur-[24px] border-white/8 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 sm:py-6 px-5 sm:px-8 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo (left) */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-3.5 cursor-pointer select-none group"
            data-cursor="Home"
            data-magnetic
          >
            {/* The Main Discomorphic Logo Image - Rendered natively with a vibrant metallic neon drop-shadow */}
            <img
              src="/Pixelcraft Discomorphism wb.png"
              alt="PixelCraft Main Logo"
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain filter drop-shadow-[0_0_8px_rgba(255,0,127,0.45)] drop-shadow-[0_0_4px_rgba(0,255,255,0.35)] transition-transform duration-700 ease-[var(--ease-luxury)] group-hover:scale-115 group-hover:rotate-[15deg]"
            />
            
            <span className="text-[19px] sm:text-[23px] font-heading font-medium tracking-tight text-white transition-opacity duration-300 group-hover:opacity-80">
              PixelCraft<span className="text-[11px] sm:text-[13px] align-super leading-none">®</span>
              <span className="font-cursive text-[23px] sm:text-[26px] text-white/90 ml-1.5">by Sujith</span>
            </span>
          </div>

          {/* Desktop Nav Links (center, hidden below md) */}
          <div className="hidden md:flex items-center text-[22px] font-body text-white/50 select-none">
            <button
              onClick={() => handleLinkClick('works')}
              className="text-white hover:text-white transition-colors duration-300 px-1"
              data-cursor="Works"
            >
              Works
            </button>
            <span className="mx-1 text-white/30 text-[20px]">,</span>
            <button
              onClick={() => handleLinkClick('about')}
              className="text-white/70 hover:text-white transition-colors duration-300 px-1"
              data-cursor="About"
            >
              About
            </button>
            <span className="mx-1 text-white/30 text-[20px]">,</span>
            <button
              onClick={() => handleLinkClick('skills')}
              className="text-white/70 hover:text-white transition-colors duration-300 px-1"
              data-cursor="Skills"
            >
              Capabilities
            </button>
            <span className="mx-1 text-white/30 text-[20px]">,</span>
            <button
              onClick={() => handleLinkClick('timeline')}
              className="text-white/70 hover:text-white transition-colors duration-300 px-1"
              data-cursor="Timeline"
            >
              Journey
            </button>
          </div>

          {/* Desktop CTA (right, hidden below md) */}
          <button
            onClick={() => handleLinkClick('contact')}
            className="hidden md:block text-[22px] font-body text-white underline underline-offset-4 decoration-white/30 hover:decoration-white hover:opacity-85 transition-all duration-300 cursor-pointer"
            data-cursor="Contact"
            data-magnetic
          >
            Get in touch
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 focus:outline-none z-[110]"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ease-out origin-center ${
                isOpen ? 'rotate-[45deg] translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ease-out ${
                isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-all duration-300 ease-out origin-center ${
                isOpen ? 'rotate-[-45deg] -translate-y-[7px]' : ''
              }`}
            />
          </button>

        </div>
      </nav>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 bg-[#050505]/98 backdrop-blur-md z-[90] flex flex-col justify-center px-8 sm:px-12 gap-8 md:hidden transition-all duration-500 ease-out ${
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6 select-none">
          <button
            onClick={() => handleLinkClick('works')}
            className="text-[32px] sm:text-[38px] font-heading font-medium text-white hover:text-white/60 transition-colors text-left"
          >
            Works
          </button>
          <button
            onClick={() => handleLinkClick('about')}
            className="text-[32px] sm:text-[38px] font-heading font-medium text-white hover:text-white/60 transition-colors text-left"
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick('skills')}
            className="text-[32px] sm:text-[38px] font-heading font-medium text-white hover:text-white/60 transition-colors text-left"
          >
            Capabilities
          </button>
          <button
            onClick={() => handleLinkClick('timeline')}
            className="text-[32px] sm:text-[38px] font-heading font-medium text-white hover:text-white/60 transition-colors text-left"
          >
            Journey
          </button>
          
          <div className="h-[1px] bg-white/10 w-24 my-2" />
          
          <button
            onClick={() => handleLinkClick('contact')}
            className="text-[28px] sm:text-[34px] font-body text-white underline underline-offset-4 decoration-white/30 text-left"
          >
            Get in touch
          </button>
        </div>
      </div>
    </>
  );
};
