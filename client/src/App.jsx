import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CourseDetailsPage from './pages/CourseDetailsPage.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import CoursePlayer from './pages/CoursePlayer.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import FullScreenVideoPromo from './components/FullScreenVideoPromo.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import AuthModal from './components/AuthModal.jsx';
import { api } from './services/api.js';

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

    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
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

      {/* 2. GLOBAL NAVBAR (Hidden inside dedicated classroom mode for immersive learning) */}
      {currentPage !== 'classroom' && (
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
            onPaymentSuccess={handleWebinarPaymentSuccess}
            onViewCourse={handleViewCourse}
            onEnrollCourse={handleEnrollCourse}
            onStartLearning={handleStartLearning}
            onOpenIntroVideo={() => setShowIntroVideo(true)}
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
          />
        )}

        {/* B. COURSE DETAILS PAGE */}
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

        {/* F. ORGANIZER ADMIN PANEL */}
        {currentPage === 'admin' && (
          <AdminDashboard
            onNavigate={setCurrentPage}
            onWebinarUpdated={(updated) => setWebinar(updated)}
          />
        )}
      </main>

      {/* 4. MODALS */}
      {/* Checkout Modal */}
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

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        initialMode={authMode}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* 5. GLOBAL BRAND FOOTER */}
      {currentPage !== 'classroom' && (
        <footer style={{
          borderTop: '1px solid #e2e8f0',
          padding: '40px 0',
          textAlign: 'center',
          color: '#64748b',
          fontSize: 13,
          background: '#ffffff'
        }}>
          <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 14, flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  setCurrentPage('landing');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'none', border: 'none', color: '#4f46e5', fontWeight: 700, cursor: 'pointer' }}
              >
                LearnFlow Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('landing');
                  setTimeout(() => {
                    const el = document.getElementById('featured-courses-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}
              >
                Online Courses
              </button>
              <button
                onClick={handleRegisterClick}
                style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}
              >
                Live Webinar (Nov 4)
              </button>
              <button
                onClick={() => {
                  setCurrentPage('dashboard');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer' }}
              >
                Student Dashboard
              </button>
              <button
                onClick={() => {
                  window.location.hash = 'admin';
                  setCurrentPage('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: 12, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
                title="Restricted Staff & Organizer Entrance"
              >
                <span>🔒 Staff & Admin Portal</span>
              </button>
            </div>
            <p>© {new Date().getFullYear()} LearnFlow Academy & WebinarFlow. All rights reserved.</p>
            <p style={{ marginTop: 4, fontSize: 12, color: '#94a3b8' }}>
              Empowering engineers and architects worldwide with production-grade AI & Cloud skills.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
