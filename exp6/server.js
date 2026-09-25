import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import athleteRoutes from './routes/athleteRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/apexfit_db";

// Allow frontend origins (local + production Vercel/Netlify)
app.use(cors());
app.use(express.json());

app.use('/api/athletes', athleteRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    system: "ApexFit Studio OS Production API",
    environment: process.env.NODE_ENV || "production",
    status: "Online"
  });
});

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB Production Database");
    app.listen(PORT, () => {
      console.log(` Production server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.error(" MongoDB Connection Failed:", err.message));