import express, { Router } from "express";
import {
  getAllUserEmails,
  getAll_Daily_status,
  login,
  register,
  sendDailyStatus,
  verifyToken,
} from "../controllers/UserControllers";
const router: Router = express.Router();
const auth = require("../middleware/auth.js");
router.post("/register",register);
router.post("/login", login);
router.get("/getEmail", getAllUserEmails, );
router.get("/get_daily_status",verifyToken, getAll_Daily_status);
router.post("/post_daily_status",verifyToken,sendDailyStatus);
export default router;
