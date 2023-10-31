import { useEffect } from "react";
import "./contact.scss";
import ContactForm from "./ContactForm";
import Container from "../widgets/shared/Container";
import ContactDetails from "./ContactDetails";
import FadeElement from "../widgets/animation/FadeElement";
import Transition from "../widgets/animation/transition/Transition";
export const Component = () => {
  useEffect(() => {
    document.title = "Contact Us";
  }, []);
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
