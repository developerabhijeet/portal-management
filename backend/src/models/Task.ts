import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  email: string[];
  status: string;
  projectStatus: string;
  dueDate: string;
  workingHour: string;
  completed: boolean;
  tasks: {
    projectStatus: string;
    workingHour: string;
    status: string;
    task: string;
  }[];
  user: any;
}

const taskSchema = new Schema<ITask>({
  email: {
    type: [String],
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  tasks: [
    {
      projectStatus: {
        type: String,
        required: true,
      },
      workingHour: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      task: {
        type: String,
        required: true,
      },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
