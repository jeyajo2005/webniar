import express from 'express';
import {
  createOrder,
  verifyPayment,
  createCourseOrder,
  verifyCoursePayment
} from '../controllers/paymentController.js';
import { optionalUserToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Webinar checkout
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);

// Course checkout
router.post('/create-course-order', optionalUserToken, createCourseOrder);
router.post('/verify-course', optionalUserToken, verifyCoursePayment);

export default router;
