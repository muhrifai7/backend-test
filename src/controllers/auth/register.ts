import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { CustomError } from "../../utils/response/custom-error/CustomError";

// endpoint ini digunakan untuk proses register
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getRepository(TU_USER);

  const { email, password, name } = req.body;
  try {
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      const customError = new CustomError(
        400,
        "General",
        "User already exists",
        {
          code: 401,
          message: `${user.email} already exists`,
        }
      );
      return next(customError);
    }

    try {
      const newUser = new TU_USER();
      newUser.email = email;
      newUser.password = password;
      newUser.username = name;
      newUser.hashPassword();
      const dataUser = await userRepository.save(newUser);
      // res.customSuccess(200, 'User successfully created.');
      return res
        .status(200)
        .json({ status: 200, message: "User successfully created." });
    } catch (err) {
      const customError = new CustomError(
        400,
        "Raw",
        `User '${email}' can't be created`,
        {
          code: 404,
          message: `user can't be created`,
        },
        err
      );
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
