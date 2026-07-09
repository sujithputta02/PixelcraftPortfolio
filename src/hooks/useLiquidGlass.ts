import { useEffect } from "react";
import type { RefObject } from "react";

export interface LiquidGlassOptions {
  scale?: number;       // displacement strength (negative = magnifying bulge)
  chroma?: number;      // per-channel scale stagger (prism fringe)
  border?: number;      // neutral inset as a fraction of the smaller side
  mapBlur?: number;     // edge-curvature softness (px) of the map's gray inset
  blur?: number;        // backdrop blur (px) behind the glass interior
  saturate?: number;    // backdrop saturation boost
  radius?: number | null; // corner radius override (px); default reads border-radius
  fallbackBlur?: number; // frosted blur (px) where refraction is unsupported
}

/**
 * A custom React hook that initializes and cleans up the verbatim Liquid Glass refraction effect.
 *
 * @param ref React ref pointing to the target element.
 * @param active Whether the effect is active.
 * @param options Optional configuration parameters override.
 */
export function useLiquidGlass(
  ref: RefObject<HTMLElement | null>,
  active: boolean = true,
  options?: LiquidGlassOptions
) {
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const globalLiquidGlass = (window as any).liquidGlass;
    if (typeof globalLiquidGlass !== "function") {
      console.warn("liquidGlass is not defined on window. Make sure liquid-glass.js is loaded.");
      return;
    }

    const parsedOptions = optionsKey ? JSON.parse(optionsKey) : undefined;
    const glass = globalLiquidGlass(el, parsedOptions);

    return () => {
      if (glass && typeof glass.destroy === "function") {
        glass.destroy();
      }
    };
  }, [ref, active, optionsKey]);
}
