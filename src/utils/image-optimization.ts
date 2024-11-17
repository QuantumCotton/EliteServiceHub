interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
}

export const getOptimizedImageUrl = (
  originalUrl: string,
  options: ImageOptimizationOptions = {}
): string => {
  // This is a placeholder implementation
  // In a real app, you would use an image optimization service like Cloudinary, imgix, etc.
  const {
    width = 800,
    height,
    quality = 80,
    format = 'webp'
  } = options;

  // Example using a hypothetical image optimization service
  const params = new URLSearchParams({
    w: width.toString(),
    ...(height && { h: height.toString() }),
    q: quality.toString(),
    fm: format,
  });

  // For now, just return the original URL
  // In production, replace with your image optimization service URL
  return `${originalUrl}?${params.toString()}`;
};

export const generateImageSrcSet = (
  originalUrl: string,
  widths: number[] = [320, 640, 960, 1280, 1920]
): string => {
  return widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(originalUrl, { width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
};

export const calculateAspectRatio = (width: number, height: number): string => {
  return `${(height / width) * 100}%`;
};

export const preloadCriticalImages = (urls: string[]): void => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};
