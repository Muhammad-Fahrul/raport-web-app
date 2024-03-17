import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['mentor', 'student'],
    required: true,
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  raport: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Raport' }],
});

UserSchema.pre('save', async function (next) {
  const studentCount = await mongoose.models.User.countDocuments({
    mentorId: this.mentorId,
  });
  if (studentCount >= 3) {
    const err = new Error(
      'Batas jumlah item dalam koleksi Raport telah tercapai'
    );
    next(err);
  } else {
    next();
  }
});
const User = mongoose.model('User', UserSchema);

export default User;
