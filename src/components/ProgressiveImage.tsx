import React, { useState, useEffect } from 'react';
import placeholders from '../utils/placeholders.json';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  containerClassName?: string;
}

// A global cache of images that have been fully loaded
const loadedImagesCache = new Set<string>();

// Preload helper to populate the cache
export const preloadImage = (src: string) => {
  if (!src || loadedImagesCache.has(src)) return;
  const img = new Image();
  img.src = src;
  img.onload = () => {
    loadedImagesCache.add(src);
  };
};

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  containerClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(() => loadedImagesCache.has(src));

  // Reset state if source changes
  useEffect(() => {
    if (loadedImagesCache.has(src)) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  const hasPositionClass = /\b(absolute|relative|fixed|sticky|static)\b/.test(containerClassName);
  const placeholderSrc = (placeholders as Record<string, string>)[src];

  return (
    <div className={`${hasPositionClass ? '' : 'relative'} w-full h-full overflow-hidden select-none ${containerClassName}`}>
      {/* Blurred image placeholder from metadata */}
      {placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover filter blur-xl scale-110 z-0 transition-opacity duration-1000 ${
            isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
          } ${placeholderClassName}`}
        />
      )}

      {/* Glassmorphic Shimmer Loader Skeleton (shown only if no placeholder is available) */}
      {!isLoaded && !placeholderSrc && (
        <div 
          className={`absolute inset-0 glass-disco animate-pulse flex items-center justify-center border border-white/5 z-10 ${placeholderClassName}`}
        >
          {/* Subtle rotating luxury indicator */}
          <div className="w-6 h-6 border border-white/10 border-t-white/40 rounded-full animate-[spin_1.2s_linear_infinite]" />
        </div>
      )}

      {/* Main Image */}
      <img
        {...props}
        src={src}
        alt={alt}
        onLoad={() => {
          loadedImagesCache.add(src);
          setIsLoaded(true);
        }}
        className={`${className} transition-opacity duration-1000 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
