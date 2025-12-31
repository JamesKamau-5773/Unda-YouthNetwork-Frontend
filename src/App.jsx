
import React from 'react';
import { ReferralProvider } from './context/ReferralContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Membership from './pages/Membership';
import BackgroundElements from './components/shared/BackgroundElements';
import PortalLogin from './features/auth/PortalLogin';
import WeeklyCheckInForm from './features/checkin/WeeklyCheckInForm';

function App() {
  return (
    <ReferralProvider>
      <Router>
        <div className="relative min-h-screen font-inter antialiased">
          {/* The creative background stays fixed behind all pages */}
          <BackgroundElements />
          {/* The Navbar stays at the top of every page */}
          <Navbar />
          {/* Main Content Area: Content changes based on URL */}
          <main className="pt-20"> {/* pt-20 ensures content isn't hidden under the fixed Navbar */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/portal" element={<PortalLogin />} />
              <Route path="/checkin" element={<WeeklyCheckInForm />} />
              {/* Future Day 4 Workstream Routes will go here */}
            </Routes>
          </main>
          {/* The Footer stays at the bottom of every page */}
          <Footer />
        </div>
      </Router>
    </ReferralProvider>
  );
}

export default App;
