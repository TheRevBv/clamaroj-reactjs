import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPaperPlane, faPhone, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import './ContactoPage.css'; // Importa la hoja de estilos
import Footer from "@components/Footer/Footer";


const ContactoPage = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Nombre:", nombre);
    console.log("Correo:", correo);
    console.log("Mensaje:", mensaje);
  };

  return (
    <>
    <div className="container">
      <div className="header mb-5">
        <br/>
        <h1 className='mt-5 pt-5'>¡Conéctate con Clamaroj!</h1>
        <p>Es importante para nosotros estar en contacto contigo. Si tienes sugerencias o comentarios, ¡envíanos un mensaje!</p>
      </div>

      <div className="content">
        <div className="contact-info p-2">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">
                  <FontAwesomeIcon icon={faUser} className='mr-2'/>
                  Nombre:
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="correo">
                  <FontAwesomeIcon icon={faEnvelope} className='mr-2'/>
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  id="correo"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">
                  <FontAwesomeIcon icon={faPaperPlane} className='mr-2'/>
                  Mensaje:
                </label>
                <textarea
                  id="mensaje"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">Enviar Mensaje</button>
            </form>
          </div>

        </div>
      </div>

      <div className="contact-red">
        <h2>Información de Contacto</h2>
        <p>¡Estamos encantados de escucharte! Contáctanos a través de los siguientes canales:</p>
        <ul>
          <li>
            <FontAwesomeIcon icon={faPhone} className='mr-2' />
            <strong>Teléfono:</strong> 477 123 4567
          </li>
          <li>
            <FontAwesomeIcon icon={faMailBulk}  className='mr-2'/>
            <strong>Correo Electrónico:</strong> ClamaROJ@gmail.com
          </li>
        </ul>
        <div className="social-media">
          <p>Síguenos en redes sociales:</p>
          <ul className="social-icons">
            <li>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <img src="src/assets/facebook.png" alt="Facebook" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/?lang=es" target="_blank" rel="noopener noreferrer">
                <img src="src/assets/twitter.png" alt="Twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <img src="src/assets/instagram.png" alt="Instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactoPage;