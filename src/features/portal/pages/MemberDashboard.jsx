import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight, Activity, Zap, BarChart3 } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import { eventService } from '@/services/workstreamService';

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
   const [nextEvent, setNextEvent] = useState(null);
   const [loadingEvent, setLoadingEvent] = useState(true);

   useEffect(() => {
      const fetchNextEvent = async () => {
         setLoadingEvent(true);
         try {
            const data = await eventService.getUpcoming();
            setNextEvent(data?.length ? data[0] : null);
         } catch (err) {
            console.error('Failed to fetch next event:', err);
            setNextEvent(null);
         } finally {
            setLoadingEvent(false);
         }
      };
      fetchNextEvent();
   }, []);

   const resolveEventDate = (event) => {
      const raw = event?.event_date || event?.date;
      if (!raw) return { day: '--', month: '--' };
      const parsed = new Date(raw);
      if (Number.isNaN(parsed.getTime())) return { day: '--', month: '--' };
      return {
         day: parsed.getDate().toString(),
         month: parsed.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
      };
   };

   const resolveEventTime = (event) => {
      const dateValue = event?.event_date || event?.date;
      if (!dateValue) return 'Time TBA';
      const parsed = new Date(dateValue);
      if (Number.isNaN(parsed.getTime())) return 'Time TBA';
      return parsed.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
   };

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
                     <Link to="/member/check-in/start" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#00C2CB] hover:bg-[#0097A7] shadow-lg shadow-[#00C2CB]/20 transition-transform hover:-translate-y-0.5">
                        Start Check-In
                     </Link>
                     <Link to="/member/check-in" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#00838F] bg-white hover:bg-[#F0FDFF] border border-[#B2EBF2] transition-colors">
                        Learn More
                     </Link>
                  </div>
               </div>

               {/* Streak Stats (Floating Glass Pill) */}
               <div className="flex items-center gap-8 bg-white/60 backdrop-blur-sm px-8 py-6 rounded-3xl border border-white/60 shadow-sm min-w-fit">
                  <div className="text-center">
                     <div className="text-xs font-bold text-[#00838F] uppercase tracking-wider mb-1">Streak</div>
                     <div className="text-3xl font-black text-[#0B1E3B]">0</div>
                  </div>
                  <div className="w-px h-12 bg-[#B2EBF2]" />
                  <div className="text-center">
                     <div className="text-xs font-bold text-[#00838F] uppercase tracking-wider mb-1">Points</div>
                     <div className="text-3xl font-black text-[#0B1E3B]">0</div>
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
                  <div className="text-[#0B1E3B] text-4xl font-black mt-2">0</div>
                  <span className="text-xs text-[#00838F] font-bold opacity-80 mt-1 block">No data yet</span>
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
                  <div className="text-[#0B1E3B] text-4xl font-black mt-2">0</div>
                  <span className="text-xs text-[#00838F] font-bold opacity-80 mt-1 block">No data yet</span>
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
                  <div className="text-[#0B1E3B] text-4xl font-black mt-2">0</div>
                  <div className="w-full bg-[#E0F7FA] h-1.5 rounded-full mt-3" />
               </div>
            </div>

            {/* CARD 4: NEXT EVENT (Interactive) */}
            <div className="bg-white border-2 border-[#E0F7FA] p-5 rounded-[2rem] shadow-sm hover:border-[#00ACC1] transition-colors h-full flex flex-col">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-[#0B1E3B] text-sm">Next Event</h3>
                  <Link to="/member/events" className="text-[10px] font-bold text-[#00ACC1] hover:underline uppercase">View All</Link>
               </div>
               
               {loadingEvent ? (
                  <div className="mt-auto bg-[#F0FDFF] p-3 rounded-xl border border-[#E0F7FA] text-center text-xs font-bold text-[#00838F]">
                     Loading event...
                  </div>
               ) : nextEvent ? (
                  <>
                     <div className="mt-auto bg-[#F0FDFF] p-3 rounded-xl flex items-center gap-3 border border-[#E0F7FA]">
                        <div className="text-center min-w-[36px] bg-white rounded-lg py-1 shadow-sm">
                           <span className="block text-[8px] font-bold text-[#00838F] uppercase">{resolveEventDate(nextEvent).month}</span>
                           <span className="block text-sm font-black text-[#0B1E3B] leading-none">{resolveEventDate(nextEvent).day}</span>
                        </div>
                        <div className="min-w-0">
                           <p className="font-bold text-[#0B1E3B] text-xs truncate">{nextEvent.title || 'Upcoming Event'}</p>
                           <p className="text-[10px] text-[#00838F] font-bold">{resolveEventTime(nextEvent)}</p>
                        </div>
                     </div>
                     <button
                        onClick={() => { window.location.href = '/member/events?autoRegister=1&index=0'; }}
                        className="w-full mt-3 py-2.5 bg-[#00ACC1] text-white font-bold rounded-xl text-xs hover:bg-[#0097A7] transition-colors flex items-center justify-center gap-1"
                     >
                        Join <ArrowRight size={14} />
                     </button>
                  </>
               ) : (
                  <div className="mt-auto bg-[#F0FDFF] p-3 rounded-xl border border-[#E0F7FA] text-center text-xs font-bold text-[#00838F]">
                     No upcoming events
                  </div>
               )}
            </div>

         </div>

      </DashboardLayout>
   );
};

export default MemberDashboard;