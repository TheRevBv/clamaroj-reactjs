import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { headers } from "@utils/constants";
import axios from "axios";

export const getProductos = createAsyncThunk(
  "productos/getProductos",
  async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/Productos`,
        { headers }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al obtener los productos");
    }
  }
);

export const getProductosById = createAsyncThunk(
  "productos/getProductosById",
  async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/Productos/${id}`,
        { headers }
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al obtener el producto");
    }
  }
);

export const productosSlice = createSlice({
  name: "productos",
  initialState: {
    productos: [],
    producto: {},
    status: null,
  },
  extraReducers: {
    [getProductos.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProductos.fulfilled]: (state, { payload }) => {
      state.productos = payload;
      state.status = "success";
    },
    [getProductos.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getProductosById.pending]: (state, action) => {
      state.status = "loading";
    },
    [getProductosById.fulfilled]: (state, { payload }) => {
      state.producto = payload;
      state.status = "success";
    },
    [getProductosById.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default productosSlice.reducer;
