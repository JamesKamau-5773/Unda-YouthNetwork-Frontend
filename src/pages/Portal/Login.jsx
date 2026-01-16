import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { Shield, Lock, ArrowRight, Loader2, AlertCircle, Eye, EyeOff, Mail, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/services/apiService';

const PortalLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'

  React.useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (q.get('mode') === 'signup') setMode('signup');
  }, [location.search]);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({ fullName: '', email: '', username: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginPwdFocused, setLoginPwdFocused] = useState(false);
  const [signupPwdFocused, setSignupPwdFocused] = useState(false);

  // Password evaluation helper
  const evaluatePassword = (pwd) => {
    const lengthOk = pwd.length >= 8;
    const upperOk = /[A-Z]/.test(pwd);
    const lowerOk = /[a-z]/.test(pwd);
    const numberOk = /[0-9]/.test(pwd);
    const specialOk = /[!@#$%^&*(),.?"':{}|<>\-_=+\\/]/.test(pwd);
    const score = [lengthOk, upperOk, lowerOk, numberOk, specialOk].filter(Boolean).length;
    let label = 'Very weak';
    if (score >= 4) label = 'Strong';
    else if (score === 3) label = 'Medium';
    else if (score === 2) label = 'Weak';
    return { lengthOk, upperOk, lowerOk, numberOk, specialOk, score, label };
  };

  const PasswordIndicator = ({ password, focused }) => {
    if (!password) return null;
    const p = evaluatePassword(password);
    // Hide indicator when password is already strong
    if (p.score >= 4) return null;
    // Show only when focused
    if (!focused) return null;
    const pct = Math.round((p.score / 5) * 100);
    const barColor = p.score >= 4 ? 'bg-emerald-500' : p.score === 3 ? 'bg-amber-400' : 'bg-red-400';
    return (
      <div className="mt-2">
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className={`${barColor} h-2`} style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
          <div className="font-semibold">Strength: {p.label}</div>
          <div className="text-[11px]">{pct}%</div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 text-[12px]">
          <div className="flex items-center gap-2" style={{ color: p.lengthOk ? undefined : '#dc2626' }}>
            {p.lengthOk ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span>Min 8 characters</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: p.upperOk ? undefined : '#dc2626' }}>
            {p.upperOk ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span>Uppercase letter</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: p.lowerOk ? undefined : '#dc2626' }}>
            {p.lowerOk ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span>Lowercase letter</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: p.numberOk ? undefined : '#dc2626' }}>
            {p.numberOk ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span>Number</span>
          </div>
          <div className="flex items-center gap-2 col-span-2" style={{ color: p.specialOk ? undefined : '#dc2626' }}>
            {p.specialOk ? <Check size={14} className="text-emerald-500" /> : <X size={14} className="text-red-500" />}
            <span>Special character (e.g. !@#$%)</span>
          </div>
        </div>
      </div>
    );
  };

  // Format server or axios errors into friendly user-facing messages
  const formatErrorMessage = (raw) => {
    if (!raw) return 'Something went wrong. Please try again.';

    // If server returned a JSON string, try to parse it
    let payload = raw;
    if (typeof raw === 'string') {
      try { payload = JSON.parse(raw); } catch (e) { payload = raw; }
    }

    let msg = '';
    if (typeof payload === 'string') msg = payload;
    else if (payload && typeof payload === 'object') {
      if (payload.message) msg = payload.message;
      else if (payload.error) msg = payload.error;
      else if (payload.detail) msg = payload.detail;
      else if (payload.msg) msg = payload.msg;
      else if (payload.errors) {
        if (Array.isArray(payload.errors)) msg = payload.errors.map(e => (e.message || e)).join('; ');
        else if (typeof payload.errors === 'object') msg = Object.values(payload.errors).flat().join('; ');
        else msg = String(payload.errors);
      } else {
        // fallback to a safe stringify
        try { msg = JSON.stringify(payload); } catch (e) { msg = String(payload); }
      }
    }

    const lower = (msg || '').toLowerCase();
    if ((lower.includes('missing') && (lower.includes('username') || lower.includes('password') || lower.includes('email'))) || lower.includes('required')) {
      return 'Please enter both email and password.';
    }
    if (lower.includes('invalid credentials') || lower.includes('incorrect') || (lower.includes('invalid') && lower.includes('password'))) {
      return 'Email or password is incorrect. Please check and try again.';
    }
    if (lower.includes('user not found') || lower.includes('no user')) return 'No account found with that email address.';
    if (lower.includes('already exists') || lower.includes('user exists')) return 'An account with this email already exists. Try signing in or resetting your password.';
    if (lower.includes('phone')) return 'Please enter your phone number.';
    if (lower.includes('weak')) return 'Your password is too weak. Try adding numbers, uppercase letters, and special characters.';

    // final fallback: return a cleaned message snippet
    if (msg) return msg.replace(/[{}\[\]"]+/g, '').slice(0, 240);
    return 'Something went wrong. Please try again.';
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Attempt Login - some backends expect `username` instead of `email`
      const payload = {
        username: formData.email,
        password: formData.password
      };
      const response = await api.post('/api/auth/login', payload);
      
      // 2. Extract Token & User
      const { access_token, user } = response.data;
      
      // 3. Save to Storage
      localStorage.setItem('unda_token', access_token);
      if (user) {
        localStorage.setItem('unda_user', JSON.stringify(user));
      }

      // 4. Redirect (respect `next` query param when present)
      const q = new URLSearchParams(location.search);
      const next = q.get('next');
      if (next) {
        navigate(next);
      } else {
        navigate('/member/dashboard');
      }

    } catch (err) {
      const serverData = err?.response?.data;
      const serverMessage = serverData?.message || (typeof serverData === 'string' ? serverData : JSON.stringify(serverData || {}));
      console.error('Login Failed:', { err, serverData });
      setError(formatErrorMessage(serverData || serverMessage || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!signupData.fullName || !signupData.password) {
        setError('Please complete all required fields.');
        setLoading(false);
        return;
      }
      if (signupData.password !== signupData.confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }

      // Call registration endpoint
      // Build payload: allow email to be optional, but ensure username exists
      const derivedUsername = signupData.username || signupData.email || (signupData.fullName ? signupData.fullName.replace(/\s+/g, '').toLowerCase().slice(0, 16) + Math.floor(Math.random() * 900 + 100) : 'user' + Date.now());
      const payload = {
        full_name: signupData.fullName,
        username: derivedUsername,
        phone_number: signupData.phone,
        password: signupData.password
      };
      if (signupData.email) payload.email = signupData.email;

      const res = await api.post('/api/auth/register', payload);

      // If backend returns token, auto-login
      const { access_token, user } = res.data || {};
      if (access_token) {
        localStorage.setItem('unda_token', access_token);
        if (user) localStorage.setItem('unda_user', JSON.stringify(user));
        const q = new URLSearchParams(location.search);
        const next = q.get('next');
        if (next) {
          navigate(next);
        } else {
          navigate('/member/dashboard');
        }
      } else {
        // fallback — switch to signin and prefill email
        setMode('signin');
        setFormData({ email: signupData.email, password: '' });
      }
    } catch (err) {
      const serverData = err?.response?.data;
      const serverMessage = serverData?.message || (typeof serverData === 'string' ? serverData : JSON.stringify(serverData || {}));
      console.error('Signup failed', { err, serverData });
      setError(formatErrorMessage(serverData || serverMessage || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center py-20 px-6">
        {/* The Gateway Card */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_rgba(11,30,59,0.08)] w-full max-w-md relative overflow-hidden border border-white/60">
            {/* Decorative Gradient Glow */}
            <div className="absolute -top-20 -left-20 w-56 h-56 bg-gradient-to-br from-[#00C2CB]/20 via-[#6EE7B7]/8 to-[#0B1E3B]/6 rounded-full blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-gradient-to-tr from-[#6b21a8]/6 via-[#00C2CB]/6 to-[#0B1E3B]/6 rounded-full blur-3xl pointer-events-none" aria-hidden />

              <div className="text-center mb-6 relative z-10">
                    {mode === 'signup' && (
                          <button
                            type="button"
                            onClick={() => navigate('/member/dashboard')}
                            className="absolute left-4 top-4 text-sm text-slate-500 hover:text-unda-navy"
                            aria-label="Go back"
                          >
                            ← Back
                          </button>
                        )}
                    {mode === 'signin' && (
                          <button
                            type="button"
                            onClick={() => navigate('/member/dashboard')}
                            className="absolute left-4 top-4 text-sm text-slate-500 hover:text-unda-navy"
                            aria-label="Go back"
                          >
                            ← Back
                          </button>
                        )}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <button type="button" onClick={() => setMode('signin')} className={`px-4 py-2 rounded-xl ${mode === 'signin' ? 'bg-[#00C2CB]/10 text-unda-navy font-bold' : 'text-slate-500 hover:text-unda-navy'}`}>
                    Sign In
                  </button>
                  <button type="button" onClick={() => setMode('signup')} className={`px-4 py-2 rounded-xl ${mode === 'signup' ? 'bg-[#00C2CB]/10 text-unda-navy font-bold' : 'text-slate-500 hover:text-unda-navy'}`}>
                    Sign Up
                  </button>
                </div>
                <div className="h-18 w-18 rounded-3xl flex items-center justify-center mx-auto mb-3" style={{background: 'linear-gradient(135deg,#00E5FF,#0B1E3B)'}}>
                  <div className="h-12 w-12 rounded-lg bg-white flex items-center justify-center shadow-md">
                    <Shield size={28} className="text-[#0B1E3B]" />
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-unda-navy">Portal Access</h1>
                <p className="text-slate-500 font-medium text-sm mt-2">Enter your credentials to continue.</p>
              </div>

          {/* Login / Signup Form */}
          {mode === 'signin' ? (
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
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={16} /></span>
                    <Input 
                      type="email" 
                      name="email"
                      aria-label="Email address"
                      className="h-12 rounded-xl bg-slate-50 border border-slate-200 pl-10 focus:ring-2 focus:ring-unda-teal/40 focus:border-unda-teal"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label htmlFor="portal-password" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                    <a href="/portal/forgot" className="text-xs font-bold text-unda-teal hover:underline">Forgot?</a>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={16} /></span>
                    <Input 
                      id="portal-password"
                      type={showPassword ? 'text' : 'password'} 
                      name="password"
                      aria-label="Password"
                      className="h-12 rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-12 focus:ring-2 focus:ring-unda-teal/40 focus:border-unda-teal"
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setLoginPwdFocused(true)}
                      onBlur={() => setLoginPwdFocused(false)}
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-unda-navy">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <PasswordIndicator password={formData.password} focused={loginPwdFocused} />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#0B1E3B] text-white font-black text-sm uppercase tracking-widest shadow-2xl transition-transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                disabled={loading}
                aria-busy={loading}
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
              <div className="text-center text-sm text-slate-500 mt-2">Don't have an account? <button type="button" onClick={() => setMode('signup')} className="text-unda-teal font-bold">Sign Up</button></div>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6 relative z-10">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                  <Input name="fullName" value={signupData.fullName} onChange={handleSignupChange} required className="h-12 rounded-xl bg-slate-50 border border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                  <Input type="email" name="email" value={signupData.email} onChange={handleSignupChange} required className="h-12 rounded-xl bg-slate-50 border border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Phone Number</label>
                  <Input type="tel" name="phone" value={signupData.phone} onChange={handleSignupChange} required placeholder="e.g. +254712345678" className="h-12 rounded-xl bg-slate-50 border border-slate-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Choose Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={16} /></span>
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={signupData.password}
                      onChange={handleSignupChange}
                      required
                      className="h-12 rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-12"
                    />
                    <button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-unda-navy">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <PasswordIndicator password={signupData.password} focused={signupPwdFocused} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Lock size={16} /></span>
                    <Input
                      id="signup-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={signupData.confirmPassword}
                      onChange={handleSignupChange}
                      required
                      className="h-12 rounded-xl bg-slate-50 border border-slate-200 pl-10 pr-12"
                    />
                    <button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-unda-navy">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-14 rounded-xl bg-[#0B1E3B] text-white font-black" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
              <div className="text-center text-sm text-slate-500 mt-2">Already signed up? <button type="button" onClick={() => setMode('signin')} className="text-unda-teal font-bold">Sign In</button></div>
            </form>
          )}

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
