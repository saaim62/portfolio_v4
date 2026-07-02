import React from 'react';

// ─── Glassmorphism Utility Classes ───────────────────────────────────────────
// All glassmorphism elements use:
//   backdrop-blur-xl bg-white/[0.04] border border-white/[0.08]
//   shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-2xl
// ──────────────────────────────────────────────────────────────────────────────

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true }) => (
  <div
    className={`
      backdrop-blur-xl bg-white/[0.04] border border-white/[0.08]
      shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-2xl p-6 md:p-8
      transition-all duration-500 ease-out
      ${hoverEffect ? 'hover:bg-white/[0.07] hover:border-white/[0.14] hover:shadow-[0_12px_48px_rgba(0,0,0,0.45)] hover:-translate-y-1' : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

interface GlassSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const GlassSection: React.FC<GlassSectionProps> = ({ children, className = '', id }) => (
  <section
    id={id}
    className={`
      relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.06]
      shadow-[0_4px_24px_rgba(0,0,0,0.25)] rounded-3xl p-8 md:p-12 lg:p-16
      transition-all duration-500
      ${className}
    `}
  >
    {children}
  </section>
);

interface GlassBadgeProps {
  children: React.ReactNode;
  className?: string;
}

const GlassBadge: React.FC<GlassBadgeProps> = ({ children, className = '' }) => (
  <span
    className={`
      inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
      backdrop-blur-md bg-white/[0.06] border border-white/[0.1]
      text-gray-300 tracking-wide uppercase
      ${className}
    `}
  >
    {children}
  </span>
);

interface GlassInputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name?: string;
  as?: 'input' | 'textarea';
  rows?: number;
}

const GlassInput: React.FC<GlassInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  as = 'input',
  rows = 4,
}) => {
  const baseClasses = `
    w-full px-5 py-4 rounded-xl text-sm
    backdrop-blur-md bg-white/[0.04] border border-white/[0.08]
    text-gray-100 placeholder-gray-500
    focus:outline-none focus:border-white/[0.2] focus:bg-white/[0.07]
    focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]
    transition-all duration-300 resize-none
  `;

  if (as === 'textarea') {
    return (
      <textarea
        className={baseClasses}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        rows={rows}
      />
    );
  }

  return (
    <input
      type={type}
      className={baseClasses}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  );
};

interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'primary',
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl
    text-sm font-semibold tracking-wide uppercase
    transition-all duration-400 ease-out
    focus:outline-none focus:shadow-[0_0_0_3px_rgba(99,102,241,0.3)]
  `;

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-indigo-500/80 to-purple-500/80 backdrop-blur-md border border-white/[0.12] text-white shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_28px_rgba(99,102,241,0.5)] hover:-translate-y-0.5',
    secondary:
      'backdrop-blur-md bg-white/[0.06] border border-white/[0.1] text-gray-300 hover:bg-white/[0.1] hover:text-white hover:border-white/[0.18]',
    ghost:
      'backdrop-blur-md bg-transparent border border-transparent text-indigo-400 hover:text-indigo-300 hover:bg-white/[0.04]',
  };

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </button>
  );
};

// ─── Skill Pill Component ────────────────────────────────────────────────────

interface SkillPillProps {
  label: string;
}

const SkillPill: React.FC<SkillPillProps> = ({ label }) => (
  <span
    className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-medium tracking-wide
      backdrop-blur-md bg-white/[0.05] border border-white/[0.08]
      text-gray-300 hover:bg-white/[0.1] hover:border-white/[0.16] hover:text-white
      transition-all duration-300 cursor-default"
  >
    {label}
  </span>
);

// ─── Timeline Dot Component ──────────────────────────────────────────────────

interface TimelineDotProps {
  active?: boolean;
}

const TimelineDot: React.FC<TimelineDotProps> = ({ active = false }) => (
  <div
    className={`
      w-3 h-3 rounded-full border-2 transition-all duration-300
      ${active ? 'bg-indigo-400 border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.6)]' : 'bg-transparent border-white/[0.2]'}
    `}
  />
);

// ─── Section Header Component ────────────────────────────────────────────────

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, accent = true }) => (
  <div className="mb-10 md:mb-14">
    {accent && (
      <div className="flex items-center gap-3 mb-4">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-indigo-500/60 to-transparent" />
        <GlassBadge>
          <span className="text-indigo-400">◆</span> Section
        </GlassBadge>
      </div>
    )}
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
      {title.split(' ').map((word, i) => (
        <span key={i}>
          {i === title.split(' ').length - 1 ? (
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {word}
            </span>
          ) : (
            word
          )}
        </span>
      ))}
    </h2>
    {subtitle && <p className="mt-3 text-gray-400 text-lg max-w-2xl">{subtitle}</p>}
  </div>
);

// ─── Main Card Component (Composite) ─────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glassmorphism?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', glassmorphism = true }) => (
  <div
    className={`
      ${glassmorphism
        ? 'backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.35)] rounded-2xl'
        : ''}
      ${className}
    `}
  >
    {children}
  </div>
);

// ─── Export All Components ───────────────────────────────────────────────────

export {
  GlassCard,
  GlassSection,
  GlassBadge,
  GlassInput,
  GlassButton,
  SkillPill,
  TimelineDot,
  SectionHeader,
  Card,
};

export type { GlassCardProps, GlassSectionProps, GlassBadgeProps, GlassInputProps, GlassButtonProps, SkillPillProps, TimelineDotProps, SectionHeaderProps, CardProps };
