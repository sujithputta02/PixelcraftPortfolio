import React, { useEffect, useRef, useState } from 'react';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef<number | null>(null);
  const lastSeekTime = useRef<number>(0);
  const prevX = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch device or mobile screen size
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        window.innerWidth < 1024
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Bulletproof safety fallback to ensure background fades in and is never black
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isInsideTimeline = false;

    const checkTimelineActive = () => {
      const timelineEl = document.getElementById('timeline');
      if (timelineEl) {
        const rect = timelineEl.getBoundingClientRect();
        // If the timeline top is scrolled past and bottom hasn't exited the screen
        isInsideTimeline = (rect.top <= 0 && rect.bottom >= window.innerHeight);
      } else {
        isInsideTimeline = false;
      }
    };

    const handleScroll = () => {
      checkTimelineActive();
      if (isInsideTimeline) {
        if (!video.paused) {
          video.pause();
        }
      } else {
        if (isTouchDevice && video.paused) {
          video.play().catch(() => {});
        }
      }
    };

    // If it's a touch/mobile device, we loop and autoplay natively instead of scrubbing on touch
    if (isTouchDevice) {
      video.loop = true;
      video.play().catch((err) => {
        console.log("Mobile video autoplay blocked or failed:", err);
      });
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    const handleMouseMove = (e: MouseEvent) => {
      checkTimelineActive();
      if (isInsideTimeline) return; // Freeze video scrubbing inside timeline

      if (!video || !video.duration || isNaN(video.duration)) return;

      const currentX = e.clientX;

      if (prevX.current === null) {
        prevX.current = currentX;
        return;
      }

      const delta = currentX - prevX.current;
      prevX.current = currentX;

      const SENSITIVITY = 0.55; // Lower sensitivity for smooth feel
      const deltaRatio = delta / window.innerWidth;
      const timeDelta = deltaRatio * SENSITIVITY * video.duration;
      
      const baseTime = targetTime.current !== null ? targetTime.current : video.currentTime;
      targetTime.current = Math.max(0, Math.min(video.duration, baseTime + timeDelta));
    };

    const handleMouseLeave = () => {
      prevX.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Continuous smooth scrubbing loop using RAF
    let animationId: number;
    const updateScrub = () => {
      const now = Date.now();
      if (
        video &&
        targetTime.current !== null &&
        !video.seeking &&
        !isInsideTimeline &&
        now - lastSeekTime.current > 65 // Throttle to ~15 seeks/sec (highly optimized)
      ) {
        if (Math.abs(video.currentTime - targetTime.current) > 0.02) {
          video.currentTime = targetTime.current;
          lastSeekTime.current = now;
        } else {
          targetTime.current = null;
        }
      }
      animationId = requestAnimationFrame(updateScrub);
    };
    animationId = requestAnimationFrame(updateScrub);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationId);
    };
  }, [isLoaded, isTouchDevice]);

  const handleSeeked = () => {
    lastSeekTime.current = Date.now();
  };

  const handleLoadedMetadata = () => {
    setIsLoaded(true);
    // Seek to a beautiful initial frame
    if (videoRef.current) {
      if (isTouchDevice) {
        videoRef.current.loop = true;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src="/PixelCraft by Sujith.mp4"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none select-none transition-opacity duration-1000 ease-out object-center md:object-[70%_center]"
        style={{
          opacity: isLoaded ? 0.35 : 0, // Cinematic low-opacity dim overlay
        }}
        muted
        playsInline
        loop={isTouchDevice}
        autoPlay={isTouchDevice}
        preload="auto"
        crossOrigin="anonymous"
        onSeeked={handleSeeked}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={() => {
          setIsLoaded(true);
          if (isTouchDevice && videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        }}
      />
      {/* Cinematic dark ambient overlay to ensure perfect contrast for reading primary typography */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#050505]/75 via-[#050505]/35 to-[#050505]/98 z-0 pointer-events-none select-none video-overlay" />
    </>
  );
};


