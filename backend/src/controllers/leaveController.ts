import { Request, Response } from "express";
import LeaveSections from "../models/leaveSection";
const createLeaveController = {
  async createLeave(req: any, res: Response) {
    try {
      const LeaveData = {
        ...req.body,
      };
      const leaveInfo = await LeaveSections.create(LeaveData);
      res.status(201).json(leaveInfo);
    } catch (error) {
      console.error("Error create leave section:", error);
      res.status(500).json({
        error: "error is created the leave section.",
      });
    }
  },
  async getAllLeave(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const leaveInfo = await LeaveSections.find({ user: userId });
      res.status(200).json({ leaveInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "get Internal server error" });
    }
  },
};
export default createLeaveController;
