import React from "react";

import Title from "../widgets/Title";
interface Props {
  fn: () => void;
  isFavoraited: boolean;
}
const HeartSvg = ({ fn, isFavoraited }: Props) => {
  return (
    <div className="heart-parent">
      <Title
        title={
          isFavoraited ? "remove from your wishlist" : "add to your wishlist"
        }
      >
        <svg
          style={{
            fill: isFavoraited ? "red" : "var(--third)",
            transition: "0.3s",
          }}
          className="svg-heart"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
          onClick={fn}
        >
          <path d="M14.5152 23.5413C13.9784 23.9333 13.5301 24.2362 13.2148 24.4436C13.0479 24.5531 12.8788 24.66 12.7097 24.7643H12.7075C12.5918 24.8338 12.4635 24.87 12.3333 24.87C12.2032 24.87 12.0749 24.8338 11.9592 24.7643C11.7886 24.6606 11.6195 24.5536 11.4519 24.4436C9.5949 23.2216 7.84062 21.7984 6.21225 20.1928C3.38789 17.3866 0.333344 13.2618 0.333344 8.40267C0.333344 3.9979 3.41953 0.75 6.5908 0.75C9.09334 0.75 11.1126 2.31031 12.3333 4.70169C13.5552 2.31031 15.5733 0.75 18.0759 0.75C21.2461 0.75 24.3333 3.9979 24.3333 8.40394C24.3333 13.2631 21.2777 17.3891 18.4544 20.1916C17.2118 21.4167 15.8953 22.5362 14.5152 23.5413Z" />
        </svg>
      </Title>
    </div>
  );
};

export default HeartSvg;
