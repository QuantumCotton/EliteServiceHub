import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  placeholderSrc?: string;
  onLoad?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  sizes = '100vw',
  className,
  placeholderSrc,
  onLoad,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    // Create new image object
    const img = new Image();
    img.src = src;
    img.sizes = sizes;

    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
      onLoad?.();
    };

    return () => {
      img.onload = null;
    };
  }, [src, sizes, onLoad]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      sizes={sizes}
      className={cn(
        'transition-opacity duration-300',
        isLoading ? 'opacity-50' : 'opacity-100',
        className
      )}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

export default OptimizedImage;
