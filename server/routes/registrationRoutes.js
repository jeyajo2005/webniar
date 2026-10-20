import express from 'express';
import { 
  registerAttendee, 
  getRegistrationById, 
  getAllRegistrations,
  simulateDripMessage 
} from '../controllers/registrationController.js';

const router = express.Router();

router.post('/', registerAttendee);
router.post('/simulate-drip', simulateDripMessage);
router.get('/', getAllRegistrations);
router.get('/:id', getRegistrationById);

export default router;

