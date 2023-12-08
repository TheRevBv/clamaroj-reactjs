// import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";
// import { getPedidoByIdAsync } from "@app/slices/pedidosSlice";

const PedidoItem = ({ pedido }) => {
  return (
    <div className="card mb-3" key={pedido.idPedido}>
      <div className="card-body">
        <div className="flex flex-row justify-between items-center">
          <h5 className="card-title">Pedido: {pedido.idPedido}</h5>
          <div
            className={`${
              pedido.estatus === "Activo" ? "bg-green-500" : "bg-red-500"
            } text-white px-2 py-1 rounded-md inline-block`}
          >
            {pedido.estatus}
          </div>
        </div>
        <h6 className="card-subtitle mb-2 text-muted">
          Fecha: {new Date(pedido.fecha).toLocaleDateString()}
        </h6>
        <p className="card-text my-2">
          <strong>Total: </strong>${pedido.total}
        </p>

        <Link
          to={`/pedidos/${pedido.idPedido}`}
          className="bg-primary text-white px-2 py-1 rounded-md inline-block hover:bg-primary-dark"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default PedidoItem;
