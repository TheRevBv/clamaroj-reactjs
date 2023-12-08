import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Brand from "@components/Brand";
import Button from "@components/Button";
// import GoogleSignIn from "@components/GoogleSignIn";
import TextField from "@components/TextField";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync } from "@app/slices/authSlice";
import swal from "sweetalert";

const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [userInput, setUserInput] = useState({
    correo: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAsync(userInput));
    swal(
      `Bienvenido ${userInput.correo}`,
      "Iniciaste sesion correctamente",
      "success"
    );
    navigate("/");
  };

  const Inputs = [
    {
      id: 1,
      type: "email",
      placeholder: "Correo Electronico",
      value: userInput.correo,
      name: "correo",
    },
    {
      id: 2,
      type: "password",
      placeholder: "Password",
      value: userInput.password,
      name: "password",
    },
  ];

  return (
    <>
      <main className="h-screen w-full banner">
        <div className="flex flex-col justify-center items-center h-screen">
          {/* logo  */}
          {/* <Brand /> */}
          {/* sign up form  */}
          <form
            className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg  space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-center items-center space-x-2 flex-col">
              <Brand />
              <h1 className="text-2xl font-semibold text-primary">
                Iniciar Sesion
              </h1>
            </div>
            <div className="flex flex-col space-y-6">
              {Inputs.map((input) => (
                <TextField
                  key={input.id}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  name={input.name}
                  onChange={handleChange}
                />
              ))}
            </div>
            <Button text="Iniciar Sesion" />
            <div className="flex justify-center items-center">
              <NavLink
                to="/register"
                className="text-primary text-base text-primary text-center  hover:underline"
              >
                No tienes una cuenta? Registrate
              </NavLink>
            </div>

            {/* <GoogleSignIn text="Sign In With Google" /> */}
          </form>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
