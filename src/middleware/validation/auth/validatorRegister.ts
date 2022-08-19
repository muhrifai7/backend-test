import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ConstsUser } from '../../../consts/ConstsUser';
import { CustomError } from '../../../utils/response/custom-error/CustomError';
import { ErrorValidation } from '../../../utils/response/custom-error/types';

export const validatorRegister = (req: Request, res: Response, next: NextFunction) => {
  let { email, password, retypePassword } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  email = !email ? '' : email;
  password = !password ? '' : password;
  retypePassword = !retypePassword ? '' : retypePassword;

  if (!validator.isEmail(email)) {
    errorsValidation.push({ email: 'Email is invalid' });
  }

  if (validator.isEmpty(email)) {
    errorsValidation.push({ email: 'Email is required' });
  }

  if (validator.isEmpty(password)) {
    errorsValidation.push({ password: 'Password is required' });
  }

  if (!validator.isLength(password, { min: ConstsUser.PASSWORD_MIN_CHAR })) {
    errorsValidation.push({
      password: `Password must be at least ${ConstsUser.PASSWORD_MIN_CHAR} characters`,
    });
  }

  if (validator.isEmpty(retypePassword)) {
    errorsValidation.push({ retypePassword: 'Confirm password is required' });
  }

  if (!validator.equals(password, retypePassword)) {
    errorsValidation.push({ retypePassword: 'Passwords must match' });
  }

  if (errorsValidation.length !== 0) {
    const customError = new CustomError(400, 'Validation', 'Register validation error', null, null, errorsValidation);
    return next(customError);
  }
  return next();
};


