import React, { useState } from 'react';
import PaymentButton from '../components/PaymentButton.jsx';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  ArrowLeft, 
  Crown, 
  Sparkles, 
  FileText, 
  Gift, 
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';

export default function CheckoutPage({ 
  checkoutData, 
  onPaymentSuccess, 
  onNavigate 
}) {
  const [includeOrderBump, setIncludeOrderBump] = useState(true);
  const [currency, setCurrency] = useState('INR'); // INR or USD
  const [errorMsg, setErrorMsg] = useState('');

  const basePriceINR = checkoutData?.amount || 499;
  const bumpPriceINR = 199;
  const totalINR = basePriceINR + (includeOrderBump ? bumpPriceINR : 0);

  // Conversion for USD display
  const exchangeRate = 0.012; // 1 INR ~ 0.012 USD
  const totalUSD = (totalINR * exchangeRate).toFixed(2);

  const displayTotal = currency === 'INR' ? `₹${totalINR}` : `$${totalUSD}`;

  return (
    <div style={{ padding: '40px 0 80px' }}>
      <div className="container" style={{ maxWidth: 960 }}>
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('landing')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            marginBottom: 24
          }}
        >
          <ArrowLeft size={16} /> Back to Webinar Overview
        </button>

        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 32,
          alignItems: 'start'
        }}>
          
          {/* Left Column: Order Summary & Upsell Bump */}
          <div>
            <div className="glass-card" style={{ padding: 32, marginBottom: 24, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span className="badge-tag" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', borderColor: 'rgba(245, 158, 11, 0.3)' }}>
                  <Crown size={14} /> VIP Backstage Access
                </span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>256-Bit SSL Secure Checkout</span>
              </div>

              <h2 style={{ fontSize: 26, marginBottom: 16 }}>Complete Your VIP Pass Upgrade</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
                Review your items below. Your invoice and private join credentials will be dispatched immediately.
              </p>

              {/* Attendee Details Card */}
              <div style={{
                background: '#f8fafc',
                padding: 16,
                borderRadius: 12,
                border: '1px solid #e2e8f0',
                marginBottom: 24
              }}>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Billed To:</div>
                <div style={{ fontWeight: 700, fontSize: 15, color: '#0f172a' }}>{checkoutData?.name || 'VIP Attendee'}</div>
                <div style={{ fontSize: 14, color: '#4f46e5', fontWeight: 600 }}>{checkoutData?.email || 'attendee@example.com'}</div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{checkoutData?.phone || '+91 98765 43210'}</div>
              </div>

              {/* High-Converting Order Bump */}
              <div style={{
                background: '#fff1f2',
                border: '2px dashed #f43f5e',
                borderRadius: 16,
                padding: 20,
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <input
                    type="checkbox"
                    id="orderBump"
                    checked={includeOrderBump}
                    onChange={(e) => setIncludeOrderBump(e.target.checked)}
                    style={{
                      width: 22,
                      height: 22,
                      accentColor: '#e11d48',
                      marginTop: 2,
                      cursor: 'pointer'
                    }}
                  />
                  <label htmlFor="orderBump" style={{ cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{
                        background: '#e11d48',
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: 4,
                        textTransform: 'uppercase'
                      }}>
                        ⚡ ONE-TIME OFFER (80% OFF)
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>
                        Add Production AI Agent Boilerplate & Notion Kit
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>
                      Check this box to instantly include the battle-tested FastAPI + Next.js template, prompt evaluation matrix, and Docker production scripts for just <strong>₹199</strong> (Regularly ₹2,499).
                    </p>
                  </label>
                </div>
              </div>

              {/* VIP Benefits List */}
              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontSize: 15, marginBottom: 12 }}>Your VIP Pass Includes:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Lifetime Access to Full HD Masterclass Recording + Transcripts</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Live Backstage 45-Minute Interactive Q&A & Architecture Hot Seat</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Full GitHub Repository with Agent Swarm Code & Next.js UI</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Official Tax Invoice & Verified Certificate of Attendance</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Price Breakdown & Payment Gateway */}
          <div>
            <div className="glass-card" style={{ padding: 28, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20 }}>Order Summary</h3>
                {/* Currency Switcher */}
                <div style={{
                  display: 'flex',
                  gap: 4,
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  padding: 3,
                  borderRadius: 8
                }}>
                  <button
                    onClick={() => setCurrency('INR')}
                    style={{
                      background: currency === 'INR' ? '#4f46e5' : 'transparent',
                      color: currency === 'INR' ? '#fff' : '#64748b',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    INR (₹)
                  </button>
                  <button
                    onClick={() => setCurrency('USD')}
                    style={{
                      background: currency === 'USD' ? '#4f46e5' : 'transparent',
                      color: currency === 'USD' ? '#fff' : '#64748b',
                      border: 'none',
                      padding: '4px 10px',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    USD ($)
                  </button>
                </div>
              </div>

              {/* Line Items */}
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 16, marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14 }}>
                  <span style={{ color: 'var(--text-muted)' }}>VIP Masterclass Pass</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{currency === 'INR' ? `₹${basePriceINR}` : `$${(basePriceINR * exchangeRate).toFixed(2)}`}</span>
                </div>
                {includeOrderBump && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, color: '#e11d48' }}>
                    <span>⚡ AI Agent Boilerplate Bump</span>
                    <span style={{ fontWeight: 600 }}>{currency === 'INR' ? `₹${bumpPriceINR}` : `$${(bumpPriceINR * exchangeRate).toFixed(2)}`}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--text-dim)' }}>
                  <span>Taxes (18% GST Included)</span>
                  <span>₹0.00</span>
                </div>
              </div>

              {/* Grand Total */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>Total Due</span>
                <span style={{ fontSize: 30, fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
                  {displayTotal}
                </span>
              </div>

              {errorMsg && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '10px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}>
                  <AlertCircle size={16} />
                  {errorMsg}
                </div>
              )}

              {/* Razorpay Integration Trigger */}
              <PaymentButton
                amount={totalINR}
                currency={currency}
                registrationData={checkoutData}
                onPaymentSuccess={onPaymentSuccess}
                onPaymentError={(err) => setErrorMsg(err)}
              />

              {/* Trust Badges */}
              <div style={{
                marginTop: 24,
                paddingTop: 16,
                borderTop: '1px solid var(--border-subtle)',
                textAlign: 'center',
                fontSize: 12,
                color: 'var(--text-muted)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8, color: '#10b981', fontWeight: 600 }}>
                  <ShieldCheck size={16} /> 100% Risk-Free 7-Day Money Back Guarantee
                </div>
                <div>Razorpay Verified Merchant • UPI / NetBanking / Cards Accepted</div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
