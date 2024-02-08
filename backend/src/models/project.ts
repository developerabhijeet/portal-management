import mongoose, { Document, Schema } from "mongoose";

interface IProject extends Document {
  projectName: string;
  date: string;
  action: string;
  user: any;
}
const projectSchema = new Schema<IProject>({
  projectName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Project = mongoose.model<IProject>("Project", projectSchema);

export default Project;
