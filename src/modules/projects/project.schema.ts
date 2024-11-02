import { object, string, TypeOf } from 'zod';

export const projectSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string().optional(),
    owner: string({
      required_error: 'Owner is required',
    }).optional(),
  })
});

export type IProject = TypeOf<typeof projectSchema>['body']

