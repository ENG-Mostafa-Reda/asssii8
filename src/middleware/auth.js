import { decodeToken } from "../utils/token.js";

export const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      req.user = await decodeToken({ authorization: req.headers.authorization });

      if (roles.length && !roles.includes(req.user.role))
        return next(new Error("Forbidden", { cause: 403 }));

      next();
    } catch (err) {
      next(err);
    }
  };
};
