import CartCard from "@components/CartCard";
import { useEffect, useState, useCallback } from "react";
import { MdPayments } from "react-icons/md";
import { TbShoppingCartOff } from "react-icons/tb";
import Footer from "@components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal } from "@utils/helpers";
import { useNavigate } from "react-router-dom";
import { getCarrito } from "@slices/carritoSlice";

const CarritoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.carrito.productos);
  const total2 = useSelector((state) => state.carrito.productos);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getCarrito());
    setLoading(false);
  }, [dispatch]);

  //Funcion para sacar el carro del localstorage
  const getCarritoLocal = () => {
    let carritoLocal = localStorage.getItem("carrito");

    if (carritoLocal) {
      //Convertir a objeto y luego cambiar a array
      const carritoArray = Object.values(JSON.parse(carritoLocal));
      //Sacamos el total
      let totalArray = 0;
      carritoArray.forEach((producto) => {
        totalArray += producto.precio * producto.cantidad;
      });
      setTotal(totalArray);
      setItems(carritoArray);
    } else {
      setTotal(0);
    }
  };

  useEffect(() => {
    getCarritoLocal();
  }, []);

  const handleCheckout = useCallback(() => {
    if (cartItems.length === 0) return;

    navigate("/checkout");
  }, []);

  return (
    <>
      {/* <Banner title="Carrito de compras" /> */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="h-96 w-2/3">
          <div className="container mx-auto px-4 h-full">
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 h-full">
              <div className="lg:w-3/4 h-full">
                <div className="flex flex-col space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="bg-white shadow-md px-4 py-10 flex flex-col items-center justify-center gap-4">
                      <h2 className="text-2xl font-semibold">
                        No hay productos en el carrito
                      </h2>
                      <TbShoppingCartOff className="mx-auto font-semibold text-9xl text-gray-300" />
                    </div>
                  ) : (
                    items.map((producto) => (
                      // <h2 key={producto.idProducto}>{producto.nombre}</h2>
                      <CartCard key={producto.idProducto} producto={producto} funcionRefrescarCarrito={getCarritoLocal} />
                    ))
                  )}
                  {/* {cartItems.map((producto) => (
                <CartCard key={producto.idProducto} producto={producto} />
              ))} */}
                </div>
              </div>
              <div className="lg:w-1/4 lg:sticky lg:top-0 h-full bg-white shadow-md p-4 flex items-start rounded-md flex-col space-y-4">
                <div className="w-full">
                  <h2 className="text-2xl font-semibold">Resumen</h2>
                  <div className="flex justify-between mt-4">
                    <span className="text-lg">Total</span>
                    <span className="text-lg font-semibold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                  <button
                    className="bg-primary text-white w-full py-2 mt-4"
                    onClick={handleCheckout}
                  >
                    <MdPayments className="inline-block mr-2" />
                    Pagar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CarritoPage;
