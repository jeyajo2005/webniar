import React, { useState, useEffect } from 'react';
import RegistrationForm from '../components/RegistrationForm.jsx';
import { 
  ArrowRight, 
  GraduationCap, 
  Users, 
  Infinity as InfinityIcon, 
  Check, 
  Play, 
  Star, 
  Clock, 
  UserCheck, 
  Calendar,
  Send,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Palette,
  TrendingUp,
  Code,
  Megaphone,
  BarChart2,
  User,
  Camera,
  Activity,
  Award,
  BookOpen,
  Briefcase,
  Tv,
  Sparkles,
  Search,
  ShieldCheck,
  Video
} from 'lucide-react';
import { api } from '../services/api.js';

export default function LandingPage({ 
  webinar, 
  onPaymentSuccess,
  onViewCourse,
  onEnrollCourse,
  onOpenIntroVideo,
  searchQuery = '',
  onSearch
}) {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Sync prop searchQuery
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  // Fetch courses from API
  useEffect(() => {
    const loadCourses = async () => {
      setLoadingCourses(true);
      try {
        const res = await api.getCourses({
          category: selectedCategory,
          search: localSearch
        });
        if (res.success && res.courses?.length) {
          setCourses(res.courses);
        } else {
          // Fallback to initial 6 courses
          setCourses(defaultFallbackCourses.filter(c => {
            const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
            const matchesSearch = !localSearch || c.title.toLowerCase().includes(localSearch.toLowerCase());
            return matchesCat && matchesSearch;
          }));
        }
      } catch (e) {
        console.warn('Courses load fallback:', e);
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, [selectedCategory, localSearch]);

  const scrollToPaymentSection = () => {
    const el = document.getElementById('registration-payment-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCourses = () => {
    const el = document.getElementById('featured-courses-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  const categories = [
    'All',
    'AI & Agents',
    'Full-Stack Development',
    'Cloud & DevOps',
    'UI/UX Design',
    'Cyber Security'
  ];

  return (
    <div style={{ background: '#f8fafc', color: '#0f172a' }}>
      {/* 1. HERO SECTION WITH VIDEO BANNER TRIGGER */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 60%, #312e81 100%)',
        color: '#ffffff',
        padding: '70px 0 90px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 60%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: 48, alignItems: 'center' }} className="hero-grid">
            {/* Left Hero Text */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(99, 102, 241, 0.25)',
                border: '1px solid rgba(129, 140, 248, 0.4)',
                borderRadius: 9999,
                padding: '6px 16px',
                color: '#c7d2fe',
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 20
              }}>
                <Sparkles size={15} color="#a78bfa" />
                <span>Next-Generation Online Learning Platform 2026</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(32px, 4.4vw, 54px)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: 18
              }}>
                Upgrade Your Skills. <br />
                <span style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Transform Your Future.
                </span>
              </h1>

              <p style={{
                fontSize: 16,
                color: '#cbd5e1',
                lineHeight: 1.65,
                maxWidth: 580,
                marginBottom: 28
              }}>
                Join over 45,000 engineers and leaders learning cutting-edge AI swarms, full-stack architectures, and cloud microservices through interactive live webinars and verified on-demand video courses.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={scrollToCourses}
                  style={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '16px 32px',
                    borderRadius: 9999,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 8px 25px rgba(79, 70, 229, 0.5)'
                  }}
                >
                  <BookOpen size={18} />
                  <span>Explore Courses</span>
                </button>

                {onOpenIntroVideo && (
                  <button
                    onClick={onOpenIntroVideo}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      padding: '15px 26px',
                      borderRadius: 9999,
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      backdropFilter: 'blur(8px)'
                    }}
                  >
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={12} fill="#0f172a" color="#0f172a" style={{ marginLeft: 2 }} />
                    </div>
                    <span>Watch Webinar Class Video</span>
                  </button>
                )}
              </div>

              {/* Quick Trust Badges */}
              <div style={{ display: 'flex', gap: 24, marginTop: 36, borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: 20 }}>
                <div>
                  <span style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>45,000+</span>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>Enrolled Students</p>
                </div>
                <div>
                  <span style={{ fontSize: 20, fontWeight: 800, color: '#facc15' }}>4.9 ★</span>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>Average Rating</p>
                </div>
                <div>
                  <span style={{ fontSize: 20, fontWeight: 800, color: '#38bdf8' }}>100%</span>
                  <p style={{ fontSize: 12, color: '#94a3b8' }}>Verifiable Certificates</p>
                </div>
              </div>
            </div>

            {/* Right Hero Video Card Thumbnail */}
            <div style={{ position: 'relative' }}>
              <div 
                onClick={onOpenIntroVideo}
                style={{
                  position: 'relative',
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  cursor: 'pointer',
                  aspectRatio: '16/10'
                }}
              >
                <img
                  src="/assets/female_presenter_blazer.jpg"
                  alt="Webinar Trainer on Stage"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.2) 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: 24
                }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ background: '#ef4444', color: '#ffffff', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 9999, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffffff', animation: 'pulse 1.5s infinite' }} />
                      LIVE MASTERCLASS
                    </span>
                  </div>

                  <div>
                    <div style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                      transform: 'scale(1)',
                      transition: 'transform 0.2s'
                    }}>
                      <Play size={24} fill="#4f46e5" color="#4f46e5" style={{ marginLeft: 3 }} />
                    </div>
                    <p style={{ textAlign: 'center', color: '#ffffff', fontSize: 14, fontWeight: 700 }}>
                      Click to Watch Trainer Class Presentation
                    </p>
                  </div>

                  <p style={{ color: '#cbd5e1', fontSize: 12 }}>
                    Featured Presenter: <strong>Dr. Elena Vance</strong> • Principal AI Architect
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COURSES CATALOG SECTION (Udemy / Coursera Style) */}
      <section id="featured-courses-section" style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          {/* Section Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Curated High-Impact Curriculum
              </span>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: 4 }}>
                Explore In-Demand Courses
              </h2>
              <p style={{ fontSize: 15, color: '#64748b', marginTop: 6 }}>
                Master future-proof skills with hands-on projects, instructor guidance, and certificates.
              </p>
            </div>

            {/* In-page Course Search Input */}
            <div style={{ position: 'relative', width: '100%', maxWidth: 320 }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 14, top: 12 }} />
              <input
                type="text"
                placeholder="Filter courses..."
                value={localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                style={{
                  width: '100%',
                  height: 42,
                  padding: '0 16px 0 38px',
                  borderRadius: 10,
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: 13,
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 16, marginBottom: 32 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? '#0f172a' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#475569',
                  border: selectedCategory === cat ? '1px solid #0f172a' : '1px solid #e2e8f0',
                  padding: '8px 18px',
                  borderRadius: 9999,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: selectedCategory === cat ? '0 4px 12px rgba(15, 23, 42, 0.15)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          {loadingCourses ? (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <div style={{ width: 44, height: 44, border: '3px solid #e2e8f0', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
              <p style={{ color: '#64748b', fontSize: 14 }}>Loading certified courses...</p>
            </div>
          ) : courses.length === 0 ? (
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: '60px 20px', textAlign: 'center' }}>
              <BookOpen size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>No courses found for this category or search query</h3>
              <button
                onClick={() => { setSelectedCategory('All'); setLocalSearch(''); }}
                style={{ marginTop: 14, background: '#4f46e5', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: 28
            }}>
              {courses.map((course) => {
                const discount = Math.round((((course.originalPrice || 2999) - course.price) / (course.originalPrice || 2999)) * 100);

                return (
                  <div
                    key={course._id}
                    className="course-card-premium"
                    style={{ position: 'relative' }}
                  >
                    {/* Thumbnail with overlay duration & category */}
                    <div 
                      onClick={() => onViewCourse && onViewCourse(course._id)}
                      style={{ position: 'relative', width: '100%', height: 200, cursor: 'pointer', overflow: 'hidden' }}
                    >
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        display: 'flex',
                        gap: 6
                      }}>
                        <span className={course.badge === 'Hot & New' ? 'badge-new' : 'badge-bestseller'}>
                          {course.badge || 'Bestseller'}
                        </span>
                      </div>
                      <div style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 12,
                        background: 'rgba(15, 23, 42, 0.8)',
                        color: '#ffffff',
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 6,
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Clock size={12} />
                        <span>{course.durationHours || 20} hours</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: 22, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {course.category}
                      </span>

                      <h3
                        onClick={() => onViewCourse && onViewCourse(course._id)}
                        style={{
                          fontSize: 17,
                          fontWeight: 800,
                          color: '#0f172a',
                          lineHeight: 1.35,
                          margin: '6px 0 8px',
                          cursor: 'pointer'
                        }}
                      >
                        {course.title}
                      </h3>

                      <p style={{
                        fontSize: 13,
                        color: '#64748b',
                        lineHeight: 1.5,
                        marginBottom: 16,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {course.subtitle || course.description}
                      </p>

                      {/* Instructor */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                        <img
                          src={course.instructor?.avatar || '/assets/female_presenter_blazer.jpg'}
                          alt={course.instructor?.name}
                          style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>
                          {course.instructor?.name || 'Dr. Elena Vance'}
                        </span>
                      </div>

                      {/* Rating & Stats */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 16 }}>
                        <span style={{ fontWeight: 800, color: '#b45309' }}>{course.rating || 4.9}</span>
                        <div style={{ display: 'flex' }}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>
                        <span style={{ color: '#94a3b8', fontSize: 12 }}>
                          ({(course.reviewsCount || 1240).toLocaleString()})
                        </span>
                        <span style={{ color: '#cbd5e1' }}>•</span>
                        <span style={{ color: '#64748b', fontSize: 12 }}>
                          {(course.studentsCount || 14200).toLocaleString()} students
                        </span>
                      </div>

                      {/* Pricing Row */}
                      <div style={{
                        marginTop: 'auto',
                        paddingTop: 16,
                        borderTop: '1px solid #f1f5f9',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                          <span style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
                            ₹{course.price || 499}
                          </span>
                          <span style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'line-through' }}>
                            ₹{course.originalPrice || 2999}
                          </span>
                          <span style={{ fontSize: 11, fontWeight: 800, color: '#16a34a' }}>
                            -{discount}%
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons: "View Course" and "Enroll Now" */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                        <button
                          onClick={() => onViewCourse && onViewCourse(course._id)}
                          style={{
                            background: '#f8fafc',
                            border: '1px solid #cbd5e1',
                            color: '#334155',
                            padding: '10px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          View Course
                        </button>

                        <button
                          onClick={() => onEnrollCourse && onEnrollCourse(course)}
                          style={{
                            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                            border: 'none',
                            color: '#ffffff',
                            padding: '10px',
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            boxShadow: '0 4px 12px rgba(79, 70, 229, 0.35)'
                          }}
                        >
                          <span>Enroll Now</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. UPCOMING LIVE WEBINAR SPOTLIGHT SECTION */}
      <section id="webinar-spotlight-section" style={{
        padding: '80px 0',
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
            borderRadius: 24,
            padding: '48px 40px',
            color: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.3)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
            gap: 40,
            alignItems: 'center'
          }} className="hero-grid">
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#ef4444', color: '#ffffff', fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 9999, marginBottom: 14 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#ffffff', animation: 'pulse 1.5s infinite' }} />
                <span>UPCOMING LIVE INTERACTIVE MASTERCLASS</span>
              </div>

              <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: 12 }}>
                Full-Stack AI & Autonomous Agents Masterclass
              </h2>

              <p style={{ fontSize: 15, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>
                Build, deploy, and monetize production autonomous AI agents with real-time streaming, tool calling, and automated GST billing. Live hot-seat architecture evaluations with Dr. Elena Vance.
              </p>

              {/* Webinar Details Row */}
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 24, fontSize: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e0e7ff' }}>
                  <Calendar size={18} color="#a5b4fc" />
                  <span><strong>Date:</strong> November 4, 2026</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#e0e7ff' }}>
                  <Clock size={18} color="#a5b4fc" />
                  <span><strong>Time:</strong> 07:00 PM IST (180 mins)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4ade80' }}>
                  <Users size={18} color="#4ade80" />
                  <span><strong>Seats:</strong> 462 / 500 Booked</span>
                </div>
              </div>

              <button
                onClick={scrollToPaymentSection}
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px 36px',
                  borderRadius: 9999,
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 8px 25px rgba(79, 70, 229, 0.5)'
                }}
              >
                <span>Reserve VIP Live Seat (₹499)</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Right: Speaker Bio Card */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: 20,
              padding: 28,
              backdropFilter: 'blur(12px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <img
                  src="/assets/female_presenter_blazer.jpg"
                  alt="Dr. Elena Vance"
                  style={{ width: 70, height: 70, borderRadius: '50%', objectFit: 'cover', border: '2px solid #818cf8' }}
                />
                <div>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: '#ffffff' }}>Dr. Elena Vance</h4>
                  <p style={{ fontSize: 12, color: '#a5b4fc', marginTop: 2 }}>Principal AI Systems Architect</p>
                  <p style={{ fontSize: 11, color: '#facc15', marginTop: 4 }}>★ 4.98 / 5.0 (3,800+ reviews)</p>
                </div>
              </div>

              <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 16 }}>
                Over 12 years of enterprise engineering experience. Former AI Lead, trained 45,000+ engineers worldwide in LLM pipelines, autonomous multi-agent coordination, and scalable cloud monetization.
              </p>

              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.12)', paddingTop: 14 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1', display: 'block', marginBottom: 8 }}>
                  Free Bonuses Included (₹10,996 Value):
                </span>
                <ul style={{ fontSize: 12, color: '#94a3b8', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>✓ Production Multi-Agent SaaS Starter Repo</li>
                  <li>✓ 100+ Enterprise System Prompts & Tool Calling</li>
                  <li>✓ Official VIP WhatsApp Mastermind & Networking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WEBINAR REGISTRATION & PAYMENT SECTION */}
      <section id="registration-payment-section" style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Instant Registration & Verification
            </span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: 6 }}>
              Reserve Your VIP Webinar Seat
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', marginTop: 8 }}>
              Get immediate calendar synchronization, WhatsApp community access, and legal GST invoice.
            </p>
          </div>

          <RegistrationForm
            webinar={webinar}
            onPaymentSuccess={onPaymentSuccess}
          />
        </div>
      </section>

      {/* 5. NEWSLETTER SUBSCRIPTION */}
      <section style={{ background: '#ffffff', padding: '60px 0', borderTop: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a' }}>
            Stay Ahead in AI & Modern Engineering
          </h3>
          <p style={{ fontSize: 14, color: '#64748b', margin: '8px auto 24px' }}>
            Subscribe to our weekly dispatch of enterprise tutorials, architectural blueprints, and course discounts.
          </p>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 10, maxWidth: 480, margin: '0 auto' }}>
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 18px',
                borderRadius: 10,
                border: '1px solid #cbd5e1',
                fontSize: 14,
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#0f172a',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer'
              }}
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p style={{ color: '#16a34a', fontSize: 13, fontWeight: 600, marginTop: 10 }}>
              Thank you for subscribing!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

const defaultFallbackCourses = [
  {
    _id: 'course_ai_agents',
    title: 'Full-Stack AI & Autonomous Agent Architecture',
    subtitle: 'Build, deploy, and monetize production-grade autonomous agent swarms with streaming tools, memory, and Razorpay',
    category: 'AI & Agents',
    price: 499,
    originalPrice: 2999,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    rating: 4.95,
    reviewsCount: 3820,
    studentsCount: 18450,
    durationHours: 24,
    instructor: { name: 'Dr. Elena Vance', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' }
  },
  {
    _id: 'course_mern_saas',
    title: 'Modern MERN Stack 2026: Next-Gen SaaS & Payments',
    subtitle: 'Build and deploy enterprise full-stack web applications with React, Express, MongoDB, and Tailwind CSS',
    category: 'Full-Stack Development',
    price: 599,
    originalPrice: 3499,
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot & New',
    rating: 4.88,
    reviewsCount: 2150,
    studentsCount: 12100,
    durationHours: 32,
    instructor: { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' }
  },
  {
    _id: 'course_cloud_k8s',
    title: 'Cloud Native Kubernetes & Microservices at Scale',
    subtitle: 'Zero to hero with Docker containers, Helm charts, CI/CD pipelines, and AWS/GCP orchestration',
    category: 'Cloud & DevOps',
    price: 699,
    originalPrice: 3999,
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    badge: 'Highest Rated',
    rating: 4.96,
    reviewsCount: 1680,
    studentsCount: 9400,
    durationHours: 28,
    instructor: { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' }
  },
  {
    _id: 'course_ui_ux',
    title: 'Enterprise UI/UX Design System & Micro-Interactions',
    subtitle: 'Design stunning user experiences, responsive layouts, Figma token libraries, and motion design',
    category: 'UI/UX Design',
    price: 449,
    originalPrice: 2499,
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    rating: 4.89,
    reviewsCount: 2450,
    studentsCount: 16300,
    durationHours: 18,
    instructor: { name: 'Sophia Laurent', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' }
  },
  {
    _id: 'course_rag_llm',
    title: 'Production LLM Engineering & Advanced RAG Pipelines',
    subtitle: 'Build high-accuracy AI search and reasoning engines with vector embeddings, rerankers, and LangChain',
    category: 'AI & Agents',
    price: 649,
    originalPrice: 3799,
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot & New',
    rating: 4.93,
    reviewsCount: 1890,
    studentsCount: 11200,
    durationHours: 22,
    instructor: { name: 'Dr. Elena Vance', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' }
  },
  {
    _id: 'course_cyber_sec',
    title: 'Cybersecurity Defenses: Zero Trust Architecture',
    subtitle: 'Defend web applications against OWASP Top 10, ransomware, API attacks, and credential stuffing',
    category: 'Cyber Security',
    price: 549,
    originalPrice: 2999,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    badge: 'Featured',
    rating: 4.87,
    reviewsCount: 1420,
    studentsCount: 8900,
    durationHours: 20,
    instructor: { name: 'David Thorne', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' }
  }
];
