import { Request, Response } from "express";
import Task from "../models/Task";
const taskController = {
  async createTask(req: any, res: Response) {
    console.log("create task called...");
    try {
      const newTaskData = {
        ...req.body,
        user: req.user._id,
      };
      newTaskData.dueDate = new Date(newTaskData.dueDate).toLocaleDateString();
      const task = await Task.create(newTaskData);
      res.status(201).json(task);
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({
        error:
          "An error occurred while creating the task. See server logs for details.",
      });
    }
  },
  async getAllTasks(req: any, res: Response) {
    try {
      const { page, perPage, completed, sortByDueDate, sortByCompleted } =
        req.query;

      const query =
        completed !== undefined
          ? {
              completed: completed === "true",
              $or: [
                { email: { $all: [req.user.email] } },
                { user: req.user._id },
              ],
            }
          : {
              $or: [
                { email: { $all: [req.user.email] } },
                { user: req.user._id },
              ],
            };

      const sortOptions: any = {};
      if (sortByDueDate) sortOptions.dueDate = sortByDueDate === "asc" ? 1 : -1;
      if (sortByCompleted)
        sortOptions.completed = sortByCompleted === "asc" ? 1 : -1;

      const totalTasks = await Task.countDocuments(query);
      const totalPages = Math.ceil(totalTasks / +perPage);

      const userTasks = await Task.find(query)
        .populate({ path: "user", select: "username -_id" })
        .sort(sortOptions)
        .skip((+page - 1) * +perPage)
        .limit(+perPage);

      const response = {
        tasks: userTasks,
        currentPage: +page,
        totalPages: totalPages,
        nextPage: +page < totalPages ? +page + 1 : null,
        prevPage: +page > 1 ? +page - 1 : null,
      };

      res.json(response);
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching tasks." });
    }
  },

  async getTaskById(req: Request, res: Response) {
    try {
      const task = await Task.findById(req.params.id);
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the task." });
    }
  },

  async updateTask(req: Request, res: Response) {
    try {
      const newTaskData = req.body;
      newTaskData.dueDate = new Date(newTaskData.dueDate).toLocaleDateString();
  
      const task = await Task.findByIdAndUpdate(req.params.id, newTaskData, {
        new: true,
      });
  
      console.log(req.params.id, "method is called");
  
      if (task) {
        res.json(task);
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "An error occurred while updating the task." });
    }
  },
  
  async deleteTask(req: Request, res: Response) {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (task) {
        res.json({ message: "Task deleted successfully" });
      } else {
        res.status(404).json({ error: "Task not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while deleting the task." });
    }
  },
};

export default taskController;
