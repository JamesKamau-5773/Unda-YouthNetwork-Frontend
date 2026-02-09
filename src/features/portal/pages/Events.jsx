import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Video,
  Users,
  Clock,
  MapPin,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventService } from "@/services/workstreamService";

const Events = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [registering, setRegistering] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const auto = params.get('autoRegister');
      const idx = parseInt(params.get('index') || '0', 10);
      if (auto === '1') {
        setSelectedIndex(Number.isNaN(idx) ? 0 : idx);
        setModalOpen(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const data = await eventService.getUpcoming();
        const nextEvents = data?.length ? data : [];
        setEvents(nextEvents);
        if (nextEvents.length === 0 || selectedIndex >= nextEvents.length) {
          setSelectedIndex(0);
        }
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const getEventDateParts = (event) => {
    const raw = event?.event_date || event?.date;
    if (!raw) return { day: '--', month: '--' };
    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) {
      const parts = raw.toString().split(' ');
      return { day: parts[1]?.replace(',', '') || '--', month: parts[0] || '--' };
    }
    const month = parsed.toLocaleDateString('en-US', { month: 'short' });
    const day = parsed.getDate().toString();
    return { day, month };
  };

  const getEventStatus = (event) => event?.status || 'Upcoming';
  const getEventType = (event) => event?.event_type || event?.type || (event?.location ? 'Physical' : 'Virtual');
  const getEventCategory = (event) => event?.event_type || event?.category || 'Event';
  const getEventTime = (event) => {
    const dateValue = event?.event_date || event?.date;
    if (!dateValue) return 'Time TBA';
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) return 'Time TBA';
    return parsed.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };
  const getEventHost = (event) => event?.organizer || event?.host || event?.team || 'Unda Youth Network';

  const openRegisterFor = (i) => {
    setSelectedIndex(i);
    setModalOpen(true);
  };

  const handleRegister = async () => {
    const token = localStorage.getItem('unda_token');
    const params = new URLSearchParams(window.location.search);
    // If not logged in, redirect to portal and preserve next
    if (!token) {
      const next = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/portal?next=${next}`;
      return;
    }

    setRegistering(true);
    // Simulate registration API call; replace with real API when available
    try {
      await new Promise((res) => setTimeout(res, 900));
      setSuccessMessage('Reservation confirmed — check your email for details.');
      // Optionally remove autoRegister from URL
      const url = new URL(window.location.href);
      url.searchParams.delete('autoRegister');
      url.searchParams.delete('index');
      window.history.replaceState({}, '', url.toString());
      setTimeout(() => {
        setModalOpen(false);
      }, 1200);
    } catch (err) {
      setSuccessMessage('Failed to confirm reservation. Please try again.');
    } finally {
      setRegistering(false);
    }
  };

  return (
    <DashboardLayout>
      {modalOpen && events[selectedIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-black text-[#0B1E3B]">Register for event</h3>
                <p className="text-sm text-slate-500">{events[selectedIndex].title}</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600">{events[selectedIndex].event_date || events[selectedIndex].date || 'Date TBA'} • {getEventTime(events[selectedIndex])}</p>
              {events[selectedIndex].location && <p className="text-sm text-slate-600">Location: {events[selectedIndex].location}</p>}
            </div>

            {successMessage ? (
              <div className="p-4 rounded-lg bg-green-50 text-green-700">{successMessage}</div>
            ) : (
              <div className="flex gap-2">
                <button onClick={handleRegister} disabled={registering} className="flex-1 bg-[#00ACC1] text-white py-3 rounded-xl font-bold">{registering ? 'Confirming...' : 'Confirm Reservation'}</button>
                <button onClick={() => setModalOpen(false)} className="flex-1 bg-white border border-slate-200 py-3 rounded-xl">Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* --- HEADER (High Visibility Glass) --- */}
      {/* bg-white/90 ensures text is always readable, even over the pattern */}
      <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl p-8 mb-8 shadow-sm border border-white/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        {/* Subtle Shine */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-80 pointer-events-none" />

        <div className="relative z-10">
          {/* READABILITY FIX: Explicit Navy Text */}
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0B1E3B]">
            Events & Training
          </h2>
          <p className="text-sm text-[#00838F] font-bold mt-1">
            Connect with professionals and peers.
          </p>
        </div>

        <div className="relative z-10 px-4 py-2 rounded-full bg-[#E0F7FA] border border-[#00ACC1]/30 text-[#006064] flex items-center gap-2">
          <Calendar size={16} className="text-[#00ACC1]" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Upcoming
          </span>
        </div>
      </div>

      {/* --- EVENT CARDS --- */}
      {loading ? (
        <div className="grid gap-4">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="relative bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 flex flex-col md:flex-row items-center gap-6 shadow-[0_8px_30px_rgba(0,194,203,0.06)] animate-pulse"
            >
              <div className="h-20 w-20 bg-slate-200 rounded-3xl" />
              <div className="flex-1 w-full">
                <div className="h-4 w-1/3 bg-slate-200 rounded mb-3" />
                <div className="h-5 w-2/3 bg-slate-200 rounded mb-3" />
                <div className="h-3 w-1/2 bg-slate-200 rounded" />
              </div>
              <div className="h-10 w-32 bg-slate-200 rounded-xl" />
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white/90 rounded-[2rem] p-10 border border-white/80 text-center">
          <p className="text-[#00838F] font-bold">No events available yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {events.map((evt, idx) => {
            const { day, month } = getEventDateParts(evt);
            const status = getEventStatus(evt);
            const type = getEventType(evt);
            const category = getEventCategory(evt);
            return (
              <div
                key={evt.id || idx}
                className="relative bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 flex flex-col md:flex-row items-center gap-6 shadow-[0_8px_30px_rgba(0,194,203,0.06)] hover:shadow-[0_8px_30px_rgba(0,194,203,0.15)] hover:bg-white transition-all group overflow-hidden"
              >
                <div className="relative z-10 h-20 w-20 bg-[#E0F7FA] text-[#0B1E3B] rounded-3xl flex flex-col items-center justify-center font-bold flex-shrink-0 group-hover:bg-[#00ACC1] group-hover:text-white transition-colors shadow-inner">
                  <span className="text-2xl leading-none font-black">{day}</span>
                  <span className="text-[10px] uppercase tracking-wide mt-1">{month}</span>
                </div>

                <div className="flex-1 text-center md:text-left min-w-0 w-full relative z-10">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2 flex-wrap">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border bg-white ${
                      category === 'Wellness'
                        ? 'text-purple-700 border-purple-200'
                        : category === 'Training'
                          ? 'text-orange-700 border-orange-200'
                          : 'text-blue-700 border-blue-200'
                    }`}>
                      {category}
                    </span>

                    <span className="px-2 py-1 rounded-full bg-white border border-[#E0F7FA] text-[10px] font-bold text-[#00838F] uppercase flex items-center gap-1 shadow-sm">
                      {type === 'Physical' ? <MapPin size={10} /> : <Video size={10} />}
                      {type}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#0B1E3B] truncate mb-1">
                    {evt.title || 'Upcoming Event'}
                  </h3>

                  <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-[#00838F] font-bold">
                    <span className="flex items-center gap-1">
                      <Users size={12} /> By {getEventHost(evt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {getEventTime(evt)}
                    </span>
                  </div>
                </div>

                <div className="w-full md:w-auto relative z-10">
                  <Button
                    onClick={() => openRegisterFor(idx)}
                    className={`w-full md:w-auto rounded-xl font-bold text-xs h-12 px-8 shadow-lg transition-transform hover:-translate-y-0.5 ${
                      status === 'Waitlist'
                        ? 'bg-white text-[#00838F] border border-[#E0F7FA] hover:bg-[#F2F9FA]'
                        : 'bg-[#00ACC1] hover:bg-[#0097A7] text-white shadow-[#00ACC1]/20'
                    }`}
                    disabled={status === 'Waitlist'}
                  >
                    {status === 'Waitlist' ? 'Join Waitlist' : 'Register Now'}
                    {status !== 'Waitlist' && (
                      <ArrowUpRight size={14} className="ml-1" />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Events;
