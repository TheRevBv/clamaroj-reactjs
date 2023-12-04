import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@app/store";
import HomePage from "@pages/HomePage";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import Navbar from "@components/Navbar";
import CarritoPage from "@pages/CarritoPage";
import ProtectedRoutes from "@components/ProtectedRoutes";

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
              <Route exact path="/cart" element={<CarritoPage />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
