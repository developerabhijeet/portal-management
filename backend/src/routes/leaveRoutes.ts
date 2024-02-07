import express from "express";
import createLeaveController from "../controllers/leaveController";
const router = express.Router();

router.post("/:id", createLeaveController.createLeave);
router.get("/:id", createLeaveController.getAllLeave);

export default router;
