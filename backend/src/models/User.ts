
import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email:string;
  password: string;
  tasks:any,
  role: "user" | "admin";
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
},
{
  timestamps: true,
}
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
