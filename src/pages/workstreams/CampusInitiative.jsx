import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Loader2, BadgeCheck } from 'lucide-react';
import Layout from '@/components/shared/Layout';
import api from '@/services/apiService';

const CampusInitiative = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [initiative, setInitiative] = useState(null);

  useEffect(() => {
    const fetchInitiative = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/api/campus-initiatives/${id}`);
        const data = response.data?.initiative || response.data;
        setInitiative(data || null);
      } catch (err) {
        console.error('Failed to fetch campus initiative:', err);
        setInitiative(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInitiative();
    } else {
      setLoading(false);
      setInitiative(null);
    }
  }, [id]);

  const displayDate = useMemo(() => {
    const raw = initiative?.deadline || initiative?.due_date || initiative?.date;
    if (!raw) return null;
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return raw;
    return parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  }, [initiative]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="animate-spin h-12 w-12 text-[#00C2CB]" />
        </div>
      </Layout>
    );
  }

  if (!initiative) {
    return (
      <Layout>
        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-6 py-24">
            <Link to="/campus" className="inline-flex items-center text-unda-teal font-bold mb-6">
              <ArrowLeft size={18} className="mr-2" />
              Back to Campus
            </Link>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center">
              <h1 className="text-3xl font-black text-unda-navy mb-3">Initiative not found</h1>
              <p className="text-slate-600">We couldn’t load this initiative. Please try another one.</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const title = initiative.title || initiative.name || 'Campus Initiative';
  const summary = initiative.summary || initiative.excerpt || initiative.overview;
  const description = initiative.description || initiative.details || initiative.body;
  const location = initiative.location || initiative.campus || initiative.region;
  const status = initiative.status || initiative.phase;
  const applyLink = initiative.apply_link || initiative.link || initiative.url;

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <section className="pt-36 pb-16 bg-gradient-to-br from-[#0B1E3B] to-[#00C2CB] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/campus" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Campus</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                {status && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-bold uppercase tracking-widest">
                    <BadgeCheck size={14} /> {status}
                  </span>
                )}
                {displayDate && (
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={14} /> Deadline: {displayDate}
                  </span>
                )}
                {location && (
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={14} /> {location}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {summary && (
                <p className="text-lg text-slate-600 leading-relaxed mb-8">{summary}</p>
              )}

              {description ? (
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{description}</p>
                </div>
              ) : (
                <p className="text-slate-600">Full initiative details will appear here once published.</p>
              )}

              {applyLink && (
                <div className="mt-10">
                  <a
                    href={applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-xl bg-[#00C2CB] text-white font-bold hover:bg-[#0B1E3B] transition-colors"
                  >
                    Apply Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CampusInitiative;
