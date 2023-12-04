const Banner = () => {
  const sectionStyle = {
    /*background: "url(../src/assets/banner.png)",
    backgroundPosition: "center",
    backgroundSize: "cover", // Hace que la imagen se ajuste al tamaño del contenedor
    backgroundRepeat: "no-repeat", // Evita la repetición de la imagen de fondo
    /*background con imagen */

    background:
      "linear-gradient(157deg, rgba(8,33,53,1) 35%, rgba(8,50,77,1) 67%, rgba(3,36,60,1) 79%)",
  };

  return (
    <section className="header-banner h-96 w-full" style={sectionStyle}>
      <div className="flex flex-col items-center justify-center h-full">
        <h1
          className="text-center text-3xl md:text-4xl lg:text-5xl poppins font-semibold text-white-700"
          style={{ color: "white" }}
        >
          Las mejores micheladas y cocteles
        </h1>

        <div className="rounded-full p-1 box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 w-96 flex items-center">
          <input
            type="text"
            className=" rounded-full px-4 focus:outline-none w-full bg-transparent"
            placeholder="Buscar aquí..."
          />
          <button className="text-sm bg-primary py-3 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform">
            Buscar
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
