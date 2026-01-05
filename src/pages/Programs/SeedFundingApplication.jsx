import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertCircle, ArrowLeft, Lightbulb } from 'lucide-react';
import api from '@/services/apiService';

const SeedFundingApplication = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    institution: '',
    course: '',
    yearOfStudy: '',
    projectTitle: '',
    projectDescription: '',
    fundingAmount: '',
    projectCategory: '',
    teamSize: '',
    expectedImpact: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.post('/api/seed-funding/apply', formData);
      if (response.data?.success) {
        setMessage({ 
          type: 'success', 
          text: 'Application submitted successfully! We will review and contact you within 5 business days.' 
        });
        setTimeout(() => navigate('/campus'), 3000);
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to submit application. Please try again.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-transparent py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <Button
              variant="ghost"
              asChild
              className="mb-6 text-unda-navy hover:text-unda-yellow"
            >
              <Link to="/campus">
                <ArrowLeft size={16} className="mr-2" /> Back to Campus Edition
              </Link>
            </Button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-unda-yellow/10">
                <Lightbulb size={24} className="text-unda-yellow" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-unda-navy">Seed Funding Application</h1>
                <p className="text-slate-500 font-medium mt-1">Apply for up to KES 50,000 for your mental health innovation</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-100">
            {message.text && (
              <div className={`mb-8 p-4 rounded-2xl flex items-center gap-3 ${
                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                <span className="text-sm font-medium">{message.text}</span>
              </div>
            )}

            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-black text-unda-navy mb-6 pb-3 border-b border-slate-100">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-unda-navy mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-unda-navy mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                    placeholder="you@university.ac.ke"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-unda-navy mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                    placeholder="07XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-unda-navy mb-2">Institution *</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                    placeholder="University/College Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-unda-navy mb-2">Course/Field of Study *</label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                    placeholder="e.g. Psychology, Public Health"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-unda-navy mb-2">Year of Study *</label>
                  <select
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                  >
                    <option value="">Select Year</option>
                    <option value="1">Year 1</option>
                    <option value="2">Year 2</option>
                    <option value="3">Year 3</option>
                    <option value="4">Year 4</option>
                    <option value="5+">Year 5+</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="mb-8">
              <h3 className="text-xl font-black text-unda-navy mb-6 pb-3 border-b border-slate-100">Project Details</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-unda-navy mb-2">Project Title *</label>
                  <input
                    type="text"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    required
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                    placeholder="Give your project a clear, concise title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-unda-navy mb-2">Project Description *</label>
                  <textarea
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all resize-none"
                    placeholder="Describe your mental health innovation, target audience, and implementation plan..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-unda-navy mb-2">Funding Amount Requested (KES) *</label>
                    <input
                      type="number"
                      name="fundingAmount"
                      value={formData.fundingAmount}
                      onChange={handleChange}
                      required
                      max="50000"
                      className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                      placeholder="Max: 50,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-unda-navy mb-2">Project Category *</label>
                    <select
                      name="projectCategory"
                      value={formData.projectCategory}
                      onChange={handleChange}
                      required
                      className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                    >
                      <option value="">Select Category</option>
                      <option value="peer-support">Peer Support Circle</option>
                      <option value="awareness">Mental Health Awareness</option>
                      <option value="digital-tools">Digital Wellness Tools</option>
                      <option value="research">Prevention Research</option>
                      <option value="other">Other Innovation</option>
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-unda-navy mb-2">Team Size *</label>
                    <input
                      type="number"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      required
                      min="1"
                      className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                      placeholder="Number of team members"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-unda-navy mb-2">Expected Impact (Youth Reached) *</label>
                    <input
                      type="number"
                      name="expectedImpact"
                      value={formData.expectedImpact}
                      onChange={handleChange}
                      required
                      className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-medium focus:outline-none focus:ring-2 focus:ring-unda-yellow/20 focus:border-unda-yellow transition-all"
                      placeholder="Estimated number of youth"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 h-14 rounded-2xl bg-unda-yellow text-unda-navy hover:bg-unda-navy hover:text-white font-bold text-lg transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={20} /> Submitting...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SeedFundingApplication;
