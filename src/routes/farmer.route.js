import { Router } from "express";
const router = Router();
import upload from "../middlewares/multer.middleware.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { isFarmerAuth } from "../middlewares/isFarmerAuth.middleware.js";
import { registerFarm } from "../controllers/farmer.controller.js";


// ########### FARMER ROUTES ##############

router.route("/registerFarm").post(userAuth, isFarmerAuth, upload.single('addressProof'), registerFarm);
// router.post('/registerFarm', upload.single('addressProof'), registerFarm);

export default router;