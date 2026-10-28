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
  Video,
  Flame,
  Zap,
  Gift,
  CheckCircle2,
  QrCode,
  Mail,
  ChevronLeft,
  ChevronRight,
  Pause
} from 'lucide-react';
import { api } from '../services/api.js';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiKubernetes, SiTailwindcss } from 'react-icons/si';

export default function LandingPage({
  webinar,
  onRegisterSuccess,
  onPaymentSuccess,
  onViewCourse,
  onEnrollCourse,
  onStartLearning,
  onOpenIntroVideo,
  onNavigateToCourses,
  searchQuery = '',
  onSearch
}) {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    interest: 'AI & Machine Learning'
  });
  const [timeLeft, setTimeLeft] = useState({ days: 14, hours: 7, minutes: 46, seconds: 52 });

  // Dynamic countdown timer for Masterclass
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (leadForm.interest) {
      if (leadForm.interest.includes('AI')) setSelectedCategory('AI & Agents');
      else if (leadForm.interest.includes('Full-Stack')) setSelectedCategory('Full-Stack Development');
      else if (leadForm.interest.includes('Cloud')) setSelectedCategory('Cloud & DevOps');
      else if (leadForm.interest.includes('Cyber')) setSelectedCategory('Cyber Security');
    }
    scrollToCourses();
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
      {/* 1. KAIRA HERO SECTION (ULTRA-ATTRACTIVE & MATCHING IMAGE 1) */}
      <section style={{
        background: 'radial-gradient(ellipse at 20% 0%, rgba(59, 130, 246, 0.45) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(30, 58, 138, 0.5) 0%, transparent 60%), linear-gradient(160deg, #1d4ed8 0%, #2563eb 45%, #1e40af 100%)',
        padding: '36px 20px 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Decorative Ambient Glow Blobs */}
        <div style={{
          position: 'absolute',
          top: -80,
          left: '10%',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          filter: 'blur(50px)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: -80,
          right: '5%',
          width: 380,
          height: 380,
          borderRadius: '50%',
          background: 'rgba(56, 189, 248, 0.15)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: 1220, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {/* Main White Card matching Image 1 with Ultra-Premium Aesthetics */}
          <div style={{
            background: '#ffffff',
            borderRadius: 28,
            padding: 'clamp(36px, 4.5vw, 56px) clamp(24px, 4.5vw, 60px)',
            boxShadow: '0 35px 80px -15px rgba(15, 23, 42, 0.38), 0 0 0 1px rgba(255, 255, 255, 0.5)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
              gap: 48,
              alignItems: 'center'
            }} className="hero-grid">

              {/* Left Column: Form & Content */}
              <div>
                {/* Live Pill Badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: 9999,
                  padding: '6px 14px',
                  marginBottom: 16
                }}>
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#22c55e',
                    boxShadow: '0 0 8px #22c55e',
                    display: 'inline-block'
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#1d4ed8', letterSpacing: '0.02em' }}>
                    #1 Online Skill Platform • 1st Video Lesson Free on All Courses
                  </span>
                </div>

                {/* Main Headline */}
                <h1 style={{
                  fontSize: 'clamp(36px, 4.5vw, 56px)',
                  fontWeight: 900,
                  color: '#1e3a8a',
                  lineHeight: 1.12,
                  letterSpacing: '-0.035em',
                  marginBottom: 16
                }}>
                  Unlock Knowledge, <br />
                  <span style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #4338ca 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 2px 8px rgba(37, 99, 235, 0.2))'
                  }}>
                    Unlock Your Future
                  </span>
                </h1>

                <p style={{
                  fontSize: 16,
                  color: '#64748b',
                  lineHeight: 1.65,
                  maxWidth: 480,
                  marginBottom: 28
                }}>
                  Learn from industry experts with flexible online courses across multiple fields. Start with lesson 1 free, build job-ready portfolios, and earn accredited certificates.
                </p>

                {/* Clean Modern Action Row */}
                <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 24, marginTop: 8 }}>
                  <button
                    onClick={() => { if (onNavigateToCourses) onNavigateToCourses(); else scrollToCourses(); }}
                    style={{
                      padding: '16px 32px',
                      borderRadius: 14,
                      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                      color: '#ffffff',
                      fontSize: 16,
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 10px 25px -4px rgba(37, 99, 235, 0.45)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 14px 30px -4px rgba(37, 99, 235, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 25px -4px rgba(37, 99, 235, 0.45)';
                    }}
                  >
                    <span>Explore Courses</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() => {
                      const el = document.getElementById('webinar-spotlight-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      padding: '16px 26px',
                      borderRadius: 14,
                      background: '#ffffff',
                      color: '#0f172a',
                      fontSize: 15,
                      fontWeight: 700,
                      border: '1.5px solid #e2e8f0',
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#cbd5e1';
                      e.currentTarget.style.background = '#f8fafc';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.background = '#ffffff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Flame size={18} color="#ef4444" />
                    <span>Live Masterclass</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 32, fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={16} color="#16a34a" /> 1st Lesson 100% Free
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={16} color="#16a34a" /> Accredited Certificate
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={16} color="#16a34a" /> Lifetime Access
                  </span>
                </div>

                {/* Metric Stats Infinite Right-to-Left Marquee */}
                <div
                  className="stats-marquee-container"
                  style={{
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: 480,
                    paddingTop: 18,
                    borderTop: '1px solid #f1f5f9',
                    position: 'relative',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
                  }}
                >
                  <div className="stats-marquee-track">
                    {/* Set 1 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexShrink: 0 }}>
                      <div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>500+</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>Courses</div>
                      </div>
                      <div style={{ height: 32, width: 1, background: '#e2e8f0', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>1M+</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>Students</div>
                      </div>
                      <div style={{ height: 32, width: 1, background: '#e2e8f0', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>4.9 ★</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>Rating</div>
                      </div>
                      <div style={{ height: 32, width: 1, background: '#e2e8f0', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>98%</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>Placement</div>
                      </div>
                      <div style={{ height: 32, width: 1, background: '#e2e8f0', flexShrink: 0 }} />
                    </div>

                    {/* Set 2 (Identical for seamless infinite continuous scroll) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexShrink: 0 }}>
                      <div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>500+</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>Courses</div>
                      </div>
                      <div style={{ height: 32, width: 1, background: '#e2e8f0', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>1M+</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>Students</div>
                      </div>
                      <div style={{ height: 32, width: 1, background: '#e2e8f0', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>4.9 ★</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>Rating</div>
                      </div>
                      <div style={{ height: 32, width: 1, background: '#e2e8f0', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 30, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>98%</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4, whiteSpace: 'nowrap' }}>Placement</div>
                      </div>
                      <div style={{ height: 32, width: 1, background: '#e2e8f0', flexShrink: 0 }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Cheerful Students */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 450 }}>
                {/* Cheerful Students */}
                <img
                  src="/assets/kaira_hero_students.jpg"
                  alt="Kaira Students"
                  style={{
                    width: '100%',
                    maxWidth: 480,
                    position: 'relative',
                    zIndex: 2,
                    display: 'block',
                    borderRadius: 20,
                    objectFit: 'contain',
                    boxShadow: '0 15px 35px -5px rgba(15, 23, 42, 0.08)'
                  }}
                />
              </div>

            </div>

            {/* Bottom Enterprise Partners Strip */}
            <div style={{
              marginTop: 40,
              paddingTop: 24,
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '0.06em' }}>
                Accredited Curriculum & Career Partners:
              </span>
              <div style={{
                display: 'flex',
                gap: 'clamp(16px, 3.5vw, 36px)',
                alignItems: 'center',
                flexWrap: 'wrap',
                fontWeight: 900,
                fontSize: 13,
                color: '#64748b',
                letterSpacing: '0.08em'
              }}>
                <span>GOOGLE</span>
                <span>STANFORD ONLINE</span>
                <span>DEEPLEARNING.AI</span>
                <span>META</span>
                <span>MICROSOFT</span>
                <span>ZOHO</span>
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
                      style={{ position: 'relative', width: '100%', height: 210, cursor: 'pointer', overflow: 'hidden', background: '#0f172a' }}
                    >
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.05) 50%, transparent 100%)', zIndex: 1, pointerEvents: 'none' }} />
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
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#0056D2', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          {course.partner || 'DeepLearning.AI'}
                        </span>
                        <span style={{
                          background: '#ecfdf5',
                          color: '#047857',
                          border: '1px solid #a7f3d0',
                          fontSize: 10,
                          fontWeight: 800,
                          padding: '2px 7px',
                          borderRadius: 4,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4
                        }}>
                          <Play size={8} fill="#047857" /> 1st Video Free
                        </span>
                      </div>

                      <h3
                        onClick={() => onViewCourse && onViewCourse(course._id)}
                        style={{
                          fontSize: 17,
                          fontWeight: 800,
                          color: '#0f172a',
                          lineHeight: 1.35,
                          margin: '4px 0 8px',
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
                        paddingTop: 14,
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

                      {/* Coursera Freemium Action Buttons */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                        <button
                          onClick={() => {
                            if (onStartLearning) {
                              onStartLearning(course._id);
                            } else if (onViewCourse) {
                              onViewCourse(course._id);
                            }
                          }}
                          style={{
                            background: '#f0fdf4',
                            border: '1.5px solid #86efac',
                            color: '#15803d',
                            padding: '10px 8px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            transition: 'all 0.2s'
                          }}
                          title="Watch 1st lesson for free without payment"
                        >
                          <Play size={13} fill="#15803d" />
                          <span>Watch 1st Free</span>
                        </button>

                        <button
                          onClick={() => onEnrollCourse && onEnrollCourse(course)}
                          style={{
                            background: '#0056D2',
                            border: 'none',
                            color: '#ffffff',
                            padding: '10px 8px',
                            borderRadius: 6,
                            fontSize: 13,
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            boxShadow: '0 2px 8px rgba(0, 86, 210, 0.3)',
                            transition: 'all 0.2s'
                          }}
                        >
                          <span>Enroll ₹{course.price || 499}</span>
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

      {/* =========================================================================
          2.5 HOW IT WORKS: 4 SIMPLE STEPS TO CAREER MASTERY
          ========================================================================= */}
      <section id="how-it-works-section" style={{
        padding: '115px 0 125px',
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        borderBottom: '1px solid #e2e8f0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Subtle Radial Glow */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '85%',
          height: 420,
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, rgba(97, 218, 251, 0.03) 50%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }} />

        <div className="container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

          {/* Bigger Section Header */}
          <div style={{ textAlign: 'center', maxWidth: 840, margin: '0 auto 64px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#eff6ff',
              border: '1.5px solid #bfdbfe',
              color: '#1d4ed8',
              padding: '8px 20px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: '0.04em',
              marginBottom: 18,
              boxShadow: '0 2px 10px rgba(37, 99, 235, 0.1)'
            }}>
              <Sparkles size={16} />
              <span>HOW IT WORKS • 4-STEP LEARNING ROADMAP</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 4.4vw, 54px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.03em',
              margin: '0 0 18px',
              lineHeight: 1.15
            }}>
              Your Fast Track from Learner to Production Engineer
            </h2>

            <p style={{ fontSize: 18, color: '#475569', lineHeight: 1.7, margin: 0 }}>
              Zero unnecessary theory. 100% production-grade engineering, hands-on codebases, and verifiable industry credentials.
            </p>
          </div>

          {/* 4 Grand Step Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 28,
            position: 'relative'
          }}>
            {[
              {
                step: '01',
                title: 'Choose Your Track',
                badge: '1st Lesson 100% Free',
                desc: 'Browse our 25 in-demand specializations across AI Agents, Modern MERN, Cloud Kubernetes, or Cybersecurity. Sample the 1st video lesson free with no credit card required.',
                highlight: '✨ 100% Free Video Preview',
                color: '#2563eb',
                bgGradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                icon: BookOpen
              },
              {
                step: '02',
                title: 'Build Production Code',
                badge: 'Real GitHub Repos',
                desc: 'Code enterprise-level projects with step-by-step guidance. Build real multi-agent swarms, cloud infrastructure, and authenticated payment gateways with zero toy code.',
                highlight: '⚡ Production-Ready Repos',
                color: '#7c3aed',
                bgGradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
                icon: Code
              },
              {
                step: '03',
                title: 'Live Masterclass Mentorship',
                badge: 'Live on Nov 4, 2026',
                desc: 'Join senior software architects for live interactive masterclasses. Debug real deployment challenges, ask direct questions, and solve architecture design problems.',
                highlight: '🔴 Live Mentor Q&A (Nov 4)',
                color: '#059669',
                bgGradient: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                icon: Video
              },
              {
                step: '04',
                title: 'Earn Verifiable Certificate',
                badge: 'LinkedIn Verified',
                desc: 'Receive an official, tamper-proof Certificate of Completion with a unique verification link for recruiters, plus resume portfolio review and job interview assistance.',
                highlight: '🎓 Verifiable Digital Credential',
                color: '#d97706',
                bgGradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                icon: Award
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: 22,
                    padding: '38px 28px',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 380,
                    boxShadow: '0 6px 24px rgba(15, 23, 42, 0.05)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(15, 23, 42, 0.12)';
                    e.currentTarget.style.borderColor = item.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 6px 24px rgba(15, 23, 42, 0.05)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  {/* Step Icon and Large Number */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                    <div style={{
                      width: 58,
                      height: 58,
                      borderRadius: 16,
                      background: item.bgGradient,
                      color: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.06)'
                    }}>
                      <IconComp size={28} />
                    </div>

                    <span style={{
                      fontSize: 36,
                      fontWeight: 900,
                      color: '#cbd5e1',
                      fontFamily: 'monospace',
                      letterSpacing: '-0.04em'
                    }}>
                      {item.step}
                    </span>
                  </div>

                  <span style={{
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    background: item.bgGradient,
                    color: item.color,
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: 9999,
                    marginBottom: 14
                  }}>
                    {item.badge}
                  </span>

                  <h3 style={{
                    fontSize: 21,
                    fontWeight: 900,
                    color: '#0f172a',
                    margin: '0 0 12px',
                    lineHeight: 1.3
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    fontSize: 14.5,
                    color: '#64748b',
                    lineHeight: 1.65,
                    margin: '0 0 20px',
                    flex: 1
                  }}>
                    {item.desc}
                  </p>

                  <div style={{
                    paddingTop: 14,
                    borderTop: '1px solid #f1f5f9',
                    fontSize: 12.5,
                    fontWeight: 800,
                    color: item.color
                  }}>
                    {item.highlight}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grand Bottom Action Strip */}
          <div style={{
            marginTop: 56,
            background: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
            border: '1.5px solid #bfdbfe',
            borderRadius: 24,
            padding: '36px 44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            boxShadow: '0 10px 30px rgba(37, 99, 235, 0.08)'
          }}>
            <div style={{ textAlign: 'left', maxWidth: 640 }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a', marginBottom: 6 }}>
                Ready to explore all 25 professional career courses?
              </div>
              <div style={{ fontSize: 15, color: '#64748b', lineHeight: 1.5 }}>
                Filter by AI, Full-Stack, Cloud, or Cyber Security and start learning with your 1st lesson free today.
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  if (onNavigateToCourses) {
                    onNavigateToCourses();
                  } else {
                    const el = document.getElementById('featured-courses-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: 14,
                  fontSize: 16,
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  boxShadow: '0 8px 20px rgba(29, 78, 216, 0.35)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <BookOpen size={18} />
                <span>Explore All 25 Courses</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. GOOGLE CUSTOMER REVIEWS & STUDENT TESTIMONIALS (Replaces 2nd image section) */}
      <section id="google-reviews-section" style={{ padding: '80px 0', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto 48px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              padding: '8px 20px',
              borderRadius: 9999,
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              marginBottom: 16
            }}>
              {/* Google 4-Color Icon */}
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#1e293b', letterSpacing: '0.02em' }}>
                GOOGLE VERIFIED REVIEWS
              </span>
              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 800, padding: '3px 8px', borderRadius: 9999 }}>
                4.9 / 5.0 RATED
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.025em', margin: '0 0 14px' }}>
              Real Stories from Google Reviews
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6, margin: 0 }}>
              Over <strong>2,850+ verified learners</strong> have transformed their software careers and landed enterprise engineering roles with Kaira Course.
            </p>

            {/* Google Rating Big Summary Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 16,
              marginTop: 22,
              background: '#ffffff',
              padding: '12px 24px',
              borderRadius: 16,
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.04)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: '#0f172a' }}>4.9</span>
                <div style={{ display: 'flex', gap: 3 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
              </div>
              <div style={{ height: 26, width: 1, background: '#cbd5e1' }} />
              <div style={{ fontSize: 13, color: '#475569', textAlign: 'left' }}>
                Overall rating on <strong>Google Business</strong>
                <div style={{ fontSize: 11, color: '#16a34a', fontWeight: 700 }}>✓ 100% Genuine Verified Students</div>
              </div>
            </div>
          </div>

          {/* Reviews Auto-Moving Track: Left to Right (1 by 1) */}
          <div style={{ position: 'relative', marginBottom: 40, overflow: 'hidden' }}>

            {/* Controls Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
              padding: '0 4px',
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: '#eff6ff',
                  color: '#1d4ed8',
                  border: '1px solid #bfdbfe',
                  padding: '4px 12px',
                  borderRadius: 9999,
                  fontSize: 12,
                  fontWeight: 700
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  <span>1 by 1 Moving Left to Right • Hover to Pause</span>
                </span>
              </div>

              {/* Navigation Arrows for Manual 1 by 1 Sliding */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('reviews-moving-container');
                    if (el) el.scrollBy({ left: -360, behavior: 'smooth' });
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    color: '#0f172a',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    transition: 'all 0.15s'
                  }}
                  title="Move Left"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('reviews-moving-container');
                    if (el) el.scrollBy({ left: 360, behavior: 'smooth' });
                  }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '1.5px solid #cbd5e1',
                    color: '#0f172a',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                    transition: 'all 0.15s'
                  }}
                  title="Move Right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Gradient edge masks */}
            <div style={{
              position: 'absolute',
              top: 50,
              bottom: 0,
              left: 0,
              width: 50,
              background: 'linear-gradient(to right, #f8fafc, transparent)',
              zIndex: 10,
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              top: 50,
              bottom: 0,
              right: 0,
              width: 50,
              background: 'linear-gradient(to left, #f8fafc, transparent)',
              zIndex: 10,
              pointerEvents: 'none'
            }} />

            {/* Continuous Marquee Track Moving Left to Right */}
            <div
              id="reviews-moving-container"
              style={{
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                padding: '10px 4px 20px'
              }}
            >
              <div className="marquee-reviews-track">
                {[
                  {
                    name: 'Arun Prakash S.',
                    role: 'Software Development Engineer at Zoho',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                    date: '3 days ago',
                    rating: 5,
                    title: 'Transitioned to AI Engineer within weeks!',
                    text: 'Kaira Course is hands down the best investment for tech careers. The curriculum is 100% practical, no fluff. Within 2 weeks of completing the hands-on project portfolio, I transitioned into an AI engineering role. The ₹1 registration was super smooth with UPI!'
                  },
                  {
                    name: 'Priya Dharshini',
                    role: 'Full Stack Developer at Freshworks',
                    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
                    date: '1 week ago',
                    rating: 5,
                    title: 'Industry-grade curriculum with GST invoice',
                    text: 'The depth of real-world architecture in this course is unmatched. Mentor support was always there to debug live deployment challenges. The GST tax invoice arrived instantly after payment. Proud to have my certificate verified on LinkedIn.'
                  },
                  {
                    name: 'Venkatesh K.',
                    role: 'Senior DevOps Engineer at Cognizant',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                    date: '2 weeks ago',
                    rating: 5,
                    title: 'Fast UPI Razorpay payment & instant access',
                    text: 'Clear, structured, and enterprise-grade. The payment checkout with Razorpay UPI was fast and safe. If you want production-level skills rather than basic theory, Kaira is the gold standard.'
                  },
                  {
                    name: 'Ananya Subramanian',
                    role: 'Cloud Solutions Associate at Amazon Web Services (AWS)',
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
                    date: '3 weeks ago',
                    rating: 5,
                    title: 'Helped me crack my system design interviews',
                    text: 'I was skeptical at first about online courses, but Kaira exceeded all expectations. The code walkthroughs, microservices architecture, and hands-on drills helped me clear my system design interviews with flying colors!'
                  },
                  {
                    name: 'Karthikeyan Murugan',
                    role: 'Product Engineer at ThoughtWorks',
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                    date: '1 month ago',
                    rating: 5,
                    title: 'Zero lag, HD video player, instant certificate',
                    text: 'Genuinely impressed with the platform. No lag, high quality HD lessons, and instant customer service. Received my course completion certificate right after submitting the final capstone.'
                  },
                  {
                    name: 'Divya Bharathi',
                    role: 'AI Researcher & Tech Lead',
                    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
                    date: '1 month ago',
                    rating: 5,
                    title: 'High production value & exceptional quality',
                    text: 'From registration to live access, everything worked seamlessly. The curriculum covers latest AI agents, streaming protocols, and backend security. Highly recommend to both freshers and working professionals.'
                  },
                  // Duplicate items for seamless infinite left-to-right loop
                  {
                    name: 'Arun Prakash S.',
                    role: 'Software Development Engineer at Zoho',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
                    date: '3 days ago',
                    rating: 5,
                    title: 'Transitioned to AI Engineer within weeks!',
                    text: 'Kaira Course is hands down the best investment for tech careers. The curriculum is 100% practical, no fluff. Within 2 weeks of completing the hands-on project portfolio, I transitioned into an AI engineering role. The ₹1 registration was super smooth with UPI!'
                  },
                  {
                    name: 'Priya Dharshini',
                    role: 'Full Stack Developer at Freshworks',
                    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
                    date: '1 week ago',
                    rating: 5,
                    title: 'Industry-grade curriculum with GST invoice',
                    text: 'The depth of real-world architecture in this course is unmatched. Mentor support was always there to debug live deployment challenges. The GST tax invoice arrived instantly after payment. Proud to have my certificate verified on LinkedIn.'
                  },
                  {
                    name: 'Venkatesh K.',
                    role: 'Senior DevOps Engineer at Cognizant',
                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
                    date: '2 weeks ago',
                    rating: 5,
                    title: 'Fast UPI Razorpay payment & instant access',
                    text: 'Clear, structured, and enterprise-grade. The payment checkout with Razorpay UPI was fast and safe. If you want production-level skills rather than basic theory, Kaira is the gold standard.'
                  },
                  {
                    name: 'Ananya Subramanian',
                    role: 'Cloud Solutions Associate at Amazon Web Services (AWS)',
                    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
                    date: '3 weeks ago',
                    rating: 5,
                    title: 'Helped me crack my system design interviews',
                    text: 'I was skeptical at first about online courses, but Kaira exceeded all expectations. The code walkthroughs, microservices architecture, and hands-on drills helped me clear my system design interviews with flying colors!'
                  },
                  {
                    name: 'Karthikeyan Murugan',
                    role: 'Product Engineer at ThoughtWorks',
                    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
                    date: '1 month ago',
                    rating: 5,
                    title: 'Zero lag, HD video player, instant certificate',
                    text: 'Genuinely impressed with the platform. No lag, high quality HD lessons, and instant customer service. Received my course completion certificate right after submitting the final capstone.'
                  },
                  {
                    name: 'Divya Bharathi',
                    role: 'AI Researcher & Tech Lead',
                    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
                    date: '1 month ago',
                    rating: 5,
                    title: 'High production value & exceptional quality',
                    text: 'From registration to live access, everything worked seamlessly. The curriculum covers latest AI agents, streaming protocols, and backend security. Highly recommend to both freshers and working professionals.'
                  }
                ].map((rev, rIdx) => (
                  <div
                    key={rIdx}
                    style={{
                      width: 350,
                      flexShrink: 0,
                      background: '#ffffff',
                      borderRadius: 18,
                      padding: '24px 26px',
                      border: '1.5px solid #e2e8f0',
                      boxShadow: '0 4px 18px rgba(15, 23, 42, 0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(15, 23, 42, 0.12)';
                      e.currentTarget.style.borderColor = '#93c5fd';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 18px rgba(15, 23, 42, 0.04)';
                      e.currentTarget.style.borderColor = '#e2e8f0';
                    }}
                  >
                    <div>
                      {/* Top: Stars & Google Tag */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <div style={{ display: 'flex', gap: 3 }}>
                          {[...Array(rev.rating)].map((_, s) => (
                            <Star key={s} size={16} fill="#f59e0b" color="#f59e0b" />
                          ))}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#64748b', fontWeight: 600 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                          </svg>
                          <span>Google</span>
                          <span>•</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>

                      {/* Title & Review Text */}
                      <h4 style={{ fontSize: 15.5, fontWeight: 800, color: '#0f172a', margin: '0 0 8px', lineHeight: 1.4 }}>
                        "{rev.title}"
                      </h4>
                      <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.6, margin: '0 0 16px' }}>
                        {rev.text}
                      </p>
                    </div>

                    {/* Reviewer Details */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ fontSize: 13.5, fontWeight: 800, color: '#0f172a' }}>{rev.name}</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: '#eff6ff', color: '#1d4ed8', fontSize: 10, fontWeight: 800, padding: '1px 6px', borderRadius: 9999 }}>
                            <CheckCircle2 size={11} color="#1d4ed8" /> Verified
                          </span>
                        </div>
                        <div style={{ fontSize: 11.5, color: '#64748b', marginTop: 2 }}>{rev.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Guarantee Strip */}
          <div style={{
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e2e8f0',
            padding: '20px 28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ShieldCheck size={24} color="#16a34a" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>
                  100% Genuine Student Success Stories
                </div>
                <div style={{ fontSize: 12, color: '#64748b' }}>
                  Verified by Google Customer Reviews & LinkedIn Professional Certifications
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('registration-payment-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                background: '#0056D2',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <span>Register for Kaira Course (₹1)</span>
              <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </section>

      <section id="registration-payment-section" style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#0056D2', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Official Course Registration
            </span>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginTop: 6 }}>
              Register for Kaira Course
            </h2>
            <p style={{ fontSize: 15, color: '#64748b', marginTop: 8 }}>
              Enter your details to register. On the next screen, you will be able to complete your ₹1 UPI payment.
            </p>
          </div>

          <RegistrationForm
            webinar={webinar}
            onRegisterSuccess={onRegisterSuccess}
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
    thumbnail: '/images/course_ai.png',
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
    thumbnail: '/images/course_mern.png',
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
    thumbnail: '/images/course_cloud_fullstack.png',
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
    thumbnail: '/images/course_uiux_agency.png',
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
    thumbnail: '/images/course_rag_uiux.png',
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
    thumbnail: '/images/course_cybersecurity.png',
    badge: 'Featured',
    rating: 4.87,
    reviewsCount: 1420,
    studentsCount: 8900,
    durationHours: 20,
    instructor: { name: 'David Thorne', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80' }
  }
];
