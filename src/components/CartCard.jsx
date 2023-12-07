import { useState, useEffect, useCallback } from "react";
import { removeProducto, addProducto, getCarrito } from "@slices/carritoSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateTotal, calculateTotalItems } from "@utils/helpers";
import swal from "sweetalert";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const CartCard = ({ producto, setTotal, setItemsCarrito, setArticulos }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(producto.cantidad);
  const [loading, setLoading] = useState(false);
  const carrito = useSelector((state) => state.carrito.productos);
  const [product, setProduct] = useState({
    idProducto: "",
    nombre: "",
    descripcion: "",
    precio: "",
    cantidad: "",
  });

  useEffect(() => {
    setLoading(true);
    setArticulos(carrito.length);
    setTotal(calculateTotal(carrito));
    setItemsCarrito(calculateTotalItems(carrito));
    setLoading(false);
  }, [carrito]);

  // console.log(producto);
  // console.log(quantity);

  const handleRemoveFromCart = (producto) => {
    swal({
      title: "¿Estás seguro?",
      text: "El producto será eliminado del carrito",
      icon: "warning",
      buttons: ["Cancelar", "Eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(removeProducto(producto));
        swal("El producto ha sido eliminado", {
          icon: "success",
        });
      } else {
        swal("El producto no ha sido eliminado");
      }
    });
  };

  const handleQuantity = useCallback(
    (type, producto) => {
      if (type === "add") {
        setQuantity(quantity + 1);
        setProduct({
          idProducto: producto.idProducto,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          foto: producto.foto,
          cantidad: quantity + 1,
        });
      } else {
        if (producto.cantidad > 1) {
          setQuantity(quantity - 1);
          setProduct({
            idProducto: producto.idProducto,
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            foto: producto.foto,
            cantidad: quantity - 1,
          });
        }
      }
      handleAddToCart();
      // setTotal(calculateTotal(carrito));
      // setItemsCarrito(calculateTotalItems(carrito));
      // setArticulos(carrito.length);
    },
    [quantity, producto]
  );

  const handleAddToCart = () => {
    const productoExist = carrito.find(
      (producto) => producto.idProducto === product.idProducto
    );

    if (productoExist) {
      // swal({
      //   title: "El producto ya está en el carrito",
      //   text: "¿Deseas agregar más?",
      //   icon: "info",
      //   buttons: ["Cancelar", "Agregar"],
      //   dangerMode: true,
      // }).then((willAdd) => {
      //   if (willAdd) {
      dispatch(
        removeProducto({
          idProducto: product.idProducto,
          cantidad: quantity,
        })
      );
      dispatch(addProducto(product));
      //   swal("El producto ha sido agregado", {
      //     icon: "success",
      //   });
      // } else {
      //   swal("El producto no ha sido agregado");
      // }
      // });
    }
    // else {
    //   dispatch(
    //     addProducto({
    //       idProducto: producto.idProducto,
    //       cantidad: quantity,
    //     })
    //   );
    //   swal("El producto ha sido agregado", {
    //     icon: "success",
    //   });
    // }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center transform transition-all duration-500 hover:scale-105">
          {/* {productos.map((producto) => ( */}
          <div
            key={producto.idProducto}
            className="flex flex-row items-center justify-between w-full border-b-2 border-gray-200 p-4 bg-white rounded-md shadow-md"
          >
            <div className="flex flex-row items-center justify-start space-x-4">
              <img
                className="w-16 h-16 object-cover rounded-md"
                src={
                  producto.foto == `${producto.nombre}.png`
                    ? `/src/assets/img/productos/${producto.foto}`
                    : producto.foto
                }
                alt={producto.nombre}
              />
              <div className="flex flex-col items-start justify-start">
                <h3 className="text-sm font-medium text-gray-900">
                  {producto.nombre}
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  {producto.descripcion}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  ${producto.precio}
                </p>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center space-x-4">
              <button
                className="flex flex-row items-center justify-center bg-secondary hover:bg-secondary-700 text-white font-bold py-2 px-2 rounded-full"
                onClick={() => handleQuantity("add", producto)}
              >
                <FaPlus />
              </button>
              <p className="text-sm font-medium text-gray-900">{quantity}</p>
              <button
                className="flex flex-row items-center justify-center bg-secondary hover:bg-secondary-700 text-white font-bold py-2 px-2 rounded-full"
                onClick={() => handleQuantity("remove", producto)}
              >
                <FaMinus />
              </button>
              <div className="flex flex-row items-center justify-center space-x-4">
                <button
                  className="flex flex-row items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => handleRemoveFromCart(producto)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
