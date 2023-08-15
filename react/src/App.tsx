import React, { useEffect, useState } from "react";
import Loading from "./components/Loading";
import "./styles/App.scss";
import Nav from "./components/Nav/Nav";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./components/Nav/routes";
import IsAuthContextComponent from "./context/isAuth";
import { Toaster } from "react-hot-toast";
import GridViewContext from "./context/gridView";
import FilterDataContext from "./context/FilterData";
import ThemeContext from "./context/ThemContext";
import { useSubscription, OnDataOptions } from "@apollo/client";
import { Updated_Product_Subscription } from "./graphql/mutations/product";
import { ProductInterface } from "./interfaces/product";
import { updateProductRedux } from "./redux/productSlice";
import { useAppDispatch } from "./custom/reduxTypes";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  const [updatedProduct, setUpdatedProduct] = useState({} as ProductInterface);

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
                    width: "240px",
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
