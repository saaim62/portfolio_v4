/**
 * Design System Configuration
 * Consolidated styling layer for the Saim Asif Portfolio.
 * Defines premium, minimalist dark mode tokens, typography, and layout scales.
 */

export interface ColorPalette {
  background: string;
  surface: string;
  primary: string;
  accent: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  gradient: {
    primary: string;
    hover: string;
  };
}

export interface TypographyConfig {
  fontSans: string;
  fontMono: string;
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    hero: string;
  };
  weights: {
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface SpacingConfig {
  unit: string;
  scale: Record<string, string>;
}

export interface Breakpoints {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export const DESIGN_SYSTEM = {
  colors: {
    background: '#050507',
    surface: '#0B0C10',
    primary: '#6366F1',
    accent: '#00E5FF',
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
      muted: '#71717A',
    },
    border: '#27272A',
    gradient: {
      primary: 'linear-gradient(135deg, #6366F1 0%, #00E5FF 100%)',
      hover: 'linear-gradient(135deg, #818CF8 0%, #22D3EE 100%)',
    },
  } as ColorPalette,

  typography: {
    fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontMono: "'JetBrains Mono', 'Fira Code', monospace",
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      hero: 'clamp(2.5rem, 6vw, 4.5rem)',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  } as TypographyConfig,

  spacing: {
    unit: '0.25rem',
    scale: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem',
    },
  } as SpacingConfig,

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  } as Breakpoints,

  effects: {
    blur: {
      sm: 'blur-sm',
      md: 'blur-md',
      lg: 'blur-lg',
    },
    shadow: {
      card: '0 4px 20px rgba(0, 0, 0, 0.5)',
      glow: '0 0 15px rgba(99, 102, 241, 0.3)',
    },
  },

  animations: {
    duration: {
      fast: '150ms',
      base: '300ms',
      slow: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },
} as const;

export default DESIGN_SYSTEM;