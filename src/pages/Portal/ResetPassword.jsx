import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { Lock, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/apiService';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!password) return setError('Please enter a new password.');
    if (password !== confirm) return setError('Passwords do not match.');
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { token, password });
      setMessage('Password reset successful. You can now sign in.');
      setTimeout(() => navigate('/portal'), 1400);
    } catch (err) {
      console.error('Reset password error', err);
      setError(err.response?.data?.message || 'Unable to reset password. The link may be invalid or expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-extrabold text-unda-navy mb-2">Reset Password</h2>
          <p className="text-sm text-slate-500 mb-4">Set a new password for your account.</p>

          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 mb-3 flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {message && (
            <div className="p-3 rounded-md bg-green-50 text-green-700 mb-3">{message}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-xs font-bold text-slate-500 uppercase">New Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={16} /></span>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 h-12 rounded-lg bg-slate-50 border border-slate-200"
              />
            </div>

            <label className="block text-xs font-bold text-slate-500 uppercase">Confirm Password</label>
            <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="h-12 rounded-lg bg-slate-50 border border-slate-200" />

            <div className="flex items-center gap-3">
              <Button type="submit" className="h-12" disabled={loading}>{loading ? <><Loader2 className="animate-spin mr-2" size={16}/> Resetting...</> : 'Reset Password'}</Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/portal')}>Back</Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
