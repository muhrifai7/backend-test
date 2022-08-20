import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Product } from "./../../typeorm/entities/product/Product";
import { CustomError } from "../../utils/response/custom-error/CustomError";
import { customResult } from "../../utils/response/custom-success/customResult";

export const edit = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const productRepository = getRepository(Product);
  try {
    const product = await productRepository.findOne({ where: { id } });
    if (!product) {
      const customError = new CustomError(
        404,
        "General",
        `product with id:${id} not found.`,
        {
          code: 401,
          message: `product not found`,
        }
      );
      return next(customError);
    }
    const newData = {
      ...product,
      ...req.body,
    };
    try {
      await productRepository.save(newData);
      // res.customSuccess(200, 'User successfully saved.');
      return next(res.status(200).send(customResult(200, "success")));
    } catch (err) {
      const customError = new CustomError(
        409,
        "Raw",
        `Product '${product.name}' can't be saved.`,
        null,
        err
      );
      return next(customError);
    }
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
