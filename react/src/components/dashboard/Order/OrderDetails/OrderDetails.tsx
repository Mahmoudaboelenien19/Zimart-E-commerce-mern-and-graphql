import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import OrderDetailTr from "./OrderDetialTr";
import Customer from "./Customer";
import OrderSummery from "./OrderSummery";
import { GET_ORDER } from "@/graphql/queries";
import { OrderInterface } from "@/interfaces/order.interface";
import DashMain from "@/components/dashboard/DashMain";
import FadeElement from "@/components/widgets/animation/FadeElement";
import "./order-details.scss";
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
      <DashMain>
        <FadeElement className="order-del-par center ">
          <div className="order-details-grid">
            <table className="table-order-detail box-shadow">
              <thead>
                <tr>
                  <th>items summary</th>
                  <th>QTY</th>
                  <th>Price</th>
                  <th>total price</th>
                </tr>
              </thead>
              <tbody>
                {productId?.map((ob: OrderInterface) => {
                  return <OrderDetailTr key={ob.image} {...ob} />;
                })}
              </tbody>
            </table>
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
      </DashMain>
    );
  } else {
    return <></>;
  }
};
