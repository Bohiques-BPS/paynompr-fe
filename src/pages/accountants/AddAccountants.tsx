import { useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import { setAccountants } from "../../utils/requestOptions";

import { showError, showSuccess } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import { Accountants } from "../../models/accountants";

const AddCounter = () => {
  const [formData, setFormData] = useState(Accountants);
  const navigate = useNavigate();

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        e.currentTarget.type === "number"
          ? parseInt(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };

  const handleAddAccountant = () => {
    setAccountants(formData)
      .then(() => {
        // Data retrieval and processing
        showSuccess("Creado exitosamente.");
        navigate("../contadores");
      })
      .catch((error) => {
        showError(error.response.data.detail);
      });
  };
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-3xl">Crear Contador</h3>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="xl:w-full w-full ">
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Nombre"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              name="middle_name"
              onChange={handleInputChange}
              value={formData.middle_name}
              class="w-1/4 mx-auto ps-1 pe-1  inline-block "
              label="Inicial segundo nombre"
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              name="first_last_name"
              onChange={handleInputChange}
              value={formData.first_last_name}
              class="w-1/4 mx-auto ps-1 pe-1 inline-block "
              label="Apellido paterno"
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              name="second_last_name"
              onChange={handleInputChange}
              value={formData.second_last_name}
              class="w-1/4 mx-auto ps-1 pe-1 inline-block "
              label="Apellido materno"
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              name="company"
              onChange={handleInputChange}
              value={formData.company}
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Compañía"
              placeholder=""
              type="text"
            />
            <CustomInputs
              name="employer_insurance_number"
              onChange={handleInputChange}
              value={formData.employer_insurance_number}
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Numero de seguro patronal"
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Numero telefónico"
              name="phone"
              onChange={handleInputChange}
              value={formData.phone}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-full mx-auto pe-1  inline-block "
              label="Dirección"
              name="address"
              onChange={handleInputChange}
              value={formData.address}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              name="country"
              onChange={handleInputChange}
              value={formData.country}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              name="state"
              onChange={handleInputChange}
              value={formData.state}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              name="zip_code"
              onChange={handleInputChange}
              value={formData.zip_code}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Correo electrónico"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Identidad de usuario SSA PTN"
              placeholder=""
              name="identidad_ssa"
              onChange={handleInputChange}
              value={formData.identidad_ssa}
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Identidad de usuario BSO. Corrección W2"
              name="identidad_bso"
              onChange={handleInputChange}
              value={formData.identidad_bso}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Identidad de usuario Efile PR(SS sin lineas)"
              name="identidad_efile"
              onChange={handleInputChange}
              value={formData.identidad_efile}
              placeholder=""
              type="text"
            />
          </div>
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleAddAccountant}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar datos
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCounter;
