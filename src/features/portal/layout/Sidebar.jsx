import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Activity, Calendar, ShieldCheck, Settings, LogOut, User } from 'lucide-react';
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/member/dashboard' },
    { icon: Activity, label: 'Wellness Check-In', path: '/member/check-in' },
    { icon: Calendar, label: 'Events & Training', path: '/member/events' },
    { icon: ShieldCheck, label: 'My Certificate', path: '/member/certificate' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-50 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      {/* 1. Logo Area */}
      <div className="p-6 border-b border-slate-100">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-lg bg-[#0B1E3B] flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            <img src={undaLogo} alt="Unda" className="w-full h-full object-contain mix-blend-mode-screen" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-[#0B1E3B] leading-none tracking-tight">UNDA</span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Member Portal</span>
          </div>
        </Link>
      </div>

      {/* 2. Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Platform</p>
        
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
              isActive(item.path) 
                ? 'text-[#00C2CB] bg-[#00C2CB]/5' 
                : 'text-slate-500 hover:text-[#0B1E3B] hover:bg-slate-50'
            }`}
          >
            {isActive(item.path) && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00C2CB] rounded-r-full" />
            )}
            <item.icon 
              size={18} 
              className={`transition-colors ${isActive(item.path) ? 'text-[#00C2CB]' : 'text-slate-400 group-hover:text-[#0B1E3B]'}`} 
            />
            {item.label}
          </Link>
        ))}

        <div className="pt-8">
            <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Account</p>
            <Link
                to="/member/profile"
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                isActive('/member/profile') 
                    ? 'text-[#00C2CB] bg-[#00C2CB]/5' 
                    : 'text-slate-500 hover:text-[#0B1E3B] hover:bg-slate-50'
                }`}
            >
                {isActive('/member/profile') && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#00C2CB] rounded-r-full" />
                )}
                <User 
                  size={18} 
                  className={`transition-colors ${isActive('/member/profile') ? 'text-[#00C2CB]' : 'text-slate-400 group-hover:text-[#0B1E3B]'}`} 
                />
                Profile & Settings
            </Link>
        </div>
      </nav>

      {/* 3. User Footer */}
      <div className="p-4 border-t border-slate-100">
        <Link to="/portal/login" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all">
          <LogOut size={18} />
          Sign Out
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
