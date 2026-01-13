import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('unda_token') : null;
  if (!token) {
    return <Navigate to="/portal" replace />;
  }
  return children;
}
