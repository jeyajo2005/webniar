import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  ArrowRight, 
  Sparkles, 
  X,
  Compass
} from 'lucide-react';

export default function FullScreenVideoPromo({ 
  webinar, 
  onExploreCourses, 
  onJoinNow,
  onClose
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isEnding, setIsEnding] = useState(false);

  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const videoSource = '/videos/gemini_generated_video_323b2790.mp4';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Autoplay restricted by browser, playing muted:', err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
        }
      });
    }
  }, []);

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
    setDuration(formatTime(total));
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
    if (!newMuted && videoRef.current.volume === 0) {
      videoRef.current.volume = 0.8;
      setVolume(0.8);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      if (val === 0) {
        videoRef.current.muted = true;
        setIsMuted(true);
      } else {
        videoRef.current.muted = false;
        setIsMuted(false);
      }
    }
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * videoRef.current.duration;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    setIsEnding(true);
    setTimeout(() => {
      if (onExploreCourses) onExploreCourses();
    }, 800);
  };

  // Hide controls on inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#020617',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        opacity: isEnding ? 0 : 1,
        transition: 'opacity 0.8s ease-in-out',
        fontFamily: 'var(--font-body, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)'
      }}
    >
      {/* 1. Cinematic Background Video */}
      <video
        ref={videoRef}
        src={videoSource}
        autoPlay
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onClick={togglePlay}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          cursor: 'pointer'
        }}
      />

      {/* 2. Radial Dark Gradient for Readability */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(15,23,42,0.3) 0%, rgba(2,6,23,0.85) 100%)',
          pointerEvents: 'none'
        }} 
      />

      {/* 3. Top Header Bar with Brand & Sound Pill */}
      <div 
        style={{
          position: 'relative',
          zIndex: 30,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 36px',
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
          }}>
            <Sparkles size={20} />
          </div>
          <span style={{ color: '#ffffff', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em' }}>
            Learn<span style={{ color: '#a78bfa' }}>Flow</span> Academy
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Quick Sound Toggle */}
          <button
            onClick={toggleMute}
            style={{
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              transition: 'all 0.2s'
            }}
          >
            {isMuted ? <VolumeX size={16} color="#f87171" /> : <Volume2 size={16} color="#4ade80" />}
            <span>{isMuted ? 'Muted (Click to Unmute)' : 'Sound On'}</span>
          </button>

          {/* Close / Skip button */}
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Close Video"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* 4. Center Hero Typography & Primary CTA Buttons */}
      <div 
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 880,
          margin: '0 auto',
          transform: showControls ? 'translateY(0)' : 'translateY(15px)',
          transition: 'transform 0.4s ease'
        }}
      >
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(79, 70, 229, 0.25)',
          border: '1px solid rgba(129, 140, 248, 0.4)',
          borderRadius: 9999,
          padding: '6px 16px',
          color: '#c7d2fe',
          fontSize: 13,
          fontWeight: 600,
          backdropFilter: 'blur(8px)'
        }}>
          <Sparkles size={14} color="#a78bfa" />
          <span>Interactive Masterclass & Certified Courses 2026</span>
        </div>

        <h1 
          style={{
            fontSize: 'clamp(32px, 5.2vw, 56px)',
            fontWeight: 800,
            color: '#ffffff',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            textShadow: '0 4px 30px rgba(0,0,0,0.6)'
          }}
        >
          Upgrade Your Skills. <br />
          <span style={{ 
            background: 'linear-gradient(135deg, #a78bfa 0%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Transform Your Future.
          </span>
        </h1>

        <p 
          style={{
            fontSize: 'clamp(15px, 1.8vw, 18px)',
            color: '#cbd5e1',
            maxWidth: 680,
            lineHeight: 1.6,
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          Learn cutting-edge AI architectures, full-stack development, and enterprise cloud engineering with industry mentors. Watch video lessons, complete projects, and earn verifiable certifications.
        </p>

        {/* Action Buttons: "Explore Courses" and "Join Now" */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 10 }}>
          <button
            onClick={onExploreCourses}
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '16px 36px',
              borderRadius: 9999,
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 10px 30px rgba(79, 70, 229, 0.5), 0 0 20px rgba(124, 58, 237, 0.3)',
              transition: 'all 0.25s',
              backdropFilter: 'blur(8px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 14px 40px rgba(79, 70, 229, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(79, 70, 229, 0.5), 0 0 20px rgba(124, 58, 237, 0.3)';
            }}
          >
            <Compass size={20} />
            <span>Explore Courses</span>
          </button>

          <button
            onClick={onJoinNow}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              padding: '16px 36px',
              borderRadius: 9999,
              fontSize: 17,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              backdropFilter: 'blur(12px)',
              transition: 'all 0.25s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>Join Now</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* 5. Bottom Interactive Video Controls Player Bar */}
      <div 
        style={{
          position: 'relative',
          zIndex: 30,
          padding: '24px 36px 32px',
          background: 'linear-gradient(to top, rgba(2,6,23,0.95) 0%, transparent 100%)',
          opacity: showControls ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      >
        {/* Timeline Progress Bar */}
        <div 
          onClick={handleSeek}
          style={{
            width: '100%',
            height: 6,
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 9999,
            cursor: 'pointer',
            position: 'relative',
            marginBottom: 16
          }}
        >
          <div 
            style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #4f46e5 0%, #38bdf8 100%)',
              borderRadius: 9999,
              position: 'relative'
            }}
          >
            <div 
              style={{
                position: 'absolute',
                right: -6,
                top: -4,
                width: 14,
                height: 14,
                background: '#ffffff',
                borderRadius: '50%',
                boxShadow: '0 0 10px rgba(0,0,0,0.5)'
              }} 
            />
          </div>
        </div>

        {/* Player Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <button
              onClick={togglePlay}
              style={{
                background: '#ffffff',
                color: '#0f172a',
                border: 'none',
                width: 44,
                height: 44,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
                transition: 'transform 0.15s'
              }}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} fill="#0f172a" /> : <Play size={20} fill="#0f172a" style={{ marginLeft: 2 }} />}
            </button>

            {/* Volume Control */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={toggleMute}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                style={{
                  width: 75,
                  accentColor: '#818cf8',
                  cursor: 'pointer'
                }}
              />
            </div>

            {/* Timestamp */}
            <span style={{ color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>
              {currentTime} / {duration}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={toggleFullscreen}
              style={{
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                width: 40,
                height: 40,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
