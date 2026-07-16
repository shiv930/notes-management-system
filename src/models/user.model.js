import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name feild is reuired "],
  },
  email: {
    type: String,
    required: [true, "email feild is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

const userModel = mongoose.model("crudPractise", userSchema);
export default userModel;
