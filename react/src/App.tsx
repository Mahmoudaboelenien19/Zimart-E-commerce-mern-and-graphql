import "./styles/App.scss";
import "@/styles/globels/classes.scss";
import "@/styles/globels/globales.scss";
import AppRoutes from "./components/Nav/routes";
import IsAuthContextComponent from "./context/isAuth";
import ThemeContext from "./context/ThemContext";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-loading-skeleton/dist/skeleton.css";
import Toast from "./components/Toast/Toast";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useLocation } from "react-router-dom";
const App = () => {
  return (
    <ThemeContext>
      <IsAuthContextComponent>
        <SkeletonTheme
          highlightColor="hsl(200, 20%, 70%)"
          baseColor="var(--third)"
        >
          <div>
            <AppRoutes />
          </div>
          <Toast />
        </SkeletonTheme>
      </IsAuthContextComponent>
    </ThemeContext>
  );
};

export default App;
