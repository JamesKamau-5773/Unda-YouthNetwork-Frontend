import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  BookOpen,
  GraduationCap,
  Download,
  CheckSquare,
  X,
  Loader2,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/services/apiService";

const DebatersCircle = () => {
  const [showLogModal, setShowLogModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    event_id: '',
    notes: '',
  });

  // Sample fallback motions when API not available
  const sampleMotions = [
    {
      topic: "Digital Wellbeing vs. Traditional Socialization",
      status: "Active",
      level: "University / College",
      participants: "450+ Youth Reached",
    },
    {
      topic: "The Role of Peer Support in Academic Pressure",
      status: "Archived",
      level: "High School",
      participants: "1,200+ Youth Reached",
    },
  ];

  const [motions, setMotions] = useState(sampleMotions);

  // Fetch debate events when modal opens
  useEffect(() => {
    if (showLogModal) {
      fetchDebateEvents();
    }
  }, [showLogModal]);

  const fetchDebateEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/events?category=debate');
      if (response.data?.events?.length > 0) {
        setEvents(response.data.events);
      } else {
        // Use sample events if none in database
        setEvents([
          { id: 1, title: "Digital Wellbeing Debate Session", event_date: "2026-01-15", location: "Virtual" },
          { id: 2, title: "Academic Pressure Discussion", event_date: "2026-01-22", location: "Nairobi Hub" },
        ]);
      }
    } catch (err) {
      console.log('Events API not available, using sample data');
      setEvents([
        { id: 1, title: "Digital Wellbeing Debate Session", event_date: "2026-01-15", location: "Virtual" },
        { id: 2, title: "Academic Pressure Discussion", event_date: "2026-01-22", location: "Nairobi Hub" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogParticipation = async (e) => {
    e.preventDefault();
    if (!formData.event_id) {
      setMessage({ type: 'error', text: 'Please select an event' });
      return;
    }

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Get champion_id from localStorage or current user context
      const token = localStorage.getItem('unda_token');
      
      const response = await api.post('/api/event-participation/', {
        event_id: parseInt(formData.event_id),
        champion_id: 1, // This should come from the logged-in user's champion profile
        registration_status: 'attended',
      });

      if (response.data?.success) {
        setMessage({ type: 'success', text: 'Participation logged successfully! Your Documentation Quality Score has been updated.' });
        setFormData({ event_id: '', notes: '' });
        setTimeout(() => {
          setShowLogModal(false);
          setMessage({ type: '', text: '' });
        }, 2000);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to log participation. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
    } finally {
      setSubmitting(false);
    }
  };

  // Participation Modal Component
  const ParticipationModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-unda-navy">Log Debate Participation</h2>
            <p className="text-sm text-slate-500 mt-1">Record your attendance for Documentation Quality Score</p>
          </div>
          <button 
            onClick={() => setShowLogModal(false)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleLogParticipation} className="p-6 space-y-6">
          {/* Message Display */}
          {message.text && (
            <div className={`p-4 rounded-xl flex items-center gap-3 ${
              message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
              <span className="text-sm font-medium">{message.text}</span>
            </div>
          )}

          {/* Event Selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Select Debate Event
            </label>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="animate-spin text-unda-teal" size={32} />
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((event) => (
                  <label
                    key={event.id}
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.event_id === String(event.id)
                        ? 'border-unda-teal bg-unda-teal/5'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="event_id"
                      value={event.id}
                      checked={formData.event_id === String(event.id)}
                      onChange={(e) => setFormData({ ...formData, event_id: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-unda-navy">{event.title}</h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {event.event_date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {event.location}
                          </span>
                        </div>
                      </div>
                      {formData.event_id === String(event.id) && (
                        <CheckCircle className="text-unda-teal" size={20} />
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Notes (Optional) */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any observations or key takeaways from the session..."
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-unda-teal focus:outline-none transition-colors min-h-[100px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting || !formData.event_id}
            className="w-full h-14 rounded-2xl bg-unda-teal text-white hover:bg-unda-navy font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="animate-spin" size={18} /> Logging...
              </span>
            ) : (
              'Log My Participation'
            )}
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Participation Modal */}
      {showLogModal && <ParticipationModal />}

      {/* 1. HERO: Editorial Alignment */}
      <section className="pt-40 pb-20 bg-unda-navy relative overflow-hidden text-white">
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-unda-teal opacity-10 -skew-x-12 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
              <MessageSquare size={16} className="text-unda-teal" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Advocacy & Literacy
              </span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
              Debaters <br />
              <span className="text-unda-teal">Circle.</span>
            </h1>

            <p className="text-slate-300 text-xl font-medium leading-relaxed max-w-xl">
              Equipping Peer Champions to lead mental health advocacy through
              structured debate and critical thinking in Schools and Churches.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRICAL GRID: Resources & Motions */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20">
          {/* LEFT: Active Motions  */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-black text-unda-navy mb-10 tracking-tight uppercase tracking-[0.1em]">
              Current Motions
            </h2>
            <div className="space-y-6">
              {motions.map((motion, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        motion.status === "Active"
                          ? "bg-unda-teal/10 text-unda-teal"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {motion.status}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">
                      {motion.level}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-unda-navy mb-4 group-hover:text-unda-teal transition-colors">
                    {motion.topic}
                  </h3>
                  <div className="flex items-center gap-6 text-slate-600 font-semibold text-xs">
                    <span className="flex items-center gap-2">
                      <CheckSquare size={14} /> {motion.participants}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Compliance & Toolkits  */}
          <div className="lg:col-span-5 space-y-12">
            <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100">
              <h3 className="text-xl font-black text-unda-navy mb-6">
                Institutional Toolkit
              </h3>
              <p className="text-slate-600 text-sm font-medium mb-8">
                Download required legal documents and consent forms for
                school-based check-ins.
              </p>

              <div className="space-y-4">
                {[
                  { name: "School Consent Policy", type: "PDF " },
                  { name: "Legal Aspect Summary", type: "PDF" },
                  { name: "Safe Environment Protocol", type: "PDF" },
                ].map((doc, idx) => (
                  <button
                    key={idx}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-unda-teal transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:text-unda-teal">
                        <Download size={16} />
                      </div>
                      <span className="text-sm font-bold text-unda-navy">
                        {doc.name}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      {doc.type}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* QUICK LINK: Operational Data Log  */}
            <div className="p-10 rounded-[3rem] bg-unda-teal text-white shadow-2xl shadow-unda-teal/20">
              <GraduationCap size={40} className="mb-6 opacity-30" />
              <h3 className="text-xl font-black mb-4">Log Circle Activity</h3>
              <p className="text-white/80 text-sm font-medium mb-8">
                Champions must log debate participation to maintain high
                Documentation Quality Scores.
              </p>
              <Button 
                onClick={() => setShowLogModal(true)}
                className="w-full h-14 rounded-2xl bg-white text-unda-teal hover:bg-unda-navy hover:text-white font-black uppercase tracking-widest transition-all"
              >
                Open Operational Log
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DebatersCircle;
