import { Theme } from '../types/theme';

/**
 * Determines the appropriate contrast color (black or white) for text on a given background color
 * @param backgroundColor HSL color string
 * @returns HSL color string for text
 */
export const getContrastColor = (backgroundColor: string): string => {
  const match = backgroundColor.match(/hsl\(\s*\d+\s*,\s*\d+%\s*,\s*(\d+)%\s*\)/);
  if (!match) return 'hsl(0, 0%, 0%)';
  
  const lightness = parseInt(match[1], 10);
  return lightness > 50 ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 100%)';
};

/**
 * Generates a muted variant of a color by reducing saturation and lightness
 * @param color HSL color string
 * @param saturationFactor Factor to reduce saturation (0-1)
 * @param lightnessFactor Factor to reduce lightness (0-1)
 * @returns HSL color string
 */
export const generateMutedVariant = (
  color: string,
  saturationFactor = 0.6,
  lightnessFactor = 0.8
): string => {
  const match = color.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
  if (!match) return color;
  
  const [, hue, saturation, lightness] = match.map(Number);
  const newSaturation = Math.round(saturation * saturationFactor);
  const newLightness = Math.round(lightness * lightnessFactor);
  
  return `hsl(${hue}, ${newSaturation}%, ${newLightness}%)`;
};
