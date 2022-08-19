import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository = getRepository(TU_USER);

  const { email, password, username, isActive, role = "STAFF" } = req.body;
  try {
    const user = await userRepository.findOne({ where: { email } });
    if (user) {
      const customError = new CustomError(
        400,
        "General",
        "User already exists",
        {
          code: 404,
          message: `Email '${user.email}' already exists`,
        }
      );
      return next(customError);
    }

    try {
      const newUser = new TU_USER();
      newUser.email = email;
      newUser.username = username;
      newUser.isActive = isActive;
      newUser.password = password;
      newUser.hashPassword();
      await userRepository.save(newUser);

      return res
        .status(200)
        .json({ status: 200, message: "User successfully saved." });
    } catch (error) {
      const customError = new CustomError(
        400,
        "General",
        "Something went wrong",
        {
          code: 404,
          message: ``,
        }
      );
      return next(customError);
    }
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
