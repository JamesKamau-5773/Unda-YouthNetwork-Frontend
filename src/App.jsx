import React from 'react';
import { ReferralProvider } from './context/ReferralContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Main Site Components
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import BackgroundElements from './components/shared/BackgroundElements';
import ScrollToTop from './components/shared/ScrollToTop';

// Portal Pages
import MemberDashboard from './features/portal/pages/MemberDashboard';
import WellnessCheckInPortal from './features/portal/pages/WellnessCheckIn';
import Events from './features/portal/pages/Events';
import Certificate from './features/portal/pages/Certificate';
import Profile from './features/portal/pages/Profile';
import ProtectedRoute from './features/portal/ProtectedRoute';

// Main Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Membership from './pages/Membership';
import Resources from './pages/Resources';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import MindRootsParentCircle from './pages/MindRootsParentCircle';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PodcastPage from './pages/Podcast';
import PortalLogin from './pages/Portal/Login';
// Dev-only quick access (registered only in development)
import DevPortal from './pages/Dev/DevPortal';
import ForgotPassword from './pages/Portal/ForgotPassword';
import ResetPassword from './pages/Portal/ResetPassword';
import WeeklyCheckInForm from './features/checkin/WeeklyCheckInForm';
import Partner from './pages/Partner';
import Support from './pages/Support';
import CampusEdition from './pages/workstreams/CampusEdition';
import DebatersCircle from './pages/workstreams/DebatersCircle'; 
import UMVMtaani from './pages/workstreams/UMVMtaani';
import SeedFundingApplication from './pages/Programs/SeedFundingApplication';
import PortalGateway from './pages/PortalGateway';
import AnnualConference from './pages/programs/AnnualConference';
import Global from './pages/programs/Global';

function App() {
  return (
    <ReferralProvider>
      <Router>
        <ScrollToTop />
        <div className="relative min-h-screen font-inter antialiased">
          
          <Routes>
            {/* PORTAL ROUTES (No Main Navbar/Footer) */}
            <Route path="/member/dashboard" element={<ProtectedRoute><MemberDashboard /></ProtectedRoute>} />
            <Route path="/member/check-in" element={<ProtectedRoute><WellnessCheckInPortal /></ProtectedRoute>} />
            <Route path="/member/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
            <Route path="/member/certificate" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />
            <Route path="/member/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

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
                    <Route path="/contribute" element={<Support />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/portal" element={<PortalLogin />} />
                    {import.meta.env.DEV && (
                      <Route path="/dev-portal" element={<DevPortal />} />
                    )}
                    <Route path="/portal/forgot" element={<ForgotPassword />} />
                    <Route path="/portal/reset/:token" element={<ResetPassword />} />
                    {/* /join route removed — public Join form deprecated; membership actions happen in the portal */}
                    <Route path="/partner" element={<Partner />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/checkin" element={<WeeklyCheckInForm />} />
                    <Route path="/podcast" element={<PodcastPage />} />
                    <Route path="/mindroots-parent-circle" element={<MindRootsParentCircle />} />
                    <Route path="/campus" element={<CampusEdition />} />
                    <Route path="/debaters-circle" element={<DebatersCircle />} />
                    <Route path="/mtaani" element={<UMVMtaani />} />
                    <Route path="/programs/annual-conference" element={<AnnualConference />} />
                    <Route path="/programs/global" element={<Global />} />
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
