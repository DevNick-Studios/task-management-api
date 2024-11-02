import mongoose, { Schema } from 'mongoose';
import { IUser } from 'src/interfaces/schema';

const userSchema: Schema<IUser> = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

export const User = mongoose.model('User', userSchema);