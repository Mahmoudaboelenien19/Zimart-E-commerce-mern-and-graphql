import { useForm, FormProvider, FieldValues } from "react-hook-form";
import Input from "../widgets/shared/forms/Input";
import MainBtn from "../widgets/buttons/MainBtn";
import { NavLink } from "react-router-dom";
import GooGleBtn from "../forms/GooGleBtn";
import Form from "../widgets/shared/forms/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import Container from "../widgets/shared/Container";
import useParams from "@/custom/helpers/useParams";
import HomeLink from "../forms/HomeLink";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { loginSchema } from "@/lib/formschemas/form schemas";
import useLogin from "@/custom/user/useLogIn";
import useTitle from "@/custom/helpers/useTitle";
import Transition from "../widgets/animation/transition/Transition";

export const Login = () => {
  useTitle("Zimart | Login");
  const { getParam } = useParams();
  const defaultEmail = getParam("email");
  const methods = useForm({ resolver: yupResolver(loginSchema) });
  const { handleSubmit } = methods;
  const { handleLogIn, loading } = useLogin();
  const onSubmit = (data: FieldValues) => {
    handleLogIn(data);
  };

  return (
    <Container className="form-container">
      <Transition />
      <FormProvider {...methods}>
        <Form
          initialTranslate={80}
          onSubmit={handleSubmit(onSubmit)}
          delay={0.8}
          className=" main  log-in"
        >
          <h2 className="center gap">
            Welcome Back.
            <div className="sign"> !</div>
          </h2>
          <p>
            Please enter your email and password below to access your account.
          </p>
          <Input
            Icon={HiAtSymbol}
            placeholder={"email"}
            defaultValue={defaultEmail}
          />
          <Input
            placeholder="password"
            type={"password"}
            Icon={HiFingerPrint}
          />
          <div>
            <MainBtn
              className="btn main w-100 center"
              btn="log In"
              pos="right"
              opacity={0}
              type="submit"
              disabled={loading}
              loading={loading}
            />
          </div>
          <div className="redirect">
            <span> don&#39;t have an account</span>
            <NavLink to="/signup">sign up</NavLink>
          </div>

          <div className="txt hr center">
            <span>or</span>
          </div>
          <div>
            <GooGleBtn />
          </div>

          <HomeLink />
        </Form>
      </FormProvider>
    </Container>
  );
};
