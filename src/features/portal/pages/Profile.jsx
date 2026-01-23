import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  Loader2,
  Camera,
  Shield,
  Lock,
  Key,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { profileService } from "@/services/apiService"; // Ensure this path matches your project structure
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef(null);
  const navigate = useNavigate();

  // Fetch real profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await profileService.getProfile();
        const data = res?.data || {};
        // If backend provides avatar URL, use it
        if (data.avatar_url || data.avatarUrl || data.profile_photo) {
          setAvatarPreview(data.avatar_url || data.avatarUrl || data.profile_photo);
        }
        setFormData({
          fullName: data.full_name || data.fullName || data.name || '',
          email: data.email || data.email_address || '',
          phone: data.phone_number || data.phone || '',
          location: data.location || data.county_sub_county || '',
        });
      } catch (error) {
        console.error('Failed to load profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    // Preview locally
    const url = URL.createObjectURL(f);
    setAvatarPreview(url);
    // Upload to server
    setUploading(true);
    try {
      const res = await profileService.uploadAvatar(f);
      // If server returns a definitive URL, update preview
      const data = res?.data || {};
      if (data.avatar_url || data.avatarUrl || data.profile_photo) {
        setAvatarPreview(data.avatar_url || data.avatarUrl || data.profile_photo);
      }
    } catch (err) {
      console.error('Avatar upload failed', err);
      // keep preview but consider notifying user in UI (not added here)
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Map to backend-friendly keys
      const payload = {
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        location: formData.location,
      };
      const res = await profileService.updateProfile(payload);
      const updated = res?.data || {};
      setFormData({
        fullName: updated.full_name || updated.fullName || formData.fullName,
        email: updated.email || formData.email,
        phone: updated.phone_number || updated.phone || formData.phone,
        location: updated.location || formData.location,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Update failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      {/* --- HEADER --- */}
      <div className="rounded-[2rem] bg-white p-8 mb-8 shadow-sm border border-[#E0F7FA] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0B1E3B]">
            My Profile
          </h2>
          <p className="text-sm text-[#00838F] font-medium mt-1">
            Manage your account settings and preferences.
          </p>
        </div>

        {/* Status Badge */}
        <div className="px-4 py-2 rounded-full bg-[#E0F7FA] border border-[#00ACC1] text-[#006064] flex items-center gap-2">
          <Shield size={16} className="text-[#00ACC1]" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Secure Account
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* --- LEFT COL: AVATAR & SECURITY --- */}
        <div className="md:col-span-4 lg:col-span-4 space-y-6">
          {/* 1. Avatar Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-[#E0F7FA] shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-6 group cursor-pointer">
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              <div onClick={handleAvatarClick} className="h-32 w-32 rounded-full bg-[#E0F7FA] border-4 border-white shadow-lg shadow-[#00ACC1]/10 flex items-center justify-center text-4xl font-black text-[#00ACC1] overflow-hidden">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt="Avatar" className="object-cover h-full w-full" />
                ) : (
                  (formData.fullName
                    ? formData.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .substring(0, 2)
                    : "U")
                )}
              </div>
              <div className="absolute inset-0 bg-[#0B1E3B]/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                {uploading ? <Loader2 className="text-white animate-spin" /> : <Camera className="text-white" size={24} />}
              </div>
            </div>

            <h2 className="text-xl font-extrabold text-[#0B1E3B]">
              {formData.fullName || "Member"}
            </h2>
            <p className="text-sm text-[#00838F] font-medium">
              {formData.email}
            </p>

            <div className="w-full pt-6 mt-6 border-t border-[#E0F7FA]">
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-[#00838F] font-bold uppercase tracking-wide">
                  Status
                </span>
                <span className="text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#00838F] font-bold uppercase tracking-wide">
                  Role
                </span>
                <span className="text-[#0B1E3B] font-bold">Champion</span>
              </div>
            </div>
          </div>

          {/* 2. Security Actions */}
          <div className="bg-white p-6 rounded-[2rem] border border-[#E0F7FA] shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={18} className="text-[#00ACC1]" />
              <h3 className="font-bold text-[#0B1E3B] text-sm uppercase tracking-wide">
                Security
              </h3>
            </div>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl font-bold text-[#0B1E3B] border-[#E0F7FA] hover:bg-[#F0FDFF] h-10"
                onClick={() => navigate('/portal/forgot')}
              >
                <Key size={14} className="mr-2 text-[#00838F]" /> Change
                Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl font-bold text-[#0B1E3B] border-[#E0F7FA] hover:bg-[#F0FDFF] h-10"
                onClick={() => navigate('/member/profile/2fa')}
              >
                <Shield size={14} className="mr-2 text-[#00838F]" /> Two-Factor
                Auth
              </Button>
            </div>
          </div>
        </div>

        {/* --- RIGHT COL: EDIT FORM --- */}
        <div className="md:col-span-8 lg:col-span-8">
          <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-[#E0F7FA] shadow-sm h-full">
            <div className="mb-8 border-b border-[#E0F7FA] pb-6">
              <h3 className="text-xl font-black text-[#0B1E3B]">
                Personal Information
              </h3>
              <p className="text-sm text-[#00838F] font-medium mt-1">
                Update your personal details and contact info.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#00838F] uppercase tracking-wider ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-3.5 text-[#00ACC1]"
                      size={18}
                    />
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-11 h-12 bg-white border-[#E0F7FA] focus:border-[#00ACC1] focus:ring-1 focus:ring-[#00ACC1] rounded-xl text-[#0B1E3B] font-bold placeholder:text-[#00838F]/40"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#00838F] uppercase tracking-wider ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-3.5 text-[#00ACC1]"
                      size={18}
                    />
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-11 h-12 bg-white border-[#E0F7FA] focus:border-[#00ACC1] focus:ring-1 focus:ring-[#00ACC1] rounded-xl text-[#0B1E3B] font-bold placeholder:text-[#00838F]/40"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#00838F] uppercase tracking-wider ml-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-4 top-3.5 text-[#00ACC1]"
                      size={18}
                    />
                    <Input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-11 h-12 bg-white border-[#E0F7FA] focus:border-[#00ACC1] focus:ring-1 focus:ring-[#00ACC1] rounded-xl text-[#0B1E3B] font-bold placeholder:text-[#00838F]/40"
                      placeholder="+254..."
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#00838F] uppercase tracking-wider ml-1">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-4 top-3.5 text-[#00ACC1]"
                      size={18}
                    />
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-11 h-12 bg-white border-[#E0F7FA] focus:border-[#00ACC1] focus:ring-1 focus:ring-[#00ACC1] rounded-xl text-[#0B1E3B] font-bold placeholder:text-[#00838F]/40"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-8 mt-4 border-t border-[#E0F7FA] flex items-center justify-end gap-4">
                {success && (
                  <span className="text-emerald-600 text-sm font-bold flex items-center gap-2 animate-in fade-in">
                    <Shield size={14} /> Saved!
                  </span>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  className="text-[#00838F] hover:text-[#0B1E3B] font-bold rounded-xl hover:bg-[#F0FDFF]"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#00C2CB] hover:bg-[#0097A7] text-white font-bold px-8 rounded-xl h-12 shadow-lg shadow-[#00C2CB]/20 transition-transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <Loader2 className="animate-spin mr-2" size={18} />
                  ) : (
                    <Save className="mr-2" size={18} />
                  )}
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
