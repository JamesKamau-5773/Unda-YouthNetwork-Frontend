import axios from 'axios';

// 1. Initialize Axios with Backend URL (auto-detects local vs production)
const api = axios.create({
  // Use local backend in development, production backend in production
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Request Interceptor: Attaches the Token to every request automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('unda_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3. Response Interceptor: Handles 401 Unauthorized (Logout logic)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the backend says "Token Invalid" or "Unauthorized", clear storage
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('unda_token');
      // Optional: You can force a reload or redirect here if strictly needed
      // window.location.href = '/portal'; 
    }
    return Promise.reject(error);
  }
);

// 4. Define the Member Registration Service (Public API)
export const memberService = {
  // Register a new member (public endpoint - no auth required)
  register: async (data) => {
    const payload = {
      full_name: data.fullName,
      email: data.email,
      phone_number: data.phone,
      username: data.username,
      password: data.password,
      // Optional fields
      date_of_birth: data.dob || null,
      gender: data.gender || null,
      county_sub_county: data.county || null
    };

    return await api.post('/api/auth/register', payload);
  }
};

// 5. Define the Champion Application Service (requires login)
export const championService = {
  // Apply to become a champion (requires authentication)
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

    return await api.post('/api/champion/apply', payload);
  }
};

// 5. Single Default Export
export default api;