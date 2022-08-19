import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Product } from "../../typeorm/entities/product/Product";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const show = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const id = req.params.id;

  const productRepository = getRepository(Product);
  try {
    const product = await productRepository.findOne(id, {
      select: ["id", "name", "description"],
    });

    if (!product) {
      const customError = new CustomError(
        404,
        "General",
        `Department with id:${id} not found.`,
        {
          code: 401,
          message: `department with id:${id} doesn't exists.`,
        }
      );
      return next(customError);
    }
    // res.customSuccess(200, 'User found', user);
    return next(res.status(200).send(customResult(200, "success", product)));
  } catch (err) {
    const customError = new CustomError(400, "Raw", "Error", null, err);
    return next(customError);
  }
};
