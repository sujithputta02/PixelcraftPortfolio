import React, { useEffect, useRef, useState } from 'react';

export const CanvasOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const cursorRingPos = useRef({ x: 0, y: 0 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect touch device or mobile screen size
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(
        window.innerWidth >= 1024 && 
        !('ontouchstart' in window || navigator.maxTouchPoints > 0)
      );
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Setup fluid trailing mouse glow canvas
  useEffect(() => {
    if (!isDesktop) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial position in center
    mousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    glowPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    let animationId: number;

    const render = () => {
      if (!ctx || !canvas) return;

      // Clear canvas with deep transparent backdrop
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Lerp mouse coordinates for fluid trailing glow
      const LERP_FACTOR = 0.08;
      glowPos.current.x += (mousePos.current.x - glowPos.current.x) * LERP_FACTOR;
      glowPos.current.y += (mousePos.current.y - glowPos.current.y) * LERP_FACTOR;

      // Draw soft alpha radial glow gradient
      const radius = 260;
      const gradient = ctx.createRadialGradient(
        glowPos.current.x,
        glowPos.current.y,
        0,
        glowPos.current.x,
        glowPos.current.y,
        radius
      );

      const isLightTheme = document.documentElement.classList.contains('light');
      const glowColor = isLightTheme ? '0, 0, 0' : '255, 255, 255';
      const glowOpacityMultiplier = isLightTheme ? 0.6 : 1;

      gradient.addColorStop(0, `rgba(${glowColor}, ${0.055 * glowOpacityMultiplier})`);
      gradient.addColorStop(0.3, `rgba(${glowColor}, ${0.024 * glowOpacityMultiplier})`);
      gradient.addColorStop(1, `rgba(${glowColor}, 0)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDesktop]);

  // Setup hardware-accelerated custom cursor
  useEffect(() => {
    if (!isDesktop) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Enable custom cursor active styling in body
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      // Dot moves instantly
      cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    let animationId: number;
    const updateCursorRing = () => {
      if (!cursor) return;

      // Lerp the larger cursor ring slightly slower
      const LERP_FACTOR = 0.16;
      cursorRingPos.current.x += (mousePos.current.x - cursorRingPos.current.x) * LERP_FACTOR;
      cursorRingPos.current.y += (mousePos.current.y - cursorRingPos.current.y) * LERP_FACTOR;

      cursor.style.transform = `translate3d(${cursorRingPos.current.x}px, ${cursorRingPos.current.y}px, 0)`;

      animationId = requestAnimationFrame(updateCursorRing);
    };
    updateCursorRing();

    // Scan for hoverable elements dynamically
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, [role="button"], [data-cursor]');
      
      if (hoverable) {
        setIsHovered(true);
        const text = hoverable.getAttribute('data-cursor') || '';
        setCursorText(text);

        // Apply visual magnetic pull offset logic where appropriate
        if (hoverable.hasAttribute('data-magnetic') && cursorDot) {
          const rect = hoverable.getBoundingClientRect();
          const targetX = rect.left + rect.width / 2;
          const targetY = rect.top + rect.height / 2;
          
          // Pull cursor dot slightly towards center of button
          const pullIntensity = 0.48;
          const currentMouse = mousePos.current;
          const finalX = currentMouse.x + (targetX - currentMouse.x) * pullIntensity;
          const finalY = currentMouse.y + (targetY - currentMouse.y) * pullIntensity;
          cursorDot.style.transform = `translate3d(${finalX}px, ${finalY}px, 0) scale(2.2)`;
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, [isDesktop]);

  return (
    <>
      {/* High Frequency Film Grain loop layer */}
      <div className="noise-overlay" />

      {/* Trailing Radial Mouse Glow Canvas */}
      {isDesktop && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 w-full h-full z-1 pointer-events-none select-none"
        />
      )}

      {/* Custom Hardware-Accelerated Dynamic Cursor */}
      {isDesktop && (
        <>
          <div
            ref={cursorRef}
            className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 pointer-events-none z-[10000] flex items-center justify-center transition-all duration-300 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            } ${
              isHovered
                ? 'w-16 h-16 bg-white/10 backdrop-blur-[2px] border-white scale-110'
                : 'w-8 h-8 scale-100'
            }`}
          >
            {isHovered && cursorText && (
              <span className="text-[9px] uppercase tracking-[0.2em] font-heading font-semibold text-white pointer-events-none animate-fade-in">
                {cursorText}
              </span>
            )}
            {isHovered && !cursorText && (
              <span className="text-[14px] font-heading font-medium text-white select-none leading-none">
                ✳︎
              </span>
            )}
          </div>

          {/* Instant cursor dot */}
          <div
            ref={cursorDotRef}
            className={`fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[10001] transition-transform duration-300 ease-out ${
              isVisible ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'scale-0' : 'scale-100'}`}
          />
        </>
      )}
    </>
  );
};

