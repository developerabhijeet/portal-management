import express from 'express';
import taskController from '../controllers/TaskController';
import authenticateUser from '../middleware/authMiddleware';
import Task_Data_Check from '../middleware/taskMiddleware';
import sendMail from '../controllers/sendEmail';
const router = express.Router();

router.post('/', authenticateUser,taskController.createTask);
router.get('/', authenticateUser,taskController.getAllTasks,sendMail.mail);
router.get('/:id',taskController.getTaskById);
router.put('/:id', authenticateUser, taskController.updateTask);
router.delete('/:id', authenticateUser, taskController.deleteTask);

export default router;
