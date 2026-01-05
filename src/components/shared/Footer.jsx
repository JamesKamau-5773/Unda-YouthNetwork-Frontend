import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ShieldCheck, Globe } from 'lucide-react';
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
              <span className="font-black text-unda-navy tracking-tighter text-xl">UNDA</span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-medium">
              Kenya's national movement for Adolescent & Youth Mental Health Prevention through the UMV program.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <div className="p-2 rounded-lg bg-slate-50 text-unda-teal hover:bg-unda-teal hover:text-white transition-colors cursor-pointer">
                <Mail size={18} />
              </div>
              <div className="p-2 rounded-lg bg-slate-50 text-unda-teal hover:bg-unda-teal hover:text-white transition-colors cursor-pointer">
                <Globe size={18} />
              </div>
            </div>
          </div>

          {/* 2. Navigation & Resources */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-unda-navy mb-8">Workstreams</h4>
              <ul className="space-y-4">
                {['UMV Podcast', 'Debaters Circle', 'Campus Edition'].map((item) => (
                  <li key={item}>
                    <Link to="#" className="text-slate-600 hover:text-unda-teal text-sm font-semibold transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-unda-navy mb-8">Governance</h4>
              <ul className="space-y-4">
                <li><Link to="#" className="text-slate-600 hover:text-unda-teal text-sm font-semibold">Safeguarding</Link></li>
                <li><Link to="#" className="text-slate-600 hover:text-unda-teal text-sm font-semibold">Privacy Policy</Link></li>
                <li><Link to="#" className="text-slate-600 hover:text-unda-teal text-sm font-semibold">Referrals</Link></li>
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
                  <p className="text-sm font-black text-unda-navy uppercase tracking-tighter">The Coast Region</p>
                </div>
                <p className="text-[11px] text-slate-600 font-medium pl-6">Regional Outreach</p>
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
