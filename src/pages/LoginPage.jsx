import { useState, useCallback, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Brand from "@components/Brand";
import Button from "@components/Button";
// import GoogleSignIn from "@components/GoogleSignIn";
// import TextField from "@components/TextField";
import { useSelector, useDispatch } from "react-redux";
import { loginAsync } from "@app/slices/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "@data/validators";
import swal from "sweetalert";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = useCallback(
    (data) => {
      console.log(data);
      dispatch(loginAsync(data));
      swal({
        title: "Bienvenido",
        text: "Has iniciado sesion correctamente",
        icon: "success",
        button: "Aceptar",
      });
      reset();
      navigate("/");
    },
    [dispatch, navigate, reset]
  );

  return (
    <>
      <main className="h-screen w-full banner">
        <div className="flex flex-col justify-center items-center h-screen">
          {/* logo  */}
          {/* <Brand /> */}
          {/* sign up form  */}
          <form
            className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg  space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex justify-center items-center space-x-2 flex-col">
              <Brand />
              <h1 className="text-2xl font-semibold text-primary">
                Iniciar Sesion
              </h1>
            </div>
            <div className="flex flex-col space-y-4">
              <input
                key={1}
                name="correo"
                className="btn-textfield"
                label="Correo electrónico"
                type="text"
                placeholder="Correo electrónico"
                {...register("correo")}
              />
              {/* {errors?.correo?.message && (
              )} */}
              <span className="text-red-500 text-sm">
                {errors?.correo?.message}
              </span>
              <input
                key={2}
                name="password"
                label="Contraseña"
                type="password"
                className="password-input"
                placeholder="Contraseña"
                {...register("password")}
              />
              {/* {errors?.password?.message && (
              )} */}
              <span className="text-red-500 text-sm">
                {errors?.password?.message}
              </span>
            </div>
            <Button text="Iniciar Sesion" type="submit" />
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
