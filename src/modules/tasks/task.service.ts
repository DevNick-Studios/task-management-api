import { RequiredFields } from "src/interfaces/helper";
import { Task } from "./task.model"
import { ITask } from "./task.schema"
import CustomError from "../../utils/CustomError";

export const createTask = async (data: RequiredFields<ITask, 'project'>) => {
    const task = new Task(data);
    return task.save();
}

export const getTasks = async (project: string) => {
    const tasks = await Task.find({ project }).lean().exec()

    if (!tasks) {
        throw new CustomError('Tasks not found', 404)
    }

    return tasks
}

export const getTask = async (project: string, taskId: string) => {
    const task = await Task.findOne({
        project,
        _id: taskId
    }).lean().exec()

    if (!task) {
        throw new CustomError('Task not found for this project', 404)
    }

    return task
}

export const updateTask = async (project: string, taskId: string, data: Partial<ITask>) => {
    const task = await Task.findOne({
        project,
        _id: taskId
    }).exec()
    
    if (!task) throw new CustomError('Task not found for this project', 404)
    
    Object.assign(task, data)

    return task.save()
}

export const deleteTask = async (project: string, taskId: string) => {
    const task = await Task.findOne({
        project,
        _id: taskId
    }).exec()
    
    if (!task) throw new CustomError('Task does not exist', 404)

    return task.deleteOne()
}
