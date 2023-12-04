import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@app/store";
import HomePage from "@pages/HomePage";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import Navbar from "@components/Navbar";
import ProtectedRoutes from "@components/ProtectedRoutes";
import ProductosDeatil from "@pages/ProductosDeatil";
import CarritoPage from "@pages/CarritoPage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Fragment>
          <Routes>
            <Route index element={<HomePage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route
              path="/productos/:idProducto"
              element={<ProductosDeatil />}
            />
            <Route path="/cardProducts" element={<CarritoPage />} />
            <Route exact path="/cart" element={<ProtectedRoutes />}>
              <Route index element={<h1>Cart</h1>} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
