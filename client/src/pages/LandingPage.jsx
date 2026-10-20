import React, { useState } from 'react';
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
  Tv
} from 'lucide-react';

export default function LandingPage({ 
  webinar, 
  onPaymentSuccess 
}) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToPaymentSection = () => {
    const el = document.getElementById('registration-payment-section');
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

  // 8 Popular Categories matching the Skillify screenshot
  const categories = [
    { name: 'Design', icon: Palette, bg: '#eff6ff', color: '#2563eb' },
    { name: 'Business', icon: TrendingUp, bg: '#f5f3ff', color: '#7c3aed' },
    { name: 'Development', icon: Code, bg: '#f0fdf4', color: '#16a34a' },
    { name: 'Marketing', icon: Megaphone, bg: '#fff1f2', color: '#e11d48' },
    { name: 'Data Science', icon: BarChart2, bg: '#fefce8', color: '#ca8a04' },
    { name: 'Personal Dev', icon: User, bg: '#faf5ff', color: '#9333ea' },
    { name: 'Photography', icon: Camera, bg: '#fff7ed', color: '#ea580c' },
    { name: 'Health & Cloud', icon: Activity, bg: '#f0fdfa', color: '#0d9488' }
  ];

  // 4 Featured Courses / Masterclass Modules matching screenshot
  const featuredCourses = [
    {
      id: 1,
      title: 'UI/UX Design Fundamentals',
      desc: 'Learn to design beautiful, user-centered experiences from scratch.',
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=500&q=80',
      instructor: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      rating: 4.8,
      reviews: '12.4K',
      hours: '12 hours',
      level: 'Beginner',
      price: 499,
      originalPrice: 2999
    },
    {
      id: 2,
      title: 'Complete Autonomous Agent Bootcamp',
      desc: 'Go from zero to hero with multi-agent orchestration, tool calling & APIs.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=80',
      badge: 'Most Popular',
      instructor: 'Jamie Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      rating: 4.7,
      reviews: '28.1K',
      hours: '40 hours',
      level: 'All Levels',
      price: 499,
      originalPrice: 2999
    },
    {
      id: 3,
      title: 'Monetization & Invoicing Masterclass',
      desc: 'Connect Razorpay payments, automatic GST invoices, and WhatsApp automation.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
      instructor: 'Taylor Kim',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
      rating: 4.6,
      reviews: '9.7K',
      hours: '18 hours',
      level: 'Intermediate',
      price: 499,
      originalPrice: 2999
    },
    {
      id: 4,
      title: 'Python for Production AI & Agents',
      desc: 'Analyze architecture, build live models, and deploy production pipelines.',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80',
      instructor: 'Dr. Elena Vance',
      avatar: '/assets/female_presenter_blazer.jpg',
      rating: 4.8,
      reviews: '22.3K',
      hours: '25 hours',
      level: 'Intermediate',
      price: 499,
      originalPrice: 2999
    }
  ];

  // Why Learn With Skillify features
  const whyFeatures = [
    {
      icon: Users,
      title: 'Expert Instructors',
      desc: 'Learn from industry professionals and real-world experts.'
    },
    {
      icon: BookOpen,
      title: 'Flexible Learning',
      desc: 'Study at your own pace, on your own schedule.'
    },
    {
      icon: Award,
      title: 'Certificates',
      desc: 'Earn recognized certificates to showcase your skills.'
    },
    {
      icon: Briefcase,
      title: 'Career Support',
      desc: 'Get resources and guidance to achieve your goals.'
    }
  ];

  // What Our Students Say (Testimonials)
  const studentTestimonials = [
    {
      name: 'Priya S.',
      role: 'Product Designer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
      quote: 'Kaira gave me the confidence and skills to switch careers. The masterclasses are clear, practical and engaging!'
    },
    {
      name: 'James T.',
      role: 'Software Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      quote: 'The flexibility is amazing. I could learn at my own pace while working full-time. Highly recommend!'
    },
    {
      name: 'Maria L.',
      role: 'Marketing Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      quote: 'Great instructors, practical content and a supportive community. Kaira is the real deal!'
    }
  ];

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', overflowX: 'hidden' }}>
      
      {/* =========================================================================
          1. EDUMA HERO SECTION (Matching User Screenshot: Build Your Future With Eduma)
         ========================================================================= */}
      <section style={{ padding: '24px 0 40px', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 1240, padding: '0 24px' }}>
          
          {/* Main Eduma Banner Box with soft blue gradient backdrop */}
          <div style={{
            background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0fd 60%, #eaf2ff 100%)',
            borderRadius: 32,
            padding: '50px 60px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 4px 25px rgba(37, 99, 235, 0.05)',
            border: '1px solid #e0edfe'
          }}>
            
            {/* Background subtle decorative dots */}
            <div style={{
              position: 'absolute',
              top: 30,
              right: '44%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 4px)',
              gap: 5,
              opacity: 0.4
            }}>
              {[...Array(9)].map((_, i) => (
                <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#2563eb' }} />
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: 40,
              alignItems: 'center'
            }}>
              {/* Left Column: Pill, Headline, Subtitle & Buttons */}
              <div style={{ zIndex: 2 }}>
                
                {/* Pill Tag: - BEST ONLINE EDUCATION - */}
                <div style={{
                  color: '#2563eb',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <span style={{ height: 2, width: 14, background: '#2563eb', borderRadius: 1 }} />
                  <span>BEST ONLINE EDUCATION</span>
                  <span style={{ height: 2, width: 14, background: '#2563eb', borderRadius: 1 }} />
                </div>

                {/* Main Headline: Build Your Future With Kaira */}
                <h1 style={{
                  fontSize: 'clamp(38px, 4.4vw, 62px)',
                  fontWeight: 900,
                  lineHeight: 1.12,
                  letterSpacing: '-0.03em',
                  color: '#0f172a',
                  marginBottom: 20
                }}>
                  Build Your Future<br />
                  <span style={{ color: '#1d4ed8' }}>With Kaira</span>
                </h1>

                {/* Subtitle */}
                <p style={{
                  fontSize: 16,
                  color: '#475569',
                  lineHeight: 1.6,
                  maxWidth: 500,
                  marginBottom: 36
                }}>
                  Join thousands of learners worldwide and gain skills that shape your future with expert-led online courses and our live masterclass on <strong>November 4, 2026</strong>.
                </p>

                {/* Buttons: Explore Courses & Learn More */}
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                  <button
                    onClick={scrollToPaymentSection}
                    style={{
                      background: '#0a2540',
                      color: '#ffffff',
                      border: 'none',
                      padding: '16px 36px',
                      borderRadius: 12,
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      boxShadow: '0 4px 16px rgba(10, 37, 64, 0.25)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1e3a8a';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#0a2540';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>Explore Courses</span>
                  </button>

                  <button
                    onClick={scrollToPaymentSection}
                    style={{
                      background: '#ffffff',
                      color: '#0f172a',
                      border: '1px solid #cbd5e1',
                      padding: '15px 28px',
                      borderRadius: 12,
                      fontSize: 15,
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#cbd5e1';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>Learn More</span>
                    <div style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: '#0a2540',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11
                    }}>
                      ➔
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Column: Student Visual with Organic Blue Shape & Floating Badges */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                
                {/* Organic Rich Blue Backdrop Blob */}
                <div style={{
                  position: 'absolute',
                  width: 380,
                  height: 380,
                  borderRadius: '45% 55% 62% 38% / 48% 46% 54% 52%',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  zIndex: 1,
                  boxShadow: '0 16px 40px rgba(37, 99, 235, 0.25)'
                }} />

                {/* Student Photo */}
                <div style={{
                  position: 'relative',
                  zIndex: 2,
                  width: 330,
                  height: 380,
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center'
                }}>
                  <img 
                    src="/assets/eduma_hero_student.jpg" 
                    alt="Build Your Future With Kaira"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 24,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                </div>

                {/* Floating Badge 1: 20K+ Active Students (Left) */}
                <div style={{
                  position: 'absolute',
                  left: -20,
                  bottom: 50,
                  background: '#ffffff',
                  borderRadius: 16,
                  padding: '14px 18px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                  zIndex: 4,
                  border: '1px solid #f1f5f9',
                  minWidth: 150
                }}>
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563eb',
                    marginBottom: 6
                  }}>
                    <Users size={16} />
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
                    20K+
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 8 }}>
                    Active Students
                  </div>
                  
                  {/* Small Avatar Stack */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=40&q=80" alt="Student" style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #fff' }} />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=40&q=80" alt="Student" style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #fff', marginLeft: -6 }} />
                    <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=40&q=80" alt="Student" style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #fff', marginLeft: -6 }} />
                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=40&q=80" alt="Student" style={{ width: 22, height: 22, borderRadius: '50%', border: '2px solid #fff', marginLeft: -6 }} />
                  </div>
                </div>

                {/* Floating Badge 2: 95% Success Rate (Right Top) */}
                <div style={{
                  position: 'absolute',
                  right: -15,
                  top: 30,
                  background: '#ffffff',
                  borderRadius: 14,
                  padding: '12px 16px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                  zIndex: 4,
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: '#fff7ed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ea580c'
                  }}>
                    <Award size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
                      95%
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b' }}>
                      Success Rate
                    </div>
                  </div>
                </div>

                {/* Subtle Right Dots */}
                <div style={{
                  position: 'absolute',
                  right: -25,
                  bottom: 30,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 4px)',
                  gap: 5,
                  opacity: 0.4
                }}>
                  {[...Array(9)].map((_, i) => (
                    <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: '#ea580c' }} />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. POPULAR CATEGORIES (8 Soft Pastel Cards matching screenshot)
         ========================================================================= */}
      <section id="categories-section" style={{ padding: '40px 0 60px', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 1240, padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 6 }}>
                Popular Categories
              </h2>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
                Explore in-demand skills and find the right course for your goals.
              </p>
            </div>
            <a href="#curriculum-section" style={{ color: '#2563eb', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              View All Categories →
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: 16
          }}>
            {categories.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div 
                  key={idx}
                  style={{
                    background: c.bg,
                    borderRadius: 14,
                    padding: '24px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    border: '1px solid rgba(0,0,0,0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                    color: c.color,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                  }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                    {c.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED COURSES / MASTERCLASS MODULES (Matching screenshot 4-card grid)
         ========================================================================= */}
      <section id="curriculum-section" style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 1240, padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 6 }}>
                Featured Courses
              </h2>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
                Handpicked courses from top instructors to help you build real skills.
              </p>
            </div>
            <a href="#registration-payment-section" style={{ color: '#2563eb', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              View All Courses →
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24
          }}>
            {featuredCourses.map(course => (
              <div 
                key={course.id}
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  border: '1px solid #f1f5f9',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.04)';
                }}
              >
                {/* Course Image & Badge */}
                <div style={{ position: 'relative', height: 170, overflow: 'hidden' }}>
                  <img 
                    src={course.image} 
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {course.badge && (
                    <span style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: '#1e293b',
                      color: '#ffffff',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 6
                    }}>
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Course Details */}
                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginBottom: 8, lineHeight: 1.3 }}>
                      {course.title}
                    </h3>
                    <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, marginBottom: 16 }}>
                      {course.desc}
                    </p>

                    {/* Instructor & Rating */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <img 
                          src={course.avatar} 
                          alt={course.instructor}
                          style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{course.instructor}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#0f172a' }}>
                        <Star size={14} fill="#eab308" color="#eab308" />
                        <span>{course.rating}</span>
                        <span style={{ color: '#94a3b8', fontWeight: 500 }}>({course.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Meta Strip: Duration, Level & Price */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: 14,
                    fontSize: 12,
                    color: '#64748b'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={13} />
                      <span>{course.hours}</span>
                    </div>

                    <div>
                      <span>{course.level}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>₹{course.price}</span>
                      <span style={{ fontSize: 12, textDecoration: 'line-through', color: '#94a3b8' }}>₹{course.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY LEARN WITH SKILLIFY? (4 Clean Round Features matching screenshot)
         ========================================================================= */}
      <section id="why-learn-section" style={{ padding: '60px 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: 1240, padding: '0 24px' }}>
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Why Learn with Kaira?
            </h2>
            <p style={{ color: '#64748b', fontSize: 15, margin: 0 }}>
              We're more than courses — we're your partner in lifelong learning.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 28
          }}>
            {whyFeatures.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} style={{ textAlign: 'left' }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563eb',
                    marginBottom: 18,
                    border: '1px solid #dbeafe'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
                    {f.title}
                  </h4>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. WHAT OUR STUDENTS SAY (Testimonials matching screenshot)
         ========================================================================= */}
      <section style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: 1240, padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', marginBottom: 6 }}>
                What Our Students Say
              </h2>
              <p style={{ color: '#64748b', fontSize: 14, margin: 0 }}>
                Join thousands of learners who are changing their lives with Kaira.
              </p>
            </div>
            <a href="#registration-payment-section" style={{ color: '#2563eb', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              View All Testimonials →
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24
          }}>
            {studentTestimonials.map((t, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  borderRadius: 16,
                  border: '1px solid #f1f5f9',
                  padding: 28,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start'
                }}
              >
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                <div>
                  <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, marginBottom: 12 }}>
                    "{t.quote}"
                  </p>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#94a3b8' }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. STAY IN THE LOOP (Vibrant Blue Newsletter Banner matching screenshot)
         ========================================================================= */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container" style={{ maxWidth: 1240, padding: '0 24px' }}>
          <div style={{
            background: '#2563eb',
            borderRadius: 20,
            padding: '44px 48px',
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 28,
            boxShadow: '0 12px 30px rgba(37, 99, 235, 0.25)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Left Content */}
            <div style={{ maxWidth: 520, zIndex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', opacity: 0.9, marginBottom: 8 }}>
                STAY IN THE LOOP
              </div>
              <h3 style={{ fontSize: 26, fontWeight: 800, color: '#ffffff', marginBottom: 8, lineHeight: 1.2 }}>
                Get the latest courses, tips and exclusive offers.
              </h3>
              <p style={{ fontSize: 14, color: '#bfdbfe', margin: 0 }}>
                Join our community of lifelong learners and get notified before the November 4, 2026 class.
              </p>
            </div>

            {/* Email Form & Paper Plane Sticker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap', zIndex: 1 }}>
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 8, background: '#ffffff', padding: 6, borderRadius: 10, width: '100%', maxWidth: 420 }}>
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  style={{
                    border: 'none',
                    outline: 'none',
                    padding: '10px 14px',
                    fontSize: 14,
                    color: '#0f172a',
                    flex: 1,
                    background: 'transparent'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#1d4ed8',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </form>

              {/* Decorative handwritten plane text matching screenshot */}
              <div style={{ color: '#93c5fd', fontFamily: 'cursive, sans-serif', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Send size={18} />
                <span>Learn Grow Belong</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. REGISTRATION & PAYMENT SECTION (Near Bottom of Page)
         ========================================================================= */}
      <section style={{ padding: '20px 0 60px' }}>
        <RegistrationForm 
          webinar={webinar}
          onPaymentSuccess={onPaymentSuccess}
        />
      </section>

      {/* =========================================================================
          8. CLEAN BRAND FOOTER (Matching Skillify Screenshot)
         ========================================================================= */}
      <footer style={{
        background: '#ffffff',
        borderTop: '1px solid #f1f5f9',
        padding: '60px 0 30px',
        color: '#64748b',
        fontSize: 13
      }}>
        <div className="container" style={{ maxWidth: 1240, padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr repeat(3, 1fr) 1fr',
            gap: 40,
            marginBottom: 48
          }}>
            {/* Col 1: Brand Logo & Tagline */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Kaira<span style={{ color: '#2563eb' }}>.</span></span>
              </div>
              <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, maxWidth: 240 }}>
                Build your future with Kaira. Masterclass on November 4, 2026.
              </p>
            </div>

            {/* Col 2: Products */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Products</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="#curriculum-section" style={{ color: '#64748b', textDecoration: 'none' }}>All Courses</a>
                <a href="#why-learn-section" style={{ color: '#64748b', textDecoration: 'none' }}>Certificates</a>
                <a href="#registration-payment-section" style={{ color: '#64748b', textDecoration: 'none' }}>For Business</a>
                <a href="#registration-payment-section" style={{ color: '#64748b', textDecoration: 'none' }}>Gift Cards</a>
              </div>
            </div>

            {/* Col 3: Resources */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Resources</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Blog</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Learning Guides</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Help Center</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Contact Us</a>
              </div>
            </div>

            {/* Col 4: Company */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Company</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>About Us</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Careers</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Press</a>
                <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Affiliates</a>
              </div>
            </div>

            {/* Col 5: Follow Us & Social Icons */}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Follow Us</div>
              <div style={{ display: 'flex', gap: 12, color: '#0f172a' }}>
                <Linkedin size={18} style={{ cursor: 'pointer' }} />
                <Twitter size={18} style={{ cursor: 'pointer' }} />
                <Instagram size={18} style={{ cursor: 'pointer' }} />
                <Youtube size={18} style={{ cursor: 'pointer' }} />
                <Facebook size={18} style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Terms, Privacy, Language */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid #f1f5f9',
            paddingTop: 24,
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div>
              © 2026 Kaira. All rights reserved.
            </div>

            <div style={{ display: 'flex', gap: 20 }}>
              <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Terms</a>
              <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: '#64748b', textDecoration: 'none' }}>Cookies</a>
              <span style={{ color: '#0f172a', fontWeight: 600 }}>🌐 English ▾</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
