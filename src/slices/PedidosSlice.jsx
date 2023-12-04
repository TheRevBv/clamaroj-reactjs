import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getPedidosAsync = createAsyncThunk(
  "pedidos/getPedidosAsync",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/pedidos`
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
        `${import.meta.env.VITE_APP_API_URL}/pedidos/${id}`
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al obtener el pedido");
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
  },
});

export default pedidosSlice.reducer;
