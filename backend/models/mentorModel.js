import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const mentorSchema = mongoose.Schema(
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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
    },
    isMentor: {
      type: Boolean,
      default: true,
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

mentorSchema.methods.sanitize = function () {
  const { password, ...others } = this._doc;
  return { ...others };
};

// Match user entered password to hashed password in database
mentorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// // Encrypt password using bcrypt
mentorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Mentor = mongoose.model("Mentor", mentorSchema);

export default Mentor;
