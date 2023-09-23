import React from "react";
import "./styles/App.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AppRoutes from "./components/Nav/routes";
import IsAuthContextComponent from "./context/isAuth";
import GridViewContext from "./context/gridView";
import FilterDataContext from "./context/FilterData";
import ThemeContext from "./context/ThemContext";
import useProductsSubscription from "./custom/useProductsSubscription";
import Toast from "./components/widgets/Toast";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-lazy-load-image-component/src/effects/blur.css";
const App = () => {
  useProductsSubscription();

  return (
    <ThemeContext>
      <div className="App">
        <IsAuthContextComponent>
          <FilterDataContext>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <GridViewContext>
                <AppRoutes />
                <Toast />
              </GridViewContext>
            </SkeletonTheme>
          </FilterDataContext>
        </IsAuthContextComponent>
      </div>
    </ThemeContext>
  );
};

export default App;
