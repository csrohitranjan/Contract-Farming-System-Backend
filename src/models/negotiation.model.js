import mongoose, { Schema } from "mongoose";

const negotionSchema = new Schema({
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
        ref: 'User'
    },
    offerPrice: {
        type: Number,
        required: true
    },
    message: {
        type: String
    },
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open'
    }

}, { timestamps: true });


export const Negotiation = mongoose.model('Negotiation', negotionSchema)