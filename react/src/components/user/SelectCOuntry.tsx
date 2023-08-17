import React, { useEffect, useState } from "react";
import { BiDownArrow } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "../../variants/globals";
import useClickOutside from "../../custom/useClickOutside";
interface Props {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  country: string;
}

interface countryInterface {
  name: { common: string };
  flags: { png: string };
}

const SelectCOuntry = ({ setCountry, country }: Props) => {
  const [countries, setCountries] = useState([]);
  const [flag, setFlag] = useState("https://flagcdn.com/w320/eg.png");

  const [showDropSelect, setShowSelectDrop] = useState(false);
  const selectRef = useClickOutside<HTMLDivElement>(() => {
    setShowSelectDrop(false);
  }, showDropSelect);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((data) => data.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (country !== "") {
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

  const parent = {
    start: {},
    end: { transition: { staggerChildren: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

  const selectedFlag = {
    start: { opacity: 0 },
    end: { opacity: 1, rotate: [0, 20, -20, 0], transition: { duration: 0.4 } },
  };

  return (
    <div
      className="select-country-par relative center start "
      onClick={toggleShowSelectDrop}
      ref={selectRef}
    >
      <AnimatePresence mode="wait">
        <motion.div
          style={{ overflow: "hidden" }}
          key={flag}
          className="select-country center gap"
          variants={parent}
          initial="start"
          animate="end"
          exit="exit"
        >
          <motion.img src={flag} alt={"flag"} variants={selectedFlag} />

          <motion.span style={{ fontSize: 9 }} variants={opacityVariant}>
            {" "}
            {country}
          </motion.span>
        </motion.div>
      </AnimatePresence>
      <BiDownArrow className="icon select-icon arrow" />
      <AnimatePresence>
        {showDropSelect && (
          <motion.div className={`select-dropdown gap drop-country `}>
            {countries.map((obj: countryInterface, i) => {
              const flag = obj.flags.png;
              const country = obj.name.common;
              return (
                <motion.div
                  variants={opacityVariant}
                  initial="start"
                  animate="end"
                  exit="exit"
                  key={i}
                  className="select-country center gap select-opt"
                  onClick={() => {
                    setFlag(flag);
                    setCountry(country);
                  }}
                >
                  <img src={flag} alt={"flag"} />

                  <span className="select-text"> {country}</span>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectCOuntry;
