import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "@assets/img/logos/logo_inicio.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@slices/authSlice";
import { persistor } from "@app/store";

const usuario = {
  // nombre: "Juan",
  // apellido: "Perez",
  // correo: "jp@mail.com",
  // password: "1234",
  // foto: "https://i.ibb.co/0s3pdnc/logo2.png",
  // roles: [
  //   { id: 1, nombre: "ADMIN" },
  //   { id: 2, nombre: "USER" },
  // ],
};

const Navbar = () => {
  const [changeHeader, setChangeHeader] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  console.log(user);

  //   const { order } = useOrder();

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
          ? "bg-white fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
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
              {/* <NavLink to="/admin" className="text-gray-600">
                Admin
              </NavLink> */}
              <div
                className="relative flex cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                {/* <span className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white  absolute -right-2 -top-2">
                  {order.length}
                </span> */}
                <BsCart2 className="cursor-pointer w-6 h-6 text-gray-700" />
              </div>
              <img
                src={user.foto}
                alt={user.nombre}
                className="w-10 h-10 rounded-full"
              />
              <p className="text-gray-700 hidden md:block lg:block">
                {user.nombre}
              </p>
              <FiLogOut
                className="cursor-pointer w-6 h-6 text-gray-700"
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
