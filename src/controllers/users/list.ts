import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { TU_USER } from "../../typeorm/entities/users/User";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const list = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { limit = 10, page = 1, keyword = "" } = req.query;
  const offset = ((limit as number) * ((page as number) - 1)) as number;
  const userRepository = getRepository(TU_USER);
  // let resss = await userRepository.query(
  //   "UPDATE salaries set overtime = 7000 where user_id = 91"
  // );
  // console.log(resss[1] ? "ddd" : "dddsssss");
  try {
    const [result, count] = await userRepository
      .createQueryBuilder("TU_USER")
      .offset(offset)
      .limit(limit as number)
      .orderBy("TU_USER.username", "ASC")
      .getManyAndCount();
    if (!result) {
      const customError = new CustomError(404, "General", `User not found.`, {
        code: 404,
        message: "Data not found",
      });
      return next(customError);
    }
    const response = {
      total_data: count,
      page,
      keyword,
      data: result,
    };
    // res.customSuccess(200, 'User found', user);
    return next(res.status(200).send(customResult(200, "success", response)));
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
