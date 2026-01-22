import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { Mail, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/apiService';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      // Send forgot password request. Backend should respond with 200 regardless to avoid enumeration.
      await api.post('/auth/forgot-password', { email });
      setMessage('If an account exists for this email, a password reset link was sent. Check your inbox.');
    } catch (err) {
      console.error('Forgot password error', err);
      setError(err.response?.data?.message || 'Unable to process request. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      navigate('/');
    } else {
      navigate('/portal');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-extrabold text-unda-navy mb-2">Forgot Password</h2>
          <p className="text-sm text-slate-500 mb-4">Enter the email address for your account and we'll send a reset link.</p>

          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 mb-3 flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {message && (
            <div className="p-3 rounded-md bg-green-50 text-green-700 mb-3">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs font-bold text-slate-500 uppercase">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={16} /></span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 h-12 rounded-lg bg-slate-50 border border-slate-200"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" className="h-12" disabled={loading}>
                {loading ? <><Loader2 className="animate-spin mr-2" size={16}/> Sending...</> : 'Send Reset Link'}
              </Button>
              <Button type="button" variant="ghost" onClick={handleBack}>Back</Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
