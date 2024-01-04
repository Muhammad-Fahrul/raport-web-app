import mongoose from "mongoose";

const raportSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    chapter: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    verse: {
      type: Number,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Raport = mongoose.model("Raport", raportSchema);

export default Raport;
