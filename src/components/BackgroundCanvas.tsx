import React, { useEffect, useRef, useState } from 'react';

const FIRST_FRAME_PLACEHOLDER = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAJABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCmnJEjKOfyp3mBSXUKCBVaLqv1ol+8frQ9QWh//9k=";

interface BackgroundCanvasProps {
  preloadedImages: HTMLImageElement[];
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ preloadedImages }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetProgressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const [hasRendered, setHasRendered] = useState(false);

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
        setHasRendered((prev) => {
          if (!prev) return true;
          return prev;
        });
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
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* Blurred first frame placeholder from metadata */}
      <img
        src={FIRST_FRAME_PLACEHOLDER}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover filter blur-3xl scale-110 transition-opacity duration-[1500ms] ease-out z-0 ${
          hasRendered ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <canvas 
        ref={canvasRef} 
        className="w-full h-full block transition-all duration-500 relative z-10" 
        style={{
          filter: 'none'
        }}
      />
      {/* Dark luxury overlay for optimal readability of foreground content */}
      <div className="absolute inset-0 transition-colors duration-500 pointer-events-none bg-[#050505]/65 z-20" />
      <div className="absolute inset-0 bg-gradient-to-b transition-all duration-500 pointer-events-none from-[#050505]/85 via-transparent to-[#050505]/98 z-30" />
    </div>
  );
};
