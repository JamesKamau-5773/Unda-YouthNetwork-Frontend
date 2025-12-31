import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl px-8 py-4 flex items-center justify-between shadow-lg shadow-unda-navy/5">
        
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-unda-teal rounded-xl flex items-center justify-center text-white font-black text-xs">U</div>
          <span className="font-black text-unda-navy tracking-tighter text-xl">UNDA</span>
        </div>

        {/* Links: Modular & Clean */}
        <div className="hidden md:flex items-center gap-10">
          <a href="/" className="text-[10px] font-bold uppercase tracking-widest text-unda-navy/50 hover:text-unda-teal transition-colors">Home</a>
          <a href="/podcast" className="text-[10px] font-bold uppercase tracking-widest text-unda-navy/50 hover:text-unda-teal transition-colors">Podcast</a>
          <a href="/campus" className="text-[10px] font-bold uppercase tracking-widest text-unda-navy/50 hover:text-unda-teal transition-colors">Campus</a>
          <a href="/membership" className="text-[10px] font-bold uppercase tracking-widest text-unda-navy/50 hover:text-unda-teal transition-colors">Membership</a>
        </div>

        {/* Action Button: Gateway to Backend Portal */}
        <div className="flex items-center gap-4">
          <Link to="/portal">
            <Button variant="ghost" className="text-xs font-bold text-unda-navy">Portal</Button>
          </Link>
          <Button className="bg-unda-navy text-white text-xs font-bold px-6 py-2 rounded-2xl hover:bg-unda-teal">Join Now</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
