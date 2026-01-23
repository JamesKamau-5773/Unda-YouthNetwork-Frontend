import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Mic, Users, GraduationCap, MapPin, Shield, Activity, ExternalLink, Menu, X, HeartHandshake, Layers, BookOpen, Lightbulb, Calendar, Globe, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const location = useLocation();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('unda_theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialDark = stored ? stored === 'dark' : prefersDark;
      if (initialDark) document.documentElement.classList.add('dark');
      setIsDark(initialDark);
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
    try { localStorage.setItem('unda_theme', next ? 'dark' : 'light'); } catch (e) {}
  };

  const handleMouseEnter = (name) => setActiveDropdown(name);
  const handleMouseLeave = () => setActiveDropdown(null);

  const workstreams = [
    { name: 'UMV Podcast', path: '/podcast', icon: <Mic size={16} />, desc: 'Social driver & audio content' },
    { name: 'UMV Debaters', path: '/debaters-circle', icon: <Users size={16} />, desc: 'Age-appropriate mental health debates and conversations for 13–17 in school and community settings' },
    { name: 'UMV Campus', path: '/campus', icon: <GraduationCap size={16} />, desc: 'Campus cohorts, events & research' },
    { name: 'UMV Mtaani', path: '/mtaani', icon: <MapPin size={16} />, desc: 'Community outreaches & pillar events' }
    ,{ name: 'UMV Annual Conference', path: '/programs/annual-conference', icon: <Calendar size={16} />, desc: 'Flagship youth convening' },
    { name: 'UMV Global', path: '/programs/global', icon: <Globe size={16} />, desc: 'International expansion' }
  ];

  const memberItems = [
    { name: 'Dashboard', path: '/member/dashboard' },
    { name: 'Wellness Check-In', path: '/member/check-in' },
    { name: 'Events & Training', path: '/member/events' },
    { name: 'My Certificate', path: '/member/certificate' },
    { name: 'Profile & Settings', path: '/member/profile' },
  ];

  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-[100] px-6 py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Mobile slim floating header */}
        <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="mx-auto rounded-full backdrop-blur-md bg-[#0B1E3B]/80 border border-white/10 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                <img src={undaLogo} alt="Unda" className="w-full h-full object-contain" />
              </div>
              <div className="text-white font-bold">Unda</div>
            </div>
            <button aria-label="Open menu" onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-md text-[#00C2CB]">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* 1. TOP UTILITY BAR */}
        <div className="flex justify-between items-center px-8 mb-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-[#0B1E3B]/40">
              <Shield size={10} className="text-[#00C2CB]" /> Safeguarding Active
            </span>
            <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-[#0B1E3B]/40">
              <Activity size={10} className="text-[#00C2CB]" /> Real-time Metrics
            </span>
          </div>
        </div>

        {/* 2. MAIN NAV */}
        <div className="site-surface bg-white text-[#0B1E3B] shadow-[0_20px_50px_rgba(0,194,203,0.08)] border border-[#00C2CB]/20 rounded-[2.5rem] px-8 py-3 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group mr-8">
            <div className="h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center bg-white/90 border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <img src={undaLogo} alt="Unda Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-[#0B1E3B] text-lg tracking-tighter leading-none">Unda</span>
              <span className="text-[6px] font-bold text-[#0B1E3B]/70 uppercase tracking-[0.3em] mt-0.5">Youth Network</span>
            </div>
          </Link>

          {/* Center Navigation Links - Expanded */}
          <div className="hidden md:flex items-center gap-1">

            {/* Home Link */}
            <Link 
              to="/" 
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                location.pathname === '/' ? 'text-white bg-[#0B1E3B] shadow-[0_10px_30px_rgba(0,194,203,0.12)]' : 'text-[#0B1E3B]/60 hover:text-[#0B1E3B] hover:bg-slate-50 hover:shadow-[0_8px_20px_rgba(0,194,203,0.06)]'
              }`}
            >
              Home
            </Link>
            
            {/* About Link */}
            <Link 
              to="/about" 
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                location.pathname === '/about' ? 'text-[#00C2CB] bg-[#00C2CB]/5' : 'text-[#0B1E3B]/60 hover:text-[#0B1E3B] hover:bg-slate-50 hover:shadow-[0_8px_20px_rgba(0,194,203,0.04)]'
              }`}
            >
              About Us
            </Link>

            {/* Programs Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('programs')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeDropdown === 'programs' ? 'text-[#00C2CB] bg-[#00C2CB]/5' : 'text-[#0B1E3B]/60 hover:text-[#0B1E3B] hover:bg-slate-50 hover:shadow-[0_8px_20px_rgba(0,194,203,0.04)]'
              }`}>
                Programs <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === 'programs' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'programs' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[480px] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2CB]/5 blur-2xl pointer-events-none"/>
                    
                      <div className="flex gap-4 mb-4 pb-4 border-b border-white/10">
                        <Link to="/programs" className="flex-1 bg-[#00C2CB]/10 hover:bg-[#00C2CB]/20 p-4 rounded-xl transition-colors group/main">
                          <div className="flex items-center gap-2 mb-1 text-[#00C2CB]">
                             <Layers size={16} />
                             <span className="font-black uppercase text-xs tracking-wider">All Programs</span>
                          </div>
                          <p className="text-[10px] text-slate-500 group-hover/main:text-slate-600">Overview of our impact pillars</p>
                       </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                       {workstreams.map((stream) => (
                         <Link 
                           key={stream.path} 
                           to={stream.path}
                           className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group/item"
                         >
                           <div className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover/item:bg-[#00C2CB] group-hover/item:text-white transition-all">
                             {stream.icon}
                           </div>
                           <div>
                             <span className="block text-[10px] font-bold text-[#0B1E3B] uppercase tracking-tight">{stream.name}</span>
                             <span className="text-[9px] text-slate-400">{stream.desc}</span>
                           </div>
                         </Link>
                       ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources (Direct Link) */}
            <Link 
              to="/resources" 
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  location.pathname === '/resources' ? 'text-[#00C2CB] bg-[#00C2CB]/5' : 'text-[#0B1E3B]/60 hover:text-[#0B1E3B] hover:bg-slate-50 hover:shadow-[0_8px_20px_rgba(0,194,203,0.04)]'
                }`}
            >
              Resources
            </Link>

            {/* Blog & Media (Direct Link) */}
            <Link 
               to="/blog" 
               className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 location.pathname === '/blog' ? 'text-[#0090C0] bg-[#0090C0]/5' : 'text-[#0B1E3B]/60 hover:text-[#0B1E3B] hover:bg-slate-50 hover:shadow-[0_8px_20px_rgba(0,194,203,0.04)]'
               }`}
             >
               Stories
             </Link>

             {/* Gallery (Direct Link) */}
             <Link 
               to="/gallery" 
               className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 location.pathname === '/gallery' ? 'text-[#00C2CB] bg-[#00C2CB]/5' : 'text-[#0B1E3B]/60 hover:text-[#0B1E3B] hover:bg-slate-50 hover:shadow-[0_8px_20px_rgba(0,194,203,0.04)]'
               }`}
             >
               Gallery
             </Link>

            {/* Member / Portal Dropdown (moved from sidebar) */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('member')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeDropdown === 'member' ? 'text-[#00C2CB] bg-[#00C2CB]/5' : 'text-[#0B1E3B]/60 hover:text-[#0B1E3B] hover:bg-slate-50 hover:shadow-[0_8px_20px_rgba(0,194,203,0.04)]'
              }`}>
                Member <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === 'member' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'member' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[280px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white border border-slate-100 rounded-[2rem] shadow-xl p-4 flex flex-col gap-2 relative overflow-hidden">
                    {memberItems.map(mi => (
                      <Link key={mi.path} to={mi.path} className="px-3 py-2 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium text-[#0B1E3B]">
                        {mi.name}
                      </Link>
                    ))}
                    <button onClick={() => { localStorage.removeItem('unda_token'); localStorage.removeItem('unda_user'); navigate('/portal'); }} className="px-3 py-2 rounded-xl hover:bg-slate-50 transition-all text-sm font-medium text-red-500 text-left">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>


          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
             {/* Get Involved Dropdown */}
             <div className="relative" onMouseEnter={() => handleMouseEnter('join')} onMouseLeave={handleMouseLeave}>
                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeDropdown === 'join' ? 'text-[#00C2CB]' : 'text-[#0B1E3B]/60 hover:text-[#0B1E3B]'
                }`}>
                  Get Involved <ChevronDown size={10} />
                </button>

                {activeDropdown === 'join' && (
                  <div className="absolute top-full right-0 pt-4 w-[280px] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-xl p-4 flex flex-col gap-2 relative overflow-hidden">
                        <Link to="/partner" className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-[#00C2CB] to-[#0090C0] text-white shadow-[0_10px_30px_rgba(0,194,203,0.12)] transition-all group/item">
                          <div className="p-2 bg-white/10 text-white rounded-full transition-all">
                            <HeartHandshake size={16} />
                          </div>
                          <span className="text-[10px] font-black uppercase">Partner / Support</span>
                        </Link>
                       <Link to="/membership" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                            <div className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover/item:bg-[#0B1E3B] group-hover/item:text-white transition-all">
                             <Users size={16} />
                          </div>
                            <span className="text-[10px] font-black text-[#0B1E3B] uppercase">Membership</span>
                       </Link>
                       <Link to="/support" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                          <div className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover/item:bg-[#0B1E3B] group-hover/item:text-white transition-all">
                             <Lightbulb size={16} />
                          </div>
                          <span className="text-[10px] font-black text-[#0B1E3B] uppercase">Support</span>
                       </Link>
                    </div>
                  </div>
                )}
             </div>

            {/* Creative Combined Portal Button */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl group border border-slate-200 hover:border-[#00C2CB]/30 hover:shadow-lg transition-all duration-300">
                <Link 
                  to="/member/dashboard" 
                  className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0B1E3B] hover:text-white hover:bg-[#0B1E3B] transition-all duration-300 flex items-center gap-2"
                >
                  Member <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                </Link>
                <div className="w-px h-4 bg-slate-300 mx-1 group-hover:opacity-50 transition-opacity" />
                <a 
                  href="https://unda-youth-network-backend.onrender.com/auth/login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#00C2CB] hover:bg-white transition-all duration-300"
                >
                  Staff
                </a>
            </div>
          </div>

          {/* Mobile Menu Toggle (hidden — handled by slim header on mobile) */}
          <button className="hidden" aria-hidden>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#0B1E3B]/95 backdrop-blur-md p-6 flex flex-col items-center justify-center gap-6">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-white p-2 rounded-md">
              <X size={26} />
            </button>
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white">Home</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-white">About</Link>

            <div className="w-full max-w-sm text-center">
              <div className="flex flex-col gap-4 py-4">
                <Link to="/programs" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg">Programs</Link>
                {workstreams.map(ws => (
                  <Link key={ws.path} to={ws.path} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-lg flex items-center justify-center gap-2">{ws.icon}<span>{ws.name}</span></Link>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="block text-white text-lg">Resources</Link>
                <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-white text-lg">Stories</Link>
                <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className="block text-white text-lg">Gallery</Link>
              </div>
              <div className="mt-6">
                {memberItems.map(mi => (
                  <Link key={mi.path} to={mi.path} onClick={() => setIsMobileMenuOpen(false)} className="block text-white text-lg">{mi.name}</Link>
                ))}
                <button onClick={() => { localStorage.removeItem('unda_token'); localStorage.removeItem('unda_user'); setIsMobileMenuOpen(false); navigate('/portal'); }} className="mt-4 px-6 py-3 rounded-full bg-white text-[#0B1E3B] font-semibold">Sign Out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;