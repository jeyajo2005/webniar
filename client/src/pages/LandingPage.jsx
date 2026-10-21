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
  Mail
} from 'lucide-react';
import { api } from '../services/api.js';

export default function LandingPage({ 
  webinar, 
  onPaymentSuccess,
  onViewCourse,
  onEnrollCourse,
  onStartLearning,
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
                    ✨ #1 Online Skill Platform • 1st Video Lesson Free on All Courses
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

                {/* Inquiry Lead Form matching Image 1 with Modern Icons */}
                <form onSubmit={handleLeadSubmit} style={{ maxWidth: 470, marginBottom: 32 }}>
                  {/* Name Input with User Icon */}
                  <div style={{ position: 'relative', marginBottom: 14 }}>
                    <User size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: 16, pointerEvents: 'none' }} />
                    <input
                      type="text"
                      placeholder="Insert Your Name"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 18px 14px 44px',
                        borderRadius: 12,
                        border: '1.5px solid #e2e8f0',
                        background: '#f8fafc',
                        fontSize: 15,
                        color: '#0f172a',
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'all 0.2s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.background = '#ffffff';
                        e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.12)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.background = '#f8fafc';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  {/* Email & Interest Row with Icons */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 16 }}>
                    <div style={{ position: 'relative' }}>
                      <Mail size={17} color="#94a3b8" style={{ position: 'absolute', left: 16, top: 16, pointerEvents: 'none' }} />
                      <input
                        type="email"
                        placeholder="Email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 18px 14px 42px',
                          borderRadius: 12,
                          border: '1.5px solid #e2e8f0',
                          background: '#f8fafc',
                          fontSize: 15,
                          color: '#0f172a',
                          outline: 'none',
                          boxSizing: 'border-box',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2563eb';
                          e.target.style.background = '#ffffff';
                          e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.12)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.background = '#f8fafc';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>

                    <div style={{ position: 'relative' }}>
                      <Sparkles size={16} color="#f59e0b" style={{ position: 'absolute', left: 14, top: 16, pointerEvents: 'none' }} />
                      <select
                        value={leadForm.interest}
                        onChange={(e) => setLeadForm({ ...leadForm, interest: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '14px 14px 14px 38px',
                          borderRadius: 12,
                          border: '1.5px solid #e2e8f0',
                          background: '#f8fafc',
                          fontSize: 14,
                          fontWeight: 500,
                          color: leadForm.interest ? '#0f172a' : '#94a3b8',
                          outline: 'none',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#2563eb';
                          e.target.style.background = '#ffffff';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.background = '#f8fafc';
                        }}
                      >
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Full-Stack Web Dev">Full-Stack Web Dev</option>
                        <option value="Cloud Architecture">Cloud Architecture</option>
                        <option value="Data Science & ML">Data Science & ML</option>
                        <option value="Cyber Security">Cyber Security</option>
                      </select>
                    </div>
                  </div>

                  {/* Coral CTA Button with Hover Polish */}
                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '16px 28px',
                      borderRadius: 12,
                      background: 'linear-gradient(135deg, #ff6b4a 0%, #ff5230 100%)',
                      color: '#ffffff',
                      fontSize: 16,
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 10px 25px -4px rgba(255, 107, 74, 0.55)',
                      transition: 'all 0.25s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      letterSpacing: '0.01em'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
                      e.currentTarget.style.boxShadow = '0 14px 30px -4px rgba(255, 107, 74, 0.7)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 25px -4px rgba(255, 107, 74, 0.55)';
                    }}
                  >
                    <span>Explore Courses</span>
                    <ArrowRight size={18} />
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 12, fontSize: 12, color: '#64748b' }}>
                    <span>✓ 1st Lesson 100% Free</span>
                    <span>•</span>
                    <span>✓ Verifiable Certificate</span>
                    <span>•</span>
                    <span>✓ No Credit Card Required</span>
                  </div>
                </form>

                {/* 3 Metric Stats matching Image 1 */}
                <div style={{
                  display: 'flex',
                  gap: 36,
                  alignItems: 'center',
                  paddingTop: 18,
                  borderTop: '1px solid #f1f5f9'
                }}>
                  <div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>500+</div>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4 }}>Courses</div>
                  </div>
                  <div style={{ height: 36, width: 1, background: '#e2e8f0' }} />
                  <div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>1M+</div>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4 }}>Students</div>
                  </div>
                  <div style={{ height: 36, width: 1, background: '#e2e8f0' }} />
                  <div>
                    <div style={{ fontSize: 32, fontWeight: 900, color: '#1d4ed8', lineHeight: 1 }}>4.9</div>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginTop: 4 }}>Rating ★</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Warm Yellow Backdrop + Cheerful Students + Depth Badges */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 450 }}>
                
                {/* Organic Amber/Yellow Backdrop Shape matching Image 1 */}
                <div style={{
                  position: 'absolute',
                  width: '94%',
                  height: '92%',
                  right: '0%',
                  top: '4%',
                  borderRadius: '52% 48% 62% 38% / 46% 52% 48% 54%',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 60%, #fde047 100%)',
                  zIndex: 1,
                  transform: 'rotate(-4deg)',
                  boxShadow: '0 20px 40px rgba(245, 158, 11, 0.25)'
                }} />

                {/* Floating Depth Badge 1: Top Left */}
                <div style={{
                  position: 'absolute',
                  top: 10,
                  left: -12,
                  zIndex: 5,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 14,
                  padding: '8px 14px',
                  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={16} color="#16a34a" />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#0f172a' }}>98.4% Placement</div>
                    <div style={{ fontSize: 10, color: '#64748b' }}>Google, Meta, TCS</div>
                  </div>
                </div>

                {/* Floating Depth Badge 2: Top Right */}
                <div style={{
                  position: 'absolute',
                  top: 24,
                  right: -10,
                  zIndex: 5,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 14,
                  padding: '8px 14px',
                  boxShadow: '0 12px 28px rgba(15, 23, 42, 0.12)',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                  <span style={{ fontSize: 12, fontWeight: 800, color: '#0f172a' }}>Live Mentor Q&A</span>
                </div>

                {/* Cheerful Students Cutout matching Image 1 */}
                <img
                  src="/assets/kaira_hero_students.jpg"
                  alt="Kaira Students"
                  style={{
                    width: '100%',
                    maxWidth: 480,
                    position: 'relative',
                    zIndex: 2,
                    display: 'block',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.12))'
                  }}
                />

                {/* Joanne H. Floating Testimonial Card matching Image 1 */}
                <div style={{
                  position: 'absolute',
                  bottom: -10,
                  right: -10,
                  zIndex: 5,
                  background: '#ffffff',
                  borderRadius: 18,
                  padding: '16px 20px',
                  maxWidth: 250,
                  boxShadow: '0 20px 40px rgba(15, 23, 42, 0.18)',
                  border: '1px solid #f1f5f9',
                  transition: 'transform 0.2s'
                }}>
                  {/* Rating Stars & Heart */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{ color: '#f59e0b', fontSize: 14 }}>★</span>
                      ))}
                    </div>
                    <span style={{
                      background: '#ef4444',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10
                    }}>
                      ❤️
                    </span>
                  </div>

                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>
                    Joanne H.
                  </div>
                  <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.45, margin: 0 }}>
                    Clear, easy to use, and the courses are amazing! I love how simple it is to find what I need.
                  </p>
                </div>
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

      {/* 3. UPCOMING LIVE WEBINAR SPOTLIGHT SECTION */}
      {/* 3. UNIQUE VIP MASTERCLASS STUDIO TICKET SECTION */}
      <section id="webinar-spotlight-section" style={{
        padding: '90px 0',
        background: '#f8fafc',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          
          {/* Section Super-Header */}
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: '#dc2626',
              fontSize: 12,
              fontWeight: 800,
              padding: '6px 16px',
              borderRadius: 9999,
              marginBottom: 12,
              letterSpacing: '0.04em'
            }}>
              <Flame size={15} color="#ef4444" />
              <span>OFFICIAL FLAGSHIP MASTERCLASS • NOVEMBER 4, 2026</span>
            </div>
            <h2 style={{
              fontSize: 'clamp(28px, 3.4vw, 42px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.03em',
              lineHeight: 1.2
            }}>
              Exclusive VIP Masterclass Pass
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', marginTop: 10 }}>
              Join senior engineers and AI architects in this high-intensity 3-hour live cohort session.
            </p>
          </div>

          {/* Luxury VIP Studio Ticket Frame */}
          <div style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #090e1a 0%, #111827 50%, #0d1222 100%)',
            borderRadius: 28,
            boxShadow: '0 30px 70px -15px rgba(15, 23, 42, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 40px rgba(79, 70, 229, 0.18)',
            overflow: 'hidden',
            color: '#ffffff'
          }}>
            {/* Ambient Background Glow Effect */}
            <div style={{
              position: 'absolute',
              top: -60,
              right: -60,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
            <div style={{
              position: 'absolute',
              bottom: -60,
              left: -60,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236, 72, 153, 0.18) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            {/* Ticket Notch Cutouts (Simulated Perforation Edge at 65% width) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 0.75fr)',
              position: 'relative'
            }} className="hero-grid">
              
              {/* LEFT PANE: Admission Ticket Main Body */}
              <div style={{
                padding: 'clamp(32px, 4vw, 52px)',
                borderRight: '2px dashed rgba(255, 255, 255, 0.15)',
                position: 'relative'
              }}>
                {/* Ticket Top Meta Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      color: '#f87171',
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '4px 12px',
                      borderRadius: 9999
                    }}>
                      <span className="live-indicator-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
                      LIVE INTERACTIVE
                    </span>
                    <span style={{ fontSize: 12, color: '#94a3b8', fontFamily: 'monospace' }}>
                      PASS #KAIRA-VIP-8821
                    </span>
                  </div>

                  <span style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: '#fbbf24',
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    <Zap size={13} />
                    <span>ONLY 38 SEATS LEFT</span>
                  </span>
                </div>

                {/* Masterclass Headline */}
                <h3 style={{
                  fontSize: 'clamp(26px, 3.2vw, 38px)',
                  fontWeight: 900,
                  lineHeight: 1.2,
                  letterSpacing: '-0.025em',
                  marginBottom: 14,
                  color: '#ffffff'
                }}>
                  Full-Stack AI &{' '}
                  <span style={{
                    background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    Autonomous Agents
                  </span>{' '}
                  Masterclass
                </h3>

                <p style={{
                  fontSize: 15,
                  color: '#cbd5e1',
                  lineHeight: 1.65,
                  marginBottom: 24,
                  maxWidth: 620
                }}>
                  Build, deploy, and monetize production autonomous AI agents with real-time streaming, tool calling, and automated GST billing. Live hot-seat architecture evaluations with Dr. Elena Vance.
                </p>

                {/* Live Countdown Display Cards */}
                <div style={{ marginBottom: 26 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                    Live Studio Broadcast Starts In:
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {[
                      { label: 'Days', val: String(timeLeft.days).padStart(2, '0') },
                      { label: 'Hours', val: String(timeLeft.hours).padStart(2, '0') },
                      { label: 'Minutes', val: String(timeLeft.minutes).padStart(2, '0') },
                      { label: 'Seconds', val: String(timeLeft.seconds).padStart(2, '0') }
                    ].map((slot, sIdx) => (
                      <div key={sIdx} style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        borderRadius: 12,
                        padding: '10px 16px',
                        textAlign: 'center',
                        minWidth: 68
                      }}>
                        <div style={{ fontSize: 24, fontWeight: 900, color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1 }}>
                          {slot.val}
                        </div>
                        <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', marginTop: 4, fontWeight: 600 }}>
                          {slot.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Capacity Meter (Progress Bar) */}
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 14,
                  padding: '14px 18px',
                  marginBottom: 28
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, fontSize: 13 }}>
                    <span style={{ color: '#e2e8f0', fontWeight: 700 }}>
                      Live Seats Status: <strong style={{ color: '#4ade80' }}>462 / 500 Claimed</strong>
                    </span>
                    <span style={{ color: '#f59e0b', fontWeight: 800 }}>92.4% Booked</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: 8,
                    borderRadius: 9999,
                    background: 'rgba(255, 255, 255, 0.12)',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: '92.4%',
                      height: '100%',
                      background: 'linear-gradient(90deg, #10b981 0%, #3b82f6 70%, #ef4444 100%)',
                      borderRadius: 9999
                    }} />
                  </div>
                </div>

                {/* Quick Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#e2e8f0', fontSize: 13 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Calendar size={16} color="#818cf8" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>DATE</div>
                      <div style={{ fontWeight: 700 }}>November 4, 2026</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#e2e8f0', fontSize: 13 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Clock size={16} color="#818cf8" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>SCHEDULE</div>
                      <div style={{ fontWeight: 700 }}>07:00 PM IST (180 mins)</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#e2e8f0', fontSize: 13 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Award size={16} color="#34d399" />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>CREDENTIAL</div>
                      <div style={{ fontWeight: 700 }}>Verifiable Certificate</div>
                    </div>
                  </div>
                </div>

                {/* Primary Action Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                  <button
                    onClick={scrollToPaymentSection}
                    style={{
                      background: 'linear-gradient(135deg, #ff6b4a 0%, #ea580c 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '16px 36px',
                      borderRadius: 12,
                      fontSize: 16,
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      boxShadow: '0 10px 30px rgba(234, 88, 12, 0.45)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 14px 36px rgba(234, 88, 12, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(234, 88, 12, 0.45)';
                    }}
                  >
                    <span>Reserve VIP Live Seat (₹499)</span>
                    <ArrowRight size={18} />
                  </button>

                  <span style={{ fontSize: 12, color: '#94a3b8' }}>
                    ⚡ Instant Calendar Sync & Tax Invoice
                  </span>
                </div>
              </div>

              {/* RIGHT PANE: Ticket Stub (Speaker & Bonus Vault) */}
              <div style={{
                padding: 'clamp(32px, 4vw, 44px)',
                background: 'rgba(0, 0, 0, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  {/* Stub Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingBottom: 14,
                    marginBottom: 20
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#a5b4fc', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Keynote Speaker & Mentor
                    </span>
                    <span style={{ fontSize: 10, color: '#64748b', fontFamily: 'monospace' }}>
                      STUB SEC-A
                    </span>
                  </div>

                  {/* Speaker Card */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{ position: 'relative' }}>
                      <img
                        src="/assets/female_presenter_blazer.jpg"
                        alt="Dr. Elena Vance"
                        style={{
                          width: 68,
                          height: 68,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2.5px solid #818cf8',
                          boxShadow: '0 4px 16px rgba(129, 140, 248, 0.4)'
                        }}
                      />
                      <span style={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                        background: '#10b981',
                        borderRadius: '50%',
                        width: 18,
                        height: 18,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid #0f172a'
                      }}>
                        <Check size={11} color="#ffffff" />
                      </span>
                    </div>

                    <div>
                      <h4 style={{ fontSize: 18, fontWeight: 900, color: '#ffffff', margin: 0 }}>Dr. Elena Vance</h4>
                      <p style={{ fontSize: 12, color: '#a5b4fc', margin: '3px 0 0' }}>Principal AI Systems Architect</p>
                      <p style={{ fontSize: 11, color: '#facc15', margin: '4px 0 0', fontWeight: 700 }}>
                        ★ 4.98 / 5.0 (3,800+ reviews)
                      </p>
                    </div>
                  </div>

                  <p style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, marginBottom: 22 }}>
                    Over 12 years of enterprise engineering experience. Former AI Lead, trained 45,000+ engineers worldwide in LLM pipelines, autonomous multi-agent coordination, and scalable cloud monetization.
                  </p>

                  {/* Included Free Bonus Perks Stack */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: 16,
                    padding: '16px 18px',
                    marginBottom: 20
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <span style={{ fontSize: 12, fontWeight: 800, color: '#facc15', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Gift size={14} />
                        <span>Free Bonuses Included</span>
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#4ade80' }}>
                        ₹10,996 VALUE
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#e2e8f0' }}>
                        <CheckCircle2 size={15} color="#4ade80" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span><strong>Production Multi-Agent SaaS Starter Repo</strong> (₹4,999 Value)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#e2e8f0' }}>
                        <CheckCircle2 size={15} color="#4ade80" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span><strong>100+ Enterprise System Prompts & Tool Calling</strong> (₹3,499 Value)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: '#e2e8f0' }}>
                        <CheckCircle2 size={15} color="#4ade80" style={{ flexShrink: 0, marginTop: 1 }} />
                        <span><strong>Official VIP WhatsApp Mastermind & Networking</strong> (₹2,498 Value)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ticket Barcode & Authentication Footer */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingTop: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.1em', fontFamily: 'monospace' }}>
                      |||| | ||||| || |||||| | ||| ||
                    </div>
                    <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 4, letterSpacing: '0.05em' }}>
                      KAIRA VERIFIED EVENT • 2026
                    </div>
                  </div>

                  <span style={{
                    fontSize: 10,
                    fontWeight: 800,
                    color: '#38bdf8',
                    background: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                    padding: '4px 8px',
                    borderRadius: 6
                  }}>
                    PASS ID: 8821-VIP
                  </span>
                </div>
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
