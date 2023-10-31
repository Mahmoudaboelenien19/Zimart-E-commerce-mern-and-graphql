import axios from "axios";
import { newRefTokenRoute } from "../../assets/routes";
export const getnewAccess = async () => {
  const {
    data: { accessToken, id },
  } = await axios.post(
    newRefTokenRoute,
    {},
    {
      withCredentials: true,
    }
  );
  return { accessToken, id };
};
