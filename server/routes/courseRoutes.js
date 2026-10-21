import express from 'express';
import {
  getCourses,
  getCourseById,
  getCourseClassroom,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import { optionalUserToken, verifyUserToken, verifyAdminToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.get('/:id', optionalUserToken, getCourseById);
router.get('/:id/learn', optionalUserToken, getCourseClassroom);

// Admin course management
router.post('/', verifyAdminToken, createCourse);
router.put('/:id', verifyAdminToken, updateCourse);
router.delete('/:id', verifyAdminToken, deleteCourse);

export default router;
