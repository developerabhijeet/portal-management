import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import taskRoutes from "./routes/TaskRoutes";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectUpdateRoutes";
import persanalInfoRoutes from "./routes/personalInfoEditRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";
import sendMail from "./controllers/sendEmail";
import leaveSection from "./routes/leaveRoutes";
import EditSkills from "./routes/editSkillsRoutes";
import ForgotPass from "./routes/forgotPasswordRoutes";
import HoliDays from "./routes/holiDaysRoutes";

const app = express();
const port = 4500;

// Configure CORS middleware
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
// Define routes after applying CORS middleware
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/project", projectRoutes);
app.use("/editPesonalInfo", persanalInfoRoutes);
app.use("/leaveSection", leaveSection);
app.use("/EditSkills", EditSkills);
app.use("/forgotPass", ForgotPass);
app.use("/holiDays", HoliDays);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log("Bestpeers Db is connected");
  })
  .catch((e) => {
    console.log("No connection with Bestpeers Db");
  });
sendMail();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
