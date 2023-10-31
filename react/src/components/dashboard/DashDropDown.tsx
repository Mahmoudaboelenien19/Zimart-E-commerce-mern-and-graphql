import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import Title from "@/components/widgets/Title";
import DropDown from "@/components/widgets/dropdowns/DropDown";
import FadeElement from "@/components/widgets/animation/FadeElement";

interface Props {
  arr: string[];
  fn: (orderState: string) => void;
  state: string;
}

const DashDropDown = ({ state, fn, arr }: Props) => {
  const [isClicked, setIsCLicked] = useState(false);
  const handleToggle = () => setIsCLicked(!isClicked);

  return (
    <div className="relative">
      <Title title={isClicked ? "update order state" : ""}>
        <HiDotsVertical onClick={handleToggle} color="var(--pending)" />
      </Title>
      {isClicked && (
        <DropDown
          setter={setIsCLicked}
          bool={isClicked}
          className="dropdown dash-drop"
        >
          {arr.map((st, i) => {
            return (
              <FadeElement
                style={{
                  color: st === state ? `var(--${st})` : "var(--wheat-light)",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (state != st) {
                    setIsCLicked(false);
                    fn(st);
                  }
                }}
                key={i}
                className="result "
              >
                {st}
              </FadeElement>
            );
          })}
        </DropDown>
      )}
    </div>
  );
};

export default DashDropDown;
