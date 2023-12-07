import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { FaBagShopping } from "react-icons/fa6";
import { TbShoppingCartCheck } from "react-icons/tb";
import swal from "sweetalert";
import Footer from "../components/Footer/Footer";

const ProductosDetails = () => {
  const [product, setProduct] = useState({});
  const { idProducto } = useParams();
  const [productAdded, setProductAdded] = useState(false);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // Nuevo estado para la cantidad
  const [cantidadEnCarrito, setCantidadEnCarrito] = useState(0); // Nuevo estado para la cantidad en el carrito

  const getProductId = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:7092/api/Productos/${idProducto}`
      );
      if (!response.ok) {
        throw new Error("Error al obtener el producto");
      }
      const data = await response.json();

      if (!Array.isArray(data)) {
        setProduct(data);
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error.message);
      /*Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se pudo obtener el producto",
      });*/
      alert("No se pudo obtener el producto");
      navigate("/"); // Redirecciona a la página principal en caso de error
    }
  }, [idProducto]);
  /*
    const getProductId =()=>{
       let api = `http://localhost:7092/api/Productos/${idProducto}`;
    }*/

  useEffect(() => {
    getProductId();
  }, [idProducto]);
  // Luego, agregar un nuevo useEffect para llamar a isAdded después de que product se actualiza
  useEffect(() => {
    isAdded();
  }, [product]);

  //Añadir articulo al local storage
  //Añadir articulo al local storage
  const addProduct = () => {
    removeProduct();
    //Verificar si la caantidad es diferente a la cantidad en el carrito
    if (cantidadEnCarrito !== quantity) {
      //Si es diferente, actualizar la cantidad en el carrito
      setCantidadEnCarrito(quantity);
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, cantidad: quantity });
    setProductAdded(true);
    // Actualizar el localStorage y el estado de cantidadEnCarrito
    localStorage.setItem("cart", JSON.stringify(cart));
    swal("Producto agregado al carrito", "", "success");
  };

  const removeProduct = () => {
    setProductAdded(false);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Encontrar la posición del producto en el carrito por idProducto
    const index = cart.findIndex(
      (item) => item.idProducto === product.idProducto
    );

    if (index > -1) {
      // Si el producto está en el carrito, eliminarlo en esa posición
      cart.splice(index, 1);

      // Actualizar el localStorage y el estado de cantidadEnCarrito
      localStorage.setItem("cart", JSON.stringify(cart));
      //setCantidadEnCarrito((prevCantidad) => Math.max(0, prevCantidad - 1));
      swal("Producto eliminado del carrito", "", "success");
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //Funcion para saber si ha añadido este producto o no
  const isAdded = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex(
      (item) => item.idProducto === product.idProducto
    );
    if (index > -1) {
      let cantidadArticulos = cart[index].cantidad;
      setCantidadEnCarrito(cantidadArticulos);
      setProductAdded(true);
    } else {
      setCantidadEnCarrito(0);
      setProductAdded(false);
    }
  };

  return (
    <>
      <Banner />
      <section className="my-12 max-w-screen-xl mx-auto px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            {/* Columna 1 */}
            <div className="w-full sm:w-1/2 p-4">
              <img
                src={`/src/assets/${product.foto}`}
                alt={`Product Image ${product.idProducto + 1}`}
                className="mx-auto object-cover h-96"
              />
            </div>

            {/* Columna 2 */}
            <div className="w-full sm:w-1/2 p-4">
              <h1 className="text-3xl font-semibold mb-4 text-center uppercase text-primary">
                {product.nombre}
              </h1>
              <h2 className="card-text text-center">{product.descripcion}</h2>
              <h2 className="text-lg font-semibold mb-4 text-center">
                Precio:<strong> ${product.precio}</strong>
              </h2>
              <h2 className="text-lg font-semibold mb-4">
                Código: <strong>{product.codigo}</strong>
              </h2>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center justify-center space-x-4">
                  <button
                    className="bg-primary text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleDecrement}
                  >
                    {"-"}
                  </button>
                  <p className="text-lg font-semibold">{quantity}</p>
                  <button
                    className="bg-primary text-white font-bold py-2 px-4 rounded-full"
                    onClick={handleIncrement}
                  >
                    {"+"}
                  </button>
                </div>
                <div className="flex w-full justify-center">
                  <button
                    className="bg-primary text-white font-bold rounded-full flex items-center justify-center mt-4 w-full py-2 px-4 my-4"
                    onClick={() => {
                      addProduct();
                    }}
                  >
                    Agregar <FaBagShopping className="ml-4" />
                  </button>
                </div>
              </div>
              {productAdded ? (
                <button
                  className="bg-primary text-white font-bold rounded-full flex items-center justify-center mt-4 w-full py-2 px-4 my-4"
                  onClick={() => {
                    removeProduct();
                  }}
                >
                  Quitar <TbShoppingCartCheck className="ml-4" />
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductosDetails;
