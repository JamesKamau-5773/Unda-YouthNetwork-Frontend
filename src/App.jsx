import React from 'react';
import { ReferralProvider } from './context/ReferralContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Site Components
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import BackgroundElements from './components/shared/BackgroundElements';

// Portal Pages
import MemberDashboard from './features/portal/pages/MemberDashboard';
import WellnessCheckInPortal from './features/portal/pages/WellnessCheckIn';
import Events from './features/portal/pages/Events';
import Certificate from './features/portal/pages/Certificate';
import Profile from './features/portal/pages/Profile';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Membership from './pages/Membership';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import Donate from './pages/Donate';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PodcastPage from './pages/Podcast';
import PortalLogin from './pages/Portal/Login';
import WeeklyCheckInForm from './features/checkin/WeeklyCheckInForm';
import Partner from './pages/Partner';
import Support from './pages/Support';
import CampusEdition from './pages/workstreams/CampusEdition';
import DebatersCircle from './pages/workstreams/DebatersCircle'; 
import UMVMtaani from './pages/workstreams/UMVMtaani';
import SeedFundingApplication from './pages/Programs/SeedFundingApplication';
import MultiStepChampionForm from './pages/Portal/MultiStepChampionForm';
import PortalGateway from './pages/PortalGateway';

function App() {
  return (
    <ReferralProvider>
      <Router>
        <div className="relative min-h-screen font-inter antialiased">
          
          <Routes>
            {/* PORTAL ROUTES (No Main Navbar/Footer) */}
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/check-in" element={<WellnessCheckInPortal />} />
            <Route path="/member/events" element={<Events />} />
            <Route path="/member/certificate" element={<Certificate />} />
            <Route path="/member/profile" element={<Profile />} />

            {/* MAIN WEBSITE ROUTES */}
            <Route path="*" element={
              <>
                {/* Global Background for Main Site */}
                <BackgroundElements />
                <Navbar />
                <main className="pt-20"> 
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
                    <Route path="/partner" element={<Partner />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/checkin" element={<WeeklyCheckInForm />} />
                    <Route path="/podcast" element={<PodcastPage />} />
                    <Route path="/campus" element={<CampusEdition />} />
                    <Route path="/debaters-circle" element={<DebatersCircle />} />
                    <Route path="/mtaani" element={<UMVMtaani />} />
                    <Route path="/seed-funding-apply" element={<SeedFundingApplication />} />
                    <Route path="/portal-gateway" element={<PortalGateway />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>

        </div>
      </Router>
    </ReferralProvider>
  );
}

export default App;
