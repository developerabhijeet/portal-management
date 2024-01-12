import express from "express";
import bodyParser from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import productRoutes from "../routes/product";
const cookieParser = require('cookie-parser')
const cors =require("cors")
const app = express();
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 5500; 
const MONGOURL = process.env.MONGO_URL;
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB is connected successfully");
    app.listen(PORT, () =>
      console.log(`Server is running on PORT : http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(error));

  const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
  };
  
app.use(cors(corsOptions));

app.use("/", productRoutes);
app.get('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logout successful' });
});
app.get("/", (req, res) => res.send("Hello express crud operation ")),
  app.all("*", (req, res) => res.send("That route is doesn't exit "));
