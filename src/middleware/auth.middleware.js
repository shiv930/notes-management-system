import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const authMiddleware = async(req, res, next) => {
  try {
    
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
 if(!decoded){
    return res.status(400).json({
            success:false,
            message:"invlid token "
        })
   }

   const user = await userModel.findById(decoded.id)
   req.user = user
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
};
