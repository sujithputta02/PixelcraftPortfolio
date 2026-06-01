import React, { useEffect, useRef, useState } from 'react';

export const BackgroundVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prevX = useRef<number | null>(null);
  const queuedTargetTime = useRef<number | null>(null);
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

    // If it's a touch/mobile device, we loop and autoplay natively instead of scrubbing on touch
    if (isTouchDevice) {
      video.loop = true;
      video.play().catch((err) => {
        console.log("Mobile video autoplay blocked or failed:", err);
      });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!video || !video.duration || isNaN(video.duration)) return;

      const currentX = e.clientX;

      if (prevX.current === null) {
        prevX.current = currentX;
        return;
      }

      const delta = currentX - prevX.current;
      prevX.current = currentX;

      const SENSITIVITY = 0.8;
      const deltaRatio = delta / window.innerWidth;
      const timeDelta = deltaRatio * SENSITIVITY * video.duration;
      
      const newTargetTime = Math.max(0, Math.min(video.duration, video.currentTime + timeDelta));

      if (video.seeking) {
        queuedTargetTime.current = newTargetTime;
      } else {
        video.currentTime = newTargetTime;
      }
    };

    const handleMouseLeave = () => {
      prevX.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isLoaded, isTouchDevice]);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    if (queuedTargetTime.current !== null) {
      const nextTime = queuedTargetTime.current;
      queuedTargetTime.current = null;
      video.currentTime = nextTime;
    }
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
      <div className="fixed inset-0 bg-gradient-to-b from-[#050505]/75 via-[#050505]/35 to-[#050505]/98 z-0 pointer-events-none select-none" />
    </>
  );
};


