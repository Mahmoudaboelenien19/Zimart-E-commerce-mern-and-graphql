import { ChildrenInterFace } from "@/interfaces/general";
import useParams from "@/custom/useParams";
import ContainerAnimation from "../widgets/animation/ContainerAnimation";

const DashMain = ({ children }: ChildrenInterFace) => {
  const { showDashBoaedAside } = useParams();

  return (
    <ContainerAnimation
      AsideWidth={300}
      className={"dash-main  col"}
      bool={Boolean(showDashBoaedAside)}
    >
      {children}
    </ContainerAnimation>
  );
};
export default DashMain;
