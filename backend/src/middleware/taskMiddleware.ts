import { Request, Response, NextFunction } from "express";
const Task_Data_Check = (req: any, res: Response, next: NextFunction) => {
  const requiredFields = Object.keys(req.body); 
  const schemaFields = [
    "email",
    "status",
    "project_status",
    "dueDate",
    "working_hour",
   
  ];

  const missingFields = schemaFields.filter(
    (field) => !requiredFields.includes(field)
  );
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing required fields: ${missingFields.join(", ")}` });
  }

  next();
};
export default Task_Data_Check;
