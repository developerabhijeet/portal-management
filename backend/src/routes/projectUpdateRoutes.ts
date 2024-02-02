import express from "express";
import ProjectUpdateController from "../controllers/updateProject";
const router = express.Router();

router.post("/:id", ProjectUpdateController.createProject);
router.get("/:id", ProjectUpdateController.getAllUserProject);

export default router;
