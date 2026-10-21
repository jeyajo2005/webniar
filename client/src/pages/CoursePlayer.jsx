import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Lock, 
  ArrowLeft, 
  Award, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  Sparkles, 
  Settings,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api.js';

export default function CoursePlayer({ 
  courseId, 
  onBack, 
  onViewCertificate, 
  user 
}) {
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [currentLessonIdx, setCurrentLessonIdx] = useState(0);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progressPercent, setProgressPercent] = useState(0);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'resources' | 'discussion'

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [savingProgress, setSavingProgress] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const fetchClassroom = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const token = localStorage.getItem('token');
        const res = await api.getCourseClassroom(courseId, token);
        if (res.success) {
          setCourse(res.course);
          setEnrollment(res.enrollment);

          const completed = res.enrollment?.progress?.completedLessons || [];
          setCompletedLessonIds(completed);
          setProgressPercent(res.enrollment?.progress?.percent || 0);

          // Find first lesson or resume from last watched
          const lastId = res.enrollment?.progress?.lastWatchedLessonId;
          let initialLesson = null;
          let foundMIdx = 0;
          let foundLIdx = 0;

          if (res.course.modules?.length) {
            res.course.modules.forEach((mod, mIdx) => {
              (mod.lessons || []).forEach((les, lIdx) => {
                if (!initialLesson || les._id === lastId) {
                  initialLesson = les;
                  foundMIdx = mIdx;
                  foundLIdx = lIdx;
                }
              });
            });
          }

          setCurrentLesson(initialLesson);
          setCurrentModuleIdx(foundMIdx);
          setCurrentLessonIdx(foundLIdx);
        } else {
          setErrorMsg(res.message || 'Access restricted. Please enroll in this course.');
        }
      } catch (err) {
        setErrorMsg('Failed to connect to classroom service.');
      } finally {
        setLoading(false);
      }
    };

    fetchClassroom();
  }, [courseId]);

  // Video Speed Change
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Toggle Lesson Completion
  const handleToggleComplete = async (lessonId) => {
    if (!lessonId) return;
    setSavingProgress(true);

    const isAlreadyCompleted = completedLessonIds.includes(lessonId);
    const newCompleted = !isAlreadyCompleted;

    try {
      const token = localStorage.getItem('token');
      const res = await api.updateLessonProgress({
        courseId,
        lessonId,
        completed: newCompleted
      }, token);

      if (res.success) {
        setCompletedLessonIds(res.progress.completedLessons || []);
        setProgressPercent(res.progress.percent || 0);

        if (res.progress.percent === 100) {
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.5 }
            });
          } catch (e) {}
        }
      }
    } catch (e) {
      console.error('Progress update error:', e);
    } finally {
      setSavingProgress(false);
    }
  };

  // Switch Lesson
  const selectLesson = (moduleIdx, lessonIdx) => {
    const targetModule = course.modules[moduleIdx];
    if (!targetModule) return;
    const targetLesson = targetModule.lessons[lessonIdx];
    if (!targetLesson) return;

    setCurrentLesson(targetLesson);
    setCurrentModuleIdx(moduleIdx);
    setCurrentLessonIdx(lessonIdx);
    setIsPlaying(true);
  };

  // Next / Previous Navigation
  const handleNextLesson = () => {
    const curMod = course.modules[currentModuleIdx];
    if (currentLessonIdx + 1 < (curMod.lessons || []).length) {
      selectLesson(currentModuleIdx, currentLessonIdx + 1);
    } else if (currentModuleIdx + 1 < course.modules.length) {
      selectLesson(currentModuleIdx + 1, 0);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIdx > 0) {
      selectLesson(currentModuleIdx, currentLessonIdx - 1);
    } else if (currentModuleIdx > 0) {
      const prevMod = course.modules[currentModuleIdx - 1];
      selectLesson(currentModuleIdx - 1, (prevMod.lessons || []).length - 1);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, border: '4px solid #334155', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ fontSize: 14, color: '#94a3b8' }}>Loading secure course classroom...</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 20, padding: 40, maxWidth: 480, textAlign: 'center', color: '#fff' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={28} color="#ef4444" />
          </div>
          <h3 style={{ fontSize: 20, fontWeight: 800 }}>Protected Content</h3>
          <p style={{ fontSize: 14, color: '#94a3b8', margin: '10px 0 24px' }}>
            {errorMsg}
          </p>
          <button
            onClick={onBack}
            style={{
              background: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 10,
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Back to Course Details
          </button>
        </div>
      </div>
    );
  }

  const isCurrentCompleted = currentLesson ? completedLessonIds.includes(currentLesson._id) : false;

  return (
    <div style={{ minHeight: '100vh', background: '#0b0f19', color: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* 1. TOP CLASSROOM NAVBAR */}
      <header style={{
        background: '#0f172a',
        borderBottom: '1px solid #1e293b',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 50
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#cbd5e1',
              padding: '8px 12px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </button>

          <div style={{ borderLeft: '1px solid #334155', height: 24 }} />

          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }}>
              {course.title}
            </h2>
            <p style={{ fontSize: 11, color: '#94a3b8' }}>
              Instructor: {course.instructor?.name || 'Dr. Elena Vance'}
            </p>
          </div>
        </div>

        {/* Course Progress indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 140, height: 8, background: '#1e293b', borderRadius: 9999, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                background: progressPercent === 100 ? '#22c55e' : 'linear-gradient(90deg, #4f46e5 0%, #38bdf8 100%)',
                borderRadius: 9999,
                transition: 'width 0.4s ease'
              }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#cbd5e1' }}>
              {progressPercent}%
            </span>
          </div>

          {progressPercent === 100 && (
            <button
              onClick={() => onViewCertificate && onViewCertificate(course._id)}
              style={{
                background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '7px 14px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 2px 10px rgba(217, 119, 6, 0.4)'
              }}
            >
              <Award size={15} />
              <span>Get Certificate</span>
            </button>
          )}
        </div>
      </header>

      {/* 2. MAIN PLAYER & CURRICULUM SIDEBAR BODY */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px' }} className="hero-grid">
        {/* LEFT COLUMN: LARGE VIDEO PLAYER & LESSON CONTROLS */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#020617', borderRight: '1px solid #1e293b' }}>
          {/* High-Definition Video Player Viewport */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {currentLesson?.videoUrl ? (
              <video
                ref={videoRef}
                key={currentLesson.videoUrl}
                src={currentLesson.videoUrl}
                controls
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>
                <p>No video source available for this lesson.</p>
              </div>
            )}
          </div>

          {/* Under-Video Actions Bar */}
          <div style={{
            background: '#0f172a',
            borderBottom: '1px solid #1e293b',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={handlePrevLesson}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <ChevronLeft size={16} />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNextLesson}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '8px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <span>Next</span>
                <ChevronRight size={16} />
              </button>

              {/* Playback Speed selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }}>
                {[1, 1.25, 1.5, 2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => handleSpeedChange(spd)}
                    style={{
                      background: playbackSpeed === spd ? '#4f46e5' : 'rgba(255, 255, 255, 0.05)',
                      border: 'none',
                      color: playbackSpeed === spd ? '#ffffff' : '#94a3b8',
                      padding: '4px 8px',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Mark as Completed Button */}
            <button
              disabled={savingProgress}
              onClick={() => handleToggleComplete(currentLesson?._id)}
              style={{
                background: isCurrentCompleted ? '#16a34a' : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '9px 18px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: isCurrentCompleted ? '0 2px 10px rgba(22, 163, 74, 0.3)' : '0 2px 10px rgba(79, 70, 229, 0.4)'
              }}
            >
              <CheckCircle size={16} />
              <span>{isCurrentCompleted ? 'Completed ✓' : 'Mark as Completed'}</span>
            </button>
          </div>

          {/* Bottom Tabs: Overview, Resources, Discussion */}
          <div style={{ padding: '24px 32px', flex: 1, background: '#0b0f19' }}>
            <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid #1e293b', paddingBottom: 12, marginBottom: 20 }}>
              <button
                onClick={() => setActiveTab('overview')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: activeTab === 'overview' ? 700 : 500,
                  color: activeTab === 'overview' ? '#6366f1' : '#94a3b8',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'overview' ? '2px solid #6366f1' : 'none',
                  paddingBottom: 8
                }}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: activeTab === 'resources' ? 700 : 500,
                  color: activeTab === 'resources' ? '#6366f1' : '#94a3b8',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'resources' ? '2px solid #6366f1' : 'none',
                  paddingBottom: 8
                }}
              >
                Resources & Code
              </button>
              <button
                onClick={() => setActiveTab('discussion')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: 14,
                  fontWeight: activeTab === 'discussion' ? 700 : 500,
                  color: activeTab === 'discussion' ? '#6366f1' : '#94a3b8',
                  cursor: 'pointer',
                  borderBottom: activeTab === 'discussion' ? '2px solid #6366f1' : 'none',
                  paddingBottom: 8
                }}
              >
                Q&A Discussion
              </button>
            </div>

            {activeTab === 'overview' && (
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#ffffff', marginBottom: 8 }}>
                  {currentLesson?.title || 'Lesson Overview'}
                </h3>
                <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, maxWidth: 800 }}>
                  {currentLesson?.summary || 'In this lecture, you learn the underlying principles and implementation details. Follow along with your editor and complete the guided milestones.'}
                </p>
              </div>
            )}

            {activeTab === 'resources' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ background: '#1e293b', padding: 14, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileText size={18} color="#6366f1" />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Lesson-Architecture-Blueprint.pdf</span>
                  </div>
                  <a href="#download" onClick={(e) => { e.preventDefault(); alert('Resource blueprint downloaded.'); }} style={{ color: '#38bdf8', fontSize: 12, fontWeight: 700 }}>
                    Download
                  </a>
                </div>
                <div style={{ background: '#1e293b', padding: 14, borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <BookOpen size={18} color="#6366f1" />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>GitHub Source Code Starter Repo</span>
                  </div>
                  <a href="#repo" onClick={(e) => { e.preventDefault(); alert('Starter repo cloned to workspace.'); }} style={{ color: '#38bdf8', fontSize: 12, fontWeight: 700 }}>
                    Open Repo
                  </a>
                </div>
              </div>
            )}

            {activeTab === 'discussion' && (
              <div style={{ background: '#1e293b', padding: 18, borderRadius: 12 }}>
                <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>
                  Ask questions, share code snippets, and interact directly with Dr. Elena Vance and fellow engineers.
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <input
                    type="text"
                    placeholder="Type your question for this lesson..."
                    style={{
                      flex: 1,
                      background: '#0f172a',
                      border: '1px solid #334155',
                      padding: '10px 14px',
                      borderRadius: 8,
                      color: '#ffffff',
                      fontSize: 13
                    }}
                  />
                  <button
                    onClick={() => alert('Question posted to mentor forum!')}
                    style={{
                      background: '#4f46e5',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Post Question
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: COLLAPSIBLE MODULES & LESSONS SIDEBAR */}
        <div className="custom-scrollbar" style={{ background: '#0f172a', overflowY: 'auto', maxHeight: 'calc(100vh - 65px)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #1e293b' }}>
            <h4 style={{ fontSize: 15, fontWeight: 800, color: '#ffffff' }}>Course Content</h4>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>
              {(course.modules || []).length} Modules • {completedLessonIds.length} lessons completed
            </span>
          </div>

          <div>
            {(course.modules || []).map((mod, mIdx) => (
              <div key={mod._id || mIdx} style={{ borderBottom: '1px solid #1e293b' }}>
                <div style={{
                  background: '#131b2e',
                  padding: '14px 18px',
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>{mod.title}</span>
                  <span style={{ fontSize: 11, color: '#64748b' }}>
                    {(mod.lessons || []).length} lectures
                  </span>
                </div>

                <div>
                  {(mod.lessons || []).map((les, lIdx) => {
                    const isSelected = currentLesson?._id === les._id;
                    const isCompleted = completedLessonIds.includes(les._id);

                    return (
                      <div
                        key={les._id || lIdx}
                        onClick={() => selectLesson(mIdx, lIdx)}
                        style={{
                          padding: '12px 18px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                          borderLeft: isSelected ? '4px solid #6366f1' : '4px solid transparent',
                          cursor: 'pointer',
                          transition: 'background 0.15s'
                        }}
                      >
                        {/* Status Icon */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleComplete(les._id);
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {isCompleted ? (
                            <CheckCircle size={18} color="#22c55e" fill="#22c55e" />
                          ) : (
                            <Circle size={18} color="#475569" />
                          )}
                        </div>

                        <div style={{ flex: 1 }}>
                          <p style={{
                            fontSize: 13,
                            fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? '#ffffff' : '#cbd5e1',
                            lineHeight: 1.3
                          }}>
                            {les.title}
                          </p>
                          <span style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                            <Play size={10} fill="#64748b" /> {les.duration || '15 min'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
