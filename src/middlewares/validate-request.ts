import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      console.log({e: e.errors })
        res.status(400).json({
            success: false,
            message: e?.errors && e.errors.length > 0
            ? e.errors[0]?.message
            : 'Unknown error',
        });
        
    }
  };

export default validateRequest;