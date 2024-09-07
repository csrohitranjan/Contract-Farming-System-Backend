import mongoose, { Schema } from "mongoose";

const farmerProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    farmName: {
        type: String,
        required: true
    },
    farmSize: {
        type: String,
        required: true
    },
    cropPreferences: {
        type: String
    },
    farmCompleteAddress: {
        type: String,
        required: true
    },
    addressProof: {
        type: String,
        required: true
    },
    farmingMethod: {
        type: String
    },
    yearOfExperience: {
        type: String
    },
    farmLocation: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: { type: [Number] }, // Latitude, Longitude
    }
}, { timestamps: true });

export const FarmerProfile = mongoose.model("FarmerProfile", farmerProfileSchema);
