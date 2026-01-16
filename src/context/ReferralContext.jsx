/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const ReferralContext = createContext();

export function useReferral() {
  return useContext(ReferralContext);
}

export function ReferralProvider({ children }) {
  const [referralAlert, setReferralAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Trigger referral logic (called when a red flag is detected)
  const triggerReferral = async ({ reason, supervisorNotes, destination }) => {
    setLoading(true);
    setError(null);
    // No backend call, just show alert
    setReferralAlert({ reason, supervisorNotes, destination });
    setLoading(false);
    setTimeout(() => setReferralAlert(null), 7000);
  };

  return (
    <ReferralContext.Provider value={{ triggerReferral, referralAlert, loading, error }}>
      {children}
      {referralAlert && (
        <div className="fixed top-8 right-8 z-50 bg-[#00C2CB] text-white px-6 py-4 rounded-xl shadow-xl font-bold">
          <div>Referral Triggered!</div>
          <div>Reason: {referralAlert.reason}</div>
          <div>Supervisor Notes: {referralAlert.supervisorNotes}</div>
          <div>Destination: {referralAlert.destination}</div>
        </div>
      )}
      {error && (
        <div className="fixed top-20 right-8 z-50 bg-red-600 text-white px-6 py-3 rounded-xl shadow-xl font-bold">
          {error}
        </div>
      )}
    </ReferralContext.Provider>
  );
}
