import express from "express"
import { upload } from "../config/multer.js"
import { getImageController } from "../controller/post.controller.js"

const router  = express.Router()
router.post("/", upload.single("image"),getImageController)

export default router