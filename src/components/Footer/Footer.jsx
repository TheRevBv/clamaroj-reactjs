import React from "react";
import BottomFooter from "@components/Footer/BottomFooter";
import MainFooter from "@components/Footer/MainFooter";

const Footer = () => {
  return (
    <footer className="bg-secondary px-6 py-12">
      <div className=" max-w-screen-xl mx-auto px-6">
        <MainFooter />
        <BottomFooter />
      </div>
    </footer>
  );
};

export default Footer;
