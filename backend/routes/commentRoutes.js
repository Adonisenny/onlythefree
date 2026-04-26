import express from 'express'
import { createComment, getCommentControl } from '../Controllers/commentController.js';

const router = express.Router()


router.get('/:postId', getCommentControl)
router.post('/', createComment)


export default router;