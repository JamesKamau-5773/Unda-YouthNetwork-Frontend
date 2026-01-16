/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState(null);

  const triggerAlert = (message) => {
    setAlert(message);
    setTimeout(() => setAlert(null), 5000);
  };

  return (
    <AlertContext.Provider value={{ alert, triggerAlert }}>
      {children}
      {alert && (
        <div className="fixed top-6 right-6 z-50 bg-[#00C2CB] text-white px-6 py-3 rounded-xl shadow-xl font-bold">
          {alert}
        </div>
      )}
    </AlertContext.Provider>
  );
}
