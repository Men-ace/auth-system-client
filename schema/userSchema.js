99% of storage used … If you run out, you can't create, edit and upload files. Get 100 GB of storage for $1.99 $0.49/month for 2 months.
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "student",
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: 1,
    },
    phone: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Users
const userModel = mongoose.model("user", userSchema);
export default userModel