import express from "express";
import ProjectUpdateController from "../controllers/updateProject";
const router = express.Router();

router.put("/:id", ProjectUpdateController.updateProject);
router.get("/:id", ProjectUpdateController.getAllUserProject);

export default router;
