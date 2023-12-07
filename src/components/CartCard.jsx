import React from "react";

/*Se hizo otro componente para dividirlo */
const CartCard = ({ product }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        {/* Imagen a la izquierda */}
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={`/src/assets/img/productos/${product.foto}`}
            alt={product.nombre}
          />
        </div>

        {/* Texto a la derecha */}
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {product.codigo}
          </div>
          <p className="block mt-1 text-lg leading-tight font-medium text-black">
            {product.nombre}
          </p>
          <p className="mt-2 text-gray-500">{product.descripcion}</p>
          <p className="mt-4 text-gray-600">Precio ${product.precio}</p>
          <p className="mt-2 text-black-600">Articulos: {product.cantidad}</p>
          <p>Total: ${product.precio * product.cantidad}</p>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
