import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/login', authController.login);
router.get('/getEmail', authController.getAllUserEmails);

export default router;
