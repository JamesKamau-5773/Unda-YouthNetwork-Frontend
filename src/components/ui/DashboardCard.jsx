import React from 'react';

// DashboardCard: standardized card used across the portal.
// - Pure white surface
// - 4px top accent border in Brand Teal
// - Consistent padding and vertical layout so cards align in grids
const DashboardCard = ({ children, className = '' }) => {
  return (
    <div className={`${className} bg-white rounded-2xl border-t-4 border-[#00C2CB] shadow-[0_18px_40px_rgba(0,194,203,0.06)]`}>
      <div className="p-6 text-[#0B1E3B] flex flex-col h-full">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
