import bcrypt from "bcrypt";
import { User } from "../../DB/models/user.model.js";
import { generateTokens, decodeToken } from "../../utils/token.js";

export const signup = async (req, res, next) => {
  const { name, email, password, phone, gender } = req.body;

  if (await User.findOne({ email }))
    return next(new Error("Email already exists", { cause: 409 }));

  const hashed = bcrypt.hashSync(password, Number(process.env.SALT_ROUND));
  const user = await User.create({ name, email, password: hashed, phone, gender });

  res.status(201).json({ message: "User created successfully", user: { id: user._id, name, email } });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password))
    return next(new Error("Invalid email or password", { cause: 401 }));

  const { accessToken, refreshToken, prefix } = generateTokens(user);
  res.json({ message: "Login success", prefix, accessToken, refreshToken });
};

export const refreshToken = async (req, res, next) => {
  try {
    const user = await decodeToken({ authorization: req.headers.authorization, tokenType: "refresh" });
    const { accessToken, refreshToken } = generateTokens(user);
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res) => {
  const { password, ...user } = req.user.toObject();
  res.json({ user });
};

export const shareProfile = async (req, res, next) => {
  const user = await User.findById(req.params.id).select("name email");
  if (!user) return next(new Error("User not found", { cause: 404 }));
  res.json({ user });
};

export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!bcrypt.compareSync(oldPassword, req.user.password))
    return next(new Error("Old password is wrong", { cause: 400 }));

  req.user.password = bcrypt.hashSync(newPassword, Number(process.env.SALT_ROUND));
  req.user.changeCredentialsTime = new Date();
  await req.user.save();
  res.json({ message: "Password updated, please login again" });
};

export const updateProfile = async (req, res) => {
  const { name, phone, gender } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { name, phone, gender }, { new: true }).select("-password");
  res.json({ message: "Profile updated", user });
};

export const deleteAccount = async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.json({ message: "Account deleted" });
};
