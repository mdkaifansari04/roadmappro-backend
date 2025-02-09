import aiRouter from '../routes/ai/router';
import express from 'express';

const router = express.Router();

router.use('/ai', aiRouter);

export default router;
