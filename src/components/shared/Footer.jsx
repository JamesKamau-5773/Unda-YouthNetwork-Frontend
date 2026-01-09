import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ShieldCheck, Globe, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';
import undaLogo from '@/assets/logos/unda-logo-main.jpg';

const Footer = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-slate-100 relative overflow-hidden">
      {/* Subtle background glow to keep it 'creative' */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[rgba(0,194,203,0.02)] blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          {/* 1. Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl overflow-hidden flex items-center justify-center bg-white border border-slate-100">
                <img src={undaLogo} alt="Unda Logo" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <span className="font-black text-[#0B1E3B] tracking-tighter text-xl">UNDA YOUTH NETWORK GLOBAL</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-medium">
              Kenya's national movement for Adolescent & Youth Mental Health Prevention through the UMV program.
            </p>
            <div>
              <p className="text-xs font-bold text-[#0B1E3B] mb-3">Contact Us</p>
              <div className="space-y-2">
                <a href="mailto:info@undayouth.org" className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#00C2CB] transition-colors">
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
              <p className="text-xs font-bold text-[#0B1E3B] mb-3">Follow Us</p>
              <div className="flex items-center gap-3">
                <a href="https://instagram.com/undayouthnetwork" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-[#00C2CB] hover:bg-[#00C2CB] hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61583694005570" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-[#00C2CB] hover:bg-[#00C2CB] hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://x.com/unda_youth_ke" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-[#00C2CB] hover:bg-[#00C2CB] hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                </a>
                <a href="https://www.linkedin.com/company/unda-youth-network/" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-[#00C2CB] hover:bg-[#00C2CB] hover:text-white transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="https://www.youtube.com/@UndaYouthNetwork" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-[#00C2CB] hover:bg-[#00C2CB] hover:text-white transition-colors" title="YouTube">
                  <Youtube size={18} />
                </a>

                {/* Substack */}
                <a href="https://substack.com/@undayouthnetwork" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-[#00C2CB] hover:bg-[#00C2CB] hover:text-white transition-colors" title="Substack">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="3" y="4" width="6" height="16" rx="1" fill="currentColor" />
                    <rect x="11" y="6" width="10" height="12" rx="1" fill="currentColor" opacity="0.9" />
                  </svg>
                </a>

                {/* TikTok */}
                <a href="https://www.tiktok.com/@undayouthnetwork" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-[#00C2CB] hover:bg-[#00C2CB] hover:text-white transition-colors" title="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M17.5 6.5c-.3 0-.6 0-.9-.1v3.5c.2.1.4.1.7.1 1.1 0 2-.9 2-2V6.5h-1.8z" fill="currentColor"/>
                    <path d="M12 3.5c.2 0 .4 0 .6.1v3.9c0 2.6-2.1 4.7-4.7 4.7-2.6 0-4.7-2.1-4.7-4.7S5.3 3.5 7.9 3.5c.8 0 1.6.2 2.3.5V8c-.6-.3-1.3-.5-2.3-.5-2 0-3.6 1.6-3.6 3.6S8.3 14.7 10.3 14.7 14 13.1 14 11.1V7.6c0-.1 0-.2-.1-.2-1.1-.4-2.2-.7-2.9-.7z" fill="currentColor" opacity="0.95"/>
                    <path d="M17.6 8.3c-.1 0-.2 0-.3-.1-.8-.5-1.7-.8-2.7-.9v1.6c.9.1 1.7.4 2.3.9.4.3.6.8.6 1.2v3.1c0 2-1.6 3.6-3.6 3.6-2 0-3.6-1.6-3.6-3.6V7.8h1.6v4.3c0 1.1.9 2 2 2 1.1 0 2-1 2-2V8.8c.6.1 1.2.3 1.7.6.2.1.4 0 .5-.1.1-.1.1-.3 0-.4-.2-.2-.5-.3-.8-.4z" fill="currentColor"/>
                  </svg>
                </a>

                {/* Linktree (keep) */}
                <a href="https://linktr.ee/undayouthnetwork" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-50 text-[#00C2CB] hover:bg-[#00C2CB] hover:text-white transition-colors" title="Linktree">
                  <Globe size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* 2. Navigation & Resources */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1E3B] mb-8">Navigate</h4>
              <ul className="space-y-4">
                <li><Link to="/about" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">About</Link></li>
                  <li><Link to="/programs" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Programs</Link></li>
                  <li><Link to="/membership" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Membership</Link></li>
                  <li><Link to="/resources" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Resources</Link></li>
                  <li><Link to="/blog" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Blog</Link></li>
                  <li><Link to="/gallery" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Gallery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1E3B] mb-8">Get Involved</h4>
              <ul className="space-y-4">
                <li><Link to="/support" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Contribute</Link></li>
                  <li><Link to="/join" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Join</Link></li>
                  <li><Link to="/partner" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Partner</Link></li>
                  <li><Link to="/portal" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Portal</Link></li>
                  <li><Link to="/privacy-policy" className="text-slate-600 hover:text-[#00C2CB] text-sm font-semibold transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* 3. Hubs - Creative Vertical Cards */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0B1E3B] mb-8">Active Hubs</h4>
            <div className="space-y-4">
              <div className="group p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-[#00C2CB]/30 hover:bg-white transition-all duration-500">
                <div className="flex items-center gap-3 mb-1">
                  <MapPin size={14} className="text-[#00C2CB]" />
                  <p className="text-sm font-black text-[#0B1E3B] uppercase tracking-tighter">Nairobi Region</p>
                </div>
                <p className="text-[11px] text-slate-600 font-medium pl-6">Urban Activation & HQ Hub</p>
              </div>
              
              <div className="group p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-[#00C2CB]/30 hover:bg-white transition-all duration-500">
                <div className="flex items-center gap-3 mb-1">
                  <MapPin size={14} className="text-[#00C2CB]" />
                  <p className="text-sm font-black text-[#0B1E3B] uppercase tracking-tighter"></p>
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
            <ShieldCheck size={14} className="text-[#00C2CB]" />
            <span className="text-[10px] font-black text-[#0B1E3B] uppercase tracking-widest">Digitally Driven Prevention</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
