import { Fragment, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPedidosAsync } from "@app/slices/pedidosSlice";
import PedidoItem from "@components/PedidoItem";
import Footer from "@components/Footer/Footer";
import "@styles/pedidos.css";
import axios from "axios";

const PedidosPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pedidos, loading, error } = useSelector((state) => state.pedidos);
  const { user } = useSelector((state) => state.auth);
  const [pedidosArrayNuevo, setPedidosArrayNuevo] = useState([]);
  const [pedidosApi, setPedidosApi] = useState([]);

  //Hacer petición al servidor para obtener los pedidos del usuario
  const getPedidosApi = async () => {
    try {
      console.log("Entro api", user.id);
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/pedidos/usuario/${user.id}`
      );
      setPedidosApi(response.data);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al obtener los pedidos");
    }
  };

  /*useEffect(() => {
    //No es necesario validar si el usuario está logueado, ya que ProtectedRoutes se encarga de eso
    dispatch(getPedidosAsync(user.id));
    getPedidos();
  }, [dispatch, user.id]);*/

  useEffect(() => {
    //Obtenemos los pedidos del usuario
    getPedidosApi();
  }, []);

  useEffect(() => {
    //Obtenemos los pedidos del usuario
    getPedidos();
  }, [pedidosApi]);

  //Recorremos pedidos y adentro de cada pedido recorremos los productos
  //Si el id del pedido es igual al id del pedido del producto, entonces lo agregamos al pedido
  //Si no, creamos un nuevo pedido y agregamos el producto
  //Al final, retornamos un listado de pedidos con sus respectivos productos
  const getPedidos = () => {
    console.log("pedidos", pedidosApi);

    let arrayPedidos = [];
    let productosArray = [];

    // Crear un objeto para mapear idPedido a productos
    let productosPorPedido = {};

    pedidosApi.forEach((pedido) => {
      console.log("pedido", pedido.fecha);
      console.log("pedido", pedido.total);
      console.log("pedido", pedido.estatus);
      let objProducto = {
        idProducto: pedido.idProducto,
        nombre: pedido.Nombre,
        precioUnitario: pedido.PrecioUnitario,
        cantidad: pedido.Cantidad,
        subtotal: pedido.Subtotal,
        fecha: pedido.fecha,
        total: pedido.total,
        estatus: pedido.estatus,
      };
      productosArray.push(objProducto);

      // Verificar si ya existe el idPedido en el objeto
      if (productosPorPedido.hasOwnProperty(pedido.idPedido)) {
        // Si existe, agregar el producto al array correspondiente
        productosPorPedido[pedido.idPedido].push(objProducto);
      } else {
        // Si no existe, crear un nuevo array con el producto
        productosPorPedido[pedido.idPedido] = [objProducto];
      }
    });

    // Recorrer el objeto productosPorPedido y construir el array de pedidos
    for (const idPedido in productosPorPedido) {
      console.log("idPedido", idPedido);
      console.log("productosPorPedido", productosPorPedido[idPedido]);
      let objPedido = {
        idPedido: idPedido,
        fecha: productosPorPedido[idPedido][0].fecha || "",
        total: productosPorPedido[idPedido][0].total || "0",
        estatus: productosPorPedido[idPedido][0].estatus || "",
        productos: productosPorPedido[idPedido],
      };

      arrayPedidos.push(objPedido);
    }
    setPedidosArrayNuevo(arrayPedidos);
  };

  // Continua retornando un listado de pedidos por usuario

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="h-1/2 container mx-auto px-4 sm:mt-5 mt-4 sm:h-3/4">
          <div className="container mx-auto px-4 h-full">
            <div className="flex flex-row justify-between w-full my-4">
              <div className="flex flex-col w-full">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                  Pedidos
                </h2>
              </div>
            </div>
            <div className="flex flex-row justify-between container mx-auto px-4 h-full">
              <div className="h-full overflow-y-auto w-full">
                {loading && (
                  <h2 className="text-center text-primary text-2xl">
                    Cargando...
                  </h2>
                )}
                {error && (
                  <h2 className="text-center text-danger text-2xl">{error}</h2>
                )}
                {pedidosArrayNuevo.map((pedido) => (
                  <PedidoItem key={pedido.idPedido} pedido={pedido} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default PedidosPage;
