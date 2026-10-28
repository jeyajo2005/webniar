import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  SlidersHorizontal,
  GraduationCap,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Award
} from 'lucide-react';
import { ALL_COURSES } from '../data/allCoursesData.js';

export default function ExploreCoursesPage({
  onViewCourse,
  onEnrollCourse,
  onStartLearning,
  onBackToHome,
  initialSearch = ''
}) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'rating' | 'price-asc' | 'price-desc'

  const categories = [
    'All',
    'AI & Agents',
    'Full-Stack Development',
    'Cloud & DevOps',
    'Cyber Security',
    'UI/UX Design',
    'Data & Systems'
  ];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter(course => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        course.title.toLowerCase().includes(q) ||
        course.subtitle.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        (course.instructor?.name && course.instructor.name.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'price-asc') return (a.price || 0) - (b.price || 0);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      return (b.studentsCount || 0) - (a.studentsCount || 0); // popular default
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: 80 }}>
      {/* 1. Header Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #090d16 0%, #0f172a 60%, #1e3a8a 100%)',
        color: '#ffffff',
        padding: '50px 0 60px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 2 }}>
          
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94a3b8', marginBottom: 16 }}>
            <button
              onClick={onBackToHome}
              style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: 0, fontWeight: 700 }}
            >
              Home
            </button>
            <ChevronRight size={14} />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>Explore Learning (25 Courses)</span>
          </div>

          <div style={{ maxWidth: 760 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              color: '#38bdf8',
              padding: '4px 14px',
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 800,
              marginBottom: 14,
              letterSpacing: '0.04em'
            }}>
              <GraduationCap size={14} />
              <span>OFFICIAL KAIRA ACADEMY CATALOG • 25 IN-DEMAND TRACKS</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 900,
              lineHeight: 1.2,
              margin: '0 0 14px',
              letterSpacing: '-0.02em',
              color: '#ffffff'
            }}>
              Explore All 25 In-Demand Professional Courses
            </h1>

            <p style={{
              fontSize: 'clamp(14px, 1.8vw, 17px)',
              color: '#cbd5e1',
              lineHeight: 1.6,
              margin: '0 0 26px'
            }}>
              Gain hands-on skills with real production architectures, microservices, AI swarms, and enterprise codebases. Watch the 1st video lesson free across all 25 courses.
            </p>
          </div>

          {/* Search Bar in Header */}
          <div style={{ maxWidth: 640 }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: 18, top: 16 }} />
              <input
                type="text"
                placeholder="Search by topic, skill, or instructor (e.g. AI Agents, MERN, Kubernetes, UI/UX)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  height: 52,
                  padding: '0 20px 0 52px',
                  borderRadius: 14,
                  border: '1.5px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.95)',
                  fontSize: 15,
                  color: '#0f172a',
                  outline: 'none',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                  boxSizing: 'border-box'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: 14,
                    background: '#e2e8f0',
                    border: 'none',
                    borderRadius: '50%',
                    width: 24,
                    height: 24,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#64748b'
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Interactive Category Tabs & Sort Controls */}
      <section style={{
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 74,
        zIndex: 90,
        boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
      }}>
        <div className="container" style={{ maxWidth: 1240, margin: '0 auto', padding: '14px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            
            {/* Category Pills */}
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, flex: 1 }}>
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count = cat === 'All' 
                  ? ALL_COURSES.length 
                  : ALL_COURSES.filter(c => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 9999,
                      fontSize: 13,
                      fontWeight: isSelected ? 800 : 600,
                      background: isSelected ? '#1d4ed8' : '#f1f5f9',
                      color: isSelected ? '#ffffff' : '#475569',
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span>{cat}</span>
                    <span style={{
                      background: isSelected ? 'rgba(255,255,255,0.25)' : '#e2e8f0',
                      color: isSelected ? '#ffffff' : '#64748b',
                      fontSize: 11,
                      padding: '1px 6px',
                      borderRadius: 9999,
                      fontWeight: 700
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <SlidersHorizontal size={15} color="#64748b" />
              <span style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '7px 12px',
                  borderRadius: 8,
                  border: '1.5px solid #cbd5e1',
                  background: '#ffffff',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#1e293b',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="popular">Most Enrolled</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* 3. 25 Courses Grid */}
      <section style={{ maxWidth: 1240, margin: '40px auto 0', padding: '0 24px' }}>
        
        {/* Results Counter Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: '#0f172a', margin: '0 0 4px' }}>
              Showing {filteredCourses.length} of 25 Courses
            </h2>
            <p style={{ margin: 0, fontSize: 13, color: '#64748b' }}>
              {selectedCategory !== 'All' ? `Filtered by category: ${selectedCategory}` : 'All curriculums include 1st free preview, verifiable certificate & mentorship'}
            </p>
          </div>

          <button
            onClick={onBackToHome}
            style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              padding: '8px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 700,
              color: '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>← Back to Masterclass Home</span>
          </button>
        </div>

        {/* Empty state */}
        {filteredCourses.length === 0 ? (
          <div style={{
            background: '#ffffff',
            borderRadius: 20,
            padding: '60px 24px',
            textAlign: 'center',
            border: '1.5px dashed #cbd5e1'
          }}>
            <BookOpen size={48} color="#94a3b8" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', margin: '0 0 8px' }}>
              No courses found for "{searchQuery}"
            </h3>
            <p style={{ color: '#64748b', fontSize: 14, margin: '0 0 20px' }}>
              Try searching for "AI", "MERN", "DevOps", "Cybersecurity", or clear your category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
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
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="courses-grid-responsive" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 310px), 1fr))',
            gap: 28
          }}>
            {filteredCourses.map((course) => {
              const discount = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

              return (
                <div
                  key={course._id}
                  className="course-card-premium"
                  style={{
                    background: '#ffffff',
                    borderRadius: 18,
                    border: '1.5px solid #e2e8f0',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 16px 32px rgba(15, 23, 42, 0.12)';
                    e.currentTarget.style.borderColor = '#93c5fd';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.05)';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => onViewCourse && onViewCourse(course._id)}
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: 200,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      background: '#0f172a'
                    }}
                  >
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />

                    {/* Badge */}
                    <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 2 }}>
                      <span style={{
                        background: course.badge === 'Bestseller' ? '#f59e0b' : '#3b82f6',
                        color: '#ffffff',
                        fontSize: 11,
                        fontWeight: 900,
                        padding: '4px 10px',
                        borderRadius: 6,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}>
                        {course.badge || 'Bestseller'}
                      </span>
                    </div>

                    {/* Duration Badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: 10,
                      right: 12,
                      background: 'rgba(15, 23, 42, 0.85)',
                      color: '#ffffff',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 6,
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      zIndex: 2
                    }}>
                      <Clock size={12} />
                      <span>{course.durationHours || 20} hours</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Category & Free Preview Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        {course.category}
                      </span>
                      <span style={{
                        background: '#ecfdf5',
                        color: '#047857',
                        border: '1px solid #a7f3d0',
                        fontSize: 10,
                        fontWeight: 800,
                        padding: '2px 7px',
                        borderRadius: 4,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Play size={8} fill="#047857" /> 1st Video Free
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => onViewCourse && onViewCourse(course._id)}
                      style={{
                        fontSize: 16.5,
                        fontWeight: 800,
                        color: '#0f172a',
                        lineHeight: 1.35,
                        margin: '0 0 8px',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#1d4ed8'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = '#0f172a'; }}
                    >
                      {course.title}
                    </h3>

                    {/* Subtitle / Description */}
                    <p style={{
                      fontSize: 13,
                      color: '#64748b',
                      lineHeight: 1.5,
                      marginBottom: 16,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {course.subtitle || course.description}
                    </p>

                    {/* Instructor */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                      <img
                        src={course.instructor?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'}
                        alt={course.instructor?.name}
                        style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>
                        {course.instructor?.name || 'Kaira Lead Mentor'}
                      </span>
                    </div>

                    {/* Rating & Students */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 16 }}>
                      <span style={{ fontWeight: 800, color: '#b45309' }}>{course.rating || 4.9}</span>
                      <div style={{ display: 'flex' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                        ))}
                      </div>
                      <span style={{ color: '#94a3b8', fontSize: 12 }}>
                        ({(course.reviewsCount || 1200).toLocaleString()})
                      </span>
                      <span style={{ color: '#cbd5e1' }}>•</span>
                      <span style={{ color: '#64748b', fontSize: 12 }}>
                        {(course.studentsCount || 8000).toLocaleString()} learners
                      </span>
                    </div>

                    {/* Pricing Row */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: 14,
                      borderTop: '1px solid #f1f5f9',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                        <span style={{ fontSize: 22, fontWeight: 900, color: '#0f172a' }}>
                          ₹{course.price || 499}
                        </span>
                        <span style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'line-through' }}>
                          ₹{course.originalPrice || 2999}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#16a34a' }}>
                          -{discount}%
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
                      <button
                        onClick={() => {
                          if (onStartLearning) {
                            onStartLearning(course._id);
                          } else if (onViewCourse) {
                            onViewCourse(course._id);
                          }
                        }}
                        style={{
                          background: '#f0fdf4',
                          border: '1.5px solid #86efac',
                          color: '#15803d',
                          padding: '10px 8px',
                          borderRadius: 8,
                          fontSize: 12,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <Play size={13} fill="#15803d" />
                        <span>Watch 1st Free</span>
                      </button>

                      <button
                        onClick={() => onEnrollCourse && onEnrollCourse(course)}
                        style={{
                          background: '#0056D2',
                          border: 'none',
                          color: '#ffffff',
                          padding: '10px 8px',
                          borderRadius: 8,
                          fontSize: 13,
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          boxShadow: '0 2px 8px rgba(0, 86, 210, 0.3)',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <span>Enroll ₹{course.price || 499}</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>
    </div>
  );
}
