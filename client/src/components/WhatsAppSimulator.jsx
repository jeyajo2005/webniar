import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  CheckCheck, 
  FileText, 
  ExternalLink, 
  Play, 
  Send, 
  Sparkles, 
  Clock, 
  Calendar,
  ShieldCheck,
  ChevronRight,
  BellRing,
  Volume2
} from 'lucide-react';
import { api } from '../services/api.js';

export default function WhatsAppSimulator({ 
  attendeeName = 'Karthik Raja', 
  phone = '+91 98765 43210', 
  invoiceNumber = 'INV-2026-0042',
  amount = 499,
  onJoinCommunity
}) {
  const [activeStep, setActiveStep] = useState('all'); // 'nov1', 'nov3', 'nov5_1hr', 'nov5_started', 'all'
  const [visibleMessages, setVisibleMessages] = useState(['nov1', 'nov3', 'nov5_1hr', 'nov5_started']);
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastDelivered, setLastDelivered] = useState('Just now');
  const [toastMessage, setToastMessage] = useState(null);

  // Play audio chime on simulated arrival
  const playAlertChime = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // AudioContext might be blocked before user gesture
    }
  };

  const showToast = (text) => {
    setToastMessage(text);
    playAlertChime();
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Trigger individual step via backend API
  const handleTriggerStep = async (stepKey) => {
    setIsSimulating(true);
    try {
      const res = await api.simulateDrip({
        name: attendeeName,
        phone,
        step: stepKey,
        invoiceNumber,
        amount
      });
      if (res.success) {
        if (!visibleMessages.includes(stepKey)) {
          setVisibleMessages(prev => [...prev, stepKey]);
        }
        showToast(
          stepKey === 'nov5_started' 
            ? '🚀 Nov 5th "CLASS STARTED" WhatsApp Alert Triggered!' 
            : `Delivered ${stepKey.toUpperCase()} WhatsApp notification!`
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  // Step-by-step automatic time-lapse sequence
  const handleAutoRunSequence = async () => {
    setVisibleMessages([]);
    setIsSimulating(true);

    const steps = [
      { key: 'nov1', label: 'Nov 1st: Payment & Community Link' },
      { key: 'nov3', label: 'Nov 3rd: 48h Preparation Alert' },
      { key: 'nov5_1hr', label: 'Nov 5th: 1-Hour Warning' },
      { key: 'nov5_started', label: 'Nov 5th: CLASS STARTED Alert 🚀' }
    ];

    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      await new Promise(r => setTimeout(r, 900));
      setVisibleMessages(prev => [...prev, s.key]);
      playAlertChime();
      setToastMessage(`Simulated Timeline: ${s.label}`);
    }

    setIsSimulating(false);
    setTimeout(() => setToastMessage('✅ Complete Nov 1 ➔ Nov 5 sequence executed!'), 1200);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: 90,
          right: 24,
          zIndex: 9999,
          background: '#0f172a',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          border: '1px solid #10b981',
          animation: 'float 0.3s ease-out'
        }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }}></div>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{toastMessage}</span>
        </div>
      )}

      {/* Grid: Simulator Explainer & Timeline (Left) + WhatsApp Phone Mockup (Right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 32,
        alignItems: 'center'
      }}>
        
        {/* Left Side: Sequence Explanation & Fast Controls */}
        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span className="badge-tag" style={{ background: '#dcfce7', color: '#15803d', borderColor: '#bbf7d0' }}>
              <MessageCircle size={14} /> Automated WhatsApp Funnel
            </span>
            <span className="badge-tag" style={{ background: '#fef3c7', color: '#b45309' }}>
              Nov 1st ➔ Nov 5th Sequence
            </span>
          </div>

          <h3 style={{ fontSize: 'clamp(24px, 3vw, 32px)', marginBottom: 12, color: '#0f172a' }}>
            Instant Payment on <span className="text-gradient">Nov 1st</span> ➔ Live Alert on <span style={{ color: '#059669' }}>Nov 5th</span>
          </h3>

          <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            When an attendee pays on <strong>Nov 1st</strong>, WebinarFlow automatically delivers their tax invoice, VIP WhatsApp community invite, and schedules a high-converting reminder sequence that fires the <strong>"Class Started"</strong> WhatsApp broadcast on <strong>Nov 5th</strong>.
          </p>

          {/* Timeline Sequence Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            
            <div 
              onClick={() => handleTriggerStep('nov1')}
              style={{
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                background: visibleMessages.includes('nov1') ? '#f0fdf4' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700
                }}>1</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Nov 1st: Payment & Community Link</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Instant delivery • GST Invoice #{invoiceNumber} + VIP Group</div>
                </div>
              </div>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
                Test Send
              </button>
            </div>

            <div 
              onClick={() => handleTriggerStep('nov3')}
              style={{
                padding: '12px 16px',
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                background: visibleMessages.includes('nov3') ? '#f0fdf4' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: '#6366f1',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 700
                }}>2</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0f172a' }}>Nov 3rd: 48h Preparation Alert</div>
                  <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>2 Days to go • GitHub Starter Kit Repo reminder</div>
                </div>
              </div>
              <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
                Test Send
              </button>
            </div>

            <div 
              onClick={() => handleTriggerStep('nov5_started')}
              style={{
                padding: '14px 16px',
                borderRadius: 12,
                border: '2px solid #10b981',
                background: visibleMessages.includes('nov5_started') ? '#f0fdf4' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.15)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 14,
                  fontWeight: 800
                }}>🚀</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: '#0f172a' }}>Nov 5th: CLASS STARTED Alert!</div>
                  <div style={{ fontSize: 12, color: '#059669', fontWeight: 600 }}>07:00 PM • Live Broadcast Room URL & Passcode</div>
                </div>
              </div>
              <button 
                className="btn-primary" 
                style={{ 
                  padding: '6px 14px', 
                  fontSize: 12, 
                  background: '#10b981', 
                  borderColor: '#059669' 
                }}
              >
                Fire Alert
              </button>
            </div>

          </div>

          {/* Quick Auto-Run Button */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={handleAutoRunSequence}
              disabled={isSimulating}
              className="btn-primary"
              style={{ padding: '12px 22px', fontSize: 14, borderRadius: 10 }}
            >
              <Play size={16} />
              {isSimulating ? 'Simulating Sequence...' : 'Play Nov 1 ➔ Nov 5 Time-Lapse'}
            </button>
            <button
              onClick={() => setVisibleMessages(['nov1', 'nov3', 'nov5_1hr', 'nov5_started'])}
              className="btn-secondary"
              style={{ padding: '12px 18px', fontSize: 14, borderRadius: 10 }}
            >
              Show All Messages
            </button>
          </div>
        </div>

        {/* Right Side: Realistic WhatsApp Phone Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: '100%',
            maxWidth: 380,
            background: '#ffffff',
            borderRadius: 36,
            border: '8px solid #0f172a',
            boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: 600,
            position: 'relative'
          }}>
            
            {/* Phone Notch */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 130,
              height: 20,
              background: '#0f172a',
              borderBottomLeftRadius: 14,
              borderBottomRightRadius: 14,
              zIndex: 50
            }}></div>

            {/* WhatsApp App Bar */}
            <div style={{
              background: '#075e54',
              color: '#ffffff',
              padding: '28px 16px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#25d366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 16
                }}>
                  WF
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontWeight: 700, fontSize: 14 }}>
                    AI Masterclass 2026
                    <ShieldCheck size={14} color="#34d399" />
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.85 }}>Official Broadcast Channel • Online</div>
                </div>
              </div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>⚡ Active</div>
            </div>

            {/* Chat Body with Classic WhatsApp Wallpaper Pattern */}
            <div style={{
              flex: 1,
              background: '#efeae2',
              padding: '16px 14px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 14
            }}>
              
              {/* Encryption Notice */}
              <div style={{
                background: '#ffeecd',
                color: '#54656f',
                fontSize: 11,
                padding: '6px 12px',
                borderRadius: 8,
                textAlign: 'center',
                boxShadow: '0 1px 1px rgba(0,0,0,0.06)'
              }}>
                🔒 Messages and calls are end-to-end encrypted.
              </div>

              {/* Message 1: Nov 1st Payment & Community Link */}
              {visibleMessages.includes('nov1') && (
                <div style={{
                  alignSelf: 'flex-start',
                  maxWidth: '92%',
                  background: '#ffffff',
                  borderRadius: '0 12px 12px 12px',
                  padding: '10px 12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: '#111b21',
                  animation: 'float 0.3s ease-out'
                }}>
                  <div style={{ fontWeight: 800, color: '#075e54', marginBottom: 4 }}>
                    🎉 Payment Successful (₹{amount})
                  </div>
                  <p style={{ margin: '0 0 6px' }}>
                    Hey <strong>{attendeeName}</strong>, your VIP All-Access Pass is confirmed!
                  </p>
                  
                  {/* Invoice Attachment Snippet */}
                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 8,
                    padding: '8px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 8
                  }}>
                    <FileText size={18} color="#dc2626" />
                    <div style={{ fontSize: 12, flex: 1 }}>
                      <strong>GST Invoice {invoiceNumber}.pdf</strong>
                      <div style={{ color: 'var(--text-dim)', fontSize: 10 }}>42 KB • Official Receipt</div>
                    </div>
                  </div>

                  {/* Community Invitation Button */}
                  <a
                    href="https://chat.whatsapp.com/demoWebinarFlowVip2026"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      background: '#25d366',
                      color: '#fff',
                      fontWeight: 700,
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: 12,
                      textDecoration: 'none',
                      margin: '6px 0'
                    }}
                  >
                    <MessageCircle size={14} /> Join VIP WhatsApp Group
                  </a>

                  <div style={{
                    fontSize: 10,
                    color: '#667781',
                    textAlign: 'right',
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 4
                  }}>
                    <span>Nov 1, 10:30 AM</span>
                    <CheckCheck size={14} color="#53bdeb" />
                  </div>
                </div>
              )}

              {/* Message 2: Nov 3rd Reminder */}
              {visibleMessages.includes('nov3') && (
                <div style={{
                  alignSelf: 'flex-start',
                  maxWidth: '90%',
                  background: '#ffffff',
                  borderRadius: '0 12px 12px 12px',
                  padding: '10px 12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: '#111b21'
                }}>
                  <div style={{ fontWeight: 700, color: '#4f46e5', marginBottom: 4 }}>
                    ⏳ 2 Days to Go!
                  </div>
                  <p style={{ margin: 0 }}>
                    Hey {attendeeName}, just 48 hours left for our Grand Live AI Masterclass on <strong>Nov 5th at 7:00 PM IST</strong>. Get your GitHub repo cloned!
                  </p>
                  <div style={{
                    fontSize: 10,
                    color: '#667781',
                    textAlign: 'right',
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 4
                  }}>
                    <span>Nov 3, 06:00 PM</span>
                    <CheckCheck size={14} color="#53bdeb" />
                  </div>
                </div>
              )}

              {/* Message 3: Nov 5th 1-Hour Alert */}
              {visibleMessages.includes('nov5_1hr') && (
                <div style={{
                  alignSelf: 'flex-start',
                  maxWidth: '90%',
                  background: '#ffffff',
                  borderRadius: '0 12px 12px 12px',
                  padding: '10px 12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: '#111b21'
                }}>
                  <div style={{ fontWeight: 700, color: '#d97706', marginBottom: 4 }}>
                    🚨 1 HOUR TO GO!
                  </div>
                  <p style={{ margin: 0 }}>
                    Broadcast opens in 60 minutes. Grab your notepad!
                  </p>
                  <div style={{
                    fontSize: 10,
                    color: '#667781',
                    textAlign: 'right',
                    marginTop: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 4
                  }}>
                    <span>Nov 5, 06:00 PM</span>
                    <CheckCheck size={14} color="#53bdeb" />
                  </div>
                </div>
              )}

              {/* Message 4: Nov 5th CLASS STARTED Alert! */}
              {visibleMessages.includes('nov5_started') && (
                <div style={{
                  alignSelf: 'flex-start',
                  maxWidth: '94%',
                  background: '#dcf8c6', // WhatsApp highlighted bubble
                  border: '1px solid #bbf7d0',
                  borderRadius: '0 12px 12px 12px',
                  padding: '12px 14px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: '#111b21'
                }}>
                  <div style={{
                    fontWeight: 800,
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginBottom: 4,
                    fontSize: 14
                  }}>
                    <span>🚀 CLASS STARTED! WE ARE LIVE!</span>
                  </div>
                  <p style={{ margin: '0 0 8px' }}>
                    Hey <strong>{attendeeName}</strong>, Dr. Alex Vance is on stage right now!
                  </p>

                  <div style={{
                    background: 'rgba(255,255,255,0.85)',
                    padding: '8px 10px',
                    borderRadius: 8,
                    fontSize: 12,
                    marginBottom: 8,
                    border: '1px dashed #059669'
                  }}>
                    🔑 Private Passcode: <strong>AI-LIVE-2026</strong>
                  </div>

                  <a
                    href="#live-room"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Navigating to Live Masterclass Room with Passcode: AI-LIVE-2026');
                    }}
                    style={{
                      display: 'block',
                      background: '#10b981',
                      color: '#ffffff',
                      textAlign: 'center',
                      padding: '10px',
                      borderRadius: 8,
                      fontWeight: 800,
                      fontSize: 13,
                      textDecoration: 'none'
                    }}
                  >
                    👉 Click to Enter Live Stream Now &rarr;
                  </a>

                  <div style={{
                    fontSize: 10,
                    color: '#667781',
                    textAlign: 'right',
                    marginTop: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 4
                  }}>
                    <span>Nov 5, 07:00 PM</span>
                    <CheckCheck size={14} color="#53bdeb" />
                  </div>
                </div>
              )}

            </div>

            {/* Phone WhatsApp Bottom Input Bar */}
            <div style={{
              background: '#f0f2f5',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderTop: '1px solid #e2e8f0'
            }}>
              <div style={{
                flex: 1,
                background: '#ffffff',
                borderRadius: 20,
                padding: '8px 14px',
                fontSize: 12,
                color: '#64748b'
              }}>
                Broadcast channel (Read only)
              </div>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#075e54',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <Send size={14} />
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
