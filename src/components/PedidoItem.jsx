import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const PedidoItem = ({ pedido }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  const toggleDetalles = () => {
    setMostrarDetalles(!mostrarDetalles);
  };

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
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text font-bold">Productos</p>
            <button
              onClick={toggleDetalles}
              className="focus:outline-none text-blue-500 hover:text-blue-700"
            >
              {mostrarDetalles ? <FaAngleUp /> : <FaAngleDown />}
            </button>
          </div>
          {mostrarDetalles && (
            <ul className="list-disc pl-4">
              {pedido.productos.map((producto, index) => (
                <li className="mb-2" key={index}>
                  {producto.nombre} Precio Unitario: {producto.precioUnitario}{" "}
                  Cant. {producto.cantidad} Subtotal: ${producto.subtotal}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PedidoItem;
