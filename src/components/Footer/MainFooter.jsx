import React from "react";
import Brand from "@components/Brand";

const MainFooter = () => {
  // footer links
  const FooterLinks = [
    {
      id: 1,
      text: "Inicio",
      path: "/",
    },
    {
      id: 2,
      text: "Productos",
      path: "/productos",
    },
    {
      id: 3,
      text: "Nosotros",
      path: "/nosotros",
    },
    {
      id: 4,
      text: "Contacto",
      path: "/contacto",
    },
    {
      id: 5,
      text: "Carrito",
      path: "/cart",
    },
    {
      id: 6,
      text: "Login",
      path: "/login",
    },
    {
      id: 7,
      text: "Registro",
      path: "/register",
    },
  ];
  return (
    <div className="flex pb-8">
      {/* logo  */}
      <div className="flex flex-grow">
        <Brand />
      </div>
      {/* footer links  */}
      <div className="flex space-x-12">
        <div className="flex flex-col space-y-2">
          {FooterLinks.slice(0, 4).map((item) => (
            <span className="text-white" key={item.id}>
              {item.text}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {FooterLinks.slice(4, 8).map((item) => (
            <span className="text-white" key={item.id}>
              {item.text}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          {FooterLinks.slice(8, 12).map((item) => (
            <span className="text-white" key={item.id}>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
