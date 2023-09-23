import React, { useEffect } from "react";
import Map from "./Map";
import ContactForm from "./ContactForm";
import Animation from "../widgets/animation/Animation";
export const Component = () => {
  useEffect(() => {
    document.title = "Contact Us";
  }, []);
  return (
    <div id="contact">
      <div className="contact">
        <Map />
        <ContactForm />
      </div>
    </div>
  );
};
