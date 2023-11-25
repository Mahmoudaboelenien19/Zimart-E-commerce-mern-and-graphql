import { useState } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import Input from "../widgets/shared/forms/Input";
import { NavLink } from "react-router-dom";
import MainBtn from "../widgets/buttons/MainBtn";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "../widgets/shared/forms/Form";
import Container from "../widgets/shared/Container";
import HomeLink from "../forms/HomeLink";
import SelectCountry from "../forms/SelectCountry";
import GooGleBtn from "../forms/GooGleBtn";
import { signUpSchema } from "@/lib/formschemas/form schemas";
import useParams from "@/custom/helpers/useParams";
import { SignUpInputsType, signUpInputs } from "@/assets/arries/signUpInputs";
import useSignUp from "@/custom/user/useSignUp";
import useTitle from "@/custom/helpers/useTitle";

export const Component = () => {
  const { getParam } = useParams();

  const user = getParam("user");
  const defaultValues = user ? JSON.parse(decodeURIComponent(user)) : null;

  useTitle("Zimart | Signup");

  const methods = useForm({ resolver: yupResolver(signUpSchema) });
  const { handleSubmit } = methods;

  const [country, setCountry] = useState("egypt");
  const { loading, handleSignUp } = useSignUp();
  const OnSubmit = (data: FieldValues) => {
    handleSignUp(data, country);
  };

  return (
    <Container className="form-container">
      <FormProvider {...methods}>
        <Form
          onSubmit={handleSubmit(OnSubmit)}
          className={" log-in main  signup"}
          initialTranslate={50}
        >
          <HomeLink />
          <h2>
            Register Now. <span className="sign"> !</span>
          </h2>
          <div className="w-100 center">
            <p>
              Welcome! Please enter your details below to create an account.
            </p>
          </div>
          {signUpInputs(defaultValues?.name, defaultValues?.email).map(
            (
              { Icon, placeholder, type, defaultValue }: SignUpInputsType,
              i: number
            ) => (
              <Input
                key={i}
                Icon={Icon}
                placeholder={placeholder}
                defaultValue={defaultValue || ""}
                type={type || ""}
              />
            )
          )}

          <SelectCountry setCountry={setCountry} country={country} />
          <div>
            <MainBtn
              btn="Sign up"
              className="btn main w-100"
              type="submit"
              disabled={loading}
              loading={loading}
              opacity={0}
            />
          </div>
          <div className="redirect">
            <span> have an account</span>
            <NavLink to={`/login`}>log in</NavLink>
          </div>
          <div className="txt hr center">
            <span>or</span>
          </div>
          <div className="opacity-0">
            <GooGleBtn type="sign" />
          </div>
        </Form>
      </FormProvider>
    </Container>
  );
};
