import React from 'react';

// DashboardCard: pure white background, 4px top border in Brand Teal, dark navy text.
const DashboardCard = ({ children, className = '' }) => {
  return (
    <div className={`${className} bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,194,203,0.08)]`}>
      <div className="border-t-4 border-[#00C2CB] rounded-t-2xl" />
      <div className="p-6 text-[#0B1E3B]">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;
