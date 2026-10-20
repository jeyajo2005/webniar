import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Download, 
  MessageCircle, 
  Video, 
  Sparkles, 
  FileText, 
  Share2, 
  ExternalLink,
  ShieldCheck,
  Copy,
  Clock,
  CheckCheck,
  BellRing,
  AlertTriangle,
  ArrowLeft,
  Printer,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ThankYouPage({ registration, webinar, onNavigate }) {
  const [copiedPasscode, setCopiedPasscode] = useState(false);

  useEffect(() => {
    // Fire celebratory confetti only if verified registration exists
    if (registration && registration.paymentStatus === 'completed') {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    }
  }, [registration]);

  // Safeguard: Never display success confirmation for unverified or missing payment!
  if (!registration || registration.paymentStatus !== 'completed') {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
        <div style={{
          background: '#fff1f2',
          border: '1px solid #fecdd3',
          borderRadius: 20,
          padding: 36,
          boxShadow: 'var(--shadow-card)'
        }}>
          <AlertTriangle size={48} color="#e11d48" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 24, color: '#9f1239', marginBottom: 12 }}>
            Unverified Payment or Incomplete Registration
          </h2>
          <p style={{ color: '#881337', fontSize: 15, lineHeight: 1.6, marginBottom: 24 }}>
            We could not verify a successful registration payment. Only attendees with confirmed server verification can access this confirmation portal.
          </p>
          <button
            onClick={() => onNavigate('landing')}
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: 15, borderRadius: 10 }}
          >
            <span>Return to Registration & Checkout</span>
          </button>
        </div>
      </div>
    );
  }

  const participantName = registration.name || 'Participant';
  const participantEmail = registration.email || 'attendee@example.com';
  const participantPhone = registration.phone || '+91 98765 43210';
  const registrationId = registration._id || registration.registrationId || 'REG-2026-VIP';
  const invoiceNumber = registration.invoiceNumber || 'INV-2026-0001';
  const webinarTitle = webinar?.title || 'Full-Stack AI & Autonomous Agents Masterclass';
  const webinarDate = 'November 4, 2026';
  const webinarTime = webinar?.time || '07:00 PM IST';
  const timezone = webinar?.timezone || 'IST (UTC+5:30)';
  const amountPaid = registration.amountPaid || webinar?.vipPrice || 499;
  const whatsappUrl = webinar?.whatsappCommunityUrl || 'https://chat.whatsapp.com/demoWebinarFlowVip2026';
  const accessPasscode = 'AI-LIVE-2026';

  const downloadInvoicePdfUrl = `http://localhost:5000/api/invoices/${invoiceNumber}/pdf`;
  const viewInvoiceHtmlUrl = `http://localhost:5000/api/invoices/${invoiceNumber}/download`;

  // Google Calendar URL for November 4, 2026
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(webinarTitle)}&dates=20261104T133000Z/20261104T163000Z&details=${encodeURIComponent(`Live Masterclass with Dr. Elena Vance.\nPasscode: ${accessPasscode}\nRegistration ID: ${registrationId}`)}&location=Online+Live+Broadcast`;

  // Download .ics Calendar File
  const handleDownloadICS = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//WebinarFlow//Masterclass//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${webinarTitle}`,
      `DESCRIPTION:Join live room with Dr. Elena Vance. Passcode: ${accessPasscode}. Registration ID: ${registrationId}`,
      'DTSTART:20261104T133000Z',
      'DTEND:20261104T163000Z',
      'LOCATION:Online Live Broadcast Room',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `WebinarFlow-Nov4-Masterclass.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyPasscode = () => {
    navigator.clipboard.writeText(accessPasscode);
    setCopiedPasscode(true);
    setTimeout(() => setCopiedPasscode(false), 2500);
  };

  return (
    <div style={{ padding: '40px 20px 80px', maxWidth: 920, margin: '0 auto' }}>
      
      {/* SUCCESS CONFIRMATION HERO */}
      <div style={{
        background: '#ffffff',
        borderRadius: 24,
        border: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-card)',
        padding: '48px 36px',
        textAlign: 'center',
        marginBottom: 32
      }}>
        {/* Animated Green Check Badge */}
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#dcfce7',
          color: '#16a34a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)'
        }}>
          <CheckCircle2 size={48} />
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 4.5vw, 40px)', color: '#0f172a', marginBottom: 12, letterSpacing: '-0.02em' }}>
          Thank You for Registering!
        </h1>

        <p style={{ fontSize: 18, color: '#16a34a', fontWeight: 700, marginBottom: 8 }}>
          Your webinar registration is confirmed.
        </p>

        <p style={{ fontSize: 20, color: '#4f46e5', fontWeight: 800, marginBottom: 16 }}>
          Your webinar class is scheduled for November 4, 2026.
        </p>

        <p style={{ fontSize: 15, color: '#64748b', maxWidth: 640, margin: '0 auto 28px', lineHeight: 1.6 }}>
          Please join our official WhatsApp community and check your email for your registration confirmation and invoice.
        </p>

        {/* PRIMARY ACTIONS: WHATSAPP COMMUNITY & INVOICE DOWNLOAD */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 32 }}>
          {/* Join WhatsApp Community Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#16a34a',
              color: '#ffffff',
              padding: '16px 28px',
              borderRadius: 14,
              fontSize: 16,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(22, 163, 74, 0.4)',
              transition: 'all 0.2s'
            }}
          >
            <MessageCircle size={20} />
            <span>Join Official WhatsApp Community</span>
            <ExternalLink size={16} />
          </a>

          {/* Download PDF Invoice Button */}
          <a
            href={downloadInvoicePdfUrl}
            download={`Invoice_${invoiceNumber}.pdf`}
            style={{
              background: '#4f46e5',
              color: '#ffffff',
              padding: '16px 28px',
              borderRadius: 14,
              fontSize: 16,
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              boxShadow: '0 8px 25px rgba(79, 70, 229, 0.4)',
              transition: 'all 0.2s'
            }}
          >
            <Download size={20} />
            <span>Download Tax Invoice (PDF)</span>
          </a>
        </div>

        {/* CRITICAL SCHEDULE DISTINCTION CARD (Requirement 8) */}
        <div style={{
          background: '#fef3c7',
          border: '2px solid #f59e0b',
          borderRadius: 16,
          padding: '20px 24px',
          textAlign: 'left',
          marginBottom: 32,
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start'
        }}>
          <Info size={24} color="#b45309" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 800, color: '#92400e', marginBottom: 4 }}>
              Important: Class Date Scheduled for November 4, 2026
            </h4>
            <p style={{ fontSize: 14, color: '#78350f', lineHeight: 1.6, margin: 0 }}>
              Your payment and seat reservation are confirmed today. <strong>The live interactive webinar class will take place on November 4, 2026 at {webinarTime} ({timezone})</strong>. 
              Automated reminders will be delivered to your WhatsApp number and email before the class starts.
            </p>
          </div>
        </div>

        {/* PARTICIPANT & REGISTRATION DETAILS GRID */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 18,
          padding: 24,
          textAlign: 'left',
          marginBottom: 32
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 16, borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
            Registration & Payment Summary
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18 }}>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>PARTICIPANT NAME</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{participantName}</div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>WEBINAR DATE & TIME</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#4f46e5', marginTop: 2 }}>
                {webinarDate} • {webinarTime}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>REGISTRATION ID</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                <code>{registrationId}</code>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>PAYMENT STATUS</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#16a34a', marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={16} />
                <span>Verified & Paid (₹{amountPaid})</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>INVOICE NUMBER</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>
                <code>{invoiceNumber}</code>
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>CONTACT DISPATCHED</div>
              <div style={{ fontSize: 14, color: '#475569', marginTop: 2 }}>{participantEmail}</div>
            </div>
          </div>
        </div>

        {/* CHECK YOUR EMAIL FOR INVOICE INFO BOX (Requirement 4 & 6) */}
        <div style={{
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 16,
          padding: '20px 24px',
          textAlign: 'left',
          marginBottom: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 700, color: '#1e40af' }}>
              <FileText size={18} />
              <span>Check Your Email for Registration Confirmation & Invoice</span>
            </div>
            <p style={{ fontSize: 13, color: '#3b82f6', marginTop: 4, margin: '4px 0 0' }}>
              An automated confirmation with subject <em>“Webinar Registration Confirmed – November 4, 2026”</em> and your official PDF tax invoice was sent to <strong>{participantEmail}</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <a
              href={viewInvoiceHtmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#ffffff',
                border: '1px solid #93c5fd',
                color: '#1d4ed8',
                padding: '8px 16px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Printer size={15} />
              <span>View / Print Receipt</span>
            </a>
          </div>
        </div>

        {/* WEBINAR ACCESS & PASSCODE CARD (Requirement 8) */}
        <div style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)',
          borderRadius: 20,
          padding: '28px 32px',
          color: '#ffffff',
          textAlign: 'left',
          marginBottom: 32
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
            <div>
              <span style={{ background: '#4f46e5', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 800 }}>
                SECURED ACCESS PASS
              </span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginTop: 8 }}>
                Live Room Credentials for November 4, 2026
              </h3>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '8px 16px',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 10
            }}>
              <div>
                <div style={{ fontSize: 10, color: '#94a3b8', textTransform: 'uppercase' }}>Room Passcode</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fbbf24', letterSpacing: '0.05em' }}>{accessPasscode}</div>
              </div>
              <button
                onClick={copyPasscode}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#ffffff',
                  padding: 6,
                  borderRadius: 6,
                  cursor: 'pointer'
                }}
                title="Copy Passcode"
              >
                {copiedPasscode ? <CheckCheck size={16} color="#4ade80" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
            As per security access rules, the private broadcast joining link will be activated and sent to your verified email and WhatsApp on November 4, 2026.
          </p>
        </div>

        {/* 1-CLICK CALENDAR INTEGRATION */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ fontSize: 14, padding: '10px 20px', borderRadius: 10 }}
          >
            <Calendar size={16} color="#4f46e5" />
            <span>Add to Google Calendar</span>
          </a>

          <button
            onClick={handleDownloadICS}
            className="btn-secondary"
            style={{ fontSize: 14, padding: '10px 20px', borderRadius: 10 }}
          >
            <Download size={16} color="#4f46e5" />
            <span>Download iCal (.ics) File</span>
          </button>
        </div>
      </div>

      {/* Return to Home / Navigation */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => onNavigate('landing')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            fontSize: 14,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6
          }}
        >
          <ArrowLeft size={16} />
          <span>Return to Webinar Overview Page</span>
        </button>
      </div>
    </div>
  );
}
