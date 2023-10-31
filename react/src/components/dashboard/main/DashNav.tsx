import ThemeToggle from "@/components/theme/ThemeToggle";
import MenuTogglar from "@/components/widgets/MenuTogglar";
import NotificatinTogglar from "../Notification/NotificatinTogglar";
import useHideScroll from "@/custom/useHideScroll";
import useParams from "@/custom/useParams";
import useIsMobile from "@/custom/useIsMobile";

const DashNav = () => {
  const { getParam } = useParams();
  const { isMobile } = useIsMobile();
  const showDashBoaedAside = getParam("showDashBoaedAside") || false;
  useHideScroll(Boolean(showDashBoaedAside), isMobile);

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
