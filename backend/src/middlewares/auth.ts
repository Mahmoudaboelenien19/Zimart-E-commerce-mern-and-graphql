import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config.js";

export const auth = (accessToken: string) => {
  try {
    if (accessToken) {
      const token = accessToken.split(" ")[1];
      const decode = Jwt.verify(
        token,
        ACCESS_TOKEN_SECRET as unknown as string
      );
      if (decode) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
};
