import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@app/store";
import HomePage from "@pages/HomePage";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import PedidosPage from "@pages/PedidosPage";
import ContactoPage from "@pages/ContactoPage";
import InformacionPage from "@pages/InformacionPage";
import Navbar from "@components/Navbar";
import CarritoPage from "@pages/CarritoPage";
import ProtectedRoutes from "@components/ProtectedRoutes";
import ProductosDetails from "@pages/ProductosDetails";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Fragment>
          <Routes>
            <Route index element={<HomePage />} />
            <Route exact path="/home" element={<HomePage />} />
            <Route exact path="/informacion" element={<InformacionPage />} />
            <Route exact path="/contacto" element={<ContactoPage />} />
            <Route element={<ProtectedRoutes />}>
              <Route exact path="/register" element={<RegisterPage />} />
              <Route exact path="/login" element={<LoginPage />} />
              <Route exact path="/contacto" element={<LoginPage />} />
              <Route exact path="/informacion" element={<LoginPage />} />
              <Route
                exact
                path="/productos/:idProducto"
                element={<ProductosDetails />}
              />
              <Route exact path="/cart" element={<CarritoPage />} />
              <Route exact path="/orders" element={<PedidosPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
