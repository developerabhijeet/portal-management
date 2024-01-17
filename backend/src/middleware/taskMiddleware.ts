import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";


const Task_Data_Check = (requiredFields: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
      } else {
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};


export default Task_Data_Check;
