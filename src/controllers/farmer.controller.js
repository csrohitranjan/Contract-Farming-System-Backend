import { User } from "../models/user.model.js";
import { FarmerProfile } from "../models/farmerProfile.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";





const registerFarm = async (req, res) => {
    try {
        const user = req.user;

        if (user.role !== 'Farmer') {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Only farmers are allowed to apply for farm registration."
            });
        }

        const { farmName, farmSize, cropPreferences, farmCompleteAddress, farmingMethod, yearOfExperience, farmLocation } = req.body;
        const addressProof = req.file;  // File is passed via multipart/form-data

        const existingProfile = await FarmerProfile.findOne({ userId: user._id });

        if (existingProfile) {
            fs.unlinkSync(addressProof.path);
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You have already registered a farm."
            });
        }

        if (!farmName || !farmSize || !farmCompleteAddress || !addressProof) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Missing required farm registration fields."
            });
        }

        const uploadResult = await uploadOnCloudinary(addressProof.path, farmName);

        if (!uploadResult) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "File upload failed. Please try again."
            });
        }

        const newFarmerProfile = new FarmerProfile({
            userId: user._id,
            farmName,
            farmSize,
            cropPreferences,
            farmCompleteAddress,
            addressProof: uploadResult.url,
            farmingMethod,
            yearOfExperience,
            farmLocation
        });

        const savedProfile = await newFarmerProfile.save();

        await User.findByIdAndUpdate(user._id, {
            farmerProfile: savedProfile._id,
            accountStatus: 'Under Review'
        });

        res.status(201).json({
            status: 201,
            success: true,
            message: "Farm registration successful!",
            farmerProfile: savedProfile
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error in registerFarm controller",
            error: error.message
        });
    }
};




export { registerFarm }
