import { OnDataOptions, useSubscription } from "@apollo/client";
import { useAppDispatch } from "../helpers/reduxTypes";
import { addToUserRedux } from "@/redux/userSlice";
import useParams from "../helpers/useParams";
import { User_Added_Sub } from "@/graphql/mutations/user";
import { User } from "@/types/user";

const useUserSubscription = () => {
  const dispatch = useAppDispatch();
  const { getParam } = useParams();
  const page = Number(getParam("page")) || 1;
  useSubscription(User_Added_Sub, {
    onData: (data: OnDataOptions<{ NeWUser: User[] }>) => {
      const ob = data?.data?.data?.NeWUser;

      if (page === 1) {
        dispatch(addToUserRedux(ob));
      }
    },
  });

  return;
};

export default useUserSubscription;
