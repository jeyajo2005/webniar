import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone,
  ArrowRight,
  RefreshCw,
  QrCode,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api.js';

export default function RegistrationForm({ webinar, onPaymentSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+91',
    phone: '',
    receiveWhatsApp: true
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState('UPI');

  const registrationFee = webinar?.vipPrice || 499;
  const originalFee = webinar?.originalPrice || 2999;
  const taxRate = 0.18; // 18% GST inclusive
  const subtotal = Math.round((registrationFee / (1 + taxRate)) * 100) / 100;
  const taxAmount = Math.round((registrationFee - subtotal) * 100) / 100;

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      errors.phone = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
    }
    setErrorMsg('');
  };

  const handleStartPayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const fullPhone = `${formData.countryCode}${formData.phone.replace(/[\s-]/g, '')}`;

      // 1. Create or ensure registration record on backend
      const regRes = await api.register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: fullPhone,
        webinarId: webinar?._id || 'webinar_live_01',
        ticketType: 'VIP',
        amount: registrationFee
      });

      const registration = regRes.registration;
      const regId = registration?._id || 'reg_' + Date.now();

      // 2. Create order on backend (Razorpay order creation)
      const orderRes = await api.createPaymentOrder({
        amount: registrationFee,
        currency: 'INR',
        registrationId: regId,
        description: 'Full-Stack AI Masterclass (November 4, 2026)'
      });

      if (!orderRes.success) {
        throw new Error(orderRes.message || 'Failed to initialize payment order on server.');
      }

      // Check if real Razorpay SDK is present and active keys configured
      if (window.Razorpay && !orderRes.isSimulated && !orderRes.keyId.includes('sampleKey')) {
        const options = {
          key: orderRes.keyId,
          amount: orderRes.amount,
          currency: orderRes.currency,
          name: 'WebinarFlow AI',
          description: 'Full-Stack AI & Autonomous Agents Masterclass (Nov 4, 2026)',
          order_id: orderRes.orderId,
          handler: async function (response) {
            setLoading(true);
            try {
              // 3. Server-side verification (CRITICAL: Do NOT mark as paid without backend verify!)
              const verifyRes = await api.verifyPayment({
                registrationId: regId,
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                amount: registrationFee,
                currency: 'INR',
                method: 'Razorpay'
              });

              if (verifyRes.success) {
                confetti({ particleCount: 140, spread: 80, origin: { y: 0.5 } });
                onPaymentSuccess(verifyRes);
              } else {
                throw new Error(verifyRes.message || 'Payment signature verification failed.');
              }
            } catch (vErr) {
              setErrorMsg(vErr.message || 'Payment verification failed on server.');
            } finally {
              setLoading(false);
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: fullPhone
          },
          theme: {
            color: '#4f46e5'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp) {
          setErrorMsg(`Payment Failed: ${resp.error.description || 'Transaction declined.'}`);
          setLoading(false);
        });
        rzp.open();
      } else {
        // High-fidelity payment gateway modal (supports UPI, Card, NetBanking simulation)
        setPendingOrder({
          orderId: orderRes.orderId,
          registrationId: regId,
          amount: registrationFee,
          phone: fullPhone,
          name: formData.name
        });
        setShowSandboxModal(true);
      }
    } catch (err) {
      console.error('[Payment Flow Error]:', err);
      setErrorMsg(err.message || 'An error occurred during registration. Please check your connection and retry.');
    } finally {
      setLoading(false);
    }
  };

  // Complete simulated payment with real backend verification call
  const handleVerifySandboxPayment = async () => {
    if (!pendingOrder) return;
    setLoading(true);
    setErrorMsg('');

    try {
      const simPaymentId = 'pay_rzp_' + Math.random().toString(36).substring(2, 10);
      const simSignature = 'valid_sha256_sig_' + Date.now();

      // Send to server verify endpoint
      const verifyRes = await api.verifyPayment({
        registrationId: pendingOrder.registrationId,
        orderId: pendingOrder.orderId,
        paymentId: simPaymentId,
        signature: simSignature,
        amount: pendingOrder.amount,
        currency: 'INR',
        method: selectedMethod
      });

      if (verifyRes.success) {
        setShowSandboxModal(false);
        confetti({ particleCount: 140, spread: 80, origin: { y: 0.5 } });
        onPaymentSuccess(verifyRes);
      } else {
        throw new Error(verifyRes.message || 'Server verification failed.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Payment verification failed on server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="registration-payment-section" style={{
      maxWidth: 960,
      margin: '0 auto',
      padding: '20px 20px 40px'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: 24,
        border: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden'
      }}>
        {/* Top Header Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 100%)',
          color: '#ffffff',
          padding: '36px 32px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(245, 158, 11, 0.2)',
            color: '#fbbf24',
            padding: '6px 16px',
            borderRadius: 9999,
            fontSize: 12,
            fontWeight: 800,
            marginBottom: 12,
            letterSpacing: '0.05em'
          }}>
            <Sparkles size={14} />
            LIMITED SEATS • REGISTRATION & INSTANT PAYMENT
          </div>

          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', color: '#ffffff', marginBottom: 10, letterSpacing: '-0.02em' }}>
            Register for the Live Masterclass
          </h2>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
            color: '#cbd5e1',
            fontSize: 14
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar size={16} color="#60a5fa" />
              <strong>Webinar Date: November 4, 2026</strong>
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={16} color="#f472b6" />
              07:00 PM IST (3-Hour Live Interactive Class)
            </span>
          </div>
        </div>

        {/* Form & Summary Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 0.85fr',
          gap: 36,
          padding: '40px 36px',
          alignItems: 'start'
        }}>
          
          {/* LEFT: Participant Details Form */}
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              Participant Contact Information
            </h3>
            <p style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>
              Your registration ID, tax invoice, and WhatsApp invitation will be sent to these details.
            </p>

            {errorMsg && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 12,
                padding: '12px 16px',
                color: '#b91c1c',
                fontSize: 14,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <AlertCircle size={18} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleStartPayment}>
              {/* Full Name */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Full Name <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g. Karthik Raja"
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: 10,
                      border: validationErrors.name ? '1px solid #ef4444' : '1px solid #cbd5e1',
                      fontSize: 14,
                      outline: 'none',
                      background: '#f8fafc',
                      transition: 'border 0.2s'
                    }}
                  />
                  <User size={18} color="#94a3b8" style={{ position: 'absolute', left: 14, top: 13 }} />
                </div>
                {validationErrors.name && (
                  <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{validationErrors.name}</div>
                )}
              </div>

              {/* Email Address */}
              <div style={{ marginBottom: 18 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Email Address <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="e.g. karthik@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 42px',
                      borderRadius: 10,
                      border: validationErrors.email ? '1px solid #ef4444' : '1px solid #cbd5e1',
                      fontSize: 14,
                      outline: 'none',
                      background: '#f8fafc',
                      transition: 'border 0.2s'
                    }}
                  />
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: 14, top: 13 }} />
                </div>
                {validationErrors.email && (
                  <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{validationErrors.email}</div>
                )}
              </div>

              {/* Phone Number with Country Code */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Mobile / WhatsApp Number <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <select
                    value={formData.countryCode}
                    onChange={(e) => handleInputChange('countryCode', e.target.value)}
                    style={{
                      width: 90,
                      padding: '12px 8px',
                      borderRadius: 10,
                      border: '1px solid #cbd5e1',
                      fontSize: 14,
                      background: '#f8fafc',
                      outline: 'none'
                    }}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>

                  <div style={{ position: 'relative', flex: 1 }}>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      style={{
                        width: '100%',
                        padding: '12px 16px 12px 42px',
                        borderRadius: 10,
                        border: validationErrors.phone ? '1px solid #ef4444' : '1px solid #cbd5e1',
                        fontSize: 14,
                        outline: 'none',
                        background: '#f8fafc',
                        transition: 'border 0.2s'
                      }}
                    />
                    <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: 14, top: 13 }} />
                  </div>
                </div>
                {validationErrors.phone && (
                  <div style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{validationErrors.phone}</div>
                )}
              </div>

              {/* WhatsApp Consent */}
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: 13,
                color: '#475569',
                marginBottom: 24,
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={formData.receiveWhatsApp}
                  onChange={(e) => handleInputChange('receiveWhatsApp', e.target.checked)}
                  style={{ marginTop: 2, accentColor: '#16a34a' }}
                />
                <span>Send my registration confirmation, GST invoice, and WhatsApp group invitation link to this phone number.</span>
              </label>

              {/* Submit / Proceed to Pay Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '16px',
                  borderRadius: 12,
                  fontSize: 16,
                  fontWeight: 800,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  boxShadow: '0 8px 25px rgba(79, 70, 229, 0.4)',
                  transition: 'all 0.2s'
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    <span>Processing Secure Order...</span>
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    <span>Pay ₹{registrationFee} & Complete Registration</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: Payment Summary Card */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 18,
            padding: 24
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#64748b' }}>
                Order Summary
              </span>
              <span style={{
                background: '#dcfce7',
                color: '#15803d',
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 9999
              }}>
                83% OFF Early-Bird
              </span>
            </div>

            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              Full-Stack AI & Autonomous Agents Masterclass
            </h4>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 18 }}>
              📅 Class Date: <strong>November 4, 2026</strong>
            </div>

            <div style={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '14px 0', marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#475569', marginBottom: 8 }}>
                <span>Regular Price</span>
                <span style={{ textDecoration: 'line-through', color: '#94a3b8' }}>₹{originalFee}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#475569', marginBottom: 8 }}>
                <span>Special Masterclass Fee (Net)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: '#475569' }}>
                <span>GST (18% Inclusive)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#0f172a' }}>Total Due Now</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: '#4f46e5' }}>₹{registrationFee}</span>
            </div>

            {/* Included Value Points */}
            <div style={{ fontSize: 12, color: '#475569', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#16a34a" />
                <span>Instant PDF Tax Invoice with GSTIN</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#16a34a" />
                <span>Official WhatsApp Community Access</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#16a34a" />
                <span>Production GitHub AI SaaS Starter Code</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#16a34a" />
                <span>Lifetime Masterclass 4K Recording Access</span>
              </div>
            </div>

            {/* Security Guarantee */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: 12,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 12,
              color: '#334155'
            }}>
              <ShieldCheck size={20} color="#16a34a" />
              <div>
                <strong>100% Risk-Free Guarantee</strong><br />
                <span>Full refund if not satisfied. Razorpay 256-bit encrypted.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RAZORPAY GATEWAY CHECKOUT MODAL (For instant developer and sandbox testing) */}
      {showSandboxModal && pendingOrder && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: 20
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: 20,
            maxWidth: 440,
            width: '100%',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            border: '1px solid #e2e8f0'
          }}>
            {/* Modal Header */}
            <div style={{
              background: '#0c2340',
              color: '#ffffff',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 700, textTransform: 'uppercase' }}>
                  Razorpay Checkout
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>
                  WebinarFlow AI Platform
                </div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#ffffff' }}>
                ₹{pendingOrder.amount}
              </div>
            </div>

            {/* Modal Content */}
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 16 }}>
                Order ID: <code>{pendingOrder.orderId}</code>
              </div>

              {/* Payment Method Selector */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 20 }}>
                {['UPI', 'CARD', 'NETBANKING'].map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setSelectedMethod(method)}
                    style={{
                      padding: '10px 4px',
                      borderRadius: 10,
                      border: selectedMethod === method ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                      background: selectedMethod === method ? '#eff6ff' : '#ffffff',
                      color: selectedMethod === method ? '#4f46e5' : '#475569',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                fontSize: 13,
                color: '#334155'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Participant:</span>
                  <strong>{pendingOrder.name}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Class Date:</span>
                  <strong style={{ color: '#4f46e5' }}>November 4, 2026</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Method Selected:</span>
                  <strong>{selectedMethod} (Instant Verification)</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setShowSandboxModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 10,
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    color: '#64748b',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleVerifySandboxPayment}
                  disabled={loading}
                  style={{
                    flex: 2,
                    padding: '12px',
                    borderRadius: 10,
                    border: 'none',
                    background: '#16a34a',
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 800,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  {loading ? (
                    <RefreshCw size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <CheckCircle2 size={16} />
                  )}
                  <span>Authorize & Verify</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
