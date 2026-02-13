import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { MapPin, ArrowLeft } from 'lucide-react';
import { eventService } from '@/services/workstreamService';

const UMVMtaani = () => {
  const [loading, setLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [regions, setRegions] = useState(['All', 'Kenya', 'U.S.A']);

  useEffect(() => {
    fetchUpcomingBarazas();
  }, []);


  const fetchUpcomingBarazas = async () => {
    setLoading(true);
    try {
      const normalize = (value) => (value || '').toString().trim().toLowerCase();
      const allowedStatuses = new Set(['upcoming', 'active', 'published', '']);

      let eventsList = await eventService.getUpcoming();
      
      // Filter for upcoming/active status - don't filter by type since admin may not set it
      if (eventsList.length) {
        eventsList = eventsList.filter((event) => {
          const status = normalize(event.status || event.event_status || event.submission_status || '');
          return !status || allowedStatuses.has(status);
        });
      }

      if (eventsList.length > 0) {
        setUpcomingEvents(eventsList);

        const uniqueRegions = ['All', ...new Set(
          eventsList
            .map(event => event.region || event.location?.split(',')[0]?.trim())
            .filter(Boolean)
        )];
        setRegions(uniqueRegions);
      } else {
        setUpcomingEvents([]);
      }
    } catch (err) {
      console.error('Failed to fetch barazas:', err.message);
      setUpcomingEvents([]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Layout>
      <div className="min-h-screen bg-transparent pb-32">
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] via-[#00C2CB] to-[#0B1E3B] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-20 text-left">
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C2CB]/10 border border-[#00C2CB]/20 mb-6">
              <MapPin size={16} className="text-unda-orange" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00C2CB]">Neighborhood Prevention</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-4">
              UMV <span className="text-white">Mtaani.</span>
            </h1>

            <p className="text-slate-300 text-lg max-w-3xl">
              Bringing mental health prevention to the doorstep. We turn community halls, playing fields, and social spaces into safe zones for resilience.
            </p>
          </div>
        </section>

        <section className="py-24 bg-[#F6F9FA]">
          <div className="container mx-auto px-6">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-black text-[#0B1E3B]">Upcoming Barazas</h2>
                  <p className="text-sm text-slate-500 mt-2">Community prevention events across Kenya</p>
                </div>
                <div className="flex gap-2">
                  {regions.map(r => (
                    <button key={r} onClick={() => setSelectedRegion(r.toLowerCase())} className={`px-4 py-2 rounded-xl text-xs font-bold ${selectedRegion === r.toLowerCase() ? 'bg-[#00C2CB] text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="p-6 rounded-2xl bg-white animate-pulse">
                      <div className="h-6 w-2/3 bg-slate-200 rounded mb-3" />
                      <div className="h-4 w-1/2 bg-slate-200 rounded" />
                    </div>
                  ))}
                </div>
              ) : upcomingEvents.length === 0 ? (
                <div className="p-10 rounded-3xl bg-white shadow-lg border border-slate-100 text-center">
                  <MapPin size={48} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-lg font-medium text-slate-600">No barazas scheduled yet.</p>
                  <p className="text-sm text-slate-400 mt-2">Check back soon or create an event via the portal.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents
                    .filter(event => {
                      if (selectedRegion === 'all') return true;
                      const eventRegion = (event.region || event.location?.split(',')[0]?.trim() || '').toLowerCase();
                      return eventRegion === selectedRegion;
                    })
                    .map((event, idx) => {
                      const dateObj = new Date(event.event_date || event.date || Date.now());
                      const dateStr = isNaN(dateObj.getTime()) 
                        ? event.event_date || event.date || 'Date TBA'
                        : dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                      const timeStr = isNaN(dateObj.getTime()) 
                        ? 'Time TBA'
                        : dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
                      const location = event.location || event.region || 'Location TBA';

                      return (
                        <div key={idx} className="p-6 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="text-xl font-black text-[#0B1E3B] mb-2">{event.title || event.name || 'Untitled Event'}</h3>
                              <div className="space-y-1 text-sm text-slate-600">
                                <p className="flex items-center gap-2">
                                  <MapPin size={16} className="text-[#00C2CB]" />
                                  {location}
                                </p>
                                <p>📅 {dateStr} at {timeStr}</p>
                                {event.description && <p className="text-slate-500 mt-2">{event.description}</p>}
                              </div>
                            </div>
                            <div className="ml-4 px-3 py-1.5 rounded-full bg-[#00C2CB]/10 border border-[#00C2CB]/20">
                              <span className="text-xs font-bold text-[#00C2CB] uppercase tracking-widest">Upcoming</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default UMVMtaani;
