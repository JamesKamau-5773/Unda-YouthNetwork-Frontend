import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { Shield, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/apiService';

const PortalLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Attempt Login
      const response = await api.post('/auth/login', formData);
      
      // 2. Extract Token & User
      const { access_token, user } = response.data;
      
      // 3. Save to Storage
      localStorage.setItem('unda_token', access_token);
      if (user) {
        localStorage.setItem('unda_user', JSON.stringify(user));
      }

      // 4. Redirect
      navigate('/member/dashboard');

    } catch (err) {
      console.error('Login Failed:', err);
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center py-20 px-6">
        {/* The Gateway Card */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-unda-navy/5 w-full max-w-md border border-white relative overflow-hidden">
          {/* Decorative Background Blur */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-unda-teal/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

          <div className="text-center mb-10 relative z-10">
            <div className="h-16 w-16 bg-unda-navy rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-unda-navy/20">
              <Shield size={32} />
            </div>
            <h1 className="text-3xl font-black text-unda-navy mb-2">Portal Access</h1>
            <p className="text-slate-500 font-medium text-sm">
              Enter your credentials to continue.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            
            {error && (
              <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                <Input 
                  type="email" 
                  name="email"
                  
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-unda-teal focus:border-unda-teal"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                 <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                    <a href="#" className="text-xs font-bold text-unda-teal hover:underline">Forgot?</a>
                 </div>
                <Input 
                  type="password" 
                  name="password"
                  
                  className="h-12 rounded-xl bg-slate-50 border-slate-200 focus:ring-unda-teal focus:border-unda-teal"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-xl bg-unda-teal text-white hover:bg-unda-navy font-black text-sm uppercase tracking-widest shadow-xl shadow-unda-teal/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" /> Authenticating...
                </>
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2" size={18} />
                </>
              )}
            </Button>
          </form>

          {/* Security Badges */}
          <div className="mt-10 pt-8 border-t border-slate-50 flex justify-center gap-6 opacity-60">
             <div className="flex items-center gap-1.5 text-[9px] font-black text-unda-navy uppercase tracking-widest">
               <Lock size={10} className="text-unda-teal" /> SSL Secure
             </div>
             <div className="flex items-center gap-1.5 text-[9px] font-black text-unda-navy uppercase tracking-widest">
               <Shield size={10} className="text-unda-orange" /> Unda Guard
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PortalLogin;
