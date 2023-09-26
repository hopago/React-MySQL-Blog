import express from 'express';
import { getPosts, getSinglePost, addPost, deletePost, updatePost } from '../controllers/post.js';

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;