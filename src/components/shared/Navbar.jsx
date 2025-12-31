import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Mic, Users, GraduationCap, MapPin, Shield, Activity, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
            <div className="h-10 w-10 bg-unda-navy rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-unda-navy/20 group-hover:bg-unda-teal transition-all">U</div>
            <div className="flex flex-col">
              <span className="font-black text-unda-navy text-xl tracking-tighter leading-none">UNDA</span>
              <span className="text-[7px] font-bold text-unda-teal uppercase tracking-[0.3em] mt-1">Youth Network </span>
            </div>
          </Link>

          {/* Centered Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/' ? 'text-unda-teal' : 'text-unda-navy/60 hover:text-unda-navy'}`}>Home</Link>
            
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

            <Link to="/membership" className={`text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/membership' ? 'text-unda-teal' : 'text-unda-navy/60 hover:text-unda-navy'}`}>Membership</Link>
              <Link to="/membership" className={`text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === '/membership' ? 'text-unda-teal' : 'text-unda-navy/60 hover:text-unda-navy'}`}>Membership</Link>
          </div>

          {/* Action Button: Membership Bridge */}
          <Button asChild className="bg-unda-navy text-white text-[10px] font-black uppercase tracking-widest px-8 h-12 rounded-2xl hover:bg-unda-teal hover:scale-105 transition-all shadow-xl shadow-unda-navy/10">
            <a 
              href="https://unda-youth-network-backend.onrender.com/auth/login" 
              className="flex items-center gap-2"
              target="_blank" rel="noopener noreferrer"
            >
              Portal Login <ExternalLink size={12} />
            </a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;