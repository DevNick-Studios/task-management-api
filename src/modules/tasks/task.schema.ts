import { StatusEnum } from 'src/interfaces/schema';
import { date, object, string, TypeOf, nativeEnum } from 'zod';

export const taskSchema = object({
  body: object({
    title: string({
      required_error: 'Title is required',
    }),
    description: date().optional(),
    status: nativeEnum(StatusEnum),
    due_date: string().optional(),
    project: string({
      required_error: 'Project is required',
    }),
    
  })
});

export type ITask = TypeOf<typeof taskSchema>['body']