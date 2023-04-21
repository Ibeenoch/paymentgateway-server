// Full_name email amount reference
import express from 'express';
import { Schema, Types, model } from 'mongoose'

interface IPayment {
    full_name: string;
    email: string;
    amount: number;
    reference: string;
    status: string;
}

const paymentSchema = new Schema<IPayment>({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    }
}, {
    timestamps: true
})

const Payment = model<IPayment>('Payment', paymentSchema);

export default Payment;