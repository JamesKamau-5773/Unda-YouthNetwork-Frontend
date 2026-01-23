import React from 'react';
import PortalLayout from '../layout/PortalLayout';
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
    <PortalLayout title="Events & Training" subtitle="Connect with professionals and peers.">
        <div className="grid gap-4">
            {events.map((evt, idx) => (
                <GlassCard key={idx} className="p-5 rounded-2xl flex flex-col md:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-all group">
                    
                    {/* Date Block */}
                            <div className="h-16 w-16 bg-slate-50 text-slate-600 rounded-xl flex flex-col items-center justify-center font-bold flex-shrink-0 group-hover:bg-[#0B1E3B] group-hover:text-white transition-colors">
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
                             <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                                {evt.type === 'Physical' ? <MapPin size={12}/> : <Video size={12}/>}
                                {evt.type}
                             </span>
                        </div>
                                <h3 className="text-lg font-bold text-[#0B1E3B] dark:text-white truncate">{evt.title}</h3>
                        <div className="flex items-center justify-center md:justify-start gap-4 mt-1 text-xs text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><Users size={12}/> By {evt.host}</span>
                            <span className="flex items-center gap-1"><Clock size={12}/> {evt.time}</span>
                        </div>
                    </div>

                    <div className="w-full md:w-auto">
                        <Button 
                            className={`w-full md:w-auto rounded-xl font-bold text-xs h-10 px-6 ${evt.status === 'Waitlist' ? 'bg-slate-100 dark:bg-white/5 text-slate-400' : 'bg-gradient-to-r from-[#00C2CB] to-[#0090C0] text-white'}`}
                            disabled={evt.status === 'Waitlist'}
                        >
                            {evt.status === 'Waitlist' ? 'Waitlist Only' : 'Register Now'}
                        </Button>
                    </div>
                </GlassCard>
            ))}
        </div>
    </PortalLayout>
  );
};

export default Events;
