import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  LayoutDashboard, 
  Sparkles, 
  BookOpen,
  Video,
  User,
  LogOut,
  Settings,
  Tv,
  Award,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ 
  onRegisterClick, 
  onNavigate, 
  currentPage = 'landing',
  user,
  onOpenAuth,
  onLogout,
  onOpenIntroVideo,
  onSearch
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
    if (currentPage !== 'landing') onNavigate('landing');
  };

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)'
    }}>
      <div className="container" style={{ maxWidth: 1280, padding: '0 24px', margin: '0 auto' }}>
        <div style={{
          height: 74,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20
        }}>
          {/* 1. Left: Brand Logo & Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div
              onClick={() => onNavigate('landing')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.35)'
              }}>
                <Sparkles size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  Learn<span style={{ color: '#6366f1' }}>Flow</span>
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Academy
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="desktop-nav">
              <button
                onClick={() => onNavigate('landing')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: currentPage === 'landing' ? 700 : 500,
                  color: currentPage === 'landing' ? '#4f46e5' : '#475569',
                  cursor: 'pointer',
                  padding: '6px 8px'
                }}
              >
                Home
              </button>

              <button
                onClick={() => {
                  if (currentPage !== 'landing') onNavigate('landing');
                  setTimeout(() => {
                    const el = document.getElementById('featured-courses-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer',
                  padding: '6px 8px'
                }}
              >
                Courses
              </button>

              <button
                onClick={() => {
                  if (currentPage !== 'landing') onNavigate('landing');
                  setTimeout(() => {
                    const el = document.getElementById('webinar-spotlight-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#475569',
                  cursor: 'pointer',
                  padding: '6px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>Live Webinars</span>
                <span style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '1px 6px',
                  borderRadius: 9999,
                  textTransform: 'uppercase'
                }}>
                  Live
                </span>
              </button>

              {onOpenIntroVideo && (
                <button
                  onClick={onOpenIntroVideo}
                  style={{
                    background: '#f5f3ff',
                    border: '1px solid #ddd6fe',
                    color: '#6d28d9',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    padding: '6px 12px',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                  title="Watch Full-Screen Business Webinar Video"
                >
                  <Video size={14} color="#7c3aed" />
                  <span>Class Video</span>
                </button>
              )}
            </nav>
          </div>

          {/* 2. Center: Course Search Bar */}
          <div style={{ flex: 1, maxWidth: 360, margin: '0 12px' }} className="nav-search-bar">
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <Search
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: 14, top: 12 }}
              />
              <input
                type="text"
                placeholder="Search courses, skills, instructors..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                style={{
                  width: '100%',
                  height: 40,
                  padding: '0 16px 0 38px',
                  borderRadius: 9999,
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: 13,
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
              />
            </form>
          </div>

          {/* 3. Right: User Profile or Login/Sign Up */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 9999,
                    padding: '6px 14px 6px 6px',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} color="#64748b" />
                </button>

                {showUserMenu && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: 220,
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 14,
                    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                    padding: '8px 0',
                    zIndex: 200
                  }}>
                    <div style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9' }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{user.name}</p>
                      <p style={{ fontSize: 11, color: '#64748b' }}>{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('dashboard');
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 16px',
                        background: 'none',
                        border: 'none',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer'
                      }}
                    >
                      <LayoutDashboard size={16} color="#4f46e5" />
                      <span>My Learning Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        onNavigate('admin');
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 16px',
                        background: 'none',
                        border: 'none',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer'
                      }}
                    >
                      <Settings size={16} color="#64748b" />
                      <span>Organizer Admin Panel</span>
                    </button>

                    <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />

                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        if (onLogout) onLogout();
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '10px 16px',
                        background: 'none',
                        border: 'none',
                        fontSize: 13,
                        fontWeight: 600,
                        color: '#dc2626',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        cursor: 'pointer'
                      }}
                    >
                      <LogOut size={16} color="#dc2626" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button
                  onClick={() => onOpenAuth('login')}
                  style={{
                    background: 'none',
                    border: '1px solid #cbd5e1',
                    borderRadius: 8,
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                >
                  Log In
                </button>

                <button
                  onClick={() => onOpenAuth('signup')}
                  style={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 18px',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)'
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Quick Admin Access Button */}
            <button
              onClick={() => onNavigate('admin')}
              style={{
                background: currentPage === 'admin' ? '#0f172a' : '#f1f5f9',
                color: currentPage === 'admin' ? '#ffffff' : '#475569',
                border: 'none',
                borderRadius: 8,
                padding: '8px 12px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
              title="Admin Panel"
            >
              <LayoutDashboard size={14} />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
