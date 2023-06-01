import React from "react";
//@ts-ignore
import Faq from "react-faq-component";
import Animation from "../widgets/Animation";
import { faqArr } from "../../assets/arries/arries.js";

const FaqComponent = () => {
  return (
    <Animation>
      <div
        className="center box-shadow faq"
        style={{ padding: 40, marginTop: 40 }}
      >
        <Faq
          data={faqArr}
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
            rowTitleTextSize: "1rem",
            titleTextSize: "1.5rem",
          }}
        />
      </div>
    </Animation>
  );
};

export default FaqComponent;
