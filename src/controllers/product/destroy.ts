import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Product } from "./../../typeorm/entities/product/Product";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const destroy = async (
  req: Request,
  res: Response | any,
  next: NextFunction
) => {
  const { id } = req.params;
  const productRepository = getRepository(Product);
  try {
    const product = await productRepository.findOne({ where: { id } });
    if (!product) {
      const customError = new CustomError(404, "General", "Not Found", {
        code: 401,
        message: `product with id:${id} doesn't exists.`,
      });
      return next(customError);
    }

    try {
      productRepository.delete(id);
      return res.status(200).json({
        status: 200,
        message: "Department successfully deleted.",
      });
    } catch (error) {
      const customeError = new CustomError(404, "General", "Not Found", {
        code: 404,
        message: "",
      });
      return next(customeError);
    }
  } catch (error) {
    const customeError = new CustomError(400, "Raw", "Error", null, error);
    return next(customeError);
  }
};
