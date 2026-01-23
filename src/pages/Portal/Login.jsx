import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/shared/Layout';
import { Shield, Lock, ArrowRight, Loader2, AlertCircle, Eye, EyeOff, Mail, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api, { memberService } from '@/services/apiService';
import parseErrorForUser from '@/lib/errorUtils';
import { useAlert } from '@/components/shared/GlobalAlert';

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
    identifier: '', // email or username
    password: ''
  });
  const [signupData, setSignupData] = useState({ fullName: '', email: '', username: '', phone: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginPwdFocused, setLoginPwdFocused] = useState(false);
  const [signupPwdFocused, setSignupPwdFocused] = useState(false);
  const [regId, setRegId] = useState(null);
  const [regStatus, setRegStatus] = useState(null);
  const [regMessage, setRegMessage] = useState(null);
  const [checkingReg, setCheckingReg] = useState(false);

  // Password evaluation helper
  const evaluatePassword = (pwd) => {
    const lengthOk = pwd.length >= 8;
    const upperOk = /[A-Z]/.test(pwd);
    const lowerOk = /[a-z]/.test(pwd);
    const numberOk = /[0-9]/.test(pwd);
    const specialOk = /[^A-Za-z0-9]/.test(pwd);
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
      try { payload = JSON.parse(raw); } catch { payload = raw; }
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
        try { msg = JSON.stringify(payload); } catch { msg = String(payload); }
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

    // final fallback: return a cleaned message snippet (strip common JSON punctuation)
    if (msg) return msg.split('').filter(c => !'{}[]"'.includes(c)).join('').slice(0, 240);
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
      // 1. Attempt Login - accept either username or email in a single identifier field
      const identifier = (formData.identifier || '').trim();
      const payload = identifier.includes('@')
        ? { username: identifier, email: identifier, password: formData.password }
        : { username: identifier, password: formData.password };
      const response = await api.post('/api/auth/login', payload);
      
      // 2. Extract Token & User
      const { access_token, user } = response.data;
      
      // 3. Save to Storage
      localStorage.setItem('unda_token', access_token);
      if (user) {
        localStorage.setItem('unda_user', JSON.stringify(user));
      }

      // Clear any saved registration flags — user is now authenticated/approved
      try {
        localStorage.removeItem('unda_registration_id');
        localStorage.removeItem('unda_registration_status');
      } catch (err) {
        // ignore
      }
      try {
        if (typeof setRegId === 'function') setRegId(null);
        if (typeof setRegStatus === 'function') setRegStatus(null);
        if (typeof setRegMessage === 'function') setRegMessage(null);
      } catch (err) {
        // ignore
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
      setError(parseErrorForUser(err));
    } finally {
      setLoading(false);
    }
  };

  const { triggerAlert } = useAlert();

  const handleBack = () => {
    // Always navigate back to the main home page
    navigate('/');
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

      // Use memberService.register to ensure the same registration payload
      const res = await memberService.register({
        fullName: signupData.fullName,
        email: signupData.email,
        username: signupData.username,
        phone: signupData.phone,
        password: signupData.password,
        dob: signupData.dob,
        gender: signupData.gender,
        county: signupData.county
      });

      // Show a clear message: account submitted and pending approval
      const { registration_id, status, message } = res.data || {};
      triggerAlert(message || 'Application submitted. Your account is under review by an administrator.');

      // Persist registration id so we can poll for approval and notify when approved
      if (registration_id) {
        localStorage.setItem('unda_registration_id', registration_id);
        localStorage.setItem('unda_registration_status', status || 'Pending');
      }

      // Do not auto-signin when registration is pending — show signin form
      setMode('signin');
      setFormData({ identifier: signupData.email || signupData.username || '', password: '' });
    } catch (err) {
      const serverData = err?.response?.data;
      const serverMessage = serverData?.message || (typeof serverData === 'string' ? serverData : JSON.stringify(serverData || {}));
      console.error('Signup failed', { err, serverData });
      setError(parseErrorForUser(err));
    } finally {
      setLoading(false);
    }
  };

  // Check for existing registration stored in localStorage and fetch status
  React.useEffect(() => {
    const id = localStorage.getItem('unda_registration_id');
    const localStatus = localStorage.getItem('unda_registration_status');
    if (!id) return;
    setRegId(id);
    if (localStatus) setRegStatus(localStatus);

    const fetchStatus = async () => {
      setCheckingReg(true);
      try {
        const res = await memberService.getRegistrationStatus(id);
        const status = (res?.data?.status || res?.data?.state || '').toString();
        const message = res?.data?.message || res?.data?.detail || '';
        setRegStatus(status);
        setRegMessage(message);
        localStorage.setItem('unda_registration_status', status);
      } catch (err) {
        // ignore — we'll keep local info
      } finally {
        setCheckingReg(false);
      }
    };

    // Fetch immediately
    fetchStatus();
  }, []);

  const refreshRegistrationStatus = async () => {
    if (!regId) return;
    setCheckingReg(true);
    try {
      const res = await memberService.getRegistrationStatus(regId);
      const status = (res?.data?.status || res?.data?.state || '').toString();
      const message = res?.data?.message || res?.data?.detail || '';
      setRegStatus(status);
      setRegMessage(message);
      localStorage.setItem('unda_registration_status', status);
    } catch (err) {
      // noop
    } finally {
      setCheckingReg(false);
    }
  };

  const cancelRegistration = async () => {
    if (!regId) return;
    const ok = window.confirm('Are you sure you want to cancel your pending registration? This cannot be undone.');
    if (!ok) return;
    setCheckingReg(true);
    try {
      await memberService.cancelRegistration(regId);
      // Clear local flags and state
      localStorage.removeItem('unda_registration_id');
      localStorage.removeItem('unda_registration_status');
      setRegId(null);
      setRegStatus(null);
      setRegMessage(null);
      triggerAlert('Your registration has been cancelled. You may re-apply if needed.');
    } catch (err) {
      console.error('Cancel registration failed', err);
      const msg = err?.response?.data?.message || 'Unable to cancel registration. Please try again later.';
      triggerAlert(msg);
    } finally {
      setCheckingReg(false);
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
                                  onClick={handleBack}
                                  className="absolute top-4 -left-4 md:left-4 text-sm text-slate-500 hover:text-unda-navy"
                                  aria-label="Go back"
                                >
                                  ← Back
                                </button>
                        )}
                    {mode === 'signin' && (
                          <button
                            type="button"
                            onClick={handleBack}
                            className="absolute top-4 -left-4 md:left-4 text-sm text-slate-500 hover:text-unda-navy"
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

              {/* Persistent registration banner (if registration exists) */}
              {regId && regStatus && (
                <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${regStatus.toLowerCase().includes('approve') || regStatus.toLowerCase() === 'approved' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : regStatus.toLowerCase().includes('deny') || regStatus.toLowerCase().includes('reject') ? 'bg-red-50 text-red-800 border border-red-100' : 'bg-amber-50 text-amber-800 border border-amber-100'}`}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-bold">Registration status: <span className="uppercase">{regStatus}</span></div>
                      <div className="text-xs text-slate-500">ID: {regId}</div>
                    </div>
                    <div className="text-sm mt-2 text-slate-700">
                      {regStatus && regStatus.toLowerCase().includes('approve') ? (
                        'Your account has been approved. Please sign in.'
                      ) : regStatus && (regStatus.toLowerCase().includes('deny') || regStatus.toLowerCase().includes('reject')) ? (
                        (regMessage && <>{regMessage} — please correct any issues and reapply.</>) || 'Your registration was denied. Fix any issues and reapply.'
                      ) : (
                        (regMessage && <>{regMessage}</>) || 'Your registration is pending admin approval. Please wait; this may take a few days.'
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2">
                    <button onClick={refreshRegistrationStatus} disabled={checkingReg} className="px-3 py-1 rounded-md bg-white border text-sm shadow-sm hover:bg-slate-50">
                      {checkingReg ? 'Checking...' : 'Refresh'}
                    </button>
                    {/* Show Cancel when registration appears to be pending */}
                    {!regStatus?.toLowerCase()?.includes('approve') && !regStatus?.toLowerCase()?.includes('approved') && !regStatus?.toLowerCase()?.includes('deny') && !regStatus?.toLowerCase()?.includes('reject') && (
                      <button onClick={cancelRegistration} disabled={checkingReg} className="px-3 py-1 rounded-md bg-white border text-sm shadow-sm hover:bg-slate-50 text-red-600">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              )}

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
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email or Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={16} /></span>
                    <Input 
                      type="text" 
                      name="identifier"
                      aria-label="Email or username"
                      className="h-12 rounded-xl bg-slate-50 border border-slate-200 pl-10 focus:ring-2 focus:ring-unda-teal/40 focus:border-unda-teal"
                      value={formData.identifier}
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
                  <Input type="email" name="email" value={signupData.email} onChange={handleSignupChange} className="h-12 rounded-xl bg-slate-50 border border-slate-200" />
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
                      onFocus={() => setSignupPwdFocused(true)}
                      onBlur={() => setSignupPwdFocused(false)}
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
