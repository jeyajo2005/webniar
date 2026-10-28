import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Award, 
  Code, 
  Sparkles, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  ShieldCheck,
  Zap,
  Play,
  FileText,
  Users,
  ArrowRight,
  Tv
} from 'lucide-react';

export default function WebinarDetails({ webinar, onRegisterClick }) {
  const [openFaq, setOpenFaq] = useState(0);

  const presenter = webinar?.speaker || {
    name: 'Dr. Elena Vance',
    title: 'Principal AI Systems Architect & Founder, AI Innovations Lab',
    avatar: '/assets/female_presenter_blazer.jpg',
    bio: 'Over 12 years of enterprise engineering experience. Former AI Lead, trained 45,000+ engineers worldwide in LLM pipelines, autonomous multi-agent coordination, and scalable cloud monetization.',
    rating: '4.98 / 5.0 (3,800+ reviews)'
  };

  const masterclassModules = [
    {
      moduleNum: 1,
      time: '07:00 PM - 07:45 PM IST',
      title: 'Module 1: Architecture of Autonomous Agent Swarms',
      desc: 'Understand how state-of-the-art LLMs orchestrate multi-step autonomous tasks. Master zero-shot reasoning, prompt chaining, dynamic routing, and agent arbitration.',
      handsOn: 'Constructing agent coordination swarms that solve multi-step problems autonomously.',
      badge: 'Core Architecture',
      takeaway: 'Autonomous Agent Blueprint & System Prompts'
    },
    {
      moduleNum: 2,
      time: '07:45 PM - 08:30 PM IST',
      title: 'Module 2: Tool Calling, Function Execution & Vector Memory',
      desc: 'Connect your agents to real-world tools: web scrapers, computational sandboxes, external REST APIs, and vector databases for long-term memory retrieval.',
      handsOn: 'Building an agent that searches the live web, writes bug-free code, and saves context to MongoDB.',
      badge: 'Agentic Tooling',
      takeaway: 'Production Tool Calling Boilerplate'
    },
    {
      moduleNum: 3,
      time: '08:30 PM - 09:15 PM IST',
      title: 'Module 3: Monetization Engine: Razorpay Checkout & Automated Invoicing',
      desc: 'The complete revenue engine: Integrating Razorpay UPI/Card checkout, HMAC SHA256 server-side signature verification, idempotency protection, and automated PDF GST tax invoices.',
      handsOn: 'Setting up automated checkout with instant WhatsApp community invite dispatch.',
      badge: 'Payments & Revenue',
      takeaway: 'Razorpay + PDFKit Invoicing Module'
    },
    {
      moduleNum: 4,
      time: '09:15 PM - 10:00 PM IST',
      title: 'Module 4: Grand Live Mastermind, Deployment & Hot-Seat Q&A',
      desc: 'Deploying the AI SaaS live on cloud infrastructure with custom domain and SSL. Live hot-seat architecture reviews, attendee AMA, and official certificate distribution.',
      handsOn: 'Your SaaS is deployed live on cloud with automated reminder webhooks.',
      badge: 'Live Finale & Mastermind',
      takeaway: 'Verified Certificate + Lifetime GitHub Starter Kit'
    }
  ];

  const defaultTestimonials = [
    {
      name: 'Vikramaditya Sengupta',
      role: 'Staff Engineer at Razorpay',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      quote: 'Dr. Elena Vance breaks down complex multi-agent swarms into clean, production-ready code. The Razorpay monetization workflow alone saved our team weeks of development.',
      rating: 5
    },
    {
      name: 'Meera Nambiar',
      role: 'Lead Architect at CloudScale',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      quote: 'The automation funnel is mind-blowing. Immediate WhatsApp confirmation, instant GST invoice download, and clear calendar synchronization made this the smoothest webinar experience ever.',
      rating: 5
    },
    {
      name: 'David Anderson',
      role: 'AI Product Specialist, Global Tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      quote: 'The live class presentation format is unmatched. Elena teaches what actually matters in 2026: autonomous agent resilience, security, and profitable billing.',
      rating: 5
    }
  ];

  const testimonials = webinar?.testimonials?.length ? webinar.testimonials : defaultTestimonials;

  const defaultFaqs = [
    {
      question: 'When is the actual webinar class taking place?',
      answer: 'The live masterclass takes place on November 4, 2026 at 07:00 PM IST. If you register today, your seat is reserved immediately, and you will receive instant confirmation via email and WhatsApp with your unique registration ID and tax invoice.'
    },
    {
      question: 'Will I get the recorded session if I cannot attend live on Nov 4, 2026?',
      answer: 'Yes! All confirmed VIP registrants receive lifetime access to the full 4K recorded masterclass, presentation slides, and complete GitHub repository.'
    },
    {
      question: 'How do I receive my tax invoice and receipt?',
      answer: 'Immediately upon verified payment, your official GST-compliant tax invoice is generated with a unique invoice number. You can download the PDF right on the Thank You page and it will also be sent to your registered email.'
    },
    {
      question: 'How do I join the WhatsApp Mastermind community?',
      answer: 'After payment verification, you will see a prominent "Join WhatsApp Community" button on your Thank You page, and our automation service will also dispatch the secure invitation link directly to your WhatsApp number.'
    },
    {
      question: 'How will I join the live class on November 4, 2026?',
      answer: 'You will receive secure joining links and calendar invitations via email and WhatsApp. We also trigger automated reminder alerts (24h before, 1h before, and when the class goes live) so you never miss a minute.'
    }
  ];

  const faqs = webinar?.faqs?.length ? webinar.faqs : defaultFaqs;

  return (
    <div style={{ maxWidth: 1120, margin: '0 auto', padding: '40px 20px' }}>
      
      {/* SECTION 1: PRESENTER PROFILE & PHOTO */}
      <section style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 24,
        padding: '48px 40px',
        marginBottom: 64,
        boxShadow: 'var(--shadow-card)'
      }}>
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          gap: 40,
          alignItems: 'center'
        }}>
          {/* Presenter Photo with Live Studio Frame */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute',
              inset: -8,
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.4), rgba(236, 72, 153, 0.3))',
              borderRadius: 24,
              filter: 'blur(12px)',
              zIndex: 0
            }} />
            <div style={{
              position: 'relative',
              zIndex: 1,
              borderRadius: 20,
              overflow: 'hidden',
              border: '2px solid #e2e8f0',
              aspectRatio: '4/5',
              background: '#090d16'
            }}>
              <img 
                src={presenter.avatar || '/assets/female_presenter_blazer.jpg'} 
                alt={presenter.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px 20px',
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)',
                color: '#ffffff'
              }}>
                <div style={{ fontSize: 16, fontWeight: 800 }}>{presenter.name}</div>
                <div style={{ fontSize: 12, color: '#818cf8', marginTop: 2 }}>{presenter.title}</div>
              </div>
            </div>
          </div>

          {/* Presenter Bio & Pedigree */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span className="badge-tag">
                <Star size={14} fill="#fbbf24" color="#fbbf24" />
                Featured Masterclass Presenter
              </span>
              <span style={{ fontSize: 13, color: '#16a34a', fontWeight: 700 }}>
                4.98 / 5.0 (3,800+ Verified Reviews)
              </span>
            </div>

            <h2 style={{ fontSize: 32, marginBottom: 12, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Meet Your Host: {presenter.name}
            </h2>

            <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 20 }}>
              {presenter.bio}
            </p>

            {/* Credibility highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#334155' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>Ex-AI Research Lead & Enterprise Consultant</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#334155' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>Architected Systems for 45,000+ Engineers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#334155' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>Specialist in Tool Calling & Autonomous Swarms</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#334155' }}>
                <CheckCircle2 size={18} color="#16a34a" />
                <span>Live Interactive Q&A on November 4, 2026</span>
              </div>
            </div>

            <button
              onClick={onRegisterClick}
              className="btn-primary"
              style={{ padding: '14px 28px', fontSize: 15, borderRadius: 12 }}
            >
              <span>Reserve Your Seat with {presenter.name.split(' ')[0]}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT PARTICIPANTS WILL LEARN (CURRICULUM) */}
      <section style={{ marginBottom: 64 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="badge-tag" style={{ marginBottom: 10 }}>
            Masterclass Curriculum
          </span>
          <h2 style={{ fontSize: 36, letterSpacing: '-0.02em', color: '#0f172a', marginBottom: 12 }}>
            What You Will Learn on <span className="text-gradient">November 4, 2026</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 680, margin: '0 auto' }}>
            A rigorous 180-minute, hands-on masterclass taking you from neural agent architecture to real monetization and cloud deployment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {masterclassModules.map((m) => (
            <div 
              key={m.moduleNum}
              className="glass-card"
              style={{
                padding: 28,
                borderRadius: 20,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <span style={{
                    background: '#4f46e5',
                    color: '#ffffff',
                    fontSize: 12,
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: 8
                  }}>
                    MODULE {m.moduleNum}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                    {m.time}
                  </span>
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 10, lineHeight: 1.3 }}>
                  {m.title}
                </h3>

                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 16 }}>
                  {m.desc}
                </p>
              </div>

              <div style={{
                background: '#f8fafc',
                padding: '12px 14px',
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                fontSize: 12,
                color: '#334155'
              }}>
                <strong style={{ color: '#4f46e5' }}>Key Takeaway:</strong> {m.takeaway}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: KEY BENEFITS & BONUSES */}
      <section style={{
        background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)',
        color: '#ffffff',
        borderRadius: 24,
        padding: '52px 40px',
        marginBottom: 64,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{
            background: 'rgba(251, 191, 36, 0.2)',
            color: '#fbbf24',
            padding: '6px 14px',
            borderRadius: 9999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.05em'
          }}>
            EXCLUSIVE PARTICIPANT BUNDLE
          </span>
          <h2 style={{ fontSize: 36, marginTop: 12, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Everything Included with Your Registration
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: 16, marginTop: 8 }}>
            Total standalone value ₹10,996 — Included for only <strong>₹{webinar?.vipPrice || 499}</strong> on November 4, 2026.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: 24, borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🚀</div>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Full GitHub SaaS Starter Kit</h4>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
              Production React + Node.js code repository with pre-configured agent swarms and Razorpay webhook billing.
            </p>
            <div style={{ marginTop: 12, fontSize: 12, color: '#34d399', fontWeight: 700 }}>Valued at ₹4,999 • Included</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: 24, borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>⚡</div>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>100+ Production System Prompts</h4>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
              Curated prompt templates, tool definitions, and token-cost optimization formulas tested on Claude & GPT-4o.
            </p>
            <div style={{ marginTop: 12, fontSize: 12, color: '#34d399', fontWeight: 700 }}>Valued at ₹2,499 • Included</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: 24, borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>💬</div>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Official WhatsApp Community</h4>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
              Private networking mastermind with fellow AI builders, founders, and direct updates from Dr. Elena Vance.
            </p>
            <div style={{ marginTop: 12, fontSize: 12, color: '#34d399', fontWeight: 700 }}>Valued at ₹1,999 • Included</div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.06)', padding: 24, borderRadius: 16, border: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>📜</div>
            <h4 style={{ fontSize: 17, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Verified Tax Invoice & Certificate</h4>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
              Instant GST-compliant tax receipt with unique invoice number, plus authenticated Certificate of Completion.
            </p>
            <div style={{ marginTop: 12, fontSize: 12, color: '#34d399', fontWeight: 700 }}>Valued at ₹1,499 • Included</div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button
            onClick={onRegisterClick}
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
              color: '#ffffff',
              padding: '16px 36px',
              borderRadius: 14,
              fontSize: 16,
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 10px 25px rgba(79, 70, 229, 0.5)'
            }}
          >
            <span>Claim Your Spot for ₹{webinar?.vipPrice || 499}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* SECTION 4: TESTIMONIALS SECTION */}
      <section style={{ marginBottom: 64 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="badge-tag" style={{ marginBottom: 10 }}>
            Proven Attendee Results
          </span>
          <h2 style={{ fontSize: 36, letterSpacing: '-0.02em', color: '#0f172a', marginBottom: 12 }}>
            What Engineers & Founders Say
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16 }}>
            Over 3,800+ participants have built high-converting applications with our frameworks.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: 32,
                borderRadius: 20,
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #f1f5f9', paddingTop: 16 }}>
                <img 
                  src={t.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                  alt={t.name}
                  style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      <section style={{ maxWidth: 840, margin: '0 auto', marginBottom: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="badge-tag" style={{ marginBottom: 10 }}>
            Everything You Need To Know
          </span>
          <h2 style={{ fontSize: 32, letterSpacing: '-0.02em', color: '#0f172a', marginBottom: 10 }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            Have questions about the November 4, 2026 class? We've got answers.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: 14,
                  overflow: 'hidden',
                  transition: 'all 0.2s'
                }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#0f172a'
                  }}
                >
                  <span>{faq.question || faq.q}</span>
                  {isOpen ? <ChevronUp size={18} color="#4f46e5" /> : <ChevronDown size={18} color="#94a3b8" />}
                </button>
                {isOpen && (
                  <div style={{
                    padding: '0 24px 20px',
                    fontSize: 14,
                    color: '#475569',
                    lineHeight: 1.6,
                    borderTop: '1px solid #f8fafc'
                  }}>
                    {faq.answer || faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
