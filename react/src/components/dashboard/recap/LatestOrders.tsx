import OrderRecap from "./OrderRecap";
import { useQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "@/graphql/queries";
import { ORDER } from "@/types/order";

const LatestOrders = () => {
  const { data } = useQuery(GET_ALL_ORDERS, {
    variables: {
      skip: 0,
      limit: 5,
    },
  });

  return (
    <div className="col center gap order-recap-par">
      {data?.orders?.orders?.map((order: ORDER) => {
        return <OrderRecap key={order._id} {...order} />;
      })}
    </div>
  );
};

export default LatestOrders;
