import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

// Zero Grey rules: Navy header, white text inactive, white pill active with dark navy text.
const navItems = [
  { name: 'Dashboard', path: '/member/dashboard' },
  { name: 'Wellness', path: '/member/check-in' },
  { name: 'Events', path: '/member/events' },
  { name: 'Certificate', path: '/member/certificate' },
  { name: 'Profile', path: '/member/profile' },
];

const PortalNavbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-white flex items-center justify-center">
              <img src={undaLogo} alt="Unda" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-white text-lg">Unda</span>
              <span className="text-white/90 text-xs uppercase tracking-widest">Youth Network</span>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-3">
            {navItems.map(i => {
              const active = location.pathname === i.path || location.pathname.startsWith(i.path + '/');
              return (
                <Link
                  key={i.path}
                  to={i.path}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-shadow ${
                    active
                      ? 'bg-white text-[#0B1E3B] shadow-[0_8px_24px_rgba(0,194,203,0.15)]'
                      : 'text-white/90 hover:text-white/100 hover:bg-white/5'
                  }`}
                >
                  {i.name}
                </Link>
              );
            })}
          </nav>

          {/* Right actions (desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/member/dashboard" className="px-4 py-2 rounded-full bg-[#00C2CB] text-white font-semibold shadow-[0_8px_24px_rgba(0,194,203,0.15)]">Get Started</Link>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer - White background with dark navy links per Zero Grey rules */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-full max-w-sm bg-white shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md overflow-hidden bg-white flex items-center justify-center">
                  <img src={undaLogo} alt="Unda" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-bold text-[#0B1E3B]">Unda</div>
                  <div className="text-sm text-[#334155]">Member Portal</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-[#0B1E3B]"><X size={20} /></button>
            </div>

            <nav className="flex flex-col gap-3">
              {navItems.map(i => (
                <Link key={i.path} to={i.path} onClick={() => setOpen(false)} className={`text-lg font-semibold ${location.pathname === i.path ? 'text-[#0B1E3B]' : 'text-[#334155]'}`}>
                  {i.name}
                </Link>
              ))}
            </nav>

            <div className="mt-6">
              <Link to="/member/profile" onClick={() => setOpen(false)} className="block w-full text-center px-4 py-3 rounded-full bg-[#0B1E3B] text-white font-semibold">Profile</Link>
            </div>
          </div>
          <div className="flex-1" onClick={() => setOpen(false)} />
        </div>
      )}
    </header>
  );
};

export default PortalNavbar;
