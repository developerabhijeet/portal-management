import mongoose, { Document, Schema } from "mongoose";
interface ILeave extends Document {
  email: string[];
  leaveType: string;
  fromDate: Date;
  ToDate: Date;
  fromSession: number;
  toSession: number;
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
    type: Date,
    required: true,
  },
  ToDate: {
    type: Date,
    required: true,
  },
  fromSession: {
    type: Number,
    required: true,
  },
  toSession: {
    type: Number,
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
