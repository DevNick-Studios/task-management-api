import { StatusEnum } from '../../interfaces/schema';
import { object, string, TypeOf, nativeEnum, array } from 'zod';

export const taskSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string().optional(),
    status: nativeEnum(StatusEnum, { required_error: 'status is required' }),
    due_date: string({ invalid_type_error: 'due_date must be a valid date in YYYY-MM-DD format' }).date('due_date must be a date in YYYY-MM-DD format').optional(),
    project: string({
      required_error: 'Project is required',
    }).optional(),
  }),
  params: object({
    projectId: string({
      required_error: 'Project Id request parameter is required',
    }),
  }),
});

export type ITask = TypeOf<typeof taskSchema>['body']

export const bulkUpdateTaskStatusSchema = object({
  body: object({
    taskIds: array(string({
      required_error: 'Each task ID must be a string',
    })).nonempty({
      message: 'taskIds array cannot be empty',
    }),
    status: nativeEnum(StatusEnum, {
      required_error: 'Status is required',
      invalid_type_error: "status must be of type 'pending' | 'in-progress' | 'completed'"
    }),
  }),
});


export const fetchAndFilterTasksSchema = object({
  params: object({
    projectId: string({
      required_error: 'Project ID is required',
    }),
  }),
  query: object({
    status: nativeEnum(StatusEnum, {
      invalid_type_error: "status must be of type 'pending' | 'in-progress' | 'completed'"
    }).optional(),
    due_date: string().date('due_date must be in YYYY-MM-DD format').optional(),
    page: string()
      .refine(value => !isNaN(Number(value)) && Number(value) > 0, {
        message: 'Page must be a positive number',
      })
      .optional()
      .default('1'), // Default to string '1'
    limit: string()
      .refine(value => !isNaN(Number(value)) && Number(value) > 0 && Number(value) <= 100, {
        message: 'Limit must be a number between 1 and 100',
      })
      .optional()
      .default('10'), // Default to string '10
    sortBy: string()
      .optional()
      .default('due_date')
      .refine(value => ['due_date', 'status'].includes(value), {
        message: 'sortBy must be one of: due_date, status',
      }),
    sortOrder: string()
      .optional()
      .default('asc')
      .refine(value => ['asc', 'desc'].includes(value), {
        message: 'sortOrder must be either asc or desc',
      }),
  }),
});