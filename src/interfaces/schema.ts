import { Types } from "mongoose";

export interface IUser {
    _id?: string;
    username: string;
    email: string;
    password: string;
    created_at: Date;
}

export interface IProject {
    _id?: string;
    name: string;
    description?: string;
    owner: Types.ObjectId;
    deleted: Boolean;
    created_at: Date;
}

export interface ITask {
    _id?: string;
    title: string;
    description?: string;
    status: StatusEnum, 
    due_date?: Date;
    project: Types.ObjectId;
    deleted: Boolean;
    created_at: Date;
}

export enum StatusEnum {
    pending = 'pending',
    'in-progress' = 'in-progress',
    completed = 'completed'
}