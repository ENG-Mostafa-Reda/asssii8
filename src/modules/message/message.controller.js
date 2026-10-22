import { Router } from "express";
import * as MS from "./message.service.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

router.post("/send", MS.sendMessage);            // مجهول (من غير توكن)
router.get("/", auth(), MS.getMyMessages);
router.get("/:id", auth(), MS.getMessage);
router.delete("/:id", auth(), MS.deleteMessage);

export default router;
