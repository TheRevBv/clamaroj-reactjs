import { createAsyncThunk } from "@reduxjs/toolkit";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Access-Control-Allow-Origin", "*");

export const loginAction = createAsyncThunk(
  "auth/login",
  async (credentials) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(credentials),
      }
    );

    if (response.status === 200) {
      const data = await response.json();
      return data; // { user, token }
    } else {
      throw new Error("Error al iniciar sesión");
    }
  }
);
