import { header, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { unauthorized } from "@shared/utils";

export const validateToken = [
  header("Authorization")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Token can not be empty!")
    .bail()
    .isJWT()
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return unauthorized(res, "Unauthorized");
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && typeof authHeader === "string") {
      const auth = authHeader.split(" ");
      if (auth[0] !== "Bearer") return unauthorized(res, "Unauthorized");
    }
    return next();
  },
];
