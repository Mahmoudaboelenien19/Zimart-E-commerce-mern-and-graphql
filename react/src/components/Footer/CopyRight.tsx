import React from "react";

const CopyRight = () => {
  return (
    <div className="copyright center">
      <small>Zimart &copy; 2023. All rights reserved.</small>
      <div className="pay-par">
        <img
          src={
            "https://res.cloudinary.com/domobky11/image/upload/v1692374093/pay-image_hanzqe.png"
          }
        />
        <small style={{ color: "var(--white)", opacity: 0.6 }}>
          Secured Payment Gateways
        </small>
      </div>
    </div>
  );
};

export default CopyRight;
