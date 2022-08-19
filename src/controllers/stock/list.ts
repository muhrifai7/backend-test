import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Stock } from "../../typeorm/entities/stock/Stock";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { limit = 10, page = 1, keyword = "" } = req.query;
  const offset = ((limit as number) * ((page as number) - 1)) as number;
  const stock = getRepository(Stock);
  try {
    const [result, count] = await stock
      .createQueryBuilder("stock")
      .offset(offset)
      .limit(limit as number)
      .orderBy("stock.name", "ASC")
      .getManyAndCount();

    if (!result) {
      const customError = new CustomError(
        404,
        "General",
        `Product not found.`,
        {
          code: 401,
          message: "Data not found",
        }
      );
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
    const customError = new CustomError(
      400,
      "Raw",
      `Can't retrieve list of users.`,
      null,
      err
    );
    return next(customError);
  }
};
