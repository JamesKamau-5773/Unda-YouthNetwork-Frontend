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
    <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
      <div className="hidden md:flex items-center gap-2">
        {items.map(i => {
          const active = location.pathname === i.path || location.pathname.startsWith(i.path + '/');
          return (
            <Link key={i.path} to={i.path} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wide transition ${active ? 'bg-[#0B1E3B] text-white shadow' : 'bg-slate-50 dark:bg-white/5 text-[#0B1E3B]/80 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-white/6'}`}>
              {i.name}
            </Link>
          );
        })}
      </div>

      {/* Mobile full-width centered scrollable nav (hidden — replaced by mobile menu overlay) */}
      <div className="hidden flex gap-2 overflow-x-auto no-scrollbar justify-center w-full py-2">
        {items.map(i => {
          const active = location.pathname === i.path || location.pathname.startsWith(i.path + '/');
          return (
            <Link
              key={i.path}
              to={i.path}
              className={`px-3 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${active ? 'bg-[#0B1E3B] text-white' : 'bg-slate-50 dark:bg-white/5 text-[#0B1E3B]/90 dark:text-[#94A3B8]'}`}
            >
              {i.name}
            </Link>
          );
        })}
      </div>

      {/* Sign out: hidden on mobile inside header, shown as small button below mobile nav */}
      <button onClick={handleSignOut} className="hidden md:inline-flex ml-2 px-3 py-1.5 rounded-full text-sm font-medium text-red-500 bg-white dark:bg-white/5 border border-red-100 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-600">Sign Out</button>
      <div className="md:hidden w-full flex justify-center">
        <button onClick={handleSignOut} className="mt-2 px-3 py-1 rounded-full text-sm font-medium text-red-500 bg-white dark:bg-white/5 border border-red-100 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-600">Sign Out</button>
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
        <div className="mx-auto rounded-full backdrop-blur-md bg-[#0B1E3B]/80 border border-white/10 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
              <img src="/assets/logos/unda-logo-main.jpg" alt="Unda" className="w-full h-full object-contain" />
            </div>
            <div className="text-white font-bold">Unda</div>
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
      <main className="flex-1 min-w-0 relative pt-20 md:pt-10">

        {/* Mobile sidebar removed - mobile nav is handled by top navbar */}

        {/* Content Injector with portal header + member nav */}
          <div className="p-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 mt-8">
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
        <div className="fixed inset-0 z-60 bg-[#0B1E3B]/95 backdrop-blur-md flex items-center justify-center px-6">
          <div className="w-full max-w-md text-center relative">
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white p-2 rounded-md">
              <X size={26} />
            </button>
            <nav className="flex flex-col gap-6 py-12">
              <a href="/member/dashboard" className="text-2xl font-bold text-white">Dashboard</a>
              <a href="/member/check-in" className="text-2xl font-bold text-white">Wellness</a>
              <a href="/member/events" className="text-2xl font-bold text-white">Events</a>
              <a href="/member/certificate" className="text-2xl font-bold text-white">Certificate</a>
              <a href="/member/profile" className="text-2xl font-bold text-white">Profile</a>
              <div className="mt-6">
                <button onClick={() => { localStorage.removeItem('unda_token'); localStorage.removeItem('unda_user'); setMobileMenuOpen(false); navigate('/portal'); }} className="px-6 py-3 rounded-full bg-white text-[#0B1E3B] font-semibold">Sign Out</button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortalLayout;
