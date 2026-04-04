import { Router } from "express";
import { UserProfileController } from "@interfaces/controllers/UserProfileController"; 

const router = Router();
const userProfileController = new UserProfileController();

router.post("/edit-profile", userProfileController.editProfile);
router.get("/profile", userProfileController.getProfile);

export default router;