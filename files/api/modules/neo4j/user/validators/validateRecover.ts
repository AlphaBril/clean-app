import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { format } from "@shared/utils";

export const validateRecover = () => [
  body("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return format(res, "Data is incorrect");
    return next();
  },
];
