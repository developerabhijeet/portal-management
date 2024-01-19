
import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  email:string;
  password: string;
  tasks:any,
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
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
