import { StatusEnum } from '../../interfaces/schema';
import { date, object, string, TypeOf, nativeEnum } from 'zod';

export const taskSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: string().optional(),
    status: nativeEnum(StatusEnum, { required_error: 'status is required' }),
    due_date: date({ invalid_type_error: 'due_date must be a date' }).optional(),
    project: string({
      required_error: 'Project is required',
    }),
  }),
  params: object({
    projectId: string({
      required_error: 'Project Id request parameter is required',
    }),
  }),
});

export type ITask = TypeOf<typeof taskSchema>['body']