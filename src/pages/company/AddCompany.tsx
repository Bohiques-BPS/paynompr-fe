import { useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";

import { setCompanies } from "../../utils/requestOptions";
import { showError, showSuccess } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

import { COMPANY_DATA } from "../../models/company";
import CompanyForm from "../../components/forms/CompanyForm";
import ModalAlert from "../../components/dashboard/ModalAlert";

const AddCompany = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState(COMPANY_DATA);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [e.currentTarget.name]: value,
    });
  };
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleCreate = () => {
    setCompanies(formData)
      .then((response) => {
        // Data retrieval and processing
        console.log(response);
        showSuccess("Creado exitosamente.");
        navigate("../empresas");
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Crear Compañía</h3>

        <p className="text-white mt-4">
          Ingresa los datos de la compañía que deseas crear. ¡Empecemos por el
          nombre y su calificación!
        </p>
        <CustomInputs
          name="name"
          onChange={handleInputChange}
          value={formData.name}
          class="w-4/5 mx-auto mt-4 inline-block "
          label=""
          placeholder="* Nombre de la compañía"
          type="text"
        />
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <CompanyForm
            setFormData={setFormData}
            formData={formData}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleModal}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar datos
          </button>
        </div>
      </div>
      <ModalAlert
        isOpen={isOpen}
        action={handleCreate}
        setIsOpen={handleModal}
        title={`Editar Usuario`}
        description={`¿Esta seguro que desea editar este usuario ${formData.name}?`}
      />
    </>
  );
};

export default AddCompany;
