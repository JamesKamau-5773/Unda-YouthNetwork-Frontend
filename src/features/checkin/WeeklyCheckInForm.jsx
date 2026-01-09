import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkInService } from '../../services/apiService';
import { useReferral } from '../../context/ReferralContext';
import Layout from '@/components/shared/Layout';
import { ArrowLeft, Activity, Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialState = {
  championId: '',
  phq2Score: '',
  gad2Score: '',
  reason: '',
  supervisorNotes: '',
  destination: '',
};

const RED_FLAGS = [
  'Emotional distress',
  'Academic pressure',
  'Relationship issues',
];

export default function WeeklyCheckInForm() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showRedFlagAlert, setShowRedFlagAlert] = useState(false);
  const { triggerReferral } = useReferral();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setShowRedFlagAlert(false);
    
    // Red flag detection logic
    const isRedFlag = RED_FLAGS.includes(form.reason) || parseInt(form.phq2Score) >= 3 || parseInt(form.gad2Score) >= 3;
    
    if (isRedFlag) {
      setShowRedFlagAlert(true);
      triggerReferral({
        championId: form.championId,
        reason: form.reason,
        supervisorNotes: form.supervisorNotes,
        destination: form.destination,
        checkInData: form,
      });
    }
    
    try {
      await checkInService.submitCheckIn({ ...form, isRedFlag });
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Failed to submit check-in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(initialState);
    setSuccess(false);
    setShowRedFlagAlert(false);
    setError('');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#00C2CB] to-[#0B1E3B] relative overflow-hidden hero-overlay">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/portal" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Portal</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Weekly <span className="text-[#0090C0]">Check-In.</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                Monitor peer champion wellness and identify support needs through regular mental health assessments.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="bg-[#F9FAFB]/50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 shadow-xl relative overflow-hidden">
              {!success ? (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-black text-[#0B1E3B] mb-2">Champion Wellness Assessment</h3>
                    <p className="text-sm text-slate-500">
                      Complete this weekly assessment to track wellness and identify any support needs.
                    </p>
                  </div>

                  {/* Champion ID */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Champion ID *</label>
                    <Input 
                      name="championId"
                      value={form.championId}
                      onChange={handleChange}
                      required
                      placeholder="Enter Champion ID"
                      className="bg-white border-slate-200 h-12 rounded-xl"
                    />
                  </div>

                  {/* Assessment Scores */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider flex items-center gap-2">
                        <Heart size={16} className="text-[#00C2CB]" />
                        PHQ-2 Score * <span className="text-xs text-slate-400 normal-case">(0-6)</span>
                      </label>
                      <Input 
                        name="phq2Score"
                        type="number"
                        value={form.phq2Score}
                        onChange={handleChange}
                        required
                        min="0"
                        max="6"
                        placeholder="0"
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                      <p className="text-xs text-slate-500">Depression screening score</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider flex items-center gap-2">
                        <Activity size={16} className="text-[#00C2CB]" />
                        GAD-2 Score * <span className="text-xs text-slate-400 normal-case">(0-6)</span>
                      </label>
                      <Input 
                        name="gad2Score"
                        type="number"
                        value={form.gad2Score}
                        onChange={handleChange}
                        required
                        min="0"
                        max="6"
                        placeholder="0"
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                      <p className="text-xs text-slate-500">Anxiety screening score</p>
                    </div>
                  </div>

                  {/* Check-in Reason */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Primary Reason for Check-In *</label>
                    <select 
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      className="w-full bg-white border border-slate-200 h-12 rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                      required
                    >
                      <option value="">Select a reason...</option>
                      <option value="Routine">Routine Check-In</option>
                      <option value="Emotional distress">Emotional Distress</option>
                      <option value="Academic pressure">Academic Pressure</option>
                      <option value="Relationship issues">Relationship Issues</option>
                      <option value="Family concerns">Family Concerns</option>
                      <option value="Social isolation">Social Isolation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Supervisor Notes */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Supervisor Notes</label>
                      <textarea
                      name="supervisorNotes"
                      value={form.supervisorNotes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any observations or notes from the supervisor..."
                      className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                    />
                  </div>

                  {/* Referral Destination */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Referral Destination (if needed)</label>
                    <Input 
                      name="destination"
                      value={form.destination}
                      onChange={handleChange}
                      placeholder="e.g. School Counselor, Mental Health Professional"
                      className="bg-white border-slate-200 h-12 rounded-xl"
                    />
                  </div>

                  {/* Red Flag Alert */}
                  {(parseInt(form.phq2Score) >= 3 || parseInt(form.gad2Score) >= 3 || RED_FLAGS.includes(form.reason)) && (
                    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertTriangle size={20} className="text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-red-900 text-sm">Red Flag Detected</h4>
                          <p className="text-xs text-red-700 mt-1">
                            This check-in indicates potential risk. A referral will be triggered automatically upon submission.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-14 bg-[#00C2CB] hover:bg-[#0B1E3B] text-white font-bold text-lg rounded-xl shadow-lg transition-all disabled:opacity-50"
                  >
                    {loading ? 'Submitting Check-In...' : 'Submit Check-In'}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-2xl font-black text-[#0B1E3B] mb-4">Check-In Submitted!</h3>
                  <p className="text-slate-600 mb-2">
                    Weekly wellness assessment completed for Champion ID: <span className="font-bold">{form.championId}</span>
                  </p>
                  {showRedFlagAlert && (
                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl max-w-md mx-auto">
                      <div className="flex items-center gap-2 text-yellow-800 mb-2">
                        <AlertTriangle size={18} />
                        <span className="font-bold text-sm">Referral Triggered</span>
                      </div>
                      <p className="text-xs text-yellow-700">
                        Supervisor has been notified for follow-up support.
                      </p>
                    </div>
                  )}
                  <div className="flex gap-4 justify-center mt-8">
                    <Button 
                      onClick={resetForm}
                      variant="outline" 
                      className="border-[#00C2CB] text-[#00C2CB] hover:bg-[#00C2CB]/5"
                    >
                      New Check-In
                    </Button>
                    <Button 
                      asChild
                      className="bg-[#0B1E3B] text-white hover:bg-[#00C2CB]"
                    >
                      <Link to="/portal">Back to Portal</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
