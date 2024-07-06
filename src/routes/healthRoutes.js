import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/health', (_req, res) => {
  console.log('GET /health');

  const states = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  }

  res.status(200).json(
    {
      api: 'OK',
      database: states[mongoose.connection.readyState],
    }
  );
});

export default router;
