import { useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate, Link } from "react-router-dom";
import logo from "@assets/img/logos/logo_inicio.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@app/slices/authSlice";
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
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleLinks, setVisibleLinks] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  //logout function
  const logoutUser = () => {
    dispatch(logout());
    persistor.purge();
  };

  const toggleMenu = () => {
    setVisibleMenu(!visibleMenu);
  };

  const toggleLinks = () => {
    setVisibleLinks(!visibleLinks);
  };

  const handleScroll = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 100) {
      setChangeHeader(true);
    }
    if (scrollY < 100) {
      setChangeHeader(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition duration-500 ease-in-out ${
        changeHeader ? "bg-white shadow-md " : "bg-transparent"
      }`}
    >
      <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3 sm:flex-row flex-col justify-between">
        {/* left  */}
        {/* Agrega diseño responsivo con menu de hamburguesa para pantallas pequeñas */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Link to="/">
            <img src={logo} alt="logo" className="w-32" />
          </Link>
          <div className="sm:hidden">
            <button
              className="text-slate-300 hover:text-slate-400 focus:outline-none"
              onClick={toggleLinks}
            >
              <RxHamburgerMenu className="w-8 h-8" />
            </button>
          </div>
        </div>
        {/* center  */}
        <div
          className={`${
            visibleLinks ? "block" : "hidden"
          } sm:flex items-center justify-center flex-grow flex-col sm:flex-row gap-6 mt-4 sm:mt-0`}
        >
          <Link
            to="/"
            className="text-slate-300 hover:text-slate-400 cursor-pointer px-4 py-2 sm:text-xl text-base"
          >
            Inicio
          </Link>
          <Link
            to="/productos"
            className="text-slate-300 hover:text-slate-400 cursor-pointer px-4 py-2 sm:text-xl text-base"
          >
            Productos
          </Link>
          <Link
            to="/nosotros"
            className="text-slate-300 hover:text-slate-400 cursor-pointer px-4 py-2 sm:text-xl text-base"
          >
            Nosotros
          </Link>
          <Link
            to="/contacto"
            className="text-slate-300 hover:text-slate-400 cursor-pointer px-4 py-2 sm:text-xl text-base"
          >
            Contacto
          </Link>
        </div>
        {/* right  */}
        <div className="flex items-center justify-end flex-row gap-6">
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
          {user ? (
            <>
              <div
                className="flex items-center justify-center space-x-2 cursor-pointer sm:flex-row flex-col gap-2"
                onClick={toggleMenu}
              >
                {/* <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                /> */}
                {user.foto && user.foto.includes(".png", ".jpg") ? (
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
                <span className="text-slate-300 hover:text-slate-400">
                  {user.nombre}
                </span>
              </div>
              {visibleMenu && (
                <div className="absolute sm:top-20 xl:right-auto sm:right-0 right-0 bg-white shadow-md rounded-md py-2 w-48 top-48 hover:shadow-lg">
                  <Link
                    className="w-full flex items-center justify-start px-4 py-2 text-primary "
                    to="/profile"
                  >
                    Mi perfil
                  </Link>
                  <Link
                    className="w-full flex items-center justify-start px-4 py-2 text-primary "
                    to="/pedidos"
                  >
                    Mis pedidos
                  </Link>
                  <Link
                    className="w-full flex items-center justify-start px-4 py-2 text-primary "
                    onClick={logoutUser}
                  >
                    <FiLogOut className="mr-2" />
                    Cerrar sesion
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              {/* <div className="flex items-center justify-end space-x-6"> */}
              <button
                className="text-slate-300 hover:text-slate-400 cursor-pointer"
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
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
