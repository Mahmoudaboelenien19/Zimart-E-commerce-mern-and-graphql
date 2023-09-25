import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import DashMain from "../DashMain";
import DashBoardUsersTable from "./DashBoardUsersTable";
import MobileDashUser from "./MobileDashUser";
import useMessure from "react-use-measure";
import { mergeRefs } from "react-merge-refs";
import Pages from "@/components/Product/Products/Pages";
import useParams from "@/custom/useParams";
import { GET_ALL_USERS } from "@/graphql/mutations/user";
import { useLazyQuery } from "@apollo/client";

export const Component = () => {
  const { page, showDashBoaedAside } = useParams();
  const [ref, { width }] = useMessure();
  const [wid, setWid] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const reff = useRef<HTMLDivElement>(null);
  const [getUsers, { data }] = useLazyQuery(GET_ALL_USERS, {
    variables: {
      limit: 18,
      skip: Number(page) >= 2 ? 18 * (Number(page) - 1) : 0,
    },
  });
  useEffect(() => {
    document.title = "Dashboard | Users";
    getUsers().then((res) => {
      setTotalPages(res.data.users.totalUsers);
    });
  }, [page]);
  useLayoutEffect(() => {
    setWid(reff.current?.offsetWidth || 0);
  }, [showDashBoaedAside, width]);

  const orders = data?.users?.users || Array.from({ length: 18 });
  return (
    <DashMain key={"order-dashmain"}>
      <span ref={mergeRefs([reff, ref])} id={"users"}>
        <>
          {wid >= 750 ? (
            <DashBoardUsersTable data={orders} key={"table-order"} />
          ) : (
            <MobileDashUser data={orders} key={"mobile-order"} />
          )}
        </>
      </span>

      <Pages
        total={totalPages}
        key={"order-pages"}
        page={Number(page)}
        to="users"
        limit={18}
      />
    </DashMain>
  );
};
