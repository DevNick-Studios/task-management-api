import { Task } from "./task.model"
import { ITask } from "./task.schema"

export const createTask = async (data: ITask) => {
    const task = new Task(data);
    return task.save();
}

export const getTasks = async (project: string) => {
    const tasks = await Task.find({ project }).lean().exec()

    if (!tasks) {
        throw new Error('Tasks not found')
    }

    return tasks
}

export const getTask = async (taskId: string) => {
    const task = await Task.findById(taskId).lean().exec()

    if (!task) {
        throw new Error('Task not found')
    }

    return task
}

export const updateTask = async (taskId: string, data: Partial<ITask>) => {
    const task = await Task.findByIdAndUpdate(taskId, data, { new: true }).lean().exec()

    if (!task) {
        throw new Error('Task not found')
    }

    return task
}

export const deleteTask = async (taskId: string) => {
    const task = await Task.findByIdAndDelete(taskId).lean().exec()

    if (!task) {
        throw new Error('Task not found')
    }

    return task
}
