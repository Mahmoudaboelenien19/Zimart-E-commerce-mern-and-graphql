import { get_SHOPING_COLLECTION } from "@/graphql/mutations/user";
import { useLazyQuery } from "@apollo/client";
import { useAppSelector } from "../helpers/reduxTypes";
import { useEffect, useRef } from "react";
const useGetCollection = (target: string) => {
  const { userId } = useAppSelector((st) => st.isAuth);

  const [fn, { data, loading }] = useLazyQuery(get_SHOPING_COLLECTION, {
    variables: {
      input: {
        target: target,
        userId: userId,
        id: "",
      },
    },
  });

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      fn();
      initialRender.current = false;
    }
  }, []);
  console.log("get coll");
  console.log(data);
  return { data: data?.getUserShopCollection, loading };
};

export default useGetCollection;
