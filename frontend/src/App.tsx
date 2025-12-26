import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About';
import Blog from './pages/Blog';
import SellLand from './pages/SellLand';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/layout/ProtectedRoute';
import AuthModal from './components/layout/AuthModal';
import { AuthProvider } from './hooks/useAuth';

function App() {
  return (
    <GoogleOAuthProvider clientId="232020880038-7lttujdnm22glmd4quvps3qnmalqp45l.apps.googleusercontent.com">
      <Router>
        <AuthProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <AuthModal />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/sell-land" element={<SellLand />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
      <SpeedInsights />
    </GoogleOAuthProvider>
  );
}

export default App;