import { Schema, Types, model, ObjectId } from 'mongoose'

interface IToken {
    userId: ObjectId | string | boolean;
    token: string;
    createdAt: Date;
}

const token = new Schema<IToken>({
    userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60 * 60,
    }
})

const Token = model<IToken>("Token", token);

export default Token;