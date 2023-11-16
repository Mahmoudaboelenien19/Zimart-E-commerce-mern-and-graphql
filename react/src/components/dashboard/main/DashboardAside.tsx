import { AnimatePresence, motion } from "framer-motion";
import MobileCloseDropDown from "@/components/widgets/dropdowns/MobileCloseDropDown";
import useIsMobile from "@/custom/helpers/useIsMobile";
import { asideVariant } from "@/lib/variants/globals";
import useParams from "@/custom/helpers/useParams";
import ProfileImg from "@/components/user/ProfileImg";
import { useAppSelector } from "@/custom/helpers/reduxTypes";
import DashLinks from "./DashLinks";

const DashboardAside = () => {
  const { showDashBoaedAside } = useParams();

  const { isMobile } = useIsMobile();
  const { name } = useAppSelector((st) => st.userData);

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showDashBoaedAside && (
        <motion.aside
          id="dash-aside"
          variants={asideVariant}
          custom={{ bool: isMobile, w: 300 }}
          initial="start"
          animate={"end"}
          exit="exit"
          key={"dash-aside"}
        >
          <div className=" dash-user center gap">
            <div className="dash-img">
              <ProfileImg />
            </div>

            <div className="content">
              <h4>{name}</h4>
              <p>
                welcome to dashboard.! let&apos;s see what happens in your app.
              </p>
            </div>
          </div>
          <div className="hr" />
          <DashLinks />

          <MobileCloseDropDown target="showDashBoaedAside" />
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default DashboardAside;
