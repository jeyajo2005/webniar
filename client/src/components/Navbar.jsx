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
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {/* Kaira Logo matching Image 1: ● kaira */}
            <div 
              onClick={() => onNavigate('landing')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer'
              }}
            >
              <span style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#1d4ed8',
                display: 'inline-block',
                boxShadow: '0 2px 8px rgba(29, 78, 216, 0.4)'
              }} />
              <span style={{
                fontSize: 26,
                fontWeight: 900,
                color: '#1d4ed8',
                letterSpacing: '-0.035em',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}>
                kaira
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 24, marginLeft: 16 }} className="desktop-nav">
              <button
                onClick={() => onNavigate('landing')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: currentPage === 'landing' ? 700 : 500,
                  color: currentPage === 'landing' ? '#1d4ed8' : '#475569',
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
                    const el = document.getElementById('masterclass-spotlight-section');
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
                Pricing
              </button>

              <button
                onClick={() => {
                  if (currentPage !== 'landing') onNavigate('landing');
                  setTimeout(() => {
                    const el = document.getElementById('masterclass-spotlight-section');
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
                Live Webinar
              </button>

              <button
                onClick={() => {
                  if (currentPage !== 'landing') onNavigate('landing');
                  setTimeout(() => {
                    const el = document.getElementById('masterclass-spotlight-section');
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
                About
              </button>
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
                    border: '1px solid #0056D2',
                    borderRadius: 4,
                    padding: '8px 16px',
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#0056D2',
                    cursor: 'pointer'
                  }}
                >
                  Log In
                </button>

                <button
                  onClick={() => onOpenAuth('signup')}
                  style={{
                    background: '#0056D2',
                    border: 'none',
                    borderRadius: 4,
                    padding: '8px 18px',
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 86, 210, 0.3)'
                  }}
                >
                  Join for Free
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
