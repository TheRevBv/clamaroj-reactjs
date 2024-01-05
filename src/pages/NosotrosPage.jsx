import Footer from "@components/Footer/Footer";
import { useNavigate, Link } from "react-router-dom";

const NosotrosPage = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center h-screen my-28">
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Nosotros
        </h1>

        <div className="container h-full flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-2xl overflow-hidden p-10">
          <section className="max-w-screen-xl mx-auto px-6 h-3/4">
            <div className="flex flex-col md:flex-row md:space-x-4 h-full w-full">
              <div className="md:w-1/2 h-full w-full">
                <img
                  className="w-full h-full object-cover"
                  src="/assets/img/logos/1.png"
                  alt="nosotros"
                />
              </div>
              <div className="md:w-1/2 flex flex-col items-center justify-center p-8 space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-4xl font-bold text-gray-800 text-center">
                    Bienvenido a Clamaroj
                  </h2>
                  <p className="text-gray-500 text-center">
                    Somos un emprendimiento juvenil con la misión de llevar a tu
                    paladar los sabores más deliciosos mediante productos
                    innovadores y de alta calidad.
                    <br />
                    Nos destacamos por nuestra creatividad y frescura al crear
                    micheladas que despiertan tus sentidos y botanas
                    irresistibles que complementan cada sorbo. En ClamaROJ, no
                    solo queremos ofrecerte productos excepcionales, sino
                    también brindarte momentos inolvidables.
                    <br />
                    <br />
                    <span className="text-2xl font-bold text-gray-800 text-center">
                      ¡Únete a nosotros y descubre el placer en cada bocado y
                      sorbo!
                    </span>
                    {/* <h1 className="mt-5">
                    ¡Únete a nosotros y descubre el placer en cada bocado y
                    sorbo!
                  </h1> */}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center mt-8">
                  <h2 className="text-4xl font-bold text-gray-800 text-center">
                    MISIÓN
                  </h2>
                  <p className="text-gray-500 text-center">
                    Nuestra misión es crear experiencias excepcionales para
                    nuestros clientes, ofreciendo productos de la más alta
                    calidad en un entorno único.
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center mt-8">
                  <h2 className="text-4xl font-bold text-gray-800 text-center">
                    VISIÓN
                  </h2>
                  <p className="text-gray-500 text-center">
                    Ser una empresa líder en la comercialización de productos
                    para el consumo humano, reconocida por su calidad y
                    servicio, con un equipo de trabajo comprometido con la
                    satisfacción de nuestros clientes.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* Ubicacion */}
          <section className="max-w-screen-xl mx-auto px-6 h-1/4">
            <div className="flex flex-col md:flex-row md:space-x-4 h-full w-full justify-between items-center gap-20">
              <div className="md:w-1/2 flex flex-col items-center justify-center p-8 space-y-4">
                <div className="flex flex-col items-center justify-center">
                  <h2 className="text-4xl font-bold text-gray-800 text-center">
                    Ubicación
                  </h2>
                  <p className="text-gray-500 text-center">
                    Nos encontramos en la ciudad de Trujillo, en el distrito de
                    La Esperanza, en la calle Los Pinos 123.
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center mt-8">
                  <h2 className="text-4xl font-bold text-gray-800 text-center">
                    Horario de atención
                  </h2>
                  <p className="text-gray-500 text-center">
                    Lunes a Domingo de 9:00 am a 6:00 pm
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 h-full w-full flex flex-col items-end justify-end">
                <iframe
                  title="Mapa del lugar"
                  className="w-full h-full object-cover rounded-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224724.42206264157!2d-74.0059412721968!3d40.71277627144768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25903f675f8eb%3A0xa2df6e67fa555f62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1637386787299!5m2!1sen!2s"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NosotrosPage;
