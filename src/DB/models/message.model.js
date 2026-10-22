import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  content: { type: String, required: true, minlength: 1 },
  receiverId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
