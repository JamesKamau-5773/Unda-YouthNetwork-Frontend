import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Handshake, Building2, Globe, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Partner = () => {
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    email: '',
    partnershipType: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    console.log('Partnership Inquiry:', formData);
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-unda-navy to-unda-teal relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Partner <span className="text-unda-yellow">With Us.</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                Collaborate with UNDA Youth Network to amplify impact. We invite organizations, funders, and academic institutions to join us in advancing Adolescent & Youth Mental Health Prevention.
              </p>
            </div>
          </div>
        </section>

        {/* Partnership Form Section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Left Column: Context */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-4xl font-black text-unda-navy mb-6 font-unda">Why Partner?</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    By partnering with UMV, you contribute to a scalable, evidence-informed prevention model that prioritizes youth leadership and sustainable community impact.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    { title: "Strategic Impact", desc: "Align with national & global mental health goals (WHO HAT Guidelines)." },
                    { title: "Brand Visibility", desc: "Feature in our impact reports, events, and digital campaigns." },
                    { title: "Community Access", desc: "Directly reach over 50,000 young people across Kenya." },
                    { title: "Innovation", desc: "Support cutting-edge peer-led and digital mental health solutions." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1 bg-unda-teal/10 p-2 rounded-lg text-unda-teal h-fit">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-unda-navy text-lg">{item.title}</h4>
                        <p className="text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="bg-unda-bg/50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 shadow-xl relative overflow-hidden">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                     <h3 className="text-2xl font-black text-unda-navy mb-6">Partnership Inquiry</h3>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-unda-navy uppercase tracking-wider">Organization Name</label>
                      <Input 
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Acme Foundation"
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-unda-navy uppercase tracking-wider">Contact Person</label>
                        <Input 
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleChange}
                          required
                          placeholder="Full Name"
                          className="bg-white border-slate-200 h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-unda-navy uppercase tracking-wider">Email Address</label>
                        <Input 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="email@organization.com"
                          className="bg-white border-slate-200 h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-unda-navy uppercase tracking-wider">Partnership Type</label>
                      <select 
                        name="partnershipType"
                        value={formData.partnershipType}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 h-12 rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-unda-teal"
                        required
                      >
                        <option value="" disabled>Select a type...</option>
                        <option value="Funding/Grant">Funding / Grant Support</option>
                        <option value="Program Implementation">Program Implementation</option>
                        <option value="Corporate CSR">Corporate CSR</option>
                        <option value="Academic/Research">Academic / Research</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-unda-navy uppercase tracking-wider">Message / Proposal</label>
                       <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Briefly describe how you'd like to partner with us..."
                          className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-unda-teal"
                       />
                    </div>

                    <Button type="submit" className="w-full h-14 bg-unda-navy hover:bg-unda-teal text-white font-bold text-lg rounded-xl shadow-lg transition-all">
                      Submit Inquiry
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                    <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-unda-navy mb-4">Thank You!</h3>
                    <p className="text-slate-600 mb-8">
                      We've received your partnership inquiry. Our team will review your details and get back to you shortly at <span className="font-bold">{formData.email}</span>.
                    </p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" className="border-unda-teal text-unda-teal hover:bg-unda-teal/5">
                      Send Another Inquiry
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

export default Partner;
