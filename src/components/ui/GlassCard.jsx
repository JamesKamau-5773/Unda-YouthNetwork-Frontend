import React from 'react';

/**
 * GlassCard
 * A small utility wrapper that provides the dark glassmorphism surface used
 * across the member portal. Accepts `className` for custom sizing/spacing.
 */
const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <div
      className={
        `backdrop-filter backdrop-blur-lg bg-[rgba(11,30,59,0.6)] border border-[#0090C0]/20 rounded-2xl p-4 shadow-sm ${className}`
      }
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
