import { Router } from "express";
import getMyProfile from "./profile.ctrl/getMyProfile";
import modifyProfile from "./profile.ctrl/modifyProfile";
import authMiddleWare from "../../../lib/middleware/auth";
import getProfiles from "./profile.ctrl/getProfiles";
import getProfile from "./profile.ctrl/getProfile";

const router = Router();

router.get("/my", authMiddleWare.user, getMyProfile);
router.get("/all", getProfiles);
router.get("/:idx", getProfile);
router.put("/", authMiddleWare.user, modifyProfile);

export default router;
