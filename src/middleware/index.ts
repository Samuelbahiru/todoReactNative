import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user-model";

export interface AuthRequest extends Request {
  user: string;
}

export const authenticationMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({
        error: "Authorization is Required",
      });
    }
    const token = authorization;
    const { _id } = jwt.verify(token, "express");
    const exstingUser = await User.findOne({ _id });
    if (exstingUser) {
      req.user = exstingUser.id;
    }
  } catch (error) {
    console.log("error in authenticationMiddleware", error);
    throw error;
  }
};
