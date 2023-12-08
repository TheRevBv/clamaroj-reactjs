import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { clearCarrito } from "@app/slices/carritoSlice";
import { createPedidoAsync } from "@app/slices/pedidosSlice";
import { validarFormulario } from "@utils/helpers";
import swal from "sweetalert";

const CheckoutFormModal = ({ total, isModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.carrito.productos);
  const [pedido, setPedido] = useState({});
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

  useEffect(() => {
    resetData();
  }, [isModalOpen]);

  useEffect(() => {
    if (pedido.datosPago && pedido.datosEnvio) {
      dispatch(createPedidoAsync(pedido));
      dispatch(clearCarrito());
      navigate("/orders");
      swal("Pedido creado", "Su pedido ha sido creado con exito", "success");
    }
  }, [pedido]);

  const handleInputChange = (e) => {
    setDatosPago({
      ...datosPago,
      [e.target.id]: e.target.value,
    });
  };

  const handleInputChangeEnvio = (e) => {
    setDatosEnvio({
      ...datosEnvio,
      [e.target.id]: e.target.value,
    });
  };

  const resetData = useCallback(() => {
    setDatosPago({
      nombre: "",
      numero: "",
      fecha: "",
      codigo: "",
    });
    setDatosEnvio({
      nombre: "",
      apellido: "",
      telefono: "",
      direccion: "",
      cp: "",
    });

    setErrors({
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresPago = validarFormulario(datosPago, "pago");
    const erroresEnvio = validarFormulario(datosEnvio, "envio");

    if (erroresPago || erroresEnvio) {
      setErrors({
        ...erroresPago,
        ...erroresEnvio,
      });
      return;
    }

    const datos = {
      datosEnvio,
      datosPago,
      cartItems,
      total,
    };

    setPedido(datos);
    console.log(datos);
    resetData();

    // dispatch(createPedido({ datosEnvio, datosPago, cartItems, total }));
    // dispatch(clearCarrito());
    // navigate("/pedidos");
    // swal("Pedido creado", "Su pedido ha sido creado con exito", "success");
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold">Datos de envio</h2>
      <div className="flex flex-row gap-4 w-full h-1/2">
        <div className="flex flex-col gap-4 w-full">
          <div className="relative">
            <input
              type="text"
              id="nombre"
              className="input-modal peer"
              placeholder=" "
              value={datosEnvio.nombre}
              onChange={handleInputChangeEnvio}
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
              value={datosEnvio.apellido}
              onChange={handleInputChangeEnvio}
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
        <div className="flex flex-col gap-4 w-full">
          <div className="relative">
            <input
              type="text"
              id="telefono"
              className="input-modal peer"
              placeholder=" "
              value={datosEnvio.telefono}
              onChange={handleInputChangeEnvio}
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
              value={datosEnvio.direccion}
              onChange={handleInputChangeEnvio}
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
        <div className="flex flex-col gap-4 w-full">
          <div className="relative">
            <input
              type="text"
              id="nombre"
              className="input-modal peer"
              placeholder=" "
              value={datosPago.nombre}
              onChange={handleInputChange}
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
              value={datosPago.numero}
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
        <div className="flex flex-col gap-4 w-full">
          <div className="relative">
            <input
              type="text"
              id="fecha"
              className="input-modal peer"
              placeholder=" "
              value={datosPago.fecha}
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
              value={datosPago.codigo}
              onChange={handleInputChange}
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
