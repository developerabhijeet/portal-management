import { Request, Response } from "express";
import Project from "../models/project";
const ProjectUpdateController = {
  async createProject(req: Request, res: Response) {
    try {
      const task = await Project.create(req.body);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error." });
    }
  },
  async getAllUserProject(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const projects = await Project.find({ user: userId });
      res.status(200).json({ projects });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default ProjectUpdateController;
