import React from 'react';

// WellnessPatternBackground
// Renders subtle, low-opacity wellness symbols as a soft watermark pattern.
// Intended for portal pages only. Uses Brand Ice / subtle gradient as base and
// Brand Blue / Teal for symbols. Symbols are blurred and use mix-blend-multiply.

const Symbol = ({ children, className = '', color = '#0090C0', style = {} }) => (
  <div
    className={`absolute ${className} opacity-5 mix-blend-multiply blur-xl`} 
    style={{ color, ...style }}
    aria-hidden="true"
  >
    {children}
  </div>
);

const WellnessPatternBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[320px] bottom-0 -z-10 overflow-hidden">
      {/* Base subtle gradient for the portal body */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E0F2FE] to-[#F0F7FF]" />

      {/* Lotus (outline) - Brand Teal */}
      <Symbol className="-left-24 -top-12 w-80 h-80" color="#00C2CB">
        <svg viewBox="0 0 120 120" width="320" height="320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#00C2CB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M60 90c12-18 32-30 44-36-8-6-20-14-44-14-24 0-36 8-44 14 12 6 32 18 44 36z" />
            <path d="M60 70c6-10 16-16 24-20-4-4-10-9-24-9-14 0-20 5-24 9 8 4 18 10 24 20z" />
            <path d="M60 50c3-6 8-10 12-12-2-2-6-4-12-4-6 0-10 2-12 4 4 2 9 6 12 12z" />
          </g>
        </svg>
      </Symbol>

      {/* Butterfly silhouette - Brand Blue */}
      <Symbol className="right-8 top-6 w-64 h-64 rotate-6" color="#0090C0">
        <svg viewBox="0 0 100 100" width="260" height="260" xmlns="http://www.w3.org/2000/svg">
          <g fill="#0090C0">
            <path d="M50 48c6-12 18-18 28-18 4 0 6 4 6 8 0 10-16 20-34 26-18-6-34-16-34-26 0-4 2-8 6-8 10 0 22 6 28 18z" />
            <path d="M50 48c-6-12-18-18-28-18-4 0-6 4-6 8 0 10 16 20 34 26 18-6 34-16 34-26 0-4-2-8-6-8-10 0-22 6-28 18z" opacity="0.85" />
            <circle cx="50" cy="50" r="3" fill="#0090C0" />
          </g>
        </svg>
      </Symbol>

      {/* Semicolon - Brand Teal */}
      <Symbol className="left-12 bottom-16 w-48 h-48 -rotate-12" color="#00C2CB">
        <svg viewBox="0 0 64 64" width="160" height="160" xmlns="http://www.w3.org/2000/svg" fill="none">
          <g stroke="#00C2CB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M30 18c6 4 10 10 10 16" />
            <circle cx="26" cy="46" r="4" fill="#00C2CB" stroke="none" />
          </g>
        </svg>
      </Symbol>

      {/* Infinity - Brand Blue */}
      <Symbol className="-right-28 -bottom-10 w-96 h-96 rotate-12" color="#0090C0">
        <svg viewBox="0 0 200 100" width="420" height="220" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path d="M20 50c30-40 70-40 90-8s60 40 90 8" stroke="#0090C0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M20 50c30 40 70 40 90 8s60-40 90-8" stroke="#0090C0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.9" />
        </svg>
      </Symbol>

      {/* Growth Mind: profile with sprout - Brand Teal */}
      <Symbol className="left-1/2 -translate-x-1/2 top-24 w-80 h-80 -rotate-6" color="#00C2CB">
        <svg viewBox="0 0 120 120" width="320" height="320" xmlns="http://www.w3.org/2000/svg" fill="none">
          <g stroke="#00C2CB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M40 90c-2-12 2-26 12-34 10-8 24-10 36-6 6 2 12 6 14 12" />
            <path d="M64 22c4-6 12-8 18-6 0 6-6 14-12 18" />
            <path d="M72 18c4 4 6 10 4 16" />
            <path d="M68 14c6-4 14-4 20 0" />
            <path d="M72 14c-2 6 0 12 4 16" opacity="0.9"/>
            <path d="M72 18c-4 6-10 10-16 12" opacity="0.8"/>
            {/* small leaf */}
            <path d="M78 6c6 4 8 10 6 16" stroke="#00C2CB" />
          </g>
        </svg>
      </Symbol>
    </div>
  );
};

export default WellnessPatternBackground;
