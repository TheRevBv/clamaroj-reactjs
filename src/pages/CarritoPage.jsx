import CartCard from "@components/CartCard";
import { useEffect, useState, useCallback } from "react";
import { MdPayments } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";
import { FaRemoveFormat } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbShoppingCartOff } from "react-icons/tb";
import Footer from "@components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotal } from "@utils/helpers";
import { useNavigate } from "react-router-dom";
import { getCarrito, clearCarrito } from "@app/slices/carritoSlice";
import Modal from "@components/Modal";
import CheckoutFormModal from "@components/CheckoutFormModal";

const CarritoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.carrito.productos);
  const total2 = useSelector((state) => state.carrito.productos);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setLoading(true);

    dispatch(getCarrito());
    //calcularTotal();
    setLoading(false);
  }, [dispatch]);

  /*useEffect(() => {
    //setItems(cartItems);
    console.log("Items:", cartItems);
    getCarritoLocal();
    console.log("Items2:", cartItems);
  }, [cartItems]);*/

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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCheckout = useCallback(() => {
    if (!user) {
      swal(
        "Inicia sesión",
        "Para poder realizar la compra debes iniciar sesión",
        "error"
      );
      return navigate("/login");
    }
    if (cartItems.length === 0)
      return swal("Carrito vacío", "No hay productos en el carrito", "error");
    openModal();
  }, [cartItems, user]);

  const emptyCart = () => {
    if (cartItems.length === 0) return;
    dispatch(clearCarrito());
    setTotal(0);
    swal(
      "Carrito vaciado",
      "El carrito se ha vaciado correctamente",
      "success"
    );
  };

  return (
    <>
      {/* <Banner title="Carrito de compras" /> */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="h-96 container mx-auto px-4">
          <div className="container mx-auto px-4 h-full">
            <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 h-full">
              <div className="lg:w-3/4 h-full overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="bg-white shadow-md px-4 py-10 flex flex-col items-center justify-center gap-4 h-full rounded-md">
                    <h2 className="text-2xl font-semibold">
                      No hay productos en el carrito
                    </h2>
                    <TbShoppingCartOff className="mx-auto font-semibold text-9xl text-gray-300" />
                  </div>
                ) : (
                  <div className="container mx-auto px-4">
                    {cartItems.map((producto) => (
                      <CartCard
                        key={producto.idProducto}
                        producto={producto}
                        funcionRefrescarCarrito={getCarritoLocal}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="lg:w-1/4 lg:sticky lg:top-0 h-full bg-white shadow-md p-4 flex items-start rounded-md flex-col space-y-4">
                <div className="w-full">
                  <h2 className="text-2xl font-semibold">Resumen</h2>
                  <div className="flex justify-between mt-4">
                    <span className="text-lg">Total</span>
                    <span className="text-lg font-semibold">${total}</span>
                  </div>
                  <button
                    data-modal-target="default-modal"
                    data-modal-toggle="default-modal"
                    type="button"
                    className="bg-primary text-white w-full py-2 mt-4"
                    onClick={handleCheckout}
                  >
                    <MdPayments className="inline-block mr-2" />
                    Pagar
                  </button>
                  {/* Vaciar carrito */}
                  <button
                    type="button"
                    className="text-red-600 w-full py-2 mt-4 hover:text-red-700 hover:bg-gray-50 rounded-md"
                    onClick={emptyCart}
                  >
                    <BsFillTrashFill className="inline-block mr-2" />
                    Vaciar carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-white rounded-md w-full max-w-2xl max-h-full">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-semibold">Finalizar compra</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="text-lg">Total</span>
              <span className="text-lg font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col align-center justify-center gap-4">
              <CheckoutFormModal />
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button
              type="button"
              className="bg-primary text-white w-full py-2 mt-4 rounded-md"
              onClick={closeModal}
            >
              <IoClose className="inline-block mr-2" />
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
      <Footer />
    </>
  );
};

export default CarritoPage;
