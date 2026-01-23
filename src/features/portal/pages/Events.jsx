import React from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import { Calendar, MapPin, Video, Users, Clock, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

const Events = () => {
    const events = [
        {
            title: "Q1 Pro-Bono Therapy Session",
            type: "Virtual",
            category: "Wellness",
            date: "Jan 14, 2026",
            time: "10:00 AM - 12:00 PM",
            host: "Dr. Amani",
            status: "Open"
        },
        {
            title: "Mtaani Peer Workshop",
            type: "Physical",
            category: "Training",
            location: "Kibera Community Hall",
            date: "Feb 02, 2026",
            time: "2:00 PM - 5:00 PM",
            host: "Local Champions",
            status: "Waitlist"
        },
        {
            title: "Digital Resilience Webinar",
            type: "Webinar",
            category: "Education",
            date: "Feb 15, 2026",
            time: "6:00 PM - 7:30 PM",
            host: "Unda Tech Team",
            status: "Upcoming"
        }
    ];

    return (
        <DashboardLayout headerContent={(
            <div className="max-w-7xl mx-auto px-6">
                <div className="rounded-3xl bg-white p-6 md:px-8 md:py-4 shadow-[0_20px_50px_rgba(0,194,203,0.08)] border border-[#00C2CB]/10">
                    <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-[#0B1E3B]">Events & Training</h2>
                    <p className="text-sm text-[#334155] mt-1">Connect with professionals and peers.</p>
                </div>
            </div>
        )}>
        <div className="grid gap-4">
            {events.map((evt, idx) => (
                <GlassCard key={idx} className="p-5 rounded-2xl flex flex-col md:flex-row items-center gap-6 glow-teal-sm hover:glow-teal transition-all group">
                    
                    {/* Date Block */}
                            <div className="h-16 w-16 bg-[#F0F7FF] text-[#0B1E3B] rounded-xl flex flex-col items-center justify-center font-bold flex-shrink-0 group-hover:bg-[#00C2CB] group-hover:text-white transition-colors">
                                <span className="text-xl leading-none">{evt.date.split(' ')[1].replace(',','')}</span>
                                <span className="text-[10px] uppercase tracking-wide">{evt.date.split(' ')[0]}</span>
                            </div>

                    <div className="flex-1 text-center md:text-left min-w-0 w-full">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5 flex-wrap">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                                evt.category === 'Wellness' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                                evt.category === 'Training' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                'bg-blue-50 text-blue-600 border-blue-100'
                            }`}>
                                {evt.category}
                            </span>
                                      <span className="text-[11px] text-[#334155] font-medium flex items-center gap-1">
                                {evt.type === 'Physical' ? <MapPin size={12}/> : <Video size={12}/>}
                                {evt.type}
                             </span>
                        </div>
                                <h3 className="text-lg font-bold text-[#1e293b] dark:text-white truncate">{evt.title}</h3>
                        <div className="flex items-center justify-center md:justify-start gap-4 mt-1 text-xs text-[#334155] font-medium">
                            <span className="flex items-center gap-1"><Users size={12}/> By {evt.host}</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> {evt.time}</span>
                        </div>
                    </div>

                    <div className="w-full md:w-auto">
                        <Button 
                            className={`w-full md:w-auto rounded-xl font-bold text-xs h-10 px-6 ${evt.status === 'Waitlist' ? 'bg-[#F0F7FF] text-[#334155]' : 'bg-gradient-to-r from-[#00C2CB] to-[#0090C0] text-white'}`}
                            disabled={evt.status === 'Waitlist'}
                        >
                            {evt.status === 'Waitlist' ? 'Waitlist Only' : 'Register Now'}
                        </Button>
                    </div>
                </GlassCard>
            ))}
                </div>
        </DashboardLayout>
  );
};

export default Events;
