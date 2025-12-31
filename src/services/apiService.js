import axios from 'axios';

// 1. Initialize Axios with your LIVE Backend URL
const api = axios.create({
  // Points to your live Render backend
  baseURL: 'https://unda-youth-network-backend.onrender.com/api', 
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

// 4. Define the Champion Service (Pure Data Logic)
export const championService = {
  register: async (data) => {
    // Map Frontend (camelCase) to Backend (snake_case)
    // This matches your Phase 7 Database Schema exactly
    const payload = {
      full_name: data.fullName,
      gender: data.gender,
      date_of_birth: data.dob,
      phone_number: data.phone,
      alternative_phone_number: data.altPhone,
      county: data.county,
      
      // Safety Fields
      emergency_contact_name: data.emergencyName,
      emergency_contact_relationship: data.emergencyRelation,
      emergency_contact_phone: data.emergencyPhone,
      
      // Education Fields
      current_education_level: data.eduLevel,
      education_institution_name: data.institution,
      course_field_of_study: data.fieldOfStudy,
      year_of_study: data.yearOfStudy,
      
      // Source
      recruitment_source: data.recruitmentSource,
      date_of_application: data.dateOfApplication
    };

    return await api.post('/champions/register', payload);
  }
};

// 5. Single Default Export
export default api;