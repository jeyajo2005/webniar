import express from 'express';
import {
  getMyEnrollments,
  updateProgress,
  getCertificate,
  getAllEnrollments
} from '../controllers/enrollmentController.js';
import { verifyUserToken, verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my', verifyUserToken, getMyEnrollments);
router.post('/progress', verifyUserToken, updateProgress);
router.get('/certificate/:courseId', verifyUserToken, getCertificate);
router.get('/admin/all', verifyAdminToken, getAllEnrollments);

export default router;
