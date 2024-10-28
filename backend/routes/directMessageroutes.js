import express from 'express'
import { PostMessages, deleteDmControls, getMessagecontrols } from '../Controllers/DmControllers.js'

const router =express.Router()

router.post('/',PostMessages)
router.delete('/:id',deleteDmControls)

router.get('/:conversationId',getMessagecontrols)

export default router;