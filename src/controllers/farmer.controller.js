import { User } from "../models/user.model.js";
import { FarmerProfile } from "../models/farmerProfile.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


export const registerFarm = async (req, res) => {
    let addressProofPath;
    try {

        const user = req.user;
        console.log(user)
        if (user.role !== 'Farmer') {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Only farmers are allowed to apply for farm registration."
            });
        }

        const existingProfile = await FarmerProfile.findOne({ userId: user._id });
        if (existingProfile) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "You have already registered a farm."
            });
        }

        // Create new farm registration 
        const { farmName, farmSize, cropPreferences, farmCompleteAddress, farmingMethod, yearOfExperience, farmLocation } = req.body;
        const addressProof = req.file;  // File is passed via multipart/Form data

        if (!farmName || !farmSize || !farmCompleteAddress || !addressProof) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Missing required farm registration fields."
            });
        }

        addressProofPath = addressProof.path;
        const uploadResult = await uploadOnCloudinary(addressProofPath, farmName);

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

        // Update the user model to link the farmerProfile
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
        // console.error("Error registering farm:", error);
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal Server Error on: registerFarm Controller",
            error: error.message
        });
    }
};
