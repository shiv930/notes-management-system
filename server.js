import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./src/config/db.js";
import router from "./src/routes/user.route.js";
import noterouter from "./src/routes/note.route.js";
import checkRouter from "./src/routes/check.routes.js"
import postRouter from "./src/routes/post.routes.js"
const app = express();

connectDb();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use("/api/auth", router);
app.use("/api/note", noterouter);
app.use("/api/me",checkRouter)
app.use("/api/post",postRouter)

app.listen(3000, () => {
  console.log("serrver is running on port 3000");
});
