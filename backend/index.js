import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', userRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
