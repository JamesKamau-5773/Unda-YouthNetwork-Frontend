import React, { useState, useEffect } from 'react';
import PortalLayout from '../layout/PortalLayout';
import { Activity, Calendar, Trophy, ArrowRight, PlayCircle, Clock, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { profileService } from '@/services/apiService';

const ALL_INTERESTS = [
   'Mental Health', 'Peer Support', 'Events', 'Workshops', 'Certificates', 'Volunteer', 'Advocacy', 'Resources', 'Research'
];

const LoadingStat = () => (
    <div className="h-32 bg-slate-100 rounded-2xl animate-pulse"></div>
);

const MemberDashboard = () => {
   const [interests, setInterests] = useState([]);
   const [loadingInterests, setLoadingInterests] = useState(false);
   const [saving, setSaving] = useState(false);
   const [msg, setMsg] = useState('');
   const [err, setErr] = useState('');

   useEffect(() => {
      let mounted = true;
      const load = async () => {
         setLoadingInterests(true);
         try {
            const res = await profileService.getProfile();
            if (!mounted) return;
            const profile = res.data || {};
            setInterests(Array.isArray(profile.interests) ? profile.interests : []);
         } catch (e) {
            console.debug('Could not load profile interests', e);
         } finally {
            if (mounted) setLoadingInterests(false);
         }
      };
      load();
      return () => { mounted = false; };
   }, []);

   const toggleInterest = (item) => {
      setMsg(''); setErr('');
      setInterests(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
   };

   const saveInterests = async () => {
      setSaving(true); setMsg(''); setErr('');
      try {
         await profileService.updateProfile({ interests });
         setMsg('Interests saved.');
      } catch (e) {
         console.error('Save interests error', e);
         setErr('Unable to save interests. Please try again.');
      } finally {
         setSaving(false);
      }
   };
  return (
    <PortalLayout 
      title="Dashboard" 
      subtitle="Overview of your activity and progress."
    >
         <div className="flex justify-end mb-4">
             <Button asChild className="bg-white text-unda-navy hover:bg-slate-100 rounded-xl h-10 px-4 font-bold">
                <Link to="/">Back to Home</Link>
             </Button>
         </div>
      
        {/* 1. Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Wellness Streak */}
          <div className="bg-gradient-to-br from-[#E0F7FA] to-white p-6 rounded-2xl shadow-lg border border-[#00C2CB]/10 hover:border-[#00C2CB]/40 hover:shadow-xl transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-green-50 text-green-600 rounded-xl group-hover:scale-110 transition-transform">
                   <Activity size={20} />
                </div>
                <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  +2 this week
                </span>
             </div>
             <div>
                <span className="text-3xl font-black text-[#0B1E3B] tracking-tight">12</span>
                <p className="text-sm font-semibold text-slate-500">Week Streak</p>
             </div>
          </div>

          {/* Sessions Attended */}
          <div className="bg-gradient-to-br from-[#FFFDE4] to-white p-6 rounded-2xl shadow-lg border border-[#0090C0]/10 hover:border-[#0090C0]/40 hover:shadow-xl transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl group-hover:scale-110 transition-transform">
                   <Calendar size={20} />
                </div>
             </div>
             <div>
                <span className="text-3xl font-black text-[#0B1E3B] tracking-tight">5</span>
                <p className="text-sm font-semibold text-slate-500">Sessions Attended</p>
             </div>
          </div>

          {/* Certificate Status */}
          <div className="bg-gradient-to-br from-[#FFF8E1] to-white p-6 rounded-2xl shadow-lg border border-amber-400/10 hover:border-amber-400/40 hover:shadow-xl transition-all group">
             <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 transition-transform">
                   <Trophy size={20} />
                </div>
                <Link to="/member/certificate" className="text-xs font-bold text-amber-600 hover:underline">View</Link>
             </div>
             <div>
                <span className="text-lg font-black text-[#0B1E3B] tracking-tight flex items-center gap-2">
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
            <div className="lg:col-span-2 bg-gradient-to-br from-[#07142a] to-[#0B2436] rounded-2xl p-8 text-white shadow-2xl flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-72 h-72 bg-[#00C2CB]/6 rounded-full blur-[60px] pointer-events-none" />
               <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#6b21a8]/8 rounded-full blur-[48px] pointer-events-none" />
               
               <div className="relative z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold text-teal-300 mb-4 border border-white/5">
                    <Clock size={12} /> Pending Action
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white">Weekly Wellness Check-In</h2>
                  <p className="text-white text-sm md:text-base mb-8 max-w-lg leading-relaxed">
                     It's that time of the week! Take a moment to reflect on your journey. Your input helps us tailor the program to your needs.
                  </p>
                  
                  <div className="flex gap-4 items-center">
                     <Button asChild className="bg-[#00E5FF] text-[#0B1E3B] hover:bg-[#00C2CB] border-0 rounded-xl h-12 px-6 font-bold shadow-lg shadow-[#00C2CB]/20">
                        <Link to="/checkin">Start Check-In</Link>
                     </Button>
                     <Link to="/member/check-in" className="inline-flex items-center gap-2 text-sm font-bold text-white/90 hover:underline">
                        Learn More <ChevronRight size={14} />
                     </Link>
                  </div>
               </div>
            </div>

            {/* SIDE: Upcoming Event */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-[#0B1E3B] text-sm uppercase tracking-wide">Next Event</h3>
                    <Link to="/member/events" className="text-xs font-bold text-[#00C2CB] hover:underline">View All</Link>
                </div>
                
                <div className="flex-1 flex flex-col justify-center space-y-4">
                    <div className="flex gap-4 items-start">
                        <div className="flex flex-col items-center bg-slate-50 border border-slate-100 rounded-xl p-2 min-w-[3.5rem]">
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Jan</span>
                            <span className="text-xl font-black text-[#0B1E3B]">14</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-[#0B1E3B] leading-tight">Resilience Masterclass: Overcoming Academic Stress</h4>
                            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-medium">
                                <Clock size={12} />
                                <span>10:00 AM - 11:30 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                   <Button asChild className="w-full mt-4 bg-slate-900 text-white hover:bg-slate-800 rounded-xl h-10 font-bold text-sm">
                      <Link to="/member/events">RSVP to Attend</Link>
                   </Button>
            </div>
        </div>

        {/* 3. Resources Row */}
        <div className="pt-2">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0B1E3B] text-lg">Recommended</h3>
              <Link to="/resources" className="group flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#00C2CB]">
                 Browse Library <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[].map((item, i) => (
                 <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group cursor-pointer items-center">
                    <div className="h-12 w-12 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                       <PlayCircle size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="text-sm font-bold text-[#0B1E3B] truncate mb-0.5">{item.title}</h4>
                       <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                          <span className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600">{item.type}</span>
                          <span>{item.duration}</span>
                       </div>
                    </div>

                  {/* 4. Interests (Member input) */}
                  <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                           <h3 className="font-bold text-[#0B1E3B] text-lg">Your Interests</h3>
                           <p className="text-sm text-slate-500">Select topics you're interested in</p>
                      </div>

                      {loadingInterests ? (
                         <div className="h-12 bg-slate-100 rounded-lg animate-pulse" />
                      ) : (
                         <div className="space-y-4">
                            <div className="flex flex-wrap gap-3">
                               {ALL_INTERESTS.map((it) => {
                                  const active = interests.includes(it);
                                  return (
                                     <button
                                        key={it}
                                        type="button"
                                        onClick={() => toggleInterest(it)}
                                        className={`px-3 py-1.5 rounded-full text-sm font-bold border ${active ? 'bg-unda-navy text-white border-unda-navy' : 'bg-slate-50 text-slate-700 border-slate-200'}`}
                                     >
                                        {it}
                                     </button>
                                  );
                               })}
                            </div>

                            <div className="flex items-center gap-3">
                               <Button onClick={saveInterests} disabled={saving} className="h-10 rounded-xl">{saving ? 'Saving...' : 'Save Interests'}</Button>
                               {msg && <div className="text-sm text-green-600 font-medium">{msg}</div>}
                               {err && <div className="text-sm text-red-600 font-medium">{err}</div>}
                            </div>
                         </div>
                      )}
                  </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-[#0B1E3B]" />
                 </div>
              ))}
           </div>
        </div>

    </PortalLayout>
  );
};

export default MemberDashboard;
