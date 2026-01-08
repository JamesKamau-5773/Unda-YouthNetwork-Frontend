import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { MapPin, Users, Calendar, ArrowRight, HeartHandshake, X, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/services/apiService';

// Participation Modal Component - moved outside to prevent re-creation on each render
const ParticipationModal = ({
  showLogModal,
  setShowLogModal,
  message,
  loading,
  events,
  formData,
  setFormData,
  handleLogParticipation,
  submitting
}) => {
  if (!showLogModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-unda-navy">Log Community Outreach</h2>
            <p className="text-sm text-slate-500 mt-1">Record your Mtaani Baraza attendance</p>
          </div>
          <button onClick={() => setShowLogModal(false)} className="p-2 hover:bg-slate-100 rounded-xl">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleLogParticipation} className="p-6 space-y-6">
          {message.text && (
            <div className={`p-4 rounded-xl flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Baraza Event</label>
            {loading ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="animate-spin text-unda-orange" size={32} /></div>
            ) : (
              <div className="space-y-3">
                {events.map((event) => (
                  <label key={event.id} className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.event_id === String(event.id) ? 'border-unda-orange bg-unda-orange/5' : 'border-slate-100 hover:border-slate-200'}`}>
                    <input type="radio" name="event_id" value={event.id} checked={formData.event_id === String(event.id)} onChange={(e) => setFormData({ ...formData, event_id: e.target.value })} className="sr-only" />
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-unda-navy">{event.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Calendar size={12} /> {event.event_date || event.date}</span>
                          <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
                        </div>
                      </div>
                      {formData.event_id === String(event.id) && <CheckCircle className="text-unda-orange" size={20} />}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Notes (Optional)</label>
            <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Community impact, youth reached, key discussions..." className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-unda-orange focus:outline-none min-h-[100px] resize-none" />
          </div>

          <Button type="submit" disabled={submitting || !formData.event_id} className="w-full h-14 rounded-2xl bg-unda-orange text-white hover:bg-unda-navy font-bold uppercase tracking-widest disabled:opacity-50">
            {submitting ? <span className="flex items-center gap-2"><Loader2 className="animate-spin" size={18} /> Logging...</span> : 'Log My Participation'}
          </Button>
        </form>
      </div>
    </div>
  );
};

const UMVMtaani = () => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({ event_id: '', notes: '' });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [regions, setRegions] = useState(['All', 'Kenya', 'U.S.A']);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUpcomingBarazas();
  }, []);

  const handleStartHubClick = () => {
    // Check if logged in (simple token check)
    const token = localStorage.getItem('unda_token');
    
    if (token) {
        // If logged in, go to join (or dashboard/create-hub if that existed)
        // Currently /join is registration, but maybe we assume they want to "Register a new Hub"?
        // Let's redirect to Member Dashboard for now as the 'Hub Manager'
        navigate('/member/dashboard');
    } else {
        // Not logged in -> Gateway
        navigate('/portal-gateway');
    }
  };

  useEffect(() => {
    if (showLogModal) {
      fetchMtaaniEvents();
    }
  }, [showLogModal]);

  const fetchUpcomingBarazas = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/events?category=mtaani');
      if (response.data?.events?.length > 0) {
        setUpcomingEvents(response.data.events);
        
        // Extract unique regions from events
        const uniqueRegions = ['All', ...new Set(
          response.data.events
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

  const fetchMtaaniEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/events?category=mtaani');
      if (response.data?.events?.length > 0) {
        setEvents(response.data.events);
      } else {
        setEvents([]);
      }
    } catch (err) {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogParticipation = async (e) => {
    e.preventDefault();

    // Check for authentication first
    const token = localStorage.getItem('unda_token');
    if (!token) {
      setMessage({ type: 'error', text: 'You must be logged in to log participation. Please log in via the Portal.' });
      return;
    }

    if (!formData.event_id) {
      setMessage({ type: 'error', text: 'Please select an event' });
      return;
    }
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.post('/api/event-participation/', {
        event_id: parseInt(formData.event_id),
        champion_id: 1,
        registration_status: 'attended',
        notes: formData.notes,
      });

      if (response.data?.success) {
        setMessage({ type: 'success', text: 'Community outreach logged! Your Documentation Quality Score has been updated.' });
        setFormData({ event_id: '', notes: '' });
        setTimeout(() => { setShowLogModal(false); setMessage({ type: '', text: '' }); }, 2000);
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to log participation.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-transparent pb-32">
        <ParticipationModal
          showLogModal={showLogModal}
          setShowLogModal={setShowLogModal}
          message={message}
          loading={loading}
          events={events}
          formData={formData}
          setFormData={setFormData}
          handleLogParticipation={handleLogParticipation}
          submitting={submitting}
        />

        {/* 1. HERO: Urban & Grounded */}
        <section className="pt-40 pb-20 bg-unda-navy relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="flex justify-center mb-8">
              <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
              </Link>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-unda-orange/10 border border-unda-orange/20 mb-8 mx-auto">
              <MapPin size={16} className="text-unda-orange" />
              <span className="text-[10px] font-black uppercase tracking-widest text-unda-orange">Neighborhood Prevention</span>
            </div>
            <h1 className="text-6xl lg:text-9xl font-black text-white leading-[0.85] tracking-tighter mb-8">
              UMV <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-unda-orange to-unda-yellow">Mtaani.</span>
            </h1>
            <p className="text-slate-300 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Bringing mental health prevention to the doorstep. We turn community halls, playing fields, and social spaces into safe zones for resilience.
            </p>
          </div>
        </section>

        {/* 2. LOCAL ACTION GRID  */}
        <section className="py-24 container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-12">
              <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100">
                <HeartHandshake size={48} className="text-unda-navy mb-6" />
                <h3 className="text-3xl font-black text-unda-navy mb-4">Community First.</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                  UMV Mtaani is designed for youth who are out of school or working in the informal sector. We meet you where you are.
                </p>
                <Button onClick={handleStartHubClick} className="w-full py-6 rounded-2xl bg-unda-navy text-white font-bold text-lg hover:bg-unda-orange transition-all cursor-pointer">
                  Start a Mtaani Hub <ArrowRight className="ml-2" />
                </Button>
              </div>

              {/* Log Participation Card */}
              <div className="p-8 rounded-[2.5rem] bg-unda-orange text-white shadow-xl">
                <Users size={32} className="mb-4 opacity-50" />
                <h4 className="font-black text-lg mb-2">Log Your Outreach</h4>
                <p className="text-white/80 text-sm mb-6">Champions: Record your Baraza attendance for Documentation Quality Score.</p>
                <Button onClick={() => setShowLogModal(true)} className="w-full h-12 rounded-xl bg-white text-unda-orange hover:bg-unda-navy hover:text-white font-bold uppercase text-xs">
                  Open Activity Log
                </Button>
              </div>

              <div className="flex items-center gap-6 p-8 rounded-[2.5rem] bg-unda-teal/10 border border-unda-teal/20">
                <Users size={32} className="text-unda-teal" />
                <div>
                  <p className="text-3xl font-black text-unda-navy">12</p>
                  <p className="text-xs font-bold text-unda-teal uppercase tracking-widest">Active Locations</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
                <div>
                  <h2 className="text-3xl font-black text-unda-navy tracking-tight">Upcoming Barazas</h2>
                  <p className="text-sm text-slate-500 mt-2">Community prevention events across Kenya</p>
                </div>
                
                {/* Region Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region.toLowerCase())}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                        selectedRegion === region.toLowerCase()
                          ? 'bg-unda-orange text-white shadow-lg'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="animate-spin text-unda-orange" size={48} />
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
                      const eventRegion = event.region || event.location?.split(',')[0]?.trim() || 'Unknown';
                      
                      return (
                        <div key={event.id || idx} className="group p-8 rounded-[2rem] border border-slate-100 bg-white hover:border-unda-orange/30 hover:shadow-xl transition-all">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-6 flex-1">
                              <div className="h-16 w-16 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-unda-navy font-bold border border-slate-100 shrink-0">
                                {event.event_date ? (
                                  <>
                                    <span className="text-xs uppercase">{new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}</span>
                                    <span className="text-xl">{new Date(event.event_date).getDate()}</span>
                                  </>
                                ) : (
                                  <Calendar size={24} />
                                )}
                              </div>
                              <div>
                                <h4 className="text-xl font-black text-unda-navy group-hover:text-unda-orange transition-colors">{event.title}</h4>
                                <div className="flex items-center gap-4 mt-2 flex-wrap">
                                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                    <MapPin size={12} /> {event.location}
                                  </span>
                                  <span className="px-3 py-1 rounded-full bg-unda-orange/10 text-unda-orange text-[9px] font-black uppercase tracking-widest">
                                    {eventRegion}
                                  </span>
                                  {event.type && (
                                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[9px] font-black uppercase tracking-widest">
                                      {event.type}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Button 
                              onClick={() => setShowLogModal(true)} 
                              className="rounded-xl bg-unda-orange/10 hover:bg-unda-orange text-unda-orange hover:text-white font-bold whitespace-nowrap"
                            >
                              Log Attendance <CheckCircle size={16} className="ml-2" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  
                  {upcomingEvents.filter(event => {
                    if (selectedRegion === 'all') return true;
                    const eventRegion = (event.region || event.location?.split(',')[0]?.trim() || '').toLowerCase();
                    return eventRegion === selectedRegion;
                  }).length === 0 && (
                    <div className="text-center py-16 px-6">
                      <MapPin size={48} className="mx-auto text-slate-300 mb-4" />
                      <p className="text-lg font-medium text-slate-500">
                        No barazas scheduled for {selectedRegion === 'all' ? 'any region' : selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)} yet.
                      </p>
                      <p className="text-sm text-slate-400 mt-2">Check back soon or select a different region!</p>
                    </div>
                  )}
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
