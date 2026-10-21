import React, { useState, useEffect } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Send, 
  Search, 
  Download, 
  Crown, 
  CheckCircle, 
  Bell, 
  CreditCard,
  MessageSquare,
  RefreshCw,
  Sparkles,
  Settings,
  FileText,
  Lock,
  Eye,
  Tv,
  Calendar,
  Clock,
  Link,
  Save,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  BookOpen,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { api } from '../services/api.js';

export default function AdminDashboard({ onNavigate, onWebinarUpdated }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem('admin_auth') === 'true'
  );
  const [adminToken, setAdminToken] = useState('webinar_secret_admin_token_2026');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'webinar' | 'registrations' | 'invoices' | 'logs'
  const [stats, setStats] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [messages, setMessages] = useState([]);
  const [webinarConfig, setWebinarConfig] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);
  const [broadcasting, setBroadcasting] = useState(false);
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [resendingId, setResendingId] = useState(null);

  // Courses Management State
  const [coursesList, setCoursesList] = useState([]);
  const [enrollmentsList, setEnrollmentsList] = useState([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'AI & Agents',
    price: 499,
    originalPrice: 2999,
    durationHours: 20,
    instructorName: 'Dr. Elena Vance',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: ''
  });

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminStats();
      if (data.success) {
        setStats(data.stats);
        setRegistrations(data.registrations || []);
        setPayments(data.payments || []);
        setInvoices(data.invoices || []);
        setMessages(data.messages || []);
        if (data.webinar) {
          setWebinarConfig(data.webinar);
        }
      }

      // Fetch courses & course enrollments
      const coursesRes = await api.getCourses({});
      if (coursesRes.success) {
        setCoursesList(coursesRes.courses || []);
      }

      const enrRes = await api.getAllEnrollmentsAdmin(adminToken);
      if (enrRes.success) {
        setEnrollmentsList(enrRes.enrollments || []);
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.createCourseAdmin({
        title: newCourse.title,
        category: newCourse.category,
        price: Number(newCourse.price),
        originalPrice: Number(newCourse.originalPrice),
        durationHours: Number(newCourse.durationHours),
        thumbnail: newCourse.thumbnail,
        description: newCourse.description,
        instructor: {
          name: newCourse.instructorName,
          title: 'Senior Instructor',
          avatar: '/assets/female_presenter_blazer.jpg'
        },
        modules: [
          {
            title: 'Module 1: Core Fundamentals & Practical Setup',
            lessons: [
              {
                title: '01. Architecture Overview & Introduction',
                duration: '15 min',
                videoUrl: '/videos/gemini_generated_video_323b2790.mp4',
                isFreePreview: true
              }
            ]
          }
        ]
      }, adminToken);

      if (res.success) {
        setShowCourseModal(false);
        setNewCourse({
          title: '',
          category: 'AI & Agents',
          price: 499,
          originalPrice: 2999,
          durationHours: 20,
          instructorName: 'Dr. Elena Vance',
          thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
          description: ''
        });
        loadDashboardData();
        setSaveSuccessMsg('New course published to catalog successfully!');
        setTimeout(() => setSaveSuccessMsg(''), 4000);
      }
    } catch (err) {
      alert('Failed to create course: ' + err.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      const res = await api.deleteCourseAdmin(id, adminToken);
      if (res.success) {
        loadDashboardData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (adminToken === 'webinar_secret_admin_token_2026' || adminToken === 'admin2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid admin token. Default key is: webinar_secret_admin_token_2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  const handleBroadcast = async (countdown) => {
    setBroadcasting(true);
    setBroadcastMsg('');
    try {
      const res = await api.broadcastReminders(countdown, adminToken);
      setBroadcastMsg(res.message || `Broadcast alerts dispatched successfully for ${countdown}!`);
      loadDashboardData();
    } catch (err) {
      setBroadcastMsg('Failed to dispatch broadcast.');
    } finally {
      setBroadcasting(false);
    }
  };

  const handleSaveWebinarConfig = async (e) => {
    e.preventDefault();
    setSaveSuccessMsg('');
    try {
      const res = await api.updateWebinar(webinarConfig?._id, webinarConfig, adminToken);
      if (res.success) {
        setSaveSuccessMsg('Webinar configuration saved! Changes are live on the website.');
        if (onWebinarUpdated) onWebinarUpdated(res.webinar || webinarConfig);
        setTimeout(() => setSaveSuccessMsg(''), 4000);
      }
    } catch (err) {
      alert('Failed to save settings: ' + err.message);
    }
  };

  const handleResendNotification = async (registrationId) => {
    setResendingId(registrationId);
    try {
      const res = await api.resendNotification(registrationId, 'all', adminToken);
      alert(res.message || 'Notification resent successfully via Email and WhatsApp.');
      loadDashboardData();
    } catch (err) {
      alert('Error resending: ' + err.message);
    } finally {
      setResendingId(null);
    }
  };

  const handleDownloadCSV = () => {
    window.open('http://localhost:5000/api/admin/export-csv', '_blank');
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter(r => {
    const matchSearch = (r.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (r.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (r.phone || '').includes(searchQuery) ||
                        (r._id || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filterType === 'all' || 
                        (filterType === 'paid' && r.paymentStatus === 'completed') ||
                        (filterType === 'pending' && r.paymentStatus !== 'completed');
    return matchSearch && matchFilter;
  });

  // Admin Login Screen
  if (!isAuthenticated) {
    return (
      <div style={{ padding: '80px 20px', maxWidth: 440, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          background: '#ffffff',
          borderRadius: 24,
          border: '1px solid #e2e8f0',
          padding: '40px 32px',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#ffffff'
          }}>
            <Lock size={26} />
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
            Admin Command Center
          </h2>
          <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>
            Enter your organizer security passkey to access registrations, payments, and webinar settings.
          </p>

          {authError && (
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#b91c1c',
              padding: '10px 14px',
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 16
            }}>
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              placeholder="Admin API Token"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid #cbd5e1',
                fontSize: 14,
                marginBottom: 20,
                outline: 'none'
              }}
            />

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '14px', borderRadius: 10, fontSize: 15 }}
            >
              <span>Unlock Admin Panel</span>
            </button>
          </form>

          <div style={{ marginTop: 20, fontSize: 12, color: '#94a3b8' }}>
            Default Demo Key: <code>webinar_secret_admin_token_2026</code>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: 1160 }}>
        
        {/* TOP BAR */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span className="badge-tag" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                <Sparkles size={14} /> Organizer Command Center
              </span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Class Scheduled: November 4, 2026</span>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#0f172a' }}>Webinar Automation Dashboard</h1>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button
              onClick={loadDashboardData}
              className="btn-secondary"
              style={{ fontSize: 13, padding: '8px 16px', borderRadius: 8 }}
            >
              <RefreshCw size={14} /> Refresh
            </button>

            <button
              onClick={() => onNavigate('landing')}
              className="btn-primary"
              style={{ fontSize: 13, padding: '8px 18px', borderRadius: 8 }}
            >
              View Public Website
            </button>

            <button
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: '1px solid #e2e8f0',
                color: '#64748b',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* 4 TOP METRIC CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
          marginBottom: 32
        }}>
          {/* Total Registered */}
          <div className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>Total Registered</span>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366f1' }}>
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#0f172a' }}>
              {stats?.totalRegistrations || registrations.length}
            </div>
            <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4, fontWeight: 600 }}>
              Class Date: November 4, 2026
            </div>
          </div>

          {/* Revenue */}
          <div className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>Total Revenue Collected</span>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                <DollarSign size={18} />
              </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#0f172a' }}>
              ₹{(stats?.totalRevenue || (registrations.length * 499)).toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: 12, color: '#16a34a', marginTop: 4, fontWeight: 600 }}>
              Razorpay Verified & Captured
            </div>
          </div>

          {/* Invoices Generated */}
          <div className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>Invoices Generated</span>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                <FileText size={18} />
              </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#0f172a' }}>
              {invoices.length || registrations.length}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              18% GST Compliant PDFs
            </div>
          </div>

          {/* Messages Dispatched */}
          <div className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>Automated Alerts Sent</span>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fce7f3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777' }}>
                <Send size={18} />
              </div>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#0f172a' }}>
              {stats?.totalMessagesSent || (registrations.length * 2)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              Email & WhatsApp Delivery
            </div>
          </div>
        </div>

        {/* BROADCAST ALERT BAR */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 32, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h3 style={{ fontSize: 17, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8, color: '#0f172a' }}>
                <Bell size={18} color="#db2777" /> Automated Reminders & Live Class Broadcasts
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, margin: 0 }}>
                Trigger scheduled reminder blasts to all attendees for November 4, 2026 via WhatsApp & Email.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => handleBroadcast('24 Hours')}
                disabled={broadcasting}
                className="btn-secondary"
                style={{ fontSize: 13, padding: '8px 14px', borderRadius: 8 }}
              >
                Send 24h Reminder
              </button>
              <button
                onClick={() => handleBroadcast('1 Hour')}
                disabled={broadcasting}
                className="btn-secondary"
                style={{ fontSize: 13, padding: '8px 14px', borderRadius: 8 }}
              >
                Send 1h Warning
              </button>
              <button
                onClick={() => handleBroadcast('CLASS STARTED')}
                disabled={broadcasting}
                style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                🔴 Blast "Class Started Live" Alert
              </button>
            </div>
          </div>

          {broadcastMsg && (
            <div style={{ marginTop: 14, padding: '10px 14px', background: '#ecfdf5', color: '#065f46', borderRadius: 8, fontSize: 13 }}>
              {broadcastMsg}
            </div>
          )}
        </div>

        {/* NAVIGATION TABS */}
        <div style={{
          display: 'flex',
          gap: 8,
          borderBottom: '2px solid #e2e8f0',
          marginBottom: 28,
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'Registrations & Attendees', icon: Users },
            { id: 'courses', label: 'Courses & Curriculum', icon: BookOpen },
            { id: 'webinar', label: 'Webinar & Landing Page Settings', icon: Settings },
            { id: 'invoices', label: 'Invoices & Taxes', icon: FileText },
            { id: 'logs', label: 'Delivery Logs & Gateways', icon: MessageSquare }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #4f46e5' : '3px solid transparent',
                  padding: '12px 18px',
                  fontSize: 14,
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? '#4f46e5' : '#64748b',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: -2,
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: REGISTRATIONS & CSV EXPORT */}
        {activeTab === 'overview' && (
          <div className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
              {/* Search & Filter */}
              <div style={{ display: 'flex', gap: 12, flex: 1, maxWidth: 500 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search attendee by name, email, phone..."
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: 10,
                      border: '1px solid #cbd5e1',
                      fontSize: 13,
                      outline: 'none'
                    }}
                  />
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: 11 }} />
                </div>

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    fontSize: 13,
                    outline: 'none',
                    background: '#ffffff'
                  }}
                >
                  <option value="all">All Registrations</option>
                  <option value="paid">Paid & Verified</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Export to CSV Button */}
              <button
                onClick={handleDownloadCSV}
                className="btn-secondary"
                style={{ fontSize: 13, padding: '10px 18px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Download size={15} />
                <span>Export Registrations to CSV</span>
              </button>
            </div>

            {/* Registrations Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', textAlign: 'left' }}>
                    <th style={{ padding: 12 }}>Registration ID</th>
                    <th style={{ padding: 12 }}>Name</th>
                    <th style={{ padding: 12 }}>Email & Phone</th>
                    <th style={{ padding: 12 }}>Invoice #</th>
                    <th style={{ padding: 12 }}>Amount</th>
                    <th style={{ padding: 12 }}>Payment Status</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((r, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: 12, fontWeight: 600, color: '#0f172a' }}>
                        <code>{r._id}</code>
                      </td>
                      <td style={{ padding: 12, fontWeight: 700, color: '#0f172a' }}>
                        {r.name}
                      </td>
                      <td style={{ padding: 12 }}>
                        <div>{r.email}</div>
                        <div style={{ color: '#64748b', fontSize: 12 }}>{r.phone}</div>
                      </td>
                      <td style={{ padding: 12 }}>
                        <code>{r.invoiceNumber || 'INV-2026-0001'}</code>
                      </td>
                      <td style={{ padding: 12, fontWeight: 700, color: '#4f46e5' }}>
                        ₹{r.amountPaid || 499}
                      </td>
                      <td style={{ padding: 12 }}>
                        <span style={{
                          background: r.paymentStatus === 'completed' ? '#dcfce7' : '#fef3c7',
                          color: r.paymentStatus === 'completed' ? '#15803d' : '#b45309',
                          padding: '4px 10px',
                          borderRadius: 9999,
                          fontSize: 11,
                          fontWeight: 700
                        }}>
                          {r.paymentStatus === 'completed' ? '✓ PAID & VERIFIED' : 'PENDING'}
                        </span>
                      </td>
                      <td style={{ padding: 12, textAlign: 'center' }}>
                        <button
                          onClick={() => handleResendNotification(r._id)}
                          disabled={resendingId === r._id}
                          style={{
                            background: '#eff6ff',
                            border: '1px solid #bfdbfe',
                            color: '#1d4ed8',
                            padding: '6px 12px',
                            borderRadius: 6,
                            fontSize: 12,
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {resendingId === r._id ? 'Sending...' : 'Resend Alerts'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: WEBINAR & LANDING PAGE CONFIGURATION */}
        {activeTab === 'webinar' && webinarConfig && (
          <div className="glass-card" style={{ padding: 32, textAlign: 'left' }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>
              Webinar & Landing Page Settings
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
              Changes made here automatically update the landing page, video preview, dates, and payment prices.
            </p>

            {saveSuccessMsg && (
              <div style={{ background: '#dcfce7', border: '1px solid #bbf7d0', color: '#15803d', padding: '12px 16px', borderRadius: 10, fontSize: 14, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle2 size={18} />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleSaveWebinarConfig}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 20 }}>
                {/* Title */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Webinar Title
                  </label>
                  <input
                    type="text"
                    value={webinarConfig.title || ''}
                    onChange={(e) => setWebinarConfig({ ...webinarConfig, title: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={webinarConfig.subtitle || ''}
                    onChange={(e) => setWebinarConfig({ ...webinarConfig, subtitle: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>

                {/* Webinar Date */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Webinar Class Date (Must be November 4, 2026)
                  </label>
                  <input
                    type="text"
                    value={webinarConfig.date || 'November 4, 2026'}
                    onChange={(e) => setWebinarConfig({ ...webinarConfig, date: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>

                {/* Webinar Time & Timezone */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Webinar Time & Timezone
                  </label>
                  <input
                    type="text"
                    value={webinarConfig.time || '07:00 PM IST'}
                    onChange={(e) => setWebinarConfig({ ...webinarConfig, time: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>

                {/* Registration Fee */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Registration Fee (INR)
                  </label>
                  <input
                    type="number"
                    value={webinarConfig.vipPrice || 499}
                    onChange={(e) => setWebinarConfig({ ...webinarConfig, vipPrice: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>

                {/* Video Preview URL */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Promo Video Asset / Poster URL
                  </label>
                  <input
                    type="text"
                    value={webinarConfig.videoPreviewUrl || '/assets/female_presenter_blazer.jpg'}
                    onChange={(e) => setWebinarConfig({ ...webinarConfig, videoPreviewUrl: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>

                {/* Presenter Name */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Presenter Name
                  </label>
                  <input
                    type="text"
                    value={webinarConfig.speaker?.name || 'Dr. Elena Vance'}
                    onChange={(e) => setWebinarConfig({
                      ...webinarConfig,
                      speaker: { ...webinarConfig.speaker, name: e.target.value }
                    })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>

                {/* Presenter Avatar */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Presenter Photo URL (Blazer)
                  </label>
                  <input
                    type="text"
                    value={webinarConfig.speaker?.avatar || '/assets/female_presenter_blazer.jpg'}
                    onChange={(e) => setWebinarConfig({
                      ...webinarConfig,
                      speaker: { ...webinarConfig.speaker, avatar: e.target.value }
                    })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>

                {/* WhatsApp Community Link */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    WhatsApp Community Invitation URL
                  </label>
                  <input
                    type="text"
                    value={webinarConfig.whatsappCommunityUrl || 'https://chat.whatsapp.com/demoWebinarFlowVip2026'}
                    onChange={(e) => setWebinarConfig({ ...webinarConfig, whatsappCommunityUrl: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>

                {/* Private Webinar Joining Link */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Private Live Class Access Link (Protected)
                  </label>
                  <input
                    type="text"
                    value={webinarConfig.webinarAccessLink || 'https://live.webinarflow.io/room/ai-masterclass-nov4'}
                    onChange={(e) => setWebinarConfig({ ...webinarConfig, webinarAccessLink: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                  />
                </div>
              </div>

              {/* Presenter Bio */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Presenter Bio & Pedigree
                </label>
                <textarea
                  rows={3}
                  value={webinarConfig.speaker?.bio || ''}
                  onChange={(e) => setWebinarConfig({
                    ...webinarConfig,
                    speaker: { ...webinarConfig.speaker, bio: e.target.value }
                  })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '14px 28px', fontSize: 15, borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <Save size={18} />
                <span>Save All Webinar Changes</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: INVOICES & TAX CONFIGURATION */}
        {activeTab === 'invoices' && (
          <div className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              Tax Invoices & Financial Records
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
              Automatic 18% GST invoices generated upon backend verification. Download native PDF or view HTML receipt.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: 12, textAlign: 'left' }}>Invoice Number</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Customer</th>
                  <th style={{ padding: 12, textAlign: 'right' }}>Total (INR)</th>
                  <th style={{ padding: 12, textAlign: 'center' }}>Tax Status</th>
                  <th style={{ padding: 12, textAlign: 'center' }}>Downloads</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: 12, fontWeight: 700 }}>
                      <code>{inv.invoiceNumber}</code>
                    </td>
                    <td style={{ padding: 12 }}>
                      {inv.customer?.name || 'Verified Attendee'}
                    </td>
                    <td style={{ padding: 12, textAlign: 'right', fontWeight: 700, color: '#4f46e5' }}>
                      ₹{inv.total || 499}
                    </td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <span style={{ background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                        PAID (18% GST)
                      </span>
                    </td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: 8 }}>
                        <a
                          href={`http://localhost:5000/api/invoices/${inv.invoiceNumber}/pdf`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}
                        >
                          PDF
                        </a>
                        <span>•</span>
                        <a
                          href={`http://localhost:5000/api/invoices/${inv.invoiceNumber}/download`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#0f172a', fontWeight: 600, textDecoration: 'none' }}
                        >
                          HTML
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: DELIVERY LOGS & GATEWAYS */}
        {activeTab === 'logs' && (
          <div className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              Multi-Channel Message Delivery Logs
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
              Audit trail of all email confirmations, WhatsApp community invites, and reminder alerts.
            </p>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                  <th style={{ padding: 12, textAlign: 'left' }}>Recipient</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Channel</th>
                  <th style={{ padding: 12, textAlign: 'left' }}>Template</th>
                  <th style={{ padding: 12, textAlign: 'center' }}>Delivery Status</th>
                  <th style={{ padding: 12, textAlign: 'right' }}>Sent At</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: 12, fontWeight: 600 }}>{m.recipient}</td>
                    <td style={{ padding: 12, textTransform: 'uppercase', fontSize: 12 }}>
                      <span style={{
                        background: m.channel === 'whatsapp' ? '#dcfce7' : '#eff6ff',
                        color: m.channel === 'whatsapp' ? '#15803d' : '#1d4ed8',
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontWeight: 700
                      }}>
                        {m.channel}
                      </span>
                    </td>
                    <td style={{ padding: 12 }}><code>{m.templateName}</code></td>
                    <td style={{ padding: 12, textAlign: 'center' }}>
                      <span style={{ color: '#16a34a', fontWeight: 700 }}>✓ {m.status}</span>
                    </td>
                    <td style={{ padding: 12, textAlign: 'right', color: '#64748b', fontSize: 12 }}>
                      {new Date(m.sentAt || Date.now()).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* TAB: COURSES MANAGEMENT & ENROLLMENTS */}
        {activeTab === 'courses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Online Course Management</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>
                  Manage course prices, curriculum modules, preview videos, and enrolled students.
                </p>
              </div>
              <button
                onClick={() => setShowCourseModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                }}
              >
                <Plus size={16} />
                <span>Create New Course</span>
              </button>
            </div>

            {/* Courses Table */}
            <div className="glass-card" style={{ padding: 24, textAlign: 'left', marginBottom: 32 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                    <th style={{ padding: 12, textAlign: 'left' }}>Course</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Category</th>
                    <th style={{ padding: 12, textAlign: 'left' }}>Price</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Students</th>
                    <th style={{ padding: 12, textAlign: 'center' }}>Rating</th>
                    <th style={{ padding: 12, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coursesList.map((c) => (
                    <tr key={c._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                        <img
                          src={c.thumbnail}
                          alt={c.title}
                          style={{ width: 48, height: 32, borderRadius: 6, objectFit: 'cover' }}
                        />
                        <div>
                          <p style={{ fontWeight: 700, color: '#0f172a' }}>{c.title}</p>
                          <span style={{ fontSize: 11, color: '#64748b' }}>Instructor: {c.instructor?.name || 'Dr. Elena Vance'}</span>
                        </div>
                      </td>
                      <td style={{ padding: 12 }}>
                        <span style={{ background: '#eff6ff', color: '#2563eb', padding: '3px 8px', borderRadius: 4, fontWeight: 700, fontSize: 11 }}>
                          {c.category}
                        </span>
                      </td>
                      <td style={{ padding: 12, fontWeight: 700, color: '#0f172a' }}>
                        ₹{c.price} <span style={{ fontSize: 11, color: '#94a3b8', textDecoration: 'line-through' }}>₹{c.originalPrice || 2999}</span>
                      </td>
                      <td style={{ padding: 12, textAlign: 'center', fontWeight: 600, color: '#334155' }}>
                        {(c.studentsCount || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: 12, textAlign: 'center', color: '#b45309', fontWeight: 700 }}>
                        ★ {c.rating || 4.9}
                      </td>
                      <td style={{ padding: 12, textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteCourse(c._id)}
                          style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', padding: 4 }}
                          title="Delete Course"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Course Enrollments Table */}
            <div className="glass-card" style={{ padding: 24, textAlign: 'left' }}>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 6 }}>
                Recent Student Enrollments ({enrollmentsList.length})
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 16 }}>
                Real-time verified student enrollments across all online courses.
              </p>

              {enrollmentsList.length === 0 ? (
                <p style={{ fontSize: 13, color: '#64748b' }}>No student enrollments recorded yet.</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: 12, textAlign: 'left' }}>Student Name</th>
                      <th style={{ padding: 12, textAlign: 'left' }}>Enrolled Course</th>
                      <th style={{ padding: 12, textAlign: 'left' }}>Invoice #</th>
                      <th style={{ padding: 12, textAlign: 'left' }}>Amount</th>
                      <th style={{ padding: 12, textAlign: 'center' }}>Progress</th>
                      <th style={{ padding: 12, textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollmentsList.map((enr) => (
                      <tr key={enr._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: 12, fontWeight: 700, color: '#0f172a' }}>
                          {enr.studentName || 'Student'}
                          <span style={{ display: 'block', fontSize: 11, fontWeight: 400, color: '#64748b' }}>
                            {enr.studentEmail || ''}
                          </span>
                        </td>
                        <td style={{ padding: 12, color: '#334155' }}>
                          {enr.courseTitle || 'Online Course'}
                        </td>
                        <td style={{ padding: 12, fontFamily: 'monospace', color: '#4f46e5' }}>
                          {enr.invoiceNumber || 'INV-2026-CRS'}
                        </td>
                        <td style={{ padding: 12, fontWeight: 700 }}>
                          ₹{enr.amountPaid || 499}
                        </td>
                        <td style={{ padding: 12, textAlign: 'center' }}>
                          <span style={{ fontWeight: 700, color: enr.progress?.percent === 100 ? '#16a34a' : '#4f46e5' }}>
                            {enr.progress?.percent || 0}%
                          </span>
                        </td>
                        <td style={{ padding: 12, textAlign: 'right' }}>
                          <span style={{ background: '#dcfce7', color: '#166534', padding: '3px 8px', borderRadius: 4, fontWeight: 700, fontSize: 11 }}>
                            ACTIVE
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* CREATE COURSE MODAL */}
            {showCourseModal && (
              <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20
              }}>
                <div style={{
                  background: '#ffffff',
                  width: '100%',
                  maxWidth: 520,
                  borderRadius: 16,
                  padding: 28,
                  position: 'relative'
                }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
                    Create & Publish New Course
                  </h3>

                  <form onSubmit={handleCreateCourseSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>Course Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Generative AI Architecture"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>Category</label>
                        <select
                          value={newCourse.category}
                          onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}
                        >
                          <option value="AI & Agents">AI & Agents</option>
                          <option value="Full-Stack Development">Full-Stack Development</option>
                          <option value="Cloud & DevOps">Cloud & DevOps</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Cyber Security">Cyber Security</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>Price (INR)</label>
                        <input
                          type="number"
                          required
                          value={newCourse.price}
                          onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>Instructor Name</label>
                      <input
                        type="text"
                        value={newCourse.instructorName}
                        onChange={(e) => setNewCourse({ ...newCourse, instructorName: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>Thumbnail Image URL</label>
                      <input
                        type="url"
                        value={newCourse.thumbnail}
                        onChange={(e) => setNewCourse({ ...newCourse, thumbnail: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 4 }}>Short Description</label>
                      <textarea
                        rows={2}
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13 }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                      <button
                        type="submit"
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                          color: '#ffffff',
                          border: 'none',
                          padding: '11px',
                          borderRadius: 8,
                          fontWeight: 700,
                          fontSize: 14,
                          cursor: 'pointer'
                        }}
                      >
                        Publish Course
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCourseModal(false)}
                        style={{
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          color: '#334155',
                          padding: '11px 18px',
                          borderRadius: 8,
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
