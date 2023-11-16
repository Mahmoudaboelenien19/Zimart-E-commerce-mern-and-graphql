import { Fragment, useState } from "react";
import Star from "../../Product/Products/Aside/Star";
import { IoIosArrowDown } from "react-icons/io";
import DropDown from "@/components/widgets/dropdowns/DropDown";

const RatingDetails = ({ arr }: { arr: number[] }) => {
  const [show, setShow] = useState(false);

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const group: React.ReactNode[] = [];

    for (let g = 5; g >= 1; g--) {
      group.push(
        <Star
          key={`${Date.now()}-${Math.random().toString(16)}`}
          bool={g >= i ? true : false}
        />
      );
    }

    stars.push(
      <div className={"center"} key={`group-${i}`}>
        <span className="rate-filter">{group}</span>
        <span>
          ({arr.reduce((ac, cur) => (cur === 6 - i ? ac + 1 : ac), 0)})
        </span>
      </div>
    );
  }
  return (
    <Fragment>
      {arr.length >= 1 && (
        <>
          <IoIosArrowDown
            fontSize={15}
            onClick={() => setShow(!show)}
            color="var(--green)"
          />

          <DropDown
            bool={show}
            setter={setShow}
            className="  star-details w-100"
          >
            {stars}
          </DropDown>
        </>
      )}
    </Fragment>
  );
};

export default RatingDetails;
