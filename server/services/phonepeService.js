import dotenv from 'dotenv';
dotenv.config();

let cachedToken = null;
let tokenExpiresAt = 0;

const CLIENT_ID = process.env.PHONEPE_CLIENT_ID || 'SU2604151549453655316895';
const CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || '28da478c-597b-44ce-9938-a1d09c170f65';
const CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || '1';
const IS_PROD = (process.env.PHONEPE_ENV || 'production') === 'production';

const OAUTH_URL = IS_PROD
  ? 'https://api.phonepe.com/apis/identity-manager/v1/oauth/token'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token';

const PAY_URL = IS_PROD
  ? 'https://api.phonepe.com/apis/pg/checkout/v2/pay'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay';

const STATUS_URL = IS_PROD
  ? 'https://api.phonepe.com/apis/pg/checkout/v2/order'
  : 'https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order';

/**
 * Get PhonePe OAuth Token with in-memory caching
 */
export const getPhonePeToken = async () => {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && tokenExpiresAt > now + 60) {
    return cachedToken;
  }

  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('client_version', CLIENT_VERSION);
  params.append('client_secret', CLIENT_SECRET);
  params.append('grant_type', 'client_credentials');

  const res = await fetch(OAUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`PhonePe OAuth Token Failed (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = data.expires_at || (now + 3500);

  console.log('[PhonePe Service] Successfully generated OAuth Token.');
  return cachedToken;
};

/**
 * Create Live PhonePe Payment Order
 * @param {number} amount - Amount in Rupees (default 1)
 * @param {string} merchantOrderId - Unique merchant transaction ID
 * @param {string} redirectUrl - URL to redirect after payment completion
 */
export const createPhonePeOrder = async ({ amount = 1, merchantOrderId, redirectUrl }) => {
  try {
    const token = await getPhonePeToken();
    const amountInPaise = Math.round(Number(amount) * 100); // 1 INR = 100 paise

    const orderId = merchantOrderId || `TXN_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    // PhonePe production requires a valid HTTPS redirect URL for checkout UI
    const clientRedirectUrl = (redirectUrl && redirectUrl.startsWith('https://'))
      ? redirectUrl
      : (process.env.PHONEPE_REDIRECT_URL || 'https://kairatechnologies.com/thankyou');

    const payload = {
      merchantOrderId: orderId,
      amount: amountInPaise,
      expireAfter: 1200, // 20 minutes
      paymentFlow: {
        type: 'PG_CHECKOUT',
        message: 'Kaira Course ₹1 Masterclass Registration',
        merchantUrls: {
          redirectUrl: clientRedirectUrl
        },
        paymentModeConfig: {
          version: 'V2',
          enabledPaymentModes: [
            {
              type: 'UPI',
              flows: ['QR', 'INTENT']
            }
          ]
        }
      }
    };

    const res = await fetch(PAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok || (data.success === false)) {
      console.warn('[PhonePe Create Order Warning]:', data);
      throw new Error(data.message || 'Failed to create PhonePe payment order.');
    }

    console.log(`[PhonePe Order Created]: MerchantOrderId=${orderId}, PhonePeOrderId=${data.orderId}`);

    return {
      success: true,
      orderId: data.orderId,
      merchantOrderId: orderId,
      redirectUrl: data.redirectUrl,
      amount: Number(amount),
      expireAt: data.expireAt
    };
  } catch (err) {
    console.error('[PhonePe Service Error]:', err.message);
    throw err;
  }
};

/**
 * Check PhonePe Order Status
 * @param {string} merchantOrderId
 */
export const checkPhonePeStatus = async (merchantOrderId) => {
  try {
    const token = await getPhonePeToken();
    const res = await fetch(`${STATUS_URL}/${encodeURIComponent(merchantOrderId)}/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `O-Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log(`[PhonePe Status Check] ${merchantOrderId}:`, data.state || data.code || res.status);
    return {
      success: res.ok,
      state: data.state || (data.code === 'PAYMENT_SUCCESS' ? 'COMPLETED' : 'PENDING'),
      data
    };
  } catch (err) {
    console.warn('[PhonePe Status Check Warning]:', err.message);
    return { success: false, state: 'UNKNOWN', error: err.message };
  }
};
