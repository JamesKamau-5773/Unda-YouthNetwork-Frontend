import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Calendar, Users, Activity } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const ActionButton = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#00C2CB] to-[#0090C0] shadow-lg shadow-[#00C2CB]/20 transition-transform hover:-translate-y-0.5 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const FloatingConsole = () => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-4xl w-full px-4">
      <div className="mx-auto rounded-full max-w-4xl backdrop-blur-md bg-[#0B1E3B]/80 border border-white/10 px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
            <img src="/assets/logos/unda-logo-main.jpg" alt="Unda" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-white font-extrabold tracking-tight">Unda</div>
            <div className="text-[10px] text-[#94A3B8] -mt-0.5">Youth Portal</div>
          </div>
        </div>

        {/* Center Links */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/member/dashboard" className="text-[#94A3B8] hover:text-white uppercase text-[12px] font-semibold tracking-wide">
            Home
          </Link>
          <Link to="/member/check-in" className="text-[#94A3B8] hover:text-[#00C2CB] uppercase text-[12px] font-semibold tracking-wide">
            Wellness
          </Link>
          <Link to="/member/events" className="text-[#94A3B8] hover:text-[#00C2CB] uppercase text-[12px] font-semibold tracking-wide">
            Events
          </Link>
        </div>

        {/* Profile / actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full text-[#94A3B8] hover:text-white hover:bg-white/5 transition-colors">
            <Bell size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="text-right mr-2">
              <div className="text-white text-sm font-bold">Member</div>
              <div className="text-[11px] text-[#94A3B8]">Champion</div>
            </div>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#00C2CB] to-[#0090C0] flex items-center justify-center text-white font-bold">JD</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#061225] text-[#94A3B8]">
      <FloatingConsole />

      <main className="max-w-7xl mx-auto pt-32 px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Hero / Welcome */}
          <div className="col-span-12">
            <GlassCard className="p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white">Welcome back, Champion</h1>
                  <p className="mt-2 text-[#94A3B8]">Here's your wellness snapshot and upcoming activities.</p>
                  <div className="mt-4 flex items-center gap-3">
                    <ActionButton>Start Check-In</ActionButton>
                    <ActionButton className="bg-white/5 text-white shadow-none">View Resources</ActionButton>
                  </div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="text-right">
                    <div className="text-sm text-[#94A3B8]">Streak</div>
                    <div className="text-white text-3xl font-extrabold">7 🔥</div>
                  </div>
                  <div className="w-px h-12 bg-[#0090C0]/20" />
                  <div className="text-right">
                    <div className="text-sm text-[#94A3B8]">Points</div>
                    <div className="text-white text-3xl font-extrabold">1,240</div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Stats row */}
          <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <GlassCard>
              <div>
                <div className="text-sm text-[#94A3B8]">Sessions this month</div>
                <div className="text-white text-2xl font-bold mt-2">12</div>
              </div>
            </GlassCard>

            <GlassCard>
              <div>
                <div className="text-sm text-[#94A3B8]">Average mood</div>
                <div className="text-white text-2xl font-bold mt-2">Good 😊</div>
              </div>
            </GlassCard>

            <GlassCard>
              <div>
                <div className="text-sm text-[#94A3B8]">Active challenges</div>
                <div className="text-white text-2xl font-bold mt-2">3</div>
              </div>
            </GlassCard>
          </div>

          {/* Side events */}
          <div className="col-span-12 md:col-span-4">
            <GlassCard className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#94A3B8]">Upcoming Events</div>
                  <div className="text-white font-bold">Next 7 days</div>
                </div>
                <Link to="/member/events" className="text-[#00C2CB] font-semibold">See all</Link>
              </div>

              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-white"><Calendar size={18} /></div>
                  <div>
                    <div className="text-white font-semibold">Peer Support Group</div>
                    <div className="text-sm text-[#94A3B8]">Tomorrow · 16:00</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 text-white"><Users size={18} /></div>
                  <div>
                    <div className="text-white font-semibold">Community Meetup</div>
                    <div className="text-sm text-[#94A3B8]">Fri · 18:00</div>
                  </div>
                </li>
              </ul>

              <div className="mt-2">
                <ActionButton className="w-full justify-center">Add Event</ActionButton>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
