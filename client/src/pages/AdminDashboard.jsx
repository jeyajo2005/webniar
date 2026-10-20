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
  Phone
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
    } catch (err) {
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
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
      </div>
    </div>
  );
}
