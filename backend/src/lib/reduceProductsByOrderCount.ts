import productCollection from "../mongoose/schema/product";
import { pubsub } from "../new Grapgql/context";
import { AddNotification } from "./AddNotification";

export const reduceProductsByOrderCount = async (products: Order[]) => {
  products.forEach(async (e: Order) => {
    const product = await productCollection.findByIdAndUpdate(
      e.productId,
      {
        $inc: {
          stock: -e.count,
        },
      },
      { new: true }
    );
    pubsub.publish("Product_Updated", {
      productUpdated: product,
    });
    pubsub.publish("Single_Product_Updated", {
      singleProductUpdate: product,
    });

    if (product?._id && product?.stock <= 5) {
      const notificationObj = {
        content: `${product?.title
          .split(" ")
          .slice(0, 5)
          .join(" ")} is running out`,
        link: `/${product?._id}`,
      };
      AddNotification(notificationObj);
    }
  });
};
