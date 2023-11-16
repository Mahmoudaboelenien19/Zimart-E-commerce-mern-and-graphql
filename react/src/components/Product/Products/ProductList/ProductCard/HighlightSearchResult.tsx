import useParams from "@/custom/helpers/useParams";
import { HTMLAttributes } from "react";

type Props = {
  Element: "span" | "h5";
  bool: boolean;
  value: string;
} & HTMLAttributes<HTMLElement>;

const HighlightSearchResult = ({ Element, bool, value, ...props }: Props) => {
  const { search } = useParams();
  return (
    <Element {...props}>
      {bool && search
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
