import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';

export default function FullScreenVideoPromo({ 
  webinar, 
  onJoinWebinar, 
  onSkipToRegistration 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Muted by default to ensure 100% reliable browser autoplay
  const videoRef = useRef(null);

  const videoSource = '/videos/gemini_generated_video_323b2790.mp4';

  // Autoplay video immediately on first load
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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#020617',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* 1. Full-Screen Cinematic Video */}
      <video
        ref={videoRef}
        src={videoSource}
        autoPlay
        loop
        playsInline
        muted={isMuted}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* 2. Soft Ambient Vignette for maximum visual elegance */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(2,6,23,0.65) 100%)',
          pointerEvents: 'none'
        }} 
      />

      {/* 3. Subtle Audio Control on Top Right */}
      <button
        onClick={toggleMute}
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          zIndex: 30,
          background: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#ffffff',
          padding: '10px 18px',
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
        <span>{isMuted ? 'Sound Off (Click for Audio)' : 'Sound On'}</span>
      </button>

      {/* 4. ONLY "Join Webinar" BUTTON (As requested: video starting la joinwebinar mattum tha varanum) */}
      <div 
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          textAlign: 'center',
          padding: '0 20px'
        }}
      >
        <button
          onClick={onJoinWebinar}
          style={{
            background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #0284c7 100%)',
            color: '#ffffff',
            border: '2px solid rgba(255, 255, 255, 0.45)',
            padding: '22px 52px',
            borderRadius: 9999,
            fontSize: 'clamp(20px, 2.6vw, 26px)',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: '0 12px 40px rgba(29, 78, 216, 0.65), 0 0 35px rgba(37, 99, 235, 0.45)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            letterSpacing: '0.02em',
            backdropFilter: 'blur(8px)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)';
            e.currentTarget.style.boxShadow = '0 16px 50px rgba(29, 78, 216, 0.85), 0 0 45px rgba(37, 99, 235, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(29, 78, 216, 0.65), 0 0 35px rgba(37, 99, 235, 0.45)';
          }}
        >
          <span>Join Webinar</span>
          <ArrowRight size={28} strokeWidth={2.6} />
        </button>
      </div>
    </div>
  );
}
