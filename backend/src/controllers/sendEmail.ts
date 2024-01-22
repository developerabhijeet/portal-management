import cron from "node-cron";
import nodemailer from "nodemailer";
import { Request } from "express";
import Task from "../models/Task";
import User from "../models/User";

const sendMail = async () => {
  cron.schedule("31 13 * * *", async () => {
    try {
      const users = await User.find();
      const tasks = await Task.find();
      users.forEach(async (user) => {
        const matchingTask = tasks.find((task) => task.user.equals(user._id));
        const currentDate = new Date().toLocaleDateString();
        if (matchingTask && matchingTask.dueDate === currentDate) {
          console.log(`Task already exists for user ${user.email}. No email sent.`);
        } else {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "your email account here",
              pass: "your two fector authentication password",
            },
          });
          const linkUrl = "http://localhost:3000/send_daily_status";
          const htmlContent = `
            <html>
              <head>
                <style>
                  /* Add any styling here */
                </style>
              </head>
              <body>
                <img src="">
                <h1>Last Reminder :: You missed your daily status update at ${currentDate}</h1>
                <h2>Hi <strong>${user.username}</strong></h2>
                <p>We are waiting for your status update at ${currentDate}.Please send your status <a href="${linkUrl}">here</a>.</p>
                <p>Best Regards,</p>
                <p>BestPeers Team.</p>
              </body>
            </html>
          `;
          const mailOptions = {
            from: "portal9589@gmail.com",
            to: user.email,
            subject: `Last Reminder :: You missed your daily status update at ${currentDate}`,
            html: htmlContent,
          };

          await transporter.sendMail(mailOptions);
          console.log(`Email sent successfully to ${user.email}.`);
        }
      });
    } catch (error) {
      console.error("Error sending emails:", error);
    }
  });
};

export default sendMail;
