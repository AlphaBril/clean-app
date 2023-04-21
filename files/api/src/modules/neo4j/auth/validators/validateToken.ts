import { header, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { forbidden, internalError, unauthorized } from "@shared/utils";
import { verifyToken } from "@shared/jwt/jwt";

export const validateToken = [
  header("Authorization")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Token can not be empty!")
    .bail(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return unauthorized(res, "Unauthorized");
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && typeof authHeader === "string") {
      const auth = authHeader.split(" ");
      if (auth[0] !== "Bearer") return unauthorized(res, "Unauthorized");
      const decoded = verifyToken(auth[1]);
      if (typeof decoded === "string") {
        if (decoded === "jwt expired") return forbidden(res, "Token expired");
        else return internalError(res)(decoded);
      }
    }
    return next();
  },
];
