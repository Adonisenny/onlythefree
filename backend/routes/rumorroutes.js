import express from 'express'

import { createRumorControls, deleteRumorControls, getProfileRumour, getRumorcontrol, getallRumorcontrols, updateLikes } from '../Controllers/rumorController.js'

const router = express.Router()

//get all
router.get("/", getallRumorcontrols)
// get single
router.get("/:id",getRumorcontrol )
// create posts
router.post("/", createRumorControls)
//delete

router.delete("/:id",deleteRumorControls)

// it is updated
router.put("/:id/like",updateLikes)

router.get("/profilerumors/:theId",getProfileRumour )

export default router