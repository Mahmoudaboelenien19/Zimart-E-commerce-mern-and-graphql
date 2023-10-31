import Title from "./Title";
import useParams from "@/custom/useParams";

interface Props {
  hideMsg: string;
  target?: string;
  showMsg: string;
  setter?: React.Dispatch<React.SetStateAction<boolean>>;
  bool?: boolean;
}
const MenuTogglar = ({ setter, bool, target, hideMsg, showMsg }: Props) => {
  const { deleteParam, getParam, setParam } = useParams();
  const value = getParam(target || "");
  const handleShow = () => {
    if (target) {
      if (value && target) {
        deleteParam(target);
      } else {
        setParam(target, "true");
      }
    } else if (setter) {
      setter(!bool);
    }
  };
  return (
    <Title title={value ? hideMsg : showMsg}>
      <div className="menu-togglar" onClick={handleShow}>
        {[...Array(3)].map((_, i) => {
          return (
            <span
              key={i}
              className={`menu-toggle-span ${value ? "animate" : ""}`}
            ></span>
          );
        })}
      </div>
    </Title>
  );
};

export default MenuTogglar;
