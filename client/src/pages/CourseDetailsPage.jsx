import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Check, 
  Star, 
  Clock, 
  Globe, 
  Award, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Lock, 
  Unlock, 
  ArrowRight, 
  ShieldCheck, 
  Users, 
  Tv, 
  Smartphone, 
  Share2,
  Sparkles
} from 'lucide-react';
import { api } from '../services/api.js';

export default function CourseDetailsPage({ 
  courseId, 
  onBack, 
  onEnrollNow, 
  onStartLearning, 
  user 
}) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedModules, setExpandedModules] = useState({ 0: true, 1: true });
  const [previewVideoPlaying, setPreviewVideoPlaying] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await api.getCourse(courseId, token);
        if (res.success) {
          setCourse(res.course);
        }
      } catch (e) {
        console.error('Error fetching course:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [courseId]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 50,
          height: 50,
          border: '4px solid #e2e8f0',
          borderTopColor: '#4f46e5',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h3>Course not found</h3>
        <button
          onClick={onBack}
          style={{
            marginTop: 16,
            background: '#4f46e5',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 8,
            cursor: 'pointer'
          }}
        >
          Return to Courses
        </button>
      </div>
    );
  }

  const toggleModule = (idx) => {
    setExpandedModules(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalLessons = (course.modules || []).reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  const isEnrolled = course.isEnrolled;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 80 }}>
      {/* 1. Dark Navy Top Hero Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
        color: '#ffffff',
        padding: '50px 0 60px',
        borderBottom: '1px solid #1e293b'
      }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 40, alignItems: 'flex-start' }} className="hero-grid">
            {/* Left Content */}
            <div>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94a3b8', marginBottom: 14 }}>
                <span onClick={onBack} style={{ cursor: 'pointer', color: '#c7d2fe' }}>Home</span>
                <span>/</span>
                <span onClick={onBack} style={{ cursor: 'pointer', color: '#c7d2fe' }}>Courses</span>
                <span>/</span>
                <span style={{ color: '#ffffff', fontWeight: 600 }}>{course.category}</span>
              </div>

              {/* Title & Subtitle */}
              <h1 style={{
                fontSize: 'clamp(26px, 3.2vw, 38px)',
                fontWeight: 800,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                marginBottom: 12
              }}>
                {course.title}
              </h1>

              <p style={{ fontSize: 16, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20, maxWidth: 740 }}>
                {course.subtitle || course.description}
              </p>

              {/* Meta stats */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 14 }}>
                <span className="badge-bestseller">{course.badge || 'Bestseller'}</span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#facc15' }}>
                  <span style={{ fontWeight: 800, color: '#ffffff' }}>{course.rating || 4.9}</span>
                  <div style={{ display: 'flex' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#facc15" color="#facc15" />
                    ))}
                  </div>
                  <span style={{ color: '#94a3b8', textDecoration: 'underline' }}>
                    ({(course.reviewsCount || 1240).toLocaleString()} ratings)
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#e2e8f0' }}>
                  <Users size={16} color="#94a3b8" />
                  <span>{(course.studentsCount || 14200).toLocaleString()} students</span>
                </div>
              </div>

              {/* Instructor line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, fontSize: 14, color: '#cbd5e1' }}>
                <span>Created by <strong style={{ color: '#ffffff' }}>{course.instructor?.name || 'Industry Mentor'}</strong></span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Globe size={15} /> {course.language || 'English'}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={15} /> Last updated October 2026
                </span>
              </div>
            </div>

            {/* Right Placeholder to align with sticky card */}
            <div style={{ height: 20 }} />
          </div>
        </div>
      </div>

      {/* 2. Main Content & Sticky Purchase Card Container */}
      <div className="container" style={{ maxWidth: 1240, margin: '-30px auto 0', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: 40, alignItems: 'flex-start' }} className="hero-grid">
          {/* LEFT COLUMN: WHAT YOU LEARN, CURRICULUM, INSTRUCTOR, REVIEWS */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            {/* What you'll learn */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: 24,
              marginBottom: 36
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={20} color="#4f46e5" />
                <span>What you'll learn</span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {(course.whatYouWillLearn || [
                  'Build production-grade systems from scratch',
                  'Master enterprise best practices and design patterns',
                  'Deploy and monitor in real-world environments',
                  'Earn an accredited and verifiable completion certificate'
                ]).map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: '#334155', lineHeight: 1.5 }}>
                    <Check size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Curriculum Accordion */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Course Content</h3>
                  <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
                    {(course.modules || []).length} sections • {totalLessons} lectures • {course.durationHours || 20}h total length
                  </p>
                </div>
                <button
                  onClick={() => {
                    const allOpen = Object.keys(expandedModules).length === (course.modules || []).length;
                    const next = {};
                    (course.modules || []).forEach((_, idx) => { next[idx] = !allOpen; });
                    setExpandedModules(next);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#4f46e5',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Expand all sections
                </button>
              </div>

              {/* Modules List */}
              <div style={{ border: '1px solid #e2e8f0', borderRadius: 14, overflow: 'hidden' }}>
                {(course.modules || []).map((module, mIdx) => {
                  const isOpen = expandedModules[mIdx] ?? false;
                  return (
                    <div key={module._id || mIdx} style={{ borderBottom: mIdx < (course.modules.length - 1) ? '1px solid #e2e8f0' : 'none' }}>
                      <div
                        onClick={() => toggleModule(mIdx)}
                        style={{
                          background: '#f8fafc',
                          padding: '16px 20px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          {isOpen ? <ChevronUp size={18} color="#475569" /> : <ChevronDown size={18} color="#475569" />}
                          <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>
                            {module.title}
                          </span>
                        </div>
                        <span style={{ fontSize: 13, color: '#64748b' }}>
                          {(module.lessons || []).length} lectures
                        </span>
                      </div>

                      {isOpen && (
                        <div style={{ background: '#ffffff', padding: '6px 0' }}>
                          {(module.lessons || []).map((lesson, lIdx) => (
                            <div
                              key={lesson._id || lIdx}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 24px',
                                borderBottom: lIdx < (module.lessons.length - 1) ? '1px solid #f1f5f9' : 'none',
                                fontSize: 14
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                {isEnrolled || lesson.isFreePreview ? (
                                  <Play size={15} color="#4f46e5" fill="#4f46e5" />
                                ) : (
                                  <Lock size={15} color="#94a3b8" />
                                )}
                                <span style={{ color: '#334155', fontWeight: 500 }}>
                                  {lesson.title}
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                {lesson.isFreePreview && (
                                  <span style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: '#4f46e5',
                                    background: '#e0e7ff',
                                    padding: '2px 8px',
                                    borderRadius: 4
                                  }}>
                                    Preview
                                  </span>
                                )}
                                <span style={{ fontSize: 12, color: '#94a3b8' }}>
                                  {lesson.duration || '15 min'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Requirements & Description */}
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Requirements</h3>
              <ul style={{ paddingLeft: 20, color: '#475569', fontSize: 14, lineHeight: 1.8 }}>
                {(course.requirements || [
                  'Basic familiarity with web development concepts',
                  'A computer with modern web browser and internet connection'
                ]).map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            {/* Instructor Profile Card */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: 16,
              padding: 24,
              marginBottom: 36
            }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Instructor</h3>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <img
                  src={course.instructor?.avatar || '/assets/female_presenter_blazer.jpg'}
                  alt={course.instructor?.name}
                  style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                    {course.instructor?.name || 'Dr. Elena Vance'}
                  </h4>
                  <p style={{ fontSize: 13, color: '#4f46e5', fontWeight: 600, marginTop: 2 }}>
                    {course.instructor?.title || 'Principal Systems Architect'}
                  </p>
                  <p style={{ fontSize: 13, color: '#64748b', marginTop: 8, lineHeight: 1.6 }}>
                    {course.instructor?.bio || 'Over 12 years of enterprise engineering experience training thousands of developers worldwide.'}
                  </p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>Frequently Asked Questions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {(course.faqs || [
                  { question: 'When does the course begin and end?', answer: 'The course starts now and never ends! It is a completely self-paced online course.' },
                  { question: 'What if I am unhappy with the course?', answer: 'We offer a 30-day money-back guarantee with zero questions asked.' },
                  { question: 'Do I receive a certificate?', answer: 'Yes! Upon completing 100% of the lessons, your verifiable certificate is issued immediately.' }
                ]).map((faq, i) => (
                  <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 16, background: '#ffffff' }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{faq.question}</p>
                    <p style={{ fontSize: 13, color: '#475569', marginTop: 6, lineHeight: 1.5 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: STICKY FLOATING PURCHASE CARD */}
          <div style={{
            position: 'sticky',
            top: 94,
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
            zIndex: 20
          }}>
            {/* Video Preview Box */}
            <div style={{ position: 'relative', width: '100%', height: 210, background: '#020617' }}>
              {previewVideoPlaying ? (
                <video
                  src={course.previewVideoUrl || '/videos/gemini_generated_video_323b2790.mp4'}
                  controls
                  autoPlay
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div 
                  onClick={() => setPreviewVideoPlaying(true)}
                  style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer' }}
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.4)'
                  }}>
                    <div style={{
                      width: 58,
                      height: 58,
                      borderRadius: '50%',
                      background: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
                    }}>
                      <Play size={24} fill="#4f46e5" color="#4f46e5" style={{ marginLeft: 3 }} />
                    </div>
                    <span style={{ color: '#ffffff', fontSize: 13, fontWeight: 700, marginTop: 10, textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>
                      Preview this course
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Price & Purchase Actions */}
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#0f172a' }}>
                  ₹{course.price || 499}
                </span>
                <span style={{ fontSize: 16, color: '#94a3b8', textDecoration: 'line-through' }}>
                  ₹{course.originalPrice || 2999}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#16a34a' }}>
                  83% off
                </span>
              </div>

              {/* Action Buttons */}
              {isEnrolled ? (
                <button
                  onClick={() => onStartLearning(course._id)}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '16px',
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: '0 4px 16px rgba(22, 163, 74, 0.4)'
                  }}
                >
                  <BookOpen size={18} />
                  <span>Continue Learning</span>
                </button>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button
                    onClick={() => onEnrollNow(course)}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '16px',
                      borderRadius: 12,
                      fontWeight: 800,
                      fontSize: 16,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      boxShadow: '0 6px 20px rgba(79, 70, 229, 0.45)',
                      transition: 'transform 0.15s'
                    }}
                  >
                    <span>Enroll Now (₹{course.price || 499})</span>
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() => onEnrollNow(course)}
                    style={{
                      width: '100%',
                      background: '#f8fafc',
                      color: '#334155',
                      border: '1px solid #cbd5e1',
                      padding: '13px',
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: 14,
                      cursor: 'pointer'
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              )}

              <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', margin: '14px 0 18px' }}>
                30-Day Money-Back Guarantee
              </p>

              {/* Course Features Checklist */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', display: 'block', marginBottom: 10 }}>
                  This course includes:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: '#475569' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Tv size={16} color="#6366f1" />
                    <span>{course.durationHours || 20} hours on-demand video</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <BookOpen size={16} color="#6366f1" />
                    <span>{totalLessons} downloadable source blueprints</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Smartphone size={16} color="#6366f1" />
                    <span>Access on mobile, tablet & desktop</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Award size={16} color="#6366f1" />
                    <span>Certificate of completion</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <ShieldCheck size={16} color="#6366f1" />
                    <span>Full lifetime access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
