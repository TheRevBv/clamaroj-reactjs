import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Brand from "@components/Brand";
import Button from "@components/Button";
import TextField from "@components/TextField";
import { useSelector, useDispatch } from "react-redux";
import { registerAsync } from "@app/slices/authSlice";
import swal from "sweetalert";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    fechaNacimiento: "",
    foto: "",
  });
  //handle change
  const handleChange = (e) => {
    //Antes de guardar los datos cuando el usuario sube una imagen
    //debemos guardarla en el estado
    if (e.target.name === "foto") {
      setUserInput({
        ...userInput,
        [e.target.name]: e.target.files[0],
      });
    }
    // else if (e.target.name === "fechaNacimiento") {
    //   setUserInput({
    //     ...userInput,
    //     [e.target.name]: e.target.value,
    //   });
    // }
    else {
      setUserInput({
        ...userInput,
        [e.target.name]: e.target.value,
      });
    }
  };
  //handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const usuario = {
      id: 0,
      nombre: userInput.nombre,
      apellido: userInput.apellido,
      correo: userInput.correo,
      password: userInput.password,
      fechaNacimiento: userInput.fechaNacimiento,
      foto: userInput.foto ? userInput.foto : " ",
      idStatus: 1,
      roles: [
        {
          id: 2, //id del rol usuario
        },
      ],
    };

    dispatch(registerAsync(usuario));
    swal({
      title: "Registro exitoso",
      text: "Ahora puedes iniciar sesión",
      icon: "success",
      button: "Aceptar",
    });
    navigate("/login");
  };

  //form inputs
  const Inputs = [
    // {},
    {
      id: 1,
      type: "text",
      placeholder: "Nombre",
      name: "nombre",
      value: userInput.nombre,
    },
    {
      id: 2,
      type: "text",
      placeholder: "Apellido",
      name: "apellido",
      value: userInput.apellido,
    },
    {
      id: 3,
      type: "email",
      placeholder: "Correo",
      name: "correo",
      value: userInput.correo,
    },
    {
      id: 4,
      type: "password",
      placeholder: "Contraseña",
      name: "password",
      value: userInput.password,
    },
    {
      id: 5,
      type: "date",
      placeholder: "Fecha de nacimiento",
      name: "fechaNacimiento",
      value: userInput.fechaNacimiento,
    },
    {
      id: 6,
      type: "file",
      placeholder: "Foto de perfil",
      name: "foto",
      value: userInput.foto,
    },
  ];

  return (
    <main className="h-screen w-full banner">
      <div className="flex flex-col justify-center items-center h-screen">
        {/* logo  */}
        {/* <Brand /> */}
        {/* sign up form  */}
        <form
          className="bg-white w-96 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg p-8 space-y-12"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-center items-center space-x-2 flex-col">
            <Brand />
            <h1 className="text-2xl font-semibold text-primary">Registrate</h1>
          </div>
          <div className="flex flex-col space-y-2">
            {Inputs.map((input, index) => {
              return input.type === "file" ? (
                <TextField
                  key={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  onChange={handleChange}
                  accept="image/*"
                />
              ) : (
                <TextField
                  key={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  name={input.name}
                  value={input.value}
                  onChange={handleChange}
                />
              );
            })}
          </div>
          <Button text="Registrarse" />
          <Link to="/login">
            <p className="text-base text-primary text-center my-6 hover:underline">
              Ya tienes una cuenta? Inicia sesión
            </p>
          </Link>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
