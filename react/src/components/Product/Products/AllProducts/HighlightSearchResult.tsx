import useParams from "@/custom/useParams";
import React from "react";

type Props = {
  Element: "span" | "h5";
  bool: boolean;
  value: string;
  className: string;
};

const HighlightSearchResult = ({ className, Element, bool, value }: Props) => {
  const { search } = useParams();
  return (
    <Element className={className}>
      {bool
        ? value.split(new RegExp(`(${search})`, "gi")).map((part, index) => {
            if (part?.toLowerCase() === search.toLowerCase()) {
              return (
                <span key={index} className="highlight">
                  {part}
                </span>
              );
            } else {
              return <span key={index}>{part}</span>;
            }
          })
        : value}
    </Element>
  );
};

export default HighlightSearchResult;
