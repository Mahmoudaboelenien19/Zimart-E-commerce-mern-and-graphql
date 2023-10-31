import { Fragment, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import SelectCountry from "../forms/SelectCountry";
type Props = {
  value: string;
};
const UpdateCountry = ({ value }: Props) => {
  const [country, setCountry] = useState(value);
  const { register, setValue } = useFormContext();

  useEffect(() => {
    if (country && country !== value) {
      setValue("country", country, { shouldDirty: true });
    }
  }, [country]);
  return (
    <Fragment>
      <select {...register} />
      <SelectCountry country={country} setCountry={setCountry} />
    </Fragment>
  );
};

export default UpdateCountry;
