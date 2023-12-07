import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <section className="header-banner h-96 w-full">
      <div className="flex flex-col items-center justify-center h-full">
        {/* Agrega input para busqueda de productos */}
        <div className="flex bg-white rounded-full w-3/4">
          <input
            type="text"
            placeholder="Buscar..."
            className="bg-transparent outline-none p-4 w-full"
          />
          <button className="bg-primary text-white font-bold rounded-full flex items-center justify-center px-8 py-2">
            <FaSearch />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
