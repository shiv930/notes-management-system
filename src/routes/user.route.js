import express from "express"
import {  deleteUser, readUser, singleUser, updatedUser, userCreate, userLogin, userLogout } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/register", userCreate)
router.get("/read", readUser)
router.patch("/update/:userId",authMiddleware, updatedUser)
router.delete("/delete/:userId",authMiddleware, deleteUser)
router.get("/singleuser/:userId",authMiddleware, singleUser)
router.post("/login", userLogin)
router.post("/logout", userLogout)
// router.get("/check", authMiddleware, check )

export default router