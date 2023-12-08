import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";

/* [
  "idPedido": 176,
  "idUsuario": 4,
  "idStatus": 1,
  "fecha": "2023-07-18T00:00:00",
  "fechaEntrega": "2023-07-18T00:00:00",
  "domicilio": "Calle Oaxaca - Colonia San José del Consuelo",
  "telefono": "4778901234",
  "razonSocial": "Proveedor163",
  "rfc": "RFC989898H163",
  "tipoPago": "TC",
  "tipoEnvio": "T",
  "tipoPedido": "V",
  "total": 91,
  "estatus": "Activo"
},
{
  "idPedido": 193,
  "idUsuario": 4,
  "idStatus": 1,
  "fecha": "2023-07-04T00:00:00",
  "fechaEntrega": "2023-07-04T00:00:00",
  "domicilio": "Calle Colima - Colonia Azteca",
  "telefono": "4776789012",
  "razonSocial": "Proveedor180",
  "rfc": "RFC252525H180",
  "tipoPago": "TD",
  "tipoEnvio": "D",
  "tipoPedido": "V",
  "total": 62.25,
  "estatus": "Activo"
},
{
  "idPedido": 210,
  "idUsuario": 4,
  "idStatus": 1,
  "fecha": "2023-07-21T00:00:00",
  "fechaEntrega": "2023-07-21T00:00:00",
  "domicilio": "Calle Tamaulipas - Colonia San Rafael",
  "telefono": "4770123456",
  "razonSocial": "Proveedor197",
  "rfc": "RFC424242H197",
  "tipoPago": "TB",
  "tipoEnvio": "T",
  "tipoPedido": "V",
  "total": 72.5,
  "estatus": "Activo"
}
] */

export const getPedidosAsync = createAsyncThunk(
  "pedidos/getPedidosAsync",
  async (idUsuario) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/pedidos/usuario/${idUsuario}`
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
