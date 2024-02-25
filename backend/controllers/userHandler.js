import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import { generateToken } from '../utils/generateToken.js';

const userController = {
  async registerUser(req, res) {
    const { username, phoneNumber, password, role = 'admin' } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create new user
      user = new User({
        username,
        phoneNumber,
        password,
        role,
      });

      // If mentorId provided, assign mentor
      if (role === 'mentor' && mentorId) {
        user.mentor = mentorId;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to database
      await user.save();

      // Return JWT token
      generateToken(res, user._id);

      console.log(user);
      res.status(201).json({ data: { user } });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },

  // async loginUser(req, res) {
  //   const { email, password } = req.body;

  //   try {
  //     // Check if user exists
  //     let user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(400).json({ msg: 'Invalid credentials' });
  //     }

  //     // Check password
  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) {
  //       return res.status(400).json({ msg: 'Invalid credentials' });
  //     }

  //     // Return JWT token
  //     const payload = {
  //       user: {
  //         id: user.id,
  //       },
  //     };

  //     jwt.sign(
  //       payload,
  //       process.env.JWT_SECRET,
  //       { expiresIn: 3600 }, // Expires in 1 hour
  //       (err, token) => {
  //         if (err) throw err;
  //         res.json({ token });
  //       }
  //     );
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server Error');
  //   }
  // },
};

export default userController;
