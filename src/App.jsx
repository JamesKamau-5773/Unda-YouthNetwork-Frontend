import MultiStepChampionForm from './pages/Portal/MultiStepChampionForm';
import React from 'react';
import { ReferralProvider } from './context/ReferralContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Membership from './pages/Membership';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import PrivacyPolicy from './pages/PrivacyPolicy';
import BackgroundElements from './components/shared/BackgroundElements';
import PodcastPage from './pages/Podcast';
import PortalLogin from './pages/Portal/Login';
import WeeklyCheckInForm from './features/checkin/WeeklyCheckInForm';
import CampusEdition from './pages/workstreams/CampusEdition'; // Import the new CampusEdition page
import DebatersCircle from './pages/workstreams/DebatersCircle'; // Import DebatersCircle for routing
import UMVMtaani from './pages/workstreams/UMVMtaani';
import SeedFundingApplication from './pages/Programs/SeedFundingApplication';

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
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/portal" element={<PortalLogin />} />
              <Route path="/join" element={<MultiStepChampionForm />} />
              <Route path="/checkin" element={<WeeklyCheckInForm />} />
              <Route path="/podcast" element={<PodcastPage />} />
              <Route path="/campus" element={<CampusEdition />} />
              <Route path="/debaters-circle" element={<DebatersCircle />} />
              <Route path="/mtaani" element={<UMVMtaani />} />
              <Route path="/seed-funding-apply" element={<SeedFundingApplication />} />
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
