import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './router/auth.route.js';
import postRoutes from './router/post.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
const __dirname = path.resolve();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Exit the process on connection error
  });

// Routes
app.get('/test', (req, res) => {
  res.json('This is for test');
});

app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

// Serve static files (e.g., frontend build)
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Serve index.html for any other routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT  // Default port is 5000 if not specified in .env
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
