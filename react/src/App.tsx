import React, { useEffect, useState } from "react";
import Loading from "./components/widgets/loaders/Loading";
import "./styles/App.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Nav from "./components/Nav/main/Nav";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/Nav/routes";
import IsAuthContextComponent from "./context/isAuth";
import { Toaster } from "react-hot-toast";
import GridViewContext from "./context/gridView";
import FilterDataContext from "./context/FilterData";
import ThemeContext from "./context/ThemContext";
import useProductsSubscription from "./custom/useProductsSubscription";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  useProductsSubscription();
  return (
    <ThemeContext>
      <IsAuthContextComponent>
        <GridViewContext>
          <FilterDataContext>
            <BrowserRouter>
              <div className="App">
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                    <Nav />
                    <AppRoutes />
                  </>
                )}
              </div>

              <Toaster
                position="bottom-left"
                reverseOrder={false}
                containerClassName=""
                toastOptions={{
                  style: {
                    background: "var(--main)",
                    color: "var(--third)",
                    width: 300,
                    whiteSpace: "nowrap",
                    textTransform: "capitalize",
                  },
                  success: {
                    duration: 3000,
                  },
                }}
              />
            </BrowserRouter>
          </FilterDataContext>
        </GridViewContext>
      </IsAuthContextComponent>
    </ThemeContext>
  );
};

export default App;
