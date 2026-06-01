import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer
      className="relative w-full py-10 px-5 sm:px-8 md:px-16 bg-[#050505] z-10 select-none border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left Signature */}
        <div className="text-[14px] sm:text-[16px] font-heading font-medium tracking-tight text-white/80">
          PixelCraft <span className="font-cursive text-[18px] text-white/50 ml-1">by Sujith</span>
        </div>

        {/* Central Manifesto */}
        <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-[12px] font-heading font-semibold uppercase tracking-[0.2em] text-white/45">
          <span>Frames</span>
          <span className="text-white/10">•</span>
          <span>Pixels</span>
          <span className="text-white/10">•</span>
          <span>Identity</span>
        </div>

        {/* Right Copyright Block */}
        <div className="text-[11px] sm:text-[12px] font-heading font-normal tracking-wide text-white/40">
          © {currentYear} All Rights Reserved | Designed & Crafted by Sujith
        </div>

      </div>
    </footer>
  );
};
