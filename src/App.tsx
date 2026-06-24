import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CanvasOverlay } from './components/CanvasOverlay';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { BackgroundVideo } from './components/BackgroundVideo';
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
  const [preloadedImages, setPreloadedImages] = useState<HTMLImageElement[]>([]);




  useEffect(() => {
    const totalImages = 151;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    const startTime = Date.now();
    const minDuration = 1800; // Keep the intro animated at least 1.8s for cinematic style
    
    let targetProgress = 0;
    let animationFrameId: number;

    const onImageLoaded = () => {
      loadedCount++;
      targetProgress = Math.floor((loadedCount / totalImages) * 100);
    };

    // Begin Preloading sequence frames
    for (let i = 0; i < totalImages; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/sequence/frame_${frameNum}_delay-0.066s.webp`;
      img.onload = onImageLoaded;
      img.onerror = onImageLoaded; // continue preloader even if image fails
      loadedImages.push(img);
    }
    setPreloadedImages(loadedImages);

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const timeRatio = Math.min(1, elapsed / minDuration);
      const timeProgress = Math.floor(timeRatio * 100);
      
      // Real loaded percentage combined with min time-duration factor
      const displayProgress = Math.min(timeProgress, targetProgress);
      setProgress(displayProgress);

      if (displayProgress < 100 || timeRatio < 1 || targetProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setLoading(false); // Unmount preloader
        }, 1500);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Global Scroll-Reveal System Setup
  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // One-shot entrance animation
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -80px 0px'
      });

      const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      elements.forEach((el) => observer.observe(el));

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }, 150);

    return () => clearTimeout(timer);
  }, [loading]);

  const handleNavClick = (sectionId: string) => {
    // On mobile/tablet, the desktop sticky-scroll timeline is hidden, so redirect to the mobile section
    const resolvedId =
      sectionId === 'timeline' && window.innerWidth < 1024
        ? 'timeline-mobile'
        : sectionId;
    const target = document.getElementById(resolvedId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] select-none selection:bg-white selection:text-black">
      
      {/* Cinematic Luxury Preloader Screen */}
      {loading && (
        <div className="fixed inset-0 z-[99999] select-none pointer-events-none overflow-hidden">
          {/* Top Shutter Panel */}
          <div 
            className="fixed top-0 left-0 w-full h-[50vh] transition-all duration-[750ms] border-b transition-transform duration-[1000ms] ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto z-10 bg-[#050505] border-white/5"
          />
          {/* Bottom Shutter Panel */}
          <div 
            className="fixed bottom-0 left-0 w-full h-[50vh] transition-all duration-[750ms] border-t transition-transform duration-[1000ms] ease-[cubic-bezier(0.85,0,0.15,1)] pointer-events-auto z-10 bg-[#050505] border-white/5"
          />

          {/* Center Content Container */}
          <div 
            className="fixed inset-0 z-[100000] flex flex-col justify-center items-center pointer-events-none transition-all duration-[600ms] ease-out text-white"
          >
            {/* Elegant Minimalist Frame */}
            <div className="flex flex-col items-center max-w-lg px-8 text-center select-none">
              
              {/* Premium Sacramento Cursive Signature Animation */}
              <div className="mb-6 flex items-center justify-center select-none text-[#ff7700]">
                <svg 
                  viewBox="0 0 320 120" 
                  className="w-full max-w-[320px] h-auto filter drop-shadow-[0_0_12px_rgba(255,119,0,0.35)]"
                >
                  <defs>
                    <linearGradient id="reveal-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="white" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                    
                    <mask id="sign-mask">
                      {/* Animated gradient reveal moving from left to right */}
                      <motion.rect
                        x="0"
                        y="0"
                        width="100%"
                        height="120"
                        fill="url(#reveal-grad)"
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                      />
                    </mask>
                  </defs>

                  {/* Outlines of the Sacramento cursive font */}
                  <motion.text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-cursive text-7xl fill-none"
                    style={{
                      stroke: '#ff7700',
                      strokeWidth: '1.5px',
                    }}
                    initial={{ strokeDasharray: 500, strokeDashoffset: 500 }}
                    animate={{ strokeDashoffset: 0 }}
                    transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  >
                    Sujith
                  </motion.text>

                  {/* Filled body of the Sacramento cursive font, masked for left-to-right reveal */}
                  <motion.text
                    x="50%"
                    y="55%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-cursive text-7xl"
                    style={{
                      fill: '#ffffff',
                    }}
                    mask="url(#sign-mask)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    Sujith
                  </motion.text>

                  {/* Cursive Underline Flourish */}
                  <motion.path
                    d="M 65,102 Q 160,107 270,95"
                    stroke="rgba(255,119,0,0.45)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { delay: 2.0, duration: 0.8, ease: "easeOut" },
                      opacity: { delay: 2.0, duration: 0.01 }
                    }}
                  />
                </svg>
              </div>
              
              <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.4em] uppercase mt-4 mb-12 text-white/45">
                SELECTED WORKS & ART DIRECTION
              </div>

              {/* Progress Container */}
              <div className="w-full max-w-[260px] sm:max-w-[340px] flex flex-col items-center">
                
                {/* Monospace progress status details */}
                <div className="w-full flex justify-between items-end mb-2.5 font-mono text-[9px] tracking-widest text-white/40">
                  <span className="animate-pulse">{getLoaderMessage(progress)}</span>
                  <span className="font-semibold text-white">{progress.toString().padStart(3, '0')} / 100</span>
                </div>

                {/* Pure solid progress bar line (no neon, no gradients) */}
                <div className="w-full h-[1px] relative bg-white/10">
                  <div 
                    className="absolute left-0 top-0 bottom-0 transition-all duration-[80ms] ease-out bg-white"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Corner creative alignment labels */}
            <div className="absolute bottom-8 left-8 font-mono text-[9px] leading-relaxed tracking-widest hidden md:block text-white/20">
              <div>[ SUJITH PUTTA // GRAPHIC DESIGN ]</div>
            </div>

            <div className="absolute bottom-8 right-8 font-mono text-[9px] text-right leading-relaxed tracking-widest hidden md:block text-white/20">
              <div>[ DIGITAL SHOWROOM // 2026 ]</div>
            </div>

          </div>
        </div>
      )}
      
      {/* 1. Global Interactive Canvas, Noise Grain, and Custom Cursor engines */}
      <CanvasOverlay />

      {/* 2. Interactive Horizontal Mouse-Scrub Background Video overlay */}
      <BackgroundVideo />

      {/* Global Scroll-Linked Canvas Image Sequence player */}
      <BackgroundCanvas preloadedImages={preloadedImages} />

      {/* Discomorphism Floating Liquid Glass Background Spheres */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.16]" 
        style={{ filter: 'url(#liquid-gooey-effect)' }}
      >
        {/* Glow Spheres with higher opacity so the contrast filter works properly */}
        <div className="absolute top-1/4 left-[10%] w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#ff7700] via-[#aa4400] to-transparent animate-disco-1" />
        <div className="absolute bottom-1/3 right-[5%] w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-gradient-to-br from-[#0088ff] via-[#0044aa] to-transparent animate-disco-2" />
        <div className="absolute top-1/2 left-[40%] w-[260px] sm:w-[360px] h-[260px] sm:h-[360px] rounded-full bg-gradient-to-r from-[#ff7700] via-[#0088ff] to-transparent animate-disco-3" />
        {/* A couple of extra floating spheres for more organic interactive merging */}
        <div className="absolute top-1/3 left-[50%] w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] rounded-full bg-gradient-to-bl from-[#0088ff] to-[#ff7700] animate-[disco-float-2_15s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 left-[25%] w-[200px] sm:w-[260px] h-[200px] sm:h-[260px] rounded-full bg-gradient-to-tr from-[#ff7700] to-[#0088ff] animate-[disco-float-1_18s_ease-in-out_infinite]" />
      </div>

      {/* 3. Floating Glass Navigation Header */}
      <Navbar onNavClick={handleNavClick} />

      {/* Main Structural Section Choreography */}
      <main className="relative w-full">
        
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
