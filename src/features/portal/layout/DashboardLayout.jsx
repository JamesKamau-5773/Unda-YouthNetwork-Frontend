import React from 'react';
import PortalNavbar from './PortalNavbar';
import WellnessPatternBackground from './WellnessPatternBackground';

// DashboardLayout implements the "Crisp Horizon" split background:
// Top 320px: Brand Navy (#0B1E3B). Bottom: Pure White / Brand Ice for body.
// Children content is placed in a centered container and card surfaces overlap the navy boundary.

const DashboardLayout = ({ children, headerContent }) => {
  return (
    <div className="min-h-screen bg-[#F0F7FF] text-[#1e293b]">
      {/* Split background: top navy, remainder white (320px top) */}
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[320px] bg-[#0B1E3B] z-10" />

        {/* Navbar sits inside navy area (above pattern) */}
        <div className="relative z-20">
          <PortalNavbar />
        </div>

        {/* Main container: content will overlap the navy with negative margin */}
        <main className="relative z-20 max-w-7xl mx-auto px-6 -mt-32">
          {/* Subtle wellness watermark pattern behind the page body (below the navy header) */}
          <WellnessPatternBackground />
          {/* Header content can be passed in, and sits atop the white cards */}
          {headerContent && (
            <div className="mb-6">
              {headerContent}
            </div>
          )}

          <div className="space-y-6">
            {children}
          </div>
        </main>

        {/* Bottom filler to ensure navy behind header extends visually */}
        <div className="h-40 bg-white" />
      </div>
    </div>
  );
};

export default DashboardLayout;
