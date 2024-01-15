
import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  email:string[];
  status: string;
  project_status: string;
  dueDate: Date;
  working_hour:string;
  completed: boolean;
  user:any,
}

const taskSchema = new Schema<ITask>({
  email: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
  },
  project_status: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  working_hour:{
    type:String
  },
  completed: {
    type: Boolean,
    default: false,
  },
 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
