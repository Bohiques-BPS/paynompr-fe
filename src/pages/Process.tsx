import React from "react";
import CustomSelect from "../components/forms/CustomSelect";
import {
  faClock,
  faMoneyCheckDollar,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ActionProcess from "../components/dashboard/ActionProcess";
type Props = {};

const Process = (props: Props) => {
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center shadow-xl ">
        <h3>Procesos</h3>
      </div>
      <div className="flex md:flex-row flex-col    gap-4  ">
        <div className="md:w-full mt-4 w-full flex flex-col   gap-2  ">
          <div className="w-full bg-white rounded-lg shadow p-4	shadow-xl 	  ">
            <CustomSelect
              class="w-full mx-auto  inline-block "
              label="Seleccione una compañía"
              disabled={false}
              placeholder="Nombre de la compañía"
              type="text"
            />
            <CustomSelect
              class="w-full mx-auto  inline-block "
              label="Seleccione un empleado"
              disabled={false}
              placeholder="Nombre de la compañía"
              type="text"
            />
          </div>
        </div>
      </div>
      <ActionProcess />
    </>
  );
};

export default Process;
