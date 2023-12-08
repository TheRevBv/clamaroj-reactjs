const regExNombre = new RegExp("^[a-zA-Z ]+$");
const regExNumero = new RegExp("^[0-9]{16}$");
const regExFecha = new RegExp("^[0-9]{2}/[0-9]{2}$");
const regExCodigo = new RegExp("^[0-9]{3}$");
const regExCP = new RegExp("^[0-9]{5}$");
const regExTelefono = new RegExp("^[0-9]{10}$");
const regExDireccion = new RegExp("^[a-zA-Z0-9 ]+$");

export const calculateTotal = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.precio * item.cantidad;
  }, 0);
};

export const calculateTotalItems = (items) => {
  return items.reduce((acc, item) => {
    return acc + item.cantidad;
  }, 0);
};
/**
 *
 * @param {JSON} valores
 * @param {string} tipo
 * @returns {{errores: JSON, hayErrores: boolean}}
 */
export const validarFormulario = (valores, tipo) => {
  let errores = {
    required: "",
    nombre: "",
    numero: "",
    fecha: "",
    codigo: "",
    apellido: "",
    telefono: "",
    direccion: "",
    cp: "",
  };
  let hayErrores = false;

  switch (tipo) {
    case "datosPago":
      if (!valores.nombre) {
        errores.nombre = "El nombre es obligatorio";
        hayErrores = true;
      } else if (!regExNombre.test(valores.nombre)) {
        errores.nombre = "El nombre es incorrecto";
        hayErrores = true;
      }
      // if (!valores.apellido) {
      //   errores.apellido = "El apellido es obligatorio";
      //   hayErrores = true;
      // } else if (!regExNombre.test(valores.apellido)) {
      //   errores.apellido = "El apellido es incorrecto";
      //   hayErrores = true;
      // }
      if (!valores.numero) {
        errores.numero = "El número de tarjeta es obligatorio";
        hayErrores = true;
      } else if (!regExNumero.test(valores.numero)) {
        errores.numero = "El número de tarjeta es incorrecto";
        hayErrores = true;
      }
      if (!valores.fecha) {
        errores.fecha = "La fecha es obligatoria";
        hayErrores = true;
      } else if (!regExFecha.test(valores.fecha)) {
        errores.fecha = "La fecha es incorrecta";
        hayErrores = true;
      }
      if (!valores.codigo) {
        errores.codigo = "El código es obligatorio";
        hayErrores = true;
      } else if (!regExCodigo.test(valores.codigo)) {
        errores.codigo = "El código es incorrecto";
        hayErrores = true;
      }
      break;
    case "datosEnvio":
      if (!valores.nombre) {
        errores.nombre = "El nombre es obligatorio";
        hayErrores = true;
      } else if (!regExNombre.test(valores.nombre)) {
        errores.nombre = "El nombre es incorrecto";
        hayErrores = true;
      }
      if (!valores.apellido) {
        errores.apellido = "El apellido es obligatorio";
        hayErrores = true;
      } else if (!regExNombre.test(valores.apellido)) {
        errores.apellido = "El apellido es incorrecto";
        hayErrores = true;
      }
      if (!valores.telefono) {
        errores.telefono = "El teléfono es obligatorio";
        hayErrores = true;
      } else if (!regExTelefono.test(valores.telefono)) {
        errores.telefono = "El teléfono es incorrecto";
        hayErrores = true;
      }
      if (!valores.direccion) {
        errores.direccion = "La dirección es obligatoria";
        hayErrores = true;
      } else if (!regExDireccion.test(valores.direccion)) {
        errores.direccion = "La dirección es incorrecta";
        hayErrores = true;
      }
      if (!valores.cp) {
        errores.cp = "El código postal es obligatorio";
        hayErrores = true;
      } else if (!regExCP.test(valores.cp)) {
        errores.cp = "El código postal es incorrecto";
        hayErrores = true;
      }
      break;
    default:
      break;
  }

  return { errores, hayErrores };
};
