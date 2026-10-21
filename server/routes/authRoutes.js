import express from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController.js';
import { verifyUserToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyUserToken, getMe);
router.put('/profile', verifyUserToken, updateProfile);

export default router;
