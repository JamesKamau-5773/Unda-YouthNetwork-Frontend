import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Heart, Calendar, Building2, CreditCard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Donate = () => {
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate('/partner', { replace: true }), 300);
    return () => clearTimeout(t);
  }, [navigate]);

  const quickAmounts = [1000, 2500, 5000, 10000];

  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#00C2CB] to-[#0B1E3B] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Support <span className="text-unda-yellow">Prevention.</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                Support the Unda Youth Network and help young people across Kenya access Unda Mind Vibes Prevention Program activities and preventive mental-health services. Your contributions fund programs, events, peer-support initiatives, and community outreach that advance Adolescent & Youth Mental Health Prevention.
              </p>
            </div>
          </div>
        </section>

        {/* Donation Form */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-unda-bg/30 rounded-2xl p-8 lg:p-12 border-t-4 border-unda-teal shadow-xl">
                <h2 className="text-4xl font-black text-unda-navy mb-8 font-unda">Make a Difference</h2>
                
                {/* Donation Type */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-unda-navy mb-4">Select Donation Type</label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => setDonationType('one-time')}
                      className={`p-4 rounded-xl border-2 font-bold transition-all ${
                        donationType === 'one-time'
                          ? 'border-unda-teal bg-unda-teal/10 text-unda-teal'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Heart size={20} className="mx-auto mb-2" />
                      One-Time
                    </button>
                    <button
                      onClick={() => setDonationType('monthly')}
                      className={`p-4 rounded-xl border-2 font-bold transition-all ${
                        donationType === 'monthly'
                          ? 'border-unda-teal bg-unda-teal/10 text-unda-teal'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Calendar size={20} className="mx-auto mb-2" />
                      Monthly
                    </button>
                    <button
                      onClick={() => setDonationType('corporate')}
                      className={`p-4 rounded-xl border-2 font-bold transition-all ${
                        donationType === 'corporate'
                          ? 'border-unda-teal bg-unda-teal/10 text-unda-teal'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <Building2 size={20} className="mx-auto mb-2" />
                      Corporate
                    </button>
                  </div>
                </div>

                {/* Amount Selection */}
                {donationType !== 'corporate' && (
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-unda-navy mb-4">Select Amount (KES)</label>
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {quickAmounts.map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setAmount(amt.toString())}
                          className={`p-3 rounded-xl border-2 font-bold transition-all ${
                            amount === amt.toString()
                              ? 'border-unda-teal bg-unda-teal/10 text-unda-teal'
                              : 'border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {amt.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-unda-teal focus:outline-none font-medium"
                    />
                  </div>
                )}

                {/* Corporate Info */}
                {donationType === 'corporate' && (
                  <div className="mb-8 p-6 bg-unda-navy/5 rounded-2xl border border-unda-navy/10">
                    <h3 className="text-xl font-black text-unda-navy mb-3">Corporate Support</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Corporate subscriptions start at <strong className="text-unda-navy">KES 150,000 annually</strong>, which supports the adoption of two youth cohorts of 25 participants each.
                    </p>
                    <p className="text-sm text-slate-500">
                      Please contact us directly to discuss partnership opportunities and customized support packages.
                    </p>
                  </div>
                )}

                {/* Payment Methods */}
                <div className="mb-8">
                  <label className="block text-sm font-bold text-unda-navy mb-4">Payment Method</label>
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl border-2 border-slate-200 hover:border-unda-teal transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <span className="text-xs font-black text-green-600">M-PESA</span>
                          </div>
                          <span className="font-bold text-slate-700">M-Pesa</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl border-2 border-slate-200 hover:border-unda-teal transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-unda-teal/10 flex items-center justify-center">
                            <CreditCard size={20} className="text-unda-teal" />
                          </div>
                          <span className="font-bold text-slate-700">Credit/Debit Card</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Donate Button */}
                <Button className="w-full h-14 rounded-2xl bg-unda-teal text-white hover:bg-unda-navy text-lg font-bold shadow-xl">
                  {donationType === 'corporate' ? 'Contact Us' : 'Donate Now'}
                </Button>

                {/* Security Notice */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Shield size={14} className="text-unda-teal" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-black text-unda-navy mb-6">Your Impact</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-12">
                Every contribution directly supports youth mental health prevention programs across Kenya. Here's how your donation helps:
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <p className="text-4xl font-black text-unda-teal mb-3">KES 1,000</p>
                  <p className="text-slate-600">Provides screening tools and resources for 5 youth</p>
                </div>
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <p className="text-4xl font-black text-unda-orange mb-3">KES 5,000</p>
                  <p className="text-slate-600">Supports peer check-in sessions for a month</p>
                </div>
                <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <p className="text-4xl font-black text-unda-navy mb-3">KES 10,000</p>
                  <p className="text-slate-600">Funds a full Unda Mind Vibes event reaching 50+ youth</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-unda-navy text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-black mb-6">
              Questions About <span className="text-unda-yellow">Donations?</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
              Contact us to learn more about how your contribution supports youth mental health prevention.
            </p>
            <a href="mailto:info@undayouth.org" className="text-unda-yellow font-bold text-lg hover:underline">
              info@undayouth.org
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Donate;
