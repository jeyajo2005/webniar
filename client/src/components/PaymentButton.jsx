import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/api.js';

export default function PaymentButton({ 
  amount = 499, 
  currency = 'INR', 
  registrationData, 
  onPaymentSuccess, 
  onPaymentError 
}) {
  const [loading, setLoading] = useState(false);
  const [showSandboxModal, setShowSandboxModal] = useState(false);
  const [simulatedOrderId, setSimulatedOrderId] = useState(null);

  const initiatePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order on backend
      const orderRes = await api.createPaymentOrder({
        amount,
        currency,
        registrationId: registrationData?._id,
        description: 'VIP Masterclass Pass + All Resource Bundles'
      });

      if (!orderRes.success) {
        throw new Error(orderRes.message || 'Could not initiate checkout order.');
      }

      // Check if standard Razorpay library is loaded and not placeholder
      if (window.Razorpay && !orderRes.isSimulated && !orderRes.keyId.includes('sampleKey')) {
        const options = {
          key: orderRes.keyId,
          amount: orderRes.amount,
          currency: orderRes.currency,
          name: 'WebinarFlow AI',
          description: 'VIP Masterclass Pass',
          order_id: orderRes.orderId,
          handler: async function (response) {
            try {
              const verifyRes = await api.verifyPayment({
                registrationId: registrationData?._id,
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                amount
              });
              onPaymentSuccess(verifyRes);
            } catch (err) {
              onPaymentError(err.message);
            }
          },
          prefill: {
            name: registrationData?.name || '',
            email: registrationData?.email || '',
            contact: registrationData?.phone || ''
          },
          theme: {
            color: '#6366f1'
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (resp) {
          onPaymentError(resp.error.description);
        });
        rzp.open();
      } else {
        // High-fidelity sandbox / dev simulator modal
        setSimulatedOrderId(orderRes.orderId);
        setShowSandboxModal(true);
      }
    } catch (err) {
      console.error('[Payment Error]:', err);
      onPaymentError(err.message || 'Payment initiation failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatedSuccess = async (method = 'UPI') => {
    setLoading(true);
    try {
      const simPaymentId = 'pay_sim_' + Date.now();
      const verifyRes = await api.verifyPayment({
        registrationId: registrationData?._id,
        orderId: simulatedOrderId || 'order_sim_test',
        paymentId: simPaymentId,
        signature: 'simulated_valid_signature_2026',
        amount,
        currency,
        method
      });
      setShowSandboxModal(false);
      onPaymentSuccess(verifyRes);
    } catch (err) {
      onPaymentError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={initiatePayment}
        disabled={loading}
        className="btn-vip"
        style={{
          width: '100%',
          padding: '16px 24px',
          borderRadius: 12,
          fontSize: 16,
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        <Lock size={18} />
        {loading ? 'Opening Secure Gateway...' : `Complete VIP Upgrade (₹${amount})`}
      </button>

      {/* Development / Sandbox Razorpay Simulation Modal */}
      {showSandboxModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 20
        }}>
          <div className="glass-card" style={{
            maxWidth: 440,
            width: '100%',
            padding: 32,
            textAlign: 'center',
            border: '1px solid #e2e8f0',
            background: '#ffffff',
            boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)'
          }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: '#eef2ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              color: '#4f46e5'
            }}>
              <CreditCard size={26} />
            </div>

            <h3 style={{ fontSize: 20, marginBottom: 6, color: '#0f172a' }}>Razorpay Sandbox Gateway</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
              Order ID: <code style={{ color: '#4f46e5', fontWeight: 600 }}>{simulatedOrderId}</code><br/>
              Total Payable: <strong style={{ color: '#0f172a', fontSize: 18 }}>₹{amount}</strong>
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <button
                onClick={() => handleSimulatedSuccess('UPI')}
                className="btn-primary"
                style={{ padding: '12px 16px', borderRadius: 8, fontSize: 14 }}
              >
                Pay via UPI (GPay / PhonePe / Paytm)
              </button>
              <button
                onClick={() => handleSimulatedSuccess('Card')}
                className="btn-secondary"
                style={{ padding: '12px 16px', borderRadius: 8, fontSize: 14 }}
              >
                Pay via Credit / Debit Card (Visa / MC)
              </button>
            </div>

            <button
              onClick={() => setShowSandboxModal(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-dim)',
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              Cancel Payment
            </button>
          </div>
        </div>
      )}
    </>
  );
}
