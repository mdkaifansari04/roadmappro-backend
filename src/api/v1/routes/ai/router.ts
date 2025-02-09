import express from 'express';
import * as ai from '../../controllers/ai-controller';
import { roadmapInputValidator } from 'validation/input-valudator';
const router = express.Router();

router.post('/generate-roadmap', roadmapInputValidator, ai.generateRoadmap);

export default router;
