import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingBag } from "react-icons/fa";
import { addProducto, addCantidadNueva } from "@app/slices/carritoSlice";
import { getProductosById } from "@app/slices/productosSlice";
import Footer from "@components/Footer/Footer";
import Banner from "@components/Banner";
import swal from "sweetalert";

const ProductosDetails = () => {
  const { idProducto } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const carrito = useSelector((state) => state.carrito.productos);
  const producto = useSelector((state) => state.productos.producto);

  useEffect(() => {
    setLoading(true);
    dispatch(getProductosById(idProducto));
    setLoading(false);
  }, [dispatch, idProducto]);

  const handleAddToCart = useCallback(() => {
    if (!producto && !idProducto) return;

    const productoExist = carrito.find(
      (producto) => producto.idProducto === Number(idProducto)
    );

    if (productoExist) {
      swal({
        title: "El producto ya está en el carrito",
        text: "¿Deseas remplazar la cantidad por la seleccionada?",
        icon: "warning",
        buttons: ["Cancelar", "Agregar"],
        dangerMode: true,
      }).then((willAdd) => {
        if (willAdd) {
          let productoNuevo = {
            idProducto: producto.idProducto,
            nombre: producto.nombre,
            precio: producto.precio,
            foto: producto.foto,
            descripcion: producto.descripcion,
            cantidad: quantity,
          };

          dispatch(addCantidadNueva(productoNuevo));

          swal("El producto ha sido agregado", {
            icon: "success",
          });
        } else {
          swal("El producto no ha sido agregado");
        }
      });
    } else {
      dispatch(
        addProducto({
          idProducto: producto.idProducto,
          nombre: producto.nombre,
          precio: producto.precio,
          foto: producto.foto,
          descripcion: producto.descripcion,
          cantidad: quantity,
        })
      );
      swal("El producto ha sido agregado", {
        icon: "success",
      });
    }
  }, [dispatch, idProducto, quantity, carrito, producto]);

  const handleQuantity = (type) => {
    if (type === "add") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  const handleRoute = () => {
    navigate("/");
  };

  return (
    <>
      {/* <Banner title={producto.nombre} /> */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full">
          <section className="my-12 max-w-screen-xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="md:w-1/2">
                <img
                  className="w-full mx-auto transform transition duration-300 hover:scale-105"
                  src={
                    producto.foto == `${producto.nombre}.png`
                      ? `/assets/img/productos/${producto.foto}`
                      : producto.foto
                  }
                  alt={producto.nombre}
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-2xl font-semibold mb-2">
                  {producto.nombre}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {producto.descripcion}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-full"
                      onClick={() => handleQuantity("remove")}
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-full"
                      onClick={() => handleQuantity("add")}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-2xl font-semibold">
                    ${producto.precio * quantity}
                  </p>
                </div>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 mb-4"
                  onClick={handleAddToCart}
                >
                  <FaShoppingBag />
                  <span>Agregar al carrito</span>
                </button>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2"
                  onClick={handleRoute}
                >
                  <span>Regresar</span>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductosDetails;
