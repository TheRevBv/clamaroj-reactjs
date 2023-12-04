import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@app/store";
import CarritoPage from "@pages/CarritoPage";
import ErrorPage from "@pages/ErrorPage";
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";
import Navbar from "@components/Navbar";
import ProductosDetails from "@pages/ProductosDetails";
import ProtectedRoutes from "@components/ProtectedRoutes";
import RegisterPage from "@pages/RegisterPage";
import PedidosPage from "@pages/PedidosPage";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Fragment>
          <Routes>
            <Route index element={<HomePage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route
                exact
                path="/productos/:idProducto"
                element={<ProductosDetails />}
              />
              <Route exact path="/cart" element={<CarritoPage />} />
            </Route>
            <Route exact path="/pedidos" element={<PedidosPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
