import useParams from "@/custom/helpers/useParams";

import { Twirl as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";
import Title from "../../Title";
interface Props {
  hideMsg: string;
  target?: string;
  showMsg: string;
  setter?: React.Dispatch<React.SetStateAction<boolean>>;
  bool?: boolean;
}
const MenuTogglar = ({ setter, bool, target, hideMsg, showMsg }: Props) => {
  const { deleteParam, getParam, setParam } = useParams();
  const [show, setShow] = useState(Boolean(target || bool));
  const value = getParam(target || "");
  useEffect(() => {
    if (bool || value) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [value, bool]);
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
    <Title
      title={value ? hideMsg : showMsg}
      dir="left"
      className="dash-menu-title"
    >
      <Hamburger
        toggle={setShow}
        toggled={show}
        size={20}
        color="var(--third)"
        onToggle={handleShow}
      />
    </Title>
  );
};

export default MenuTogglar;
