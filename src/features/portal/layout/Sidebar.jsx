import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Calendar, ShieldCheck, Settings, LogOut, User, X } from 'lucide-react';
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

const Sidebar = ({ mobile = false, isOpen = true, onClose = null }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/member/dashboard' },
    { icon: Activity, label: 'Wellness Check-In', path: '/member/check-in' },
    { icon: Calendar, label: 'Events & Training', path: '/member/events' },
    { icon: ShieldCheck, label: 'My Certificate', path: '/member/certificate' },
  ];

  // Mobile variant: overlay with slide animation, focus trap and escape-to-close
  if (mobile) {
    const panelRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
      if (!isOpen) return;
      const panel = panelRef.current;
      const focusable = panel.querySelectorAll('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const prevActive = document.activeElement;
      if (first) first.focus();

      const onKey = (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose && onClose();
        }
        if (e.key === 'Tab') {
          if (focusable.length === 0) {
            e.preventDefault();
            return;
          }
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('keydown', onKey);
        prevActive && prevActive.focus && prevActive.focus();
      };
    }, [isOpen, onClose]);

    return (
      <>
        <div ref={overlayRef} className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
        <aside ref={panelRef} aria-hidden={!isOpen} className={`fixed left-0 top-0 h-screen w-64 bg-[#07142a] border-r border-[#042033]/60 flex flex-col z-50 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.12)] transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-4 border-b border-[#042033]/40 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#00C2CB] to-[#0B1E3B] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shadow-md">
                <img src={undaLogo} alt="Unda" className="w-full h-full object-contain mix-blend-mode-screen" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-white leading-none tracking-tight">Unda</span>
                <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Member Portal</span>
              </div>
            </Link>
            <button onClick={onClose} className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/5">
              <X size={18} />
            </button>
          </div>

          <nav className="flex-1 px-3 py-6 space-y-1 mt-6">
            <p className="px-4 text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-2">Platform</p>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                  isActive(item.path)
                    ? 'text-white bg-[#00C2CB]/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive(item.path) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/80 rounded-r-full" />
                )}
                <item.icon 
                  size={18} 
                  className={`transition-colors ${isActive(item.path) ? 'text-white' : 'text-white/70 group-hover:text-white'}`} 
                />
                {item.label}
              </Link>
            ))}

            <div className="pt-8">
                <p className="px-4 text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-2">Account</p>
                <Link
                    to="/member/profile"
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                    isActive('/member/profile') 
                        ? 'text-white bg-[#00C2CB]/20' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                >
                    {isActive('/member/profile') && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/80 rounded-r-full" />
                    )}
                    <User 
                      size={18} 
                      className={`transition-colors ${isActive('/member/profile') ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} 
                    />
                    Profile & Settings
                </Link>
            </div>
          </nav>

          <div className="p-4 border-t border-[#042033]/30">
            <Link
              to="/portal"
              onClick={() => { localStorage.removeItem('unda_token'); localStorage.removeItem('unda_user'); if (onClose) onClose(); }}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut size={18} />
              Sign Out
            </Link>
          </div>
        </aside>
      </>
    );
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#07142a] border-r border-[#042033]/60 flex flex-col z-50 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.12)]">
      {/* 1. Logo Area */}
      <div className="p-6 border-b border-[#042033]/40">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#00C2CB] to-[#0B1E3B] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shadow-md">
            <img src={undaLogo} alt="Unda" className="w-full h-full object-contain mix-blend-mode-screen" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-white leading-none tracking-tight">Unda</span>
            <span className="text-[10px] uppercase font-bold text-slate-300 tracking-wider">Member Portal</span>
          </div>
        </Link>
      </div>

      {/* 2. Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1 mt-6">
        <p className="px-4 text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-2">Platform</p>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
              isActive(item.path)
                ? 'text-white bg-[#00C2CB]/20' 
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            {isActive(item.path) && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/80 rounded-r-full" />
            )}
            <item.icon 
              size={18} 
              className={`transition-colors ${isActive(item.path) ? 'text-white' : 'text-white/70 group-hover:text-white'}`} 
            />
            {item.label}
          </Link>
        ))}

        <div className="pt-8">
            <p className="px-4 text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-2">Account</p>
            <Link
                to="/member/profile"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive('/member/profile') 
                    ? 'text-white bg-[#00C2CB]/20' 
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
            >
                {isActive('/member/profile') && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/80 rounded-r-full" />
                )}
                <User 
                  size={18} 
                  className={`transition-colors ${isActive('/member/profile') ? 'text-white' : 'text-slate-300 group-hover:text-white'}`} 
                />
                Profile & Settings
            </Link>
        </div>
      </nav>

      {/* 3. User Footer */}
      <div className="p-4 border-t border-[#042033]/30">
        <Link
          to="/portal"
          onClick={() => { localStorage.removeItem('unda_token'); localStorage.removeItem('unda_user'); }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
