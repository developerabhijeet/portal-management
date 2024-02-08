import express from "express";
import sendForgotEmailController from "../controllers/ForgotPassword";

const router = express.Router();

router.post("/forgot-password", sendForgotEmailController.createForgotEmail);
router.get(
  "/reset-password/:id/:token",
  sendForgotEmailController.getResetpPassword
);
router.post(
  "/reset-password/:id/:token",
  sendForgotEmailController.createResetPassword
);

export default router;
