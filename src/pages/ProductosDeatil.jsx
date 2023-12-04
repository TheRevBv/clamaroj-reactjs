import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { FaBagShopping } from "react-icons/fa6";
import { TbShoppingCartCheck } from "react-icons/tb";
//import Swal from "sweetalert2";

const ProductosDeatil = () => {
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
        console.log("data", data);
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
    console.log("addProduct");
    removeProduct();
    //Verificar si la caantidad es diferente a la cantidad en el carrito
    if (cantidadEnCarrito !== quantity) {
      //Si es diferente, actualizar la cantidad en el carrito
      setCantidadEnCarrito(quantity);
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ ...product, cantidad: quantity });
    console.log("cart2", cart);
    setProductAdded(true);
    // Actualizar el localStorage y el estado de cantidadEnCarrito
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const removeProduct = () => {
    setProductAdded(false);
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Encontrar la posición del producto en el carrito por idProducto
    const index = cart.findIndex(
      (item) => item.idProducto === product.idProducto
    );
    console.log("index remove", index);

    if (index > -1) {
      console.log("si entra");
      // Si el producto está en el carrito, eliminarlo en esa posición
      cart.splice(index, 1);

      // Actualizar el localStorage y el estado de cantidadEnCarrito
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log("removeProduct", cart);
      //setCantidadEnCarrito((prevCantidad) => Math.max(0, prevCantidad - 1));
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
    console.log("index isadded", index);
    if (index > -1) {
      let cantidadArticulos = cart[index].cantidad;
      setCantidadEnCarrito(cantidadArticulos);
      console.log("cantidadArticulos", cantidadArticulos);
      setProductAdded(true);
    } else {
      setCantidadEnCarrito(0);
      setProductAdded(false);
    }
  };

  return (
    <>
      <Banner />

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
            <h1 className="text-lg font-semibold mb-4 text-center">
              {product.nombre}
            </h1>
            <h2 className="card-text text-center">{product.descripcion}</h2>
            <h2 className="text-lg font-semibold mb-4 text-center">
              Precio:<strong> ${product.precio}</strong>
            </h2>
            <h2 className="text-lg font-semibold mb-4">
              Código: <strong>{product.codigo}</strong>
            </h2>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <p className="text-lg font-semibold">{quantity}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => {
                  addProduct();
                }}
              >
                Agregar <FaBagShopping className="ml-4" />
              </button>
            </div>
            {productAdded ? (
              <p> Haz Agregado {cantidadEnCarrito} articulos a tu carrito</p>
            ) : (
              <p> No haz agregado este articulo a tu carrito!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductosDeatil;
