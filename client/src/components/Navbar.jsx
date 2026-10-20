import React, { useState } from 'react';
import { 
  Search, 
  ChevronDown, 
  LayoutDashboard, 
  Sparkles, 
  BookOpen
} from 'lucide-react';

export default function Navbar({ onRegisterClick, onNavigate, currentPage = 'landing' }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #f1f5f9',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
    }}>
      <div className="container" style={{ maxWidth: 1240, padding: '0 24px' }}>
        <div style={{
          height: 74,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20
        }}>
          {/* Left: Brand Logo & Main Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
            {/* Logo matching Skillify icon in screenshot */}
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
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#1d4ed8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(29, 78, 216, 0.25)'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                Kaira<span style={{ color: '#2563eb' }}>.</span>
              </span>
            </div>

            {/* Navigation Links */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 24 }} className="desktop-nav">
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, fontWeight: 600, color: '#475569', cursor: 'pointer' }}>
                <span>Courses</span>
                <ChevronDown size={14} />
              </div>
              <a href="#categories-section" style={{ fontSize: 14, fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
                Categories
              </a>
              <a href="#curriculum-section" style={{ fontSize: 14, fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
                Curriculum
              </a>
              <a href="#why-learn-section" style={{ fontSize: 14, fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
                Why Kaira
              </a>
              <a href="#registration-payment-section" style={{ fontSize: 14, fontWeight: 600, color: '#475569', textDecoration: 'none' }}>
                Pricing
              </a>
            </nav>
          </div>

          {/* Center: Search Bar matching screenshot */}
          <div style={{ flex: 1, maxWidth: 360, position: 'relative' }} className="desktop-search">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for courses, skills, or topics..."
              style={{
                width: '100%',
                padding: '10px 16px 10px 38px',
                borderRadius: 9999,
                border: '1px solid #e2e8f0',
                background: '#f8fafc',
                fontSize: 13,
                outline: 'none',
                color: '#1e293b'
              }}
            />
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: 14, top: 12 }} />
          </div>

          {/* Right: Admin Hub & Register Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>

            {/* Admin Hub Link */}
            <button
              onClick={() => onNavigate(currentPage === 'admin' ? 'landing' : 'admin')}
              style={{
                background: '#f1f5f9',
                border: 'none',
                color: '#334155',
                padding: '9px 16px',
                borderRadius: 9999,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <LayoutDashboard size={14} />
              <span>{currentPage === 'admin' ? 'Back' : 'Admin Hub'}</span>
            </button>

            {/* Solid Vibrant Blue Sign Up / Register Button (Matching screenshot) */}
            <button
              onClick={onRegisterClick}
              style={{
                background: '#2563eb',
                color: '#ffffff',
                border: 'none',
                padding: '10px 22px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
              }}
            >
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
