import React, { useState, useEffect } from 'react';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Calendar, MapPin, Loader2, X, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/apiService';

const AnnualConference = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: ''
  });
  const [registering, setRegistering] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

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

  const handleRegisterClick = () => {
    setShowModal(true);
    setSelectedEvent(null);
    setRegistrationSubmitted(false);
    setRegistrationError('');
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
  };

  const handleRegistrationChange = (e) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setRegistering(true);
    setRegistrationError('');

    try {
      await api.post(`/api/events/${selectedEvent.id}/register-interest`, registrationData);
      setRegistrationSubmitted(true);
    } catch (err) {
      setRegistrationError(err.response?.data?.message || 'Failed to register interest. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setRegistrationSubmitted(false);
    setRegistrationData({ fullName: '', email: '', phone: '', organization: '' });
    setRegistrationError('');
  };

  const RegistrationModal = () => {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-white z-10"
          >
            <X size={20} className="text-slate-600" />
          </button>

          <div className="p-8">
            {!selectedEvent ? (
              <>
                <h2 className="text-3xl font-black text-[#0B1E3B] mb-6">Select an Event</h2>
                <p className="text-slate-600 mb-8">Choose which conference event you'd like to register interest for:</p>
                <div className="space-y-4">
                  {events.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => handleEventSelect(event)}
                      className="w-full p-6 rounded-2xl border-2 border-slate-100 hover:border-[#00C2CB] hover:bg-[#00C2CB]/5 transition-all text-left"
                    >
                      <h3 className="font-black text-[#0B1E3B] text-lg mb-2">{event.title}</h3>
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
                    </button>
                  ))}
                </div>
              </>
            ) : !registrationSubmitted ? (
              <>
                <h2 className="text-3xl font-black text-[#0B1E3B] mb-2">Register Interest</h2>
                <p className="text-slate-600 mb-6">
                  For: <span className="font-bold text-[#0B1E3B]">{selectedEvent.title}</span>
                </p>

                {registrationError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 mb-6">
                    {registrationError}
                  </div>
                )}

                <form onSubmit={handleRegistrationSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider block mb-2">
                      Full Name *
                    </label>
                    <Input
                      name="fullName"
                      value={registrationData.fullName}
                      onChange={handleRegistrationChange}
                      required
                      placeholder="Your name"
                      className="bg-white border-slate-200 h-12 rounded-xl"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider block mb-2">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={registrationData.email}
                        onChange={handleRegistrationChange}
                        required
                        placeholder="your@email.com"
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider block mb-2">
                        Phone
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={registrationData.phone}
                        onChange={handleRegistrationChange}
                        placeholder="07XXXXXXXX"
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider block mb-2">
                      Organization
                    </label>
                    <Input
                      name="organization"
                      value={registrationData.organization}
                      onChange={handleRegistrationChange}
                      placeholder="Your organization or institution"
                      className="bg-white border-slate-200 h-12 rounded-xl"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedEvent(null)}
                      className="flex-1 h-12 border-slate-200 text-[#0B1E3B] font-bold rounded-xl"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={registering}
                      className="flex-1 h-12 bg-[#00C2CB] hover:bg-[#0090C0] text-white font-bold rounded-xl disabled:opacity-70"
                    >
                      {registering ? 'Submitting...' : 'Register Interest'}
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-black text-[#0B1E3B] mb-4">Thank You!</h3>
                <p className="text-slate-600 mb-8">
                  We've received your interest registration for <span className="font-bold">{selectedEvent.title}</span>.
                  We'll contact you soon at <span className="font-bold">{registrationData.email}</span>.
                </p>
                <Button
                  onClick={closeModal}
                  className="bg-[#00C2CB] hover:bg-[#0090C0] text-white font-bold rounded-xl"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {showModal && <RegistrationModal />}
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
              <Button
                onClick={handleRegisterClick}
                disabled={loading || events.length === 0}
                className="h-12 px-6 rounded-xl bg-[#00C2CB] hover:bg-white text-[#0B1E3B] font-bold hover:text-[#0B1E3B] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calendar size={16} className="mr-2" />
                Register Interest
              </Button>
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
