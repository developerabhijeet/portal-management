import mongoose, { Document, Schema } from "mongoose";

interface ICalls extends Document {
  clientName: string;
  developerProfile: string;
  assignedTo: string;
  round: string;
  status: string;
  mode: string;
  deeadlineDatefrom: Date;
  deeadlineDateTo: Date;
  technology: string;
  priority: string;
  user: any;
}
const callsSchema = new Schema<ICalls>({
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
  deeadlineDatefrom: {
    type: Date,
    required: true,
  },
  deeadlineDateTo: {
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
const Calls = mongoose.model<ICalls>("Calls", callsSchema);
export default Calls;
