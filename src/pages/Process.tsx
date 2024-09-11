import { useEffect, useState } from "react";
import { getCompanies } from "../utils/requestOptions";
import CustomSelect from "../components/forms/CustomSelect";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

const Process = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [companyId, setCompanyId] = useState(0);
  const [employerId, setEmployerId] = useState(0);
  const [employers, setEmployers] = useState([]);

  const handleCompanyChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    if (value == "0") {
      setEmployers([]);
      return;
    }
    setCompanyId(Number(value));
    const company = data.filter(function (jsonObject) {
      return jsonObject["id"] == value;
    })[0];
    setEmployers(company["employers"]);
  };

  const handleEmployerChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    console.log(Number(value));
    setEmployerId(Number(value));
  };

  const navigateToLoad = () => {
    if (employerId == 0) return;
    navigate(companyId + "/" + employerId + "/cargar");
  };

  useEffect(() => {
    getCompanies()
      .then((response) => {
        // Data retrieval and processing
        setData(response.data);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  }, []);
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center shadow-xl ">
        <h3>Procesos</h3>
      </div>
      <div className="flex md:flex-row flex-col    gap-4  ">
        <div className="md:w-full mt-4 w-full flex flex-col   gap-2  ">
          <div className="w-full bg-white rounded-lg  p-4	shadow-xl 	  ">
            <CustomSelect
              class="w-full mx-auto  inline-block "
              label="Seleccione una compañía"
              options={data}
              onChange={handleCompanyChange}
              disabled={false}
              placeholder="Nombre de la compañía"
              type="text"
            />
            <CustomSelect
              class="w-full mx-auto  inline-block "
              label="Seleccione un empleado"
              disabled={false}
              onChange={handleEmployerChange}
              options={employers}
              placeholder="Nombre de la compañía"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col   mt-4 gap-4  ">
        <button
          onClick={navigateToLoad}
          className={`xl:w-1/3 w-full  shadow-xl  bg-white rounded-lg shadow p-4 py-6	text-center ${
            employerId != 0 ? "" : "opacity-50"
          }`}
        >
          <FontAwesomeIcon icon={faClock} className="text-6xl text-[#333160]" />
          <h3 className="text-[#333160] text-xl font-bold mt-4">
            Cargar tiempo
          </h3>
        </button>
        <button className="xl:w-1/3 w-full shadow-xl  bg-white rounded-lg shadow p-4 py-6	text-center	 opacity-50 ">
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
          <h3 className="text-[#333160] text-xl font-bold mt-4">
            Pagar nómina
          </h3>
        </div>
      </div>
    </>
  );
};

export default Process;
