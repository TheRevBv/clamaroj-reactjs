import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import axios from "axios";
// import { PURGE } from "redux-persist";

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/login`,
        credentials
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al iniciar sesión");
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/registerAsync",
  async (credentials) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/registrar`,
        credentials
      );
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error("Error al registrarse");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      sessionStorage.clear();
      localStorage.clear();
    },
  },
  extraReducers: {
    [loginAsync.pending]: (state) => {
      state.status = "loading";
    },
    [loginAsync.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.usuario;
      state.token = action.payload.token;
      sessionStorage.setItem("token", state.token);
    },
    [loginAsync.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [registerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [registerAsync.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.usuario;
    },
    [registerAsync.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
