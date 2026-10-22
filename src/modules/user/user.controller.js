import { Router } from "express";
import * as US from "./user.service.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post("/signup", US.signup);
router.post("/login", US.login);
router.get("/refresh-token", US.refreshToken);
router.get("/profile", auth(), US.getProfile);
router.get("/share/:id", US.shareProfile);
router.patch("/update-password", auth(), US.updatePassword);
router.patch("/update", auth(), US.updateProfile);
router.delete("/", auth(), US.deleteAccount);

export default router;
