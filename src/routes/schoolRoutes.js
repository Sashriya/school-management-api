import express from 'express';
import { addSchool, listSchools } from '../controllers/schoolController.js';
import { validateSchool, validateCoordinates } from '../middleware/validation.js';

const router = express.Router();

router.post('/addSchool', validateSchool, addSchool);
router.get('/listSchools', validateCoordinates, listSchools);

export default router;