import express from 'express';
import {
  getSimilarQuestions,
  summarizeDiscussion,
  getAISuggestion
} from '../controllers/aiController.js';

const router = express.Router();

router.post('/similar', getSimilarQuestions);
router.get('/summarize/:id', summarizeDiscussion);
router.post('/suggest', getAISuggestion);

export default router;
