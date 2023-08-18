import Jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config";
import { Response, Router, Request } from "express";

export const verfiyRefToken = async (refToken: string) => {
  try {
    const decode = Jwt.verify(
      refToken,
      REFRESH_TOKEN_SECRET as unknown as string
    );

    return decode;
  } catch (err) {
    return "wrong ref token";
  }
};

export const getNewRefToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    res.json({});
  } else {
    let result = (await verfiyRefToken(refresh_token)) as any;

    if (result?.email) {
      const accessToken = Jwt.sign(
        { email: result.email },
        ACCESS_TOKEN_SECRET as unknown as string
      );
      const refreshToken = Jwt.sign(
        { email: result.email },

        REFRESH_TOKEN_SECRET as unknown as string
      );

      res.cookie("access_token", accessToken);
      res.cookie("refresh_token", refreshToken);
      res.json({ accessToken });
      return true;
    } else {
      return false;
    }
  }
};

export const AuthRouter = Router();
AuthRouter.route("/auth/newRefToken").post(getNewRefToken);
