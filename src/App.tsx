import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BackgroundVideo } from './components/BackgroundVideo';
import { CanvasOverlay } from './components/CanvasOverlay';
import { EditorialIntro } from './components/EditorialIntro';
import { FeaturedWorks } from './components/FeaturedWorks';
import { NewArrivals } from './components/NewArrivals';
import { CreativeVault } from './components/CreativeVault';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Timeline } from './components/Timeline';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const getLoaderMessage = (p: number) => {
  if (p < 25) return 'CURATING EXHIBITS';
  if (p < 50) return 'RESOLVING COMPOSITION DETAILS';
  if (p < 75) return 'CALIBRATING VISUAL CONTRAST';
  if (p < 95) return 'TIGHTENING TYPOGRAPHY METRICS';
  if (p < 100) return 'PREPARING GALLERY SHOWROOM';
  return 'WELCOME TO THE ARCHIVE';
};

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [contentFade, setContentFade] = useState(false);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('pixelcraft_theme') as 'light' | 'dark') || 'dark';
  });

  const [ripple, setRipple] = useState<{
    active: boolean;
    x: number;
    y: number;
    theme: 'light' | 'dark';
    animating: boolean;
  }>({
    active: false,
    x: 0,
    y: 0,
    theme: 'light',
    animating: false,
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const targetTheme = theme === 'dark' ? 'light' : 'dark';

    setRipple({
      active: true,
      x,
      y,
      theme: targetTheme,
      animating: false,
    });

    requestAnimationFrame(() => {
      setTimeout(() => {
        setRipple(prev => ({ ...prev, animating: true }));
      }, 50);
    });

    setTimeout(() => {
      setTheme(targetTheme);
      if (targetTheme === 'light') {
        document.documentElement.classList.add('light');
        localStorage.setItem('pixelcraft_theme', 'light');
      } else {
        document.documentElement.classList.remove('light');
        localStorage.setItem('pixelcraft_theme', 'dark');
      }
    }, 900);

    setTimeout(() => {
      setRipple(prev => ({ ...prev, active: false }));
    }, 1300);
  };

  useEffect(() => {
    const start = Date.now();
    const duration = 1800; // Elegant 1.8-second cinematic entrance loader

    const updateProgress = () => {
      const elapsed = Date.now() - start;
      const progressPercent = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(progressPercent);

      if (progressPercent < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setContentFade(true); // Fade out the central spinner and logs first
        }, 300);

        setTimeout(() => {
          setLoading(false); // Unmount the preloader screen after shutters fully open
        }, 1500); // Allow time for shutters to slide out
      }
    };

    requestAnimationFrame(updateProgress);
  }, []);

  const handleNavClick = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] select-none selection:bg-white selection:text-black">
      
      {/* Dynamic Theme Ripple Overlay */}
      {ripple.active && (
        <div
          className={`fixed inset-0 z-[99998] pointer-events-none transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            ripple.animating ? 'clip-circle-full' : 'clip-circle-zero'
          }`}
          style={{
            backgroundColor: ripple.theme === 'light' ? '#FFFFFF' : '#050505',
            '--x': `${ripple.x}px`,
            '--y': `${ripple.y}px`,
          } as React.CSSProperties}
        />
      )}
      
      {/* Cinematic Luxury Preloader Screen */}
      {loading && (
        <div className="fixed inset-0 z-[99999] select-none pointer-events-none overflow-hidden">
          {/* Top Shutter Panel */}
          <div 
            className={`fixed top-0 left-0 w-full h-[50vh] transition-all duration-[750ms] border-b transition-transform duration-[1000ms] ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto z-10 ${
              theme === 'light' ? 'bg-[#F9F9F9] border-black/5' : 'bg-[#050505] border-white/5'
            } ${
              progress === 100 && contentFade ? '-translate-y-full' : 'translate-y-0'
            }`}
          />
          {/* Bottom Shutter Panel */}
          <div 
            className={`fixed bottom-0 left-0 w-full h-[50vh] transition-all duration-[750ms] border-t transition-transform duration-[1000ms] ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto z-10 ${
              theme === 'light' ? 'bg-[#F9F9F9] border-black/5' : 'bg-[#050505] border-white/5'
            } ${
              progress === 100 && contentFade ? 'translate-y-full' : 'translate-y-0'
            }`}
          />

          {/* Center Content Container */}
          <div 
            className={`fixed inset-0 z-[100000] flex flex-col justify-center items-center pointer-events-none transition-all duration-[600ms] ease-out ${
              theme === 'light' ? 'text-[#111111]' : 'text-white'
            } ${
              contentFade ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            {/* Elegant Minimalist Frame */}
            <div className="flex flex-col items-center max-w-lg px-8 text-center select-none">
              
              {/* Monospace Telemetry Heading */}
              <div className={`text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase mb-8 ${
                theme === 'light' ? 'text-black/30' : 'text-white/30'
              }`}>
                [ EST. 2026 // CREATIVE EXHIBITION ]
              </div>

              {/* Majestic Serif Name (high-fashion editorial look) */}
              <h1 className="text-[28px] sm:text-[40px] md:text-[44px] font-light tracking-[0.25em] leading-none uppercase select-none font-heading">
                SUJITH PUTTA
              </h1>
              
              <div className={`text-[9px] sm:text-[10px] font-mono tracking-[0.4em] uppercase mt-4 mb-12 ${
                theme === 'light' ? 'text-black/45' : 'text-white/45'
              }`}>
                SELECTED WORKS & ART DIRECTION
              </div>

              {/* Progress Container */}
              <div className="w-[260px] sm:w-[340px] flex flex-col items-center">
                
                {/* Monospace progress status details */}
                <div className={`w-full flex justify-between items-end mb-2.5 font-mono text-[9px] tracking-widest ${
                  theme === 'light' ? 'text-black/40' : 'text-white/40'
                }`}>
                  <span className="animate-pulse">{getLoaderMessage(progress)}</span>
                  <span className={`font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>{progress.toString().padStart(3, '0')} / 100</span>
                </div>

                {/* Pure solid progress bar line (no neon, no gradients) */}
                <div className={`w-full h-[1px] relative ${
                  theme === 'light' ? 'bg-black/10' : 'bg-white/10'
                }`}>
                  <div 
                    className={`absolute left-0 top-0 bottom-0 transition-all duration-[80ms] ease-out ${
                      theme === 'light' ? 'bg-black' : 'bg-white'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Corner creative alignment labels */}
            <div className={`absolute bottom-8 left-8 font-mono text-[9px] leading-relaxed tracking-widest hidden md:block ${
              theme === 'light' ? 'text-black/35' : 'text-white/20'
            }`}>
              <div>[ SUJITH PUTTA // GRAPHIC DESIGN ]</div>
            </div>

            <div className={`absolute bottom-8 right-8 font-mono text-[9px] text-right leading-relaxed tracking-widest hidden md:block ${
              theme === 'light' ? 'text-black/35' : 'text-white/20'
            }`}>
              <div>[ DIGITAL SHOWROOM // 2026 ]</div>
            </div>

          </div>
        </div>
      )}
      
      {/* 1. Global Interactive Canvas, Noise Grain, and Custom Cursor engines */}
      <CanvasOverlay />

      {/* 2. Interactive Horizontal Mouse-Scrub Background Video overlay */}
      <BackgroundVideo />

      {/* Discomorphism Floating Liquid Glass Background Spheres */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.16]" 
        style={{ filter: 'url(#liquid-gooey-effect)' }}
      >
        {/* Glow Spheres with higher opacity so the contrast filter works properly */}
        <div className="absolute top-1/4 left-[10%] w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#ff007f] via-[#8a2be2] to-transparent animate-disco-1" />
        <div className="absolute bottom-1/3 right-[5%] w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-gradient-to-br from-[#00ffff] via-[#8a2be2] to-transparent animate-disco-2" />
        <div className="absolute top-1/2 left-[40%] w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full bg-gradient-to-r from-[#ff007f] via-[#00ffff] to-transparent animate-disco-3" />
        {/* A couple of extra floating spheres for more organic interactive merging */}
        <div className="absolute top-1/3 left-[50%] w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-gradient-to-bl from-[#00ffff] to-[#ff007f] animate-[disco-float-2_15s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 left-[25%] w-[200px] sm:w-[260px] h-[200px] sm:h-[260px] rounded-full bg-gradient-to-tr from-[#ff007f] to-[#8a2be2] animate-[disco-float-1_18s_ease-in-out_infinite]" />
      </div>

      {/* 3. Floating Glass Navigation Header */}
      <Navbar onNavClick={handleNavClick} toggleTheme={toggleTheme} theme={theme} />

      {/* Main Structural Section Choreography */}
      <main className="relative w-full overflow-hidden">
        
        {/* Section 1: Cinematic Conversational Hero */}
        <Hero onNavClick={handleNavClick} theme={theme} />

        {/* Section 2: Editorial Intro & Profile exhibit */}
        <EditorialIntro />

        {/* Section 2.5: New Arrivals showcase section */}
        <NewArrivals onNavClick={handleNavClick} />

        {/* Section 3: Featured Works bento grid exhibition matrix */}
        <FeaturedWorks />

        {/* Section 3.5: Creative Vault overlapping grid visual wall */}
        <CreativeVault />

        {/* Section 4: About & Strategic Vision manifesto */}
        <About />

        {/* Section 5: Core Capabilities scrolling ticker matrices */}
        <Skills />

        {/* Section 6: Experience Timeline chronology progression */}
        <Timeline />

        {/* Section 7: Luxury Testimonials glassmorphic carousel slider */}
        <Testimonials />

        {/* Section 8: Immersive Contact brief capture channel */}
        <Contact />

      </main>

      {/* Section 9: System Editorial Footer alignments */}
      <Footer />

      {/* SVG Liquid Gooey Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none select-none" style={{ display: 'none' }} aria-hidden="true">
        <defs>
          <filter id="liquid-gooey-effect">
            <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" />
          </filter>
        </defs>
      </svg>

    </div>
  );
}

export default App;
