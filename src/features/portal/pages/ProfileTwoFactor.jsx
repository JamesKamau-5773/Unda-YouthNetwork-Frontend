import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';

const ProfileTwoFactor = () => {
  return (
    <DashboardLayout>
      <div className="rounded-[2rem] bg-white p-8 mb-8 shadow-sm border border-[#E0F7FA]">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#0B1E3B]">Two-Factor Authentication</h2>
        <p className="text-sm text-[#00838F] mt-2">Two-factor auth configuration is not available in this build. Contact support or check back later.</p>
      </div>
    </DashboardLayout>
  );
};

export default ProfileTwoFactor;
