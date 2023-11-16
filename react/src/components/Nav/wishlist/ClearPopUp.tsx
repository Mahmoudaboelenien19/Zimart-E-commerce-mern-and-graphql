import MainBtn from "@/components/widgets/buttons/MainBtn";
import MainPop from "@/components/widgets/shared/popup/MainPop";
import { useAppDispatch, useAppSelector } from "@/custom/helpers/reduxTypes";
import { Clear_Fav } from "@/graphql/mutations/user";
import { clearAllFav } from "@/redux/favSlice";
import { State } from "@/types/general";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";

const ClearPopUp = ({ bool, setter }: State) => {
  const closePopup = () => setter(false);
  const dispatch = useAppDispatch();
  const { userId } = useAppSelector((st) => st.isAuth);
  const [clearFav] = useMutation(Clear_Fav, {
    variables: {
      userId,
    },
  });
  const handleClearFav = async () => {
    const { data } = await clearFav();
    if (data?.ClearFav?.status === 200) {
      dispatch(clearAllFav());
      toast.success(data?.ClearFav?.msg);
      closePopup();
    }
  };
  return (
    <MainPop
      bool={bool}
      setter={setter}
      className="clear-wishlist"
      wrapperClassName="center col between h-100"
    >
      <h3 className="header">
        are you sure you want to permanently clear your wishlist. ?
      </h3>
      <div className="btns center ">
        <MainBtn
          btn="clear"
          type="button"
          className="btn clear"
          onClick={handleClearFav}
        />
        <MainBtn
          btn="cancel"
          type="button"
          className="btn cancel-outline"
          onClick={closePopup}
        />
      </div>
    </MainPop>
  );
};

export default ClearPopUp;
