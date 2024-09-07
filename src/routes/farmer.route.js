import { Router } from "express";
const router = Router();
import upload from "../middlewares/multer.middleware.js";
import { userAuth } from "../middlewares/userAuth.middleware.js";
import { isFarmerAuth } from "../middlewares/isFarmerAuth.middleware.js";
import { registerFarm } from "../controllers/farmer.controller.js";


// ########### FARMER ROUTES ##############

// Route with multer middleware to handle the file upload
router.route("/registerFarm").post(upload.single('addressProof'), userAuth, isFarmerAuth, registerFarm);
// router.post('/registerFarm', upload.single('addressProof'), registerFarm);

export default router;