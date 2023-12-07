import React from 'react'
import { getPedidosAsync } from '@slices/PedidosSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Footer from "@components/Footer/Footer";
import Banner from "@components/Banner";

const PedidosPage = () => {
  const dispatch = useDispatch();
  const pedidos = useSelector((state) => state.pedidos.pedidos);

  useEffect(() => {
    dispatch(getPedidosAsync(60)); //id de usuario
  }, [dispatch]);

  return (
    <>
      <Banner />
      <div>
        <h1>Pedidos</h1>
      </div>
      <div>
        <ul>
          {pedidos.map((pedido) => (
            <li key={pedido.idPedido}>{pedido.idPedido}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
};

export default PedidosPage