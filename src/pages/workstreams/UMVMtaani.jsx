import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { MapPin, ArrowLeft } from 'lucide-react';
import api from '@/services/apiService';

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
      const primary = await api.get('/api/workstreams/events?program=mtaani&status=Upcoming');
      let eventsList = primary.data?.events || [];

      if (!eventsList.length) {
        const fallback = await api.get('/api/workstreams/events?program=baraza&status=Upcoming');
        eventsList = fallback.data?.events || [];
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

              {!loading && upcomingEvents.length === 0 && (
                <div className="p-10 rounded-3xl bg-white shadow-lg border border-slate-100 text-center">
                  <MapPin size={48} className="mx-auto text-slate-400 mb-4" />
                  <p className="text-lg font-medium text-slate-600">No barazas scheduled yet.</p>
                  <p className="text-sm text-slate-400 mt-2">Check back soon or create an event via the portal.</p>
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
