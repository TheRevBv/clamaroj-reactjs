import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  // determine if authorized, from context or however you're doing it    // If authorized, return an outlet that will render child elements
  const { auth } = useSelector((state) => state.auth);
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
