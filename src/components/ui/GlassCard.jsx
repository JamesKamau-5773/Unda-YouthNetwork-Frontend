import React from 'react';

/**
 * GlassCard
 * A small utility wrapper that provides the dark glassmorphism surface used
 * across the member portal. Accepts `className` for custom sizing/spacing.
 */
const GlassCard = ({ children, className = '', variant = 'light', ...props }) => {
  const base = 'backdrop-filter backdrop-blur-lg rounded-2xl p-4 shadow-sm';
  // light variant: subtle cyan-tinted glass to reduce stark white and match Unda brand
  const light = 'bg-[rgba(0,194,203,0.06)] border border-[#DFF8FB] text-[#0B1E3B] shadow-[0_12px_30px_rgba(0,194,203,0.06)]';
  const dark = 'bg-[rgba(11,30,59,0.6)] border border-[#0090C0]/20 text-white';
  const classes = `${base} ${variant === 'dark' ? dark : light} ${className}`;
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default GlassCard;
