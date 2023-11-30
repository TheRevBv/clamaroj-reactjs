import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@app/store";
import ProtectedRoutes from "@routes/PrivateRoutes";
import HomePage from "@pages/HomePage";
import ErrorPage from "@pages/ErrorPage";
import LoginPage from "@pages/LoginPage";
import RegisterPage from "@pages/RegisterPage";
import Navbar from "@components/Navbar";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Fragment>
          <Routes>
            <Route exact path="/" element={<ProtectedRoutes />}>
              <Route exact path="/" element={<HomePage />} />
            </Route>
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
