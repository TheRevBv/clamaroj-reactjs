import { createContext, useContext, useReducer } from "react";

// Define el contexto para el manejo de pedidos
export const PedidoContext = createContext();

// Define las acciones para el manejo CRUD de pedidos
const ActionTypes = {
  AGREGAR_PEDIDO: "AGREGAR_PEDIDO",
  ELIMINAR_PEDIDO: "ELIMINAR_PEDIDO",
  ACTUALIZAR_PEDIDO: "ACTUALIZAR_PEDIDO",
};

// Reducer para manejar las acciones de pedidos
const pedidoReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.AGREGAR_PEDIDO:
      // Lógica para agregar un nuevo pedido al estado
      return {
        ...state,
        // Agregar el nuevo pedido al array de pedidos
        pedidos: [...state.pedidos, action.payload],
      };
    case ActionTypes.ELIMINAR_PEDIDO:
      // Lógica para eliminar un pedido según su ID
      return {
        ...state,
        // Filtrar los pedidos y mantener aquellos que no coincidan con el ID proporcionado
        pedidos: state.pedidos.filter((pedido) => pedido.id !== action.payload),
      };
    case ActionTypes.ACTUALIZAR_PEDIDO:
      // Lógica para actualizar un pedido específico
      return {
        ...state,
        // Actualizar el pedido que coincida con el ID proporcionado
        pedidos: state.pedidos.map((pedido) =>
          pedido.id === action.payload.id ? action.payload : pedido
        ),
      };
    default:
      return state;
  }
};

// Componente Provider para manejar el estado de los pedidos
export const PedidoProvider = ({ children }) => {
  // Estado inicial de los pedidos (puede ser un array vacío)
  const initialState = {
    pedidos: [],
  };

  // Utiliza useReducer para manejar el estado y las acciones relacionadas con los pedidos
  const [state, dispatch] = useReducer(pedidoReducer, initialState);

  // Acciones para realizar operaciones CRUD de pedidos
  const agregarPedido = (pedido) => {
    dispatch({ type: ActionTypes.AGREGAR_PEDIDO, payload: pedido });
  };

  const eliminarPedido = (pedidoId) => {
    dispatch({ type: ActionTypes.ELIMINAR_PEDIDO, payload: pedidoId });
  };

  const actualizarPedido = (pedido) => {
    dispatch({ type: ActionTypes.ACTUALIZAR_PEDIDO, payload: pedido });
  };

  return (
    <PedidoContext.Provider
      value={{
        pedidos: state.pedidos,
        agregarPedido,
        eliminarPedido,
        actualizarPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

// Función personalizada para usar el contexto de pedidos
export const usePedido = () => {
  return useContext(PedidoContext);
};
