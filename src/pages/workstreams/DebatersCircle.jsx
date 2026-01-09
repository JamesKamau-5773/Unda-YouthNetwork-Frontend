import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
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
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-[#0B1E3B]">Log Debate Participation</h2>
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
                <Loader2 className="animate-spin text-[#00C2CB]" size={32} />
              </div>
            ) : (
              <div className="space-y-3">
                {events.map((event) => (
                  <label
                    key={event.id}
                    className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      formData.event_id === String(event.id)
                        ? 'border-[#00C2CB] bg-[#00C2CB]/5'
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
                      <div className="flex-1">
                        {event.motion && (
                          <div className="mb-2">
                            <span className="text-[9px] font-black text-[#00C2CB] uppercase tracking-widest">Motion</span>
                            <p className="font-black text-[#0B1E3B] text-sm mt-0.5">{event.motion}</p>
                          </div>
                        )}
                        <h4 className="font-bold text-[#0B1E3B]">{event.title}</h4>
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
                        <CheckCircle className="text-[#00C2CB]" size={20} />
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
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-[#00C2CB] focus:outline-none transition-colors min-h-[100px] resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting || !formData.event_id}
            className="w-full h-14 rounded-2xl bg-[#00C2CB] text-white hover:bg-[#0B1E3B] font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
};

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

  const [motions, setMotions] = useState([]);

  // Fetch debates on component mount
  useEffect(() => {
    const fetchDebates = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/events/?category=debate');
        console.log('📡 Debates API Response:', response.data);
        
        if (response.data?.events && Array.isArray(response.data.events)) {
          // Map backend fields to frontend expected fields
          const mappedDebates = response.data.events.map(debate => ({
            id: debate.id || debate.event_id,
            title: debate.motion || debate.topic || debate.title, // Use motion/topic if available, fallback to title
            motion: debate.motion || debate.topic, // Store the specific motion/topic field
            description: debate.description,
            date: new Date(debate.event_date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            }),
            location: debate.location,
            status: debate.status,
            imageUrl: debate.image_url || debate.imageUrl,
          }));
          
          console.log('✅ Loaded debates with motions:', mappedDebates);
          setMotions(mappedDebates);
        }
      } catch (err) {
        console.error('Failed to fetch debates:', err);
        setMotions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDebates();
  }, []);

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
        setEvents([]);
      }
    } catch (err) {
      console.error('Events API error:', err.message);
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
      // Get champion_id from localStorage or current user context
      // const token = localStorage.getItem('unda_token'); // Already checked above
      
      const response = await api.post('/api/event-participation/', {
        event_id: parseInt(formData.event_id),
        champion_id: 1, // This should come from the logged-in user's champion profile
        registration_status: 'attended',
        notes: formData.notes,
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

  return (
    <div className="min-h-screen bg-transparent pb-32">
      {/* Participation Modal */}
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

      {/* 1. HERO: Editorial Alignment */}
      <section className="pt-40 pb-20 bg-[#0B1E3B] relative overflow-hidden text-white">
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-[#00C2CB] opacity-10 -skew-x-12 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>
            
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
              <MessageSquare size={16} className="text-[#00C2CB]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Advocacy & Literacy
              </span>
            </div>

              <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
              Debaters <br />
              <span className="text-[#00C2CB]">Circle.</span>
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
            <h2 className="text-2xl font-black text-[#0B1E3B] mb-10 tracking-tight uppercase tracking-[0.1em]">
              Current Motions
            </h2>
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="animate-spin text-[#00C2CB]" size={48} />
                </div>
              ) : motions.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <p className="text-lg font-medium">No debate motions available yet.</p>
                  <p className="text-sm">Check back soon for upcoming debates!</p>
                </div>
              ) : (
                motions.map((motion, idx) => (
                  <div
                    key={motion.id || idx}
                    className="rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl transition-all group overflow-hidden"
                  >
                    {/* Cover Image Section */}
                    {motion.imageUrl ? (
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#00C2CB]/20 to-[#0B1E3B]/20">
                        <img 
                          src={motion.imageUrl} 
                          alt={motion.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                        
                        {/* Status Badge on Image */}
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-md ${
                              motion.status === "Upcoming" || motion.status === "Active"
                                ? "bg-[#00C2CB]/90 text-white"
                                : "bg-white/90 text-slate-600"
                            }`}
                          >
                            {motion.status}
                          </span>
                        </div>
                        
                        {/* Date Badge on Image */}
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] text-[#0B1E3B] font-bold uppercase flex items-center gap-2">
                            <Calendar size={12} /> {motion.date}
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Fallback gradient when no image */
                      <div className="relative h-32 bg-gradient-to-br from-[#00C2CB]/10 via-[#0B1E3B]/5 to-slate-50 flex items-center justify-center">
                        <MessageSquare size={48} className="text-[#00C2CB]/20" />
                        <div className="absolute top-4 left-4">
                          <span
                            className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                              motion.status === "Upcoming" || motion.status === "Active"
                                ? "bg-[#00C2CB]/10 text-[#00C2CB]"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {motion.status}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="text-[10px] text-slate-500 font-bold uppercase flex items-center gap-2">
                            <Calendar size={12} /> {motion.date}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {/* Content Section */}
                    <div className="p-8">
                      {/* Display Motion/Topic prominently if it exists */}
                      {motion.motion && (
                        <div className="mb-3 pb-3 border-b border-slate-100">
                          <span className="text-[10px] font-black text-[#00C2CB] uppercase tracking-widest">Motion</span>
                          <h3 className="text-2xl font-black text-[#0B1E3B] mt-1 group-hover:text-[#00C2CB] transition-colors leading-tight">
                            {motion.motion}
                          </h3>
                        </div>
                      )}
                      
                      {/* Title - only show if different from motion */}
                      {(!motion.motion || motion.title !== motion.motion) && (
                        <h4 className="text-lg font-bold text-[#0B1E3B] mb-3">
                          {motion.title}
                        </h4>
                      )}
                      
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">{motion.description}</p>
                      <div className="flex items-center gap-6 text-slate-600 font-semibold text-xs">
                        <span className="flex items-center gap-2">
                          <MapPin size={14} /> {motion.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT: Compliance & Toolkits  */}
          <div className="lg:col-span-5 space-y-12">
            <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100">
              <h3 className="text-xl font-black text-[#0B1E3B] mb-6">
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
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#00C2CB] transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:text-[#00C2CB]">
                        <Download size={16} />
                      </div>
                      <span className="text-sm font-bold text-[#0B1E3B]">
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
            <div className="p-10 rounded-[3rem] bg-[#00C2CB] text-white shadow-2xl shadow-[#00C2CB]/20">
              <GraduationCap size={40} className="mb-6 opacity-30" />
              <h3 className="text-xl font-black mb-4">Log Circle Activity</h3>
              <p className="text-white/80 text-sm font-medium mb-8">
                Champions must log debate participation to maintain high
                Documentation Quality Scores.
              </p>
              <Button 
                onClick={() => setShowLogModal(true)}
                className="w-full h-14 rounded-2xl bg-white text-[#00C2CB] hover:bg-[#0B1E3B] hover:text-white font-black uppercase tracking-widest transition-all"
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
