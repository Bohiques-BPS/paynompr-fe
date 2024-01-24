import {
  faCalendarCheck,
  faClock,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const ActionProcess = () => {
  return (
    <div className="flex md:flex-row flex-col   mt-4 gap-4  ">
      <Link
        to="1/cargar"
        className="xl:w-1/3 w-full  shadow-xl  bg-white rounded-lg shadow p-4 py-6	text-center	  "
      >
        <FontAwesomeIcon icon={faClock} className="text-6xl text-[#333160]" />
        <h3 className="text-[#333160] text-xl font-bold mt-4">Cargar tiempo</h3>
      </Link>
      <button className="xl:w-1/3 w-fullw-1/3 shadow-xl  bg-white rounded-lg shadow p-4 py-6	text-center	 opacity-50 ">
        <FontAwesomeIcon
          icon={faCalendarCheck}
          className="text-6xl text-[#333160]"
        />
        <h3 className="text-[#333160] text-xl font-bold mt-4">
          Generar nómina
        </h3>
      </button>
      <div className="xl:w-1/3 w-full shadow-xl  bg-white rounded-lg shadow p-4 py-6	text-center	opacity-50  ">
        <FontAwesomeIcon
          icon={faMoneyCheckDollar}
          className="text-6xl text-[#333160]"
        />
        <h3 className="text-[#333160] text-xl font-bold mt-4">Pagar nómina</h3>
      </div>
    </div>
  );
};

export default ActionProcess;
