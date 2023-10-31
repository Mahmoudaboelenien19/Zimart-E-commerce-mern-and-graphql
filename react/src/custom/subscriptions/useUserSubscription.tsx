import { OnDataOptions, useSubscription } from "@apollo/client";
import { useAppDispatch } from "../reduxTypes";
import { addToUserRedux } from "@/redux/userSlice";
import useParams from "../useParams";
import { UserInterface } from "@/interfaces/user.interface";
import { User_Added_Sub } from "@/graphql/mutations/user";

const useUserSubscription = () => {
  const dispatch = useAppDispatch();
  const { getParam } = useParams();
  const page = Number(getParam("page")) || 1;
  useSubscription(User_Added_Sub, {
    onData: (data: OnDataOptions<{ NeWUser: UserInterface[] }>) => {
      const ob = data?.data?.data?.NeWUser;

      if (page === 1) {
        dispatch(addToUserRedux(ob));
      }
    },
  });

  return;
};

export default useUserSubscription;
