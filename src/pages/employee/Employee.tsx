import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { faEdit, faUserMinus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";

import CustomInputs from "../../components/forms/CustomInputs";
import { getEmployers } from "../../utils/requestOptions";

import { Link, useParams } from "react-router-dom";

const Empleados = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
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
      cell: (row: { id: string }) => (
        <a data-id={row.id} onClick={handleModal} rel="noopener noreferrer">
          <FontAwesomeIcon icon={faUserMinus} className="text-2xl" />
        </a>
      ),
      selector: (row: { year: any }) => row.year,
    },
  ];

  useEffect(() => {
    getEmployers(Number(params.id))
      .then((response) => {
        // Data retrieval and processing
        if (response.data.result) setData(response.data.result);
      })
      .catch(() => {});
  }, []);

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
          setIsOpen={handleModal}
          title="Desactivar empleado"
          description="¿Esta seguro que desea desactivar este usuario?"
        />
        <FloatButton to="agregar" />
      </div>
    </>
  );
};

export default Empleados;
