import { useEffect, useState } from "react";
import {
  get940Foil,
  get941Foil,
  getCFSEFoil,
  getChoferilFoil,
  getCompanies,
  getCounterFoilbyDateRange,
  getHaciendaFoil,
  getUnemploymentFoil,
  getW2PFoil,
} from "../utils/requestOptions";
import CustomSelect from "../components/forms/CustomSelect";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClock,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FILES, TRIMESTRE, YEARS, YEARS_CFSE } from "../utils/consts";
import { showError, showSuccess } from "../utils/functions";
import LoadingOverlay from "../components/utils/LoadingOverlay";
import { DateRangePicker } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
const Process = () => {
  const navigate = useNavigate();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(0);
  const [selectedTrimestre, setSelectedTrimestre] = useState(0);
  const [loanding, setLoanding] = useState(false);

  const [year, setYear] = useState(() => {
    const currentYear = new Date().getFullYear().toString(); // Convertimos el año a string
    return currentYear;
  });
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

  const handleSelect = (item: any) => {
    console.log(item.selection);
    setState([item.selection]);
  };

  const handleEmployerChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    console.log(Number(value));
    setEmployerId(Number(value));
  };

  const handleFileChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    setSelectedFile(Number(value));
  };

  const handleYearChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    setYear(value);
  };

  const handleTrimestre = (e: React.FormEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;

    setSelectedTrimestre(Number(value));
  };

  const navigateToLoad = () => {
    if (employerId == 0) return;
    navigate(companyId + "/" + employerId + "/cargar");
  };

  const downloadFile = () => {
    if (year == "0")
      showError("Debe seleccionar un año para generar el documento");

    if (selectedFile == 0) return;
    setLoanding(true);

    if (selectedFile == 1) {
      var employer = null;
      if (employerId != 0) employer = filterById(employers, employerId);
      getW2PFoil(employerId, employer, companyId, year)
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);
          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          setLoanding(false);

          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
    if (selectedFile == 2) {
      var companies = filterById(data, companyId);
      get940Foil(companyId, companies, year)
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);

          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          setLoanding(false);

          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
    if (selectedFile == 3) {
      var companies = filterById(data, companyId);
      get941Foil(companyId, companies, selectedTrimestre, year)
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);

          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          setLoanding(false);

          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
    if (selectedFile == 4) {
      var companies = filterById(data, companyId);
      getHaciendaFoil(companyId, companies, selectedTrimestre, year)
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);

          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          setLoanding(false);

          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
    if (selectedFile == 5) {
      var companies = filterById(data, companyId);
      getUnemploymentFoil(companyId, companies, selectedTrimestre, year)
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);

          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          setLoanding(false);

          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
    if (selectedFile == 6) {
      var companies = filterById(data, companyId);
      getChoferilFoil(companyId, companies, selectedTrimestre, year)
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);

          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          setLoanding(false);

          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
    if (selectedFile == 7) {
      var companies = filterById(data, companyId);
      getCFSEFoil(companyId, companies, selectedTrimestre, year)
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);

          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          setLoanding(false);

          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    }
    if (selectedFile == 8) {
      var employer = null;
      if (employerId != 0) employer = filterById(employers, employerId);
      setLoanding(true);
      getCounterFoilbyDateRange(
        companyId,
        employerId,
        state[0].startDate,
        state[0].endDate,
        employer
      )
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);

          showSuccess("Creado exitosamente.");
        })
        .catch((error) => {
          setLoanding(false);
          console.log(error);
          showError("Usuario no posee data.");
          // If the query fails, an error will be displayed on the terminal.
        });
    }
  };

  function filterById(jsonObject: any[], id: any) {
    return jsonObject.filter(function (jsonObject) {
      return jsonObject["id"] == id;
    })[0];
  }

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
      <LoadingOverlay show={loanding} />
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
              all={true}
              placeholder="Nombre de la compañía"
              type="text"
            />
            <CustomSelect
              class="w-full mx-auto  inline-block "
              label="Seleccione tipo de archivo"
              disabled={false}
              onChange={handleFileChange}
              options={FILES}
              placeholder="Seleccione un archivo"
              type="text"
            />
            {selectedFile != 0 && selectedFile != 7 && selectedFile != 8 && (
              <CustomSelect
                class="w-full mx-auto  inline-block "
                label="Seleccione el año"
                disabled={false}
                onChange={handleYearChange}
                options={YEARS}
                placeholder="Seleccione un año"
                type="text"
              />
            )}

            {selectedFile == 7 && (
              <CustomSelect
                class="w-full mx-auto  inline-block "
                label="Seleccione el año"
                disabled={false}
                onChange={handleYearChange}
                options={YEARS_CFSE}
                placeholder="Seleccione un año"
                type="text"
              />
            )}
            {selectedFile == 8 && (
              <DateRangePicker
                ranges={state}
                onChange={(item: any) => handleSelect(item)}
              />
            )}
            {selectedFile == 3 ||
            selectedFile == 4 ||
            selectedFile == 5 ||
            selectedFile == 6 ? (
              <>
                {" "}
                <CustomSelect
                  class="w-full mx-auto inline-block"
                  label="Seleccione el trimestre"
                  disabled={false}
                  onChange={handleTrimestre}
                  options={TRIMESTRE}
                  placeholder="Seleccione el trimestre"
                  type="text"
                />{" "}
              </>
            ) : null}
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
        <button
          onClick={downloadFile}
          className={`xl:w-1/3 w-full shadow-xl  bg-white rounded-lg shadow p-4 py-6	text-center	 ${
            selectedFile != 0 ? "" : "opacity-50"
          }`}
        >
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="text-6xl text-[#333160]"
          />
          <h3 className="text-[#333160] text-xl font-bold mt-4">
            Descargar Archivo
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
