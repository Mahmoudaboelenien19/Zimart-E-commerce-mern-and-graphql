import React from "react";
//@ts-ignore
import Faq from "react-faq-component";
import Animation from "./widgets/Animation";
const data = {
  title: "Frequently Asked Questions",
  rows: [
    {
      title: "Q1: How do I place an order ?",
      content:
        " To place an order, simply browse our products, select the items you wish to purchase, and proceed to the checkout page. Follow the steps to provide your shipping and payment information, and confirm your order.",
    },
    {
      title: "Q2: How can I track my order ?",
      content:
        "Once your order is processed and shipped, you will receive a confirmation email with a tracking number. You can use this tracking number to track the status of your order on our website or through the shipping carrier's website.",
    },
    {
      title: "Q3: What payment methods do you accept ?",
      content:
        "We accept various payment methods, including credit/debit cards, PayPal, and Apple Pay. During the checkout process, you can choose your preferred payment option.",
    },
    {
      title: "Q4: Do you offer international shipping ?",
      content:
        "Yes, we offer international shipping to select countries. Please check our shipping policy page for more details and the list of countries we currently ship to.",
    },
    {
      title: "Q5: What is your return and refund policy ?",
      content:
        "We have a hassle-free return and refund policy. If you are not satisfied with your purchase, you can return the item within [X] days of receiving it for a refund or exchange. Please review our return policy page for detailed instructions.",
    },
    {
      title: "Q6: How long does shipping usually take ?",
      content:
        " Shipping times may vary depending on your location and the shipping method chosen. Typically, domestic orders are delivered within [X] business days, while international orders may take longer. You can find estimated delivery times on our shipping policy page.",
    },
    {
      title: "Q7: Can I cancel or modify my order after it has been placed ?",
      content:
        "A: We strive to process orders promptly; however, if you need to cancel or modify your order, please contact our customer support team as soon as possible. We will do our best to accommodate your request if the order has not yet been shipped.",
    },
    {
      title: "Q8: Are my personal and payment details secure ? ",
      content:
        "A: Yes, we prioritize the security of your personal and payment information. We utilize industry-standard encryption protocols and follow strict security measures to protect your data. Rest assured that your information is handled securely.",
    },
    {
      title: "Q9: Are there any discounts or promotions available ?",
      content:
        "A: We frequently offer discounts and promotions on our products. Keep an eye on our website, newsletter, and social media channels for updates on the latest offers and promotions.",
    },
  ],
};

const FaqComponent = () => {
  return (
    <Animation>
      <div
        className="center box-shadow faq"
        style={{ padding: 40, marginTop: 40 }}
      >
        <Faq
          data={data}
          styles={{
            bgColor: "var(--secondary)",
            rowContentPaddingLeft: "10px",
            rowContentPaddingRight: "20px",
            rowContentPaddingBottom: "8px",
            rowContentColor: "var(--white)",
            titleTextColor: "var(--twitter)",
            rowTitleColor: "var(--wheat)",
            arrowColor: "var(--white)",
            rowContentTextSize: "12px",
            rowTitleTextSize: "14px",
          }}
        />
      </div>
    </Animation>
  );
};

export default FaqComponent;
