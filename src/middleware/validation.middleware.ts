import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export const validationMiddleware = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(dtoClass, req.body);
    const errors: ValidationError[] = await validate(dto);
    if (errors.length > 0) {
      const messages = errors.map(error => {
        return Object.values(error.constraints || {}).join(', ');
      });
      res.status(400).json({ message: 'Validation failed', errors: messages });
      return;
    }
    req.body = dto;
    next();
  };
};


