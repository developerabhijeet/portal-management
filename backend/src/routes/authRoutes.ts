import express from "express";
import authController from "../controllers/authController";
import { newUserValidator } from "../middleware/validator";
const router = express.Router();

router.post("/login",newUserValidator,authController.login);
router.post("/logout", authController.logout);
router.get("/getEmail", authController.getAllUserEmails);

export default router;
