import mongoose, { Schema } from 'mongoose';
import { ITask, StatusEnum } from 'src/interfaces/schema';
import { Project } from '../projects/project.model';

const taskSchema: Schema<ITask> = new Schema<ITask>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(StatusEnum),
    },
    due_date: {
        type: Date,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: Project,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

export const Task = mongoose.model('Task', taskSchema);