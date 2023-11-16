import ThemeToggle from "@/components/theme/ThemeToggle";
import MenuTogglar from "@/components/widgets/shared/menuToggle/MenuTogglar";
import NotificatinTogglar from "../Notification/NotificatinTogglar";
import useHideScroll from "@/custom/helpers/useHideScroll";
import useParams from "@/custom/helpers/useParams";
import useIsMobile from "@/custom/helpers/useIsMobile";
import { useScrollToUp } from "@/custom/helpers/useScrolltoUp";

const DashNav = () => {
  const { getParam } = useParams();
  const { isMobile } = useIsMobile();
  const showDashBoaedAside = getParam("showDashBoaedAside") || false;
  useHideScroll(Boolean(showDashBoaedAside), isMobile);
  // useScrollToUp();

  return (
    <div className=" nav-children" style={{ gap: 15 }}>
      <ThemeToggle />
      <NotificatinTogglar />
      <MenuTogglar
        target={"showDashBoaedAside"}
        hideMsg="hide dashboard"
        showMsg="show dashboard"
      />
    </div>
  );
};

export default DashNav;
