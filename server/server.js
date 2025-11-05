import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import postRoutes from './routes/postRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Learnato Connect API is running' });
});

app.use('/api/posts', postRoutes);
app.use('/api/ai', aiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
