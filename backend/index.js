import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';

import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const PORT = 5000;

// Connect to MongoDB
connectDB();

const app = express();

app.use((req, res, next) => {
  // Allow requests from a specific origin (replace '*' with your client's origin)
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Allow credentials (cookies, authorization headers, etc.) to be sent
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Allow specific headers to be sent by the client
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  // Allow specific HTTP methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );

  // Continue to the next middleware
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
