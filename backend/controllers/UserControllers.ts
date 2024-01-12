import { Request, Response } from "express";
import { UserModel, SendDailyStatusModel } from "../modal/UserModel";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const users: any = [];
interface AuthRequest extends Request {
  userId?: string;
}
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    console.log(req.body);
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    const user = new UserModel({ username, email, password });
    await user.save();
    res.status(201).json({ message: "Registration Successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });

    if (user) {
      const { _id, email, password } = user;
      res
        .status(200)
        .json({ message: "Login successfully", _id, email, password, token });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

export const getAllUserEmails = async (req: AuthRequest, res: Response) => {
  try {
    const users = await UserModel.find({}, "email");

    if (!users || users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    const emails = users.map((user) => user.email);

    res.status(200).json({ emails });
  } catch (error) {
    console.error("Error retrieving user emails:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
interface CustomRequest extends Request {
  userId: string;
}
export const verifyToken = (req: CustomRequest, res: Response, next: any) => {
  console.log("===== function is running");
  const token = req.cookies.token;

  const authorization = req.headers.authorization || req.headers.Authorization;
  console.log("================authorization", authorization);
  if (!authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(
    authorization,
    process.env.JWT_SECRET,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }

      req.userId = decoded.userId;
      next();
    }
  );
};
export const sendDailyStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { email, date, project_status, working_hour, task, status } =
      req.body;
    const existingUser = await SendDailyStatusModel.findOne({
      userId: req.userId,
      date,
    });
    if (existingUser) {
      existingUser.set({
        email,
        project_status,
        working_hour,
        task,
        status,
        date,
      });
      await existingUser.save();

      return res.status(200).json({ message: "Update Successful" });
    }
    const user = new SendDailyStatusModel({
      userId: req.userId,
      email,
      date,
      project_status,
      working_hour,
      task,
      status,
    });
    await user.save();

    return res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAll_Daily_status = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    console.log("verifyToken===================");
    const allData = await SendDailyStatusModel.find({ userId: req.userId });

    if (!allData || allData.length === 0) {
      return res.status(404).json({ error: "No daily status entries found" });
    }

    res.status(200).json({ data: allData });
  } catch (error) {
    console.error("Error retrieving all data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
