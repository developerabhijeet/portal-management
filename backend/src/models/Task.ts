
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
    
  },
  tasks: {
    type:[Object],
    
  },
  project_status: {
    type: String,
    
  },
  dueDate: {
    type: String,
    required:true,
    unique:true,
    
  },
  working_hour:{
    type:String,
    
  },
  completed: {
    type: Boolean,
    default: false,
  },
 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
