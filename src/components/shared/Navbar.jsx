import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Mic, Users, GraduationCap, MapPin, Shield, Activity, ExternalLink, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const workstreams = [
    { name: 'UMV Podcast', path: '/podcast', icon: <Mic size={16} />, desc: 'Expert insights' },
    { name: 'Debaters Circle', path: '/debaters-circle', icon: <Users size={16} />, desc: 'Advocacy hub' },
    { name: 'Campus Edition', path: '/campus', icon: <GraduationCap size={16} />, desc: 'Innovation grants' },
    { name: 'UMV Mtaani', path: '/mtaani', icon: <MapPin size={16} />, desc: 'Local prevention' }
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] px-6 py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. TOP UTILITY BAR (Solves the 'Plain' look by adding technical density)  */}
        <div className="flex justify-between items-center px-8 mb-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-unda-navy/40">
              <Shield size={10} className="text-unda-teal" /> Safeguarding Active
            </span>
            <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-unda-navy/40">
              <Activity size={10} className="text-unda-orange" /> Real-time Metrics
            </span>
          </div>
          <Link to="/portal" className="text-[8px] font-black uppercase tracking-[0.2em] text-unda-navy/60 hover:text-unda-teal transition-colors">
            Admins & Supervisors Only
          </Link>
        </div>

        {/* 2. MAIN NAV (Glassmorphism + Shadow) */}
        <div className="bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] px-10 py-4 flex items-center justify-between">
          
          {/* Logo with Status Metadata [cite: 12-14, 21-25] */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-12 w-12 rounded-xl overflow-hidden flex items-center justify-center bg-white">
              <img src={undaLogo} alt="Unda Logo" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-unda-navy text-xl tracking-tighter leading-none">UNDA</span>
              <span className="text-[7px] font-bold text-unda-teal uppercase tracking-[0.3em] mt-1">Youth Network Global</span>
            </div>
          </Link>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/' ? 'text-unda-teal' : 'text-unda-navy/60 hover:text-unda-navy'}`}>Home</Link>
            
            <Link to="/about" className={`text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/about' ? 'text-unda-teal' : 'text-unda-navy/60 hover:text-unda-navy'}`}>About</Link>

            {/* WORKSTREAMS DROPDOWN  [cite: 31-32, 172-180] */}
            <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-unda-navy/60 hover:text-unda-navy transition-all h-10">
                Workstreams <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-unda-teal' : ''}`} />
              </button>

              {isOpen && (
                <div className="absolute top-full -left-10 pt-6 w-[400px] animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-6 grid grid-cols-2 gap-3 relative overflow-hidden">
                     {/* Decorative blur in dropdown */}
                     <div className="absolute top-0 right-0 w-20 h-20 bg-unda-teal/5 blur-xl pointer-events-none"/>
                     
                    {workstreams.map((stream) => (
                      <Link 
                        key={stream.path} 
                        to={stream.path}
                        className="flex flex-col gap-1 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group/item relative z-10"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="p-2 bg-unda-teal/5 text-unda-teal rounded-lg group-hover/item:bg-unda-teal group-hover/item:text-white transition-all">{stream.icon}</div>
                          <span className="text-[10px] font-black text-unda-navy uppercase tracking-tight">{stream.name}</span>
                        </div>
                        <span className="text-[9px] font-medium text-slate-500 pl-1">{stream.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* MEDIA & GALLERY DROPDOWN */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-unda-navy/60 hover:text-unda-navy transition-all h-10">
                Media & Gallery <ChevronDown size={12} className="transition-transform duration-300 group-hover:rotate-180 group-hover:text-unda-teal" />
              </button>

              <div className="absolute top-full -left-10 pt-6 w-[300px] opacity-0 invisible group-hover:opacity-100 group-hover:visible animate-in fade-in slide-in-from-top-4 duration-300 transition-all">
                <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-2xl p-6 flex flex-col gap-3 relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-unda-orange/5 blur-xl pointer-events-none"/>
                   
                   <Link to="/blog" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group/item">
                      <div className="p-2 bg-unda-orange/5 text-unda-orange rounded-lg group-hover/item:bg-unda-orange group-hover/item:text-white transition-all">
                        <Mic size={16} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-black text-unda-navy uppercase tracking-tight">Blog & Media</span>
                        <span className="text-[9px] font-medium text-slate-500">Latest updates & stories</span>
                      </div>
                   </Link>

                   <Link to="/gallery" className="flex items-center gap-3 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group/item">
                      <div className="p-2 bg-unda-yellow/5 text-unda-yellow rounded-lg group-hover/item:bg-unda-yellow group-hover/item:text-white transition-all">
                        <Users size={16} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-black text-unda-navy uppercase tracking-tight">Gallery & Moments</span>
                        <span className="text-[9px] font-medium text-slate-500">Photos & videos</span>
                      </div>
                   </Link>
                </div>
              </div>
            </div>

            <Link to="/resources" className={`text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/resources' ? 'text-unda-teal' : 'text-unda-navy/60 hover:text-unda-navy'}`}>Resources</Link>

            <Link to="/membership" className={`text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/membership' ? 'text-unda-teal' : 'text-unda-navy/60 hover:text-unda-navy'}`}>Membership</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-unda-navy"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Action Button: Membership Bridge */}
          <Button asChild className="hidden md:inline-flex bg-unda-navy text-white text-[10px] font-black uppercase tracking-widest px-8 h-12 rounded-2xl hover:bg-unda-teal hover:scale-105 transition-all shadow-xl shadow-unda-navy/10">
            <a 
              href="https://unda-youth-network-backend.onrender.com/auth/login" 
              className="flex items-center gap-2"
              target="_blank" rel="noopener noreferrer"
            >
              Portal Login <ExternalLink size={12} />
            </a>
          </Button>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 z-50">
            <Link to="/" className="text-sm font-bold text-unda-navy py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="text-sm font-bold text-unda-navy py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            
            <div className="py-2 border-b border-slate-50">
              <span className="text-[10px] font-black uppercase text-unda-teal mb-3 block tracking-widest">Workstreams</span>
              <div className="grid grid-cols-1 gap-3 pl-2">
                {workstreams.map(ws => (
                  <Link key={ws.path} to={ws.path} className="flex items-center gap-2 text-sm text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="text-unda-teal">{ws.icon}</span>
                    {ws.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/blog" className="text-sm font-bold text-unda-navy py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Blog & Media</Link>
            <Link to="/gallery" className="text-sm font-bold text-unda-navy py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
            <Link to="/resources" className="text-sm font-bold text-unda-navy py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
            <Link to="/membership" className="text-sm font-bold text-unda-navy py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Membership</Link>
            
            <Button asChild className="w-full bg-unda-navy text-white mt-4 h-12 rounded-xl">
              <a href="https://unda-youth-network-backend.onrender.com/auth/login" target="_blank" rel="noopener noreferrer">
                Portal Login <ExternalLink size={14} className="ml-2" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;