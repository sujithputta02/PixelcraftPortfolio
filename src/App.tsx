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

function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 1600; // Smooth 1.6-second cinematic entrance loader

    const updateProgress = () => {
      const elapsed = Date.now() - start;
      const progressPercent = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(progressPercent);

      if (progressPercent < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 800); // Sync hide with CSS transition completion
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
      
      {/* Cinematic Luxury Preloader Screen */}
      <div 
        className="fixed inset-0 bg-[#050505] z-[99999] flex flex-col justify-center items-center select-none transition-all duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          opacity: progress < 100 ? 1 : 0,
          transform: progress < 100 ? 'scale(1) translateY(0)' : 'scale(1.02) translateY(-40px)',
          pointerEvents: progress < 100 ? 'auto' : 'none',
          visibility: loading ? 'visible' : 'hidden'
        }}
      >
        {/* Glowing Discomorphic Logo */}
        <div className="mb-7 relative select-none">
          <div className="absolute inset-0 rounded-full bg-[#ff007f]/15 blur-[35px] animate-[pulse_3s_infinite] pointer-events-none" />
          <img
            src="/Pixelcraft Discomorphism wb.png"
            alt="PixelCraft Logo"
            className="w-18 h-18 sm:w-20 sm:h-20 object-contain filter drop-shadow-[0_0_12px_rgba(255,0,127,0.45)] drop-shadow-[0_0_6px_rgba(0,255,255,0.35)] animate-[spin_12s_linear_infinite]"
          />
        </div>

        {/* Technical Progress Count-Up */}
        <div className="flex flex-col items-center gap-3.5 w-full max-w-[280px]">
          <span className="text-[34px] sm:text-[40px] font-heading font-extrabold text-white tracking-tighter tabular-nums leading-none">
            {progress.toString().padStart(3, '0')}%
          </span>
          
          {/* Specular Progress Bar Track */}
          <div className="w-full h-[2px] bg-white/10 rounded-full relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#ff007f] via-[#ffffff] to-[#00ffff] rounded-full transition-all duration-[80ms] ease-out shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-[9.5px] font-heading font-semibold uppercase tracking-[0.25em] text-white/35 mt-1 animate-pulse">
            INITIALIZING SHOWROOM SYSTEM
          </span>
        </div>
      </div>
      
      {/* 1. Global Interactive Canvas, Noise Grain, and Custom Cursor engines */}
      <CanvasOverlay />

      {/* 2. Interactive Horizontal Mouse-Scrub Background Video overlay */}
      <BackgroundVideo />

      {/* Discomorphism Floating Iridescent Background Spheres */}
      <div className="fixed top-1/4 left-[10%] w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#ff007f]/12 via-[#8a2be2]/10 to-transparent blur-[100px] pointer-events-none z-0 animate-disco-1" />
      <div className="fixed bottom-1/3 right-[5%] w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-gradient-to-br from-[#00ffff]/10 via-[#8a2be2]/12 to-transparent blur-[120px] pointer-events-none z-0 animate-disco-2" />
      <div className="fixed top-1/2 left-[40%] w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full bg-gradient-to-r from-[#ff007f]/8 via-[#00ffff]/8 to-transparent blur-[90px] pointer-events-none z-0 animate-disco-3" />

      {/* 3. Floating Glass Navigation Header */}
      <Navbar onNavClick={handleNavClick} />

      {/* Main Structural Section Choreography */}
      <main className="relative w-full overflow-hidden">
        
        {/* Section 1: Cinematic Conversational Hero */}
        <Hero onNavClick={handleNavClick} />

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

    </div>
  );
}

export default App;
