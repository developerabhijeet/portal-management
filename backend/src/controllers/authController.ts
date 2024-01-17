import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Create an array to store revoked tokens
const tokenBlacklist = [];

type RequestType = {
  email: string;
  password: string;
};

const authController = {
  async login(req: Request<RequestType>, res: any) {
    const { email, password} = req.body;
    try {
      const user = await User.findOne({ email: email });
      const isPasswordChecked = await bcrypt.compare(password, user.password);

      if(!email){
        return res
        .status(404)
        .json({errorMessage: "user is not found"});
      }

      if (!isPasswordChecked) {
        return res
          .status(404)
          .json({ errorMessage: "password is not matched" });
      }
      const token = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_TOKEN,
        { expiresIn: "5h" }
      );
      res
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expiresIn: "10h",
        })
        .cookie("username", user.username, {
          httpOnly: true,
          expiresIn: "10h",
        })
        .status(200)
        .json({ token, username: user.username });
    } catch (err) {
      res.status(500).json(err);
    }
  
  },

  async logout(req, res) {
    try {
      const token = req.cookies.access_token;

      if (!token) {
        return res
          .status(400)
          .json({ error: "Token not found in the request." });
      }

      res.clearCookie("access_token");
      tokenBlacklist.push(token);
      res.status(200).json("Logged out successfully");
    } catch (err:any) {
      alert(err);
      res.status(500).json({ error: "An error occurred during logout." });
    }
  },


   async getAllUserEmails(req, res) {
    try {
      const users = await User.find({}, "email");
  
      if (!users || users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }
  
      const emails = users.map((user) => user.email);
  
      res.status(200).json({ emails });
    } catch (error) {
      alert(error);
      res.status(500).json({ error: "Internal server error" });
    }
   }
  
}


// Export the tokenBlacklist array so that it can be used in other parts of your application
export { tokenBlacklist };
export default authController;
