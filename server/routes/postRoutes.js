import express from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  addReply,
  upvotePost,
  markAsAnswered,
  searchPosts
} from '../controllers/postController.js';

const router = express.Router();

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/search', searchPosts);
router.get('/:id', getPostById);
router.post('/:id/reply', addReply);
router.post('/:id/upvote', upvotePost);
router.post('/:id/answer', markAsAnswered);

export default router;
