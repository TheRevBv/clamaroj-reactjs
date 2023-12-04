import { createAsyncThunk } from "@reduxjs/toolkit";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Accept", "application/json");
headers.append("Access-Control-Allow-Origin", "*");

export const getPedidos = createAsyncThunk(
    "Pedidos",
    async() => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/pedidos`,
          {
            method: "GET",
            headers,
          }
        );
    
        if (response.status === 200)
        {
          const data = await response.json();
          return data;
        }
        else
        {
          throw new Error("Error al listar los pedidos");
        }
      } catch (error) {
        throw new Error("Error al realizar la solicitud: " + error.message);
      }
    }
);