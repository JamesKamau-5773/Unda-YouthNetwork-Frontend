import React, { useState, useEffect } from 'react';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Calendar, MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '@/services/apiService';

const AnnualConference = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConferenceEvents = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/workstreams/events?program=conference&status=Upcoming');
        if (response.data?.events?.length > 0) {
          setEvents(response.data.events);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Failed to fetch conference events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchConferenceEvents();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-transparent pb-24">
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] via-[#00C2CB] to-[#0B1E3B] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/programs" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Programs</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-4">
                UMV Annual <span className="text-white drop-shadow-[0_12px_30px_rgba(2,6,23,0.65)]">Conference</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl mb-8">
                Our flagship convening that brings together youth networks, researchers, schools and partners to share evidence, showcase innovations and strengthen prevention systems.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                <Calendar size={16} className="text-[#0090C0]" />
                <span className="text-sm font-bold text-white">Register Interest</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-black text-[#0B1E3B] mb-6">What to Expect</h2>
            <p className="text-slate-600 mb-8">Workshops, panels, youth showcases, research presentations and practical tools for prevention programming.</p>
          </div>

          {/* Upcoming Conference Events */}
          <div className="max-w-4xl mx-auto mt-12">
            <h3 className="text-2xl font-black text-[#0B1E3B] mb-6 text-center">Upcoming Events</h3>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="animate-spin text-[#00C2CB]" size={32} />
              </div>
            ) : events.length > 0 ? (
              <div className="grid gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                    <h4 className="font-black text-[#0B1E3B] text-lg mb-2">{event.title}</h4>
                    {event.description && <p className="text-slate-600 mb-4">{event.description}</p>}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500">No upcoming conference events. Check back soon!</p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AnnualConference;
