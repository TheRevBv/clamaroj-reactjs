import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaPhone,
  FaMailBulk,
  FaUser,
  FaEnvelope,
  FaPaperPlane,
} from "react-icons/fa";
// import "./ContactoPage.css"; // Importa la hoja de estilos
import Footer from "@components/Footer/Footer";
import swal from "sweetalert";

const ContactoPage = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setNombre("");
    setCorreo("");
    setMensaje("");
    swal({
      title: "¡Mensaje enviado!",
      text: "Gracias por contactarnos, te responderemos a la brevedad.",
      icon: "success",
      button: "Aceptar",
    });

    navigate("/");

    // const templateId = "template_8h6v4z2";
    // sendFeedback(templateId, {
    //   message_html: mensaje,
    //   from_name: nombre,
    //   reply_to: correo,
    // });
  };

  const sendFeedback = (templateId, variables) => {
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        swal({
          title: "¡Mensaje enviado!",
          text: "Gracias por contactarnos, te responderemos a la brevedad.",
          icon: "success",
          button: "Aceptar",
        });
        setNombre("");
        setCorreo("");
        setMensaje("");
      })
      .catch((err) =>
        swal({
          title: "¡Error!",
          text: "Ocurrió un error al enviar el mensaje, inténtalo de nuevo.",
          icon: "error",
          button: "Aceptar",
        })
      );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold text-gray-800 text-center">
                CONTACTO
              </h2>
              <p className="text-gray-500 text-center">
                Si tienes alguna duda o consulta, no dudes en contactarnos
              </p>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-center mt-4 gap-4">
              <div className="flex flex-col items-center justify-center text-gray-500">
                <FaPhone className="text-2xl" />
                <p className="text-center">+51 987 654 321</p>
              </div>
              <div className="flex flex-col items-center justify-center text-gray-500">
                <FaMailBulk className="text-2xl" />
                <p className="text-center">
                  <a
                    href="mailto:soporte@clamaroj.com"
                    className="hover:text-primary"
                  >
                    soporte@clamaroj.com
                  </a>
                </p>
              </div>
              <div className="flex flex-col items-center justify-center text-gray-500">
                <FaUser className="text-2xl" />
                <p className="text-center">Clamaroj</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-4xl font-bold text-gray-800 text-center">
              FORMULARIO
            </h2>
            <p className="text-gray-500 text-center">Envíanos un mensaje</p>
          </div>
          <form
            className="flex flex-col items-center justify-center mt-4"
            onSubmit={handleSubmit}
          >
            <input
              className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 border border-gray-300 focus:outline-none rounded-md p-4"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <input
              className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 border border-gray-300 focus:outline-none rounded-md p-4 mt-4"
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <textarea
              className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 border border-gray-300 focus:outline-none rounded-md p-4 mt-4"
              placeholder="Mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            />
            <button
              className="bg-primary text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 mt-4"
              type="submit"
            >
              <FaPaperPlane />
              <span>Enviar</span>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactoPage;
