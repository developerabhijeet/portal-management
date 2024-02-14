import mongoose, { Document, Schema } from "mongoose";
interface ILeave extends Document {
  email: string[];
  leaveType: string;
  fromDate: string;
  ToDate: string;
  fromSession: string;
  toSession: string;
  days: number;
  reason: string;
  user: any;
}
const leaveSchema = new Schema<ILeave>({
  email: {
    type: [String],
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  fromDate: {
    type: String,
    required: true,
  },
  ToDate: {
    type: String,
    required: true,
  },
  fromSession: {
    type: String,
    required: true,
  },
  toSession: {
    type: String,
    required: true,
  },
  days: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const LeaveSections = mongoose.model<ILeave>("LeaveSections", leaveSchema);

export default LeaveSections;
