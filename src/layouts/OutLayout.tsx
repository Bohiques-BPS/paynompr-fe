import React from "react";
import { Outlet } from "react-router-dom";

import top_bar from "../assets/imgs/Out/top_bar.png";
import icon from "../assets/imgs/Out/icon.png";
import Footer from "../components/nav/Footer";

const OutLayout = () => {
  return (
    <div className="h-screen">
      <div
        className="h-[30vh] grid content-center relative  align-middle bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${top_bar})` }}
      >
        <h2 className="text-white font-bold z-10 text-4xl text-center">
          ¡Bienvenido a Paymon!
        </h2>
        <img className="absolute left-16 w-48  -bottom-1/4" src={icon}></img>
      </div>
      <div className="bg-[#E1E1E1]  h-[64vh] mx-auto flex align-middle items-center">
        <div className=" md:container  py-12 mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OutLayout;
