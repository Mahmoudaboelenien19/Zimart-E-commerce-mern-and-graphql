import React from "react";
import SelectCOuntry from "./SelectCOuntry";
interface Props {
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  country: string;
}
const UpdateCountry = ({ country, setCountry }: Props) => {
  return (
    <>
      <SelectCOuntry country={country} setCountry={setCountry} />
    </>
  );
};

export default UpdateCountry;
