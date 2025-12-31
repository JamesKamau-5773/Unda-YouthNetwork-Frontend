import MultiStepChampionForm from './pages/Portal/MultiStepChampionForm';
import React from 'react';
import { ReferralProvider } from './context/ReferralContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import Membership from './pages/Membership';
import BackgroundElements from './components/shared/BackgroundElements';
import PodcastPage from './pages/Podcast';
import PortalLogin from './pages/Portal/Login';
import WeeklyCheckInForm from './features/checkin/WeeklyCheckInForm';
import CampusEdition from './pages/workstreams/CampusEdition'; // Import the new CampusEdition page
import DebatersCircle from './pages/workstreams/DebatersCircle'; // Import DebatersCircle for routing
import UMVMtaani from './pages/workstreams/UMVMtaani';

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

              {/* NEW: The Registration Funnel (Day 6) */}
              <Route path="/join" element={<MultiStepChampionForm />} />
              <Route path="/checkin" element={<WeeklyCheckInForm />} />
              <Route path="/podcast" element={<PodcastPage />} />
              <Route path="/campus" element={<CampusEdition />} /> {/* New route for CampusEdition */}
              <Route path="/debaters-circle" element={<DebatersCircle />} /> {/* Route for DebatersCircle */}
              <Route path="/mtaani" element={<UMVMtaani />} />
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
