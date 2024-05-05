import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  faBan,
  faMoneyBill,
  faCircleCheck,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";

import CustomInputs from "../../components/forms/CustomInputs";
import {
  changeStatusCompanie,
  deleteCompanie,
  getCompanies,
} from "../../utils/requestOptions";
import { showError, showSuccess } from "../../utils/functions";

const getRoute = (id: string) => {
  return id + "/empleados";
};

const getRouteTaxes = (id: string) => {
  return id + "/taxes";
};

const Empresas = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [row, setRow] = useState({ name: "", id: 0, is_deleted: false });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getCompanies()
      .then((response) => {
        // Data retrieval and processing
        setData(response.data);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  const changeStatus = () => {
    changeStatusCompanie(row.id)
      .then(() => {
        // Data retrieval and processing
        showSuccess("Cambiando exitosamente");
        getData();
        handleModal();
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };
  const deleteCompanieModal = () => {
    deleteCompanie(row.id)
      .then((data: any) => {
        data = data.data;

        // Data retrieval and processing
        if (data.ok) {
          showSuccess("Cambiando exitosamente");
          getData();
          handleModal2();
        } else {
          showError(data.msg);
          handleModal2();
        }
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  const columns: any = [
    {
      name: "Empresa",
      selector: (row: { name: any }) => row.name,
    },
    {
      name: "Persona de Contacto",
      selector: (row: { contact: any }) => row.contact,
    },
    {
      name: "Registro Comercial",
      selector: (row: { commercial_register: any }) => row.commercial_register,
    },
    {
      name: "Teléfono",
      selector: (row: { phone_number: any }) => row.phone_number,
    },
    {
      name: "Editar",
      button: true,
      cell: (row: { id: string }) => (
        <Link to={`./editar/${row.id}`} rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEdit} className="text-2xl" />
        </Link>
      ),
      selector: (row: { year: any }) => row.year,
    },

    {
      name: "Deshabilitar",
      button: true,
      cell: (row: { name: string; id: number; is_deleted: boolean }) => (
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
      selector: (row: { is_deleted: any }) => row.is_deleted,
    },
    {
      name: "Eliminar",
      button: true,
      cell: (row: { name: string; id: number; is_deleted: boolean }) => (
        <>
          <a onClick={() => handleModalClick2(row)} rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTrash} className="text-2xl text-red-800" />
          </a>
        </>
      ),
      selector: (row: { is_deleted: any }) => row.is_deleted,
    },

    {
      name: "Taxes",
      button: true,
      cell: (row: { id: string }) => (
        <Link to={getRouteTaxes(row.id)}>
          <FontAwesomeIcon
            icon={faMoneyBill}
            className="text-2xl text-green-800"
          />
        </Link>
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

  const handleModalClick = (data: {
    name: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen(!isOpen);
  };
  const handleModalClick2 = (data: {
    name: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen2(!isOpen);
  };
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Compañías</h3>
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
      </div>
      <ModalAlert
        isOpen={isOpen}
        action={changeStatus}
        setIsOpen={handleModal}
        title={`${row.is_deleted ? "Activar" : "Desactivar"}`}
        description={`¿Esta seguro que desea ${
          row.is_deleted ? "activar" : "desactivar"
        } la compañia: ${row.name}?`}
      />
      <ModalAlert
        isOpen={isOpen2}
        action={deleteCompanieModal}
        setIsOpen={handleModal2}
        title={`Eliminar`}
        description={`¿Esta seguro que desea Eliminar
         la compañia: ${row.name}?`}
      />
      <FloatButton to="agregar" />
    </>
  );
};

export default Empresas;
