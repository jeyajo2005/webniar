import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Award,
  Clock,
  Lock,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api.js';

export default function CheckoutModal({ 
  isOpen, 
  course, 
  user, 
  onClose, 
  onPaymentSuccess, 
  onStartLearning, 
  onGoToDashboard,
  onRequestAuth
}) {
  const [selectedMethod, setSelectedMethod] = useState('UPI'); // 'UPI' | 'CARD' | 'NETBANKING'
  const [upiId, setUpiId] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  
  const [step, setStep] = useState('summary'); // 'summary' | 'processing' | 'success' | 'failed'
  const [errorMsg, setErrorMsg] = useState('');
  const [paymentData, setPaymentData] = useState(null);

  if (!isOpen || !course) return null;

  const basePrice = course.price || 499;
  const gstAmount = Math.round(basePrice * 0.18);
  const totalAmount = basePrice; // All inclusive
  const subtotal = Math.round(totalAmount - gstAmount);

  // Trigger Razorpay payment and backend verification
  const handleProceedPayment = async () => {
    if (!email || !name) {
      setErrorMsg('Please enter your full name and email to receive your enrollment and tax invoice.');
      return;
    }

    setErrorMsg('');
    setStep('processing');

    try {
      // 1. Create Order on Server
      const orderRes = await api.createCoursePaymentOrder({
        courseId: course._id,
        amount: totalAmount,
        currency: 'INR'
      });

      if (!orderRes.success) {
        throw new Error(orderRes.message || 'Failed to initialize payment gateway.');
      }

      // 2. Razorpay Checkout Flow
      const isRazorpayLoaded = typeof window.Razorpay !== 'undefined';

      // If live Razorpay key and script is present
      if (isRazorpayLoaded && !orderRes.isSimulated && orderRes.keyId && !orderRes.keyId.includes('sampleKey')) {
        const options = {
          key: orderRes.keyId,
          amount: orderRes.amount,
          currency: orderRes.currency || 'INR',
          name: 'LearnFlow Academy',
          description: `Enrollment: ${course.title}`,
          image: '/assets/female_presenter_blazer.jpg',
          order_id: orderRes.orderId,
          prefill: {
            name,
            email,
            contact: phone
          },
          theme: { color: '#4f46e5' },
          handler: async function (response) {
            await verifyAndComplete(response.razorpay_order_id, response.razorpay_payment_id, response.razorpay_signature);
          },
          modal: {
            ondismiss: function () {
              setStep('summary');
              setErrorMsg('Payment was cancelled. You can retry anytime.');
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (res) {
          setStep('failed');
          setErrorMsg(res.error.description || 'Payment failed with bank. Please try another method.');
        });
        rzp.open();
      } else {
        // 3. High-Fidelity Test / Sandbox Verification
        setTimeout(async () => {
          const simulatedOrderId = orderRes.orderId || ('order_sim_' + Date.now());
          const simulatedPayId = 'pay_sim_' + Math.random().toString(36).substring(2, 10);
          const simulatedSig = 'valid_simulated_sig_' + Date.now();
          await verifyAndComplete(simulatedOrderId, simulatedPayId, simulatedSig);
        }, 1200);
      }
    } catch (err) {
      setStep('failed');
      setErrorMsg(err.message || 'An unexpected error occurred during payment processing.');
    }
  };

  const verifyAndComplete = async (orderId, paymentId, signature) => {
    try {
      const verifyRes = await api.verifyCoursePayment({
        courseId: course._id,
        orderId,
        paymentId,
        signature,
        amount: totalAmount,
        currency: 'INR',
        method: selectedMethod,
        customer: { name, email, phone }
      });

      if (verifyRes.success) {
        setPaymentData(verifyRes);
        setStep('success');

        // Confetti Celebration
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {}

        if (onPaymentSuccess) {
          onPaymentSuccess(verifyRes);
        }
      } else {
        setStep('failed');
        setErrorMsg(verifyRes.message || 'Payment signature verification failed.');
      }
    } catch (err) {
      setStep('failed');
      setErrorMsg(err.message || 'Server error while verifying payment.');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      background: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16
    }}>
      <div style={{
        background: '#ffffff',
        width: '100%',
        maxWidth: 580,
        borderRadius: 20,
        boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.4)',
        overflow: 'hidden',
        position: 'relative',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          padding: '20px 24px',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={16} color="#4ade80" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Secure 256-Bit SSL Checkout
              </span>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>
              {step === 'success' ? 'Enrollment Confirmed!' : 'Complete Course Enrollment'}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="custom-scrollbar" style={{ padding: 24, overflowY: 'auto' }}>
          {/* STEP 1: SUMMARY & DETAILS */}
          {step === 'summary' && (
            <div>
              {/* Course Brief Card */}
              <div style={{
                display: 'flex',
                gap: 16,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: 14,
                marginBottom: 20
              }}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  style={{ width: 110, height: 75, objectFit: 'cover', borderRadius: 8 }}
                />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase' }}>
                    {course.category}
                  </span>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', lineHeight: 1.3, marginTop: 2 }}>
                    {course.title}
                  </h4>
                  <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
                    By {course.instructor?.name || 'Industry Mentor'} • {course.durationHours || 20} hours on-demand video
                  </p>
                </div>
              </div>

              {/* Student Information */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                    Student Contact Details (For Certificate & Tax Receipt)
                  </label>
                  {!user && onRequestAuth && (
                    <button
                      type="button"
                      onClick={onRequestAuth}
                      style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                    >
                      Already have an account? Log in
                    </button>
                  )}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #cbd5e1',
                        fontSize: 13
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 8,
                        border: '1px solid #cbd5e1',
                        fontSize: 13
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: 8 }}>
                  <input
                    type="tel"
                    placeholder="WhatsApp Phone Number (e.g. +91 98765 43210)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 8,
                      border: '1px solid #cbd5e1',
                      fontSize: 13
                    }}
                  />
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
                  Select Payment Method
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('UPI')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 10,
                      border: selectedMethod === 'UPI' ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                      background: selectedMethod === 'UPI' ? '#f5f3ff' : '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer'
                    }}
                  >
                    <Smartphone size={20} color={selectedMethod === 'UPI' ? '#4f46e5' : '#64748b'} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: selectedMethod === 'UPI' ? '#4f46e5' : '#334155' }}>
                      UPI (GPay / PhonePe)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('CARD')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 10,
                      border: selectedMethod === 'CARD' ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                      background: selectedMethod === 'CARD' ? '#f5f3ff' : '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer'
                    }}
                  >
                    <CreditCard size={20} color={selectedMethod === 'CARD' ? '#4f46e5' : '#64748b'} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: selectedMethod === 'CARD' ? '#4f46e5' : '#334155' }}>
                      Cards (Debit / Credit)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('NETBANKING')}
                    style={{
                      padding: '12px 10px',
                      borderRadius: 10,
                      border: selectedMethod === 'NETBANKING' ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                      background: selectedMethod === 'NETBANKING' ? '#f5f3ff' : '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      cursor: 'pointer'
                    }}
                  >
                    <Building2 size={20} color={selectedMethod === 'NETBANKING' ? '#4f46e5' : '#64748b'} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: selectedMethod === 'NETBANKING' ? '#4f46e5' : '#334155' }}>
                      Net Banking
                    </span>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '14px 18px',
                marginBottom: 20
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748b', marginBottom: 6 }}>
                  <span>Course Fee</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748b', marginBottom: 6 }}>
                  <span>GST (18% Included)</span>
                  <span>₹{gstAmount.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#16a34a', marginBottom: 8 }}>
                  <span>Promotional Discount (83% Off)</span>
                  <span>-₹{((course.originalPrice || 2999) - totalAmount).toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#0f172a',
                  borderTop: '1px solid #e2e8f0',
                  paddingTop: 8
                }}>
                  <span>Total Payable Amount</span>
                  <span style={{ color: '#4f46e5' }}>₹{totalAmount}</span>
                </div>
              </div>

              {errorMsg && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '10px 14px',
                  borderRadius: 10,
                  fontSize: 13,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 16
                }}>
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Pay Button */}
              <button
                onClick={handleProceedPayment}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '15px',
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  boxShadow: '0 6px 20px rgba(79, 70, 229, 0.45)'
                }}
              >
                <span>Pay ₹{totalAmount} & Unlock Course</span>
                <ArrowRight size={18} />
              </button>
              <p style={{ textAlign: 'center', fontSize: 11, color: '#94a3b8', marginTop: 10 }}>
                Instant lifetime access • 30-Day Money-Back Guarantee • Certified CPD credits
              </p>
            </div>
          )}

          {/* STEP 2: PROCESSING */}
          {step === 'processing' && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{
                width: 60,
                height: 60,
                border: '4px solid #e2e8f0',
                borderTopColor: '#4f46e5',
                borderRadius: '50%',
                margin: '0 auto 20px',
                animation: 'spin 1s linear infinite'
              }} />
              <h4 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                Verifying Payment with Razorpay...
              </h4>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>
                Performing server-side HMAC signature verification and creating official enrollment record. Please do not close this window.
              </p>
            </div>
          )}

          {/* STEP 3: SUCCESS (Requirement 4.9 & 4.10) */}
          {step === 'success' && (
            <div style={{ textAlign: 'center', padding: '20px 10px' }}>
              <div style={{
                width: 68,
                height: 68,
                background: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
              }}>
                <CheckCircle2 size={40} color="#16a34a" />
              </div>

              <h4 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a' }}>
                Payment Successful! Welcome to Your Course.
              </h4>
              <p style={{ fontSize: 14, color: '#475569', marginTop: 6, maxWidth: 440, margin: '6px auto 20px' }}>
                Your payment has been securely verified. The full course curriculum and classroom video lessons are now unlocked!
              </p>

              {/* Receipt Details Box */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: '16px 20px',
                textAlign: 'left',
                marginBottom: 24
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: '#64748b' }}>Course</span>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{course.title}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: '#64748b' }}>Transaction ID</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 600, color: '#334155' }}>
                    {paymentData?.payment?.paymentId || 'pay_verified_2026'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: '#64748b' }}>Tax Invoice</span>
                  <span style={{ fontWeight: 700, color: '#4f46e5' }}>
                    {paymentData?.invoice?.invoiceNumber || 'INV-2026-CRS'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#64748b' }}>Status</span>
                  <span style={{ color: '#16a34a', fontWeight: 700 }}>VERIFIED & ENROLLED</span>
                </div>
              </div>

              {/* Two Mandatory Action Buttons: Start Learning & Go to My Courses */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  onClick={() => {
                    onClose();
                    if (onStartLearning) onStartLearning(course._id);
                  }}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px 20px',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
                  }}
                >
                  <BookOpen size={18} />
                  <span>Start Learning</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onGoToDashboard) onGoToDashboard();
                  }}
                  style={{
                    flex: 1,
                    background: '#f1f5f9',
                    color: '#334155',
                    border: '1px solid #cbd5e1',
                    padding: '14px 20px',
                    borderRadius: 12,
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  <Layers size={18} />
                  <span>Go to My Courses</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: FAILED (Requirement 4.11) */}
          {step === 'failed' && (
            <div style={{ textAlign: 'center', padding: '30px 10px' }}>
              <div style={{
                width: 60,
                height: 60,
                background: '#fee2e2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <AlertCircle size={36} color="#dc2626" />
              </div>
              <h4 style={{ fontSize: 20, fontWeight: 800, color: '#991b1b' }}>
                Payment Failed or Cancelled
              </h4>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 8, maxWidth: 420, margin: '8px auto 20px' }}>
                {errorMsg || 'Your transaction could not be completed. Your card/account was not debited.'}
              </p>
              <button
                onClick={() => setStep('summary')}
                style={{
                  background: '#4f46e5',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer'
                }}
              >
                Retry Payment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
