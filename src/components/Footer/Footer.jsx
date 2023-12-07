import React from "react";
import BottomFooter from "@components/Footer/BottomFooter";
import MainFooter from "@components/Footer/MainFooter";

const Footer = () => {
  return (
    //Corregir el footer para que se vea bien en pantallas grandes y se quede abajo
    <footer className="bg-secondary text-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col">
        <MainFooter />
        <BottomFooter />
      </div>
    </footer>
  );
};

export default Footer;
