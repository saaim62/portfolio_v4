'use client';

import { motion, useInView, Variants, TargetAndTransition } from 'framer-motion';
import { useRef, ReactNode, CSSProperties } from 'react';

// ──────────────────────────────────────────────
//  GLOBAL ANIMATION VARIANTS
// ──────────────────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const heroTextReveal: Variants = {
  hidden: { opacity: 0, y: 80, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
};

export const parallaxY: Variants = {
  hidden: { y: 0 },
  visible: {
    y: [0, -30, 0],
    transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
  },
};

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const morphIn: Variants = {
  hidden: { opacity: 0, borderRadius: '50%' },
  visible: {
    opacity: 1,
    borderRadius: '12px',
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ──────────────────────────────────────────────
//  HOVER VARIANTS
// ──────────────────────────────────────────────

export const hoverScale: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

export const hoverLift: Variants = {
  rest: { y: 0, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
  hover: {
    y: -8,
    boxShadow: '0px 20px 40px rgba(0,0,0,0.3)',
    transition: { duration: 0.3 },
  },
};

export const hoverGlow: Variants = {
  rest: { filter: 'brightness(1)' },
  hover: {
    filter: 'brightness(1.2)',
    transition: { duration: 0.3 },
  },
};

export const hoverSkew: Variants = {
  rest: { skewX: '0deg' },
  hover: { skewX: '-2deg', transition: { duration: 0.3 } },
};

// ──────────────────────────────────────────────
//  STAGGERED LIST VARIANTS
// ──────────────────────────────────────────────

export const staggeredList: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

export const staggeredListItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

// ──────────────────────────────────────────────
//  CARD VARIANTS (PROJECTS / SKILLS)
// ──────────────────────────────────────────────

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const cardHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.3 },
  },
};

// ──────────────────────────────────────────────
//  TEXT SPLIT ANIMATION VARIANTS
// ──────────────────────────────────────────────

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export const charReveal: Variants = {
  hidden: { opacity: 0, y: 30, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { delay: i * 0.025, duration: 0.4, ease: 'easeOut' },
  }),
};

// ──────────────────────────────────────────────
//  CURSOR FOLLOW VARIANTS
// ──────────────────────────────────────────────

export const cursorFollow: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 0.6 },
  exit: { scale: 0, opacity: 0 },
};

// ──────────────────────────────────────────────
//  SCROLL PROGRESS VARIANTS
// ──────────────────────────────────────────────

export const scrollProgressX: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

// ──────────────────────────────────────────────
//  REUSABLE MOTION COMPONENTS
// ──────────────────────────────────────────────

interface MotionSectionProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export const MotionSection = ({
  children,
  variants = fadeInUp,
  className = '',
  id,
  style,
}: MotionSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      id={id}
      style={style}
    >
      {children}
    </motion.section>
  );
};

interface MotionContainerProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
}

export const MotionContainer = ({
  children,
  variants = staggerContainer,
  className = '',
  staggerChildren,
  delayChildren,
}: MotionContainerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        ...variants,
        visible: {
          ...(variants.visible as any),
          transition: {
            ...(variants.visible as any).transition,
            staggerChildren: staggerChildren ?? 0.12,
            delayChildren: delayChildren ?? 0.3,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MotionCardProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
}

export const MotionCard = ({
  children,
  variants = cardVariants,
  className = '',
  whileHover,
  whileTap,
}: MotionCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      whileHover={whileHover || hoverLift}
      whileTap={whileTap || { scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface MotionTextProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const MotionText = ({
  children,
  variants = fadeInUp,
  className = '',
  as: Tag = 'span',
}: MotionTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      <Tag>{children}</Tag>
    </motion.div>
  );
};

interface MotionImageProps {
  src: string;
  alt: string;
  className?: string;
  variants?: Variants;
  objectFit?: CSSProperties['objectFit'];
}

export const MotionImage = ({
  src,
  alt,
  className = '',
  variants = scaleIn,
  objectFit = 'cover',
}: MotionImageProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
      style={{ overflow: 'hidden', position: 'relative' }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit, display: 'block' }}
        loading="lazy"
      />
    </motion.div>
  );
};

interface MotionButtonProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  onClick?: () => void;
}

export const MotionButton = ({
  children,
  className = '',
  variants = hoverScale,
  onClick,
}: MotionButtonProps) => {
  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileTap="rest"
      variants={variants}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// ──────────────────────────────────────────────
//  PARALLAX WRAPPER
// ──────────────────────────────────────────────

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export const ParallaxWrapper = ({
  children,
  className = '',
  speed = 0.5,
}: ParallaxWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 0 }}
      animate={isInView ? { y: [-20 * speed, -40 * speed] } : { y: 0 }}
      transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ──────────────────────────────────────────────
//  MARQUEE / INFINITE SCROLL VARIANTS
// ──────────────────────────────────────────────

export const marqueeX: Variants = {
  initial: { x: '0%' },
  animate: {
    x: ['-100%', '0%'],
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

export const marqueeY: Variants = {
  initial: { y: '0%' },
  animate: {
    y: ['-100%', '0%'],
    transition: { duration: 25, repeat: Infinity, ease: 'linear' },
  },
};

// ──────────────────────────────────────────────
//  GRADIENT SHIFT ANIMATION
// ──────────────────────────────────────────────

export const gradientShift = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: { duration: 8, repeat: Infinity, ease: 'linear' },
  },
};

// ──────────────────────────────────────────────
//  FLOATING PARTICLE VARIANTS
// ──────────────────────────────────────────────

export const floatParticle = (seed: number): Variants => {
  const xDrift = Math.sin(seed) * 40;
  const yDrift = Math.cos(seed) * 60;
  return {
    animate: {
      x: [0, xDrift, -xDrift, 0],
      y: [0, yDrift, -yDrift, 0],
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.2, 1],
      transition: {
        duration: 6 + seed,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };
};

// ──────────────────────────────────────────────
//  GLITCH TEXT VARIANTS
// ──────────────────────────────────────────────

export const glitchText = {
  animate: {
    x: [0, -2, 3, -1, 0],
    opacity: [1, 0.8, 1, 0.6, 1],
    filter: ['blur(0px)', 'blur(0.5px)', 'blur(0px)'],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear',
    },
  },
};

// ──────────────────────────────────────────────
//  MAGNETIC BUTTON VARIANTS
// ──────────────────────────────────────────────

export const magneticButton = {
  rest: { x: 0, y: 0 },
  hover: (offsetX: number, offsetY: number) => ({
    x: offsetX * 0.3,
    y: offsetY * 0.3,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ──────────────────────────────────────────────
//  PAGE TRANSITION VARIANTS
// ──────────────────────────────────────────────

export const pageTransition: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

export const pageTransitionSlide: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
};

export const pageTransitionFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// ──────────────────────────────────────────────
//  NUMBER COUNTER VARIANTS
// ──────────────────────────────────────────────

export const countUp = {
  hidden: {},
  visible: (i: number) => ({
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// ──────────────────────────────────────────────
//  SKILL BAR ANIMATION VARIANTS
// ──────────────────────────────────────────────

export const skillBar: Variants = {
  hidden: { width: '0%' },
  visible: (custom: number) => ({
    width: `${custom}%`,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 },
  }),
};

// ──────────────────────────────────────────────
//  TIMELINE / EXPERIENCE VARIANTS
// ──────────────────────────────────────────────

export const timelineDot: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: 'backOut' },
  },
};

export const timelineLine: Variants = {
  hidden: { height: '0%' },
  visible: {
    height: '100%',
    transition: { duration: 1.2, ease: 'easeInOut' },
  },
};

export const timelineContent: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ──────────────────────────────────────────────
//  EXPORT ALL VARIANTS AS A MAP
// ──────────────────────────────────────────────

export const motionVariants = {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  blurIn,
  staggerContainer,
  staggerChild,
  heroTextReveal,
  parallaxY,
  rotateIn,
  slideInFromBottom,
  morphIn,
  hoverScale,
  hoverLift,
  hoverGlow,
  hoverSkew,
  staggeredList,
  staggeredListItem,
  cardVariants,
  cardHoverVariants,
  wordReveal,
  charReveal,
  cursorFollow,
  scrollProgressX,
  marqueeX,
  marqueeY,
  gradientShift,
  floatParticle,
  glitchText,
  magneticButton,
  pageTransition,
  pageTransitionSlide,
  pageTransitionFade,
  countUp,
  skillBar,
  timelineDot,
  timelineLine,
  timelineContent,
} as const;

export type MotionVariantKey = keyof typeof motionVariants;
