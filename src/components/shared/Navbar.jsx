import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Mic, Users, GraduationCap, MapPin, Shield, Activity, ExternalLink, Menu, X, HeartHandshake, Layers, BookOpen, Lightbulb } from 'lucide-react';
import { Button } from "@/components/ui/button";
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleMouseEnter = (name) => setActiveDropdown(name);
  const handleMouseLeave = () => setActiveDropdown(null);

  const workstreams = [
    { name: 'UMV Podcast', path: '/podcast', icon: <Mic size={16} />, desc: 'Expert insights' },
    { name: 'Debaters Circle', path: '/debaters-circle', icon: <Users size={16} />, desc: 'Advocacy hub' },
    { name: 'Campus Edition', path: '/campus', icon: <GraduationCap size={16} />, desc: 'Innovation grants' },
    { name: 'UMV Mtaani', path: '/mtaani', icon: <MapPin size={16} />, desc: 'Local prevention' }
  ];

  return (
    <nav className="fixed top-0 w-full z-[100] px-6 py-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        

        {/* 1. TOP UTILITY BAR */}
        <div className="flex justify-between items-center px-8 mb-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex gap-6 items-center">
            <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-unda-navy/40">
              <Shield size={10} className="text-unda-teal" /> Safeguarding Active
            </span>
            <span className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-unda-navy/40">
              <Activity size={10} className="text-unda-orange" /> Real-time Metrics
            </span>
          </div>
        </div>

        {/* 2. MAIN NAV */}
        <div className="bg-gradient-corporate text-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-[2.5rem] px-8 py-3 flex items-center justify-between">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group mr-8">
            <div className="h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center bg-white/90 border border-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <img src={undaLogo} alt="Unda Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-[#0B1E3B] text-lg tracking-tighter leading-none">UNDA</span>
              <span className="text-[6px] font-bold text-[#0B1E3B]/70 uppercase tracking-[0.3em] mt-0.5">Youth Network</span>
            </div>
          </Link>

          {/* Center Navigation Links - Expanded */}
          <div className="hidden md:flex items-center gap-1">

            {/* Home Link */}
            <Link 
              to="/" 
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                location.pathname === '/' ? 'text-unda-navy bg-slate-100' : 'text-unda-navy/60 hover:text-unda-navy hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            
            {/* About Link */}
            <Link 
              to="/about" 
              className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                location.pathname === '/about' ? 'text-unda-teal bg-unda-teal/5' : 'text-unda-navy/60 hover:text-unda-navy hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            {/* Programs Dropdown */}
            <div className="relative" onMouseEnter={() => handleMouseEnter('programs')} onMouseLeave={handleMouseLeave}>
              <button className={`flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeDropdown === 'programs' ? 'text-unda-teal bg-unda-teal/5' : 'text-unda-navy/60 hover:text-unda-navy hover:bg-slate-50'
              }`}>
                Programs <ChevronDown size={10} className={`transition-transform duration-300 ${activeDropdown === 'programs' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'programs' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 w-[480px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white border border-slate-100 rounded-[2rem] shadow-xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-unda-teal/5 blur-2xl pointer-events-none"/>
                    
                      <div className="flex gap-4 mb-4 pb-4 border-b border-white/10">
                        <Link to="/programs" className="flex-1 bg-unda-teal/10 hover:bg-unda-teal/20 p-4 rounded-xl transition-colors group/main">
                          <div className="flex items-center gap-2 mb-1 text-unda-teal">
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
                           <div className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover/item:bg-unda-teal group-hover/item:text-white transition-all">
                             {stream.icon}
                           </div>
                           <div>
                             <span className="block text-[10px] font-bold text-unda-navy uppercase tracking-tight">{stream.name}</span>
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
                location.pathname === '/resources' ? 'text-unda-orange bg-unda-orange/5' : 'text-unda-navy/60 hover:text-unda-navy hover:bg-slate-50'
              }`}
            >
              Resources
            </Link>

            {/* Blog & Media (Direct Link) */}
            <Link 
               to="/blog" 
               className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 location.pathname === '/blog' ? 'text-unda-yellow bg-unda-yellow/5' : 'text-unda-navy/60 hover:text-unda-navy hover:bg-slate-50'
               }`}
             >
               Stories
             </Link>

             {/* Gallery (Direct Link) */}
             <Link 
               to="/gallery" 
               className={`px-5 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 location.pathname === '/gallery' ? 'text-unda-teal bg-unda-teal/5' : 'text-unda-navy/60 hover:text-unda-navy hover:bg-slate-50'
               }`}
             >
               Gallery
             </Link>
          </div>


          {/* Right Action Cluster */}
          <div className="hidden md:flex items-center gap-3">
             {/* Get Involved Dropdown */}
             <div className="relative" onMouseEnter={() => handleMouseEnter('join')} onMouseLeave={handleMouseLeave}>
                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeDropdown === 'join' ? 'text-unda-teal' : 'text-unda-navy/60 hover:text-unda-navy'
                }`}>
                  Get Involved <ChevronDown size={10} />
                </button>

                {activeDropdown === 'join' && (
                  <div className="absolute top-full right-0 pt-4 w-[280px] animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-xl p-4 flex flex-col gap-2 relative overflow-hidden">
                        <Link to="/partner" className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-energy text-white shadow-glow-energy transition-all group/item">
                          <div className="p-2 bg-white/10 text-white rounded-full transition-all">
                            <HeartHandshake size={16} />
                          </div>
                          <span className="text-[10px] font-black uppercase">Partner With Us</span>
                        </Link>
                       <Link to="/membership" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                          <div className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover/item:bg-unda-navy group-hover/item:text-white transition-all">
                             <Users size={16} />
                          </div>
                          <span className="text-[10px] font-black text-unda-navy uppercase">Membership</span>
                       </Link>
                       <Link to="/support" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all group/item">
                          <div className="p-2 bg-slate-100 text-slate-400 rounded-lg group-hover/item:bg-unda-navy group-hover/item:text-white transition-all">
                             <Lightbulb size={16} />
                          </div>
                          <span className="text-[10px] font-black text-unda-navy uppercase">Support</span>
                       </Link>
                    </div>
                  </div>
                )}
             </div>

            {/* Creative Combined Portal Button */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl group border border-slate-200 hover:border-unda-teal/30 hover:shadow-lg hover:shadow-unda-teal/10 transition-all duration-300">
                <Link 
                  to="/member/dashboard" 
                  className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-unda-navy hover:text-white hover:bg-unda-navy transition-all duration-300 flex items-center gap-2"
                >
                  Member <div className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse" />
                </Link>
                <div className="w-px h-4 bg-slate-300 mx-1 group-hover:opacity-50 transition-opacity" />
                <a 
                  href="https://unda-youth-network-backend.onrender.com/auth/login" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-unda-teal hover:bg-white transition-all duration-300"
                >
                  Staff
                </a>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-unda-navy"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-5 z-50">
            <Link to="/" className="text-sm font-bold text-unda-navy py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="text-sm font-bold text-unda-navy py-2 border-b border-slate-50" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            
            <div className="py-2 border-b border-slate-50">
              <span className="text-[10px] font-black uppercase text-unda-teal mb-3 block tracking-widest">Programs</span>
              <div className="grid grid-cols-1 gap-3 pl-2">
                 <Link to="/programs" className="flex items-center gap-2 text-sm text-slate-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                    View All Programs
                 </Link>
                {workstreams.map(ws => (
                  <Link key={ws.path} to={ws.path} className="flex items-center gap-2 text-sm text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>
                    <span className="text-unda-teal">{ws.icon}</span>
                    {ws.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="py-2 border-b border-slate-50">
               <span className="text-[10px] font-black uppercase text-unda-orange mb-3 block tracking-widest">Hub</span>
               <div className="grid grid-cols-1 gap-3 pl-2">
                  <Link to="/resources" className="text-sm font-medium text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
                  <Link to="/blog" className="text-sm font-medium text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Blog & Media</Link>
                  <Link to="/gallery" className="text-sm font-medium text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
               </div>
            </div>

            <div className="py-2 border-b border-slate-50">
               <span className="text-[10px] font-black uppercase text-unda-navy mb-3 block tracking-widest">Get Involved</span>
               <div className="grid grid-cols-1 gap-3 pl-2">
                  <Link to="/partner" className="text-sm font-medium text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Partner With Us</Link>
                  <Link to="/membership" className="text-sm font-medium text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Membership</Link>
                  <Link to="/support" className="text-sm font-medium text-slate-600" onClick={() => setIsMobileMenuOpen(false)}>Support</Link>
               </div>
            </div>
            
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