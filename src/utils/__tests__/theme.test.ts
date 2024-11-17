import { Theme } from '../../types/theme';
import { getContrastColor, generateMutedVariant } from '../theme';

describe('Theme Utilities', () => {
  describe('getContrastColor', () => {
    it('should return white text for dark backgrounds', () => {
      const darkColor = 'hsl(0, 0%, 20%)';
      expect(getContrastColor(darkColor)).toBe('hsl(0, 0%, 100%)');
    });

    it('should return black text for light backgrounds', () => {
      const lightColor = 'hsl(0, 0%, 80%)';
      expect(getContrastColor(lightColor)).toBe('hsl(0, 0%, 0%)');
    });
  });

  describe('generateMutedVariant', () => {
    it('should generate a muted variant of a color', () => {
      const color = 'hsl(180, 100%, 50%)';
      const muted = generateMutedVariant(color);
      expect(muted).toBe('hsl(180, 60%, 40%)');
    });

    it('should handle different saturation and lightness values', () => {
      const color = 'hsl(300, 80%, 60%)';
      const muted = generateMutedVariant(color, 0.5, 0.8);
      expect(muted).toBe('hsl(300, 40%, 48%)');
    });
  });
});
