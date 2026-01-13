import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { Button } from '@/components/ui/button';

const DevPortal = () => {
  const navigate = useNavigate();

  const enableDevAccess = () => {
    // Lightweight dev-only convenience: set a fake token and user then navigate
    localStorage.setItem('unda_token', 'dev-access-token');
    localStorage.setItem('unda_user', JSON.stringify({ id: 'dev', email: 'dev@local', full_name: 'Developer (dev)' }));
    navigate('/member/dashboard');
  };

  const clearDevAccess = () => {
    localStorage.removeItem('unda_token');
    localStorage.removeItem('unda_user');
    window.location.href = '/portal';
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-24 px-6">
        <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-extrabold text-unda-navy mb-2">Dev Portal Access</h2>
          <p className="text-sm text-slate-500 mb-4">This route is available only in development. Use it to quickly open the member dashboard without a backend.</p>

          <div className="flex gap-3">
            <Button onClick={enableDevAccess} className="h-12">Open Member Dashboard (dev)</Button>
            <Button onClick={clearDevAccess} variant="ghost" className="h-12">Clear Dev Access</Button>
          </div>

          <div className="mt-6 text-xs text-slate-500">
            <strong>Note:</strong> This sets a UI-only token in localStorage and should not be shipped to production.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DevPortal;
