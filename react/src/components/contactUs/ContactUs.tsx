import React, { useEffect } from "react";
import Map from "./Map";
import ContactForm from "./ContactForm";
import Animation from "../widgets/animation/Animation";
const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact Us";
  }, []);
  return (
    <Animation>
      <div id="contact">
        <div className="contact">
          <Map />
          <ContactForm />
        </div>
      </div>
    </Animation>
  );
};

export default ContactUs;
