import mongoose, { Document, Schema } from "mongoose";
interface ITest extends Document {
  clientName: string;
  developerProfile: string;
  assignedTo: string;
  round: string;
  status: string;
  mode: string;
  scheduleDatefrom: Date;
  scheduleDateTo: Date;
  technology: string;
  priority: string;
  user: any;
}
const testsSchema = new Schema<ITest>({
  clientName: {
    type: String,
    required: true,
  },
  developerProfile: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String,
    required: true,
  },
  round: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  scheduleDatefrom: {
    type: Date,
    required: true,
  },
  scheduleDateTo: {
    type: Date,
    required: true,
  },
  technology: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const Tests = mongoose.model<ITest>("Test", testsSchema);
export default Tests;
