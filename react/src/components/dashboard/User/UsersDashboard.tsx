import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import DashMain from "../DashMain";
import DashBoardUsersTable from "./DashBoardUsersTable";
import MobileDashUser from "./MobileDashUser";
import useMessure from "react-use-measure";

import { mergeRefs } from "react-merge-refs";
import Pages from "@/components/Product/Products/Pages";
import NoData from "@/components/widgets/NoData";
import { useAppSelector } from "@/custom/reduxTypes";
import usePagination from "@/custom/useNumberOfPages";
import useParams from "@/custom/useParams";

const UsersDashboard = () => {
  const { user } = useAppSelector((st) => st.user);
  const { page, showDashBoaedAside } = useParams();

  const [dataShown, numberOfPages] = usePagination(
    18,
    Number(page),
    user || []
  );
  const [ref, { width }] = useMessure();

  const [wid, setWid] = useState(0);
  const reff = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      document.title = "Dashboard | Users";
    }, 400);
  }, []);
  useLayoutEffect(() => {
    setWid(reff.current?.offsetWidth || 0);
  }, [showDashBoaedAside, width]);
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
        key={"order-pages"}
        page={Number(page)}
        numOfPages={numberOfPages}
      />
    </DashMain>
  );
};

export default UsersDashboard;
