import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

const userController = {
  async signUp(req: Request, res: Response) {
    const { email, password, username } = req.body;

    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({
          errorMessage:
            "Email is already taken. Please choose a different email.",
        });
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = new User({
        email: email,
        username: username,
        password: hash,
      });
      await newUser.save();

      res.status(200).json({ data: "User has been created" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while signing up." });
    }
  },
};

export default userController;
