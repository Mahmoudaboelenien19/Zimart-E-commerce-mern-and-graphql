import { useEffect, useState } from "react";
import { imagesInterface } from "../interfaces/user.interface";

const usePathAndId = (arr: imagesInterface[] = [], index: number) => {
  const [id, setId] = useState("");
  const [path, setPath] = useState("");
  useEffect(() => {
    setId(arr[index]?._id);
  }, [index]);
  useEffect(() => {
    arr.map((e) => (e._id === id ? setPath(e.productPath) : null));
  }, [id]);

  return [id, path];
};
export default usePathAndId;
