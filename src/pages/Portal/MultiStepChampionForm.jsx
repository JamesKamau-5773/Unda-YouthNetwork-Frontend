import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { memberService } from '@/services/apiService';
import { User, ShieldAlert, GraduationCap, Link2, ArrowRight, ArrowLeft, CheckCircle, Loader2, Eye, EyeOff, XCircle, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Layout from '../../components/shared/Layout';

// Password strength checker
const checkPasswordStrength = (password) => {
  const requirements = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
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

// InputField is outside the main component for performance
const InputField = ({ label, type = "text", value, onChange, placeholder, min, max }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const isDateField = type === 'date';
  const inputRef = useRef(null);

  const openDatePicker = () => {
    if (inputRef.current?.showPicker) inputRef.current.showPicker();
    else inputRef.current?.focus();
  };
  
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <input 
          ref={inputRef}
          type={isPasswordField && !showPassword ? 'password' : type} 
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={isDateField ? openDatePicker : undefined}
          onClick={isDateField ? openDatePicker : undefined}
          min={min}
          max={max}
          className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-[#0B1E3B] font-bold focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/20 focus:border-[#00C2CB] transition-all placeholder:text-slate-300"
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00C2CB] transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {isDateField && (
          <button
            type="button"
            onClick={openDatePicker}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00C2CB] transition-colors"
            aria-label="Open date picker"
          >
            <Calendar size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

const MultiStepChampionForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    // Account fields (required for registration)
    email: '', username: '', password: '', confirmPassword: '',
    // Personal info
    fullName: '', gender: '', dob: '', phone: '', altPhone: '', county: '',
    // Emergency contact
    emergencyName: '', emergencyRelation: '', emergencyPhone: '',
    // Education
    eduLevel: '', institution: '', fieldOfStudy: '', yearOfStudy: '',
    // Other
    recruitmentSource: '', dateOfApplication: new Date().toISOString().split('T')[0]
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    // Validate password strength
    const { requirements } = checkPasswordStrength(formData.password);
    const allReqsMet = Object.values(requirements).every(Boolean);
    
    if (!allReqsMet) {
      alert("Password must meet all requirements!");
      return;
    }
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await memberService.register(formData);
      if (response.status === 201 || response.status === 200) {
        alert("Registration Successful! Your account is pending admin approval. You will be notified once approved.");
        setFormData({
          email: '', username: '', password: '', confirmPassword: '',
          fullName: '', gender: '', dob: '', phone: '', altPhone: '', county: '',
          emergencyName: '', emergencyRelation: '', emergencyPhone: '',
          eduLevel: '', institution: '', fieldOfStudy: '', yearOfStudy: '',
          recruitmentSource: '', dateOfApplication: new Date().toISOString().split('T')[0]
        });
        setStep(1);
        navigate('/portal'); 
      }
    } catch (error) {
      console.error("Registration Error:", error);
      const errorMessage = error.response?.data?.error || "Registration failed. Please check your details and try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[#00C2CB]/10 flex items-center justify-center text-[#00C2CB]">
                <User size={24} />
              </div>
              <div>
                  <h3 className="text-2xl font-black text-[#0B1E3B]">Create Your Account</h3>
                <p className="text-slate-500 font-medium text-sm">Set up your login credentials and basic info.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <InputField label="Full Name" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              <InputField label="Email Address" type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <InputField label="Username" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
              <InputField label="Phone Number" type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            
            {/* Password Fields with Strength Meter - Full Width */}
            <div className="space-y-4 md:col-span-2">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-[#0B1E3B] font-bold focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/20 focus:border-[#00C2CB] transition-all placeholder:text-slate-300 pr-10"
                  />
                  {formData.password && (
                    <button
                      type="button"
                        onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00C2CB] transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  )}
                </div>
                
                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${checkPasswordStrength(formData.password).strengthColor}`}
                          style={{ width: `${(checkPasswordStrength(formData.password).metRequirements / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600">{checkPasswordStrength(formData.password).strength}</span>
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
                        const isMet = checkPasswordStrength(formData.password).requirements[req.key];
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
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Confirm Password</label>
                <div className="relative">
                  <input 
                      type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                    
                        className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-[#0B1E3B] font-bold focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/20 focus:border-[#00C2CB] transition-all placeholder:text-slate-300 pr-10"
                  />
                    {formData.confirmPassword && (
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#00C2CB] transition-colors"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    )}
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500">Passwords do not match</p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-xs text-green-500">Passwords match ✓</p>
                )}
              </div>
            </div>
            
            {/* Gender and other fields */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Gender</label>
                <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#0B1E3B] focus:border-[#00C2CB] outline-none" onChange={e => setFormData({...formData, gender: e.target.value})} value={formData.gender}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                </select>
              </div>

              <InputField
                label="Date of Birth"
                type="date"
                value={formData.dob}
                onChange={e => setFormData({...formData, dob: e.target.value})}
                min="1900-01-01"
                max={today}
              />
              <InputField label="County / Location" value={formData.county} onChange={e => setFormData({...formData, county: e.target.value})} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[#00C2CB]/10 flex items-center justify-center text-[#00C2CB]">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0B1E3B]">Emergency Contact</h3>
                <p className="text-slate-500 font-medium text-sm">Safety first. Who do we call?</p>
              </div>
            </div>

            <div className="space-y-5">
              <InputField label="Contact Name" value={formData.emergencyName} onChange={e => setFormData({...formData, emergencyName: e.target.value})} />
              <div className="grid md:grid-cols-2 gap-5">
                <InputField label="Relationship" value={formData.emergencyRelation} onChange={e => setFormData({...formData, emergencyRelation: e.target.value})} />
                <InputField label="Contact Phone" type="tel" value={formData.emergencyPhone} onChange={e => setFormData({...formData, emergencyPhone: e.target.value})} />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[#0090C0]/10 flex items-center justify-center text-[#0090C0]">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0B1E3B]">Education</h3>
                <p className="text-slate-500 font-medium text-sm">Tell us about your background.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Current Level</label>
                <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#0B1E3B] focus:border-[#00C2CB] outline-none" onChange={e => setFormData({...formData, eduLevel: e.target.value})} value={formData.eduLevel}>
                  <option value="">Select Level</option>
                  <option value="High School">High School</option><option value="TVET">TVET</option><option value="University">University</option><option value="Graduate">Graduate</option>
                </select>
              </div>
              <InputField label="Institution" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />
              <InputField label="Field of Study" value={formData.fieldOfStudy} onChange={e => setFormData({...formData, fieldOfStudy: e.target.value})} />
              <InputField label="Year of Study" value={formData.yearOfStudy} onChange={e => setFormData({...formData, yearOfStudy: e.target.value})} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-[#00C2CB]/10 flex items-center justify-center text-[#00C2CB]">
                <Link2 size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-[#0B1E3B]">Final Details</h3>
                <p className="text-slate-500 font-medium text-sm">Almost there. How did you find us?</p>
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Recruitment Source</label>
               <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold text-[#0B1E3B] focus:border-[#00C2CB] outline-none" onChange={e => setFormData({...formData, recruitmentSource: e.target.value})} value={formData.recruitmentSource}>
                  <option value="">Select Source</option>
                  <option value="Campus Edition">UMV Campus</option><option value="Mtaani">Mtaani</option><option value="Referral">Referral</option><option value="Social Media">Social Media</option>
                </select>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-teal-50 border border-teal-100 flex items-start gap-4">
              <CheckCircle className="text-[#00C2CB] mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-[#0B1E3B]">Ready to Submit?</h4>
                <p className="text-sm text-slate-600 mt-1">By clicking Complete, you agree to join the UNDA Youth Network as a support Peer Champion.</p>
              </div>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50 py-24 px-6 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-[0_20px_40px_rgba(11,30,59,0.05)] border border-white p-8 md:p-12 transition-all duration-500">
          
          <div className="flex justify-between items-center mb-10">
            <div>
               <h1 className="text-3xl font-black text-[#0B1E3B] tracking-tight">Join the Movement</h1>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Step {step} of 4</p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-2 w-8 rounded-full transition-all duration-300 ${step >= i ? 'bg-[#00C2CB]' : 'bg-slate-100'}`} />
              ))}
            </div>
          </div>

          <div className="min-h-[400px]">
            {renderStep()}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between items-center">
            {step > 1 ? (
              <Button onClick={prevStep} variant="ghost" className="text-slate-400 hover:text-[#0B1E3B] font-bold">
                <ArrowLeft className="mr-2" size={18} /> Back
              </Button>
            ) : <div />} 
            
            <Button 
              onClick={step === 4 ? handleSubmit : nextStep}
              disabled={isSubmitting} 
              className="h-14 px-8 rounded-xl bg-[#0B1E3B] text-white hover:bg-[#00C2CB] font-black shadow-lg shadow-[0_8px_24px_rgba(11,30,59,0.1)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                 <span className="flex items-center gap-2">Registering... <Loader2 className="animate-spin" size={18} /></span>
              ) : (
                 step === 4 ? 'Complete Registration' : <span className="flex items-center gap-2">Next Step <ArrowRight size={18} /></span>
              )}
            </Button>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default MultiStepChampionForm;