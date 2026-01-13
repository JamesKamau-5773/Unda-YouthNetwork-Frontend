import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy login for demonstration. Replace with real auth logic.
export default function PortalLogin() {
  // This component no longer contains demo login logic.
  // Redirect users to the official portal login page.
  return (
    <div className="max-w-xs mx-auto mt-24 p-6 bg-white rounded-xl shadow text-center">
      <h2 className="text-xl font-bold mb-4">Portal Access</h2>
      <p className="text-sm text-slate-600 mb-6">Please sign in using the secure portal login.</p>
      <a href="/portal" className="inline-block w-full bg-[#0B1E3B] text-white py-2 rounded-lg font-bold">Go to Portal Login</a>
    </div>
  );
}
