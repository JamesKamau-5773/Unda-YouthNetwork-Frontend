import React from 'react';

/**
 * GlassCard
 * A small utility wrapper that provides the dark glassmorphism surface used
 * across the member portal. Accepts `className` for custom sizing/spacing.
 */
const GlassCard = ({ children, className = '', variant = 'light', ...props }) => {
  const base = 'backdrop-filter backdrop-blur-lg rounded-2xl p-4 shadow-sm';
  const light = 'bg-white/90 border border-[#E6EEF2] text-[#0B1E3B]';
  const dark = 'bg-[rgba(11,30,59,0.6)] border border-[#0090C0]/20 text-white';
  const classes = `${base} ${variant === 'dark' ? dark : light} ${className}`;
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
