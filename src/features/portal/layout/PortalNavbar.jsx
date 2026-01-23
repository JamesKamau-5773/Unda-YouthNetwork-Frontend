import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, Link, useLocation } from 'react-router-dom';
import { Menu, X, Bell, ChevronDown, LogOut, User, Award } from 'lucide-react';
import undaLogo from '@/assets/logos/unda-logo-main.jpg'; // Ensure path is correct

const PortalNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Desktop Dropdown
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine where the "Back to site" button should go:
  // - If on the portal home/dashboard, send user to the portal login (`/portal`).
  // - Otherwise (other member pages), send user back to the portal home/dashboard.
  const backLinkTarget = (location.pathname === '/member/dashboard' || location.pathname === '/portal' || location.pathname === '/member')
    ? '/portal'
    : '/member/dashboard';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sign Out Logic
  const handleSignOut = () => {
    // 1. Clear Storage
    localStorage.removeItem('unda_token');
    localStorage.removeItem('unda_user');
    // 2. Redirect
    navigate('/portal'); 
  };

  // Main Navigation Links
  const navLinks = [
    { name: 'Dashboard', path: '/member/dashboard' },
    { name: 'Wellness Check-In', path: '/member/check-in' },
    { name: 'Events', path: '/member/events' },
    { name: 'Certificates', path: '/member/certificate' },
  ];

  // Link Styling (Zero Grey: Navy Ink vs Mint Pill)
  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#00ACC1] font-bold text-sm bg-[#E0F7FA] px-5 py-2.5 rounded-full transition-all"
      : "text-[#0B1E3B] font-bold text-sm px-5 py-2.5 hover:bg-[#F0FDFF] rounded-full transition-all opacity-80 hover:opacity-100";

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-full px-6 z-50 pointer-events-auto">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-md bg-white/90 text-[#0B1E3B] shadow-[0_20px_50px_rgba(0,194,203,0.06)] border border-[#00C2CB]/12 rounded-[2.5rem] px-6 py-3 flex justify-between items-center h-20">
          
          {/* --- LEFT: LOGO & MAIN NAV --- */}
          <div className="flex items-center gap-12">
            {/* Logo */}
            {/* Back to main site (desktop only) */}
            {(location.pathname.startsWith('/member') || location.pathname.startsWith('/portal')) && (
              <Link to={backLinkTarget} className="hidden md:inline-block px-4 py-2 rounded-full text-sm font-semibold border border-[#E6EEF2] bg-white hover:bg-white/90 mr-4">
                ← Back to site
              </Link>
            )}
            <Link to="/member/dashboard" className="flex items-center gap-3">
               <div className="w-10 h-10 bg-white border border-[#E0F7FA] rounded-xl flex items-center justify-center p-1">
                 <img src={undaLogo} alt="Unda" className="w-full h-full object-contain" />
               </div>
               <div className="flex flex-col leading-none">
                 <span className="font-extrabold text-[#0B1E3B] text-lg tracking-tight">
                   Unda<span className="text-[#00ACC1]">Youth</span>
                 </span>
                 <span className="text-[10px] text-[#00838F] font-bold uppercase tracking-widest mt-0.5">
                   Member Portal
                 </span>
               </div>
            </Link>

            {/* Desktop Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className={getLinkClass}>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* --- RIGHT: ACTIONS & PROFILE DROPDOWN --- */}
          <div className="hidden md:flex items-center gap-6">
             {/* Notification Bell */}
             <button className="text-[#00ACC1] hover:bg-[#E0F7FA] p-2.5 rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             
             {/* Mint Divider */}
             <div className="h-8 w-px bg-[#E0F7FA]"></div>

             {/* Profile Dropdown */}
             <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 group focus:outline-none"
                >
                    <div className="text-right">
                        <span className="block text-sm font-bold text-[#0B1E3B] leading-none">Champion</span>
                        <span className="block text-[10px] text-[#00838F] font-bold uppercase mt-1 group-hover:text-[#00ACC1]">Member</span>
                    </div>
                    <div className="w-10 h-10 bg-[#E0F7FA] rounded-full flex items-center justify-center text-[#00ACC1] font-bold border-2 border-transparent group-hover:border-[#B2EBF2] transition-all shadow-sm">
                        JD
                    </div>
                    <ChevronDown size={16} className={`text-[#00ACC1] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-[#E0F7FA] rounded-2xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-[#E0F7FA] mb-2">
                      <p className="text-xs text-[#00838F] font-bold uppercase">Account</p>
                    </div>
                    
                    <Link 
                      to="/member/profile" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#0B1E3B] hover:bg-[#F0FDFF] hover:text-[#00ACC1] transition-colors"
                    >
                      <User size={18} /> Profile
                    </Link>
                    
                    <Link 
                      to="/member/certificate" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#0B1E3B] hover:bg-[#F0FDFF] hover:text-[#00ACC1] transition-colors"
                    >
                      <Award size={18} /> Certificates
                    </Link>

                    <div className="h-px bg-[#E0F7FA] my-2 mx-4"></div>

                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </div>
                )}
             </div>
          </div>

          {/* --- MOBILE TOGGLE --- */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#0B1E3B] p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          </div>
        </div>
      </nav>

      {/* Spacer to preserve original layout spacing when navbar is fixed */}
      <div className="h-24" />

      {/* --- MOBILE MENU (Drawer) --- */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-[85%] max-w-sm bg-white shadow-2xl p-6 border-r border-[#E0F7FA] flex flex-col">
            
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-extrabold text-[#0B1E3B] text-xl tracking-tight">
                 Unda<span className="text-[#00ACC1]">Youth</span>
              </span>
              <button onClick={() => setIsOpen(false)} className="text-[#0B1E3B]">
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 space-y-2">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    isActive 
                      ? "flex items-center gap-3 px-4 py-3 bg-[#E0F7FA] text-[#00ACC1] font-bold rounded-xl"
                      : "flex items-center gap-3 px-4 py-3 text-[#0B1E3B] font-bold hover:bg-gray-50 rounded-xl"
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              
              {/* Profile Link Mobile */}
              <NavLink 
                  to="/member/profile" 
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => 
                    isActive 
                      ? "flex items-center gap-3 px-4 py-3 bg-[#E0F7FA] text-[#00ACC1] font-bold rounded-xl"
                      : "flex items-center gap-3 px-4 py-3 text-[#0B1E3B] font-bold hover:bg-gray-50 rounded-xl"
                  }
                >
                  Profile
              </NavLink>
            </div>

            {/* Footer Action */}
            <div className="pt-6 border-t border-[#E0F7FA]">
               <button 
                 onClick={handleSignOut}
                 className="w-full flex items-center justify-center gap-2 px-4 py-4 bg-[#0B1E3B] text-white font-bold rounded-xl hover:bg-red-600 transition-colors shadow-lg"
               >
                 <LogOut size={20} /> Sign Out
               </button>
            </div>
          </div>
          
          {/* Backdrop */}
          <div className="flex-1 bg-[#0B1E3B]/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
};

export default PortalNavbar;