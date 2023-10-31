import React from "react";
import ZimartDetails from "./ZimartDetails";

const ContactDetails = () => {
  return (
    <div className="contact-details">
      <h2 className="contact-title">Let&apos;s get in touch</h2>

      <p className="contact-txt">
        Thank you for reaching out to us! We value your feedback and inquiries.
        Please provide your contact details and message below, and we&qpos;ll
        get back to you promptly. Feel free to include any relevant information
        to assist us in addressing your needs effectively.
      </p>
      <ZimartDetails />
    </div>
  );
};

export default ContactDetails;
