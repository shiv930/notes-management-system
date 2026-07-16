import express from 'express'
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router()

router.get("/check",authMiddleware,(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"check api",
        // error,
        data:req.user
    })
})

export default router