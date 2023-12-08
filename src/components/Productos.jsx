import { useEffect, useState, useCallback } from "react";
import Producto from "@components/ProductoItem";
import Skeleton from "@components/Skeleton";
import { getProductos } from "@app/slices/productosSlice";
import { useDispatch, useSelector } from "react-redux";

const Productos = () => {
  const [menuTab, setMenuTab] = useState("Todos");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productos.productos);

  useEffect(() => {
    setLoading(true);
    dispatch(getProductos());
    setLoading(false);
  }, [dispatch]);
  //navigate
  const handleMenuTabs = (type) => {
    setMenuTab(type);
  };

  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      {/* menu tabs  */}
      <div className="flex items-center justify-center space-x-6">
        <p
          className={
            menuTab === "Todos"
              ? "active_menu_tab poppins bg-primary"
              : "menu_tab poppins"
          }
          onClick={() => handleMenuTabs("Todos")}
        >
          Todos
        </p>
      </div>

      {/* all products  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {products.map((producto) =>
          loading ? (
            <Skeleton key={producto.idProducto} />
          ) : (
            <Producto key={producto.idProducto} {...producto} />
          )
        )}
      </div>
    </section>
  );
};

export default Productos;
