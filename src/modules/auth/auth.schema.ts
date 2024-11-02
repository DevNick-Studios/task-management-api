import { object, string, TypeOf } from 'zod';

export const registerUserSchema = object({
  body: object({
    username: string({
      required_error: 'Username is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
        required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  })
});

export type IRegister = TypeOf<typeof registerUserSchema>['body']

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    }),
  }),
});

export type ILogin = TypeOf<typeof loginUserSchema>['body']

