import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { eventService } from '@/services/workstreamService';

const UpcomingEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const resolveEventLink = (event) => {
    if (event?.link) return event.link;
    const raw = event?.event_type || event?.category || event?.slug || event?.title || '';
    const normalized = raw.toString().toLowerCase();
    if (normalized.includes('podcast')) return '/podcast';
    if (normalized.includes('debaters') || normalized.includes('debate')) return '/debaters-circle';
    if (normalized.includes('campus')) return '/campus';
    if (normalized.includes('mtaani') || normalized.includes('baraza')) return '/mtaani';
    if (normalized.includes('annual') && normalized.includes('conference')) return '/programs/annual-conference';
    if (normalized.includes('global') || normalized.includes('international')) return '/programs/global';
    return null;
  };

  const resolveColor = (event) => {
    if (event?.color) return event.color;
    const raw = event?.event_type || event?.category || '';
    const normalized = raw.toString().toLowerCase();
    if (normalized.includes('campus')) return 'border-[#0090C0]';
    if (normalized.includes('mtaani') || normalized.includes('baraza')) return 'border-[#0B1E3B]';
    return 'border-[#00C2CB]';
  };

  const resolveDescription = (event) => {
    if (event?.description) return event.description;
    const dateValue = event?.event_date || event?.date;
    if (dateValue) {
      const parsed = new Date(dateValue);
      const formatted = Number.isNaN(parsed.getTime())
        ? dateValue
        : parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
      return `${formatted}${event.location ? ` — ${event.location}` : ''}`;
    }
    return 'Details coming soon.';
  };

  useEffect(() => {
    const fetchUpcoming = async () => {
      setLoading(true);
      try {
        const data = await eventService.getUpcoming();
        setEvents(data?.length ? data : []);
      } catch (err) {
        console.error('Failed to fetch upcoming events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcoming();
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-[#0B1E3B] text-center mb-16 font-unda">
          Upcoming Events
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="p-8 border-t-4 border-slate-200 bg-[#F9FAFB]/30 rounded-2xl animate-pulse">
                <div className="h-8 w-8 rounded-full bg-slate-200 mb-4" />
                <div className="h-4 w-2/3 bg-slate-200 rounded mb-3" />
                <div className="h-3 w-full bg-slate-200 rounded mb-2" />
                <div className="h-3 w-5/6 bg-slate-200 rounded" />
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="bg-[#F9FAFB]/30 rounded-2xl p-10 border border-slate-100 text-center">
            <p className="text-slate-500 font-bold">No upcoming events published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, idx) => {
              const resolvedLink = resolveEventLink(event);
              const cardContent = (
                <>
                  <div className="text-[#00C2CB] mb-4 group-hover:scale-110 transition-transform">
                    <Calendar size={32} />
                  </div>
                  <h4 className="font-bold text-[#0B1E3B] mb-2">{event.title || 'Upcoming Event'}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {resolveDescription(event)}
                  </p>
                  <div className="flex items-center text-[10px] font-bold uppercase text-[#00C2CB] opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <ArrowRight size={12} className="ml-1" />
                  </div>
                </>
              );

              return resolvedLink ? (
                <Link
                  key={event.id || idx}
                  to={resolvedLink}
                  className={`p-8 border-t-4 ${resolveColor(event)} bg-[#F9FAFB]/30 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-pointer`}
                >
                  {cardContent}
                </Link>
              ) : (
                <div
                  key={event.id || idx}
                  className={`p-8 border-t-4 ${resolveColor(event)} bg-[#F9FAFB]/30 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-default`}
                >
                  {cardContent}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
