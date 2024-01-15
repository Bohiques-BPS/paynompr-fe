import { Link } from "react-router-dom";

import user from "../../assets/imgs/navbar/user.png";
import logo from "../../assets/imgs/Out/icon.png";

const Header = () => {
  return (
    <div className="grid  px-16 py-3 grid-cols-2 grid-flow-col gap-4 h-[8vh] bg-[#fdfdfd]">
      <div>
        <img src={logo} className="h-11" alt="" />
      </div>
      <div className=" grid grid-cols-2 justify-items-end  ">
        <button className=" rounded-lg px-4 font-bold bg-[#FED102]">
          Cerrar sesión
        </button>
        <img className="h-11" src={user} alt="" />
      </div>
    </div>
  );
};

export default Header;
