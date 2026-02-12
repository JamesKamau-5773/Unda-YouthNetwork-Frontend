import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import DashboardLayout from '../layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/apiService';

const initialForm = {
  title: '',
  description: '',
  eventDate: '',
  location: '',
  eventType: 'mtaani'
};

const EventSubmission = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.title.trim()) return 'Please enter a title.';
    if (!form.description.trim()) return 'Please enter a description.';
    if (!form.eventDate) return 'Please select a date and time.';
    if (!form.location.trim()) return 'Please enter a location.';
    if (!form.eventType) return 'Please select an event type.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const parsedDate = new Date(form.eventDate);
    if (Number.isNaN(parsedDate.getTime())) {
      setErrorMessage('Please enter a valid date and time.');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        event_date: parsedDate.toISOString(),
        location: form.location.trim(),
        event_type: form.eventType
      };

      await api.post('/api/events/submit', payload);
      setSuccessMessage('Submission received. Your event is now pending admin approval.');
      setForm(initialForm);
    } catch (err) {
      console.error('Event submission failed', err?.response?.data || err);
      setErrorMessage(err?.response?.data?.message || 'Failed to submit event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout headerContent={(
      <div className="rounded-[2rem] bg-white/90 backdrop-blur-xl p-8 shadow-sm border border-white/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent opacity-80 pointer-events-none" />
        <div className="relative z-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0B1E3B]">Submit a Mtaani Event</h2>
          <p className="text-sm text-[#00838F] font-bold mt-1">Your submission goes to admin review before publishing.</p>
        </div>
        <div className="relative z-10 flex flex-wrap items-center gap-2">
          <Link to="/member/events" className="px-4 py-2 rounded-full bg-white border border-[#E6EEF2] text-[#0B1E3B] text-xs font-bold uppercase tracking-wider">
            Back to Events
          </Link>
          <div className="px-4 py-2 rounded-full bg-[#E0F7FA] border border-[#00ACC1]/30 text-[#006064] flex items-center gap-2">
            <Calendar size={16} className="text-[#00ACC1]" />
            <span className="text-xs font-bold uppercase tracking-wider">Pending Approval</span>
          </div>
        </div>
      </div>
    )}>
      <div className="max-w-3xl">
        <form onSubmit={handleSubmit} className="bg-white/90 rounded-[2rem] p-8 border border-white/80 shadow-sm space-y-6">
          {successMessage && (
            <div className="rounded-xl bg-green-50 text-green-700 px-4 py-3 text-sm font-medium">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="rounded-xl bg-red-50 text-red-700 px-4 py-3 text-sm font-medium">
              {errorMessage}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Event Title</label>
              <Input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Community Baraza Discussion"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Event Date & Time</label>
              <Input
                type="datetime-local"
                name="eventDate"
                value={form.eventDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Event Type</label>
              <select
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]/30"
                required
              >
                <option value="mtaani">Mtaani</option>
                <option value="baraza">Baraza</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Location</label>
              <Input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Kibera Community Center"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Community dialogue on youth mental health"
                className="w-full min-h-[140px] rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00ACC1]/30 resize-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="submit" className="h-12 px-6 rounded-xl bg-[#00ACC1] hover:bg-[#0097A7] text-white font-bold" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit for Approval'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-12 px-6 rounded-xl"
              onClick={() => navigate('/member/events')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default EventSubmission;
