import axios from 'axios';
import auth from '@/lib/auth';
import { Navigate } from 'react-router-dom';

// 1. Initialize Axios with Backend URL (auto-detects local vs production)
// In dev we prefer a relative baseURL so Vite's dev proxy (if enabled) forwards `/api` requests
// to the backend and avoids CORS. In production, prefer an explicit `VITE_API_URL` or the
// hard-coded production backend.
const baseURL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? '' : 'https://api.undayouth.org');

const api = axios.create({
  // Use the resolved baseURL
  baseURL,
  // Send cookies for session-based auth
  withCredentials: true,
  // Avoid requests hanging indefinitely if backend doesn't respond
  timeout: 15000, // 15 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const toIntegerId = (value) => {
  const num = Number(value);
  return Number.isFinite(num) && !Number.isNaN(num) ? num : null;
};

const getCachedUser = () => {
  try {
    const userStr = typeof window !== 'undefined' ? localStorage.getItem('unda_user') : null;
    return userStr ? JSON.parse(userStr) : null;
  } catch {
    return null;
  }
};

const extractChampionId = (data) => {
  if (!data || typeof data !== 'object') return null;
  const candidates = [
    data.champion_id,
    data.championId,
    data.championID,
    data.id,
    data.user_id,
    data.member_id
  ];
  for (const candidate of candidates) {
    const numeric = toIntegerId(candidate);
    if (numeric !== null) return numeric;
  }
  return null;
};

export const resolveChampionId = async (candidate) => {
  const direct = toIntegerId(candidate);
  if (direct !== null) return direct;

  const cachedUser = getCachedUser();
  const cachedNumeric = extractChampionId(cachedUser);
  if (cachedNumeric !== null) return cachedNumeric;

  try {
    const res = await api.get('/api/auth/me');
    const data = res?.data || {};
    const champion = data?.champion || null;
    const user = data?.user || data;
    const resolved = extractChampionId(champion) ?? extractChampionId(user);
    if (resolved !== null) {
      try {
        if (cachedUser && !cachedUser.champion_id) {
          localStorage.setItem('unda_user', JSON.stringify({
            ...cachedUser,
            champion_id: resolved
          }));
        }
      } catch {
        // ignore cache update errors
      }
      return resolved;
    }
  } catch {
    // ignore and fall through to error
  }

  throw new Error('Unable to resolve champion id to an integer.');
};

// 2. Request Interceptor: Attaches the Token to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = auth.getAccessToken();
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Handles 401 Unauthorized (Logout logic)
// Helper: queue requests while refreshing
let isRefreshing = false;
let refreshQueue = [];

function processQueue(error, token = null) {
  refreshQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  refreshQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't already tried refreshing, attempt refresh
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      // mark as retrying to avoid loops
      originalRequest._retry = true;

      if (isRefreshing) {
        // queue the request until refresh finishes
        return new Promise(function(resolve, reject) {
          refreshQueue.push({ resolve, reject });
        }).then((token) => {
          if (token) {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            return api(originalRequest);
          }
          return Promise.reject(error);
        });
      }

      isRefreshing = true;
      try {
        // Attempt to refresh token. Backend should set refresh token in HttpOnly cookie and
        // return a new access token in the JSON response: { access_token: '...' }
        const resp = await api.post('/api/auth/refresh', null, { withCredentials: true });
        const newToken = resp?.data?.access_token || null;
        if (newToken) {
          auth.setAccessToken(newToken);
          processQueue(null, newToken);
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          isRefreshing = false;
          return api(originalRequest);
        }
        // no token returned — fallthrough to clear auth
        processQueue(new Error('No refresh token'), null);
        isRefreshing = false;
        auth.clearAuth();
        return Promise.reject(error);
      } catch (refreshErr) {
        isRefreshing = false;
        processQueue(refreshErr, null);
        auth.clearAuth();
        return Promise.reject(refreshErr);
      }
    }

    // For other 401s (or if retry failed), clear auth to force login
    if (error.response && error.response.status === 401) {
      auth.clearAuth();
    }
    return Promise.reject(error);
  }
);

// 4. Define the Member Registration Service (Public API)
export const memberService = {
  // Register a new member (public endpoint - no auth required)
    register: async (data) => {
      // Prevent duplicate registrations while one is pending.
      // 1) If a local registration id exists, check its status with backend.
      // 2) If status is pending/under_review/submitted, reject the new registration.
      // 3) Allow registration only when previous registration is explicitly 'denied' or 'rejected'.
      try {
        const existingRegId = localStorage.getItem('unda_registration_id');
        if (existingRegId) {
          try {
            const res = await api.get(`/api/auth/registration/${existingRegId}`);
            const status = (res?.data?.status || '').toLowerCase();
            // Treat empty/unknown as pending to be safe
            if (status && (status === 'denied' || status === 'rejected')) {
              // allow new registration (previously denied)
            } else if (status && (status === 'approved' || status === 'accepted')) {
              return Promise.reject({ response: { status: 409, data: { message: 'Your account is already approved. Please sign in.' } } });
            } else {
              // pending or unknown
              return Promise.reject({ response: { status: 409, data: { message: 'You already have a pending registration. Please wait for admin approval before submitting another application.' } } });
            }
          } catch (err) {
            // If status check fails, be conservative and disallow duplicate submission
            return Promise.reject({ response: { status: 409, data: { message: 'A prior registration exists. Please wait for admin review.' } } });
          }
        }

        const payload = {
          full_name: data.fullName,
          phone_number: data.phone,
          username: data.username,
          password: data.password,
          // Optional fields
          email: data.email || undefined,
          date_of_birth: data.dob || null,
          gender: data.gender || null,
          county_sub_county: data.county || null
        };

        // POST to the public member registration endpoint as JSON
        const result = await api.post('/api/auth/register', payload, { withCredentials: true });
        // If registration succeeds and backend returns registration id, persist it locally
        try {
          const regId = result?.data?.registration_id || result?.data?.id || null;
          const status = result?.data?.status || 'pending';
          if (regId) {
            localStorage.setItem('unda_registration_id', regId);
            localStorage.setItem('unda_registration_status', status);
          }
        } catch (e) {
          // ignore local persist errors
        }
        return result;
      } catch (e) {
        return Promise.reject(e);
      }
    }
};

  // Check registration status by id (used to notify users when admin approves)
  memberService.getRegistrationStatus = async (registrationId) => {
    return await api.get(`/api/auth/registration/${registrationId}`);
  };

  // Cancel or withdraw a pending registration (public endpoint)
  memberService.cancelRegistration = async (registrationId) => {
    // Many backends support DELETE /api/auth/registration/:id to cancel
    // If your backend expects a different path (e.g. POST /cancel), adjust accordingly.
    return await api.delete(`/api/auth/registration/${registrationId}`);
  };

  // Certificate endpoints (frontend client)
  // Expected to return an object like: { issued: boolean, issued_at: string, certificate_url: string, trainings_completed: boolean }
  memberService.getMyCertificate = async () => {
    return await api.get('/api/members/me/certificate');
  };

  // Download server-generated certificate PDF (returns blob)
  memberService.downloadCertificate = async () => {
    return await api.get('/api/members/me/certificate/download', { responseType: 'blob' });
  };

  // Cancel a previously issued certificate (withdraw/revoke) - backend should verify ownership/permissions
  memberService.cancelCertificate = async () => {
    return await api.delete('/api/members/me/certificate');
  };

  // Request a re-issue of a certificate (e.g., lost copy) - backend will validate training and create a new certificate
  memberService.requestCertificateReissue = async () => {
    return await api.post('/api/members/me/certificate/reissue');
  };

// 5. Define the Champion Application Service (requires login)
export const championService = {
  // Champion self-registration (public) — use /api/champions/register
  register: async (data) => {
    const payload = {
      full_name: data.fullName,
      gender: data.gender,
      date_of_birth: data.dob,
      phone_number: data.phone,
      county_sub_county: data.county,
      consent_obtained: !!data.consent_obtained,
      // optional
      email: data.email || undefined,
      alternative_phone_number: data.alternativePhone || undefined,
      emergency_contact_name: data.emergencyName || undefined,
      emergency_contact_phone: data.emergencyPhone || undefined,
      current_education_level: data.eduLevel || undefined,
      education_institution_name: data.institution || undefined,
      course_field_of_study: data.fieldOfStudy || undefined,
      year_of_study: data.yearOfStudy || undefined,
      motivation: data.motivation || undefined,
      recruitment_source: data.recruitmentSource || undefined
    };

    return await api.post('/api/champions/register', payload, { withCredentials: true });
  },

  // Backwards-compatible apply method (keeps previous behaviour if used elsewhere)
  apply: async (data) => {
    const payload = {
      date_of_birth: data.dob,
      gender: data.gender,
      county_sub_county: data.county,
      emergency_contact_name: data.emergencyName,
      emergency_contact_relationship: data.emergencyRelation,
      emergency_contact_phone: data.emergencyPhone,
      current_education_level: data.eduLevel,
      education_institution_name: data.institution,
      course_field_of_study: data.fieldOfStudy,
      year_of_study: data.yearOfStudy,
      motivation: data.motivation || '',
      recruitment_source: data.recruitmentSource
    };

    return await api.post('/api/champion/apply', payload, { withCredentials: true });
  }
};

// 6. Check-In Service
export const checkInService = {
  submitCheckIn: async (data) => {
    // Validate or transform data if needed
    const championIdValue = await resolveChampionId(data.championId);

    const payload = {
      champion_id: championIdValue,
      phq2_score: parseInt(data.phq2Score),
      gad2_score: parseInt(data.gad2Score),
      reason: data.reason,
      supervisor_notes: data.supervisorNotes,
      referral_destination: data.destination,
      red_flag_detected: data.isRedFlag || false
    };
    // Debug: log token and payload to help diagnose 401s in network requests
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('unda_token') : null;
      console.debug('checkInService.submitCheckIn token=', token);
      console.debug('checkInService.submitCheckIn expected Authorization=', token ? `Bearer ${token}` : null);
      console.debug('checkInService.submitCheckIn payload=', payload);
      console.debug('checkInService.submitCheckIn axios.defaults.headers=', api && api.defaults && api.defaults.headers);
    } catch (e) {
      // ignore logging errors
    }

    const token = auth.getAccessToken();
    return await api.post('/api/checkin', payload, {
      withCredentials: true,
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    });
  }
};

// 7. Member Profile Service (Protected)
export const profileService = {
  getProfile: async () => {
    // New backend provides a consolidated auth/me endpoint that returns camelCase user and champion data
    return await api.get('/api/auth/me');
  },
  updateProfile: async (data) => {
    return await api.put('/api/auth/me', data);
  },
  // Upload avatar/profile photo: attempt dedicated avatar endpoint, fallback to multipart PUT
  uploadAvatar: async (file) => {
    const form = new FormData();
    form.append('avatar', file);
    // Try dedicated endpoint first
    try {
      return await api.post('/api/auth/me/avatar', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch (err) {
      // Fallback: some backends accept multipart PUT to the auth/me endpoint
      return await api.put('/api/auth/me', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
  }
  ,
  // Upload avatar/profile photo: attempt dedicated avatar endpoint, fallback to multipart PUT
  uploadAvatar: async (file) => {
    const form = new FormData();
    form.append('avatar', file);
    // Try dedicated endpoint first
    try {
      return await api.post('/api/members/me/avatar', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch (err) {
      // Fallback: some backends accept multipart PUT to member endpoint
      return await api.put('/api/members/me', form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
  }
};

// 5. Single Default Export
export default api;