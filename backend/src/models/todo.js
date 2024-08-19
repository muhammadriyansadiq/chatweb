import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    }

  },
  { timestamps: true }
);

const Usertodo = model("todo", userSchema);

// module.exports = User;
export default Usertodo;