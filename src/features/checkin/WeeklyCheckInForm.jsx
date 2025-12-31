import React, { useState } from 'react';
import { useReferral } from '../../context/ReferralContext';

const initialState = {
  championId: '',
  phq2Score: 0,
  gad2Score: 0,
  reason: '',
  supervisorNotes: '',
  destination: '',
  // ...other fields
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
  const { triggerReferral } = useReferral();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Red flag detection logic
    const isRedFlag = RED_FLAGS.includes(form.reason) || form.phq2Score >= 3 || form.gad2Score >= 3;
    if (isRedFlag) {
      triggerReferral({
        championId: form.championId,
        reason: form.reason,
        supervisorNotes: form.supervisorNotes,
        destination: form.destination,
        checkInData: form,
      });
    }
    setSuccess(true);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Weekly Check-In</h2>
      <input name="championId" value={form.championId} onChange={handleChange} placeholder="Champion ID" className="input" required />
      <input name="phq2Score" type="number" value={form.phq2Score} onChange={handleChange} placeholder="PHQ-2 Score" className="input" min={0} max={6} required />
      <input name="gad2Score" type="number" value={form.gad2Score} onChange={handleChange} placeholder="GAD-2 Score" className="input" min={0} max={6} required />
      <select name="reason" value={form.reason} onChange={handleChange} className="input" required>
        <option value="">Select Reason</option>
        <option value="Emotional distress">Emotional distress</option>
        <option value="Academic pressure">Academic pressure</option>
        <option value="Relationship issues">Relationship issues</option>
        <option value="Routine">Routine</option>
        {/* Add more reasons as needed */}
      </select>
      <input name="supervisorNotes" value={form.supervisorNotes} onChange={handleChange} placeholder="Supervisor Notes" className="input" />
      <input name="destination" value={form.destination} onChange={handleChange} placeholder="Referral Destination" className="input" />
      {/* Add more fields as needed */}
      <button type="submit" className="btn bg-unda-teal text-white" disabled={loading}>Submit</button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">Check-in successful!</p>}
    </form>
  );
}
