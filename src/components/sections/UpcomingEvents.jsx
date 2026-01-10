import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const UpcomingEvents = () => {
  const events = [
    {
      title: "Unda Mind Vibes Debaters",
      description: "March 12, 2026 — Register teams",
      link: "/debaters-circle",
      color: "border-[#00C2CB]"
    },
    {
      title: "Unda Mind Vibes Campus Showcase — Kenya",
      description: "April 4–5, 2026 — Roll out Mental health forums",
      link: "/campus",
      color: "border-[#0090C0]"
    },
    {
      title: "Unda Mind Vibes Mtaani Community Gala — Kenya",
      description: "May 21, 2026 — Free entry, mental-health booths and performances",
      link: "/mtaani",
      color: "border-[#00C2CB]"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-[#0B1E3B] text-center mb-16 font-unda">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => (
            <Link
              key={idx}
              to={event.link}
              className={`p-8 border-t-4 ${event.color} bg-[#F9FAFB]/30 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer`}
            >
              <div className="text-[#00C2CB] mb-4 group-hover:scale-110 transition-transform">
                <Calendar size={32} />
              </div>
              <h4 className="font-bold text-[#0B1E3B] mb-2">{event.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {event.description}
              </p>
              <div className="flex items-center text-[10px] font-bold uppercase text-[#00C2CB] opacity-0 group-hover:opacity-100 transition-opacity">
                Learn More <ArrowRight size={12} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
