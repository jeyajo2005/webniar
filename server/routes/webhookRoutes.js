import express from 'express';
import { verifyWebhookSignature } from '../services/razorpayService.js';
import WebhookEventModel from '../models/WebhookEvent.js';
import PaymentModel from '../models/Payment.js';
import RegistrationModel from '../models/Registration.js';

const router = express.Router();

router.post('/razorpay', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const bodyStr = JSON.stringify(req.body);

    const isValid = verifyWebhookSignature(bodyStr, signature);

    await WebhookEventModel.create({
      eventType: req.body.event || 'payment.captured',
      provider: 'razorpay',
      payload: req.body,
      processed: true
    });

    if (req.body.event === 'payment.captured') {
      const paymentEntity = req.body.payload?.payment?.entity;
      if (paymentEntity) {
        console.log(`[Razorpay Webhook] Captured payment ${paymentEntity.id} for amount ${paymentEntity.amount / 100}`);
      }
    }

    res.status(200).json({ status: 'ok', received: true });
  } catch (error) {
    console.error('[Webhook Error]:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
