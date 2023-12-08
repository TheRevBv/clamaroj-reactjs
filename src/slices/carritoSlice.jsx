import { createSlice } from "@reduxjs/toolkit";

// {
//     "idProducto": 1,
//     "codigo": "PROD000001",
//     "nombre": "MICHE CUBANA",
//     "descripcion": "Michelada con salsa maggi, inglesa, tabasco y cerveza clara",
//     "precio": 60,
//     "foto": "MICHE CUBANA.png",
//     "merma": 5,
//     "idStatus": 1,
//     "fechaRegistro": "2023-05-02T00:00:00",
//     "fechaModificacion": "2023-05-02T00:00:00",
//     "carrito": [],
//     "receta": null
//   }

export const carritoSlice = createSlice({
  name: "carrito",
  initialState: {
    productos: [],
  },
  reducers: {
    addProducto: (state, action) => {
      state.productos.push(action.payload);
      localStorage.setItem("carrito", JSON.stringify(state.productos));
    },
    removeProducto: (state, action) => {
      state.productos = state.productos.filter(
        (producto) => producto.idProducto !== action.payload.idProducto
      );
      localStorage.setItem("carrito", JSON.stringify(state.productos));
    },
    getCarrito: (state) => {
      const carrito = localStorage.getItem("carrito");
      if (carrito) {
        //Convertir a objeto y luego cambiar a array
        const carritoArray = Object.values(JSON.parse(carrito));
        state.productos = carritoArray;
      }
    },
    addCantidadNueva: (state, action) => {
      //Mandamos el producto con la cantidad nueva
      let productoNuevo = action.payload;
      let carritoViejo = localStorage.getItem("carrito");
      let carritoViejoArray = Object.values(JSON.parse(carritoViejo));

      if (productoNuevo != null || productoNuevo != undefined) {
        const productoExist = carritoViejoArray.find(
          (producto) => producto.idProducto === productoNuevo.idProducto
        );
        //Si el producto existe, remplazamos el producto en el carrito
        if (productoExist) {
          //Borramos el producto viejo
          carritoViejoArray = carritoViejoArray.filter(
            (producto) => producto.idProducto !== productoExist.idProducto
          );
          //Agregamos el producto nuevo
          carritoViejoArray.push(productoNuevo);
          //Guardamos el carrito
          localStorage.setItem("carrito", JSON.stringify(carritoViejoArray));
        }
      }
    },
  },
});

export const { addProducto, removeProducto, getCarrito, addCantidadNueva } =
  carritoSlice.actions;

export default carritoSlice.reducer;
