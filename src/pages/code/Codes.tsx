import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { faEdit, faUserMinus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";

import CustomInputs from "../../components/forms/CustomInputs";
import { getCodes } from "../../services/code.services";
import { showError } from "../../utils/functions";
import { Link } from "react-router-dom";

const Codes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const columns: any = [
    {
      name: "Dueño",
      cell: (row: { owner: string }) => row.owner,
    },
    {
      name: "Correo",
      cell: (row: { email: string }) => row.email,
    },
    {
      name: "Código",
      selector: (row: { code: string }) => row.code,
    },
    {
      name: "Amount",
      selector: (row: { amount: number }) => row.amount,
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
      cell: (row: { id: string }) => (
        <a data-id={row.id} onClick={handleModal} rel="noopener noreferrer">
          <FontAwesomeIcon icon={faUserMinus} className="text-2xl" />
        </a>
      ),
      selector: (row: { year: any }) => row.year,
    },
  ];

  useEffect(() => {
    getCodes()
      .then((response) => {
        // Data retrieval and processing
        setData(response.data.result);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
        console.error(error);
      });
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
        <h3>Códigos</h3>
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

export default Codes;
