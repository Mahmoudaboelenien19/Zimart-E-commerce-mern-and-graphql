import { useMediaQuery } from "react-responsive";

const useIsMobile = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 650px)" });
  const isMidScreen = useMediaQuery({ query: "(max-width: 850px)" });

  return { isMobile, isMidScreen };
};

export default useIsMobile;
