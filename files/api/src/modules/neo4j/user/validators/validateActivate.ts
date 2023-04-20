import { header, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { format } from "@shared/utils";

export const validateActivate = [
  header("Authorization")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Token can not be empty!")
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return format(res, "Data is incorrect");
    return next();
  },
];
