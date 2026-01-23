import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, ChevronDown } from 'lucide-react'; // Added Bell/Chevron for the profile section
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

// Zero Grey Rules:
// 1. Background: Solid White
// 2. Text: Brand Navy (#0B1E3B)
// 3. Active State: Mint Background (#E0F7FA) + Teal Text (#00ACC1)

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
    // CHANGE 1: Solid White Background + Mint Border (Clearly Visible)
    <nav className="w-full bg-white border-b border-[#E0F7FA] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* --- LEFT: Logo + Nav --- */}
          <div className="flex items-center gap-8 lg:gap-12">
            
            {/* Logo Section */}
            <Link to="/member/dashboard" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden bg-white border border-gray-100 flex items-center justify-center">
                <img src={undaLogo} alt="Unda" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                {/* CHANGE 2: Text is Navy, not White */}
                <span className="font-extrabold text-[#0B1E3B] text-lg tracking-tight">
                  Unda<span className="text-[#00ACC1]">Youth</span>
                </span>
                <span className="text-[#00838F] text-[10px] uppercase tracking-widest font-bold mt-0.5">
                  Member Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-2">
                {navItems.map((item) => {
                  const active = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                        active
                          ? 'bg-[#E0F7FA] text-[#00ACC1]' // Active: Mint Pill
                          : 'text-[#0B1E3B] hover:bg-[#F0FDFF] opacity-80 hover:opacity-100' // Inactive: Navy Ink
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* --- RIGHT: Actions (Profile & Bell) --- */}
          <div className="hidden md:flex items-center gap-6">
            <button className="text-[#00ACC1] hover:bg-[#E0F7FA] p-2 rounded-full transition-colors relative">
               <Bell size={22} />
               {/* Optional Notification Dot */}
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Mint Divider */}
            <div className="h-8 w-px bg-[#E0F7FA]"></div>

            <Link to="/member/profile" className="flex items-center gap-3 group">
               <div className="text-right hidden lg:block">
                  <span className="block text-sm font-bold text-[#0B1E3B] leading-none">Champion</span>
                  <span className="block text-[10px] text-[#00838F] font-bold uppercase mt-1">Member</span>
               </div>
               <div className="h-10 w-10 rounded-full bg-[#E0F7FA] border-2 border-transparent group-hover:border-[#B2EBF2] flex items-center justify-center text-[#00ACC1] font-bold shadow-sm transition-all">
                  JD
               </div>
               <ChevronDown size={16} className="text-[#00ACC1]" />
            </Link>
          </div>

          {/* Mobile toggle (Dark Navy) */}
          <button className="md:hidden text-[#0B1E3B] p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE DRAWER --- */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-full max-w-sm bg-white shadow-2xl p-6 border-r border-[#E0F7FA]">
            
            {/* Mobile Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md overflow-hidden bg-white">
                  <img src={undaLogo} alt="Unda" className="w-full h-full object-contain" />
                </div>
                <span className="font-extrabold text-[#0B1E3B] text-lg">Unda</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#0B1E3B] hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            {/* Mobile Links */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                 const active = location.pathname === item.path;
                 return (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    onClick={() => setOpen(false)} 
                    className={`block px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                      active 
                        ? 'bg-[#E0F7FA] text-[#00ACC1]' 
                        : 'text-[#0B1E3B] hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                 );
              })}
            </nav>

            {/* Mobile Footer Action */}
            <div className="mt-8 pt-6 border-t border-[#E0F7FA]">
              <Link to="/member/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                 <div className="h-10 w-10 rounded-full bg-[#00ACC1] text-white flex items-center justify-center font-bold">JD</div>
                 <div>
                    <span className="block font-bold text-[#0B1E3B]">Champion User</span>
                    <span className="text-xs text-[#00838F]">View Profile</span>
                 </div>
              </Link>
            </div>
          </div>
          
          {/* Backdrop */}
          <div className="flex-1 bg-[#0B1E3B]/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
        </div>
      )}
    </nav>
  );
};

export default PortalNavbar;