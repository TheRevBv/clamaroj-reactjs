import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
// import { clearCart, removeProducto } from "@app/slices/carritoSlice";
// import { createPedido } from "@app/slices/pedidosSlice";
import swal from "sweetalert";

const regExNombre = new RegExp("^[a-zA-Z ]+$");
const regExNumero = new RegExp("^[0-9]{16}$");
const regExFecha = new RegExp("^[0-9]{2}/[0-9]{2}$");
const regExCodigo = new RegExp("^[0-9]{3}$");
const regExCP = new RegExp("^[0-9]{5}$");
const regExTelefono = new RegExp("^[0-9]{10}$");
const regExDireccion = new RegExp("^[a-zA-Z0-9 ]+$");

const CheckoutFormModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.carrito.productos);
  const [total, setTotal] = useState(0);
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    cp: "",
  });
  const [datosPago, setDatosPago] = useState({
    nombre: "",
    numero: "",
    fecha: "",
    codigo: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    numero: "",
    fecha: "",
    codigo: "",
    required: "",
    apellido: "",
    telefono: "",
    direccion: "",
    cp: "",
  });

  const handleInputChange = (e) => {
    setDatosPago({
      ...datosPago,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errores = {
      required: "",
      nombre: "",
      numero: "",
      fecha: "",
      codigo: "",
    };
    let hayErrores = false;

    if (!regExNombre.test(datosPago.nombre)) {
      errores.nombre = "El nombre debe contener solo letras";
      errores.required = "Todos los campos son obligatorios";
      hayErrores = true;
    }

    if (!regExNumero.test(datosPago.numero)) {
      errores.numero = "El numero debe contener 16 digitos";
      errores.required = "Todos los campos son obligatorios";
      hayErrores = true;
    }

    if (!regExFecha.test(datosPago.fecha)) {
      errores.fecha = "La fecha debe tener el formato MM/AA";
      errores.required = "Todos los campos son obligatorios";
      hayErrores = true;
    }

    if (!regExCodigo.test(datosPago.codigo)) {
      errores.codigo = "El codigo debe contener 3 digitos";
      errores.required = "Todos los campos son obligatorios";
      hayErrores = true;
    }

    if (hayErrores) {
      setErrors(errores);
      return;
    }

    // dispatch(createPedido(datosPago));
    dispatch(clearCart());
    navigate("/pedidos");
    swal("Pedido creado", "Su pedido ha sido creado con exito", "success");
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">Datos de envio</h2>
      <div className="flex flex-row gap-4 w-full h-1/2">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              id="nombre"
              className="input-modal peer"
              placeholder=" "
            />
            <label
              htmlFor="nombre"
              className="label-modal peer-focus:text-red-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:peer-focus:right-2.5"
            >
              Nombre
            </label>
          </div>
          {errors.nombre && (
            <span className="text-red-600 text-sm">{errors.nombre}</span>
          )}
          <div className="relative">
            <input
              type="text"
              id="apellido"
              className="input-modal peer"
              placeholder=" "
            />
            <label
              htmlFor="apellido"
              className="label-modal peer-focus:text-red-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:peer-focus:right-2.5"
            >
              Apellido
            </label>
          </div>
          {errors.apellido && (
            <span className="text-red-600 text-sm">{errors.apellido}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              id="telefono"
              className="input-modal peer"
              placeholder=" "
            />
            <label
              htmlFor="telefono"
              className="label-modal peer-focus:text-red-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:peer-focus:right-2.5"
            >
              Telefono
            </label>
          </div>
          {errors.telefono && (
            <span className="text-red-600 text-sm">{errors.telefono}</span>
          )}
          <div className="relative">
            <input
              type="text"
              id="direccion"
              className="input-modal peer"
              placeholder=" "
            />
            <label
              htmlFor="direccion"
              className="label-modal peer-focus:text-red-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:peer-focus:right-2.5"
            >
              Direccion
            </label>
          </div>
          {errors.direccion && (
            <span className="text-red-600 text-sm">{errors.direccion}</span>
          )}
        </div>
      </div>
      <h2 className="text-2xl font-semibold">Datos de pago</h2>
      <div className="flex flex-row gap-4 w-full h-1/2">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              id="nombre"
              className="input-modal peer"
              placeholder=" "
            />
            <label
              htmlFor="nombre"
              className="label-modal peer-focus:text-red-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:peer-focus:right-2.5"
            >
              Nombre en la tarjeta
            </label>
          </div>
          {errors.nombre && (
            <span className="text-red-600 text-sm">{errors.nombre}</span>
          )}
          <div className="relative">
            <input
              type="text"
              id="numero"
              className="input-modal peer"
              placeholder=" "
            />
            <label
              htmlFor="numero"
              className="label-modal peer-focus:text-red-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:peer-focus:right-2.5"
            >
              Numero de tarjeta
            </label>
          </div>
          {errors.numero && (
            <span className="text-red-600 text-sm">{errors.numero}</span>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              id="fecha"
              className="input-modal peer"
              placeholder=" "
            />
            <label
              htmlFor="fecha"
              className="label-modal peer-focus:text-red-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:peer-focus:right-2.5"
            >
              Fecha de expiracion
            </label>
          </div>
          {errors.fecha && (
            <span className="text-red-600 text-sm">{errors.fecha}</span>
          )}
          <div className="relative">
            <input
              type="text"
              id="codigo"
              className="input-modal peer"
              placeholder=" "
            />
            <label
              htmlFor="codigo"
              className="label-modal peer-focus:text-red-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:peer-focus:right-2.5"
            >
              CCV
            </label>
          </div>
          {errors.codigo && (
            <span className="text-red-600 text-sm">{errors.codigo}</span>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary text-white w-full py-2 mt-4 rounded-md"
      >
        <MdPayments className="inline-block mr-2" />
        Pagar
      </button>
    </form>
  );
};

export default CheckoutFormModal;
