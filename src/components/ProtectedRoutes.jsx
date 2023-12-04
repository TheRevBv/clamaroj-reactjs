import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({ isAllowed, redirectTo = "/", children }) => {
  const location = useLocation();
  const { user, token } = useSelector((state) => state.auth);

  if (!user && !token) {
    if (location.pathname == "/login" || location.pathname == "/register") {
      return children ? children : <Outlet />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  if (
    user &&
    (location.pathname == "/login" || location.pathname == "/register")
  ) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoutes;
