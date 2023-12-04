import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ isAllowed, redirectTo = "/", children }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  // if (!isAllowed) {
  //   return <Navigate to={redirectTo} replace />;
  // }

  if (
    user &&
    (location.pathname == "/login" || location.pathname == "/register")
  ) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
