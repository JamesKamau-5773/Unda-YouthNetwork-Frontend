import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, HeartHandshake, Users, Calendar, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Support = () => {
  const [formType, setFormType] = useState(null); // 'volunteer' or 'host-event' or null
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Support/Event Submission:', { type: formType, ...formData });
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const volunteerOptions = [
    "Debate Facilitation",
    "Podcast Production",
    "Campus Outreach",
    "Mtaani Events",
    "Content Creation",
    "Peer Support",
    "Other"
  ];

  const eventTypes = [
    "Mental Health Debate",
    "Community Forum",
    "Campus Event",
    "Mtaani Activation",
    "Workshop/Training",
    "Podcast Recording",
    "Other"
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] to-[#00C2CB] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Join the <span className="text-[#0090C0]">Movement.</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                Be part of Kenya's youth-led mental health prevention revolution. Support our work with your skills or host an event in your community.
              </p>
            </div>
          </div>
        </section>

        {/* Main Form Section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Left Column: Context & Benefits */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl font-black text-[#0B1E3B] mb-6">Why Get Involved?</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Whether you support or host an event, you're contributing to scalable, peer-led mental health prevention that empowers young people across Kenya.
                  </p>
                </div>

                {/* Type Selector Cards */}
                <div className="space-y-4">
                  <button
                    onClick={() => setFormType('volunteer')}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                      formType === 'volunteer' 
                        ? 'border-[#00C2CB] bg-[#00C2CB]/5 shadow-lg' 
                        : 'border-slate-100 hover:border-[#00C2CB]/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${formType === 'volunteer' ? 'bg-[#00C2CB] text-white' : 'bg-slate-100 text-[#00C2CB]'}`}>
                        <Users size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0B1E3B] text-lg mb-2">I Want to Support</h4>
                        <p className="text-sm text-slate-600">
                          Support UMV Debaters, UMV Podcast, UMV Campus, Mtaani events, content creation, or peer support initiatives.
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setFormType('host-event')}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                      formType === 'host-event' 
                        ? 'border-[#0090C0] bg-[#0090C0]/5 shadow-lg' 
                        : 'border-slate-100 hover:border-[#0090C0]/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${formType === 'host-event' ? 'bg-[#0090C0] text-white' : 'bg-slate-100 text-[#0090C0]'}`}>
                        <Calendar size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0B1E3B] text-lg mb-2">I Want to Host an Event</h4>
                        <p className="text-sm text-slate-600">
                          Bring UMV to your school, campus, community, or organization for a mental health prevention event.
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Benefits */}
                  <div className="space-y-4">
                  {[
                    { title: "Skill Development", desc: "Gain experience in mental health advocacy, event management, and peer leadership." },
                    { title: "Community Impact", desc: "Directly contribute to youth mental health awareness and prevention in your area." },
                    { title: "Network Building", desc: "Connect with like-minded young people and mental health professionals." },
                    { title: "Recognition", desc: "Receive certificates and featured recognition on our platforms." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1 bg-[#00C2CB]/10 p-2 rounded-lg text-[#00C2CB] h-fit">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0B1E3B]">{item.title}</h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="bg-[#F9FAFB]/50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[600px]">
                {!formType ? (
                   <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                      <div className="mx-auto w-24 h-24 bg-[#00C2CB]/10 rounded-full flex items-center justify-center mb-4">
                        <Sparkles size={40} className="text-[#00C2CB]" />
                      </div>
                      <h3 className="text-3xl font-black text-[#0B1E3B]">Let's Get Started!</h3>
                      <p className="text-lg text-slate-600 max-w-md mx-auto">
                        Please select an option on the left to view the application form.
                      </p>
                      <div className="flex justify-center gap-2 pt-4">
                         <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce delay-100"></div>
                         <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce delay-200"></div>
                         <div className="w-2 h-2 rounded-full bg-slate-300 animate-bounce delay-300"></div>
                      </div>
                   </div>
                ) : !submitted ? (
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-6 animate-in slide-in-from-right-10 duration-500">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-black text-[#0B1E3B]">
                        {formType === 'volunteer' ? 'Support Sign-Up' : 'Event Hosting Request'}
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => setFormType(null)}
                        className="text-xs font-bold text-slate-400 hover:text-[#0B1E3B] uppercase tracking-wider"
                      >
                        Change Selection
                      </button>
                    </div>
                    
                    <p className="text-sm text-slate-500 mb-6">
                      Fill in your details and we'll get back to you within 48 hours.
                    </p>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Full Name *</label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Email *</label>
                        <Input 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-white border-slate-200 h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Phone</label>
                        <Input 
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="bg-white border-slate-200 h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">
                        {formType === 'volunteer' ? 'Area of Interest *' : 'Event Type *'}
                      </label>
                      <select 
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 h-12 rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                        required
                      >
                        <option value="" disabled>Select an option...</option>
                        {(formType === 'volunteer' ? volunteerOptions : eventTypes).map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">
                        {formType === 'volunteer' ? 'Why do you want to support?' : 'Tell us about your event idea'}
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={formType === 'volunteer' 
                          ? "Share your motivation and any relevant experience..." 
                          : "Describe the event, location, expected attendees, and preferred dates..."
                        }
                        className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className={`w-full h-14 ${formType === 'volunteer' ? 'bg-[#00C2CB] hover:bg-[#00C2CB]/90' : 'bg-[#0090C0] hover:bg-[#0090C0]/90'} text-white font-bold text-lg rounded-xl shadow-lg transition-all`}
                    >
                      {formType === 'volunteer' ? 'Submit Support Application' : 'Submit Event Request'}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                    <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-[#0B1E3B] mb-4">Thank You!</h3>
                    <p className="text-slate-600 mb-2">
                      We've received your {formType === 'volunteer' ? 'support application' : 'event hosting request'}.
                    </p>
                    <p className="text-slate-600 mb-8">
                      Our team will review your details and contact you at <span className="font-bold">{formData.email}</span> within 48 hours.
                    </p>
                    <Button 
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
                      }} 
                      variant="outline" 
                      className="border-[#00C2CB] text-[#00C2CB] hover:bg-[#00C2CB]/5"
                    >
                      Submit Another Request
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Support;

