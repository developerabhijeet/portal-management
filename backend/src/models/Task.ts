
import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  email:string[];
  status: string;
  project_status: string;
  dueDate: string;
  working_hour:string;
  completed: boolean;
  tasks:string[],
  user:any,
}

const taskSchema = new Schema<ITask>({
  email: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required:true,
  },
  tasks: {
    type:[Object],
    required:true,
  },
  project_status: {
    type: String,
    required:true,
  },
  dueDate:  { type: String,},
  working_hour:{
    type:String,
    required:true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
