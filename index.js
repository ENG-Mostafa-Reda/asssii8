import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRouter from "./src/modules/user/user.controller.js";
import messageRouter from "./src/modules/message/message.controller.js";

const app = express();
app.use(express.json());

await mongoose.connect(process.env.DB_URI);
console.log("DB connected");

app.use("/users", userRouter);
app.use("/messages", messageRouter);

app.use((req, res, next) => next(new Error("Route not found", { cause: 404 })));

app.use((err, req, res, next) => {
  res.status(err.cause || 500).json({ message: err.message });
});

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
