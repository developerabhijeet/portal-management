const cron = require("node-cron");
const nodemailer = require("nodemailer");
// const UserModel = require('./models/user'); // Import your user model

const sendMail = {
  mail: async (req: any, res: any) => {
    cron.schedule("08 00 * * *", async () => {
      try {
        // const usersToEmail = await UserModel.find({ email: { $nin: ['excluded@email.com'] } });
        const usersToEmail = [
          "chkushwaha@bestpeers.com",
          "prichourasiya@bestpeers.com",
        ];

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "chkushwaha@bestpeers.com",
            pass: "ppbe cugb xjno msqi",
          },
        });

        var htmlContent = `
          <html>
            <head>
              <style>
                /* Add any styling here */
              </style>
            </head>
            <body>
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" alt="Logo" style="max-width: 100px;">
              <h1>Daily status missing</h1>
              <p>Please fill out your daily status</p>
              <!-- Add any additional text or content here -->
            </body>
          </html>
        `;

        const emailPromises = usersToEmail.map(async (user) => {
          const mailOptions = {
            from: "chkushwaha@bestpeers.com",
            to: user,
            subject: "You are missing the daily status",
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
