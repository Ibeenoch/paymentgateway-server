import { Schema, Model, Types, model } from 'mongoose'

interface IUser {
    name: string;
    email: string;
    password: string;
    googleId: string;
}

const user = new Schema<IUser>({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        min: 6,
        max: 12,
        require: true,
    },
    googleId: String,
}, { timestamps: true });

const User = model<IUser>('User', user);

export default User;