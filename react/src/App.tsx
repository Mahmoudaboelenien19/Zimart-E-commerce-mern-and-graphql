import React from "react";
import "./styles/App.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Nav from "./components/Nav/main/Nav";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/Nav/routes";
import IsAuthContextComponent from "./context/isAuth";
import GridViewContext from "./context/gridView";
import FilterDataContext from "./context/FilterData";
import ThemeContext from "./context/ThemContext";
import useProductsSubscription from "./custom/useProductsSubscription";
import Toast from "./components/widgets/Toast";
import { SkeletonTheme } from "react-loading-skeleton";

const App = () => {
  useProductsSubscription();

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <ThemeContext>
        <IsAuthContextComponent>
          <GridViewContext>
            <FilterDataContext>
              <BrowserRouter>
                <div className="App">
                  <Nav />
                  <AppRoutes />
                </div>

                <Toast />
              </BrowserRouter>
            </FilterDataContext>
          </GridViewContext>
        </IsAuthContextComponent>
      </ThemeContext>
    </SkeletonTheme>
  );
};

export default App;
