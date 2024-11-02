import { Types } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    created_at: Date;
}

export interface IProject {
    name: string;
    description?: string;
    owner: Types.ObjectId;
    created_at: Date;
}

export interface ITask {
    title: string;
    description?: string;
    status: StatusEnum, 
    due_date?: Date;
    project: Types.ObjectId;
    created_at: Date;
}

export enum StatusEnum {
    pending = 'pending',
    'in-progress' = 'in-progress',
    completed = 'completed'
}