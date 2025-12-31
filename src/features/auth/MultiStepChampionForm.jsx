import React, { useState } from 'react';
import { registerChampion } from '../../services/apiService';

const initialState = {
  fullName: '',
  dob: '',
  age: '',
  phone1: '',
  phone2: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  educationLevel: '',
  institution: '',
  yearOfStudy: '',
  recruitmentSource: '',
  // ...add all other required fields
};

const steps = [
  'Identity',
  'Safety',
  'Education',
  'Enrollment',
];

export default function MultiStepChampionForm() {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await registerChampion(form);
      setSuccess(true);
    } catch (err) {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Peer Champion Registration</h2>
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          {steps.map((label, idx) => (
            <span key={label} className={`px-3 py-1 rounded-full text-xs font-bold ${step === idx ? 'bg-unda-teal text-white' : 'bg-slate-100 text-slate-500'}`}>{label}</span>
          ))}
        </div>
        {step === 0 && (
          <div className="space-y-4">
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" className="input" required />
            <input name="dob" value={form.dob} onChange={handleChange} placeholder="Date of Birth" className="input" required />
            <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="input" required />
            <input name="phone1" value={form.phone1} onChange={handleChange} placeholder="Phone Number 1" className="input" required />
            <input name="phone2" value={form.phone2} onChange={handleChange} placeholder="Phone Number 2" className="input" />
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <input name="emergencyName" value={form.emergencyName} onChange={handleChange} placeholder="Emergency Contact Name" className="input" required />
            <input name="emergencyRelationship" value={form.emergencyRelationship} onChange={handleChange} placeholder="Relationship" className="input" required />
            <input name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} placeholder="Emergency Phone" className="input" required />
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <input name="educationLevel" value={form.educationLevel} onChange={handleChange} placeholder="Education Level" className="input" required />
            <input name="institution" value={form.institution} onChange={handleChange} placeholder="Institution Name" className="input" required />
            <input name="yearOfStudy" value={form.yearOfStudy} onChange={handleChange} placeholder="Year of Study" className="input" required />
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <input name="recruitmentSource" value={form.recruitmentSource} onChange={handleChange} placeholder="Recruitment Source" className="input" required />
            {/* Add more fields as needed */}
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button type="button" onClick={prevStep} disabled={step === 0} className="btn">Back</button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={nextStep} className="btn bg-unda-teal text-white">Next</button>
        ) : (
          <button type="submit" className="btn bg-unda-teal text-white" disabled={loading}>Submit</button>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">Registration successful!</p>}
    </form>
  );
}
