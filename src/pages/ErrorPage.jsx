import { NavLink, useNavigate } from "react-router-dom";
import Brand from "@components/Brand";
import error from "@assets/img/logos/error.png";

const ErrorScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className="h-screen w-full banner">
        <div className="flex flex-col justify-center items-center h-screen">
          <div
            className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg  space-y-4"
          >
            <div className="flex justify-center items-center space-x-2 flex-col">
              <div>
                <img className="h-20" src="../src/assets/img/logos/error.png" alt="error" />
              </div>
              <h1 className="text-2xl font-semibold text-dark mt-5">
                Oops... Error 404
              </h1>
              <h3 className="font-semibold text-primary mt-5 text-center">
                No podemos encontrar la URL que buscas.
              </h3>
              <h3 className="font-semibold text-gray mt-5">
                Puede ser que la URL haya expirado, o no esté correctamente escrita. Por favor, vuelve al inicio.
              </h3>
              <div className="flex justify-center"> {/* Se agrega un contenedor flex para centrar el botón */}
                <button
                  className="bg-primary text-white px-8 py-2 focus:outline-none rounded-full mt-6 transform transition duration-300 hover:scale-105"
                  onClick={() => navigate("/")}
                >
                  Regresar al Inicio
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorScreen;
