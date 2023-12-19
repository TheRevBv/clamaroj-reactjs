import * as Yup from "yup";
//Expresion regular para validar contraseña si tiene al menos 8 caracteres, una mayuscula, una minuscula y un numero
let passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
// let passRegex = new RegExp(
//   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
// );

export const LoginSchema = Yup.object({
  correo: Yup.string()
    .email("Correo invalido")
    .required("Este campo es requerido"),
  password: Yup.string()
    .matches(
      passRegex,
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
    )
    .required("Este campo es requerido"),
});
