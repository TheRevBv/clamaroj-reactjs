import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import store from "@app/store";

const ProtectedRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const { pathname } = location;
  const isAuth = auth.isAuthenticated;

  const user = store.getState().auth.user;
  //Se harcodea el rol para testear
  const roles = [{ id: 1, nombre: "ADMIN" }];
  // se descomenta cuando se tenga el rol del api
  // const roles = user.roles;
  const isAdmin = roles.some((role) => role.nombre === "ADMIN");

  if (isAuth && isAdmin) {
    return <Outlet />;
  } else if (isAuth && !isAdmin) {
    return <Navigate to="/" />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default ProtectedRoutes;
