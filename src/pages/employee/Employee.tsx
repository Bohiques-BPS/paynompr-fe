import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  faBan,
  faCircleCheck,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";

import CustomInputs from "../../components/forms/CustomInputs";
import { changeStatusEmployer, getEmployers } from "../../utils/requestOptions";

import { Link, useParams } from "react-router-dom";
import { showError, showSuccess } from "../../utils/functions";

const Empleados = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState({ first_name: "", id: 0, is_deleted: false });

  const [data, setData] = useState([]);
  const params = useParams();

  const columns: any = [
    {
      name: "Nombre",
      selector: (row: { first_name: string }) => row.first_name,
    },
    {
      name: "Numero Social",
      selector: (row: { social_security_number: string }) =>
        row.social_security_number,
    },
    {
      name: "Telefono",
      selector: (row: { smartphone_number: string }) => row.smartphone_number,
    },
    {
      name: "Tipo",
      selector: (row: { employee_type: string }) => row.employee_type,
    },
    {
      name: "Editar",
      button: true,
      cell: (row: { id: string }) => (
        <Link to={`./${row.id}/editar`} rel="noopener noreferrer">
          <FontAwesomeIcon
            data-id={row.id}
            icon={faEdit}
            className="text-2xl"
          />
        </Link>
      ),
      selector: (row: { year: any }) => row.year,
    },
    {
      name: "Deshabilitar",
      button: true,
      cell: (row: { first_name: string; id: number; is_deleted: boolean }) => (
        <>
          {!row.is_deleted ? (
            <a onClick={() => handleModalClick(row)} rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-2xl text-green-800"
              />
            </a>
          ) : (
            <a onClick={() => handleModalClick(row)} rel="noopener noreferrer">
              <FontAwesomeIcon icon={faBan} className="text-2xl text-red-800" />
            </a>
          )}
        </>
      ),
      selector: (row: { year: any }) => row.year,
    },
  ];

  const changeStatus = () => {
    changeStatusEmployer(row.id)
      .then(() => {
        // Data retrieval and processing
        showSuccess("Cambiando exitosamente");
        getData();
        handleModal();
      })
      .catch((error: any) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  const handleModalClick = (data: {
    first_name: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getEmployers(Number(params.id))
      .then((response) => {
        // Data retrieval and processing
        if (response.data.result) setData(response.data.result);
      })
      .catch(() => {});
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3>Empleados</h3>
      </div>
      <div className="flex md:flex-row flex-col    gap-4  ">
        <div className="md:w-full mt-4 w-full flex flex-col   gap-2  ">
          <div className="w-full bg-white rounded-lg shadow p-4		  ">
            <CustomInputs
              class="w-1/3 float-right mx-auto  ps-2 inline-block xl:inline-flex  justify-between items-center"
              label=""
              value={search}
              onChange={handleSearch}
              placeholder="Buscar"
              type="text"
            />
            <DataTable
              className="w-full"
              columns={columns}
              data={data}
              pagination
            />
          </div>
        </div>
        <ModalAlert
          isOpen={isOpen}
          action={changeStatus}
          setIsOpen={handleModal}
          title={`${row.is_deleted ? "Activar" : "Desactivar"}`}
          description={`¿Esta seguro que desea ${
            row.is_deleted ? "activar" : "desactivar"
          } el empleado: ${row.first_name}?`}
        />
        <FloatButton to="agregar" />
      </div>
    </>
  );
};

export default Empleados;
