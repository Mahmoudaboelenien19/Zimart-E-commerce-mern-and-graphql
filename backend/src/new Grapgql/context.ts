import { Response } from "express";
import { Request } from "express";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

export const context = ({ req, res }: { req: Request; res: Response }) => {
  return { req, res };
};
