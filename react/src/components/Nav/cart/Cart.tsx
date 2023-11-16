import FadeElement from "@/components/widgets/animation/FadeElement";
import useTitle from "@/custom/helpers/useTitle";
import CartHeader from "./Cart/CartHeader";
import Container from "@/components/widgets/shared/Container";
import CartData from "./Cart/CartData";
import Transition from "@/components/widgets/animation/transition/Transition";
import SLiderComponent from "@/components/widgets/SLider";

export const Component = () => {
  useTitle("Zimart | Cart");

  return (
    <Container>
      <div className="center col w-100">
        <FadeElement className="cart-cont  " delay={0.4}>
          <CartHeader />
          <CartData />
        </FadeElement>
      </div>
    </Container>
  );
};
