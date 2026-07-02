'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ============================================================================
// DESIGN TOKENS — Single source of truth for the entire design system
// ============================================================================

/** Color tokens */
export const COLORS = {
  // Primary palette (premium dark mode)
  primary: {
    DEFAULT: '#6366f1',
    light: '#818cf8',
    dark: '#4f46e5',
    muted: 'rgba(99, 102, 241, 0.1)',
    hover: '#4338ca',
  },

  // Neutral palette (slate-based for premium feel)
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  // Semantic colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Surface colors (dark mode optimized)
  surface: {
    primary: '#0f172a',
    secondary: '#1e293b',
    tertiary: '#334155',
    elevated: '#1e293b',
    overlay: 'rgba(15, 23, 42, 0.8)',
  },

  // Text colors
  text: {
    primary: '#f8fafc',
    secondary: '#94a3b8',
    muted: '#64748b',
    inverse: '#0f172a',
  },
} as const;

/** Typography tokens */
export const TYPOGRAPHY = {
  fontFamilies: {
    heading: '"Inter", system-ui, -apple-system, sans-serif',
    body: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },

  fontSizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
    '7xl': '4.5rem',   // 72px
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
  },

  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

/** Spacing tokens (8px base grid) */
export const SPACING = {
  0: '0px',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  56: '14rem',       // 224px
  64: '16rem',       // 256px
} as const;

/** Border radius tokens */
export const BORDER_RADIUS = {
  none: '0px',
  sm: '0.125rem',
  DEFAULT: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

/** Shadow tokens */
export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  glow: '0 0 20px rgba(99, 102, 241, 0.15), 0 0 40px rgba(99, 102, 241, 0.05)',
  glowStrong: '0 0 30px rgba(99, 102, 241, 0.3), 0 0 60px rgba(99, 102, 241, 0.1)',
} as const;

/** Transition tokens */
export const TRANSITIONS = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  DEFAULT: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

/** Z-index tokens */
export const Z_INDICES = {
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
} as const;

/** Breakpoints */
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/** Container max widths */
export const CONTAINER_SIZES = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ============================================================================
// THEME TYPES
// ============================================================================

export type ColorKey = keyof typeof COLORS;
export type TypographyKey = keyof typeof TYPOGRAPHY;
export type SpacingKey = keyof typeof SPACING;
export type BorderRadiusKey = keyof typeof BORDER_RADIUS;
export type ShadowKey = keyof typeof SHADOWS;
export type TransitionKey = keyof typeof TRANSITIONS;

export type ThemeMode = 'dark' | 'light';

export interface DesignTokens {
  colors: typeof COLORS;
  typography: typeof TYPOGRAPHY;
  spacing: typeof SPACING;
  borderRadius: typeof BORDER_RADIUS;
  shadows: typeof SHADOWS;
  transitions: typeof TRANSITIONS;
  zIndices: typeof Z_INDICES;
  breakpoints: typeof BREAKPOINTS;
  containerSizes: typeof CONTAINER_SIZES;
}

export interface DesignSystemContextValue {
  /** Current theme mode */
  themeMode: ThemeMode;
  /** Toggle between dark and light mode */
  toggleTheme: () => void;
  /** Set theme mode explicitly */
  setThemeMode: (mode: ThemeMode) => void;
  /** All design tokens */
  tokens: DesignTokens;
  /** Whether the system is initialized (theme resolved) */
  isInitialized: boolean;
}

// ============================================================================
// CONTEXT
// ============================================================================

const DesignSystemContext = createContext<DesignSystemContextValue | null>(null);

// ============================================================================
// HOOKS
// ============================================================================

/**
 * Access the design system context.
 * Must be used within a DesignSystemProvider.
 */
export function useDesignSystem(): DesignSystemContextValue {
  const context = useContext(DesignSystemContext);

  if (context === null) {
    throw new Error(
      'useDesignSystem must be used within a DesignSystemProvider'
    );
  }

  return context;
}

/**
 * Access only the color tokens.
 */
export function useColors() {
  const { tokens } = useDesignSystem();
  return tokens.colors;
}

/**
 * Access only the typography tokens.
 */
export function useTypography() {
  const { tokens } = useDesignSystem();
  return tokens.typography;
}

/**
 * Access only the spacing tokens.
 */
export function useSpacing() {
  const { tokens } = useDesignSystem();
  return tokens.spacing;
}

/**
 * Access only the shadow tokens.
 */
export function useShadows() {
  const { tokens } = useDesignSystem();
  return tokens.shadows;
}

/**
 * Access only the border radius tokens.
 */
export function useBorderRadius() {
  const { tokens } = useDesignSystem();
  return tokens.borderRadius;
}

/**
 * Access only the transition tokens.
 */
export function useTransitions() {
  const { tokens } = useDesignSystem();
  return tokens.transitions;
}

// ============================================================================
// PROVIDER
// ============================================================================

interface DesignSystemProviderProps {
  children: React.ReactNode;
  /** Initial theme mode. Defaults to 'dark'. */
  initialTheme?: ThemeMode;
  /** Whether to respect the system preference on first load. Defaults to true. */
  respectSystemPreference?: boolean;
}

export function DesignSystemProvider({
  children,
  initialTheme = 'dark',
  respectSystemPreference = true,
}: DesignSystemProviderProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    // On the server, default to the provided initialTheme
    if (typeof window === 'undefined') {
      return initialTheme;
    }

    // Respect system preference on first load
    if (respectSystemPreference) {
      const stored = localStorage.getItem('design-system-theme');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }

      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }

    return initialTheme;
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Apply theme to document and localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(themeMode);
    root.setAttribute('data-theme', themeMode);
    localStorage.setItem('design-system-theme', themeMode);

    setIsInitialized(true);
  }, [themeMode]);

  // Listen for system preference changes when in auto mode
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem('design-system-theme');
      // Only auto-switch if user hasn't explicitly set a preference
      if (!stored || stored === 'auto') {
        setThemeModeState(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  // Memoize tokens to prevent unnecessary re-renders
  const tokens: DesignTokens = React.useMemo(
    () => ({
      colors: COLORS,
      typography: TYPOGRAPHY,
      spacing: SPACING,
      borderRadius: BORDER_RADIUS,
      shadows: SHADOWS,
      transitions: TRANSITIONS,
      zIndices: Z_INDICES,
      breakpoints: BREAKPOINTS,
      containerSizes: CONTAINER_SIZES,
    }),
    []
  );

  const value: DesignSystemContextValue = React.useMemo(
    () => ({
      themeMode,
      toggleTheme,
      setThemeMode,
      tokens,
      isInitialized,
    }),
    [themeMode, toggleTheme, setThemeMode, tokens, isInitialized]
  );

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
}

// ============================================================================
// CSS VARIABLES — Injected into :root for runtime token consumption
// ============================================================================

/**
 * Generates CSS custom properties from design tokens.
 * Call this once in your global CSS or layout file.
 */
export function generateDesignSystemCSS(): string {
  const colorEntries = Object.entries(COLORS)
    .map(([section, values]) => {
      if (typeof values === 'object' && !Array.isArray(values)) {
        return Object.entries(values as Record<string, string>)
          .map(
            ([key, value]) =>
              `  --ds-color-${section}-${key}: ${value};\n`
          )
          .join('');
      }
      return '';
    })
    .join('\n');

  const spacingEntries = Object.entries(SPACING)
    .map(([key, value]) => `  --ds-spacing-${key}: ${value};\n`)
    .join('');

  const radiusEntries = Object.entries(BORDER_RADIUS)
    .map(([key, value]) => `  --ds-radius-${key}: ${value};\n`)
    .join('');

  const shadowEntries = Object.entries(SHADOWS)
    .map(([key, value]) => `  --ds-shadow-${key}: ${value};\n`)
    .join('');

  const transitionEntries = Object.entries(TRANSITIONS)
    .map(([key, value]) => `  --ds-transition-${key}: ${value};\n`)
    .join('');

  return `/* ========================================
   Design System CSS Variables
   Auto-generated — do not edit manually
   ======================================== */

:root {
  /* Colors */
${colorEntries}
  /* Spacing */
${spacingEntries}
  /* Border Radius */
${radiusEntries}
  /* Shadows */
${shadowEntries}
  /* Transitions */
${transitionEntries}

  /* Typography */
  --ds-font-heading: ${TYPOGRAPHY.fontFamilies.heading};
  --ds-font-body: ${TYPOGRAPHY.fontFamilies.body};
  --ds-font-mono: ${TYPOGRAPHY.fontFamilies.mono};

  /* Z-Indices */
  --ds-z-dropdown: ${Z_INDICES.dropdown};
  --ds-z-sticky: ${Z_INDICES.sticky};
  --ds-z-fixed: ${Z_INDICES.fixed};
  --ds-z-modal-backdrop: ${Z_INDICES.modalBackdrop};
  --ds-z-modal: ${Z_INDICES.modal};
  --ds-z-popover: ${Z_INDICES.popover};
  --ds-z-tooltip: ${Z_INDICES.tooltip};

  /* Breakpoints */
  --ds-breakpoint-sm: ${BREAKPOINTS.sm};
  --ds-breakpoint-md: ${BREAKPOINTS.md};
  --ds-breakpoint-lg: ${BREAKPOINTS.lg};
  --ds-breakpoint-xl: ${BREAKPOINTS.xl};
  --ds-breakpoint-2xl: ${BREAKPOINTS['2xl']};

  /* Container Sizes */
  --ds-container-sm: ${CONTAINER_SIZES.sm};
  --ds-container-md: ${CONTAINER_SIZES.md};
  --ds-container-lg: ${CONTAINER_SIZES.lg};
  --ds-container-xl: ${CONTAINER_SIZES.xl};
  --ds-container-2xl: ${CONTAINER_SIZES['2xl']};

  /* Theme-aware defaults */
  --ds-bg-primary: ${COLORS.surface.primary};
  --ds-bg-secondary: ${COLORS.surface.secondary};
  --ds-bg-tertiary: ${COLORS.surface.tertiary};
  --ds-text-primary: ${COLORS.text.primary};
  --ds-text-secondary: ${COLORS.text.secondary};
  --ds-text-muted: ${COLORS.text.muted};
  --ds-border-color: ${COLORS.neutral[800]};
  --ds-accent: ${COLORS.primary.DEFAULT};
}

[data-theme="light"] {
  --ds-bg-primary: ${COLORS.neutral[50]};
  --ds-bg-secondary: #ffffff;
  --ds-bg-tertiary: ${COLORS.neutral[100]};
  --ds-text-primary: ${COLORS.neutral[900]};
  --ds-text-secondary: ${COLORS.neutral[600]};
  --ds-text-muted: ${COLORS.neutral[500]};
  --ds-border-color: ${COLORS.neutral[200]};
}

[data-theme="dark"] {
  --ds-bg-primary: ${COLORS.surface.primary};
  --ds-bg-secondary: ${COLORS.surface.secondary};
  --ds-bg-tertiary: ${COLORS.surface.tertiary};
  --ds-text-primary: ${COLORS.text.primary};
  --ds-text-secondary: ${COLORS.text.secondary};
  --ds-text-muted: ${COLORS.text.muted};
  --ds-border-color: ${COLORS.neutral[800]};
}

/* Base reset using design tokens */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: var(--ds-font-body);
  line-height: var(--ds-line-height-normal, 1.5);
  color: var(--ds-text-primary);
  background-color: var(--ds-bg-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-height: 100vh;
}`;
}

// ============================================================================
// HELPER — Apply tokens as inline styles (for dynamic token consumption)
// ============================================================================

/**
 * Helper to resolve a design token by path.
 * Example: resolveToken('colors', 'primary', 'DEFAULT') => '#6366f1'
 */
export function resolveToken<T extends string>(
  category: 'colors' | 'typography' | 'spacing' | 'borderRadius' | 'shadows' | 'transitions' | 'zIndices' | 'breakpoints' | 'containerSizes',
  ...keys: (string | number)[]
): T {
  const map: Record<string, Record<string, unknown>> = {
    colors: COLORS,
    typography: TYPOGRAPHY,
    spacing: SPACING,
    borderRadius: BORDER_RADIUS,
    shadows: SHADOWS,
    transitions: TRANSITIONS,
    zIndices: Z_INDICES,
    breakpoints: BREAKPOINTS,
    containerSizes: CONTAINER_SIZES,
  };

  const obj = map[category];
  if (!obj) {
    throw new Error(`Unknown token category: ${category}`);
  }

  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      throw new Error(
        `Cannot resolve token path [${category}] -> [${keys.join('.')}]`
      );
    }
    current = (current as Record<string, unknown>)[key];
  }

  if (typeof current === 'string' || typeof current === 'number') {
    return current as T;
  }

  throw new Error(
    `Token value at [${category}] -> [${keys.join('.')}] is not a primitive. Got: ${typeof current}`
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export default DesignSystemProvider;
