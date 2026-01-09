import React, { useState } from 'react';
import { memberService } from '../../services/apiService';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, XCircle, ArrowLeft, User, Lock } from 'lucide-react';
import Layout from '@/components/shared/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  'Account Details',
  'Optional Info',
];

export default function MultiStepChampionForm() {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const today = new Date().toISOString().split('T')[0];
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
        setForm(initialState);
        setStep(0);
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
    <Layout>
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-[#0B1E3B] to-[#00C2CB] relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <div className="container mx-auto px-6 relative z-10">
            <Link to="/" className="inline-flex items-center text-white/70 hover:text-white transition-colors mb-8">
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-bold text-sm uppercase tracking-widest">Back to Home</span>
            </Link>

            <div className="max-w-4xl">
              <h1 className="text-6xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Become a <span className="text-[#0090C0]">Champion.</span>
              </h1>
              <p className="text-xl text-slate-200 leading-relaxed max-w-3xl">
                Join Kenya's youth-led mental health prevention movement as a Peer Champion. Your registration is pending admin approval.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6 max-w-3xl">
            {/* Progress Indicator */}
            <div className="mb-12">
              <div className="flex justify-center gap-3">
                {steps.map((label, idx) => (
                  <div key={label} className="flex items-center">
                    <div className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                      step === idx 
                        ? 'bg-[#00C2CB] text-white shadow-lg' 
                        : step > idx 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step > idx ? (
                        <CheckCircle size={16} />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold">
                          {idx + 1}
                        </div>
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`w-12 h-0.5 ${step > idx ? 'bg-green-300' : 'bg-slate-200'}`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F9FAFB]/50 rounded-[2.5rem] p-8 lg:p-12 border border-slate-100 shadow-xl relative overflow-hidden">
              <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                
                {/* Step 0: Account Details */}
                {step === 0 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-[#00C2CB]/10 rounded-xl text-[#00C2CB]">
                        <User size={24} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-[#0B1E3B]">Account Information</h3>
                        <p className="text-sm text-slate-500">Create your peer champion account</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Full Name *</label>
                      <Input 
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Jane Doe"
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Email *</label>
                        <Input 
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="bg-white border-slate-200 h-12 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Username *</label>
                        <Input 
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          required
                          placeholder="username"
                          className="bg-white border-slate-200 h-12 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Phone Number *</label>
                      <Input 
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="0712345678"
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                    </div>

                    {/* Password Section */}
                    <div className="pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-[#0B1E3B]/10 rounded-lg text-[#0B1E3B]">
                          <Lock size={20} />
                        </div>
                        <h4 className="text-lg font-bold text-[#0B1E3B]">Secure Password</h4>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Password *</label>
                          <div className="relative">
                            <Input 
                              name="password"
                              type={showPassword ? 'text' : 'password'}
                              value={form.password}
                              onChange={handleChange}
                              required
                              placeholder="Create a strong password"
                              className="bg-white border-slate-200 h-12 rounded-xl pr-10"
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowPassword(!showPassword)} 
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00C2CB] transition-colors"
                            >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>

                        {/* Password Strength */}
                        {form.password && (
                          <div className="space-y-3 p-4 bg-slate-50 rounded-xl">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all ${checkPasswordStrength(form.password).strengthColor}`}
                                  style={{ width: `${(checkPasswordStrength(form.password).metRequirements / 5) * 100}%` }}
                                />
                              </div>
                              <span className="text-xs font-bold text-slate-600 min-w-[60px]">
                                {checkPasswordStrength(form.password).strength}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-2">
                              {[
                                { key: 'minLength', label: 'At least 8 characters' },
                                { key: 'hasUpperCase', label: 'One uppercase letter' },
                                { key: 'hasLowerCase', label: 'One lowercase letter' },
                                { key: 'hasNumber', label: 'One number' },
                                { key: 'hasSpecialChar', label: 'One special character' },
                              ].map(req => {
                                const isMet = checkPasswordStrength(form.password).requirements[req.key];
                                return (
                                  <div key={req.key} className="flex items-center gap-2 text-xs">
                                    {isMet ? (
                                      <CheckCircle size={14} className="text-green-500" />
                                    ) : (
                                      <XCircle size={14} className="text-slate-300" />
                                    )}
                                    <span className={isMet ? 'text-green-700 font-medium' : 'text-slate-500'}>{req.label}</span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Confirm Password *</label>
                          <div className="relative">
                            <Input 
                              name="confirmPassword"
                              type={showConfirmPassword ? 'text' : 'password'}
                              value={form.confirmPassword}
                              onChange={handleChange}
                              required
                              placeholder="Re-enter your password"
                              className="bg-white border-slate-200 h-12 rounded-xl pr-10"
                            />
                            <button 
                              type="button" 
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00C2CB] transition-colors"
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                          {form.confirmPassword && (
                            <p className={`text-xs mt-1 ${form.password === form.confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                              {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 1: Optional Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-5 duration-300">
                    <div className="mb-6">
                      <h3 className="text-2xl font-black text-[#0B1E3B] mb-2">Additional Information</h3>
                      <p className="text-sm text-slate-500">Optional: Help us personalize your experience</p>
                    </div>

                    <div className="space-y-2">
                          <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Date of Birth</label>
                      <Input 
                        name="dob"
                        type="date"
                        value={form.dob}
                        onChange={handleChange}
                        max={today}
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">Gender</label>
                      <select 
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 h-12 rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#0B1E3B] uppercase tracking-wider">County / Location</label>
                      <Input 
                        name="county"
                        value={form.county}
                        onChange={handleChange}
                        placeholder="e.g. Kenya"
                        className="bg-white border-slate-200 h-12 rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm flex items-start gap-2">
                    <XCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-4">
                  {step > 0 && (
                    <Button 
                      type="button"
                      onClick={prevStep}
                      variant="outline"
                      className="flex-1 h-12 border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl"
                    >
                      Back
                    </Button>
                  )}
                  {step < steps.length - 1 ? (
                    <Button 
                      type="button"
                      onClick={nextStep}
                      className="flex-1 h-12 bg-[#00C2CB] hover:bg-[#0B1E3B] text-white rounded-xl"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 h-12 bg-[#0B1E3B] hover:bg-[#00C2CB] text-white rounded-xl disabled:opacity-50"
                    >
                      {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
                    </Button>
                  )}
                </div>

                <p className="text-xs text-center text-slate-500 pt-4">
                  By registering, you agree to our terms and privacy policy. Your account will be reviewed by an administrator.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
            
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
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00C2CB]">
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
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00C2CB]">
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
            <input
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
              onClick={(e) => e.target.showPicker && e.target.showPicker()}
              placeholder="Date of Birth"
              min="1900-01-01"
              max={today}
              className="input"
            />
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
          <button type="button" onClick={nextStep} className="btn bg-[#00C2CB] text-white">Next</button>
        ) : (
          <button type="submit" className="btn bg-[#00C2CB] text-white" disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Complete Registration'}
          </button>
        )}
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
}
