import { NextFunction, Response, Request } from 'express';
import { check, validationResult } from 'express-validator';

export const userValidation = [];

export const userValidationRules = () => {
  return [
    check('password', 'The password must be 5+ chars long and contain a number')
      .isLength({ min: 5 })
      .matches(/\d/),

    check('email', 'Email is incorrect').isEmail()
  ];
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array({ onlyFirstError: true }) });
  }
};
