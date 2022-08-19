import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const show_by_id = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const userRepository = getRepository(TU_USER);
  try {
    const user = await userRepository.findOne(id, {
      relations: [
        "profile",
        "role",
        "department",
        "module",
        // "emailBlast",
        "salaries",
        "userTax",
      ],
    });
    if (!user) {
      const customError = new CustomError(
        404,
        "General",
        `User with id:${id} not found.`,
        {
          code: 404,
          message: "User not found.",
        }
      );
      return next(customError);
    }
    return next(res.status(200).send(customResult(200, "success", user)));
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
