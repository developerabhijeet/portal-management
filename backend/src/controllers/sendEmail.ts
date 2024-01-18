import cron from "node-cron";
import nodemailer from "nodemailer";
import { Request } from "express";
import Task from "../models/Task";
import User from "../models/User";

const sendMail = {
  mail: async (req: Request<any>, res: any) => {
    cron.schedule("12 9 * * *", async () => {
      try {
        const users = await User.find();
        const tasks = await Task.find();
        
        users.forEach(async (user) => {
          const matchingTask = tasks.find((task) => task.user.equals(user._id));
          
          // Compare dueDate with current date
          const currentDate = new Date().toLocaleDateString();
          if (matchingTask && matchingTask.dueDate === currentDate) {
          } else {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "your gmail account here ",
                pass: "your gmail account verification code here",
              },
            });
            const linkUrl = "http://localhost:3000/send_daily_status";

            const htmlContent = `
              <html>
                <head>
                </head>
                <body>
                  <img src="">
                  <h1>Last Reminder :: You missed your daily status update at ${currentDate}</h1>
                  <p>Please fill out your daily status</p>
                  <p>Click <a href="${linkUrl}">here</a> to submit your status.</p>
                </body>
              </html>
            `;
            
            const mailOptions = {
              from: "sender email",
              to: user.email,
              subject: `Last Reminder :: You missed your daily status update at ${currentDate}`,
              html: htmlContent,
            };

            await transporter.sendMail(mailOptions);
          }
        });

      } catch (error) {
        console.error("Error sending emails:", error);
      }
    });
  },
};

export default sendMail;

