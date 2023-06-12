import { conflict } from "@shared/utils";
import { Request, Response } from "express";

export const logout = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.jwt) return conflict(res, "No content");
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.status(200).json({ message: "Cookie cleared " });
};
