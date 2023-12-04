import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
            throw new Error("Error al inicio sesión");
        }
    }
);

export const createPedidoAsync = createAsyncThunk(
    "pedidos/createPedidoAsync",
    async (newPedido) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/pedidos`, newPedido);
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
        list: [],
        status: "idle",
        error: null,
    },
    extraReducers: {
        [fetchPedidosAsync.pending]: (state) => {
            state.status = "loading";
        },
        [fetchPedidosAsync.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.list = action.payload;
        },
        [fetchPedidosAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
        [createPedidoAsync.pending]: (state) => {
            state.status = "loading";
        },
        [createPedidoAsync.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.list.push(action.payload); // Agregar el nuevo pedido a la lista existente
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
            state.list.push(action.payload); // Agregar el nuevo pedido a la lista existente
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
            state.list = state.list.filter(pedido => pedido.id !== action.payload.id); // Eliminar el pedido de la lista
        },
        [deletePedidoAsync.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        },
    }
});

export const pedidosActions = { ...pedidosSlice.actions, fetchPedidosAsync, createPedidoAsync, updatePedidoAsync, deletePedidoAsync };
export default pedidosSlice.reducer;