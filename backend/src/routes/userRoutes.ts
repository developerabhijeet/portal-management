import express from "express";
import userController from "../controllers/userContoller";
import { newUserValidator } from "../middleware/validator";
const router = express.Router();

router.post("/signup", newUserValidator, userController.signUp);
export default router;
