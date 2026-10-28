import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  LayoutDashboard, 
  BookOpen, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Home, 
  Flame 
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
    onNavigate('courses');
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
      <div className="container" style={{ maxWidth: 1280, padding: '0 20px', margin: '0 auto' }}>
        <div style={{
          height: 74,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16
        }}>
          {/* 1. Left: Brand Heading "Kaira" & Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <button
              onClick={() => onNavigate('landing')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none'
              }}
              title="Kaira Academy"
            >
              <span style={{
                fontSize: 26,
                fontWeight: 900,
                color: '#0056D2',
                letterSpacing: '-0.03em',
                fontFamily: 'inherit'
              }}>
                Kaira
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
              <button
                onClick={() => onNavigate('landing')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 15,
                  fontWeight: currentPage === 'landing' ? 700 : 600,
                  color: currentPage === 'landing' ? '#1d4ed8' : '#475569',
                  cursor: 'pointer',
                  padding: '6px 12px',
                  borderRadius: 8,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#1d4ed8'; }}
                onMouseLeave={(e) => { if (currentPage !== 'landing') e.currentTarget.style.color = '#475569'; }}
              >
                Home
              </button>

              <button
                onClick={() => onNavigate('courses')}
                style={{
                  background: currentPage === 'courses' ? '#eff6ff' : 'none',
                  border: currentPage === 'courses' ? '1px solid #bfdbfe' : 'none',
                  fontSize: 15,
                  fontWeight: currentPage === 'courses' ? 800 : 600,
                  color: currentPage === 'courses' ? '#1d4ed8' : '#475569',
                  cursor: 'pointer',
                  padding: '6px 14px',
                  borderRadius: 8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#1d4ed8'; }}
                onMouseLeave={(e) => { if (currentPage !== 'courses') e.currentTarget.style.color = '#475569'; }}
              >
                <span>Explore Learning (25)</span>
              </button>
            </nav>
          </div>

          {/* 2. Center: Prominent Large Course Search Bar (Desktop) */}
          <div style={{ flex: 1, maxWidth: 680, margin: '0 16px' }} className="nav-search-bar">
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative' }}>
              <Search
                size={18}
                color="#64748b"
                style={{ position: 'absolute', left: 16, top: 15 }}
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
                  height: 48,
                  padding: '0 20px 0 46px',
                  borderRadius: 9999,
                  border: '1.5px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: 14,
                  color: '#0f172a',
                  outline: 'none',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                  e.target.style.background = '#ffffff';
                  e.target.style.boxShadow = '0 0 0 4px rgba(37, 99, 235, 0.12)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.background = '#f8fafc';
                  e.target.style.boxShadow = '0 2px 6px rgba(15, 23, 42, 0.04)';
                }}
              />
            </form>
          </div>

          {/* 3. Right: User Profile or Login/Sign Up + Mobile Menu Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#f8fafc',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: 9999,
                    padding: '8px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.background = '#f1f5f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                >
                  <User size={16} color="#1d4ed8" />
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }} className="desktop-user-name">
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} color="#64748b" className="desktop-user-chevron" />
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
              <div className="desktop-auth-btn" style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={() => onOpenAuth('login')}
                  style={{
                    background: '#1d4ed8',
                    border: 'none',
                    borderRadius: 8,
                    padding: '9px 22px',
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#ffffff',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1e40af';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#1d4ed8';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Log In
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              style={{
                width: 42,
                height: 42,
                borderRadius: 10,
                border: '1.5px solid #cbd5e1',
                background: mobileMenuOpen ? '#eff6ff' : '#f8fafc',
                cursor: 'pointer',
                color: mobileMenuOpen ? '#1d4ed8' : '#1e293b',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                padding: 0
              }}
            >
              {mobileMenuOpen ? <X size={22} color="#1d4ed8" /> : <Menu size={22} color="#1e293b" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-drawer"
          style={{
            background: '#ffffff',
            borderTop: '1px solid #f1f5f9',
            boxShadow: '0 20px 30px -10px rgba(15, 23, 42, 0.12)',
            padding: '16px 20px 24px',
            animation: 'fadeInDown 0.2s ease-out'
          }}
        >
          {/* Mobile Search Bar */}
          <form
            onSubmit={(e) => {
              handleSearchSubmit(e);
              setMobileMenuOpen(false);
            }}
            style={{ marginBottom: 16 }}
          >
            <div style={{ position: 'relative' }}>
              <Search
                size={18}
                color="#64748b"
                style={{ position: 'absolute', left: 14, top: 13 }}
              />
              <input
                type="text"
                placeholder="Search 25+ courses, skills..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearch) onSearch(e.target.value);
                }}
                style={{
                  width: '100%',
                  height: 44,
                  padding: '0 16px 0 42px',
                  borderRadius: 12,
                  border: '1.5px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: 14,
                  color: '#0f172a',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </form>

          {/* Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <button
              onClick={() => {
                onNavigate('landing');
                setMobileMenuOpen(false);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 10,
                background: currentPage === 'landing' ? '#eff6ff' : 'transparent',
                border: 'none',
                color: currentPage === 'landing' ? '#1d4ed8' : '#334155',
                fontSize: 15,
                fontWeight: currentPage === 'landing' ? 700 : 600,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Home size={18} color={currentPage === 'landing' ? '#1d4ed8' : '#64748b'} />
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                onNavigate('courses');
                setMobileMenuOpen(false);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 10,
                background: currentPage === 'courses' ? '#eff6ff' : 'transparent',
                border: 'none',
                color: currentPage === 'courses' ? '#1d4ed8' : '#334155',
                fontSize: 15,
                fontWeight: currentPage === 'courses' ? 700 : 600,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <BookOpen size={18} color={currentPage === 'courses' ? '#1d4ed8' : '#64748b'} />
              <span>Explore Learning (25 Courses)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById('webinar-spotlight-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else onNavigate('landing');
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 14px',
                borderRadius: 10,
                background: 'transparent',
                border: 'none',
                color: '#334155',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <Flame size={18} color="#ef4444" />
              <span>Live Masterclass</span>
            </button>
          </div>

          <div style={{ height: 1, background: '#f1f5f9', margin: '14px 0' }} />

          {/* User Section in Mobile Menu */}
          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                background: '#f8fafc',
                borderRadius: 12,
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <User size={18} color="#1d4ed8" />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{user.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{user.email}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#1d4ed8',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <LayoutDashboard size={18} color="#1d4ed8" />
                <span>My Learning Dashboard</span>
              </button>

              <button
                onClick={() => {
                  if (onLogout) onLogout();
                  setMobileMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: 'transparent',
                  border: 'none',
                  color: '#dc2626',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <LogOut size={16} color="#dc2626" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                onOpenAuth('login');
                setMobileMenuOpen(false);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '13px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)',
                color: '#ffffff',
                border: 'none',
                fontSize: 15,
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(29, 78, 216, 0.25)'
              }}
            >
              <User size={18} />
              <span>Log In / Sign Up</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
