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
    const { email, password, confirmPass, firstName, lastName } = req.body;
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
        firstName: firstName,
        lastName: lastName,
        password: password,
        
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
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          password: newUser.password,
          role: newUser.role,
        },
        token,
      });
    } catch (error) {
      handleError(res, "An error occurred while signing up.");
    }
  },
  async getEditpersonalDetails(req: any, res: Response) {
    try {
      const userId = req.params.id;
      const personalEditDetails = await User.findById(userId);

      if (personalEditDetails) {
        res.json(personalEditDetails);
      } else {
        res.status(404).json({ error: "personal details is not found." });
      }
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching the the user information.",
      });
    }
  },
  async UpdatePersonalDetails(req: any, res: Response) {
    const { email, password } = req.body;
    try {
      const userId = req.params.id;
      const updatedDetails = req.body;
      const updateUserDetails = await User.findByIdAndUpdate(
        userId,
        updatedDetails,
        {
          new: true,
        }
      );
      const isPasswordChecked = await bcrypt.compare(password, updateUserDetails.password);

      if (!isPasswordChecked) {
        return res
          .status(404)
          .json({ errorMessage: "Password is not matched" });
      }
      const hash = hashPassword(updateUserDetails.password);

      if (updateUserDetails) {
        res.status(200).json(updateUserDetails);
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } catch (error) {
      console.error("Error updating personal details:", error);
      res.status(500).json({
        error: "An error occurred while updating personal details.",
      });
    }
  },
};

export default userController;
