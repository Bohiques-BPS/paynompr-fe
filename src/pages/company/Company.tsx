import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { faEdit, faUserMinus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";
import data from "../../utils/data.json";
import CustomInputs from "../../components/forms/CustomInputs";
type Props = {};

const getRoute = (id: string) => {
  return id + "/empleados";
};

const Empresas = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const columns = [
    {
      name: "Empresa",
      selector: (row: { title: any }) => row.title,
    },
    {
      name: "Persona de Contacto",
      selector: (row: { contact: any }) => row.contact,
    },
    {
      name: "Editar",
      button: true,
      cell: (row: { id: string }) => (
        <a rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEdit} className="text-2xl" />
        </a>
      ),
      selector: (row: { year: any }) => row.year,
    },

    {
      name: "Deshabilitar",
      button: true,
      cell: (row: { id: string }) => (
        <a onClick={handleModal} rel="noopener noreferrer">
          <FontAwesomeIcon icon={faUserMinus} className="text-2xl" />
        </a>
      ),
      selector: (row: { year: any }) => row.year,
    },
    {
      name: "Empleados",
      button: true,
      cell: (row: { id: string }) => (
        <Link to={getRoute(row.id)}>
          <button className="  rounded-lg px-4 py-3 font-bold bg-[#FED102]  content-center items-center">
            Empleados
          </button>
        </Link>
      ),
      selector: (row: { year: any }) => row.year,
    },
  ];

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3>Compañías</h3>
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
              data={data.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
              )}
              pagination
            />
          </div>
        </div>
      </div>
      <ModalAlert
        isOpen={isOpen}
        setIsOpen={handleModal}
        title="Desactivar empleado"
        description="¿Esta seguro que desea desactivar este usuario?"
      />
      <FloatButton to="agregar" />
    </>
  );
};

export default Empresas;
