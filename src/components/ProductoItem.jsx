import { useNavigate } from "react-router-dom";

const ProductoItem = ({
  idProducto,
  codigo,
  nombre,
  descripcion,
  precio,
  foto,
  merma,
  estatus,
}) => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(`/productos/${idProducto}`);
    // history.push(`/foods/${title}`);
  };
  return (
    <div className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative">
      {estatus === "Activo" ? (
        <span className="bg-green-100 border border-green-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">
          Disponible
        </span>
      ) : (
        <span className="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4 ">
          Agotado
        </span>
      )}
      <img
        className="w-64 mx-auto transform transition duration-300 hover:scale-105"
        src={foto == `${nombre}.png` ? `/assets/img/productos/${foto}` : foto}
        alt={nombre}
      />
      <div className="flex flex-col items-center my-3 space-y-2">
        <h1 className="text-gray-900 poppins text-lg">{nombre}</h1>
        <p className="text-gray-500 poppins text-sm text-center">
          {descripcion.substring(0, 100)}...
        </p>
        <h2 className="text-gray-900 poppins text-2xl font-bold">${precio}</h2>
        <button
          className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
          onClick={handleRoute}
        >
          Ordene ahora
        </button>
      </div>
    </div>
  );
};

export default ProductoItem;
