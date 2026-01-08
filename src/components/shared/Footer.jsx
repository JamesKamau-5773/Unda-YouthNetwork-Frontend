import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ShieldCheck, Globe, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100 relative overflow-hidden">
      {/* Subtle background glow to keep it 'creative' */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-unda-orange/[0.02] blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          {/* 1. Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center bg-white border border-slate-100">
                <img src={undaLogo} alt="Unda Logo" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <span className="font-black text-unda-navy tracking-tighter text-xl">UNDA YOUTH NETWORK GLOBAL</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-medium">
              Kenya's national movement for Adolescent & Youth Mental Health Prevention through the UMV program.
            </p>
            <div>
              <p className="text-xs font-bold text-unda-navy mb-3">Contact Us</p>
              <div className="space-y-2">
                <a href="mailto:info@undayouth.org" className="flex items-center gap-2 text-sm text-slate-600 hover:text-unda-teal transition-colors">
                  <Mail size={14} />
                  <span className="font-medium">info@undayouth.org</span>
                </a>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin size={14} />
                  <span className="font-medium">Kenya</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-unda-navy mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com/undayouthnetwork" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-unda-teal hover:bg-unda-teal hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61583694005570" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-unda-teal hover:bg-unda-teal hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://x.com/unda_youth_ke" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-unda-teal hover:bg-unda-teal hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/unda-youth-network/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-unda-teal hover:bg-unda-teal hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.youtube.com/@UndaYouthNetwork" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-unda-teal hover:bg-unda-teal hover:text-white transition-colors">
                  <Youtube size={18} />
                </a>
                <a href="https://substack.com/@undayouthnetwork" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-unda-teal hover:bg-unda-teal hover:text-white transition-colors">
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Navigation & Resources */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-unda-navy mb-8">Navigate</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">About</Link></li>
                <li><Link to="/programs" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Programs</Link></li>
                <li><Link to="/membership" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Membership</Link></li>
                <li><Link to="/resources" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Resources</Link></li>
                <li><Link to="/blog" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Blog</Link></li>
                <li><Link to="/gallery" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Gallery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-unda-navy mb-8">Get Involved</h4>
              <ul className="space-y-4">
                <li><Link to="/donate" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Donate</Link></li>
                <li><Link to="/join" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Join</Link></li>
                <li><Link to="/partner" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Partner</Link></li>
                <li><Link to="/portal" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Portal</Link></li>
                <li><Link to="/privacy-policy" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* 3. Hubs - Creative Vertical Cards */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-unda-navy mb-8">Active Hubs</h4>
            <div className="space-y-4">
              <div className="group p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-unda-teal/30 hover:bg-white transition-all duration-500">
                <div className="flex items-center gap-3 mb-1">
                  <MapPin size={14} className="text-unda-teal" />
                  <p className="text-sm font-black text-unda-navy uppercase tracking-tighter">Nairobi Region</p>
                </div>
                <p className="text-[11px] text-slate-600 font-medium pl-6">Urban Activation & HQ Hub</p>
              </div>
              
              <div className="group p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-unda-orange/30 hover:bg-white transition-all duration-500">
                <div className="flex items-center gap-3 mb-1">
                  <MapPin size={14} className="text-unda-orange" />
                  <p className="text-sm font-black text-unda-navy uppercase tracking-tighter"></p>
                </div>
                <p className="text-[11px] text-slate-600 font-medium pl-6"></p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Bar: Trust Indicators */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            © 2025 UNDA Youth Network Global
          </p>
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100">
            <ShieldCheck size={14} className="text-unda-teal" />
            <span className="text-[10px] font-black text-unda-navy uppercase tracking-widest">Digitally Driven Prevention</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
