import React, { useEffect, useState } from "react";
import DashMain from "../DashMain";
import usePagination from "../../../custom/useNumberOfPages";
import DashBoardUsersTable from "./DashBoardUsersTable";
import Pages from "../../Product/Products/Pages";
import useIsMobile from "../../../custom/useIsMobile";
import MobileDashUser from "./MobileDashUser";
import { useAppSelector } from "../../../custom/reduxTypes";
import NoData from "../../widgets/NoData";

const UsersDashboard = () => {
  useEffect(() => {
    setTimeout(() => {
      document.title = "Dashboard | Users";
    }, 400);
  }, []);
  const { user } = useAppSelector((st) => st.user);
  const { isMobile } = useIsMobile();
  const [page, setPage] = useState(1);

  const [dataShown, numberOfPages] = usePagination(12, page, user || []);
  return (
    <DashMain key={"order-dashmain"}>
      <>
        <NoData length={user.length >= 0} message="No Users" cls="center h-80">
          {!isMobile ? (
            <DashBoardUsersTable data={dataShown} key={"table-order"} />
          ) : (
            <MobileDashUser data={dataShown} key={"mobile-order"} />
          )}
        </NoData>
      </>

      <Pages
        key={"order-pages"}
        page={page}
        numOfPages={numberOfPages}
        setPage={setPage}
      />
    </DashMain>
  );
};

export default UsersDashboard;
