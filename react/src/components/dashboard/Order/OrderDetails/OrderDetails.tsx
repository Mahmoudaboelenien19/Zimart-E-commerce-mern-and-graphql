import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Customer from "./Customer";
import OrderSummery from "./OrderSummery";
import { GET_ORDER } from "@/graphql/queries";
import FadeElement from "@/components/widgets/animation/FadeElement";
import "./order-details.scss";
import { ORDER } from "@/types/order";
import OrderDetailsTable from "./OrderDetailsTable";
import Transition from "@/components/widgets/animation/transition/Transition";
export const Component = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_ORDER, { variables: { id } });
  if (data?.order) {
    const {
      productId,
      cost,
      userId,
      state,
      createdAt,
      deliveredAt,
      user: { email, name },
    } = data.order;
    return (
      <FadeElement className="order-del-par center ">
        <div className="order-details-grid">
          <OrderDetailsTable products={productId} />
          <Customer
            state={state}
            userId={userId}
            cost={cost}
            email={email}
            name={name}
          />
          <OrderSummery
            created={createdAt}
            delivered={deliveredAt}
            total={cost}
          />
        </div>
      </FadeElement>
    );
  } else {
    return <></>;
  }
};
