import mongoose, { Schema } from "mongoose";

const contractSchema = new mongoose.Schema({
    cropId: {
        type: Schema.Types.ObjectId,
        ref: 'Crop',
        required: true
    },
    farmerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contractTerms: {
        type: String
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Active', 'Completed', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });




export const Contract = mongoose.model("Contract", contractSchema);