import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/bookManagement';

app.use(bodyParser.json());
app.use(cors());

app.use('/api/books', bookRoutes);

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Connection error', error.message);
  });
