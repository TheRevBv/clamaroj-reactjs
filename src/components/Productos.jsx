import { useEffect, useState } from "react";
import Producto from "@components/ProductoItem";
import Skeleton from "@components/Skeleton";

const productos = [
  {
    idProducto: 1,
    codigo: "PROD000001",
    nombre: "MICHE CUBANA",
    descripcion: "Michelada con salsa maggi, inglesa, tabasco y cerveza clara",
    precio: 60,
    foto: "cubana.jpg",
    merma: 5,
    estatus: "Activo",
  },
  {
    idProducto: 2,
    codigo: "PROD000002",
    nombre: "PAPALOCAS",
    descripcion: "Tostilocos con ingredientes variados y salsas picantes",
    precio: 50,
    foto: "papaslocas.jpg",
    merma: 3,
    estatus: "Activo",
  },
  {
    idProducto: 3,
    codigo: "PROD000003",
    nombre: "PIÑACHELA",
    descripcion: "Michelada con piña y chile en polvo",
    precio: 65,
    foto: "piñachela.jpg",
    merma: 2,
    estatus: "Activo",
  },
  {
    idProducto: 4,
    codigo: "PROD000004",
    nombre: "TOSTILOCOS",
    descripcion: "Tostitos con cueritos, cueritos y cueritos",
    precio: 60,
    foto: "tostilocos.jpg",
    merma: 1,
    estatus: "Activo",
  },
  {
    idProducto: 5,
    codigo: "PROD000005",
    nombre: "GOMICHELA",
    descripcion: "Michelada con gomitas y chamoy",
    precio: 70,
    foto: "https://www.estilodf.tv/wp-content/uploads/2020/07/e79ac61934cb1105482631c5261da8c5.jpg",
    merma: 4,
    estatus: "Activo",
  },
  {
    idProducto: 6,
    codigo: "PROD000006",
    nombre: "DORILOCOS",
    descripcion: "Doritos con pepino, cueritos y salsas",
    precio: 40,
    foto: "dorilocos.jpg",
    merma: 1,
    estatus: "Activo",
  },
];

const Productos = () => {
  const [menuTab, setMenuTab] = useState("Todos");
  const [loading, setLoading] = useState(false);
  const [productosApi, setProductosApi] = useState([]);

  const getProductos = async () => {
    const res = await fetch("http://localhost:7092/api/Productos");
    const data = await res.json();
    setProductosApi(data);
  };

  //loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  //get productos
  useEffect(() => {
    getProductos();
  }, []);

  //food menu tab
  const handleMenuTabs = (type) => {
    setMenuTab(type);
  };

  return (
    <section className="my-12 max-w-screen-xl mx-auto px-6">
      {/* food Menu tab  */}
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
        {/* <p
          className={
            menuTab === "Dulce"
              ? "active_menu_tab poppins bg-primary"
              : "menu_tab poppins"
          }
          onClick={() => handleMenuTabs("Dulce")}
        >
          Dulce
        </p>
        <p
          className={
            menuTab === "Salado"
              ? "active_menu_tab poppins bg-primary"
              : "menu_tab poppins"
          }
          onClick={() => handleMenuTabs("Salado")}
        >
          Salado
        </p> */}
      </div>

      {/* all products  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
        {productosApi.map((producto) =>
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
