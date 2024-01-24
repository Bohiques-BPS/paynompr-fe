import { NavLink } from "react-router-dom";
import { faXmark, faBarcode } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dash from "../../assets/imgs/navbar/dash.png";
import companies from "../../assets/imgs/navbar/companies.png";
import process from "../../assets/imgs/navbar/process.png";

interface SidebarProps {
  sidebarOpen: string;
  toggleSidebarOption: () => void;
  toggleSidebar: () => void;
}

const Sidebar = ({
  sidebarOpen,
  toggleSidebar,
  toggleSidebarOption,
}: SidebarProps) => {
  return (
    <div
      className={` transition-all  fixed  h-[calc(100vh-88px)]  mt-[88px] md:mt-[8vh] md:opacity-100  xl:h-[calc(100vh-8vh)]  duration-500  bg-[#645c9f] h-[calc(100vh-14vh)]  ${
        sidebarOpen === "true"
          ? "w-2/3  left-0  opacity-100 bottom-0 md:w-1/4 z-20"
          : " w-0 md:w-1/12 justify-items-center opacity-0"
      }`}
    >
      <div
        className={`h-full p-6  transition-all  duration-300 grid ${
          sidebarOpen === "true"
            ? " ps-12   "
            : "  justify-items-center  hidden sm:grid ps-5"
        }`}
      >
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              onClick={toggleSidebar}
              to="/escritorio/dash"
              className={({ isActive }) =>
                [
                  "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                  isActive ? " active group" : "",
                ].join("")
              }
            >
              <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                <img src={dash} className="h-6 w-6 " alt="" />
              </div>
              {sidebarOpen === "true" && (
                <span className="ms-3 text-white">Escritorio</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleSidebar}
              to="/escritorio/empresas"
              className={({ isActive }) =>
                [
                  "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                  isActive ? " active group" : "",
                ].join("")
              }
            >
              <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                <img src={companies} className="h-6 w-6 " alt="" />
              </div>
              {sidebarOpen === "true" && (
                <span className="ms-3 text-white">Compañías</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleSidebar}
              to="/escritorio/procesos"
              className={({ isActive }) =>
                [
                  "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                  isActive ? " active group" : "",
                ].join("")
              }
            >
              <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                <img src={process} className="h-6 w-6 " alt="" />
              </div>
              {sidebarOpen === "true" && (
                <span className="ms-3 text-white">Procesos</span>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={toggleSidebar}
              to="/escritorio/codigos"
              className={({ isActive }) =>
                [
                  "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                  isActive ? " active group" : "",
                ].join("")
              }
            >
              <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                <FontAwesomeIcon
                  className="text-2xl text-white"
                  icon={faBarcode}
                />
              </div>
              {sidebarOpen === "true" && (
                <span className="ms-3 text-white">Codigos</span>
              )}
            </NavLink>
          </li>
          <li className=" block xl:hidden">
            <NavLink
              to="../"
              className={({ isActive }) =>
                [
                  "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                  isActive ? " active group" : "",
                ].join("")
              }
            >
              {sidebarOpen === "true" && (
                <span
                  onClick={toggleSidebar}
                  className=" flex rounded-lg px-4 py-2 font-bold bg-[#FED102] me-4 content-center items-center"
                >
                  {" "}
                  Cerrar sesión
                </span>
              )}
            </NavLink>
          </li>
        </ul>
        <ul className=" content-end grid font-medium 	">
          <li className="text-center">
            <button
              onClick={toggleSidebarOption}
              className="flex items-center  text-gray-900 rounded-lg text-center text-white"
            >
              <div className="p-3 px-4 rounded-full bg-[#EED102]">
                {sidebarOpen === "true" ? (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-2xl text-black"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBars}
                    className="text-2xl text-black"
                  />
                )}
              </div>

              {sidebarOpen === "true" && (
                <span className="ms-3">Cerrar menú</span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
