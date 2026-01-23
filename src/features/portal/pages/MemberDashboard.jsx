import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight, Activity, Zap, BarChart3 } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';

// Styled Action Button
const ActionButton = ({ children, className = '', ...props }) => (
   <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#00C2CB] hover:bg-[#0097A7] shadow-lg shadow-[#00C2CB]/20 transition-transform hover:-translate-y-0.5 ${className}`}
      {...props}
   >
      {children}
   </button>
);

const MemberDashboard = () => {
   return (
      <DashboardLayout headerContent={(
         // HERO SECTION: Full Width
         <div className="rounded-[2.5rem] bg-[#E0F7FA] p-8 md:p-10 shadow-sm border border-[#B2EBF2]/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
               
               {/* Welcome Text */}
               <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-4xl font-black text-[#0B1E3B] tracking-tight">Welcome back, Champion</h1>
                  <p className="mt-2 text-[#006064] text-lg font-medium">Here is your wellness snapshot for today.</p>
                  
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                     <ActionButton>Start Check-In</ActionButton>
                     <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#00838F] bg-white hover:bg-[#F0FDFF] border border-[#B2EBF2] transition-colors">
                        View Resources
                     </button>
                  </div>
               </div>

               {/* Streak Stats (Floating Glass Pill) */}
               <div className="flex items-center gap-8 bg-white/60 backdrop-blur-sm px-8 py-6 rounded-3xl border border-white/60 shadow-sm min-w-fit">
                  <div className="text-center">
                     <div className="text-xs font-bold text-[#00838F] uppercase tracking-wider mb-1">Streak</div>
                     <div className="text-3xl font-black text-[#0B1E3B]">7 <span className="text-2xl">🔥</span></div>
                  </div>
                  <div className="w-px h-12 bg-[#B2EBF2]" />
                  <div className="text-center">
                     <div className="text-xs font-bold text-[#00838F] uppercase tracking-wider mb-1">Points</div>
                     <div className="text-3xl font-black text-[#0B1E3B]">1,240</div>
                  </div>
               </div>
            </div>
         </div>
      )}>

         {/* MAIN GRID: Perfectly Aligned 4 Columns */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* CARD 1: SESSIONS */}
            <div className="bg-white border border-[#E0F7FA] p-6 rounded-[2rem] hover:border-[#B2EBF2] transition-colors shadow-sm flex flex-col justify-between h-full min-h-[180px]">
               <div className="flex justify-between items-start">
                  <span className="font-bold text-[#00838F] text-xs uppercase tracking-wider">Sessions</span>
                  <div className="p-2 bg-[#F0FDFF] rounded-lg text-[#00ACC1]">
                     <BarChart3 size={20} />
                  </div>
               </div>
               <div>
                  <div className="text-[#0B1E3B] text-4xl font-black mt-2">12</div>
                  <span className="text-xs text-[#00838F] font-bold opacity-80 mt-1 block">This month</span>
               </div>
            </div>

            {/* CARD 2: MOOD */}
            <div className="bg-white border border-[#E0F7FA] p-6 rounded-[2rem] hover:border-[#B2EBF2] transition-colors shadow-sm flex flex-col justify-between h-full min-h-[180px]">
               <div className="flex justify-between items-start">
                  <span className="font-bold text-[#00838F] text-xs uppercase tracking-wider">Avg Mood</span>
                  <div className="p-2 bg-[#F0FDFF] rounded-lg text-[#00ACC1]">
                     <Activity size={20} />
                  </div>
               </div>
               <div>
                  <div className="text-[#0B1E3B] text-4xl font-black mt-2">Good</div>
                  <span className="text-xs text-[#00838F] font-bold opacity-80 mt-1 block">Stable trend</span>
               </div>
            </div>

            {/* CARD 3: CHALLENGES */}
            <div className="bg-white border border-[#E0F7FA] p-6 rounded-[2rem] hover:border-[#B2EBF2] transition-colors shadow-sm flex flex-col justify-between h-full min-h-[180px]">
               <div className="flex justify-between items-start">
                  <span className="font-bold text-[#00838F] text-xs uppercase tracking-wider">Active</span>
                  <div className="p-2 bg-[#F0FDFF] rounded-lg text-[#00ACC1]">
                     <Zap size={20} fill="currentColor" />
                  </div>
               </div>
               <div>
                  <div className="text-[#0B1E3B] text-4xl font-black mt-2">3</div>
                  <div className="w-full bg-[#E0F7FA] h-1.5 rounded-full mt-3">
                     <div className="bg-[#00ACC1] h-1.5 rounded-full w-3/5"></div>
                  </div>
               </div>
            </div>

            {/* CARD 4: NEXT EVENT (Interactive) */}
            <div className="bg-white border-2 border-[#E0F7FA] p-5 rounded-[2rem] shadow-sm hover:border-[#00ACC1] transition-colors h-full flex flex-col">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-[#0B1E3B] text-sm">Next Event</h3>
                  <Link to="/member/events" className="text-[10px] font-bold text-[#00ACC1] hover:underline uppercase">View All</Link>
               </div>
               
               {/* Event Pill */}
               <div className="mt-auto bg-[#F0FDFF] p-3 rounded-xl flex items-center gap-3 border border-[#E0F7FA]">
                  <div className="text-center min-w-[36px] bg-white rounded-lg py-1 shadow-sm">
                     <span className="block text-[8px] font-bold text-[#00838F] uppercase">TOM</span>
                     <span className="block text-sm font-black text-[#0B1E3B] leading-none">16</span>
                  </div>
                  <div className="min-w-0">
                     <p className="font-bold text-[#0B1E3B] text-xs truncate">Peer Support</p>
                     <p className="text-[10px] text-[#00838F] font-bold">16:00 - 17:00</p>
                  </div>
               </div>
               
               <button className="w-full mt-3 py-2.5 bg-[#00ACC1] text-white font-bold rounded-xl text-xs hover:bg-[#0097A7] transition-colors flex items-center justify-center gap-1">
                  Join <ArrowRight size={14} />
               </button>
            </div>

         </div>

      </DashboardLayout>
   );
};

export default MemberDashboard;