import React, { useRef } from "react";
import { useLiquidGlass } from "../hooks/useLiquidGlass";
import type { LiquidGlassOptions } from "../hooks/useLiquidGlass";

interface LiquidGlassCardProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  active?: boolean;
  options?: LiquidGlassOptions;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  "data-cursor"?: string;
  "data-magnetic"?: boolean;
}

/**
 * A premium reusable component that wraps content inside a Liquid Glass panel.
 * Automatically handles the life-cycle of the refraction displacement effect.
 */
export const LiquidGlassCard: React.FC<LiquidGlassCardProps> = ({
  className,
  children,
  style,
  active = true,
  options,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  onClick,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Set default premium parameters matching the original repository
  useLiquidGlass(ref, active, {
    scale: -112,
    chroma: 6,
    border: 0.07,
    mapBlur: 12,
    blur: 3,
    saturate: 1.5,
    ...options,
  });

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};
