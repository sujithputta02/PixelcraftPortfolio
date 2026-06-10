import React, { useState, useEffect } from 'react';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  placeholderClassName = '',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset state if source changes
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      {/* Glassmorphic Shimmer Loader Skeleton */}
      {!isLoaded && (
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
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-1000 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
