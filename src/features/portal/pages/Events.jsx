import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../layout/DashboardLayout";
import {
  Video,
  Users,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { eventService } from "@/services/workstreamService";
import api from "@/services/apiService";

const Events = () => {
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [notes, setNotes] = useState('');
  const [championId, setChampionId] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('unda_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user && (user.id || user.username || user.full_name)) {
          setChampionId(user.id || user.username || user.full_name);
        }
      }
    } catch (err) {
      console.error('Failed to read champion id from cache', err);
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

  const openLogFor = (i) => {
    setSelectedIndex(i);
    setLogModalOpen(true);
    setSuccessMessage('');
    setErrorMessage('');
    setNotes('');
  };

  const handleLogActivity = async () => {
    const event = events[selectedIndex];
    if (!event) {
      console.error('Log activity failed: no event selected');
      setErrorMessage('Please select an event to log.');
      return;
    }

    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const eventId = event.id || event.event_id;
      if (!eventId) {
        console.error('Log activity failed: missing event id', event);
        setErrorMessage('Unable to log this event. Please try another event.');
        setSubmitting(false);
        return;
      }

      const payload = {
        event_id: eventId,
        registration_status: 'attended',
        notes: notes.trim()
      };

      if (championId) {
        const maybeNumericId = Number(championId);
        payload.champion_id = Number.isFinite(maybeNumericId) && !Number.isNaN(maybeNumericId) ? maybeNumericId : championId;
      }

      await api.post('/api/event-participation/', payload);
      setSuccessMessage('Attendance logged. Thank you for the update.');
      setTimeout(() => {
        setLogModalOpen(false);
      }, 1200);
    } catch (err) {
      console.error('Failed to log activity', err?.response?.data || err);
      setErrorMessage(err?.response?.data?.message || 'Failed to log activity. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      {logModalOpen && events[selectedIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-black text-[#0B1E3B]">Log activity</h3>
                <p className="text-sm text-slate-500">{events[selectedIndex].title}</p>
              </div>
              <button onClick={() => setLogModalOpen(false)} className="text-slate-400">✕</button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600">{events[selectedIndex].event_date || events[selectedIndex].date || 'Date TBA'} • {getEventTime(events[selectedIndex])}</p>
              {events[selectedIndex].location && <p className="text-sm text-slate-600">Location: {events[selectedIndex].location}</p>}
            </div>

            {successMessage && (
              <div className="p-4 rounded-lg bg-green-50 text-green-700 mb-4">{successMessage}</div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-lg bg-red-50 text-red-700 mb-4">{errorMessage}</div>
            )}

            <div className="mb-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Notes (Optional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Community impact, youth reached, key discussions..."
                className="mt-2 w-full min-h-[110px] rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm focus:border-[#00ACC1] focus:outline-none resize-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleLogActivity}
                disabled={submitting}
                className="flex-1 bg-[#00ACC1] text-white py-3 rounded-xl font-bold"
              >
                {submitting ? 'Submitting...' : 'Log Attendance'}
              </button>
              <button onClick={() => setLogModalOpen(false)} className="flex-1 bg-white border border-slate-200 py-3 rounded-xl">Cancel</button>
            </div>
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

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate('/member/events/new')}
            className="px-4 py-2 rounded-full bg-[#0B1E3B] text-white text-xs font-bold uppercase tracking-wider"
          >
            Start a Mtaani Hub
          </button>
          <div className="px-4 py-2 rounded-full bg-[#E0F7FA] border border-[#00ACC1]/30 text-[#006064] flex items-center gap-2">
            <Calendar size={16} className="text-[#00ACC1]" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Upcoming
            </span>
          </div>
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
                    onClick={() => openLogFor(idx)}
                    className="w-full md:w-auto rounded-xl font-bold text-xs h-12 px-8 shadow-lg transition-transform hover:-translate-y-0.5 bg-[#00ACC1] hover:bg-[#0097A7] text-white shadow-[#00ACC1]/20"
                  >
                    Log Activity
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
