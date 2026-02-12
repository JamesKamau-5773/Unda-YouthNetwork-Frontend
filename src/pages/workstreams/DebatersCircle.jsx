import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  BookOpen,
  Calendar,
  MapPin,
  Download,
  X,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/apiService";

// Registration Modal Component
const RegistrationModal = ({ 
  showModal, 
  setShowModal, 
  selectedEvent, 
  registrationData, 
  setRegistrationData, 
  handleRegistrationSubmit, 
  registering,
  registrationSubmitted,
  registrationError
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-md hover:bg-white z-10"
        >
          <X size={20} className="text-slate-600" />
        </button>

        <div className="p-8">
          {!registrationSubmitted ? (
            <>
              <h2 className="text-3xl font-black text-[#0B1E3B] mb-2">Register Interest</h2>
              <p className="text-slate-600 mb-6">
                For: <span className="font-bold text-[#0B1E3B]">{selectedEvent?.motion || selectedEvent?.title}</span>
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
                    onChange={(e) => setRegistrationData({ ...registrationData, fullName: e.target.value })}
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
                      onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
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
                      onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                      placeholder="07XXXXXXXX"
                      className="bg-white border-slate-200 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1 h-12 border-slate-200 text-[#0B1E3B] font-bold rounded-xl"
                  >
                    Cancel
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
                We've received your interest registration for <span className="font-bold">{selectedEvent?.motion || selectedEvent?.title}</span>.
                We'll contact you at <span className="font-bold">{registrationData.email}</span>.
              </p>
              <Button
                onClick={() => setShowModal(false)}
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

const DebatersCircle = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [motions, setMotions] = useState([]);
  const [toolkitResources, setToolkitResources] = useState([]);
  const [toolkitLoading, setToolkitLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [registrationData, setRegistrationData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  // Fetch debates on component mount
  useEffect(() => {
    const fetchDebates = async () => {
      setLoading(true);
      try {
        const response = await api.get('/api/workstreams/events?program=debate');
        console.log('Debates API Response:', response.data);
        
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
          
          console.log('Loaded debates with motions:', mappedDebates);
          setMotions(mappedDebates);
        }
      } catch (err) {
        console.error('Failed to fetch debates:', err);
        setMotions([]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch toolkit resources
    const fetchToolkitResources = async () => {
      setToolkitLoading(true);
      try {
        const response = await api.get('/api/workstreams/debate/resources');
        if (response.data?.resources && Array.isArray(response.data.resources)) {
          setToolkitResources(response.data.resources);
        } else {
          setToolkitResources([]);
        }
      } catch (err) {
        console.error('Failed to fetch toolkit resources:', err);
        setToolkitResources([]);
      } finally {
        setToolkitLoading(false);
      }
    };

    fetchDebates();
    fetchToolkitResources();
  }, []);

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
    setRegistrationSubmitted(false);
    setRegistrationError('');
    setRegistrationData({ fullName: '', email: '', phone: '' });
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setRegistrationError('');

    try {
      await api.post(`/api/events/${selectedEvent.id}/register-interest`, registrationData);
      setRegistrationSubmitted(true);
    } catch (err) {
      setRegistrationError(err.response?.data?.message || 'Failed to register interest. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent pb-32">
      {/* Registration Modal */}
      <RegistrationModal 
        showModal={showModal}
        setShowModal={setShowModal}
        selectedEvent={selectedEvent}
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
        handleRegistrationSubmit={handleRegistrationSubmit}
        registering={submitting}
        registrationSubmitted={registrationSubmitted}
        registrationError={registrationError}
      />

      {/* 1. HERO: Editorial Alignment */}
      <section className="pt-40 pb-20 bg-[#0B1E3B] relative overflow-hidden text-white">
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-[#00C2CB] opacity-10 -skew-x-12 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <Link to="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft size={20} className="mr-2" />
                  <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
                </Link>

                <h1 className="text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                  UMV <br />
                  <span className="text-[#00C2CB]">Debaters.</span>
                </h1>

                <p className="text-slate-300 text-xl font-medium leading-relaxed max-w-xl">
                  Age-appropriate mental health debates and conversations for 13–17 in school and community settings.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                  <MessageSquare size={16} className="text-[#00C2CB]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Advocacy & Literacy
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 hidden lg:block" />
          </div>
        </div>
      </section>

      {/* 2. ASYMMETRICAL GRID: Resources & Motions */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20">
          {/* Active Motions  */}
          <div className="lg:col-span-12">
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
                </div>
              ) : (
                motions.map((motion, idx) => (
                  <div
                    key={motion.id || idx}
                    role="button"
                    tabIndex={0}
                    onClick={() => motion.id && navigate(`/events/${motion.id}`)}
                    onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && motion.id) { e.preventDefault(); navigate(`/events/${motion.id}`); } }}
                    className="rounded-[2.5rem] border border-slate-100 bg-white hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 group overflow-hidden cursor-pointer"
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
                      
                      <p className="text-slate-600 text-sm mb-6 line-clamp-3">{motion.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-slate-600 font-semibold text-xs">
                          <MapPin size={14} /> {motion.location}
                        </span>
                        <Button
                          onClick={() => handleRegisterClick(motion)}
                          className="h-10 px-4 bg-[#00C2CB] hover:bg-[#0090C0] text-white font-bold text-xs rounded-xl"
                        >
                          Register Interest
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Institutional Toolkit  */}
            <div className="lg:col-span-12">
            <div className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 shadow-sm max-w-2xl">
              <h3 className="text-xl font-black text-[#0B1E3B] mb-6">
                Institutional Toolkit
              </h3>
              <p className="text-slate-600 text-sm font-medium mb-8">
                Download required legal documents and consent forms for
                school-based check-ins.
              </p>

              <div className="space-y-4">
                {toolkitLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin text-[#00C2CB]" size={24} />
                  </div>
                ) : toolkitResources.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">No toolkit resources available yet.</p>
                ) : (
                  toolkitResources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.file_url || resource.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#00C2CB] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:text-[#00C2CB]">
                          <Download size={16} />
                        </div>
                        <span className="text-sm font-bold text-[#0B1E3B]">
                          {resource.name || resource.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase">
                        {resource.file_type || 'PDF'}
                      </span>
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default DebatersCircle;
