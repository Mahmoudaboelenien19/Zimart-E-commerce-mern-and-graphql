import { OnDataOptions, useSubscription } from "@apollo/client";
import { User_Added_Sub } from "../graphql/mutations/user";
import { useAppDispatch } from "./reduxTypes";
import { addToUserRedux } from "../redux/UserSlice";

const useUserSubscription = () => {
  const dispatch = useAppDispatch();

  useSubscription(User_Added_Sub, {
    onData: (data: OnDataOptions<{ AddUser: any }>) => {
      const ob = data?.data?.data?.AddUser;
      dispatch(addToUserRedux(ob));
    },
  });

  return;
};

export default useUserSubscription;
