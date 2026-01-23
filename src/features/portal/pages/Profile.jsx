import React, { useState } from 'react';
import PortalLayout from '../layout/PortalLayout';
import GlassCard from '@/components/ui/GlassCard';
import { User, Mail, Phone, MapPin, Save, Loader2, Camera, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { profileService } from '../../../services/apiService';

const Profile = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: ''
    });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
        await profileService.updateProfile(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
        console.error("Update failed", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <PortalLayout title="Profile" subtitle="Manage your account settings.">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Col: Avatar & Badges */}
                <div className="md:col-span-4 lg:col-span-3 space-y-6">
                <GlassCard className="p-6 flex flex-col items-center text-center">
                        <div className="relative mb-4 group cursor-pointer">
                        <div className="h-28 w-28 rounded-full bg-[#F0F7FF] border-4 border-white shadow-md flex items-center justify-center text-3xl font-bold text-[#334155] overflow-hidden">
                             {/* Placeholder for actual image */}
                             {formData.fullName.split(' ').map(n=>n[0]).join('')}
                        </div>
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={24} />
                        </div>
                    </div>
                    
                    <h2 className="text-lg font-bold text-[#1e293b] dark:text-white">{formData.fullName || '—'}</h2>
                    
                    <div className="w-full pt-4 border-t border-[#E6EEF2]">
                        <div className="flex items-center justify-between text-xs mb-2">
                           <span className="text-[#334155] font-medium">Membership</span>
                           <span className="text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full">Active</span>
                        </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-[#334155] font-medium">Role</span>
                                    <span className="text-[#1e293b] dark:text-white font-bold">Champion</span>
                                </div>
                    </div>
                </GlassCard>

                {/* Security Card */}
                 <GlassCard className="p-6">
                        <div className="flex items-center gap-2 mb-4">
                        <Shield size={16} className="text-[#00C2CB]" />
                        <h3 className="font-bold text-[#1e293b] dark:text-white text-sm">Security</h3>
                    </div>
                    <Button variant="outline" className="w-full text-xs h-9 justify-start">Change Password</Button>
                    <Button variant="outline" className="w-full text-xs h-9 justify-start mt-2">Two-Factor Auth</Button>
                  </GlassCard>
            </div>

            {/* Right Col: Form */}
                <div className="md:col-span-8 lg:col-span-9">
                <GlassCard className="p-8">
                    <div className="mb-6">
                                <h3 className="text-lg font-bold text-[#1e293b] dark:text-white">Personal Information</h3>
                                <p className="text-sm text-[#334155]">Update your contact details here.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#334155] uppercase">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-2.5 text-[#334155]" size={18} />
                                    <Input 
                                        name="fullName"
                                        value={formData.fullName} 
                                        onChange={handleChange}
                                        className="pl-10 bg-[#F0F7FF] border-[#E6EEF2] focus:bg-white"
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#334155] uppercase">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 text-[#334155]" size={18} />
                                    <Input 
                                        name="email"
                                        type="email"
                                        value={formData.email} 
                                        onChange={handleChange}
                                        className="pl-10 bg-[#F0F7FF] border-[#E6EEF2] focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#334155] uppercase">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-2.5 text-[#334155]" size={18} />
                                    <Input 
                                        name="phone"
                                        value={formData.phone} 
                                        onChange={handleChange}
                                        className="pl-10 bg-[#F0F7FF] border-[#E6EEF2] focus:bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-[#334155] uppercase">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 text-[#334155]" size={18} />
                                    <Input 
                                        name="location"
                                        value={formData.location} 
                                        onChange={handleChange}
                                        className="pl-10 bg-[#F0F7FF] border-[#E6EEF2] focus:bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[#E6EEF2] flex items-center justify-end gap-4">
                            {success && <span className="text-green-600 text-sm font-bold animate-in fade-in">Saved Successfully!</span>}
                                    <Button type="button" variant="ghost" className="text-[#334155] hover:text-[#1e293b] dark:hover:text-white">Cancel</Button>
                            <Button type="submit" disabled={loading} className="bg-[#00C2CB] hover:bg-[#0090C0] text-white font-bold px-6">
                                {loading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </GlassCard>
            </div>
        </div>
    </PortalLayout>
  );
};

export default Profile;
