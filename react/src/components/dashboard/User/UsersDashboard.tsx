import { useEffect, useState } from "react";
import DashMain from "../DashMain";
import DashBoardUsersTable from "./DashBoardUsersTable";
import MobileDashUser from "./MobileDashUser";
import Pages from "@/components/Product/Products/Pages";
import useParams from "@/custom/useParams";
import { GET_ALL_USERS } from "@/graphql/mutations/user";
import { useLazyQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import {
  addToUserRedux,
  clearUsersRedux,
  usersSkeltonRedux,
} from "@/redux/userSlice";
import useUserSubscription from "@/custom/subscriptions/useUserSubscription";
import useTitle from "@/custom/useTitle";

export const Component = () => {
  const dispatch = useDispatch();
  const { page } = useParams();
  const [totalPages, setTotalPages] = useState(0);
  const [getUsers] = useLazyQuery(GET_ALL_USERS, {
    variables: {
      limit: 18,
      skip: Number(page) >= 2 ? 18 * (Number(page) - 1) : 0,
    },
  });
  useTitle("Dashboard | Users");
  useEffect(() => {
    dispatch(usersSkeltonRedux());
    getUsers().then((res) => {
      dispatch(clearUsersRedux());
      dispatch(addToUserRedux(res.data?.users?.users));
      setTotalPages(res.data.users.totalUsers);
    });
  }, [page]);
  useUserSubscription();

  return (
    <DashMain key={"order-dashmain"}>
      <DashBoardUsersTable key={"table-order"} />
      <MobileDashUser key={"mobile-order"} />
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
