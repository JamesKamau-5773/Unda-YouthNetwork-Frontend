import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { championService } from '@/services/apiService'; 
import { User, ShieldAlert, GraduationCap, Link2, ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Layout from '../../components/shared/Layout';

// InputField is outside the main component for performance
const InputField = ({ label, type = "text", value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} 
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-unda-navy font-bold focus:outline-none focus:ring-2 focus:ring-unda-teal/20 focus:border-unda-teal transition-all placeholder:text-slate-300"
    />
  </div>
);

const MultiStepChampionForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '', gender: '', dob: '', phone: '', altPhone: '', county: '',
    emergencyName: '', emergencyRelation: '', emergencyPhone: '',
    eduLevel: '', institution: '', fieldOfStudy: '', yearOfStudy: '',
    recruitmentSource: '', dateOfApplication: new Date().toISOString().split('T')[0]
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await championService.register(formData);
      if (response.status === 201 || response.status === 200) {
        alert("Registration Successful! Please log in.");
        navigate('/portal'); 
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration failed. Please check your connection.");
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
              <div className="h-12 w-12 rounded-xl bg-unda-teal/10 flex items-center justify-center text-unda-teal">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-unda-navy">Who are you?</h3>
                <p className="text-slate-500 font-medium text-sm">Basic identity details for your profile.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <InputField label="Full Name" placeholder="e.g. Juma Ochieng" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Gender</label>
                <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold text-unda-navy focus:border-unda-teal outline-none" onChange={e => setFormData({...formData, gender: e.target.value})} value={formData.gender}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                </select>
              </div>

              <InputField label="Date of Birth" type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
              <InputField label="Phone Number" type="tel" placeholder="07..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              <InputField label="Alt Phone" type="tel" placeholder="07..." value={formData.altPhone} onChange={e => setFormData({...formData, altPhone: e.target.value})} />
              <InputField label="County / Location" placeholder="e.g. Nairobi, Kibera" value={formData.county} onChange={e => setFormData({...formData, county: e.target.value})} />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-unda-orange/10 flex items-center justify-center text-unda-orange">
                <ShieldAlert size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-unda-navy">Emergency Contact</h3>
                <p className="text-slate-500 font-medium text-sm">Safety first. Who do we call?</p>
              </div>
            </div>

            <div className="space-y-5">
              <InputField label="Contact Name" placeholder="Parent / Guardian Name" value={formData.emergencyName} onChange={e => setFormData({...formData, emergencyName: e.target.value})} />
              <div className="grid md:grid-cols-2 gap-5">
                <InputField label="Relationship" placeholder="e.g. Mother, Brother" value={formData.emergencyRelation} onChange={e => setFormData({...formData, emergencyRelation: e.target.value})} />
                <InputField label="Contact Phone" type="tel" placeholder="07..." value={formData.emergencyPhone} onChange={e => setFormData({...formData, emergencyPhone: e.target.value})} />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-unda-yellow/10 flex items-center justify-center text-unda-yellow">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-unda-navy">Education</h3>
                <p className="text-slate-500 font-medium text-sm">Tell us about your background.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Current Level</label>
                <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold text-unda-navy focus:border-unda-teal outline-none" onChange={e => setFormData({...formData, eduLevel: e.target.value})} value={formData.eduLevel}>
                  <option value="">Select Level</option>
                  <option value="High School">High School</option><option value="TVET">TVET</option><option value="University">University</option><option value="Graduate">Graduate</option>
                </select>
              </div>
              <InputField label="Institution" placeholder="School / University Name" value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} />
              <InputField label="Field of Study" placeholder="Course Name" value={formData.fieldOfStudy} onChange={e => setFormData({...formData, fieldOfStudy: e.target.value})} />
              <InputField label="Year of Study" placeholder="e.g. Year 2" value={formData.yearOfStudy} onChange={e => setFormData({...formData, yearOfStudy: e.target.value})} />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-unda-teal/10 flex items-center justify-center text-unda-teal">
                <Link2 size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-unda-navy">Final Details</h3>
                <p className="text-slate-500 font-medium text-sm">Almost there. How did you find us?</p>
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Recruitment Source</label>
               <select className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 font-bold text-unda-navy focus:border-unda-teal outline-none" onChange={e => setFormData({...formData, recruitmentSource: e.target.value})} value={formData.recruitmentSource}>
                  <option value="">Select Source</option>
                  <option value="Campus Edition">Campus Edition</option><option value="Mtaani">Mtaani</option><option value="Referral">Referral</option><option value="Social Media">Social Media</option>
                </select>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-teal-50 border border-teal-100 flex items-start gap-4">
              <CheckCircle className="text-unda-teal mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-unda-navy">Ready to Submit?</h4>
                <p className="text-sm text-slate-600 mt-1">By clicking Complete, you agree to join the UNDA Youth Network as a volunteer Peer Champion.</p>
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
        <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-unda-navy/5 border border-white p-8 md:p-12 transition-all duration-500">
          
          <div className="flex justify-between items-center mb-10">
            <div>
               <h1 className="text-3xl font-black text-unda-navy tracking-tight">Join the Movement</h1>
               <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">Step {step} of 4</p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-2 w-8 rounded-full transition-all duration-300 ${step >= i ? 'bg-unda-teal' : 'bg-slate-100'}`} />
              ))}
            </div>
          </div>

          <div className="min-h-[400px]">
            {renderStep()}
          </div>

          <div className="mt-10 pt-8 border-t border-slate-100 flex justify-between items-center">
            {step > 1 ? (
              <Button onClick={prevStep} variant="ghost" className="text-slate-400 hover:text-unda-navy font-bold">
                <ArrowLeft className="mr-2" size={18} /> Back
              </Button>
            ) : <div />} 
            
            <Button 
              onClick={step === 4 ? handleSubmit : nextStep}
              disabled={isSubmitting} 
              className="h-14 px-8 rounded-xl bg-unda-navy text-white hover:bg-unda-teal font-black shadow-lg shadow-unda-navy/10 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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