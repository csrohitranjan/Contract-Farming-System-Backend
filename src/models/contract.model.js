import mongoose, { Schema } from "mongoose";


// Actually this Schema will work when the Buyer buy any products

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
    // Actually this Schema will work when the Buyer buy any products
    completeAddress: {
        type: String,
        required: true
    },
    addressProof: {
        type: String,
        required: true
    },
    paymentMode: {
        type: String,
        required: true
    },
    deliveryType: {
        type: String
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