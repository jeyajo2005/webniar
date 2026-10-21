import express from 'express';
import {
  createOrder,
  verifyPayment,
  createCourseOrder,
  verifyCoursePayment,
  createPhonePePayment,
  verifyPhonePePayment,
  getPhonePeOrderStatus
} from '../controllers/paymentController.js';
import { optionalUserToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// PhonePe PG V2 Live Checkout
router.post('/phonepe/create-order', createPhonePePayment);
router.post('/phonepe/verify', verifyPhonePePayment);
router.get('/phonepe/status/:merchantOrderId', getPhonePeOrderStatus);

// Webinar checkout
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

// Course checkout
router.post('/create-course-order', optionalUserToken, createCourseOrder);
router.post('/verify-course', optionalUserToken, verifyCoursePayment);

export default router;
