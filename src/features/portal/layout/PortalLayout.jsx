import React from 'react';
import { Bell, Search, ArrowLeft, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';

const PortalLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();
  
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

  

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#F8FAFC] via-[#E0F7FA] to-[#F8FAFC]">
      {/* Sidebar removed; navigation now in top navbar */}

      {/* Mobile sidebar overlay (controlled via state) */}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 relative">
        
        {/* Sticky Header styled to match main site navbar */}
        <header className="sticky top-0 z-30 bg-white text-[#0B1E3B] shadow-[0_20px_50px_rgba(0,194,203,0.08)] border border-[#00C2CB]/20 rounded-[2.5rem] px-4 md:px-8 py-3 flex items-center justify-between mx-4 md:mx-0">
          <div className="flex items-center gap-4">
             {/* Back Button */}
             <Button 
               onClick={() => navigate('/member/dashboard')} 
                variant="ghost" 
                size="icon" 
               className="h-8 w-8 rounded-lg text-slate-400 hover:text-[#0B1E3B] hover:bg-slate-100 hidden md:flex"
                title="Go Back"
             >
                <ArrowLeft size={18} />
             </Button>

             <div className="flex items-center gap-4">
               <Link to="/" className="flex items-center gap-3 group">
                 <div className="h-8 w-8 rounded-xl overflow-hidden flex items-center justify-center bg-white/90 border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                   <img src="/unda-logo-main.jpg" alt="Unda" className="w-full h-full object-contain" />
                 </div>
               </Link>
               <div>
                 <h1 className="text-lg font-black text-[#0B1E3B] leading-none">{title || 'Dashboard'}</h1>
                 {subtitle && <p className="text-slate-500 text-xs font-medium mt-1">{subtitle}</p>}
               </div>
             </div>
          </div>

          <div className="flex items-center gap-3">
              <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#00C2CB] transition-colors" size={16} />
              <input 
                type="text" 
                className="h-9 pl-9 pr-4 rounded-full bg-slate-100 border-transparent text-sm focus:bg-white focus:outline-none focus:border-[#00C2CB] focus:ring-2 focus:ring-[#00C2CB]/10 w-48 focus:w-64 transition-all duration-300"
              />
            </div>
            
            <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>

            <Button size="icon" variant="ghost" className="relative h-9 w-9 rounded-full text-slate-500 hover:text-[#0B1E3B] hover:bg-slate-100">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white"></span>
            </Button>

            {/* Logout Button (Header Version) */}
            <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="sm" 
                className="hidden md:flex gap-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full px-3"
            >
                <LogOut size={16} />
                <span className="text-xs font-bold">Logout</span>
            </Button>
            
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200 ml-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-[#0B1E3B] leading-none">{displayName}</p>
                <p className="text-[10px] text-slate-500 font-medium capitalize">{displayRole}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#00C2CB] to-[#0090C0] flex items-center justify-center text-white font-bold text-xs ring-4 ring-slate-50 shadow-sm cursor-pointer hover:ring-[#00C2CB]/20 transition-all">
                {initials}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile sidebar removed - mobile nav is handled by top navbar */}

        {/* Content Injector */}
        <div className="p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500 rounded-3xl bg-white/80 shadow-xl mt-8">
          {children}
        </div>

      </main>
    </div>
  );
};

export default PortalLayout;
