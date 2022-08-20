import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Product } from "./../../typeorm/entities/product/Product";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const { limit = 10, page = 1, keyword = "" } = req.query;
  const offset = ((limit as number) * ((page as number) - 1)) as number;
  const product = getRepository(Product);
  try {
    let query = await product
      .createQueryBuilder("product")
      .offset(offset)
      .limit(limit as number)
      .orderBy("product.name", "ASC");
    if (keyword)
      query = query.andWhere(`product.name  LIKE :q`, {
        q: "%" + keyword + "%",
      });

    const [result, count] = await query.getManyAndCount();
    if (!result) {
      const customError = new CustomError(
        404,
        "General",
        `Attendances not found.`,
        {
          code: 401,
          message: "Datanot found",
        }
      );
      return next(customError);
    }
    const response = {
      total_data: count,
      limit,
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
