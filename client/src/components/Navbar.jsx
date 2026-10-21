import { FaReact } from 'react-icons/fa';
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
      <div className="container" style={{ maxWidth: 1280, padding: '0 24px', margin: '0 auto' }}>
        <div style={{
          height: 74,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20
        }}>
          {/* 1. Left: Brand Heading "Kaira" & Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
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

            {/* Desktop Navigation Links: Home and Courses */}
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

          {/* 2. Center: Prominent Large Course Search Bar */}
          <div style={{ flex: 1, maxWidth: 680, margin: '0 20px' }} className="nav-search-bar">
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
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
          </div>
        </div>
      </div>
    </header>
  );
}
