import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, passwordNew } = req.body;
  const { id, username } = req.jwtPayload;

  const userRepository = getRepository(TU_USER);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, "General", "Not Found", {
        code: 404,
        message: `${username} not found`,
      });
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(400, "General", "Not Found", {
        code: 404,
        message: "Incorrect Password",
      });
      return next(customError);
    }

    user.password = passwordNew;
    user.hashPassword();
    userRepository.save(user);

    return res
      .status(200)
      .json({ status: 200, message: "Password successfully changed." });
  } catch (err) {
    const customError = new CustomError(401, "Raw", "Error", null, err);
    return next(customError);
  }
};
