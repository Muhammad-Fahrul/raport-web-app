import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
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
  mentor: {
    type: String,
    ref: 'User',
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
