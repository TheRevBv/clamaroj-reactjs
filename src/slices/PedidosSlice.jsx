import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPedidosAsync = createAsyncThunk(
    "pedidos/fetchPedidosAsync",
    async () => {
        try {
            console.log(import.meta.env.VITE_APP_API_URL);
            const response = await axios.get(
                `${import.meta.env.VITE_APP_API_URL}/pedidos`
            );
            return response.data;
        } catch (error) 
        {
            console.error("Error en la respuesta:", error);
            throw new Error("Error al obtener los pedidos");
        }
    }
);

export const getPedidosAsync = createAsyncThunk(
  "pedidos/getPedidosAsync",
  async (id) => {
      try {
          console.log(import.meta.env.VITE_APP_API_URL);
          const response = await axios.get(
              `${import.meta.env.VITE_APP_API_URL}/pedidos/usuario/${id}`
          );
          return response.data;
      } catch (error) 
      {
          console.error("Error en la respuesta:", error);
          throw new Error("Error al obtener los pedidos por usuario");
      }
  }
);

export const getPedidoAsync = createAsyncThunk(
    "pedidos/getPedidoAsync",
    async (id) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_URL}/pedidos/${id}`
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener el pedido");
      }
    }
  );

export const createPedidoAsync = createAsyncThunk(
    "pedidos/createPedidoAsync",
    async (newPedido) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}`/pedidos, newPedido);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error al crear el pedido");
      }
    }
);

export const updatePedidoAsync = createAsyncThunk(
    "pedidos/updatePedidoAsync",
    async (pedidoId, pedido) => {
      try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/pedidos/${pedidoId}`, pedido);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar el pedido");
      }
    }
);

export const deletePedidoAsync = createAsyncThunk(
    "pedidos/deletePedidoAsync",
    async (pedidoId) => {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/pedidos/${pedidoId}`);
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Error al eliminar el pedido");
      }
    }
);

export const pedidosSlice = createSlice({
    name: "pedidos",
    initialState: {
        pedidos: [],
        pedido: null,
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: {
        [fetchPedidosAsync.pending]: (state) => {
            state.status = "loading";
        },
        [fetchPedidosAsync.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.pedidos = action.payload;
        },
        [fetchPedidosAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [getPedidosAsync.pending]: (state) => {
          state.status = "loading";
      },
      [getPedidosAsync.fulfilled]: (state, action) => {
          state.status = "succeeded";
          state.pedidos = action.payload;
      },
      [getPedidosAsync.rejected]: (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
      },
        [getPedidoAsync.pending]: (state) => {
            state.status = "loading";
        },
        [getPedidoAsync.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.pedido = action.payload;
        },
        [getPedidoAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [createPedidoAsync.pending]: (state) => {
            state.status = "loading";
        },
        [createPedidoAsync.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.pedidos.push(action.payload);
        },
        [createPedidoAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [updatePedidoAsync.pending]: (state) => {
            state.status = "loading";
        },
        [updatePedidoAsync.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.pedidos.filter(pedido => pedido.id !== action.payload.id);
            state.pedidos.push(action.payload);
        },
        [updatePedidoAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [deletePedidoAsync.pending]: (state) => {
            state.status = "loading";
        },
        [deletePedidoAsync.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.pedidos = state.pedidos.filter(pedido => pedido.id !== action.payload.id);
        },
        [deletePedidoAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    },
});

export default pedidosSlice.reducer;