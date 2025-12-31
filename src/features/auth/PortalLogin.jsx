import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy login for demonstration. Replace with real auth logic.
export default function PortalLogin() {
  const [role, setRole] = useState('champion');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login and role fetch
    setTimeout(() => {
      if (role === 'admin') {
        window.location.href = 'https://unda-youth-network-backend.onrender.com/dashboard';
      } else {
        navigate('/checkin');
      }
    }, 800);
  };

  return (
    <form onSubmit={handleLogin} className="max-w-xs mx-auto mt-24 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Portal Login</h2>
      <select value={role} onChange={e => setRole(e.target.value)} className="input mb-4">
        <option value="champion">Peer Champion</option>
        <option value="admin">Admin/Supervisor</option>
      </select>
      {/* Add username/password fields here for real auth */}
      <button type="submit" className="btn bg-unda-navy text-white w-full" disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
