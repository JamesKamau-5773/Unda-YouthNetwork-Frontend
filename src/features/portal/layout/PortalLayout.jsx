import React, { useState } from 'react';
import { Bell, Search, ArrowLeft, LogOut, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from 'react-router-dom';

// Compact member navigation shown in portal header
const MemberNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { name: 'Dashboard', path: '/member/dashboard' },
    { name: 'Wellness', path: '/member/check-in' },
    { name: 'Events', path: '/member/events' },
    { name: 'Certificate', path: '/member/certificate' },
    { name: 'Profile', path: '/member/profile' },
  ];

  const handleSignOut = () => {
    localStorage.removeItem('unda_token');
    localStorage.removeItem('unda_user');
    navigate('/portal');
  };

  return (
    <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <div className="hidden md:flex items-center gap-3">
        {items.map(i => {
          const active = location.pathname === i.path || location.pathname.startsWith(i.path + '/');
          return (
            <Link
              key={i.path}
              to={i.path}
              className={`px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-border border ${active ? 'bg-white text-[#0B1E3B] border-transparent shadow' : 'bg-white/0 text-[#0B1E3B] border-[#E6EEF2] hover:border-[#00C2CB]'}`}
            >
              {i.name}
            </Link>
          );
        })}
      </div>

      {/* Mobile centered scrollable nav (hidden when overlay used) */}
      <div className="hidden md:hidden flex gap-2 overflow-x-auto no-scrollbar justify-center w-full py-2">
        {items.map(i => {
          const active = location.pathname === i.path || location.pathname.startsWith(i.path + '/');
          return (
            <Link key={i.path} to={i.path} className={`px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${active ? 'bg-[#0B1E3B] text-white' : 'bg-white text-[#0B1E3B]'}`}>
              {i.name}
            </Link>
          );
        })}
      </div>

      {/* Sign out and Back to Home */}
      <div className="flex items-center gap-2 ml-2">
        <Link to="/member/dashboard" className="hidden md:inline-block px-4 py-2 rounded-full text-sm font-semibold border border-[#E6EEF2] bg-white hover:bg-slate-50">Back to Dashboard</Link>
        <button onClick={handleSignOut} className="px-3 py-1.5 rounded-full text-sm font-medium text-red-600 bg-white border border-red-100 hover:bg-red-50">Sign Out</button>
      </div>
    </nav>
  );
};

const PortalLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get User from Storage
  const userStr = localStorage.getItem('unda_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const displayName = user ? (user.full_name || user.username || 'Member') : 'Guest';
  const displayRole = user ? (user.role || 'Champion') : 'Visitor';
  const initials = displayName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();

  const handleLogout = () => {
      localStorage.removeItem('unda_token');
      localStorage.removeItem('unda_user');
      navigate('/portal');
  };

  // Derive a friendly header title from the current route when no title prop is supplied
  const deriveTitleFromPath = (path) => {
    if (!path) return 'Member Area';
    if (path.startsWith('/member/dashboard')) return 'Dashboard';
    if (path.startsWith('/member/check-in')) return 'Wellness Check-In';
    if (path.startsWith('/member/events')) return 'Events & Training';
    if (path.startsWith('/member/certificate')) return 'My Certificate';
    if (path.startsWith('/member/profile')) return 'Profile & Settings';
    if (path.startsWith('/member')) return 'Member Area';
    return 'Member Area';
  };

  const headerTitle = title || deriveTitleFromPath(location.pathname);

  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#F8FAFC] via-[#E0F7FA] to-[#F8FAFC] dark:bg-[#061225] dark:text-[#94A3B8]">
      {/* Sidebar removed; navigation now in top navbar */}

      {/* Mobile sidebar overlay (controlled via state) */}

      {/* Mobile slim floating header (logo + menu) */}
      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
        <div className="mx-auto rounded-full backdrop-blur-md bg-white/90 border border-[#E6EEF2] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
              <img src="/assets/logos/unda-logo-main.jpg" alt="Unda" className="w-full h-full object-contain" />
            </div>
            <div className="text-[#0B1E3B] font-bold">Unda</div>
          </div>
          <button aria-label="Open menu" onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-md text-[#00C2CB]">
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Use a compact portal header styled like the main site navbar (desktop) */}
      <div className="w-full px-4 pt-4 md:px-6 md:pt-6">
        <div className="max-w-7xl mx-auto site-surface text-[#0B1E3B] dark:text-white shadow-[0_20px_50px_rgba(0,194,203,0.08)] border border-[#00C2CB]/20 rounded-[2.5rem] px-4 py-3 md:px-8 md:py-3 flex flex-col md:flex-row items-start md:items-center md:justify-between gap-3">
          <div className="w-full md:w-auto">
            <h2 className="text-lg md:text-xl font-extrabold tracking-tight">{headerTitle}</h2>
            {subtitle && <p className="text-[12px] text-slate-500 mt-1">{subtitle}</p>}
          </div>

          <div className="w-full md:w-auto">
            <div className="flex justify-end">
              <MemberNav />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area (add top padding to account for the fixed mobile header) */}
      <main className="flex-1 min-w-0 relative pt-28 md:pt-10">

        {/* Mobile sidebar removed - mobile nav is handled by top navbar */}

        {/* Content Injector with portal header + member nav */}
          <div className="p-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 mt-8 pb-28">
            <div className="rounded-3xl bg-white/90 dark:bg-[rgba(11,30,59,0.6)] shadow-xl p-6">
            {/* Portal header: title, subtitle and compact member nav */}
            <div className="flex flex-col">
              {/* Content now rendered below the header bar; keep this area minimal */}
            </div>

            {/* Children container */}
            <div className="mt-6">
              {children}
            </div>
          </div>
        </div>

      </main>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
            <div className="fixed inset-0 z-60 bg-white/90 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="w-full max-w-md text-center relative bg-white rounded-2xl shadow-lg p-6">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-4 right-4 text-[#0B1E3B] p-2 rounded-md">
              <X size={26} />
            </button>
            <nav className="flex flex-col gap-4 py-4">
              <Link to="/member/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0B1E3B]">Dashboard</Link>
              <Link to="/member/check-in" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0B1E3B]">Wellness</Link>
              <Link to="/member/events" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0B1E3B]">Events</Link>
              <Link to="/member/certificate" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0B1E3B]">Certificate</Link>
              <Link to="/member/profile" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-[#0B1E3B]">Profile</Link>
              <div className="mt-4">
                <button onClick={() => { localStorage.removeItem('unda_token'); localStorage.removeItem('unda_user'); setMobileMenuOpen(false); navigate('/portal'); }} className="w-full px-4 py-3 rounded-full bg-[#0B1E3B] text-white font-semibold">Sign Out</button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalLayout;
