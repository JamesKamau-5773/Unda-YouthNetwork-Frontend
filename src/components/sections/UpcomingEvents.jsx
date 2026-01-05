import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, Lightbulb, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UpcomingEvents = () => {
  const events = [
    {
      title: "UMV Debaters Circle",
      date: "March 12, 2026",
      cta: "Register teams",
      link: "/debaters-circle",
      color: "teal"
    },
    {
      title: "UMV Campus Showcase — Nairobi",
      date: "April 4–5, 2026",
      cta: "Call for proposals open",
      link: "/campus",
      color: "yellow"
    },
    {
      title: "UMV Mtaani Community Gala — Nairobi",
      date: "May 21, 2026",
      cta: "Free entry, mental-health booths and performances",
      link: "/mtaani",
      color: "orange"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-unda-yellow/[0.03] blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 mb-6">
            <Calendar size={18} className="text-unda-teal" />
            <span className="text-xs font-black uppercase tracking-widest text-unda-navy">Coming Up</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-unda-navy mb-6 font-unda">
            Upcoming <span className="text-unda-teal">Events</span>
          </h2>
        </div>

        <div className="max-w-4xl space-y-6">
          {events.map((event, idx) => {
            const colorMap = {
              teal: 'border-unda-teal bg-unda-bg/30 hover:bg-white',
              yellow: 'border-unda-yellow bg-unda-bg/30 hover:bg-white',
              orange: 'border-unda-orange bg-unda-bg/30 hover:bg-white'
            };
            return (
              <div key={idx} className={`rounded-2xl p-8 border-l-4 ${colorMap[event.color]} transition-all hover:shadow-xl group`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-unda-navy mb-2">{event.title}</h3>
                    <p className="text-slate-600 font-medium mb-2">Date: {event.date}</p>
                    <p className="text-sm text-slate-500">{event.cta}</p>
                  </div>
                  <Button asChild className="bg-unda-navy text-white hover:bg-unda-teal group-hover:translate-x-1 transition-transform">
                    <Link to={event.link}>
                      Learn More <ArrowRight size={16} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
