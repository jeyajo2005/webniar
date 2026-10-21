import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Award, 
  CreditCard, 
  User, 
  Play, 
  CheckCircle, 
  Clock, 
  Download, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  FileText,
  Printer
} from 'lucide-react';
import { api } from '../services/api.js';

export default function StudentDashboard({ 
  user, 
  onContinueCourse, 
  onExploreCourses, 
  onLogout 
}) {
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'payments' | 'certificates' | 'profile'
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Profile Form state
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileMsg, setProfileMsg] = useState('');

  useEffect(() => {
    const fetchEnrollments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await api.getMyEnrollments(token);
        if (res.success) {
          setEnrollments(res.enrollments || []);
        }
      } catch (err) {
        console.error('Failed to load student enrollments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await api.updateProfile({ name, phone, bio }, token);
      if (res.success) {
        setProfileMsg('Profile updated successfully!');
        const updatedUser = { ...user, name, phone, bio };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setTimeout(() => setProfileMsg(''), 3000);
      }
    } catch (e) {
      setProfileMsg('Failed to update profile.');
    }
  };

  const completedCount = enrollments.filter(e => e.progress?.percent === 100).length;
  const inProgressCount = enrollments.length - completedCount;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
        {/* 1. Student Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          borderRadius: 20,
          padding: 32,
          color: '#ffffff',
          boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.25)',
          marginBottom: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
              alt={user?.name}
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #6366f1' }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800 }}>Welcome, {user?.name || 'Learner'}!</h1>
                <span style={{ background: 'rgba(99, 102, 241, 0.25)', color: '#c7d2fe', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6 }}>
                  Verified Student
                </span>
              </div>
              <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>
                {user?.email} • Member since {new Date().getFullYear()}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '12px 20px', borderRadius: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#ffffff', display: 'block' }}>{enrollments.length}</span>
              <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Enrolled</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '12px 20px', borderRadius: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#38bdf8', display: 'block' }}>{inProgressCount}</span>
              <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>In Progress</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '12px 20px', borderRadius: 12, textAlign: 'center' }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#4ade80', display: 'block' }}>{completedCount}</span>
              <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Certificates</span>
            </div>
          </div>
        </div>

        {/* 2. Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: 12,
          borderBottom: '1px solid #e2e8f0',
          marginBottom: 32,
          overflowX: 'auto'
        }}>
          {[
            { id: 'courses', label: 'My Courses', icon: BookOpen },
            { id: 'payments', label: 'Payment History & Invoices', icon: CreditCard },
            { id: 'certificates', label: 'Certificates of Completion', icon: Award },
            { id: 'profile', label: 'Profile Settings', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#4f46e5' : '#64748b',
                  borderBottom: isActive ? '3px solid #4f46e5' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={18} color={isActive ? '#4f46e5' : '#94a3b8'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3. TAB 1: MY COURSES */}
        {activeTab === 'courses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
                Enrolled Courses ({enrollments.length})
              </h2>
              <button
                onClick={onExploreCourses}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#4f46e5',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>Browse All Courses</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {loading ? (
              <div style={{ padding: '60px 0', textAlign: 'center' }}>
                <div style={{ width: 40, height: 40, border: '3px solid #e2e8f0', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
                <p style={{ color: '#94a3b8', fontSize: 13 }}>Loading your courses...</p>
              </div>
            ) : enrollments.length === 0 ? (
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 16,
                padding: '60px 20px',
                textAlign: 'center'
              }}>
                <BookOpen size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>You haven't enrolled in any courses yet</h3>
                <p style={{ fontSize: 14, color: '#64748b', margin: '8px auto 20px', maxWidth: 440 }}>
                  Explore top-rated online courses in AI, Full-Stack development, and cloud computing.
                </p>
                <button
                  onClick={onExploreCourses}
                  style={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: 10,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Explore Courses
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                {enrollments.map((enr) => {
                  const percent = enr.progress?.percent || 0;
                  const course = enr.course || {};

                  return (
                    <div
                      key={enr._id}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: 16,
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <img
                        src={course.thumbnail || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'}
                        alt={course.title}
                        style={{ width: '100%', height: 160, objectFit: 'cover' }}
                      />
                      <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase' }}>
                          {course.category || 'Tech'}
                        </span>
                        <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', lineHeight: 1.3, marginTop: 4 }}>
                          {course.title || 'Course'}
                        </h4>
                        <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                          By {course.instructor?.name || 'Dr. Elena Vance'}
                        </p>

                        {/* Progress Bar */}
                        <div style={{ marginTop: 'auto', paddingTop: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
                            <span style={{ color: '#64748b' }}>Course Progress</span>
                            <span style={{ color: percent === 100 ? '#16a34a' : '#4f46e5' }}>{percent}%</span>
                          </div>
                          <div style={{ width: '100%', height: 6, background: '#f1f5f9', borderRadius: 9999, overflow: 'hidden' }}>
                            <div style={{
                              height: '100%',
                              width: `${percent}%`,
                              background: percent === 100 ? '#22c55e' : 'linear-gradient(90deg, #4f46e5 0%, #38bdf8 100%)',
                              borderRadius: 9999
                            }} />
                          </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                          <button
                            onClick={() => onContinueCourse(enr.courseId)}
                            style={{
                              flex: 1,
                              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                              color: '#ffffff',
                              border: 'none',
                              padding: '10px',
                              borderRadius: 8,
                              fontSize: 13,
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6
                            }}
                          >
                            <Play size={14} fill="#ffffff" />
                            <span>Continue Learning</span>
                          </button>

                          {percent === 100 && (
                            <button
                              onClick={() => setSelectedCertificate(enr)}
                              style={{
                                background: '#fef3c7',
                                color: '#92400e',
                                border: '1px solid #fde68a',
                                padding: '10px 14px',
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6
                              }}
                              title="View Certificate"
                            >
                              <Award size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 4. TAB 2: PAYMENT HISTORY & INVOICES */}
        {activeTab === 'payments' && (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 24, boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              Payment & Enrollment History
            </h2>

            {enrollments.length === 0 ? (
              <p style={{ color: '#64748b', fontSize: 14 }}>No payment transactions found.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 700 }}>Course</th>
                      <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 700 }}>Invoice #</th>
                      <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 700 }}>Date</th>
                      <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 700 }}>Amount</th>
                      <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 700 }}>Status</th>
                      <th style={{ padding: '12px 16px', color: '#64748b', fontWeight: 700, textAlign: 'right' }}>Tax Receipt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((enr) => (
                      <tr key={enr._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                          {enr.course?.title || 'Online Course'}
                        </td>
                        <td style={{ padding: '14px 16px', fontFamily: 'monospace', color: '#4f46e5', fontWeight: 600 }}>
                          {enr.invoiceNumber || 'INV-2026-0042'}
                        </td>
                        <td style={{ padding: '14px 16px', color: '#64748b' }}>
                          {new Date(enr.enrolledAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0f172a' }}>
                          ₹{enr.amountPaid || 499}
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            background: '#dcfce7',
                            color: '#166534',
                            fontSize: 11,
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: 4
                          }}>
                            PAID
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <button
                            onClick={() => window.open(`http://localhost:5000/api/invoices/${enr.invoiceNumber || 'INV-2026-0001'}/pdf`, '_blank')}
                            style={{
                              background: '#f1f5f9',
                              border: '1px solid #cbd5e1',
                              padding: '6px 12px',
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6
                            }}
                          >
                            <Download size={14} />
                            <span>Download PDF</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 5. TAB 3: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
              Earned Certifications
            </h2>
            {completedCount === 0 ? (
              <div style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 16,
                padding: '60px 20px',
                textAlign: 'center'
              }}>
                <Award size={48} color="#cbd5e1" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>No Certificates Earned Yet</h3>
                <p style={{ fontSize: 14, color: '#64748b', margin: '8px auto 20px', maxWidth: 440 }}>
                  Complete 100% of the lessons in any enrolled course to unlock your official verified certificate of completion.
                </p>
                <button
                  onClick={() => setActiveTab('courses')}
                  style={{
                    background: '#4f46e5',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Continue Learning
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 24 }}>
                {enrollments.filter(e => e.progress?.percent === 100).map((enr) => (
                  <div
                    key={enr._id}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: 16,
                      padding: 24,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                      <div style={{
                        width: 44,
                        height: 44,
                        background: '#fef3c7',
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Award size={24} color="#d97706" />
                      </div>
                      <div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: '#d97706', textTransform: 'uppercase' }}>
                          Verified Certificate
                        </span>
                        <h4 style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>
                          {enr.course?.title}
                        </h4>
                      </div>
                    </div>
                    <p style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
                      Certificate ID: {enr.certificate?.certificateId || 'CERT-LIVE-2026'}
                    </p>
                    <button
                      onClick={() => setSelectedCertificate(enr)}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '10px',
                        borderRadius: 8,
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8
                      }}
                    >
                      <Award size={16} />
                      <span>View & Print Official Certificate</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 6. TAB 4: PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, maxWidth: 600, boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 20 }}>
              Profile Settings
            </h2>

            {profileMsg && (
              <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', color: '#166534', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
                {profileMsg}
              </div>
            )}

            <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#f8fafc', color: '#94a3b8', fontSize: 14 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Bio / Learning Goals
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: 8,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  marginTop: 8
                }}
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 7. VERIFIED CERTIFICATE MODAL */}
      {selectedCertificate && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div style={{
            background: '#ffffff',
            maxWidth: 720,
            width: '100%',
            borderRadius: 20,
            padding: 36,
            position: 'relative'
          }} className="certificate-container">
            <button
              onClick={() => setSelectedCertificate(null)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: '#f1f5f9',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                cursor: 'pointer',
                fontWeight: 800
              }}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#fef3c7',
                padding: '6px 14px',
                borderRadius: 9999,
                color: '#92400e',
                fontSize: 12,
                fontWeight: 800,
                marginBottom: 16
              }}>
                <Award size={16} />
                <span>OFFICIAL VERIFIED CERTIFICATION</span>
              </div>

              <h2 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em' }}>
                Certificate of Completion
              </h2>
              <p style={{ fontSize: 14, color: '#64748b', marginTop: 6 }}>
                This is proudly presented to
              </p>

              <h3 style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#4f46e5',
                margin: '16px 0',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: 12,
                display: 'inline-block'
              }}>
                {user?.name || 'Arun Kumar'}
              </h3>

              <p style={{ fontSize: 14, color: '#475569', maxWidth: 500, margin: '0 auto 24px', lineHeight: 1.6 }}>
                For successfully fulfilling all curriculum requirements and passing practical hands-on assessments in
              </p>

              <h4 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 24 }}>
                {selectedCertificate.course?.title || 'Advanced Masterclass'}
              </h4>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: '1px solid #e2e8f0',
                paddingTop: 20,
                fontSize: 12,
                color: '#64748b'
              }}>
                <div>
                  <p style={{ fontWeight: 700, color: '#0f172a' }}>Dr. Elena Vance</p>
                  <p>Chief Instructor & Course Director</p>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#0f172a' }}>LearnFlow Verification Engine</p>
                  <p>ID: {selectedCertificate.certificate?.certificateId || 'CERT-LIVE-2026'}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}>
                <button
                  onClick={() => window.print()}
                  style={{
                    background: '#0f172a',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <Printer size={16} />
                  <span>Print Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
