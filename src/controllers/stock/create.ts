import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { Stock } from "../../typeorm/entities/stock/Stock";
import { CustomError } from "../../utils/response/custom-error/CustomError";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const stockRepository = getRepository(Stock);
  try {
    const stock = await stockRepository.create(req.body);
    await stockRepository.save(stock);
    // return res.customSuccess(200, 'User successfully saved.');
    return res
      .status(200)
      .json({ status: 200, message: "Product successfully created." });
  } catch (error) {
    const customError = new CustomError(404, "General", "Not Found", {
      code: 404,
      message: "",
    });
    return next(customError);
  }
};
