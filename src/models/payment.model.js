import mongoose, { Schema } from "mongoose";

const PaymentSchema = new mongoose.Schema({
    contractId: {
        type: Schema.Types.ObjectId,
        ref: 'Contract'
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Bank_Transfer', 'Credit_Card', 'Paypal', 'Cash'],
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed']
    },
    payentDate: {
        type: Date
    }
}, { timestamps: true });




export const Payment = mongoose.model("Payment", PaymentSchema);