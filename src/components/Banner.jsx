const Banner = () => {
  return (
    <section className="header-banner h-96 w-full bg-yellow-50">
      <div className="flex flex-col items-center justify-center h-full">
        {/* Agregar un fondo blur para mostrar el texto  */}
        <div className="bg-white bg-opacity-0 backdrop-filter backdrop-blur-sm rounded-lg p-8">
          <h1 className="text-8xl font-bold text-center text-secondary mb-4 uppercase">
            Las mejores micheladas y cervezas
          </h1>
          {/* <p className="text-center text-gray-800 mb-8">
            Encuentra los mejores cursos en línea
          </p> */}
        </div>
        <div className="rounded-full p-1 box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 w-96 flex items-center">
          <input
            type="text"
            className=" rounded-full px-4 focus:outline-none w-full bg-transparent"
            placeholder="Buscar aqui..."
          />
          <button className="text-sm bg-primary py-3 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform">
            Buscar...
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
