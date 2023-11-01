import "./contact.scss";
import ContactForm from "./ContactForm";
import Container from "../widgets/shared/Container";
import ContactDetails from "./ContactDetails";
import FadeElement from "../widgets/animation/FadeElement";
import Transition from "../widgets/animation/transition/Transition";
import useTitle from "@/custom/useTitle";
export const Component = () => {
  useTitle("Contact us");
  return (
    <Container id="contact">
      <Transition />
      <FadeElement className="contact">
        <ContactDetails />
        <ContactForm />
      </FadeElement>
    </Container>
  );
};
