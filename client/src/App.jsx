import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { api } from './services/api.js';

export default function App() {
  // Directly opens onto the Eduma Landing Page
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'thankyou' | 'admin'
  const [webinar, setWebinar] = useState(null);
  const [currentRegistration, setCurrentRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWebinarData = async () => {
    try {
      const res = await api.getWebinar();
      if (res.success) {
        setWebinar(res.webinar);
      }
    } catch (e) {
      console.error('Failed to initialize webinar data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWebinarData();
  }, []);

  // Action: User completes verified payment on Landing Page
  const handlePaymentSuccess = (verifyResult) => {
    setCurrentRegistration(verifyResult.registration);
    setCurrentPage('thankyou');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action: Navbar "Register Now" button clicked
  const handleRegisterClick = () => {
    if (currentPage !== 'landing') {
      setCurrentPage('landing');
      setTimeout(() => {
        const el = document.getElementById('registration-payment-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('registration-payment-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Action: Admin updates webinar settings
  const handleWebinarUpdated = (updatedWebinar) => {
    setWebinar(updatedWebinar);
  };

  return (
    <div className="app-layout">
      {/* GLOBAL NAVBAR */}
      <Navbar
        currentPage={currentPage}
        onRegisterClick={handleRegisterClick}
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MAIN VIEW CONTENT */}
      <main>
        {/* 1. EDUMA LANDING PAGE & PAYMENT SECTION */}
        {currentPage === 'landing' && (
          <LandingPage
            webinar={webinar}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

          {/* 3. THANK YOU & CONFIRMATION PAGE */}
          {currentPage === 'thankyou' && (
            <ThankYouPage
              registration={currentRegistration}
              webinar={webinar}
              onNavigate={setCurrentPage}
            />
          )}

          {/* 4. ADMIN DASHBOARD */}
          {currentPage === 'admin' && (
            <AdminDashboard
              onNavigate={setCurrentPage}
              onWebinarUpdated={handleWebinarUpdated}
            />
          )}
      </main>

      {/* GLOBAL BRAND FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '30px 0',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: 13,
        background: '#ffffff'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setCurrentPage('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              style={{ background: 'none', border: 'none', color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}
            >
              Kaira Home
            </button>
            <button
              onClick={handleRegisterClick}
              style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}
            >
              Registration & Payment
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}
            >
              Organizer Admin Panel
            </button>
          </div>
          <p>© {new Date().getFullYear()} Kaira Technologies. All rights reserved.</p>
          <p style={{ marginTop: 4, fontSize: 12, color: '#94a3b8' }}>
            Full-Stack AI & Autonomous Agents Masterclass scheduled for <strong>November 4, 2026</strong>.
          </p>
        </div>
      </footer>
    </div>
  );
}
