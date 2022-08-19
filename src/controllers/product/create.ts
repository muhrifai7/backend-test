import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Product } from "./../../typeorm/entities/product/Product";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productRepository = getRepository(Product);
  try {
    const product = await productRepository.create(req.body);
    await productRepository.save(product);
    // return res.customSuccess(200, 'User successfully saved.');
    return res
      .status(200)
      .json({ status: 200, message: "Product successfully created." });
  } catch (error) {
    const customError = new CustomError(404, "Unauthorized", "Not Found", {
      code: 404,
      message: "duplicate product name",
    });
    return next(customError);
  }
};
