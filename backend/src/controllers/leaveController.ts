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
  async deleteLeave(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const leaveInfoBody = req.body;
      const leaveInfo = await LeaveSections.findByIdAndDelete(
        userId,
        leaveInfoBody
      );
      if (leaveInfo) {
        res.status(200).json({ message: "MyLeave deleted successfully" });
      } else {
        res.status(404).json({ error: "MyLeave is not found." });
      }
    } catch (error) {
      console.error("Error updating MyLeave details:", error);
      res.status(500).json({
        error: "An error occurred while updating MyLeave details.",
      });
    }
  },
};
export default createLeaveController;
