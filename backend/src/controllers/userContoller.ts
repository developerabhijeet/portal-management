import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

type RequestType = {
  email: string;
  password: string;
};
// Common function for bcrypt password hashing
const hashPassword = (password: any) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};
// Common error handler function
const handleError = (res: Response, errorMessage: string) => {
  res.status(500).json({ error: errorMessage });
};

const userController = {
  async signUp(req: Request<RequestType>, res: Response) {
    const { email, password, username } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({
          errorMessage:
            "Email is already taken. Please choose a different email.",
        });
      }
      const hash = hashPassword(password);
      const newUser = new User({
        email: email,
        username: username,
        password: hash,
      });
      await newUser.save();
      const token = jwt.sign(
        { email: newUser.email, _id: newUser._id },
        process.env.jwtSecret,
        { expiresIn: "5h" }
      );

      const maxAge = 3 * 60 * 60;
      res.cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + maxAge * 1000),
      });
      res.status(200).json({
        message: "Registration successful",
        user: {
          _id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
        },
        token,
      });
    } catch (error) {
      handleError(res, "An error occurred while signing up.");
    }
  },
};

export default userController;
