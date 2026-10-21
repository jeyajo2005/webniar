import express from 'express';
import {
  adminLogin,
  getDashboardStats,
  broadcastReminder,
  updateWebinarDetails,
  exportRegistrationsCSV,
  resendNotification
} from '../controllers/adminController.js';
import { verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Admin Login Authentication
router.post('/login', adminLogin);

// Protected Admin Endpoints (Requires valid admin JWT or API key)
router.get('/stats', verifyAdminToken, getDashboardStats);
router.get('/export-csv', verifyAdminToken, exportRegistrationsCSV);
router.post('/broadcast', verifyAdminToken, broadcastReminder);
router.post('/resend-notification', verifyAdminToken, resendNotification);
router.put('/webinar/:id', verifyAdminToken, updateWebinarDetails);

export default router;
