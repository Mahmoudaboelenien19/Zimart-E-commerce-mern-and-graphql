import ThemeToggle from "@/components/theme/ThemeToggle";
import MenuTogglar from "@/components/widgets/shared/menuToggle/MenuTogglar";
import NotificatinTogglar from "../Notification/NotificatinTogglar";
import useHideScroll from "@/custom/helpers/useHideScroll";
import useParams from "@/custom/helpers/useParams";
import useIsMobile from "@/custom/helpers/useIsMobile";
import MainNav from "@/components/widgets/shared/MainNav";

const DashNav = () => {
  const { getParam } = useParams();
  const { isMobile } = useIsMobile();
  const showDashBoaedAside = getParam("showDashBoaedAside") || false;
  useHideScroll(Boolean(showDashBoaedAside), isMobile);
  return (
    <MainNav className={"dash-nav w-100 "}>
      <div className="dash-menu ">
        <MenuTogglar
          target={"showDashBoaedAside"}
          hideMsg="hide dashboard"
          showMsg="show dashboard"
        />
      </div>
      <div className="center">
        <ThemeToggle />
        <NotificatinTogglar />
      </div>
    </MainNav>
  );
};

export default DashNav;
