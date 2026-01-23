import React from 'react';
import { Activity, Zap, Calendar, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  return (
    // Main Container with Top Padding to separate from Navbar
    <div className="w-full max-w-7xl mx-auto px-6 pt-8 pb-20">
      
      {/* --- ROW 1: WELCOME CARD (Full Width) --- */}
      {/* Aligned perfectly with the grid below */}
      <div className="w-full bg-[#E0F7FA] rounded-[2.5rem] p-10 mb-8 shadow-sm border border-[#B2EBF2]/30 flex flex-col md:flex-row justify-between items-center gap-8">
         
         {/* Left: Text & Buttons */}
         <div className="flex-1">
            <h1 className="text-4xl font-extrabold text-[#0B1E3B] mb-3 tracking-tight">
               Welcome back, Champion
            </h1>
            <p className="text-[#006064] text-lg mb-8 font-medium max-w-xl">
               Here is your wellness snapshot and upcoming activities.
            </p>
            
            <div className="flex gap-4">
               <button className="px-8 py-3 bg-[#00ACC1] hover:bg-[#0097A7] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2">
                  Start Check-In
               </button>
               <button className="px-8 py-3 bg-white text-[#00838F] font-bold rounded-full shadow-sm hover:bg-white/80 transition-colors">
                  View Resources
               </button>
            </div>
         </div>

         {/* Right: Streak Stats (On White Glass) */}
         <div className="bg-white/60 backdrop-blur-md px-10 py-6 rounded-3xl border border-white/50 flex items-center gap-10 shadow-sm">
            <div className="text-center">
               <span className="block text-xs font-bold text-[#00838F] uppercase tracking-wider mb-1">Streak</span>
               <div className="flex items-center gap-1">
                  <span className="text-4xl font-black text-[#0B1E3B]">7</span>
                  <span className="text-2xl">🔥</span>
               </div>
            </div>
            <div className="w-px h-12 bg-[#B2EBF2]"></div>
            <div className="text-center">
               <span className="block text-xs font-bold text-[#00838F] uppercase tracking-wider mb-1">Points</span>
               <span className="text-4xl font-black text-[#0B1E3B]">1,240</span>
            </div>
         </div>
      </div>

      {/* --- ROW 2: METRICS GRID (Strict 4-Column Layout) --- */}
      {/* gap-6 ensures even spacing between all cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         
         {/* 1. Sessions Card */}
         <div className="bg-white border border-[#E0F7FA] p-8 rounded-[2rem] hover:border-[#B2EBF2] transition-colors shadow-sm h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <span className="font-bold text-[#00838F] text-sm uppercase">Sessions</span>
               <Activity size={20} className="text-[#00ACC1]" />
            </div>
            <div>
               <span className="block text-5xl font-black text-[#0B1E3B] mb-1">12</span>
               <span className="text-xs text-slate-400 font-bold">This Month</span>
            </div>
         </div>

         {/* 2. Mood Card */}
         <div className="bg-white border border-[#E0F7FA] p-8 rounded-[2rem] hover:border-[#B2EBF2] transition-colors shadow-sm h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <span className="font-bold text-[#00838F] text-sm uppercase">Avg Mood</span>
               <span className="text-xl">🙂</span>
            </div>
            <div className="flex items-center gap-2">
               <span className="block text-4xl font-black text-[#0B1E3B]">Good</span>
               <span className="text-3xl">😊</span>
            </div>
         </div>

         {/* 3. Challenges Card */}
         <div className="bg-white border border-[#E0F7FA] p-8 rounded-[2rem] hover:border-[#B2EBF2] transition-colors shadow-sm h-full flex flex-col justify-between">
            <div className="flex justify-between items-start">
               <span className="font-bold text-[#00838F] text-sm uppercase">Active</span>
               <Zap size={20} className="text-[#00ACC1]" fill="currentColor" />
            </div>
            <div>
               <span className="block text-5xl font-black text-[#0B1E3B] mb-1">3</span>
               <div className="w-full bg-[#E0F7FA] h-1.5 rounded-full mt-2">
                  <div className="bg-[#00ACC1] h-1.5 rounded-full w-3/5"></div>
               </div>
            </div>
         </div>

         {/* 4. Events Card (Matches the other 3 perfectly) */}
         <div className="bg-white border-2 border-[#E0F7FA] p-6 rounded-[2rem] shadow-sm h-full flex flex-col relative overflow-hidden group hover:border-[#00ACC1] transition-colors">
            <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-[#0B1E3B]">Next Event</h3>
               <button className="text-xs font-bold text-[#00ACC1] hover:underline">See All</button>
            </div>
            
            <div className="mt-auto bg-[#F0FDFF] p-4 rounded-2xl flex items-center gap-3">
               <div className="text-center min-w-[40px]">
                  <span className="block text-[10px] font-bold text-[#00838F] uppercase">TOM</span>
                  <span className="block text-lg font-black text-[#0B1E3B]">16</span>
               </div>
               <div>
                  <p className="font-bold text-[#0B1E3B] text-sm leading-tight">Peer Support</p>
                  <p className="text-[10px] text-[#00838F] font-bold uppercase mt-0.5">16:00 - 17:00</p>
               </div>
            </div>
            
            <button className="w-full mt-3 py-2 bg-[#00ACC1] text-white font-bold rounded-xl text-xs hover:bg-[#0097A7] transition-colors">
               Add Event
            </button>
         </div>

      </div>
    </div>
  );
};

export default Dashboard;