import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter the valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: [6, "Password must be up to 6 characters"],
    maxLength: [23, "Password must be more than up to 23 characters"],
  },
  token: { type: String },
},
{
  timestamps: true, 
});


const SendDailyStatusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: { type: String },
  date: { type: String, required: true, unique: true },
  project_status: { type: String },
  status: { type: String },
  working_hour: { type: String },
  task: { type: String },
});

const UserModel = mongoose.model("User", UserSchema);
const SendDailyStatusModel = mongoose.model(
  "SendDailyStatus",
  SendDailyStatusSchema
);

export { UserModel, SendDailyStatusModel };
