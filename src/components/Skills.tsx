import React from 'react';
import { sfx } from '../utils/sfx';

const skillsGroup1 = [
  'Creative Direction',
  'Poster Design',
  'Visual Storytelling',
  'Brand Identity',
  'Photo Manipulation',
  'Typography',
  'Social Media Design'
];

const skillsGroup2 = [
  'Canva Affinity',
  'Canva',
  'Affinity Designer',
  'Motion Design',
  'Creative Strategy',
  'Visual Storytelling',
  'Creative Direction'
];

const gridCapabilities = [
  {
    title: 'Creative Direction',
    desc: 'Orchestrating complete thematic visual strategies, mood boards, and aesthetic parameters for immersive storytelling campaigns.'
  },
  {
    title: 'Poster Design',
    desc: 'Constructing theatrical and speculative art prints utilizing high-density compositions, textures, and custom layout balances.'
  },
  {
    title: 'Visual Storytelling',
    desc: 'Translating complex narratives, emotional weights, and deep-universe lore into singular premium frames that leave lasting marks.'
  },
  {
    title: 'Brand Identity',
    desc: 'Crafting premium aesthetic visual brand assets, logos, and typographic guidelines for creative directors and collaborators.'
  },
  {
    title: 'Photo Manipulation',
    desc: 'Blending complex multi-raster assets, rendering mathematically coherent specular glows, and sketching volumetric shadow layers.'
  },
  {
    title: 'Typography Systems',
    desc: 'Pairing neo-grotesque structural alignments with custom elegant script scripts to generate premium editorial layouts.'
  }
];

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full py-24 md:py-32 bg-[#050505] z-10 select-none overflow-hidden"
    >
      
      {/* Absolute Glow Backgrounds */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-white/[0.008] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 mb-16 sm:mb-20 text-left">
        <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 block mb-3">
          06 — CAPABILITIES
        </span>
        <h2 className="text-[36px] sm:text-[48px] md:text-[56px] font-heading font-light tracking-[-0.03em] text-white leading-tight">
          Specialized Skill Matrix
        </h2>
      </div>

      {/* Infinite Horizontal Scrolling Bands (Opposing vectors) */}
      <div className="w-full flex flex-col gap-6 select-none relative z-10 mb-20">
        
        {/* Track 1: Scroll Left */}
        <div className="w-full overflow-hidden flex whitespace-nowrap relative">
          {/* Subtle gradient masks on sides for luxury fade */}
          <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-4 sm:gap-6 animate-scroll-left">
            {/* Render twice for continuous loop */}
            {[...skillsGroup1, ...skillsGroup1].map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-full px-6 sm:px-8 py-3.5 sm:py-4.5 select-none"
              >
                <span className="text-[16px] sm:text-[19px] font-heading font-medium uppercase tracking-[0.15em] text-white/85 leading-none">
                  {skill}
                </span>
                <span className="text-[16px] sm:text-[19px] text-white/30 ml-4 sm:ml-6 leading-none">
                  ✳︎
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Track 2: Scroll Right */}
        <div className="w-full overflow-hidden flex whitespace-nowrap relative">
          <div className="absolute top-0 left-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-4 sm:gap-6 animate-scroll-right">
            {[...skillsGroup2, ...skillsGroup2].map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-full px-6 sm:px-8 py-3.5 sm:py-4.5 select-none"
              >
                <span className="text-[16px] sm:text-[19px] font-heading font-medium uppercase tracking-[0.15em] text-white/85 leading-none">
                  {skill}
                </span>
                <span className="text-[16px] sm:text-[19px] text-white/30 ml-4 sm:ml-6 leading-none">
                  ✳︎
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Clean Grid Capabilities */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridCapabilities.map((cap, index) => (
            <div
              key={index}
              onMouseEnter={() => sfx.playTick('hover')}
              className="bg-white/[0.015] border border-white/5 hover:border-white/15 p-6 sm:p-8 rounded-2xl text-left transition-colors duration-300 backdrop-blur-md"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <span className="text-[12px] font-heading font-semibold text-white/60">
                  {`0${index + 1}`}
                </span>
              </div>
              
              <h3 className="text-[18px] sm:text-[21px] font-heading font-semibold text-white tracking-tight mb-3">
                {cap.title}
              </h3>
              
              <p className="text-[14px] sm:text-[15px] font-body text-[#A3A3A3] leading-relaxed">
                {cap.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};
