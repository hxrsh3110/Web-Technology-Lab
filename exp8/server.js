import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/logger.js';
import equipmentRoutes from './routes/equipmentRoutes.js';

const app = express();
const PORT = 5500;

// Standard Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// System Health Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    service: "ApexFit Studio Equipment REST API",
    status: "Healthy",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/v1/equipment', equipmentRoutes);

// Catch-all 404 Route
app.use((req, res) => {
  res.status(404).json({ success: false, error: `Cannot ${req.method} ${req.originalUrl} - Endpoint does not exist.` });
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.stack);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`🚀 ApexFit REST API server listening on http://localhost:${PORT}`);
  console.log(`📡 Equipment Endpoints available at: http://localhost:${PORT}/api/v1/equipment`);
});