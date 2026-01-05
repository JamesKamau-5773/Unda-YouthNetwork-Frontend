import React from 'react';
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* 1. Subtle Dot Grid - Suggests 'Digital/Tech' */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#1A2E35 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* 2. Ambient Glows - Using Unda Brand Colors */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-unda-teal/5 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-unda-orange/5 blur-[100px]" />
      <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-unda-yellow/5 blur-[120px]" />

      {/* 3. Creative Logo Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.02] mix-blend-multiply pointer-events-none">
        <img 
          src={undaLogo} 
          alt="" 
          className="w-full h-full object-contain animate-[spin_120s_linear_infinite]" 
        />
      </div>

      {/* 4. Modern Geometric Accents (The Logo Shape) */}
      <div className="absolute top-20 right-[15%] w-64 h-64 border border-unda-navy/[0.03] rounded-full rotate-45" />
      <div className="absolute top-24 right-[16%] w-64 h-64 border border-unda-navy/[0.02] rounded-full" />
    </div>
  );
};

export default BackgroundElements;
