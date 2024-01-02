import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import { headers } from "@utils/constants";

export const getPedidosAsync = createAsyncThunk(
  "pedidos/getPedidosAsync",
  async (idUsuario) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/pedidos/usuario/${idUsuario}`,
        { headers }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al obtener los pedidos");
    }
  }
);

export const getPedidoAsync = createAsyncThunk(
  "pedidos/getPedidoAsync",
  async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/pedidos/${id}`,
        { headers }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al obtener el pedido");
    }
  }
);

export const createPedidoAsync = createAsyncThunk(
  "pedidos/createPedidoAsync",
  async (pedido) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/pedidos`,
        pedido
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al crear el pedido");
    }
  }
);

export const updatePedidoAsync = createAsyncThunk(
  "pedidos/updatePedidoAsync",
  async (pedido) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_APP_API_URL}/pedidos/${pedido.id}`,
        pedido
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al actualizar el pedido");
    }
  }
);

export const deletePedidoAsync = createAsyncThunk(
  "pedidos/deletePedidoAsync",
  async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/pedidos/${id}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al eliminar el pedido");
    }
  }
);

export const pedidosSlice = createSlice({
  name: "pedidos",
  initialState: {
    pedidos: [],
    pedido: {},
    loading: false,
    error: null,
  },
  reducers: {
    resetPedido: (state) => {
      state.pedido = {};
    },
  },
  extraReducers: {
    [getPedidosAsync.pending]: (state) => {
      state.loading = true;
    },
    [getPedidosAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.pedidos = action.payload;
    },
    [getPedidosAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [getPedidoAsync.pending]: (state) => {
      state.loading = true;
    },
    [getPedidoAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.pedido = action.payload;
    },
    [getPedidoAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [createPedidoAsync.pending]: (state) => {
      state.loading = true;
    },
    [createPedidoAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.pedido = action.payload;
    },
    [createPedidoAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updatePedidoAsync.pending]: (state) => {
      state.loading = true;
    },
    [updatePedidoAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.pedido = action.payload;
    },
    [updatePedidoAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deletePedidoAsync.pending]: (state) => {
      state.loading = true;
    },
    [deletePedidoAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.pedido = action.payload;
    },
    [deletePedidoAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { resetPedido } = pedidosSlice.actions;

export default pedidosSlice.reducer;
