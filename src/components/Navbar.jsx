import { useState, useEffect } from "react";
import { BsCart2 } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo2.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@slices/authSlice";
import { persistor } from "@app/store";
import { FaCartShopping } from "react-icons/fa6";

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
  //console.log(auth);
  // Estado para almacenar la cantidad de artículos en el carrito
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(0);

  //   const { order } = useOrder();

  useEffect(() => {
    // Obtener la cantidad de artículos del localStorage
    const carrito = localStorage.getItem("cart");
    console.log("cantidadAlmacenada", carrito);
    const cantidadAlmacenada = JSON.parse(carrito)?.length;
    console.log("cantidadAlmacenada1", cantidadAlmacenada);
    // Actualizar el estado si hay una cantidad almacenada
    if (cantidadAlmacenada) {
      setCantidadEnCarrito(Number(cantidadAlmacenada));
    } else {
      setCantidadEnCarrito(0);
    }
    console.log("cantidadAlmacenada2", cantidadAlmacenada);
  }, [cantidadEnCarrito]); // El segundo parámetro [] asegura que useEffect se ejecute solo una vez al montar el componente

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

  const navStyle = {
    //background: 'rgb(9, 53, 87)',
    background:
      "linear-gradient(157deg, rgba(8,33,53,1) 35%, rgba(8,50,77,1) 67%, rgba(3,36,60,1) 79%)",
  };

  const CarritoDeComprasIcono = ({ cantidadEnCarrito }) => {
    return (
      <div className="relative">
        <FaCartShopping
          className="cursor-pointer w-9 h-9 text-gray-700"
          onClick={() => navigate("/cardProducts")}
        />
        {cantidadEnCarrito > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-1.5 py-0.5 text-xs">
            {cantidadEnCarrito}
          </span>
        )}
      </div>
    );
  };

  //change header by scrolling
  window.addEventListener("scroll", onChangeHeader);
  return (
    <header
      className={
        changeHeader
          ? "fixed z-50 top-0 left-0 w-full shadow-md transition duration-500"
          : "bg-transparent fixed z-50 top-0 left-0 w-full transition duration-500"
      }
      style={changeHeader ? navStyle : null}
    >
      <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3">
        {/* left  */}
        <div className="flex flex-grow">
          <img
            className="w-36 cursor-pointer"
            src="../src/assets/logo inicio.png"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        {/* right  */}
        {user ? (
          <>
            <div
              className="flex items-center justify-end space-x-4"
              style={{ color: "white" }}
            >
              <NavLink to="/admin" className="text-gray-600">
                Admin
              </NavLink>
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
                alt={user.nombre + " " + user.apellido}
                className="w-10 h-10 rounded-full"
              />
              <p className="text-gray-700 hidden md:block lg:block">
                {user.correo}
              </p>
              <FiLogOut
                className="cursor-pointer w-6 h-6 text-gray-700"
                onClick={logoutUser}
              />
            </div>
          </>
        ) : (
          <>
            <div
              className="flex items-center justify-end space-x-6"
              style={{ color: "white" }}
            >
              <button className="" onClick={() => navigate("/login")}>
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

        <CarritoDeComprasIcono cantidadEnCarrito={cantidadEnCarrito} />
      </nav>
    </header>
  );
};

export default Navbar;
