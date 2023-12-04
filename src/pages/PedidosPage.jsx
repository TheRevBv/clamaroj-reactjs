import { getPedidosAsync } from "@slices/PedidosSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PedidosPage = () => {
  const dispatch = useDispatch();
  const pedidos = useSelector((state) => state.pedidos.pedidos);

  useEffect(() => {
    dispatch(getPedidosAsync());
  }, [dispatch]);

  return (
    <div>
      <h1>Pedidos</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.idPedido}>{pedido.idPedido}</li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosPage;
