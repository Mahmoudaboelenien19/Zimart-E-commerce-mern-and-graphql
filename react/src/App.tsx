import React from "react";
import "./styles/App.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "@/styles/globels/classes.scss";
import AppRoutes from "./components/Nav/routes";
import IsAuthContextComponent from "./context/isAuth";
import GridViewContext from "./context/gridView";
import FilterDataContext from "./context/ProductsContext";
import ThemeContext from "./context/ThemContext";
import useProductsSubscription from "./custom/useProductsSubscription";
import Toast from "./components/widgets/Toast";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-lazy-load-image-component/src/effects/blur.css";
import "react-loading-skeleton/dist/skeleton.css";
const App = () => {
  useProductsSubscription();

  return (
    <ThemeContext>
      <IsAuthContextComponent>
        <FilterDataContext>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <GridViewContext>
              <div>
                <AppRoutes />
              </div>
              <Toast />
            </GridViewContext>
          </SkeletonTheme>
        </FilterDataContext>
      </IsAuthContextComponent>
    </ThemeContext>
  );
};

export default App;
