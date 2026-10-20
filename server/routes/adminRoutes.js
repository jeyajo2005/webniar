import express from 'express';
import {
  getDashboardStats,
  broadcastReminder,
  updateWebinarDetails,
  exportRegistrationsCSV,
  resendNotification
} from '../controllers/adminController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', getDashboardStats);
router.get('/export-csv', exportRegistrationsCSV);
router.post('/broadcast', verifyAdminToken, broadcastReminder);
router.post('/resend-notification', verifyAdminToken, resendNotification);
router.put('/webinar/:id', verifyAdminToken, updateWebinarDetails);

export default router;
