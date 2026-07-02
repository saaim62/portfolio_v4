'use client';

import { motion } from 'framer-motion';
import { ReactNode, ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glassmorphism?: boolean;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', size = 'md', glassmorphism = true, className = '', ...props }, ref) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-500 ease-out focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';

    const variantStyles: Record<string, string> = {
      primary:
        'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40',
      secondary:
        'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40',
      outline:
        'border border-white/10 bg-transparent text-white hover:border-violet-400/30 hover:bg-violet-500/5',
      ghost:
        'bg-transparent text-white/70 hover:text-white hover:bg-white/5',
    };

    const sizeStyles: Record<string, string> = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2.5',
    };

    const glassmorphismStyles = glassmorphism
      ? 'backdrop-blur-xl bg-white/[0.07] border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
      : '';

    const glassmorphismHoverStyles = glassmorphism
      ? 'hover:bg-white/[0.14] hover:border-white/[0.25] hover:shadow-[0_8px_40px_rgba(139,92,246,0.25)] hover:backdrop-blur-2xl'
      : '';

    const shimmerKeyframes = `
      @keyframes shimmer {
        0% { transform: translateX(-100%) rotate(45deg); }
        100% { transform: translateX(200%) rotate(45deg); }
      }
    `;

    return (
      <>
        <style>{shimmerKeyframes}</style>
        <motion.button
          ref={ref}
          className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${glassmorphismStyles} ${glassmorphismHoverStyles} ${className}`}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97, y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          {...props}
        >
          {/* Glassmorphism shimmer overlay on hover */}
          {glassmorphism && (
            <motion.span
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="absolute inset-0 opacity-30"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)',
                  animation: 'shimmer 3s ease-in-out infinite',
                }}
              />
            </motion.span>
          )}

          {/* Inner glow ring on hover */}
          {glassmorphism && (
            <motion.span
              className="absolute inset-0 rounded-xl pointer-events-none"
              initial={{ opacity: 0, scale: 0.95 }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="absolute inset-[-1px] rounded-xl border border-white/[0.2] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />
            </motion.span>
          )}

          {/* Icon support */}
          {props.icon && (
            <span className="flex items-center justify-center">
              {props.icon}
            </span>
          )}

          {/* Children content */}
          <span className="relative z-10 flex items-center gap-2">
            {children}
          </span>
        </motion.button>
      </>
    );
  }
);

Button.displayName = 'Button';

export default Button;
