import React, { useState } from 'react';
import { sfx } from '../utils/sfx';

export const Footer: React.FC = () => {
  const currentYear = 2026;
  const [isMuted, setIsMuted] = useState(sfx.isMuted());

  const handleToggleMute = () => {
    const newMuted = sfx.toggleMute();
    setIsMuted(newMuted);
    
    // Play a click sound if they just unmuted it
    if (!newMuted) {
      setTimeout(() => sfx.playTick('click'), 50);
    }
  };

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

        {/* Right Copyright Block & Audio Toggle */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-right">
          <button 
            onClick={handleToggleMute}
            onMouseEnter={() => sfx.playTick('hover')}
            className="text-[10px] font-heading font-semibold uppercase tracking-wider border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-full px-3 py-1 flex items-center gap-1.5 text-white/60 hover:text-white transition-all duration-300 select-none cursor-pointer"
            data-cursor="Toggle Sound"
          >
            <span>{isMuted ? '🔇 Audio Muted' : '🔊 Audio On'}</span>
          </button>
          <div className="text-[11px] sm:text-[12px] font-heading font-normal tracking-wide text-white/40">
            © {currentYear} All Rights Reserved | Designed & Crafted by Sujith
          </div>
        </div>

      </div>
    </footer>
  );
};
