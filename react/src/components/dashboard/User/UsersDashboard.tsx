import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import DashMain from "../DashMain";
import usePagination from "../../../custom/useNumberOfPages";
import DashBoardUsersTable from "./DashBoardUsersTable";
import Pages from "../../Product/Products/Pages";
import MobileDashUser from "./MobileDashUser";
import { useAppSelector } from "../../../custom/reduxTypes";
import NoData from "../../widgets/NoData";
import useMessure from "react-use-measure";
import { showAsideContext } from "../Dashboard";
import { mergeRefs } from "react-merge-refs";

const UsersDashboard = () => {
  const { showAsideDash } = useContext(showAsideContext);

  useEffect(() => {
    setTimeout(() => {
      document.title = "Dashboard | Users";
    }, 400);
  }, []);
  const { user } = useAppSelector((st) => st.user);
  const query = new URLSearchParams(location.search);
  const page = query.get("page") || "1";

  const [dataShown, numberOfPages] = usePagination(
    18,
    Number(page),
    user || []
  );
  const [ref, { width }] = useMessure();

  const [wid, setWid] = useState(0);
  const reff = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    setWid(reff.current?.offsetWidth || 0);
  }, [showAsideDash, width]);
  return (
    <DashMain key={"order-dashmain"}>
      <span ref={mergeRefs([reff, ref])}>
        <NoData length={user.length >= 0} message="No Users" cls="center h-80">
          {wid >= 750 ? (
            <DashBoardUsersTable data={dataShown} key={"table-order"} />
          ) : (
            <MobileDashUser data={dataShown} key={"mobile-order"} />
          )}
        </NoData>
      </span>

      <Pages
        pathname="/dashboard/users"
        key={"order-pages"}
        page={Number(page)}
        numOfPages={numberOfPages}
      />
    </DashMain>
  );
};

export default UsersDashboard;
