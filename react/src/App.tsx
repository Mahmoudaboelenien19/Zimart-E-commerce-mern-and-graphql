import "./styles/App.scss";
import "@/styles/globels/classes.scss";
import "@/styles/globels/globales.scss";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-loading-skeleton/dist/skeleton.css";
import Toast from "./components/Toast/Toast";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AppWrapper from "./AppWrapper";
import useGetUserData from "./custom/user/useGetUserData";
import ThemeWrapper from "./ThemeWrapper";
import { AppRoutes } from "./components/Nav/routes";
const App = () => {
  useGetUserData();

  return (
    <AppWrapper>
      <ThemeWrapper>
        <SkeletonTheme
          highlightColor="hsl(200, 20%, 70%)"
          baseColor="var(--third)"
        >
          <AppRoutes />
          <Toast />
        </SkeletonTheme>
      </ThemeWrapper>
    </AppWrapper>
  );
};

export default App;
