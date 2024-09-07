import { User } from "../models/user.model.js";
import { FarmerProfile } from "../models/farmerProfile.model.js";
import { Crop } from "../models/crop.model.js"
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



const addCrop = async (req, res) => {
    try {
        const user = req.user;

        // Check if the farmer's account is active
        if (user.accountStatus !== 'Active') {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Your account is not active. You cannot add crops."
            });
        }


        const { cropName, cropType, quantity, pricePerUnit, sowingDate, harvestDate, deliveryType, contractDuration, description } = req.body;

        if (!cropName || !cropType || !quantity || !pricePerUnit || !description) {
            return res.status(400).json({
                status: 400,
                success: false,
                message: "Missing required fields for crop listing."
            });
        }

        const newCrop = new Crop({
            farmerId: user._id,
            cropName,
            cropType,
            quantity,
            pricePerUnit,
            sowingDate,
            harvestDate,
            deliveryType,
            contractDuration,
            description,
            status: 'Available' // Set status as available by default
        });


        const savedCrop = await newCrop.save();

        res.status(201).json({
            status: 201,
            success: true,
            message: "Crop added successfully!",
            crop: savedCrop
        });

    } catch (error) {
        res.status(500).json({
            status: 500,
            success: false,
            message: "Internal server error on addCrop controller.",
            error: error.message
        });
    }
};





export { registerFarm, addCrop }
