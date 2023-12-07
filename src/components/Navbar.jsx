import { useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logo from "@assets/img/logos/logo_inicio.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@slices/authSlice";
import { persistor } from "@app/store";
// import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  const [changeHeader, setChangeHeader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const carrito = useSelector((state) => state.carrito.productos);
  const cantidadEnCarrito = carrito.length;

  const logoutUser = () => {
    dispatch(logout());
    persistor.purge();
  };

  //header change function
  const onChangeHeader = () => {
    if (window.scrollY >= 50) {
      setChangeHeader(true);
    } else {
      setChangeHeader(false);
    }
  };

  //change header by scrolling
  window.addEventListener("scroll", onChangeHeader);
  return (
    <header
      className={
        changeHeader
          ? "bg-secondary fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
          : "bg-transparent fixed z-50 top-0 left-0 w-full transition duration-500"
      }
    >
      <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3">
        {/* left  */}
        <div className="flex flex-grow">
          <img
            className="w-36 cursor-pointer"
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        {/* right  */}
        {user ? (
          <>
            <div className="flex items-center justify-end space-x-4">
              <div
                className="relative flex cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <BsCart2 className="cursor-pointer w-8 h-8 text-slate-300 hover:text-slate-400 " />
                {cantidadEnCarrito > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cantidadEnCarrito}
                  </span>
                )}
              </div>
              {user.foto ? (
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.foto}
                  alt="profile"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <p className="text-white text-center text-2xl">
                    {user.nombre.charAt(0)}
                  </p>
                </div>
              )}
              <p className="text-slate-300 hidden md:block lg:block">
                {user.nombre}
              </p>
              <FiLogOut
                className="cursor-pointer w-6 h-6 text-slate-300"
                onClick={logoutUser}
              />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-end space-x-6">
              <button
                className="text-slate-300"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-primary px-6 py-3 text-white rounded-full ring-blue-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
                onClick={() => navigate("/register")}
              >
                Registrarse
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
