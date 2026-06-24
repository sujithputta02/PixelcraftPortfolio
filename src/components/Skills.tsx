import React, { useEffect, useRef } from 'react';
import { sfx } from '../utils/sfx';

export const InteractiveSkillMatrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (canvas) {
          width = canvas.width = entry.contentRect.width;
          height = canvas.height = entry.contentRect.height;
        }
      }
    });
    
    const parent = canvas.parentElement;
    if (parent) resizeObserver.observe(parent);

    // Node details
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      label: string;
      color: string;
    }

    const labels = [
      'Creative', 'Poster', 'Brand', 'Typography', 
      'Affinity', 'Canva', 'Motion', 'Layout', 'Story'
    ];

    const nodes: Node[] = [];
    const numNodes = 14;

    for (let i = 0; i < numNodes; i++) {
      const label = labels[i % labels.length];
      const isOrange = i % 3 === 0;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: isOrange ? 4.5 : 3,
        label: i < labels.length ? label : '',
        color: isOrange ? '#ff7700' : '#0088ff' // Brand colors: orange and steel blue
      });
    }

    let mouse = { x: -1000, y: -1000, active: false };
    let rect = canvas.getBoundingClientRect();

    const updateRect = () => {
      rect = canvas.getBoundingClientRect();
    };

    const handleMouseEnter = () => {
      updateRect();
      mouse.active = true;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Node connection distance limit
      const maxDistance = 95;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes and labels
      nodes.forEach((node) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on boundaries
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Clamp to screen boundaries just in case
        node.x = Math.max(0, Math.min(width, node.x));
        node.y = Math.max(0, Math.min(height, node.y));

        // Interact with mouse
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            // Attract nodes slightly
            const force = (100 - dist) * 0.0006;
            node.vx += dx * force;
            node.vy += dy * force;
            // Cap velocities
            const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (speed > 1.8) {
              node.vx = (node.vx / speed) * 1.8;
              node.vy = (node.vy / speed) * 1.8;
            }
          }
        }

        // Draw node center dot
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Draw outer concentric orbit rings for orange ones
        if (node.color === '#ff7700') {
          ctx.strokeStyle = 'rgba(255, 119, 0, 0.25)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw label
        if (node.label) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.font = '500 8.5px "Helvetica Neue", Arial, sans-serif';
          ctx.fillText(node.label, node.x + 8, node.y + 3);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-auto"
    />
  );
};

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
      className="relative w-full pt-24 pb-24 md:pt-32 md:pb-48 bg-transparent z-10 select-none overflow-hidden"
    >

      {/* Absolute Glow Backgrounds */}
      <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-white/[0.008] blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 mb-16 sm:mb-20 text-left">
        <span className="text-[12px] font-heading font-medium tracking-[0.2em] uppercase text-white/45 block mb-3">
          06 — CAPABILITIES
        </span>
        <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-heading font-light tracking-[-0.03em] text-white leading-tight">
          Specialized Skill Matrix
        </h2>
      </div>

      {/* Infinite Horizontal Scrolling Bands (Opposing vectors) */}
      <div className="w-full flex flex-col gap-6 select-none relative z-10 mb-20">

        {/* Track 1: Scroll Left */}
        <div 
          className="w-full overflow-hidden flex whitespace-nowrap relative"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)'
          }}
        >
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
        <div 
          className="w-full overflow-hidden flex whitespace-nowrap relative"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, white 15%, white 85%, transparent)'
          }}
        >
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

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 relative z-10 reveal reveal-delay-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          
          {/* Left Column: Interactive Rive Showcase */}
          <div className="lg:col-span-4 w-full h-[320px] sm:h-[400px] rounded-2xl border border-white/10 bg-white/[0.015] overflow-hidden relative flex flex-col justify-between p-6 backdrop-blur-md">
            <div className="disco-tile-grid opacity-10 pointer-events-none" />
            
            <div className="relative z-10">
              <span className="text-[10px] font-heading font-medium tracking-[0.2em] text-[#ff7700] uppercase block mb-1">
                INTERACTIVE
              </span>
              <h3 className="text-[20px] font-heading font-semibold text-white tracking-tight leading-snug">
                Skill Matrix Visualizer
              </h3>
              <p className="text-[12px] font-body text-white/50 leading-relaxed mt-2">
                Interact with the canvas network to see real-time skill connections.
              </p>
            </div>
            
            {/* Interactive Skill Matrix Canvas */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
              <InteractiveSkillMatrix />
            </div>
          </div>

          {/* Right Column: Grid of Capabilities */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {gridCapabilities.map((cap, index) => (
              <div
                key={index}
                onMouseEnter={() => sfx.playTick('hover')}
                className={`bg-white/[0.015] border border-white/5 hover:border-white/15 p-6 sm:p-8 rounded-2xl text-left transition-all duration-300 backdrop-blur-md ${
                  index === 1 ? 'lg:translate-y-8' : index === 3 ? 'lg:translate-y-8' : ''
                }`}
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
      </div>

    </section>
  );
};
