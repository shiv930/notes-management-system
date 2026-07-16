import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

//CREATE USER
export const userCreate = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "all feild is required",
      });
    }
    const hassPass = bcrypt.hashSync(password, 10);
    const userData = await userModel.create({
      name,
      email,
      password: hassPass,
    });
    const token = jwt.sign({ id: userData._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15min",
    });
    res.cookie("token", token);

    res.status(201).json({
      success: true,
      message: "user register successfully",
      data: userData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//READ USER

export const readUser = async (req, res) => {
  try {
    let read = await userModel.find();
    return res.status(200).json({
      success: true,
      message: "all user fetched successfully",
      data: read,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//UPDATE USER
export const updatedUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let { name, email, password } = req.body;
    const update = await userModel.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true, runValidators: true },
    );
    return res.status(200).json({
      success: true,
      message: "data updated successfully",
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//DELETE USER

export const deleteUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let deleteUser = await userModel.findByIdAndDelete(userId);
    return res.status(200).json({
      success: true,
      message: " user is deleted successfully",
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//SINGLE USER

export const singleUser = async (req, res) => {
  try {
    let { userId } = req.params;
    const singleuser = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      message: "single user fetched",
      data: singleuser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//LOGIN CONTROLLER
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user note found",
      });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        message: "invalid credentials",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "login successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//LOGOUT CONTROLLER
export const userLogout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
};

// CHECK
// export const check = async (req, res) => {
//   try {
//     const user = await userModel.findById(req.userId).select("name email");
//     if (!user) {
//       return res.status(404).json({
//         success: true,
//         message: "user not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user,   // 
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
