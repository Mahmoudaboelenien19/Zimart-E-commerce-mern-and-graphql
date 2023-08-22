import { rule } from "graphql-shield";
import { auth } from "../../middlewares/auth";
import { userCollection } from "../../mongoose/schema/user";

export const isUser = rule()(async (par: any, args: any, ctx: any) => {
  const accessToken = ctx.req?.headers?.authorization;

  const decode = auth(accessToken) as { email: string };
  if (decode?.email) {
    return true;
  } else {
    return false;
  }
});

export const isAdmin = rule()(async (_: any, __: any, ctx: any) => {
  const accessToken = ctx.req?.headers?.authorization;

  const decode = auth(accessToken) as { email: string; role: string };
  if (decode?.email) {
    const user = (await userCollection.findOne({ email: decode.email })) as {
      role: string;
    };
    const isAdminCheck =
      user?.role === "admin" ||
      user.role === "owner" ||
      user.role === "moderator";
    if (isAdminCheck) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
});
