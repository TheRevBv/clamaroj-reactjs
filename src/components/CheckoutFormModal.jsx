import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdPayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { clearCarrito } from "@app/slices/carritoSlice";
import { createPedidoAsync } from "@app/slices/pedidosSlice";
import { validarFormulario } from "@utils/helpers";
import swal from "sweetalert";

// const datosPruebaEnvio = {
//   nombre: "Juan",
//   apellido: "Perez",
//   telefono: "1234567890",
//   direccion: "Calle 123",
//   cp: "12345",
// };

// const datosPruebaPago = {
//   nombre: "Juan Perez",
//   numero: "1234567890123456",
//   fecha: "12/24",
//   codigo: "123",
// };

const CheckoutFormModal = ({ total, isModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.carrito.productos);
  const { user } = useSelector((state) => state.auth);
  const [pedido, setPedido] = useState({
    idPedido: 0,
    idUsuario: 0,
    idStatus: 1,
    fecha: "",
    fechaEntrega: "",
    domicilio: "",
    telefono: "",
    razonSocial: "",
    rfc: "",
    tipoPago: "",
    tipoEnvio: "",
    tipoPedido: "",
    total: 0,
    detallesPedidos: [
      {
        idDetallePedido: 0,
        fecha: "",
        idPedido: 0,
        idProducto: 0,
        cantidad: 0,
        precioUnitario: 0,
        subtotal: 0,
      },
    ],
  });
  const [detallesPedido, setDetallesPedido] = useState([
    {
      idDetallePedido: 0,
      fecha: "",
      idPedido: 0,
      idProducto: 0,
      cantidad: 0,
      precioUnitario: 0,
      subtotal: 0,
    },
  ]);
  const [datosEnvio, setDatosEnvio] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    cp: "",
  });
  //Datos de pago solo para el formulario, no se guardan en el pedido
  const [datosPago, setDatosPago] = useState({
    nombre: "",
    numero: "",
    fecha: "",
    codigo: "",
  });
  const [errors, setErrors] = useState({
    nombreP: "",
    nombreE: "",
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
    let fechaActual = new Date();
    setDetallesPedido(
      cartItems.map((producto) => {
        return {
          idDetallePedido: 0,
          fecha: new Date(
            fechaActual.getFullYear(),
            fechaActual.getMonth(),
            fechaActual.getDay()
          ),
          idPedido: 0,
          idProducto: producto.id,
          cantidad: producto.cantidad,
          precioUnitario: producto.precio,
          subtotal: producto.precio * producto.cantidad,
        };
      })
    );
  }, [cartItems]);

  useEffect(() => {
    // setDatosPago(datosPruebaPago);
    // setDatosEnvio(datosPruebaEnvio);
    resetData();
  }, [isModalOpen]);

  useEffect(() => {
    if (pedido.idUsuario !== 0) {
      console.log("Generando Pedido:", pedido);
      dispatch(createPedidoAsync(pedido));
      dispatch(clearCarrito());
      swal("Pedido completado", "Tu pedido ha sido registrado", "success");
      navigate("/pedidos");
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
      nombreE: "",
      nombreP: "",
      numero: "",
      fecha: "",
      codigo: "",
      apellido: "",
      telefono: "",
      direccion: "",
      cp: "",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresPago = validarFormulario(datosPago, "datosPago");
    const erroresEnvio = validarFormulario(datosEnvio, "datosEnvio");

    if (erroresPago.hayErrores || erroresEnvio.hayErrores) {
      console.log("Hay errores", erroresPago, erroresEnvio);
      const { nombreP, numero, fecha, codigo } = erroresPago.errores;
      const { nombreE, apellido, telefono, direccion, cp } =
        erroresEnvio.errores;
      setErrors({
        nombreP,
        numero,
        fecha,
        codigo,
        nombreE,
        apellido,
        telefono,
        direccion,
        cp,
      });
      return;
    }

    let fechaActual = new Date();
    let fechaEntrega = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const pedidoTit = {
      idPedido: 0,
      idUsuario: user.id,
      idStatus: 1,
      //La fecha de pedido es la fecha actual en formato dd/mm/yyyy
      fecha: new Date(
        fechaActual.getFullYear(),
        fechaActual.getMonth(),
        fechaActual.getDay()
      ),
      //La fecha de entrega tiene que ser mayor a la fecha actual por un lapso de 3 dias
      fechaEntrega: new Date(
        fechaEntrega.getFullYear(),
        fechaEntrega.getMonth(),
        fechaEntrega.getDay()
      ),
      domicilio: datosEnvio.direccion,
      telefono: datosEnvio.telefono,
      razonSocial: `${datosEnvio.nombre} ${datosEnvio.apellido}`,
      //Se agrega rfc publico en general por default
      rfc: "XAXX010101000",
      tipoPago: "T", //Se agrega pago con tarjeta por default
      tipoEnvio: "D", //Se agrega envio a domicilio por default
      tipoPedido: "V", //Se agrega venta por default
      total: total * 1.16, //Se agrega iva
      detallesPedidos: detallesPedido,
    };

    setPedido(pedidoTit);
    resetData();
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
          {errors.nombreE && (
            <span className="text-red-600 text-sm">{errors.nombreE}</span>
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
              id="cp"
              className="input-modal peer"
              placeholder=" "
              value={datosEnvio.cp}
              onChange={handleInputChangeEnvio}
            />
            <label
              htmlFor="cp"
              className="label-modal peer-focus:text-red-600 peer-focus: peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto rtl:peer-focus:right-2.5"
            >
              Codigo Postal
            </label>
          </div>
          {errors.cp && (
            <span className="text-red-600 text-sm">{errors.cp}</span>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-4 w-full h-1/2">
        <div className="flex flex-col gap-4 w-full">
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
          {errors.nombreP && (
            <span className="text-red-600 text-sm">{errors.nombreP}</span>
          )}
          <div className="relative">
            <input
              type="text"
              id="numero"
              className="input-modal peer"
              placeholder=" "
              value={datosPago.numero}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
