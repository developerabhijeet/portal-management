import mongoose, { Document, Schema } from "mongoose";

interface IHoliDays extends Document {
  date: Date;
  occassion: string;
  user: any;
}
const holiDaysSchema = new Schema<IHoliDays>({
  date: {
    type: Date,
    required: true,
  },
  occassion: {
    type: String,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const HoliDays = mongoose.model<IHoliDays>("HoliDays", holiDaysSchema);

export default HoliDays;
