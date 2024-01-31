import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  faEdit,
  faBan,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";

import CustomInputs from "../../components/forms/CustomInputs";
import {
  changeStatusAccountant,
  getAccountants,
} from "../../utils/requestOptions";
import { showError, showSuccess } from "../../utils/functions";
import { Link } from "react-router-dom";

const Accountants = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState({ name: "", id: 0, is_deleted: false });
  const [data, setData] = useState([]);
  const columns: any = [
    {
      name: "Nombre",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Correo",
      selector: (row: { email: string }) => row.email,
    },
    {
      name: "Teléfono",

      selector: (row: { phone: string }) => row.phone,
    },
    {
      name: "Editar",
      button: true,
      cell: (row: { id: string }) => (
        <Link to={`./editar/${row.id}`} rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEdit} className="text-2xl" />
        </Link>
      ),
    },
    {
      name: "Estado",
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
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAccountants()
      .then((response) => {
        // Data retrieval and processing
        setData(response.data.result);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const changeStatus = () => {
    changeStatusAccountant(row.id)
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

  const handleModalClick = (data: {
    name: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3>Contadores</h3>
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
          } al contador: ${row.name}?`}
        />
        <FloatButton to="agregar" />
      </div>
    </>
  );
};

export default Accountants;
