import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { format } from "@shared/utils";

export const validateChange = () => [
  body("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Password can not be empty!")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Minimum 8 characters required!")
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return format(res, "Data is incorrect");
    return next();
  },
];
