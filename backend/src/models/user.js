import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },

    password: {
      type: String,
      required: true,
    },
    
    photo: {
      type: String,
    },
    role: {
      type: String,
      default:"user"
    },
    
  },
  { timestamps: true }
);

const User = model("firstclustersignup", userSchema);

// module.exports = User;
export default User;