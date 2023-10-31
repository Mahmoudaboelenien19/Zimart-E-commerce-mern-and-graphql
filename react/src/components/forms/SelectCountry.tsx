import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TbBuildingEstate } from "react-icons/tb";
import InViewAnimation from "../widgets/animation/InViewAnimation";
import FadeElement from "../widgets/animation/FadeElement";
import DropDown from "../widgets/dropdowns/DropDown";

interface Props {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  country: string;
}

interface countryInterface {
  name: { common: string };
  flags: { png: string };
}

const selectedFlag = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    rotate: [0, 20, -20, 0],
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.4 },
  },
};
const SelectCountry = ({ setCountry, country }: Props) => {
  const [countries, setCountries] = useState([]);
  const [flag, setFlag] = useState<string>("https://flagcdn.com/w320/eg.png");
  const [showDropSelect, setShowSelectDrop] = useState(false);

  const ref = useRef(true);
  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      fetch("https://restcountries.com/v3.1/all")
        .then((data) => data.json())
        .then((data) => setCountries(data));
    }
  }, []);
  console.log({ countries });
  useEffect(() => {
    if (country) {
      const obj = countries.find(
        (e: countryInterface) => e.name.common === country
      ) as unknown as countryInterface;

      if (obj?.flags) {
        setFlag((obj as { flags: { png: string } }).flags.png);
      }
    }
  }, [country, countries]);

  const toggleShowSelectDrop = () => {
    setShowSelectDrop(!showDropSelect);
  };
  return (
    <div
      className={"select relative center gap w-100  "}
      onClick={toggleShowSelectDrop}
    >
      <AnimatePresence mode="wait">
        <FadeElement
          style={{ overflow: "hidden" }}
          key={flag}
          className="select-country center gap"
        >
          <motion.img
            src={flag}
            alt={"flag"}
            variants={selectedFlag}
            animate="end"
            initial="start"
          />

          <FadeElement delay={0}> {country}</FadeElement>
        </FadeElement>
      </AnimatePresence>
      <TbBuildingEstate className="inp-icon " />
      <DropDown
        height={300}
        bool={showDropSelect}
        setter={setShowSelectDrop}
        className={"select-drop w-100 dropdown gap drop-country"}
      >
        {countries.map((obj: countryInterface, i) => {
          const flag = obj.flags.png;
          const country = obj.name.common;
          if (obj.name.common !== "Israel") {
            return (
              <InViewAnimation
                key={i}
                className="select-country result center gap select-opt"
                onClick={() => {
                  setFlag(flag);
                  setCountry(country);
                }}
              >
                <img src={flag} alt={"flag"} />

                <span className="select-text"> {country}</span>
              </InViewAnimation>
            );
          }
        })}
      </DropDown>
    </div>
  );
};

export default SelectCountry;
