
import express from 'express';
import userController from '../controllers/userContoller';
import sendMail from '../controllers/sendEmail';

const router = express.Router();

router.post('/signup', userController.signUp); 
router.get('/sendEmail', sendMail.mail); 


export default router;
