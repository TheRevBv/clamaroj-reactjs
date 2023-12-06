import Banner from "@components/Banner";
import CartCard from "@components/CartCard";
import { useEffect, useState } from "react";
import { MdPayments } from "react-icons/md";
import Footer from "@components/Footer/Footer";

const CarritoPage = () => {
  const [cartItems, setCartItems] = useState([]);
  //const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    // Obtener los productos del carrito desde el Local Storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // funcion para calcular el total
  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      const itemTotal = item.cantidad * item.precio;
      total += itemTotal;
    });

    return total;
  };

  return (
    <>
      <Banner />
      <section className="my-12 max-w-screen-xl mx-auto px-6">
        <div className="container mx-auto">
          {
            /* Si el carrito está vacío, mostrar un mensaje */
            cartItems.length === 0 ? (
              <>
                <div>
                  <img
                    src="https://paisajesespanoles.es/images/emptycart.png"
                    alt="carrito vacio"
                    className="mx-auto"
                  />
                </div>
                <div className="bg-white p-4 rounded-md text-center">
                  <h2 className="text-xl font-semibold mb-4">Carrito Vacío</h2>
                  <p className="text-gray-700 mb-2">
                    No tienes productos en tu carrito de compras.
                  </p>
                </div>
              </>
            ) : (
              // Si el carrito tiene productos, mostrar el listado
              <div className="grid grid-cols-2 gap-8">
                {/* Primera columna: Lista de tarjetas de productos */}
                <div className="overflow-y-auto max-h-80">
                  {cartItems.map((product, index) => (
                    <CartCard key={index} product={product} />
                  ))}
                </div>
                {/* Segunda columna: Resumen del carrito */}
                <div>
                  <div className="bg-white p-4 rounded-md">
                    <h2 className="text-xl font-semibold mb-4">
                      Resumen del Carrito
                    </h2>
                    <p className="text-gray-700 mb-2">
                      Cantidad de Artículos: <strong>{cartItems.length}</strong>
                    </p>
                    <p className="text-gray-700 mb-4">
                      Total a Pagar: <strong> ${calculateTotal()}</strong>
                    </p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center mx-auto">
                      Realizar Pedido <MdPayments className="ml-3" />
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CarritoPage;
