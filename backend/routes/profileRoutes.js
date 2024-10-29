import express from 'express'
import { createProfile, getAllProfile, getProfile, updatedProfile } from '../Controllers/profileControllers.js'

const router = express.Router()
router.post('/', updatedProfile)
router.get('/',getAllProfile)
// router.put('/:userId',updatedProfile)
router.get('/:userId', getProfile)
export default router