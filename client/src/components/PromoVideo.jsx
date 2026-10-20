import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Sparkles, 
  CheckCircle2,
  Tv,
  Code,
  Languages,
  Layers,
  FastForward,
  ShieldAlert
} from 'lucide-react';

export default function PromoVideo({ onRegisterClick, selectedClassIndex = 0, onSelectClass }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(25);
  const [activeView, setActiveView] = useState('presenter'); // 'presenter' | 'code'
  const [language, setLanguage] = useState('en'); // 'en' | 'ta' (English / Tamil)
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentClass, setCurrentClass] = useState(selectedClassIndex);

  // Sync if parent updates selectedClassIndex
  useEffect(() => {
    if (selectedClassIndex !== undefined && selectedClassIndex !== currentClass) {
      setCurrentClass(selectedClassIndex);
    }
  }, [selectedClassIndex]);

  // Lessons definition
  const classLessons = [
    {
      id: 1,
      title: 'Class 1: AI Foundations & Neural Architecture',
      date: 'Nov 1st',
      duration: '03:15 Preview',
      transcriptEn: 'Welcome to Class 1! Today we lay down the neural blueprints, prompt chaining algorithms, and set up your developer environment for autonomous AI agents.',
      transcriptTa: 'வகுப்பு 1-க்கு உங்களை அன்புடன் வரவேற்கிறோம்! இன்று நாம் AI நியூரல் கட்டமைப்பு மற்றும் ப்ராம்ப்ட் இன்ஜினியரிங் அடிப்படைகளை கற்றுக்கொள்வோம்.',
      codeSnippet: 'agent = AutonomousAgent(model="claude-3-5-sonnet", tools=[WebSearch(), CodeRunner()])'
    },
    {
      id: 2,
      title: 'Class 2: Autonomous Agents & Tool Calling',
      date: 'Nov 2nd',
      duration: '04:10 Preview',
      transcriptEn: 'In Class 2, we construct multi-agent coordination swarms. You will watch agents call external APIs and persist memory dynamically.',
      transcriptTa: 'வகுப்பு 2-ல், பல AI ஏஜென்ட்களை இணைத்து தானாக இயங்கும் ஒருங்கிணைந்த சிஸ்டங்களை உருவாக்குவோம்.',
      codeSnippet: 'orchestrator.dispatch(task="audit_codebase", delegates=["coder", "tester"])'
    },
    {
      id: 3,
      title: 'Class 3: Full-Stack React AI SaaS Dashboard',
      date: 'Nov 3rd',
      duration: '03:50 Preview',
      transcriptEn: 'Class 3 dives into modern React architecture. We implement SSE token streaming and interactive glassmorphic dashboards.',
      transcriptTa: 'வகுப்பு 3-ல், ரியல் டைம் AI ஸ்ட்ரீமிங் மற்றும் நவீன React டாஷ்போர்டை முழுமையாக உருவாக்குவோம்.',
      codeSnippet: 'const { streamTokens } = useAIStream({ endpoint: "/api/chat", bufferSize: 16 })'
    },
    {
      id: 4,
      title: 'Class 4: Monetization, Razorpay & Invoicing',
      date: 'Nov 4th',
      duration: '03:30 Preview',
      transcriptEn: 'In Class 4, we build the revenue engine! Connecting Razorpay UPI payments, instant GST tax invoicing, and credit token deduction.',
      transcriptTa: 'வகுப்பு 4-ல், Razorpay UPI கட்டண வசதிகள் மற்றும் தானியங்கி GST இன்வாய்ஸ் தயாரிப்பை இணைப்போம்.',
      codeSnippet: 'await razorpay.createOrder({ amount: 49900, currency: "INR", receipt: "inv_42" })'
    },
    {
      id: 5,
      title: 'Class 5: Live Cloud Deployment & Grand Mastermind',
      date: 'Nov 5th (LIVE)',
      duration: '05:00 Preview',
      transcriptEn: 'Class 5 is our Grand Live Finale on Nov 5th! We deploy live to the cloud, hand out GitHub starter repos, and launch the VIP WhatsApp mastermind!',
      transcriptTa: 'வகுப்பு 5 நமது நேரலை மாஸ்டர்கிளாஸ்! Nov 5-ல் நேரலையாக கிளவுடில் பப்ளிஷ் செய்து VIP கம்யூனிட்டியில் இணைவோம்!',
      codeSnippet: 'deploy.cloud(target="production", domain="webinarflow.io", ssl=True)'
    }
  ];

  const lesson = classLessons[currentClass] || classLessons[0];

  // Browser Speech Synthesis for realistic AI Presenter voice
  const speakCurrentLesson = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (!isPlaying || isMuted) return;

      const utterance = new SpeechSynthesisUtterance(
        language === 'en' ? lesson.transcriptEn : lesson.transcriptTa
      );
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.05;
      utterance.lang = language === 'en' ? 'en-US' : 'ta-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      speakCurrentLesson();
    } else {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, currentClass, language, isMuted, playbackSpeed]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5];
    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(next);
  };

  const handleSelectClass = (idx) => {
    setCurrentClass(idx);
    if (onSelectClass) onSelectClass(idx);
    setProgress(15);
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 840, margin: '0 auto' }}>
      
      {/* Surrounding Ambient Radial Glow */}
      <div style={{
        position: 'absolute',
        inset: -4,
        background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(236, 72, 153, 0.3))',
        borderRadius: 28,
        filter: 'blur(20px)',
        opacity: isPlaying ? 0.8 : 0.45,
        transition: 'opacity 0.4s ease',
        zIndex: 0
      }}></div>

      {/* Main Video Frame */}
      <div className="glass-card" style={{
        position: 'relative',
        zIndex: 1,
        borderRadius: 24,
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        background: '#090d16',
        boxShadow: 'var(--shadow-card)'
      }}>
        
        {/* Top Header Floating Badges */}
        <div style={{
          position: 'absolute',
          top: 14,
          left: 14,
          right: 14,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className="badge-live" style={{ background: 'rgba(239, 68, 68, 0.9)', color: '#fff', border: 'none' }}>
              <span className="pulse-dot" style={{ background: '#fff' }}></span>
              AI Neural Presenter
            </span>
            <span className="badge-tag" style={{ background: 'rgba(15, 23, 42, 0.85)', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Sparkles size={12} color="#818cf8" />
              {lesson.date} Class Preview
            </span>
          </div>

          {/* View Mode & Language Toggles */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Presenter vs Code Switcher */}
            <div style={{
              background: 'rgba(15, 23, 42, 0.85)',
              borderRadius: 20,
              padding: 3,
              display: 'flex',
              border: '1px solid rgba(255,255,255,0.15)'
            }}>
              <button
                onClick={() => setActiveView('presenter')}
                style={{
                  background: activeView === 'presenter' ? '#4f46e5' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: 16,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <Tv size={12} /> Presenter
              </button>
              <button
                onClick={() => setActiveView('code')}
                style={{
                  background: activeView === 'code' ? '#4f46e5' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: 16,
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <Code size={12} /> Code Demo
              </button>
            </div>

            {/* Subtitle Language Switcher (EN / Tamil) */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
              title="Toggle Subtitle Language"
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#38bdf8',
                border: '1px solid rgba(56, 189, 248, 0.4)',
                padding: '5px 10px',
                borderRadius: 16,
                fontSize: 11,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Languages size={13} />
              {language === 'en' ? 'EN Subtitles' : 'தமிழ் (Tamil)'}
            </button>
          </div>
        </div>

        {/* Video Screen Content (Presenter View or Code View) */}
        <div
          onClick={togglePlay}
          style={{
            position: 'relative',
            width: '100%',
            height: 410,
            background: '#0a0f1d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            overflow: 'hidden'
          }}
        >
          {/* View 1: Photorealistic AI Presenter */}
          {activeView === 'presenter' ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src="/images/ai_presenter.jpg"
                alt="AI Masterclass Presenter"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: isPlaying ? 'brightness(1.05) contrast(1.02)' : 'brightness(0.75)',
                  transform: isPlaying ? 'scale(1.02)' : 'scale(1)',
                  transition: 'all 0.5s ease'
                }}
              />

              {/* Animated Equalizer Waveform overlay when speaking */}
              {isPlaying && (
                <div style={{
                  position: 'absolute',
                  top: 70,
                  right: 20,
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: 3,
                  height: 30,
                  padding: '6px 10px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>
                  <span style={{ fontSize: 11, color: '#34d399', fontWeight: 700, marginRight: 4 }}>AI Voice</span>
                  {[18, 28, 14, 25, 20, 12, 24].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 3,
                        height: `${h}px`,
                        background: '#34d399',
                        borderRadius: 2,
                        animation: `pulse-ring ${0.6 + i * 0.1}s infinite alternate`
                      }}
                    ></div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* View 2: Futuristic AI Code Screen */
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <img
                src="/images/ai_code_demo.jpg"
                alt="AI Neural Code Demo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: isPlaying ? 'brightness(1.05)' : 'brightness(0.75)'
                }}
              />
            </div>
          )}

          {/* Central Play Button Overlay (when paused) */}
          {!isPlaying && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(3px)',
              zIndex: 10
            }}>
              <div style={{
                width: 84,
                height: 84,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f46e5, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(99, 102, 241, 0.9)',
                transition: 'transform 0.2s',
                marginBottom: 16
              }}>
                <Play size={38} color="#ffffff" style={{ marginLeft: 4 }} />
              </div>
              <h3 style={{ color: '#ffffff', fontSize: 22, fontWeight: 800, marginBottom: 4, textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                {lesson.title}
              </h3>
              <p style={{ color: '#e2e8f0', fontSize: 14, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                Click to Watch AI Instructor Walkthrough ({lesson.duration})
              </p>
            </div>
          )}

          {/* Live Subtitle Overlay Ribbon */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 20,
            right: 20,
            zIndex: 15,
            background: 'rgba(10, 15, 29, 0.88)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 12,
            padding: '10px 18px',
            textAlign: 'center',
            color: '#f8fafc',
            fontSize: 14,
            fontWeight: 500,
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
          }}>
            <span style={{ color: '#818cf8', fontWeight: 700, marginRight: 6 }}>
              [AI Subtitles - {language === 'en' ? 'English' : 'தமிழ்'}]:
            </span>
            "{language === 'en' ? lesson.transcriptEn : lesson.transcriptTa}"
          </div>

        </div>

        {/* Video Control Bar */}
        <div style={{
          background: '#0f172a',
          padding: '12px 20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10
        }}>
          {/* Progress Bar */}
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress(Math.round((clickX / rect.width) * 100));
            }}
            style={{
              width: '100%',
              height: 5,
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 3,
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4f46e5, #ec4899)',
              borderRadius: 3
            }}></div>
          </div>

          {/* Controls Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button
                onClick={togglePlay}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
              <button
                onClick={toggleMute}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>
                01:24 / {lesson.duration.split(' ')[0]}
              </span>
              <button
                onClick={cycleSpeed}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#cbd5e1',
                  borderRadius: 6,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {playbackSpeed}x
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={onRegisterClick}
                style={{
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '7px 16px',
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(79, 70, 229, 0.4)'
                }}
              >
                Reserve Seat For Full 5 Classes
              </button>
              <Maximize2 size={16} color="#94a3b8" style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </div>

        {/* 5-Class Interactive Selector Strip */}
        <div style={{
          background: '#090d16',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '10px 16px',
          display: 'flex',
          gap: 8,
          overflowX: 'auto'
        }}>
          {classLessons.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSelectClass(idx)}
              style={{
                flex: '0 0 auto',
                background: currentClass === idx ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255,255,255,0.04)',
                border: currentClass === idx ? '1px solid #6366f1' : '1px solid rgba(255,255,255,0.08)',
                color: currentClass === idx ? '#ffffff' : '#94a3b8',
                padding: '6px 12px',
                borderRadius: 8,
                fontSize: 12,
                fontWeight: currentClass === idx ? 700 : 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                transition: 'all 0.2s'
              }}
            >
              <span style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: currentClass === idx ? '#6366f1' : 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700
              }}>
                {idx + 1}
              </span>
              <span>{item.date}: Class {idx + 1}</span>
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}
