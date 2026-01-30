import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('unda_token') : null;
  const user = typeof window !== 'undefined' ? localStorage.getItem('unda_user') : null;
  const hasToken = token && token !== 'undefined' && token !== 'null';
  // Allow access if we have a bearer token or a persisted user object (session-based auth)
  if (!hasToken && !user) {
    return <Navigate to="/portal" replace />;
  }
  return children;
}
