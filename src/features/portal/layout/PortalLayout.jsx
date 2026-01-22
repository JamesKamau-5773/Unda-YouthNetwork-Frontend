import React from 'react';
import { Bell, Search, ArrowLeft, LogOut } from 'lucide-react';
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
    <nav className="flex items-center gap-2 md:gap-3">
      <div className="hidden md:flex items-center gap-2">
        {items.map(i => {
          const active = location.pathname === i.path || location.pathname.startsWith(i.path + '/');
          return (
            <Link key={i.path} to={i.path} className={`px-3 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-wide transition ${active ? 'bg-[#0B1E3B] text-white shadow' : 'bg-slate-50 text-[#0B1E3B]/80 hover:bg-slate-100'}`}>
              {i.name}
            </Link>
          );
        })}
      </div>

      {/* Mobile scrollable mini-nav */}
      <div className="md:hidden flex gap-2 overflow-x-auto no-scrollbar">
        {items.map(i => (
          <Link key={i.path} to={i.path} className="px-3 py-2 rounded-xl text-sm font-bold text-[#0B1E3B] bg-slate-50 whitespace-nowrap">{i.name}</Link>
        ))}
      </div>

      <button onClick={handleSignOut} className="ml-2 px-3 py-1.5 rounded-full text-sm font-medium text-red-500 bg-white border border-red-100 hover:bg-red-50">Sign Out</button>
    </nav>
  );
};

const PortalLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
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
    <div className="min-h-screen flex bg-gradient-to-br from-[#F8FAFC] via-[#E0F7FA] to-[#F8FAFC]">
      {/* Sidebar removed; navigation now in top navbar */}

      {/* Mobile sidebar overlay (controlled via state) */}

      {/* Use a compact portal header styled like the main site navbar (removed global Navbar here) */}
      <div className="w-full px-6 pt-6">
        <div className="max-w-7xl mx-auto bg-white text-[#0B1E3B] shadow-[0_20px_50px_rgba(0,194,203,0.08)] border border-[#00C2CB]/20 rounded-[2.5rem] px-8 py-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">{headerTitle}</h2>
            {/* Optionally show a small subtitle under the title in the header */}
            {subtitle && <p className="text-[12px] text-slate-500">{subtitle}</p>}
          </div>

          <div>
            <MemberNav />
          </div>
        </div>
      </div>

      {/* Main Content Area (add top padding to account for the fixed navbar) */}
      <main className="flex-1 min-w-0 relative pt-28 md:pt-32">

        {/* Mobile sidebar removed - mobile nav is handled by top navbar */}

        {/* Content Injector with portal header + member nav */}
        <div className="p-6 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500 mt-8">
          <div className="rounded-3xl bg-white/90 shadow-xl p-6">
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
    </div>
  );
};

export default PortalLayout;
