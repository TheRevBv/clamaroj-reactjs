import { Fragment, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPedidosAsync } from "@app/slices/pedidosSlice";
import PedidoItem from "@components/PedidoItem";
import Footer from "@components/Footer/Footer";
import "@styles/pedidos.css";

const pedidosTest = [
  {
    idPedido: 176,
    idUsuario: 4,
    idStatus: 1,
    fecha: "2023-07-18T00:00:00",
    fechaEntrega: "2023-07-18T00:00:00",
    domicilio: "Calle Oaxaca - Colonia San José del Consuelo",
    telefono: "4778901234",
    razonSocial: "Proveedor163",
    rfc: "RFC989898H163",
    tipoPago: "TC",
    tipoEnvio: "T",
    tipoPedido: "V",
    total: 91,
    estatus: "Activo",
  },
  {
    idPedido: 193,
    idUsuario: 4,
    idStatus: 1,
    fecha: "2023-07-04T00:00:00",
    fechaEntrega: "2023-07-04T00:00:00",
    domicilio: "Calle Colima - Colonia Azteca",
    telefono: "4776789012",
    razonSocial: "Proveedor180",
    rfc: "RFC252525H180",
    tipoPago: "TD",
    tipoEnvio: "D",
    tipoPedido: "V",
    total: 62.25,
    estatus: "Activo",
  },
  {
    idPedido: 210,
    idUsuario: 4,
    idStatus: 1,
    fecha: "2023-07-21T00:00:00",
    fechaEntrega: "2023-07-21T00:00:00",
    domicilio: "Calle Tamaulipas - Colonia San Rafael",
    telefono: "4770123456",
    razonSocial: "Proveedor197",
    rfc: "RFC424242H197",
    tipoPago: "TB",
    tipoEnvio: "T",
    tipoPedido: "V",
    total: 72.5,
    estatus: "Activo",
  },
  {
    idPedido: 194,
    idUsuario: 4,
    idStatus: 1,
    fecha: "2023-07-04T00:00:00",
    fechaEntrega: "2023-07-04T00:00:00",
    domicilio: "Calle Colima - Colonia Azteca",
    telefono: "4776789012",
    razonSocial: "Proveedor180",
    rfc: "RFC252525H180",
    tipoPago: "TD",
    tipoEnvio: "D",
    tipoPedido: "V",
    total: 62.25,
    estatus: "Activo",
  },
  {
    idPedido: 211,
    idUsuario: 4,
    idStatus: 1,
    fecha: "2023-07-21T00:00:00",
    fechaEntrega: "2023-07-21T00:00:00",
    domicilio: "Calle Tamaulipas - Colonia San Rafael",
    telefono: "4770123456",
    razonSocial: "Proveedor197",
    rfc: "RFC424242H197",
    tipoPago: "TB",
    tipoEnvio: "T",
    tipoPedido: "V",
    total: 72.5,
    estatus: "Activo",
  },
];

const PedidosPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pedidos, loading, error } = useSelector((state) => state.pedidos);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //No es necesario validar si el usuario está logueado, ya que ProtectedRoutes se encarga de eso
    dispatch(getPedidosAsync(user.id));
    console.log("Pedidos", pedidos)
  }, [dispatch, user.id]);

  // Continua retornando un listado de pedidos por usuario

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="h-1/2 container mx-auto px-4 sm:mt-5 mt-4 sm:h-3/4">
          <div className="container mx-auto px-4 h-full">
            <div className="flex flex-row justify-between w-full my-4">
              <div className="flex flex-col w-full">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                  Pedidos
                </h2>
              </div>
            </div>
            {pedidos.length > 0 ? (
              <>
                <div className="flex flex-row justify-between container mx-auto px-4 h-full">
                  <div className="h-full overflow-y-auto w-full">
                    {loading && (
                      <h2 className="text-center text-primary text-2xl">
                        Cargando...
                      </h2>
                    )}
                    {error && (
                      <h2 className="text-center text-danger text-2xl">
                        {error}
                      </h2>
                    )}
                    {pedidos.map((pedido) => (
                      <PedidoItem key={pedido.idPedido} pedido={pedido} />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h1>No hay pedidos</h1>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default PedidosPage;
