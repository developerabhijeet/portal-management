const cron = require("node-cron");
const nodemailer = require("nodemailer");
const UserModel = require("./models/user");
const sendMail = {
  mail: async (req: any, res: any) => {
    cron.schedule("08 00 * * *", async () => {
      try {
        const usersToEmail = await UserModel.find({
          email: { $nin: ["excluded@email.com"] },
        });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "portal9589@gmail.com",
            pass: "your email verification password here",
          },
        });

        var htmlContent = `
  <html>
    <head>
      <style>
      </style>
    </head>
    <body>
      <img src="">
      <h1>Last Reminder :: You missed your daily status update at ${new Date().toLocaleDateString()}</h1>
      <p>Please fill out your daily status</p>
    
    </body>
  </html>
`;

        const emailPromises = usersToEmail.map(async (user) => {
          const mailOptions = {
            from: "portal9589@gmail.com",
            to: user,
            subject: `Last Reminder :: You missed your daily status update at ${new Date().toLocaleDateString()}`,
            html: htmlContent,
          };

          return transporter.sendMail(mailOptions);
        });

        await Promise.all(emailPromises);

        console.log("Emails sent successfully.");
      } catch (error) {
        console.error("Error sending emails:", error);
      }
    });
  },
};

export default sendMail;
