import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ExploreCoursesPage from './pages/ExploreCoursesPage.jsx';
import CourseDetailsPage from './pages/CourseDetailsPage.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import CoursePlayer from './pages/CoursePlayer.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import FullScreenVideoPromo from './components/FullScreenVideoPromo.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import AuthModal from './components/AuthModal.jsx';
import { api } from './services/api.js';
import { Mail, Phone, MapPin, ShieldCheck, Lock, Star, CheckCircle2, Award, Heart, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  // 'landing' | 'course-details' | 'dashboard' | 'classroom' | 'thankyou' | 'admin'

  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [activeCourseId, setActiveCourseId] = useState(null);
  const [webinar, setWebinar] = useState(null);
  const [currentRegistration, setCurrentRegistration] = useState(null);
  const [loading, setLoading] = useState(true);

  // Authentication state
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  // Modal controls
  const [showIntroVideo, setShowIntroVideo] = useState(false); // Disabled initial fullscreen video as requested
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutCourse, setCheckoutCourse] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');

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

    const handleRoute = () => {
      const hash = window.location.hash || '';
      const path = window.location.pathname || '';
      if (
        hash === '#admin' ||
        hash === '#/admin' ||
        hash.startsWith('#/admin') ||
        path === '/admin' ||
        path.startsWith('/admin')
      ) {
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#thankyou' || hash === '#/thankyou') {
        setCurrentPage('thankyou');
      } else if (
        hash === '#courses' ||
        hash === '#/courses' ||
        hash === '#explore' ||
        hash === '#/explore' ||
        path === '/courses' ||
        path === '/explore'
      ) {
        setCurrentPage('courses');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  // Action: Open Course Details
  const handleViewCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setCurrentPage('course-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action: Start Course Checkout Modal
  const handleEnrollCourse = (course) => {
    setCheckoutCourse(course);
    setShowCheckoutModal(true);
  };

  // Action: Launch Online Video Player Classroom
  const handleStartLearning = (courseId) => {
    setActiveCourseId(courseId);
    setCurrentPage('classroom');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action: User completes registration form -> Redirect to Thank You page with ₹1 payment button
  const handleRegisterSuccess = (registration) => {
    setCurrentRegistration(registration);
    setCurrentPage('thankyou');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action: User completes verified payment on Webinar Registration
  const handleWebinarPaymentSuccess = (verifyResult) => {
    setCurrentRegistration(verifyResult.registration);
    setCurrentPage('thankyou');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action: Course Payment Completed
  const handleCoursePaymentSuccess = (verifyResult) => {
    const cId = verifyResult?.course?._id || checkoutCourse?._id;
    if (cId) {
      localStorage.setItem(`enrolled_${cId}`, 'true');
    }
    // Keep user state updated if guest completed purchase
    if (verifyResult?.enrollment && !user) {
      const newUser = {
        _id: verifyResult.enrollment.userId,
        name: verifyResult.payment?.customerName || 'Learner',
        email: verifyResult.payment?.customerEmail || 'student@example.com',
        role: 'student'
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  // Action: Navbar Register Now Click
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

  const handleAuthSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('landing');
  };

  return (
    <div className="app-layout">
      {/* 1. FULLSCREEN BUSINESS WEBINAR / CLASS VIDEO HERO */}
      {showIntroVideo && (
        <FullScreenVideoPromo
          webinar={webinar}
          onExploreCourses={() => {
            setShowIntroVideo(false);
            setCurrentPage('landing');
            setTimeout(() => {
              const el = document.getElementById('featured-courses-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onJoinNow={() => {
            setShowIntroVideo(false);
            setCurrentPage('landing');
            setTimeout(() => {
              const el = document.getElementById('webinar-spotlight-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          onClose={() => setShowIntroVideo(false)}
        />
      )}

      {/* 2. GLOBAL NAVBAR (Hidden inside dedicated classroom mode and isolated admin panel) */}
      {currentPage !== 'admin' && (
        <Navbar
          currentPage={currentPage}
          user={user}
          onRegisterClick={handleRegisterClick}
          onOpenIntroVideo={() => setShowIntroVideo(true)}
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setShowAuthModal(true);
          }}
          onLogout={handleLogout}
          onSearch={(query) => {
            setSearchQuery(query);
            if (currentPage !== 'landing') setCurrentPage('landing');
          }}
          onNavigate={(page) => {
            if (page === 'courses') {
              window.location.hash = '#/courses';
            } else if (page === 'landing') {
              window.location.hash = '';
            }
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 3. MAIN APPLICATION VIEWS */}
      <main>
        {/* A. LANDING PAGE */}
        {currentPage === 'landing' && (
          <LandingPage
            webinar={webinar}
            onNavigateToCourses={() => {
              window.location.hash = '#/courses';
              setCurrentPage('courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onRegisterSuccess={handleRegisterSuccess}
            onPaymentSuccess={handleWebinarPaymentSuccess}
            onViewCourse={handleViewCourse}
            onEnrollCourse={handleEnrollCourse}
            onStartLearning={handleStartLearning}
            onOpenIntroVideo={() => setShowIntroVideo(true)}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
          />
        )}


        {/* B. ALL 25 IN-DEMAND COURSES PAGE */}
        {currentPage === 'courses' && (
          <ExploreCoursesPage
            onViewCourse={handleViewCourse}
            onEnrollCourse={handleEnrollCourse}
            onStartLearning={handleStartLearning}
            onBackToHome={() => {
              setCurrentPage('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            initialSearch={searchQuery}
          />
        )}

        {/* C. COURSE DETAILS PAGE */}
        {currentPage === 'course-details' && selectedCourseId && (
          <CourseDetailsPage
            courseId={selectedCourseId}
            user={user}
            onBack={() => {
              setCurrentPage('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onEnrollNow={handleEnrollCourse}
            onStartLearning={handleStartLearning}
          />
        )}

        {/* C. STUDENT DASHBOARD */}
        {currentPage === 'dashboard' && (
          <StudentDashboard
            user={user}
            onContinueCourse={handleStartLearning}
            onExploreCourses={() => {
              setCurrentPage('landing');
              setTimeout(() => {
                const el = document.getElementById('featured-courses-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onLogout={handleLogout}
          />
        )}

        {/* D. ONLINE COURSE VIDEO PLAYER (CLASSROOM) */}
        {currentPage === 'classroom' && activeCourseId && (
          <CoursePlayer
            courseId={activeCourseId}
            user={user}
            onEnrollCourse={handleEnrollCourse}
            onBack={() => {
              if (selectedCourseId) {
                setCurrentPage('course-details');
              } else {
                setCurrentPage('landing');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewCertificate={(courseId) => {
              setCurrentPage('dashboard');
            }}
          />
        )}

        {/* E. WEBINAR CONFIRMATION & INVOICE THANK YOU PAGE */}
        {currentPage === 'thankyou' && (
          <ThankYouPage
            registration={currentRegistration}
            webinar={webinar}
            onNavigate={setCurrentPage}
          />
        )}

        {/* F. SEPARATE ORGANIZER ADMIN PANEL (Completely Isolated) */}
        {currentPage === 'admin' && (
          <AdminDashboard
            onNavigate={(page) => {
              if (page === 'landing') {
                window.location.hash = '';
              }
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onWebinarUpdated={(updated) => setWebinar(updated)}
          />
        )}
      </main>

      {/* 4. MODALS */}
      {/* Checkout Modal */}
      {currentPage !== 'admin' && (
        <CheckoutModal
          isOpen={showCheckoutModal}
          course={checkoutCourse}
          user={user}
          onClose={() => setShowCheckoutModal(false)}
          onRequestAuth={() => {
            setShowCheckoutModal(false);
            setAuthMode('login');
            setShowAuthModal(true);
          }}
          onPaymentSuccess={handleCoursePaymentSuccess}
          onStartLearning={(courseId) => {
            setShowCheckoutModal(false);
            handleStartLearning(courseId);
          }}
          onGoToDashboard={() => {
            setShowCheckoutModal(false);
            setCurrentPage('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* Authentication Modal */}
      {currentPage !== 'admin' && (
        <AuthModal
          isOpen={showAuthModal}
          initialMode={authMode}
          onClose={() => setShowAuthModal(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      {/* 5. COMPREHENSIVE Kaira GLOBAL FOOTER (Hidden on classroom & admin) */}
      {currentPage !== 'classroom' && currentPage !== 'admin' && (
        <footer style={{
          background: '#090d16',
          color: '#94a3b8',
          borderTop: '1px solid #1e293b',
          padding: '70px 0 30px',
          fontSize: 14
        }}>
          <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>

            {/* Top 4-Column Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 40,
              marginBottom: 50
            }}>

              {/* Col 1: Kaira Academy Overview */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 26, fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                    Kaira
                  </span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: 13.5, lineHeight: 1.65, marginBottom: 20 }}>
                  Empowering ambitious software engineers and AI architects worldwide with production-grade engineering mastery. Hands-on coding, live mentorship, and verifiable industry credentials.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Star size={16} fill="#f59e0b" color="#f59e0b" />
                  <span style={{ color: '#ffffff', fontWeight: 700, fontSize: 13 }}>4.9/5.0</span>
                  <span style={{ color: '#64748b', fontSize: 12 }}>• Rated by 2,850+ Google Reviewers</span>
                </div>
              </div>

              {/* Col 2: Popular Programs */}
              <div>
                <h4 style={{ color: '#ffffff', fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
                  Flagship Programs
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11, fontSize: 13.5 }}>
                  {[
                    'Full-Stack AI & Autonomous Agents',
                    'Modern MERN Stack SaaS 2026',
                    'Cloud Native Kubernetes & DevOps',
                    'System Design & Microservices',
                    'Production LLM & Advanced RAG',
                    'Cybersecurity & Zero Trust Defenses'
                  ].map((prog, pIdx) => (
                    <li key={pIdx}>
                      <button
                        onClick={() => {
                          if (currentPage !== 'landing') setCurrentPage('landing');
                          setTimeout(() => {
                            const el = document.getElementById('featured-courses-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#94a3b8',
                          padding: 0,
                          fontSize: 13.5,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#38bdf8'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                      >
                        {prog}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3: Student Links & Resources */}
              <div>
                <h4 style={{ color: '#ffffff', fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
                  Learner Resources
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11, fontSize: 13.5 }}>
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('landing');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', padding: 0, fontSize: 13.5, cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38bdf8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                    >
                      Course Catalog & Syllabus
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleRegisterClick}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', padding: 0, fontSize: 13.5, cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38bdf8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                    >
                      Register for Course (₹1 Online)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        if (currentPage !== 'landing') setCurrentPage('landing');
                        setTimeout(() => {
                          const el = document.getElementById('google-reviews-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', padding: 0, fontSize: 13.5, cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38bdf8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                    >
                      Google Verified Student Reviews
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setCurrentPage('dashboard');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', padding: 0, fontSize: 13.5, cursor: 'pointer', textAlign: 'left' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#38bdf8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
                    >
                      Student Portal & Certifications
                    </button>
                  </li>
                  <li>
                    <span style={{ color: '#64748b', fontSize: 13 }}>
                      ISO 9001:2015 Quality Certified
                    </span>
                  </li>
                </ul>
              </div>

              {/* Col 4: Campus Contact & Helpdesk */}
              <div>
                <h4 style={{ color: '#ffffff', fontSize: 15, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 18 }}>
                  Contact & Support
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 13.5 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <MapPin size={17} color="#38bdf8" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: '#94a3b8', lineHeight: 1.5 }}>
                      Kaira Tech Park, Kovilpatti-628502
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Mail size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                    <a href="mailto:support@kairatechnologies.com" style={{ color: '#cbd5e1', textDecoration: 'none' }}>
                      support@kairatechnologies.com
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Phone size={16} color="#38bdf8" style={{ flexShrink: 0 }} />
                    <span style={{ color: '#cbd5e1' }}>
                      +91 98765 43210 / +91 44 2828 0000
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                    Academic Support Hours: Mon – Sat, 9:00 AM – 8:00 PM IST
                  </div>
                </div>
              </div>

            </div>

            {/* Payment Trust & Security Bar */}
            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              padding: '24px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 16
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <span style={{ color: '#e2e8f0', fontSize: 12.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ShieldCheck size={16} color="#10b981" /> 100% SECURE CHECKOUT
                </span>
                <span style={{ color: '#475569' }}>|</span>
                <span style={{ color: '#94a3b8', fontSize: 12 }}>
                  Razorpay Verified Gateway • 256-Bit SSL Bank-Grade Encryption
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Accepted Payments:</span>
                {['UPI (GPay / PhonePe / Paytm)', 'Credit & Debit Cards', 'NetBanking'].map((method, mIdx) => (
                  <span
                    key={mIdx}
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: '#cbd5e1',
                      padding: '3px 9px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600
                    }}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Legal & Copyright Bar */}
            <div style={{
              paddingTop: 24,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 14,
              fontSize: 12.5,
              color: '#64748b'
            }}>
              <div>
                © {new Date().getFullYear()} Kaira Pvt. Ltd. All rights reserved. Registered under Ministry of Corporate Affairs, Govt of India.
              </div>

              <div style={{ display: 'flex', gap: 20 }}>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#cbd5e1'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}>
                  Privacy Policy
                </span>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#cbd5e1'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}>
                  Terms of Service
                </span>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#cbd5e1'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}>
                  Refund Policy
                </span>
                <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseEnter={(e) => { e.currentTarget.style.color = '#cbd5e1'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#64748b'; }}>
                  GST Compliant
                </span>
              </div>
            </div>

          </div>
        </footer>
      )}
    </div>
  );
}
