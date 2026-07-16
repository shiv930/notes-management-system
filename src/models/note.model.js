import mongoose from "mongoose";
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "name feild is reuired "],
    trim:true
  },
  description: {
    type: String,
    required: [true, "email feild is required"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    required: [true, "password is required"],
  },
  image: {
    type: String,
    default: ""
}
});

const noteModel = mongoose.model("note", noteSchema);
export default noteModel;
