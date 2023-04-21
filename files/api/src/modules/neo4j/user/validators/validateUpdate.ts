import { header, body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { format } from "@shared/utils";

export const validateUpdate = () => [
  header("token")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Token can not be empty!")
    .bail(),
  body("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail(),
  body("email")
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  body("firstname")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail(),
  body("lastname")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("User name can not be empty!")
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return format(res, "Data is incorrect");
    return next();
  },
];
