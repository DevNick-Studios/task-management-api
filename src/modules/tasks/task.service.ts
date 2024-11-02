import { RequiredFields } from "src/interfaces/helper";
import { Task } from "./task.model"
import { ITask } from "./task.schema"
import CustomError from "../../utils/CustomError";

export const createTask = async (data: RequiredFields<ITask, 'project'>) => {
    const task = new Task(data);
    return task.save();
}

export const getTasks = async (
  project: string,
  filters: { status?: string; due_date?: Date } = {},
  page: number = 1,
  limit: number = 10,
  sortBy: string = 'due_date',
  sortOrder: 'asc' | 'desc' = 'asc'
) => {
  const query = {  ...filters, project, deleted: false };

  const totalCount = await Task.countDocuments(query).exec();

  // Fetch paginated tasks
  const tasks = await Task.find(query)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()
    .exec();

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = page < totalPages;

  return {
    totalCount,
    totalPages,
    currentPage: page,
    hasNextPage,
    tasks,
  };
};

export const getTask = async (project: string, taskId: string) => {
    const task = await Task.findOne({
        project,
        _id: taskId,
        deleted: false
    }).lean().exec()

    if (!task) {
        throw new CustomError('Task not found for this project', 404)
    }

    return task
}

export const updateTask = async (project: string, taskId: string, data: Partial<ITask>) => {
    const task = await Task.findOne({
        project,
        _id: taskId,
        deleted: false
    }).exec()
    
    if (!task) throw new CustomError('Task not found for this project', 404)
    
    Object.assign(task, data)

    return task.save()
}

export const updateTaskStatuses = async (taskIds: string[], status: string) => {
    const result = await Task.updateMany(
        { _id: { $in: taskIds }, deleted: false },
        { status }
    );

    if (result.matchedCount === 0) {
        throw new CustomError('No tasks found to update', 404);
    }

    return result;
};

export const deleteTask = async (project: string, taskId: string) => {
    const task = await Task.findOne({
        project,
        _id: taskId,
        deleted: false,
    }).exec()
    
    if (!task) throw new CustomError('Task does not exist', 404)
    
    // soft delete
    return task.updateOne({ deleted: true });
}
