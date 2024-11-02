import mongoose, { Schema } from 'mongoose';
import { IProject } from 'src/interfaces/schema';
import { User } from '../users/user.model';

const projectSchema: Schema<IProject> = new Schema<IProject>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

export const Project = mongoose.model('Project', projectSchema);