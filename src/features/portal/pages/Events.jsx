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

const Events = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [registering, setRegistering] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const events = [
    {
      title: "Q1 Pro-Bono Therapy Session",
      type: "Virtual",
      category: "Wellness",
      date: "Jan 14, 2026",
      time: "10:00 AM - 12:00 PM",
      host: "Dr. Amani",
      status: "Open",
    },
    {
      title: "Mtaani Peer Workshop",
      type: "Physical",
      category: "Training",
      location: "Kibera Community Hall",
      date: "Feb 02, 2026",
      time: "2:00 PM - 5:00 PM",
      host: "Local Champions",
      status: "Waitlist",
    },
    {
      title: "Digital Resilience Webinar",
      type: "Webinar",
      category: "Education",
      date: "Feb 15, 2026",
      time: "6:00 PM - 7:30 PM",
      host: "Unda Tech Team",
      status: "Upcoming",
    },
  ];

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
              <p className="text-sm text-slate-600">{events[selectedIndex].date} • {events[selectedIndex].time || 'Time TBA'}</p>
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
      <div className="grid gap-4">
        {events.map((evt, idx) => (
          // CARD: "Frosted Ice" - High Opacity (90%) for readability
          <div
            key={idx}
            className="relative bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] border border-white/80 flex flex-col md:flex-row items-center gap-6 shadow-[0_8px_30px_rgba(0,194,203,0.06)] hover:shadow-[0_8px_30px_rgba(0,194,203,0.15)] hover:bg-white transition-all group overflow-hidden"
          >
            {/* Date Block (Solid Color for max contrast) */}
            <div className="relative z-10 h-20 w-20 bg-[#E0F7FA] text-[#0B1E3B] rounded-3xl flex flex-col items-center justify-center font-bold flex-shrink-0 group-hover:bg-[#00ACC1] group-hover:text-white transition-colors shadow-inner">
              <span className="text-2xl leading-none font-black">
                {evt.date.split(" ")[1].replace(",", "")}
              </span>
              <span className="text-[10px] uppercase tracking-wide mt-1">
                {evt.date.split(" ")[0]}
              </span>
            </div>

            {/* Content Area */}
            <div className="flex-1 text-center md:text-left min-w-0 w-full relative z-10">
              {/* Tags */}
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2 flex-wrap">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border bg-white ${
                    evt.category === "Wellness"
                      ? "text-purple-700 border-purple-200"
                      : evt.category === "Training"
                        ? "text-orange-700 border-orange-200"
                        : "text-blue-700 border-blue-200"
                  }`}
                >
                  {evt.category}
                </span>

                <span className="px-2 py-1 rounded-full bg-white border border-[#E0F7FA] text-[10px] font-bold text-[#00838F] uppercase flex items-center gap-1 shadow-sm">
                  {evt.type === "Physical" ? (
                    <MapPin size={10} />
                  ) : (
                    <Video size={10} />
                  )}
                  {evt.type}
                </span>
              </div>

              {/* TITLE FIX: Darkest Navy (#0B1E3B) for max readability */}
              <h3 className="text-xl font-black text-[#0B1E3B] truncate mb-1">
                {evt.title}
              </h3>

              {/* METADATA FIX: Deep Teal (#00838F) */}
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-[#00838F] font-bold">
                <span className="flex items-center gap-1">
                  <Users size={12} /> By {evt.host}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {evt.time}
                </span>
              </div>
            </div>

            {/* Button */}
            <div className="w-full md:w-auto relative z-10">
              <Button
                onClick={() => openRegisterFor(idx)}
                className={`w-full md:w-auto rounded-xl font-bold text-xs h-12 px-8 shadow-lg transition-transform hover:-translate-y-0.5 ${
                  evt.status === "Waitlist"
                    ? "bg-white text-[#00838F] border border-[#E0F7FA] hover:bg-[#F2F9FA]"
                    : "bg-[#00ACC1] hover:bg-[#0097A7] text-white shadow-[#00ACC1]/20"
                }`}
                disabled={evt.status === "Waitlist"}
              >
                {evt.status === "Waitlist" ? "Join Waitlist" : "Register Now"}
                {evt.status !== "Waitlist" && (
                  <ArrowUpRight size={14} className="ml-1" />
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Events;
