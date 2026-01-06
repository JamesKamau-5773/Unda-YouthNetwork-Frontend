import React from 'react';
import PortalLayout from '../layout/PortalLayout';
import { Activity, Calendar, Trophy, ArrowRight, PlayCircle, Clock, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const LoadingStat = () => (
    <div className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
);

const MemberDashboard = () => {
  return (
    <PortalLayout 
      title="Dashboard" 
      subtitle="Overview of your activity and progress."
    >
      
        {/* 1. Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wellness Streak */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-unda-teal/30 hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
                   <Activity size={20} />
                </div>
                <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +2 this week
                </span>
             </div>
             <div>
                <span className="text-3xl font-black text-unda-navy tracking-tight">12</span>
                <p className="text-sm font-semibold text-slate-500">Week Streak</p>
             </div>
          </div>

          {/* Sessions Attended */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-unda-orange/30 hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                   <Calendar size={20} />
                </div>
             </div>
             <div>
                <span className="text-3xl font-black text-unda-navy tracking-tight">5</span>
                <p className="text-sm font-semibold text-slate-500">Sessions Attended</p>
             </div>
          </div>

          {/* Certificate Status */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-amber-400/30 hover:shadow-md transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                   <Trophy size={20} />
                </div>
                <Link to="/member/certificate" className="text-xs font-bold text-amber-600 hover:underline">View</Link>
             </div>
             <div>
                <span className="text-lg font-black text-unda-navy tracking-tight flex items-center gap-2">
                   Active Member
                   <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </span>
                <p className="text-sm font-semibold text-slate-500">Gold Tier</p>
             </div>
          </div>
        </div>

        {/* 2. Main Action Area */}
        <div className="grid lg:grid-cols-3 gap-6 h-full">
            
            {/* LARGE: Action Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-2xl p-8 text-white shadow-xl shadow-slate-200/50 flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-80 h-80 bg-unda-teal/10 rounded-full blur-[100px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />
               
               <div className="relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-teal-300 mb-4 border border-white/5">
                    <Clock size={12} /> Pending Action
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">Weekly Wellness Check-In</h2>
                  <p className="text-slate-300 text-sm md:text-base mb-8 max-w-lg leading-relaxed">
                     It's that time of the week! Take a moment to reflect on your journey. Your input helps us tailor the program to your needs.
                  </p>
                  
                  <div className="flex gap-4">
                     <Button asChild className="bg-unda-teal text-white hover:bg-teal-500 border-0 rounded-xl h-12 px-6 font-bold shadow-lg shadow-teal-900/20">
                        <Link to="/member/check-in">
                           Start Check-In
                        </Link>
                     </Button>
                  </div>
               </div>
            </div>

            {/* SIDE: Upcoming Event */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-unda-navy text-sm uppercase tracking-wide">Next Event</h3>
                    <Link to="/member/events" className="text-xs font-bold text-unda-teal hover:underline">View All</Link>
                </div>
                
                <div className="flex-1 flex flex-col justify-center space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="flex flex-col items-center bg-slate-50 border border-slate-100 rounded-xl p-2 min-w-[3.5rem]">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Jan</span>
                            <span className="text-xl font-black text-unda-navy">14</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-unda-navy leading-tight">Resilience Masterclass: Overcoming Academic Stress</h4>
                            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-medium">
                                <Clock size={12} />
                                <span>10:00 AM - 11:30 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <Button className="w-full mt-4 bg-slate-900 text-white hover:bg-slate-800 rounded-xl h-10 font-bold text-sm">
                   RSVP to Attend
                </Button>
            </div>
        </div>

        {/* 3. Resources Row */}
        <div className="pt-2">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-unda-navy text-lg">Recommended</h3>
              <Link to="/resources" className="group flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-unda-teal">
                 Browse Library <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                  { title: "Understanding Anxiety Triggers", duration: "12 mins", type: "Video" },
                  { title: "Building Daily Habits", duration: "5 mins", type: "Article" },
                  { title: "Mental Health First Aid", duration: "45 mins", type: "Webinar" }
              ].map((item, i) => (
                 <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group cursor-pointer items-center">
                    <div className="h-12 w-12 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                       <PlayCircle size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="text-sm font-bold text-unda-navy truncate mb-0.5">{item.title}</h4>
                       <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">{item.type}</span>
                          <span>{item.duration}</span>
                       </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-unda-navy" />
                 </div>
              ))}
           </div>
        </div>

    </PortalLayout>
  );
};

export default MemberDashboard;
