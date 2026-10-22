import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: String,
  gender: { type: String, enum: ["male", "female"] },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  changeCredentialsTime: Date,
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
