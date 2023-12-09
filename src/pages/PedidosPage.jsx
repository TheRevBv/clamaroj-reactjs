import { Fragment, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPedidosAsync } from "@app/slices/pedidosSlice";
import PedidoItem from "@components/PedidoItem";
import Footer from "@components/Footer/Footer";
import "@styles/pedidos.css";

const PedidosPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pedidos, loading, error } = useSelector((state) => state.pedidos);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    //No es necesario validar si el usuario está logueado, ya que ProtectedRoutes se encarga de eso
    dispatch(getPedidosAsync(user.id));
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
            <div className="flex flex-row justify-between container mx-auto px-4 h-full">
              <div className="h-full overflow-y-auto w-full">
                {loading && (
                  <h2 className="text-center text-primary text-2xl">
                    Cargando...
                  </h2>
                )}
                {error && (
                  <h2 className="text-center text-danger text-2xl">{error}</h2>
                )}
                {pedidos.map((pedido) => (
                  <PedidoItem key={pedido.idPedido} pedido={pedido} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default PedidosPage;
