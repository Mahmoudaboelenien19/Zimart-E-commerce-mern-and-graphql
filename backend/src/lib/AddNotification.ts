import { userCollection } from "../mongoose/schema/user";
import { pubsub } from "../new Grapgql/context";

type Notification = {
  link: string;
  content: string;
};
export const AddNotification = async (notificationObj: Notification) => {
  await userCollection.updateMany(
    { role: { $in: ["admin", "moderator", "owner", "user"] } },
    {
      $push: {
        notifications: notificationObj,
      },
      $inc: {
        notificationsCount: +1,
      },
    }
  );

  pubsub.publish("Notification_Created", {});
};
