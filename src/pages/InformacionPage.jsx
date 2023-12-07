// Archivo: InformacionPage.js
import React from 'react';
import './InformacionPage.css';
import Footer from "@components/Footer/Footer";

const InformacionPage = () => {
  return (
    <>
    <div className="container">
      <div className="header">
        {/* Contenido del encabezado */}
      </div>
      
      <div className="content">
        <div className="section with-image">
          <div className="text">
            <h2>¡Bienvenido a ClamaROJ!</h2>
            <p>
              Somos un emprendimiento juvenil con la misión de llevar a tu paladar los 
              sabores más deliciosos mediante productos innovadores y de alta calidad.
              <br />
              Nos destacamos por nuestra creatividad y frescura al crear micheladas que despiertan 
              tus sentidos y botanas irresistibles que complementan cada sorbo. En ClamaROJ, no solo 
              queremos ofrecerte productos excepcionales, sino también brindarte momentos inolvidables.
              <br />
              <h1 className='mt-5'>¡Únete a nosotros y descubre el placer en cada bocado y sorbo!</h1>
            </p>
          </div>
          <img src="src/assets/logo3.png" alt="Especialidades" />
        </div>

        <div className="section gradient-background">
          <img src="src/assets/somos.jpg" alt="Ambiente Neon" />
          <div className="text">
            <h2 className='mt-5'>Colores Vibrantes y Ambiente Neon</h2>
            <p>
              Sumérgete en un ambiente vibrante con nuestra paleta de colores neón, creando una experiencia visual única.
            </p>
          </div>
        </div>

        <div className="section with-image">
          <img src="src/assets/mision.jpg" alt="Nuestra Historia" />
          <div className="text">
            <h2>Nuestra Historia</h2>
            <p>
              Desde nuestros inicios, hemos evolucionado para convertirnos en un destino gastronómico reconocido, gracias a nuestra dedicación y compromiso con la calidad.
            </p>
          </div>
        </div>

        <div className="section gradient-background">
          <div className="text">
            <h2>Misión</h2>
            <p>
              Nuestra misión es crear experiencias excepcionales para nuestros clientes, ofreciendo productos de la más alta calidad en un entorno único.
            </p>
          </div>
        </div>

        <div className="section">
          <div className="text">
            <h2>Impacto</h2>
            <p>
              Nos esforzamos por hacer una diferencia positiva en la comunidad, contribuyendo a través de iniciativas locales y sostenibles.
            </p>
          </div>
        </div>

        <div className="section">
          <h2>Ubicación</h2>
          <p>
            ¡Te esperamos en nuestra ubicación para que vivas la experiencia Clamaroj en persona!
            
          </p>
          {}
          <div className="map-container">
            <iframe
              title="Mapa del lugar"
              className="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224724.42206264157!2d-74.0059412721968!3d40.71277627144768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25903f675f8eb%3A0xa2df6e67fa555f62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1637386787299!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </> 
  );
};

export default InformacionPage;