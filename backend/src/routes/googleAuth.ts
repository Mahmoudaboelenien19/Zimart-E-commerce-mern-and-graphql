import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";
import passport from "passport";
import {
  ACCESS_TOKEN_SECRET,
  Client_Url,
  REFRESH_TOKEN_SECRET,
} from "../config.js";
import { userCollection } from "../mongoose/schema/user";

const successLogin = async (req: Request, res: Response) => {
  const user: any = req.user;
  const location = req.query.location;
  const email = user?.emails[0]?.value;
  if (email) {
    const result: any = await userCollection.findOne({ email });

    if (result) {
      const expire = { expiresIn: "15s" };
      const accessToken = jwt.sign(
        { result },
        ACCESS_TOKEN_SECRET as unknown as string,
        expire
      );
      const refToken = jwt.sign(
        { result },
        REFRESH_TOKEN_SECRET as unknown as string
      );

      const id = result._id.toString();
      res.cookie("user_email", result.email as unknown as string);
      res.cookie("user_id", id as unknown as string);
      res.cookie("access_token", accessToken);
      res.cookie("refresh_token", refToken);
      res.redirect(`${Client_Url}?isLogged=true`);
    } else {
      res.redirect(`${Client_Url}/login?isLogged=false`);
    }
  }
};

const successSignup = async (req: Request, res: Response) => {
  const user: any = req.user;
  const email = user?.emails[0]?.value;
  if (email) {
    const result = await userCollection.findOne({ email });
    if (result) {
      res.redirect(`${Client_Url}/signup?isRegistered=true`);
    } else {
      const obj = {
        image: user.photos[0].value,
        email: user?.emails[0].value,
        name: user.displayName,
      };

      res.redirect(
        `${Client_Url}/signup?user=` + encodeURIComponent(JSON.stringify(obj))
      );
    }
  }
};

export const oAuthRouter = Router();

oAuthRouter.route("/auth/login/google").get((req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: `login?location=${req.query.location}`,
  })(req, res, next);
});

oAuthRouter.route("/auth/signup/google").get((req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: "signup",
  })(req, res, next);
});

oAuthRouter.route("/auth/google/callback").get((req: any, res: any, next) => {
  const { state } = req.query;
  const str = state?.split("?");
  const login = str[0];
  const location = str[1]?.replace("location=", "");
  passport.authenticate("google", {
    successRedirect: `/auth/success/${login}${
      login === "login" ? `?location=${location}` : ""
    }`,
    failureRedirect: `/auth/failure/${state}`,
  })(req, res, next);
});

oAuthRouter.route("/auth/success/login").get(successLogin);

oAuthRouter.route("/auth/success/signup").get(successSignup);
