import React from 'react';

// WellnessPatternBackground
// Renders subtle, low-opacity wellness symbols as a soft watermark pattern.
// Intended for portal pages only. Uses Brand Ice / subtle gradient as base and
// Brand Blue / Teal for symbols. Symbols are blurred and use mix-blend-multiply.

const Symbol = ({ children, className = '', color = '#0090C0', style = {} }) => (
  <div
    className={`absolute ${className} mix-blend-multiply blur-2xl`} 
    style={{ color, opacity: 0.04, ...style }}
    aria-hidden="true"
  >
    {children}
  </div>
);

const WellnessPatternBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Gradient base: Brand Ice -> White */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F7FF] to-white" />

      {/* Corner watermark symbols (very subtle) */}
      <svg className="absolute top-6 left-6 w-64 h-64 text-[#00C2CB] opacity-5 blur-xl mix-blend-multiply" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M60 90c12-18 32-30 44-36-8-6-20-14-44-14-24 0-36 8-44 14 12 6 32 18 44 36z" />
          <path d="M60 70c6-10 16-16 24-20-4-4-10-9-24-9-14 0-20 5-24 9 8 4 18 10 24 20z" />
          <path d="M60 50c3-6 8-10 12-12-2-2-6-4-12-4-6 0-10 2-12 4 4 2 9 6 12 12z" />
        </g>
      </svg>

      <svg className="absolute top-8 right-8 w-56 h-56 text-[#0090C0] opacity-5 blur-xl mix-blend-multiply rotate-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g fill="currentColor">
          <path d="M50 48c6-12 18-18 28-18 4 0 6 4 6 8 0 10-16 20-34 26-18-6-34-16-34-26 0-4 2-8 6-8 10 0 22 6 28 18z" />
          <path d="M50 48c-6-12-18-18-28-18-4 0-6 4-6 8 0 10 16 20 34 26 18-6 34-16 34-26 0-4-2-8-6-8-10 0-22 6-28 18z" opacity="0.85" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </g>
      </svg>

      <svg className="absolute bottom-8 left-8 w-72 h-72 text-[#0090C0] opacity-5 blur-xl mix-blend-multiply -rotate-6" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 50c30-40 70-40 90-8s60 40 90 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M20 50c30 40 70 40 90 8s60-40 90-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
      </svg>

      <svg className="absolute bottom-6 right-6 w-48 h-48 text-[#00C2CB] opacity-5 blur-xl mix-blend-multiply rotate-12" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M40 90c-2-12 2-26 12-34 10-8 24-10 36-6 6 2 12 6 14 12" />
          <path d="M64 22c4-6 12-8 18-6 0 6-6 14-12 18" />
        </g>
      </svg>
    </div>
  );
};

export default WellnessPatternBackground;
