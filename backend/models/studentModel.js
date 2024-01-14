import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const studentSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    nickname: {
      type: String,
    },
    fullname: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    mentorId: {
      type: String,
      ref: "Mentor",
      required: true,
    },
    isMentor: {
      type: Boolean,
      default: false,
      immutable: true,
    },
    isQuran: {
      type: Boolean,
      required: true,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

studentSchema.methods.sanitize = function () {
  const { password, ...others } = this._doc;
  return { ...others };
};

// Match user entered password to hashed password in database
studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// // Encrypt password using bcrypt
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
