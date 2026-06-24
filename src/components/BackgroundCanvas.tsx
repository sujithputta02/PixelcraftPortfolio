import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  preloadedImages: HTMLImageElement[];
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ preloadedImages }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetProgressRef = useRef(0);
  const currentFrameRef = useRef(0);

  // Track the scroll position of the entire page using a ref to avoid React re-renders on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const timelineEl = document.getElementById('timeline');
      if (timelineEl) {
        const rect = timelineEl.getBoundingClientRect();
        const scrollTop = window.scrollY;
        const timelineTop = scrollTop + rect.top;
        const timelineHeight = timelineEl.offsetHeight;

        const timelineStart = timelineTop;
        const timelineDuration = timelineHeight - window.innerHeight;
        const timelineEnd = timelineStart + timelineDuration;

        let adjustedScrollY = scrollTop;
        if (scrollTop > timelineEnd) {
          adjustedScrollY = scrollTop - timelineDuration;
        } else if (scrollTop >= timelineStart) {
          adjustedScrollY = timelineStart;
        }

        const adjustedTotalHeight = scrollHeight - timelineDuration;
        if (adjustedTotalHeight > 0) {
          const progress = Math.max(0, Math.min(1, adjustedScrollY / adjustedTotalHeight));
          targetProgressRef.current = progress;
          return;
        }
      }

      const progress = Math.max(0, Math.min(1, window.scrollY / scrollHeight));
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Canvas drawing loop - depends only on preloadedImages
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawCoverImage = (img: HTMLImageElement) => {
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;
      
      if (!imgWidth || !imgHeight) return;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth = canvasWidth;
      let drawHeight = canvasHeight;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = canvasWidth / imgRatio;
        offsetY = (canvasHeight - drawHeight) / 2;
      } else {
        drawWidth = canvasHeight * imgRatio;
        offsetX = (canvasWidth - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const renderLoop = () => {
      if (preloadedImages.length === 0) {
        animationId = requestAnimationFrame(renderLoop);
        return;
      }

      // Map target progress to frame index (floating point)
      const targetFrame = targetProgressRef.current * (preloadedImages.length - 1);
      
      // Interpolate current frame position smoothly (lerp)
      // A factor of 0.15 gives a highly responsive yet butter-smooth transition
      currentFrameRef.current += (targetFrame - currentFrameRef.current) * 0.15;

      // Bound check and round to nearest integer frame index
      const frameToDraw = Math.max(0, Math.min(preloadedImages.length - 1, Math.round(currentFrameRef.current)));

      const img = preloadedImages[frameToDraw];
      if (img && (img.complete || img.naturalWidth > 0)) {
        drawCoverImage(img);
      }

      animationId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [preloadedImages]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block transition-all duration-500" 
        style={{
          filter: 'none'
        }}
      />
      {/* Dark luxury overlay for optimal readability of foreground content */}
      <div className="absolute inset-0 transition-colors duration-500 pointer-events-none bg-[#050505]/65" />
      <div className="absolute inset-0 bg-gradient-to-b transition-all duration-500 pointer-events-none from-[#050505]/85 via-transparent to-[#050505]/98" />
    </div>
  );
};
