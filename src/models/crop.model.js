import mongoose, { Schema } from "mongoose";



const cropSchema = new mongoose.Schema({
    farmerId: {
        type: Schema.Types.objectId,
        ref: 'User'
    },
    cropName: {
        type: String,
        required: true
    },
    cropType: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    pricePerUnit: {
        type: Number,
        required: true
    },
    showingDate: {
        type: Date,
    },
    harvestDate: {
        type: Date,
    },
    deliveryType: {
        type: String
    },
    contractDuration: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Sold'],
        default: 'Available'
    }
}, { timestamps: true });





export const Crop = mongoose.model("Crop", cropSchema);