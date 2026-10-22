import { Message } from "../../DB/models/message.model.js";
import { User } from "../../DB/models/user.model.js";

export const sendMessage = async (req, res, next) => {
  const { content, receiverId } = req.body;

  if (!(await User.findById(receiverId)))
    return next(new Error("Receiver not found", { cause: 404 }));

  const message = await Message.create({ content, receiverId });
  res.status(201).json({ message: "Message sent", data: message });
};

export const getMyMessages = async (req, res) => {
  const messages = await Message.find({ receiverId: req.user._id }).sort({ createdAt: -1 });
  res.json({ messages });
};

export const getMessage = async (req, res, next) => {
  const message = await Message.findOne({ _id: req.params.id, receiverId: req.user._id });
  if (!message) return next(new Error("Message not found", { cause: 404 }));
  res.json({ message });
};

export const deleteMessage = async (req, res, next) => {
  const message = await Message.findOneAndDelete({ _id: req.params.id, receiverId: req.user._id });
  if (!message) return next(new Error("Message not found or not yours", { cause: 404 }));
  res.json({ message: "Message deleted" });
};
