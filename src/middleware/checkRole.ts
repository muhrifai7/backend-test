import { Request, Response, NextFunction } from "express";

import { RoleType } from "../typeorm/entities/users/userTypes";
import { CustomError } from "../utils/response/custom-error/CustomError";

export const checkRole = (roles: RoleType[], is_self_allowed = false) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id, role } = req.jwtPayload;
    const { id: requestId } = req.params;

    let error_self_allowed: string | null = null;
    if (is_self_allowed) {
      if (id === parseInt(requestId)) {
        return next();
      }
      error_self_allowed = "Self allowed action.";
    }

    if (roles.indexOf(role) === -1) {
      const errors = [
        "Unauthorized - Insufficient user rights",
        `Current role: ${role}. Required role: ${roles.toString()}`,
      ];
      if (error_self_allowed) {
        errors.push(error_self_allowed);
      }
      let newError = {
        code: 401,
        message: "Insufficient user rights",
      };
      const customError = new CustomError(
        401,
        "Unauthorized",
        "Unauthorized - Insufficient user rights",
        newError
      );
      return next(customError);
    }
    return next();
  };
};
