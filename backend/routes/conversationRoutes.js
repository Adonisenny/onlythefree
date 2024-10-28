import express from 'express'
import { CreateConversation, getConversation, getConversationIdControl} from '../Controllers/conversationController.js'

const router = express.Router()
 router.post('/',CreateConversation)
router.get('/:userA/:userB',getConversation)
router.get('/:conversationId',getConversationIdControl)

export default router;