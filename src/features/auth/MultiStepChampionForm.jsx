import React, { useState } from 'react';
import { memberService } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

// Password strength checker
const checkPasswordStrength = (password) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const metRequirements = Object.values(requirements).filter(Boolean).length;
  let strength = 'Weak';
  let strengthColor = 'bg-red-500';

  if (metRequirements >= 4) {
    strength = 'Strong';
    strengthColor = 'bg-green-500';
  } else if (metRequirements >= 3) {
    strength = 'Medium';
    strengthColor = 'bg-yellow-500';
  }

  return { requirements, strength, strengthColor, metRequirements };
};

const initialState = {
  // Account fields
  fullName: '',
  email: '',
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
  // Optional fields
  dob: '',
  gender: '',
  county: '',
};

const steps = [
  'Account',
  'Complete',
];

export default function MultiStepChampionForm() {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(s => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Check password strength
    const { requirements } = checkPasswordStrength(form.password);
    const allReqsMet = Object.values(requirements).every(Boolean);
    
    if (!allReqsMet) {
      setError('Password must meet all requirements');
      return;
    }
    
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const response = await memberService.register(form);
      if (response && (response.status === 201 || response.status === 200)) {
        alert('Registration Successful! Your account is pending admin approval.');
        navigate('/portal');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
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
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="input" required />
            <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="input" required />
            <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number (0712345678)" className="input" required />
            
            {/* Password Field with Requirements */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password Requirements</label>
              <div className="relative">
                <input 
                  name="password" 
                  type={showPassword ? 'text' : 'password'} 
                  value={form.password} 
                  onChange={handleChange} 
                  placeholder="Password (min 8 characters)" 
                  className="input pr-10" 
                  required 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-unda-teal">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {form.password && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${checkPasswordStrength(form.password).strengthColor}`}
                        style={{ width: `${(checkPasswordStrength(form.password).metRequirements / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{checkPasswordStrength(form.password).strength}</span>
                  </div>
                  
                  {/* Requirements Checklist */}
                  <div className="space-y-2 p-3 bg-slate-50 rounded-lg">
                    {[
                      { key: 'minLength', label: 'At least 8 characters' },
                      { key: 'hasUpperCase', label: 'One uppercase letter (A-Z)' },
                      { key: 'hasLowerCase', label: 'One lowercase letter (a-z)' },
                      { key: 'hasNumber', label: 'One number (0-9)' },
                      { key: 'hasSpecialChar', label: 'One special character (!@#$%^&*)' },
                    ].map(req => {
                      const isMet = checkPasswordStrength(form.password).requirements[req.key];
                      return (
                        <div key={req.key} className="flex items-center gap-2 text-sm">
                          {isMet ? (
                            <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                          ) : (
                            <XCircle size={16} className="text-red-500 flex-shrink-0" />
                          )}
                          <span className={isMet ? 'text-green-700 font-medium' : 'text-slate-600'}>{req.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* Confirm Password Field */}
            <div className="relative">
              <input 
                name="confirmPassword" 
                type={showConfirmPassword ? 'text' : 'password'} 
                value={form.confirmPassword} 
                onChange={handleChange} 
                placeholder="Confirm Password" 
                className="input pr-10" 
                required 
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-unda-teal">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
              {form.confirmPassword && form.password === form.confirmPassword && (
                <p className="text-xs text-green-500 mt-1">Passwords match ✓</p>
              )}
            </div>
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 mb-4">Optional: Add more details to your profile</p>
            <input name="dob" type="date" value={form.dob} onChange={handleChange} placeholder="Date of Birth" className="input" />
            <select name="gender" value={form.gender} onChange={handleChange} className="input">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input name="county" value={form.county} onChange={handleChange} placeholder="County / Location" className="input" />
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button type="button" onClick={prevStep} disabled={step === 0} className="btn">Back</button>
        {step < steps.length - 1 ? (
          <button type="button" onClick={nextStep} className="btn bg-unda-teal text-white">Next</button>
        ) : (
          <button type="submit" className="btn bg-unda-teal text-white" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Complete Registration'}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
}
