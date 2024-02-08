import { Request, Response } from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const sendForgotEmailController = {
  async createForgotEmail(req: Request, res: Response) {
    const { email } = req.body;
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }

      // Generating token using jwtSecret and user's password
      const secret = process.env.jwtSecret + oldUser.password;
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secret,
        {
          expiresIn: "55m",
        }
      );

      const link = `http://localhost:3000/forgotPass/reset-password/${oldUser._id}/${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "",
          pass: "",
        },
      });

      const htmlContent = `
        <html>
          <head>
            <style>
              /* Add any styling here */
            </style>
          </head>
          <body>
            <h1>Hello ${oldUser.email}!</h1>
            <p>Someone has requested a link to change your password. You can do this through the link below:</p>
            <p><a href="${link}">Change my password</a></p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Your password won't change until you access the link above and create a new one.</p>
            <p>Best Regards,</p>
            <p>BestPeers Team.</p>
          </body>
        </html>
      `;
      const mailOptions = {
        from: "portal9589@gmail.com",
        to: oldUser.email,
        subject: "Password Reset",
        html: htmlContent,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.json({ status: "Error sending forgot password email" });
        } else {
          console.log("Email sent: " + info.response);
          res.json({ status: "Password reset email sent successfully" });
        }
      });
      console.log(link);
    } catch (error) {
      console.error("Error sending forgot password email:", error);
      res.json({ status: "Error sending forgot password email" });
    }
  },

  async getResetpPassword(req: Request, res: Response) {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.jwtSecret + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  },

  async createResetPassword(req: Request, res: Response) {
    const { id, token } = req.params;
    const { password } = req.body;

    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = process.env.jwtSecret + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );

      res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  },
};

export default sendForgotEmailController;
