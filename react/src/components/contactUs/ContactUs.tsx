import ContactForm from "./ContactForm";
import Container from "../widgets/shared/Container";
import ContactDetails from "./ContactDetails";
import FadeElement from "../widgets/animation/FadeElement";
import useTitle from "@/custom/helpers/useTitle";
export const Component = () => {
  useTitle("Contact us");
  return (
    <Container id="contact">
      <FadeElement className="contact">
        <ContactDetails />
        <ContactForm />
      </FadeElement>
    </Container>
  );
};
