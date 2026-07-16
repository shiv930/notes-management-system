import express from "express"
import { noteCreate, noteDelete, noteRead, noteUpdate, singleNote } from "../controller/note.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const noterouter= express.Router()

noterouter.post("/create",authMiddleware,noteCreate)
noterouter.get("/read",authMiddleware,noteRead)
noterouter.patch("/update/:id",authMiddleware,noteUpdate)
noterouter.delete("/delete/:id",authMiddleware, noteDelete)
noterouter.get("/single/:id",authMiddleware, singleNote)

export default noterouter