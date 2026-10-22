import jwt from "jsonwebtoken";
import { User } from "../DB/models/user.model.js";

export const getSecrets = (prefix) => {
  switch (prefix) {
    case "Bearer":
      return { access: process.env.USER_ACCESS_SECRET, refresh: process.env.USER_REFRESH_SECRET };
    case "System":
      return { access: process.env.ADMIN_ACCESS_SECRET, refresh: process.env.ADMIN_REFRESH_SECRET };
    default:
      return null;
  }
};

export const generateTokens = (user) => {
  const prefix = user.role === "admin" ? "System" : "Bearer";
  const { access, refresh } = getSecrets(prefix);

  const accessToken = jwt.sign({ id: user._id, role: user.role }, access, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ id: user._id }, refresh, { expiresIn: "7d" });
  return { accessToken, refreshToken, prefix };
};

export const decodeToken = async ({ authorization, tokenType = "access" }) => {
  if (!authorization) throw new Error("Authorization header is required", { cause: 401 });

  const [prefix, token] = authorization.split(" ");
  if (!prefix || !token) throw new Error("Invalid authorization format", { cause: 401 });

  const secrets = getSecrets(prefix);
  if (!secrets) throw new Error("Invalid token prefix", { cause: 401 });

  const secret = tokenType === "access" ? secrets.access : secrets.refresh;

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch {
    throw new Error("Invalid or expired token", { cause: 401 });
  }

  const user = await User.findById(decoded.id);
  if (!user) throw new Error("User not found", { cause: 404 });

  // لو المستخدم غيّر الباسورد بعد إصدار التوكن
  if (user.changeCredentialsTime && user.changeCredentialsTime.getTime() > decoded.iat * 1000)
    throw new Error("Token expired, please login again", { cause: 401 });

  return user;
};
